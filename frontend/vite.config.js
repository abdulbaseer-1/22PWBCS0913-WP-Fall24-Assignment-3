import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env files from frontend/config directory
  const env = loadEnv(mode, path.resolve(__dirname, 'config'), 'VITE_');

  return {
    plugins: [react()],
    define: {
      // Expose VITE_ prefixed env variables
      'process.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL)
    },
    envDir: './config', // Specifically point to frontend/config directory
    envPrefix: 'VITE_', // Only expose env variables prefixed with VITE_
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Optional: Add source directory alias
      },
    },
  };
});