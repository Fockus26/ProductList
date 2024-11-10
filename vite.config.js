import { defineConfig } from 'vite';
import VitePluginString from 'vite-plugin-string';

export default defineConfig({
  plugins: [
    VitePluginString({
      include: '**/*.html'
    }),
  ],
});