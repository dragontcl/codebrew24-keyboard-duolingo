import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //needed for frontend to communicate with backend
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api/login': 'http://localhost:5000',
      '/api/register': 'http://localhost:5000',
      '/api/getUserData': 'http://localhost:5000'
    }
  }
})
