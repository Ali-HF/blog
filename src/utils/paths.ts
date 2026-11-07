/**
 * Formats internal URLs to respect Astro's BASE_URL (crucial for GitHub Pages project subpaths).
 *
 * Example:
 * url('/blog') -> '/blog' (on root) or '/<repo-name>/blog' (on subpath)
 */
export function url(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (cleanPath === '/') {
    return base ? `${base}/` : '/';
  }
  
  return `${base}${cleanPath}`;
}

export default url;
