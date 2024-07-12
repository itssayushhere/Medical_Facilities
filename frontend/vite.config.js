import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      plugins: [
        terser({
          compress: {
            drop_console: true, // Optional: removes console logs
          },
        }),
      ],
      treeshake: {
        moduleSideEffects: 'no-external', // Enable tree-shaking
      },
    },
  },
});
