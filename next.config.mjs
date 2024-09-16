/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
        {
          source: '/api/:path*',   // Requests to /api/* will be proxied
          destination: 'http://127.0.0.1:8000/:path*', // The destination backend server
        },
    ];
    },
};

