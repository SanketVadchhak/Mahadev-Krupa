import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Production optimizations
    poweredByHeader: false,
    compress: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'ik.imagekit.io' },
        ],
    },
};

export default nextConfig;
