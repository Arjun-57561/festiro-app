// next.config.js (existing configuration)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config here
  reactStrictMode: true,

  // ADD THIS SECTION:
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      // ... rest of headers
    ]
  },
}

module.exports = nextConfig
