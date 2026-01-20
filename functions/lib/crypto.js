const encoder = new TextEncoder();
const decoder = new TextDecoder();

function normalizeSecret(secret) {
    if (!secret || secret.length < 16) {
        throw new Error('GSC_TOKEN_SECRET deve ter ao menos 16 caracteres.');
    }
    return secret.padEnd(32, '0').slice(0, 32);
}

async function getCryptoKey(secret) {
    const normalized = normalizeSecret(secret);
    const rawKey = encoder.encode(normalized);
    return crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary);
}

function base64ToBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function encryptPayload(secret, data) {
    const key = await getCryptoKey(secret);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(typeof data === 'string' ? data : JSON.stringify(data));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    return `${bufferToBase64(iv)}.${bufferToBase64(encrypted)}`;
}

export async function decryptPayload(secret, payload) {
    const key = await getCryptoKey(secret);
    const [ivPart, dataPart] = payload.split('.');
    if (!ivPart || !dataPart) {
        throw new Error('Payload inválido.');
    }
    const iv = new Uint8Array(base64ToBuffer(ivPart));
    const encrypted = base64ToBuffer(dataPart);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
    return decoder.decode(decrypted);
}
