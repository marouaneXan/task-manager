import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/apollo-react' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/apollo-react' : '',
        uploadPath: process.env.NODE_ENV === 'production' ? '/apollo-react/upload.php' : '/api/upload'
    }
};

export default nextConfig;
