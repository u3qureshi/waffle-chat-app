import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import Path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
    ],  
    resolve: {
      alias: {
        '@': Path.resolve(__dirname, './src'),
      },
    },
});
