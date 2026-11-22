import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    plugins: [react(), tailwindcss(), ...(artifact ? [viteSingleFile()] : [])],
    publicDir: artifact ? false : 'public',
    build: {
      outDir: artifact ? 'dist-artifact' : 'dist',
      assetsInlineLimit: artifact ? 100_000_000 : 4096,
    },
  };
});
