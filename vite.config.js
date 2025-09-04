import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    resolve: {
        extensions: [
          ".mjs",
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
          ".json",
          ".vue",
          ".scss",
        ],
    },
    /*server: {
        cors: {
            //origin: 'http://*.yourdomain.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }
    }*/
});
