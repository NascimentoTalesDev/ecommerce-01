/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains : [
      "next-ecommerce-one.s3.amazonaws.com"

    ]
  }
}

module.exports = nextConfig
