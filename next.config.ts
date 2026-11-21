module.exports = {
  images: {
    qualities: [25, 50, 75, 80],
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: "/en",
        destination: "/",
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
      },
    ];
  },
};
