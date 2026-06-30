import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/video.html",
        destination: "/video",
        permanent: true,
      },
      {
        source: "/blog.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog-single.html",
        destination: "/blog/how-automation-is-revolutionizing-the-beverage-industry",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/privacy-policy.html",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions.html",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      // Individual products redirect
      {
        source: "/:slug.html",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
