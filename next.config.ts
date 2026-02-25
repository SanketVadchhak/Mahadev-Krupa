import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Required to correctly bundle three.js ESM in Next.js App Router
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
