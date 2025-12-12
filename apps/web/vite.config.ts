import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      domain: fileURLToPath(new URL('./src/domain', import.meta.url)),
      application: fileURLToPath(new URL('./src/application', import.meta.url)),
      infrastructure: fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
      presentation: fileURLToPath(new URL('./src/presentation', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
});
