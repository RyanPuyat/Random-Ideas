import path from 'path';

export default {
  root: path.resolve(__dirname, 'src'),
  mode: 'production',
  build: {
    outDir: path.resolve(__dirname, '../public'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
        chunkFileNames: '[chunks]/[name].[hash].js',
        entryFileNames: 'bundle.js',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
