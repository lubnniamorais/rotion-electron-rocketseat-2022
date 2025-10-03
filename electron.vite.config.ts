import path from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    publicDir: path.resolve('resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    // Para criar variáveis globais
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
        '@': path.resolve(__dirname, 'src'),
        '@/lib': path.resolve(__dirname, 'src/lib'),
      },
    },

    plugins: [react()],
  },
});
