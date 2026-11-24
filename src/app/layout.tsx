import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Frame } from '@/components/shell';
import { openingHours, site } from '@/lib/data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.irlenhof.de'),
  title: { default: 'Irlenhof — Hofladen in Kreuztal-Ferndorf', template: `%s · ${site.name}` },
  description: 'Wissen, wo’s herkommt: Frische Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung direkt vom Irlenhof in Kreuztal-Ferndorf.',
  openGraph: {
    locale: 'de_DE', type: 'website', siteName: site.name,
    title: 'Irlenhof — Wissen, wo’s herkommt',
    description: 'Frische, gesunde Lebensmittel direkt vom Hof. Besuchen Sie unseren Hofladen in Kreuztal-Ferndorf.',
    url: '/', images: ['/media/hero-original.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: '#F7F8F2',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: site.shopName,
  url: 'https://www.irlenhof.de',
  telephone: site.phone,
  email: site.email,
  image: 'https://www.irlenhof.de/media/hero-original.jpg',
  description: 'Hofladen mit Direktvermarktung: Eier, Kartoffeln, Gemüse, Fleisch, Wurst und Honig aus eigener Produktion und aus der Region.',
  address: { '@type': 'PostalAddress', streetAddress: site.address[0], postalCode: '57223', addressLocality: 'Kreuztal', addressRegion: 'NRW', addressCountry: 'DE' },
  openingHoursSpecification: openingHours.slice(0, 6).map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${h.day.replace('Montag', 'Monday').replace('Dienstag', 'Tuesday').replace('Mittwoch', 'Wednesday').replace('Donnerstag', 'Thursday').replace('Freitag', 'Friday').replace('Samstag', 'Saturday').replace('Sonntag & Feiertag', 'Sunday')}`,
    opens: '09:00', closes: h.hours.includes('18:00') ? '18:00' : '14:00',
  })),
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-600-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Script id="irlenhof-jsonld" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(jsonLd)}</Script>
      </head>
      <body><Frame>{children}</Frame></body>
    </html>
  );
}
