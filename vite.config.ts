import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                configure: (proxy) => {
                    proxy.on('error', (err, req, res) => {
                        console.error(`Proxy error: ${err.message}`);
                        res.writeHead(502, {
                            'Content-Type': 'text/plain',
                        });
                        res.end('Backend server is unavailable.');
                    });
                },
            },
        }
    }
})