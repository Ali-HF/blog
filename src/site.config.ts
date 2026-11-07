// Site configuration
// Customize your blog name, tagline, author details, and social links here.

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  author: string;
  githubUser: string;
  repoName: string;
  githubUrl: string;
  linkedinUrl: string;
  notebloomUrl: string;
  hkhAgencyUrl: string;
  siteUrl: string;
  basePath: string;
}

export const siteConfig: SiteConfig = {
  // Placeholder blog name & tagline as requested
  name: "BLOG_NAME",
  tagline: "TAGLINE",
  description: "A personal tech blog by Ali Hasan (Ali-HF) - opinionated rants on dev life and write-ups on shipped projects.",
  author: "Ali Hasan",
  githubUser: "Ali-HF",
  repoName: "blog", // Change to "Ali-HF.github.io" if using a user-site repository
  githubUrl: "https://github.com/Ali-HF",
  linkedinUrl: "https://linkedin.com/in/placeholder",
  notebloomUrl: "https://notebloom.pk", // Notebloom stationery brand
  hkhAgencyUrl: "https://hkh.agency",   // HKH agency
  siteUrl: "https://Ali-HF.github.io",
  basePath: "/", // Can be overridden via ASTRO_BASE or GITHUB_REPOSITORY
};

export default siteConfig;
