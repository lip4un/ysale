// Pricing configuration based on the user's requirements
export type CurrencyCode = 'USD' | 'BRL' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'INR' | 'AED' | 'ARS' | 'AUD' | 'CAD' | 'CLP' | 'COP' | 'MXN';

interface PriceConfig {
    amount: number;
    currency: CurrencyCode;
    symbol: string;
}

const PRICES: Record<CurrencyCode, PriceConfig> = {
    USD: { amount: 10, currency: 'USD', symbol: '$' },
    BRL: { amount: 50, currency: 'BRL', symbol: 'R$' },
    EUR: { amount: 10, currency: 'EUR', symbol: '€' },
    GBP: { amount: 10, currency: 'GBP', symbol: '£' },
    JPY: { amount: 1500, currency: 'JPY', symbol: '¥' },
    CNY: { amount: 70, currency: 'CNY', symbol: '¥' },
    INR: { amount: 850, currency: 'INR', symbol: '₹' },
    AED: { amount: 40, currency: 'AED', symbol: 'AED' },
    ARS: { amount: 12500, currency: 'ARS', symbol: '$' },
    AUD: { amount: 15, currency: 'AUD', symbol: 'A$' },
    CAD: { amount: 10, currency: 'CAD', symbol: 'C$' },
    CLP: { amount: 10, currency: 'CLP', symbol: '$' }, // Check if this is 10 or 10000? User said 10, but CLP 10 is very low. Assuming user input is truth, but might be 10k. Sticking to 10 for now as per image list, but actually image says "CLP 10/mês" which is weird. Wait, image says "CLP 10/mês". Probably normalized?. Let's check image again. 
    // Image says: CLP 10/mês. That is surely wrong for CLP. 10 CLP is nothing. But I must follow the image or the list provided.
    // Actually, looking at image 4 (stripe), it says "CLP 10/mês". I will copy EXACTLY what is there.
    COP: { amount: 35000, currency: 'COP', symbol: '$' },
    MXN: { amount: 150, currency: 'MXN', symbol: '$' }
};

export const getPriceForRegion = (locale: string): PriceConfig => {
    // Simple mapping from locale to currency
    const localeMap: Record<string, CurrencyCode> = {
        'pt': 'BRL',
        'pt-BR': 'BRL',
        'en': 'USD',
        'en-US': 'USD',
        'en-GB': 'GBP',
        'es': 'USD', // Default to USD for generic Spanish
        'es-ES': 'EUR',
        'es-AR': 'ARS',
        'es-MX': 'MXN',
        'es-CL': 'CLP',
        'es-CO': 'COP',
        'fr': 'EUR',
        'de': 'EUR',
        'it': 'EUR',
        'zh': 'CNY',
        'ja': 'JPY',
        'hi': 'INR',
        'ar': 'AED', // Approximating AR to UAE for now
    };

    const code = localeMap[locale] || 'USD';
    return PRICES[code] || PRICES['USD'];
};

export const formatPrice = (price: PriceConfig): string => {
    return `${price.symbol} ${price.amount.toLocaleString()}`;
};
