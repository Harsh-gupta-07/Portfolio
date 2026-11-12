import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so Turbopack can load them.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
