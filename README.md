# ySale - Advanced Ads Management

ySale is a comprehensive platform for managing and optimizing your Meta and Google Ads campaigns.

## Features

- **Meta Ads Integration**: Fetch real campaign data and insights using OAuth flow.
- **Ads Manager Wizard**: Multi-step wizard to create and launch campaigns across platforms.
- **Full Auth System**: Secure Login (Email/Google), Signup, and Forgot Password.
- **Email Recovery**: Automated reset password emails via SendGrid and Cloudflare Functions.
- **Smart Rules**: Create automated rules to optimize your ad spend.
- **Whitelabel System**: Customize the platform with your own branding.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: CSS Modules
- **State**: React Context API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Internationalization**: i18next

## Environment Variables

Add the following variables to your `.env` (or hosting dashboard) to enable checkout:

- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key used by the client-side Checkout fallback.
- `VITE_STRIPE_PRICE_ID`: The active Stripe price ID for the subscription plan shown on the pricing page.
- `VITE_CHECKOUT_ENDPOINT` (optional): Absolute URL for the backend endpoint that creates Checkout sessions. Defaults to `/api/checkout` when omitted.
