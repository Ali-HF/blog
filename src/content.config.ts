import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.enum(['rant', 'build']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // build posts only (optional fields)
    repo: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    stack: z.array(z.string()).optional(),
    status: z.enum(['shipped', 'in-progress', 'abandoned']).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    status: z.enum(['shipped', 'in-progress', 'abandoned']),
    repo: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    year: z.union([z.number(), z.string()]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
