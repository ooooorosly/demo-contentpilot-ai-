/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubRepository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "contentpilot-ai-demo";

const nextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${githubRepository}`,
        assetPrefix: `/${githubRepository}/`,
        trailingSlash: true,
        images: {
          unoptimized: true
        }
      }
    : {})
};

export default nextConfig;
