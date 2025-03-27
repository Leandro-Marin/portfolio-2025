import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});