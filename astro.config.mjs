// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages URL & base-path calculation:
// - User site: https://Ali-HF.github.io (repo: Ali-HF.github.io) -> base is '/'
// - Project site: https://Ali-HF.github.io/blog (repo: blog) -> base is '/blog'
// Overrides can be provided via ASTRO_SITE and ASTRO_BASE environment variables.

const githubRepo = process.env.GITHUB_REPOSITORY; // e.g. "Ali-HF/blog" or "Ali-HF/Ali-HF.github.io"
let calculatedBase = '/';

if (process.env.ASTRO_BASE !== undefined) {
  calculatedBase = process.env.ASTRO_BASE;
} else if (githubRepo) {
  const [, repoName] = githubRepo.split('/');
  if (repoName && !repoName.toLowerCase().endsWith('.github.io')) {
    calculatedBase = `/${repoName}`;
  }
}

const site = process.env.ASTRO_SITE || 'https://Ali-HF.github.io';
const base = calculatedBase;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
  },
});
