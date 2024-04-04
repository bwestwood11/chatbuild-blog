const { withContentlayer } = require('next-contentlayer')
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**/**',
      }
    ]
  }
}
 
module.exports = withContentlayer(nextConfig)
