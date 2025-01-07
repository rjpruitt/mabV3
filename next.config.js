/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      { canvas: 'canvas' }
    ]
    return config
  },
  images: {
    domains: ['localhost', 'via.placeholder.com', 'placehold.co'],
  },
}

export default nextConfig 