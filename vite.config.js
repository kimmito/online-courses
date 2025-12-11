import { defineConfig } from 'vite';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {},
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    plugins: [
        imagemin({
            png: {
                quality: 80,
            },
            jpeg: {
                quality: 80,
            },
            jpg: {
                quality: 80,
            },
            webp: {
                quality: 80,
            },
        }),
    ],
});
