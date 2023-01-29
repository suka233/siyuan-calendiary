import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
        ],
    },
    plugins: [vue(), WindiCSS()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:6806',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/'),
            },
        },
    },
});
