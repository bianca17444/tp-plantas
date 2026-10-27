/** @type {import('next').NextConfig} */
const nextConfig = {
  // El Service Worker no se tiene que quedar cacheado en el navegador:
  // así, si lo cambiamos, el navegador baja la versión nueva.
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
    ];
  },
};

export default nextConfig;
