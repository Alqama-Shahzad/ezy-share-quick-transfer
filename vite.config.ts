import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    dynamicImport()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@/components/ui/button',
            '@/components/ui/card',
            '@/components/ui/input',
            '@/components/ui/tabs',
            '@/components/ui/toast'
          ]
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
}));
