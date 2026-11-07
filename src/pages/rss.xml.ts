import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../site.config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.siteUrl,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
