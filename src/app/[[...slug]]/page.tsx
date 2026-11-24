import type { Metadata } from 'next';
import { news } from '@/lib/data';
import { PageView } from '@/components/pages';

type Params = { slug?: string[] };

const staticPaths = [
  [], ['unser-hof'], ['unser-hof', 'der-irlenhof'], ['unser-hof', 'unsere-philosophie'],
  ['unser-hof', 'unsere-tiere'], ['aktuelles'], ['hofladen'], ['oeffnungszeiten'],
  ['produkte'], ['hofladen-online'], ['galerie'], ['kontakt'], ['danke'],
  ['impressum'], ['datenschutz'], ['widerruf'],
];
const all = [...staticPaths, ...news.map((n) => ['aktuelles', n.slug])];

const titles: Record<string, { title: string; description: string }> = {
  'unser-hof': { title: 'Unser Hof', description: 'Geschichte, Philosophie und Tiere des Irlenhofs in Kreuztal-Ferndorf.' },
  'unser-hof/der-irlenhof': { title: 'Der Irlenhof', description: 'Ein Urhof bei Ferndorf mit einer Geschichte bis ins 14. Jahrhundert.' },
  'unser-hof/unsere-philosophie': { title: 'Unsere Philosophie', description: 'Ökologie, Ökonomie und Soziales – nachhaltig nachhaltig.' },
  'unser-hof/unsere-tiere': { title: 'Unsere Tiere', description: 'Gänse, Hühner, Puten, Schweine, Hasen, Kühe und Rinder auf dem Irlenhof.' },
  aktuelles: { title: 'Aktuelles', description: 'Neuigkeiten und Ankündigungen vom Irlenhof.' },
  hofladen: { title: 'Unser Hofladen', description: 'Der Hofladen Irlenhof: Selbstbedienung und Frischetheke in Kreuztal.' },
  oeffnungszeiten: { title: 'Öffnungszeiten', description: 'Wann der Hofladen Irlenhof geöffnet ist – und wann der Selbstbedienungsladen.' },
  produkte: { title: 'Unsere Produkte', description: 'Eier, Kartoffeln, Gemüse, Fleisch, Wurst und Honig direkt vom Irlenhof.' },
  'hofladen-online': { title: 'Hofladen online', description: 'Das Sortiment des Irlenhofs im Überblick. Der Online-Shop ist derzeit nicht aktiv.' },
  galerie: { title: 'Galerie', description: 'Bilder vom Irlenhof, den Tieren und dem Hofladen.' },
  kontakt: { title: 'Kontakt', description: 'Kontakt, Anfahrt und Öffnungszeiten des Irlenhofs in Kreuztal-Ferndorf.' },
  danke: { title: 'Vielen Dank', description: 'Ihre Nachricht wurde an den Irlenhof gesendet.' },
  impressum: { title: 'Impressum', description: 'Impressum der Irlenhof GbR.' },
  datenschutz: { title: 'Datenschutz', description: 'Datenschutzerklärung der Irlenhof GbR.' },
  widerruf: { title: 'Widerruf', description: 'Widerrufsbelehrung der Irlenhof GbR.' },
};

export function generateStaticParams() {
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const key = slug.join('/');
  if (!key) return {};
  const article = slug[0] === 'aktuelles' && slug.length === 2 ? news.find((n) => n.slug === slug[1]) : undefined;
  const title = article?.title ?? titles[key]?.title ?? 'Irlenhof';
  const description = article?.excerpt ?? titles[key]?.description;
  const images = ['/media/hero-original.jpg'];
  const known = all.some((p) => p.join('/') === key);

  if (!known) {
    const notFoundTitle = 'Seite nicht gefunden';
    const notFoundDescription = 'Diese Seite gibt es nicht. Auf unserer Startseite finden Sie den Weg zu allen Bereichen des Irlenhofs.';
    return {
      title: notFoundTitle,
      description: notFoundDescription,
      robots: { index: false, follow: false },
      alternates: { canonical: '/404' },
      openGraph: { title: notFoundTitle, description: notFoundDescription, url: '/404', images },
    };
  }

  if (key === 'danke') {
    const thanksDescription = titles.danke.description;
    return {
      title,
      description: thanksDescription,
      robots: { index: false, follow: false },
      alternates: { canonical: '/danke' },
      openGraph: { title, description: thanksDescription, url: '/danke', images },
    };
  }

  return { title, description, alternates: { canonical: `/${key}` }, openGraph: { title, description, url: `/${key}`, images } };
}

export default async function Route({ params }: { params: Promise<Params> }) {
  const { slug = [] } = await params;
  return <PageView slug={slug.join('/')} />;
}
