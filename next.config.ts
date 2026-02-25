import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // three.js is ESM — Next.js 15 App Router handles it natively.
    // transpilePackages caused webpack to compile all of three.js, making dev startup hang.
};

export default nextConfig;
