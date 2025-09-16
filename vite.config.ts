import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CinemaCenter/', // 👈 important
  build: {
    outDir: 'dist',        // 👈 make sure it's just 'dist', not 'dist/browser'
  },
});
