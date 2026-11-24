import type { MetadataRoute } from 'next';
import { news } from '@/lib/data';

const base = 'https://www.irlenhof.de';
const paths = [
  '/', '/unser-hof', '/unser-hof/der-irlenhof', '/unser-hof/unsere-philosophie',
  '/unser-hof/unsere-tiere', '/aktuelles', '/hofladen', '/oeffnungszeiten',
  '/produkte', '/hofladen-online', '/galerie', '/kontakt',
  '/impressum', '/datenschutz', '/widerruf',
  ...news.map((n) => `/aktuelles/${n.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-23');
  return paths.map((path) => ({ url: `${base}${path}`, lastModified, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 }));
}
