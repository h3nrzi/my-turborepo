import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { paypalScriptOptions } from '../config/paypal';
import ThemeProvider from '../../theme/ThemeProvider';
import store from '../store';

const AppProviders = ({ children }: PropsWithChildren) => (
  <HelmetProvider>
    <ThemeProvider>
      <ReduxProvider store={store}>
        <PayPalScriptProvider deferLoading={true} options={paypalScriptOptions}>
          {children}
        </PayPalScriptProvider>
      </ReduxProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </ThemeProvider>
  </HelmetProvider>
);

export default AppProviders;
