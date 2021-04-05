const FIREBASE_URL =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  'react-2025-9e553.firebaseapp.com';

const nextConfig = {
  target: 'server',
  publicRuntimeConfig: {
    FIREBASE_URL
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      },
      {
        source: '/api/:path*',
        destination: `https://${FIREBASE_URL}/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
