import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { paypalScriptOptions } from 'infrastructure/services/config/paypal';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from 'shared/styles/theme/ThemeProvider';
import store from 'presentation/contexts/store';

const AppProviders = ({ children }: PropsWithChildren) => (
  <HelmetProvider>
    <ThemeProvider>
      <ReduxProvider store={store}>
        <PayPalScriptProvider deferLoading={true} options={paypalScriptOptions}>
          {children}
        </PayPalScriptProvider>
      </ReduxProvider>
      <Toaster />
    </ThemeProvider>
  </HelmetProvider>
);

export default AppProviders;
