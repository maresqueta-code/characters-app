/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    cssCodeSplit: true, // Enable CSS minification
    minify: 'esbuild', // Default, but you can specify it
    // Enable source maps in production (can be helpful, but remove for production if not needed)
    sourcemap: false,
    outDir: 'dist',
  },
  css: {
    postcss: './postcss.config.js', // Keep PostCSS compatibility
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      all: false,
      enabled: true,
      exclude: ['**/setup.ts', '**/msw-utils.tsx', '**/test-utils.tsx'],
    },
  },
});
