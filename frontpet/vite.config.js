import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      port: env.VITE_PORT,
      https:
        env.VITE_SSL_KEY_PATH && env.VITE_SSL_CERT_PATH
          ? {
              key: fs.readFileSync(env.VITE_SSL_KEY_PATH),
              cert: fs.readFileSync(env.VITE_SSL_CERT_PATH),
            }
          : false,
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  });
};
