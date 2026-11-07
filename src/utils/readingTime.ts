/**
 * Computes an estimated reading time in minutes for markdown content.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  // Strip out HTML tags, markdown links, code blocks for rough word count
  const clean = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
