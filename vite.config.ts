import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

import fs from 'fs'; 
import path from 'path';

const certFile = path.resolve(__dirname, './certs/cert.pem');
const keyFile = path.resolve(__dirname, './certs/key.pem');
const httpsConfig = fs.existsSync(certFile) && fs.existsSync(keyFile) ? {
  key: fs.readFileSync(keyFile),
  cert: fs.readFileSync(certFile),
} : undefined;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: httpsConfig
  }
})
