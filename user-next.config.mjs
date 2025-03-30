/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Serve the .well-known directory
        source: "/.well-known/:path*",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Access-Control-Allow-Origin", value: "*" }
        ]
      }
    ]
  }
};

export default nextConfig;

