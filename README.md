# Ali Hasan's Tech Blog (Ali-HF)

[![Deploy to GitHub Pages](https://github.com/Ali-HF/blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ali-HF/blog/actions/workflows/deploy.yml)

A high-performance, statically generated personal tech blog and engineering portfolio for **Ali Hasan** (BCIT student at NED University, Karachi).

Built with **Astro**, **TypeScript**, **Tailwind CSS**, and **Pagefind** client-side search. Fully static, zero-database, zero-server costs, deployed automatically to **GitHub Pages via GitHub Actions**.

---

## Content Pillars

1. **Rants**: Sharp, candid, opinionated breakdowns of frustrating developer tools, framework breaking changes, and the friction of day-to-day engineering.
2. **Builds**: Technical documentation of shipped projects, systems architecture, course assignments, and hackathon prototypes, featuring tech stacks, status tags, and bug post-mortems.

---

## Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v22 LTS or newer (tested with Node 24)
- **npm**: v10 or newer

### 2. Install & Run
```bash
# Clone repository
git clone https://github.com/Ali-HF/blog.git
cd blog

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Build & Production Preview
```bash
# Builds static HTML and generates Pagefind search indexes
npm run build

# Preview production build locally
npm run preview
```

---

## How to Add New Posts

Starter templates with commented frontmatter are located in `src/content/templates/`.

### Adding a Rant Post
1. Copy `src/content/templates/rant.md` into `src/content/posts/<your-slug>.md`.
2. Update frontmatter:
   ```yaml
   ---
   title: "Why Something in Tech Broke My Will to Live Today"
   description: "A short, punchy summary of what broke."
   pubDate: 2026-11-07
   type: "rant"
   tags: ["rant", "dev-life", "tools"]
   draft: false
   ---
   ```
3. Write your content.

### Adding a Build Post
1. Copy `src/content/templates/build.md` into `src/content/posts/<your-project-slug>.md`.
2. Update frontmatter with build specifications:
   ```yaml
   ---
   title: "Project Name: What I Built and What Exploded"
   description: "Technical write-up of the stack, architecture, and bugs."
   pubDate: 2026-11-07
   type: "build"
   tags: ["build", "fullstack", "typescript"]
   status: "shipped" # "shipped" | "in-progress" | "abandoned"
   stack: ["Next.js 16", "Supabase", "Tailwind CSS"]
   repo: "https://github.com/Ali-HF/project-repo" # Optional
   liveUrl: "https://my-project-live.com"         # Optional
   draft: false
   ---
   ```
3. Run `npm run build` to verify frontmatter types before committing.

---

## How to Customize Site Name, Tagline & Colors

### Changing Blog Name & Links
All personal details, social handles, repo references, and metadata live in **`src/site.config.ts`**:
```typescript
export const siteConfig = {
  name: "Ali's Log",          // Replaces BLOG_NAME
  tagline: "Unfiltered Dev",   // Replaces TAGLINE
  author: "Ali Hasan",
  githubUser: "Ali-HF",
  repoName: "blog",            // Updates GitHub Actions links automatically
  // ...
};
```

### Changing Colors & Accents
Color tokens are organized in **`src/styles/global.css`**:
- `--accent-rant`: Controls the badge, pulse dot, and accent highlights for rants (default: crimson/rose `#e11d48`).
- `--accent-build`: Controls the badge and highlight styling for builds (default: sky blue `#0284c7`).
- `--accent-color`: Base link and interactive accent (default: teal `#0d9488`).
- Edit the corresponding `.dark` class blocks to adjust dark-mode tints.

---

## Click-by-Click Deployment to GitHub Pages

This repository is pre-configured with `.github/workflows/deploy.yml`. When pushed to GitHub, it will automatically build your static site and deploy it.

### Step 1: Create GitHub Repository
1. Log into your GitHub account: `https://github.com/Ali-HF`.
2. Click the **+** (plus) icon in the top right corner &rarr; select **New repository**.
3. Choose your repository name:
   - For a user site at `https://Ali-HF.github.io`, name the repository **`Ali-HF.github.io`**.
   - For a project site at `https://Ali-HF.github.io/blog`, name the repository **`blog`**.
4. Set visibility to **Public** (required for free GitHub Pages).
5. Do **not** initialize with a README, .gitignore, or license (we already have them).
6. Click **Create repository**.

### Step 2: Push Local Code to GitHub
In your local project terminal:
```bash
# Add your GitHub remote (replace with your repo name if different)
git remote add origin https://github.com/Ali-HF/blog.git

# Rename branch to main if not already
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Configure GitHub Pages Source
1. In your GitHub repository, click on the **Settings** tab (the gear icon on top right).
2. On the left sidebar menu under **Code and automation**, click **Pages**.
3. Under **Build and deployment** &rarr; **Source**:
   - Change the dropdown from `"Deploy from a branch"` to **`"GitHub Actions"`**.
   - You do *not* need to pick a branch or folder; GitHub Actions handles the deployment artifact directly.

### Step 4: Where to Watch the Deploy Run
1. In your GitHub repository, click on the **Actions** tab along the top bar:
   `https://github.com/Ali-HF/blog/actions`
2. You will see a workflow run named **Deploy to GitHub Pages**.
3. Click into the workflow run to inspect live logs:
   - `build`: Checks out code, sets up Node LTS, runs `npm ci`, builds Astro, and indexes Pagefind.
   - `deploy`: Ships the `./dist` artifact to GitHub's global CDN edge.
4. Once marked with a green checkmark (`✔`), your site is live! GitHub Pages will display your public URL at the top of the Settings &rarr; Pages screen.

---

## Project Structure

```text
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD to GitHub Pages
├── public/
│   └── favicon.svg             # Site favicon
├── src/
│   ├── components/
│   │   ├── Badge.astro         # Visual badges for rants, builds, tags, statuses
│   │   ├── Footer.astro        # Base-safe footer with RSS and GitHub links
│   │   ├── Header.astro        # Sticky navigation with theme toggle & search
│   │   ├── PostCard.astro      # Card preview component with tags and dates
│   │   ├── SearchModal.astro   # Pagefind client search with Cmd+K dialog
│   │   └── ThemeToggle.astro   # Zero-flash dark/light mode toggle
│   ├── content/
│   │   ├── posts/              # 14 Seed Posts (8 Builds, 6 Rants)
│   │   ├── projects/           # 15 Project Showcase entries
│   │   └── templates/          # Starter templates (rant.md, build.md)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Master HTML shell, SEO meta, copy-code scripts
│   ├── pages/
│   │   ├── 404.astro           # Funny dev-themed error screen
│   │   ├── about.astro         # Ali Hasan bio & GitHub Activity link
│   │   ├── blog/
│   │   │   ├── [...id].astro   # Single post view with TOC & build facts box
│   │   │   └── index.astro     # Blog archive with type & title filters
│   │   ├── index.astro         # Homepage (Intro, Rants, Builds, Featured)
│   │   ├── now.astro           # "Now" page focus tracker
│   │   ├── projects.astro      # Filterable projects portfolio grid
│   │   ├── rss.xml.ts          # Automated RSS feed
│   │   └── tags/[tag].astro    # Tag archive dynamic pages
│   ├── styles/
│   │   └── global.css          # Tailwind CSS v4 variables & prose styles
│   ├── utils/
│   │   ├── paths.ts            # Base-path safe URL resolver
│   │   └── readingTime.ts      # Estimated reading time helper
│   ├── content.config.ts       # Typed content collection schemas
│   └── site.config.ts          # Central site configuration
├── astro.config.mjs            # Astro configuration with dynamic base path
├── package.json
└── tsconfig.json
```
