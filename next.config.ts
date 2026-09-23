import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'ik.imagekit.io' },
        ],
    },
    // Production optimizations
    poweredByHeader: false,
    compress: true,
};

export default nextConfig;
