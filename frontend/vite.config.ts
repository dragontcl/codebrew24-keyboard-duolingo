import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //needed for frontend to communicate with backend
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    proxy: {
      '/api/login': 'http://127.0.0.1:5000',
      '/api/register': 'http://127.0.0.1:5000',
      '/api/getUserData': 'http://127.0.0.1:5000',
      '/api/logout': 'http://127.0.0.1:5000',
      '/api/session': 'http://127.0.0.1:5000'
    }
  }
})
