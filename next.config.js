/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/sign-in",
        has: [
          {
            type: "cookie",
            key: "next-auth.session-token",
          },
        ],
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/auth/sign-up",
        has: [
          {
            type: "cookie",
            key: "next-auth.session-token",
          },
        ],
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
