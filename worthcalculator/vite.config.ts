import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Enable importing TypeScript files without specifying the .ts extension
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
  },
})
