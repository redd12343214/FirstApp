/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // <-- this gives you `expect`, `test`, etc. globally
    setupFiles: './src/setupTests.js' // <-- for jest-dom setup
  }
})