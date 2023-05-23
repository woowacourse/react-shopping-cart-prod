import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import servers from './src/servers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react()],
    base: process.env.BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: Object.fromEntries(
        servers.map((server) => {
          return [
            server.baseUrl,
            {
              target: server.origin,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api-\d+/, ''),
            },
          ];
        }),
      ),
    },
  };
});
