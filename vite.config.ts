import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      root: '.',
      server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
          strict: false,
        },
        proxy: {
          '/itunes-api': {
            target: 'https://itunes.apple.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/itunes-api/, ''),
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: undefined,
            assetFileNames: 'assets/[name].[hash].[ext]',
            chunkFileNames: 'assets/[name].[hash].js',
            entryFileNames: 'assets/[name].[hash].js',
          },
        },
        // Ensure all assets are copied correctly
        copyPublicDir: true,
      },
      publicDir: 'public',
      // Ensure proper MIME types for all file types
      assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
    };
});
