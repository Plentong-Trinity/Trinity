const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // Allows any subdomain of public.blob.vercel-storage.com
        port: '',
        pathname: '/**', // Allows any path under that hostname
      },
      // You can keep other patterns if you have them, e.g., for placeholders
      {
        protocol: 'http', // Or https, depending on your placeholder service
        hostname: 'localhost', // For local placeholder.svg during development
        port: '3000', // Your local dev port
        pathname: '/placeholder.svg',
      },
      // Add any other domains you might be using for images
    ],
  },
}

export default nextConfig
