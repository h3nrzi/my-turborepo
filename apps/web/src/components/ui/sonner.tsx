'use client';

import { Toaster as SonnerToaster, toast } from 'sonner';

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-center"
      dir="rtl"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'rtl:flex-row-reverse',
          closeButton: 'rtl:left-2 rtl:right-auto',
        },
      }}
    />
  );
};

export { toast };
