import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/CinemaCenter/' : '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Fast minification (default)
    sourcemap: false, // Disable source maps for smaller builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase warning limit (your bundle is ~531KB)
  },
}));
