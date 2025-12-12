import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? '';

type PayPalOptions = NonNullable<Parameters<typeof PayPalScriptProvider>[0]['options']>;

export const paypalScriptOptions: PayPalOptions = {
  clientId: paypalClientId,
  currency: 'USD',
  intent: 'capture',
};
