'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Accordion, Breadcrumbs, Button, Chip, Eyebrow, Field, FrakturText, Icon, Photo, Reveal, SectionArt, SectionHead } from './ui';
import {
  animals, faqs, gallery, history, historyIntro, news, openingHours, philosophyIntro, pillars,
  productCategories, products, site,
} from '@/lib/data';
import {
  AnimalsPreview, GalleryPreview, Hero, HomeCta, HoursBand, MarqueeStrip,
  Mission, NewsPreview, PillarsSection, ProductsPreview, Welcome,
} from './sections';

type Crumb = { label: string; href?: string };

function Head({ eyebrow, title, accent, lead, crumbs, art }: { eyebrow: string; title: string; accent?: string; lead?: string; crumbs: Crumb[]; art?: string }) {
  return (
    <section className="page-head">
      <div className="wrap page-head__inner">
        <div className="page-head__copy">
          <Breadcrumbs items={[{ label: 'Start', href: '/' }, ...crumbs]} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{accent ? <><FrakturText>{title.split(accent)[0]}</FrakturText><em>{accent}</em><FrakturText>{title.split(accent).slice(1).join(accent)}</FrakturText></> : <FrakturText>{title}</FrakturText>}</h1>
          {lead && <p className="lead"><FrakturText>{lead}</FrakturText></p>}
        </div>
        {art && <SectionArt src={art} className="page-head__art" />}
      </div>
    </section>
  );
}

function PageCta({ title, text, primary, secondary }: { title: string; text: string; primary: { label: string; href: string; icon?: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="home-cta">
      <div className="wrap home-cta__inner">
        <Eyebrow>Besuchen Sie uns</Eyebrow>
        <h2><FrakturText>{title}</FrakturText></h2>
        <p><FrakturText>{text}</FrakturText></p>
        <div className="home-cta__actions">
          <Button href={primary.href} icon={primary.icon ?? 'arrow'}>{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="secondary">{secondary.label}</Button>}
        </div>
        <Image className="animal-silhouette" src="/media/tiersilhouette.png" alt="" aria-hidden="true" width={520} height={87} />
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: (typeof news)[number] }) {
  return (
    <Link href={`/aktuelles/${item.slug}`} className="news-card">
      <Photo src={item.image} alt={item.title} className="news-card__photo" sizes="(max-width: 700px) 100vw, 33vw" />
      <div className="news-card__body"><span className="news-card__meta"><FrakturText>{item.category} · {item.date}</FrakturText></span><h3><FrakturText>{item.title}</FrakturText></h3><p><FrakturText>{item.excerpt}</FrakturText></p><span className="news-card__more">Weiterlesen <Icon name="arrow" size={16} /></span></div>
    </Link>
  );
}

function ProductCard({ item }: { item: (typeof products)[number] }) {
  return (
    <article className="product-card">
      <Link href="/hofladen" className="product-card__link">
        <Photo src={item.image} alt={item.name} className="product-card__photo" sizes="(max-width: 700px) 100vw, 25vw" />
        <div className="product-card__body">
          <span className="product-card__cat">{item.category}</span>
          <h3>{item.name}</h3>
          <p><FrakturText>{item.description}</FrakturText></p>
          <div className="product-card__foot"><strong>{item.price}</strong><span>{item.unit}</span></div>
        </div>
      </Link>
      <details className="product-card__details" name="product-details">
        <summary>Mehr erfahren</summary>
        <div className="product-card__detail-body">
          {item.details.map((detail, i) => <p key={i}><FrakturText>{detail}</FrakturText></p>)}
        </div>
      </details>
    </article>
  );
}

export function HomePage() {
  return (
    <>
      <Hero /><MarqueeStrip /><Welcome /><Mission /><ProductsPreview /><PillarsSection />
      <HoursBand /><AnimalsPreview /><NewsPreview /><GalleryPreview />
      <section className="section faq-section">
        <div className="wrap faq-layout">
          <div><Eyebrow>Gut zu wissen</Eyebrow><h2>Häufige <em>Fragen.</em></h2><p className="lead">Antworten auf das, was uns am häufigsten gefragt wird – von den Öffnungszeiten bis zur Rohmilch.</p><Button href="/kontakt" variant="link" icon="arrow">Frage stellen</Button></div>
          <Accordion items={faqs.slice(0, 6)} name="home-faq" />
        </div>
      </section>
      <HomeCta />
    </>
  );
}

export function AboutPage() {
  const links = [
    { href: '/unser-hof/der-irlenhof', image: '/media/hof.jpg', label: 'Der Irlenhof', text: 'Geschichte, Gebäude und die Menschen dahinter.' },
    { href: '/unser-hof/unsere-philosophie', image: '/media/philosophie.jpg', label: 'Unsere Philosophie', text: 'Ökologie, Ökonomie und Soziales im Einklang.' },
    { href: '/unser-hof/unsere-tiere', image: '/media/gaense.jpg', label: 'Unsere Tiere', text: 'Von den Gänsen bis zu unseren Milchkühen.' },
    { href: '/aktuelles', image: '/media/aktuelles.jpg', label: 'Aktuelles', text: 'Neuigkeiten, Feste und Ankündigungen.' },
  ];
  return (
    <>
      <Head eyebrow="Unser Hof" title="Ein Stück Heimat, das man schmecken kann." accent="Heimat" lead={site.intro} crumbs={[{ label: 'Unser Hof' }]} art="/media/illustrations/ill-hof-farmstead.png" />
      <section className="section"><div className="wrap"><SectionHead eyebrow="Entdecken" title="Vier Wege, den Hof kennenzulernen." /><div className="about-links">
        {links.map((l, i) => (
          <Reveal key={l.href} delay={i * 70}>
            <Link href={l.href} className="about-link"><Photo src={l.image} alt={l.label} className="about-link__photo" sizes="(max-width: 700px) 100vw, 25vw" /><div className="about-link__body"><h3><FrakturText>{l.label}</FrakturText></h3><p><FrakturText>{l.text}</FrakturText></p><span className="textlink">Entdecken <Icon name="arrow" size={16} /></span></div></Link>
          </Reveal>
        ))}
      </div></div></section>
      <section className="section section--tint"><div className="wrap"><SectionHead eyebrow="Unsere Geschichte" title="Vom Urhof zum Hofladen." accent="Urhof" align="center" /><div className="history">
        {history.map((h) => <div className="history__row" key={h.year}><span className="history__year">{h.year}</span><div className="history__card"><h3>{h.title}</h3><p><FrakturText>{h.text}</FrakturText></p></div></div>)}
      </div></div></section>
      <PageCta title="Lernen Sie uns kennen." text="Kommen Sie vorbei – der Hof ist am Ortsrand von Kreuztal-Ferndorf leicht zu finden." primary={{ label: 'Kontakt & Anfahrt', href: '/kontakt' }} secondary={{ label: 'Unsere Produkte', href: '/produkte' }} />
    </>
  );
}

export function HistoryPage() {
  return (
    <>
      <Head eyebrow="Der Irlenhof" title="Seit Jahrhunderten in Familienhand." accent="Jahrhunderten" lead="Der Hof liegt am Fuße des Naherholungsgebiets Kindelsberg in Siegen am Ortsrand von Kreuztal-Ferndorf." crumbs={[{ label: 'Unser Hof', href: '/unser-hof' }, { label: 'Der Irlenhof' }]} art="/media/illustrations/ill-start-gate.png" />
      <section className="section"><div className="wrap mission__grid">
        <Reveal><Photo src="/media/hof.jpg" alt="Gebäude des Irlenhofs" className="mission__photo" /></Reveal>
        <Reveal delay={80}><Eyebrow>Unsere Wurzeln</Eyebrow><h2>Als klösterlicher Besitz erstmals erwähnt.</h2>
          {historyIntro.map((p) => <p key={p}><FrakturText>{p}</FrakturText></p>)}
        </Reveal>
      </div></section>
      <section className="section section--tint"><div className="wrap"><SectionHead eyebrow="Meilensteine" title="Unser Weg bis hierhin." accent="Unser Weg" /><div className="history">
        {history.map((h) => <div className="history__row" key={h.year}><span className="history__year">{h.year}</span><div className="history__card"><h3>{h.title}</h3><p><FrakturText>{h.text}</FrakturText></p></div></div>)}
      </div></div></section>
      <PageCta title="Schön, dass Sie da sind." text="Besuchen Sie uns und sehen Sie selbst, wie ein Hof heute aussehen kann." primary={{ label: 'Zum Hofladen', href: '/hofladen' }} />
    </>
  );
}

export function PhilosophyPage() {
  return (
    <>
      <Head eyebrow="Unsere Philosophie" title="Nachhaltig. Nachhaltig!" accent="Nachhaltig!" lead="Unser Leitsatz ist einfach. Die Umsetzung ist es nicht – aber wir arbeiten jeden Tag daran." crumbs={[{ label: 'Unser Hof', href: '/unser-hof' }, { label: 'Unsere Philosophie' }]} art="/media/illustrations/ill-philosophie-three-pillars.png" />
      <section className="section philosophy-intro"><div className="wrap philosophy-intro__inner">
        <div className="philosophy-intro__quote">
          <p><FrakturText>{philosophyIntro[0]}</FrakturText></p>
        </div>
        <div className="philosophy-intro__body">
          <h2 className="philosophy-intro__question"><FrakturText>{philosophyIntro[1]}</FrakturText></h2>
          <p className="lead"><FrakturText>{philosophyIntro[2]}</FrakturText></p>
          <blockquote className="philosophy-intro__aside"><FrakturText>{philosophyIntro[3]}</FrakturText></blockquote>
          <p><FrakturText>{philosophyIntro[4]}</FrakturText></p>
        </div>
      </div></section>
      <section className="section philosophy-pillars"><div className="wrap pillar-details">
        {pillars.map((p) => (
          <div key={p.title}>
            <article className="pillar-detail">
              <Photo src={p.image} alt={p.title} className="pillar-detail__photo" sizes="(max-width: 800px) 100vw, 45vw" />
              <div className="pillar-detail__body"><span className="pillar-card__n">{p.n}</span><h2>{p.title}</h2><p className="pillar-card__kicker">{p.kicker}</p>{p.text.map((t) => <p key={t}><FrakturText>{t}</FrakturText></p>)}</div>
            </article>
          </div>
        ))}
      </div></section>
      <PageCta title="Nachvollziehbar bis zum letzten Schritt." text="Im Hofladen sehen Sie, woher Lebensmittel kommen – und können unsere Tiere selbst kennenlernen." primary={{ label: 'Unsere Tiere', href: '/unser-hof/unsere-tiere' }} />
    </>
  );
}

export function AnimalsPage() {
  return (
    <>
      <Head eyebrow="Leben auf dem Hof" title="Vierbeiner, Federvieh und die ganze Familie." accent="Familie" lead="Jede Tierart hat bei uns ihre eigenen Bedingungen. Hier erfahren Sie, wie wir sie halten, füttern und warum wir das so machen." crumbs={[{ label: 'Unser Hof', href: '/unser-hof' }, { label: 'Unsere Tiere' }]} art="/media/illustrations/ill-tiere-animals.png" />
      <section className="section"><div className="wrap animal-details">
        {animals.map((a, i) => (
          <Reveal key={a.name} delay={(i % 2) * 70}>
            <article className="animal-detail">
              <Photo src={a.image} alt={a.name} className="animal-detail__photo" sizes="(max-width: 800px) 100vw, 45vw" />
              <div className="animal-detail__body"><Eyebrow>{a.fact}</Eyebrow><h2>{a.name}</h2><p className="lead"><FrakturText>{a.short}</FrakturText></p>{a.paragraphs.map((p) => <p key={p}><FrakturText>{p}</FrakturText></p>)}</div>
            </article>
          </Reveal>
        ))}
      </div></section>
      <PageCta title="Tiere zum Anfassen." text="Ein Besuch auf dem Hof ist bei uns ausdrücklich erwünscht – bringen Sie die Familie mit." primary={{ label: 'Öffnungszeiten', href: '/oeffnungszeiten', icon: 'clock' }} secondary={{ label: 'Galerie', href: '/galerie' }} />
    </>
  );
}

export function NewsPage() {
  return (
    <>
      <Head eyebrow="Aktuelles" title="Was auf dem Hof passiert." accent="passiert" lead="Neuigkeiten aus dem Hofladen, von unseren Feldern und dem Team – von Vorbestellungen bis zum Kürbisfest." crumbs={[{ label: 'Aktuelles' }]} art="/media/illustrations/ill-aktuelles-harvest-calendar.png" />
      <section className="section"><div className="wrap"><SectionHead eyebrow="Neuigkeiten" title="Aktuelle Neuigkeiten." /><div className="news__grid news__grid--all">{news.map((n) => <NewsCard key={n.slug} item={n} />)}</div></div></section>
      <PageCta title="Immer auf dem Laufenden." text="Schauen Sie regelmäßig vorbei – oder fragen Sie uns direkt, wenn Sie etwas wissen möchten." primary={{ label: 'Kontakt', href: '/kontakt' }} />
    </>
  );
}

export function NewsArticlePage({ slug }: { slug: string }) {
  const item = news.find((n) => n.slug === slug);
  if (!item) return <NotFoundPage />;
  return (
    <>
      <Head eyebrow={item.category} title={item.title} lead={item.excerpt} crumbs={[{ label: 'Aktuelles', href: '/aktuelles' }, { label: item.title }]} art="/media/illustrations/ill-aktuelles-harvest-calendar.png" />
      <section className="section"><div className="wrap">
        <div className="article-meta"><span><Icon name="calendar" size={16} /> {item.date}</span><span><Icon name="leaf" size={16} /> {item.category}</span></div>
        <Photo src={item.image} alt={item.title} className="article-cover" sizes="(max-width: 900px) 100vw, 70vw" />
        <div className="article-body">{item.body.map((p) => <p key={p}><FrakturText>{p}</FrakturText></p>)}</div>
        <div className="helpful"><span>Weitere Neuigkeiten?</span><Button href="/aktuelles" variant="secondary" icon="arrow">Alle Meldungen</Button></div>
      </div></section>
      <PageCta title="Wir freuen uns auf Sie." text="Ob Neuigkeit oder Vorbestellung – wir sind für Sie da." primary={{ label: 'Kontakt', href: '/kontakt' }} />
    </>
  );
}

export function HofladenPage() {
  return (
    <>
      <Head eyebrow="Unser Hofladen" title="Verantwortungsbewusst und natürlich." accent="natürlich" lead="Seit 2012 gibt es unseren Hofladen. Was Sie hier kaufen, hat einen Weg hinter sich, den wir genau kennen." crumbs={[{ label: 'Hofladen' }]} art="/media/illustrations/ill-hofladen-basket.png" />
      <section className="section"><div className="wrap mission__grid">
        <Reveal><Photo src="/media/hofladen-theke.jpg" alt="Die Frischetheke im Hofladen" className="mission__photo" /></Reveal>
        <Reveal delay={80}><Eyebrow>Direkt vom Erzeuger</Eyebrow><h2>Kurze Wege. Klare Herkunft.</h2>
          <p>Wir betreiben eine große artgerechte Tierhaltung und bauen Heu, Silage, Getreide, Mais und Erbsen auf eigenen Flächen an. Unser Betrieb ist konventionell – für uns zählt vor allem Nachvollziehbarkeit und der direkte Kontakt zu unseren Tieren.</p>
          <p>Seit dem 08.12.2012 ist unser Selbstbedienungsladen täglich geöffnet. Die Auswahl ist dort bewusst begrenzt: frische Eier, Kartoffeln, etwas Brotbelag und tiefgefrorenes Fleisch.</p>
          <p>Ende 2015 kam der Bedienungsladen mit Frischetheke dazu – fünf Tage in der Woche mit frischem Fleisch, Wurstwaren, Rohmilchkäse, hausgemachten Marmeladen, Saisongemüse, Honig, Apfelsaft, Eiernudeln und eingekochten Köstlichkeiten.</p>
          <Button href="/produkte" variant="link" icon="arrow">Unsere Produkte</Button>
        </Reveal>
      </div></section>
      <section className="section section--tint"><div className="wrap"><SectionHead eyebrow="Aus eigener Produktion" title="Ein Auszug aus unserem Sortiment." accent="Sortiment" align="center" /><div className="product-grid">{products.slice(0, 4).map((p) => <ProductCard key={p.name} item={p} />)}</div><div className="events__foot"><Button href="/produkte" variant="secondary" icon="arrow">Alle Produkte</Button></div></div></section>
      <HoursBand />
      <PageCta title="Auf Ihren Besuch freuen wir uns." text="Irlenweg 3, 57223 Kreuztal – mitten in Ferndorf, direkt am Kindelsberg." primary={{ label: 'Anfahrt planen', href: '/kontakt' }} />
    </>
  );
}

export function HoursPage() {
  return (
    <>
      <Head eyebrow="Öffnungszeiten" title="Wann Sie uns erreichen." accent="erreichen" lead="Unser Bedienungsladen hat feste Zeiten. Der Selbstbedienungsladen ist täglich für Sie da." art="/media/illustrations/ill-oeffnungszeiten-door-clock.png" crumbs={[{ label: 'Hofladen', href: '/hofladen' }, { label: 'Öffnungszeiten' }]} />
      <section className="section"><div className="wrap hours-full">
        <div className="hours-full__table"><div className="table-wrap">
          <table className="compare-table"><caption className="sr-only">Öffnungszeiten des Hofladens</caption><thead><tr><th scope="col">Tag</th><th scope="col">Bedienungsladen</th></tr></thead><tbody>
            {openingHours.map((h) => <tr key={h.day}><th scope="row">{h.day}</th><td>{h.hours}</td></tr>)}
          </tbody></table>
        </div></div>
        <div className="hours-full__side">
          <div className="hours-full__card"><Icon name="clock" size={26} /><h2>Selbstbedienung – jeden Tag</h2><p>Unser Selbstbedienungsladen hat täglich von 09:00 bis 18:00 Uhr geöffnet, auch an Sonn- und Feiertagen. Dort finden Sie frische Eier, Kartoffeln, Brotbelag und tiefgefrorenes Fleisch.</p></div>
          <div className="hours-full__card"><Icon name="phone" size={26} /><h2>Fragen? Rufen Sie an.</h2><p>Werktags erreichen Sie uns unter <a href={site.phoneHref}>{site.phone}</a> oder mobil unter <a href={site.mobileHref}>{site.mobile}</a>. Schriftlich schreiben Sie uns jederzeit an <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div>
        </div>
      </div></section>
      <PageCta title="Bis bald im Hofladen." text="Sie finden uns in Kreuztal-Ferndorf, Irlenweg 3." primary={{ label: 'Anfahrt', href: '/kontakt' }} secondary={{ label: 'Produkte', href: '/produkte' }} />
    </>
  );
}

export function ProductsPage() {
  const [filter, setFilter] = useState('Alle');
  useEffect(() => {
    const kat = new URLSearchParams(window.location.search).get('kat');
    if (kat && productCategories.includes(kat)) setFilter(kat);
  }, []);
  const choose = (c: string) => {
    setFilter(c);
    const url = new URL(window.location.href);
    if (c === 'Alle') url.searchParams.delete('kat');
    else url.searchParams.set('kat', c);
    window.history.replaceState(null, '', url);
  };
  const visible = filter === 'Alle' ? products : products.filter((p) => p.category === filter);
  return (
    <>
      <Head eyebrow="Unsere Produkte" title="Was wir Ihnen mitbringen." accent="mitbringen" lead="Alle Lebensmittel aus eigener Produktion oder von Partnern aus der Region – mit Namen, Preis und Herkunft." art="/media/illustrations/ill-produkte-crates.png" crumbs={[{ label: 'Hofladen', href: '/hofladen' }, { label: 'Unsere Produkte' }]} />
      <section className="section"><div className="wrap">
        <SectionHead eyebrow="Sortiment" title="Unser Sortiment." />
        <div className="filters" role="group" aria-label="Produkte nach Kategorie filtern">{productCategories.map((c) => {
          const icons: Record<string, string> = { Alle: 'store', 'Fleisch & Wurst': 'leaf', 'Eier & Nudeln': 'egg', 'Gemüse & Kartoffeln': 'carrot', 'Milch & Käse': 'milk', 'Vorrat & Leckereien': 'wheat' };
          return <Chip key={c} active={filter === c} onClick={() => choose(c)}><Icon name={icons[c] ?? 'leaf'} size={16} />{c}</Chip>;
        })}</div>
        <p className="filters__count">{visible.length} Produkte</p>
        <div className="product-grid product-grid--all">{visible.map((p) => <ProductCard key={p.name} item={p} />)}</div>
        <div className="notice-wide"><Icon name="info" size={22} /><p><strong>Hinweis:</strong> Alle Preise gelten für den Einkauf im Hofladen. Die Verfügbarkeit richtet sich nach Saison und Ernte. Für Vorbestellungen erreichen Sie uns telefonisch unter {site.phone}.</p></div>
      </div></section>
      <PageCta title="Frische ist keine Frage des Zufalls." text="Kommen Sie vorbei und überzeugen Sie sich selbst von unserer Auswahl." primary={{ label: 'Öffnungszeiten', href: '/oeffnungszeiten', icon: 'clock' }} />
    </>
  );
}

export function OnlineShopPage() {
  return (
    <>
      <Head eyebrow="Hofladen online" title="Unsere Produkte im Überblick." accent="Überblick" lead="Hier sehen Sie unser Sortiment – der Bestellvorgang ist derzeit nicht aktiv." art="/media/illustrations/ill-hofladen-online-laptop.png" crumbs={[{ label: 'Hofladen', href: '/hofladen' }, { label: 'Hofladen online' }]} />
      <section className="section"><div className="wrap">
        <div className="shop-notice" role="status"><Icon name="alert" size={26} /><div><h2>Dieser Shop ist derzeit nicht aktiv.</h2><p>Bestellungen werden nicht berücksichtigt. Es wird kein Lagerbestand angezeigt. Stellen Sie Ihre Auswahl bitte persönlich im Hofladen zusammen oder rufen Sie uns an.</p></div><Button href={site.phoneHref} icon="phone">{site.phone}</Button></div>
        <div className="product-grid product-grid--all">{products.map((p) => <ProductCard key={p.name} item={p} />)}</div>
      </div></section>
      <PageCta title="Lieber direkt vor Ort." text="Im Hofladen können Sie alle Produkte ansehen, riechen und probieren." primary={{ label: 'Hofladen', href: '/hofladen' }} />
    </>
  );
}

export function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const open = active !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActive(null); return; }
      if (e.key === 'ArrowRight') { setActive((v) => (v === null ? null : (v + 1) % gallery.length)); return; }
      if (e.key === 'ArrowLeft') { setActive((v) => (v === null ? null : (v - 1 + gallery.length) % gallery.length)); return; }
      if (e.key === 'Tab') {
        const focusables = Array.from(lightboxRef.current?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])') ?? []);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      previousFocus.current?.focus();
    }
  }, [open]);
  return (
    <>
      <Head eyebrow="Galerie" title="Ein Blick auf unseren Hof." accent="unseren Hof" lead="Ein paar Eindrücke von den Feldern, den Tieren und dem Hofladen. Klicken Sie auf ein Bild, um es größer zu sehen." art="/media/illustrations/ill-galerie-album.png" crumbs={[{ label: 'Galerie' }]} />
      <section className="section"><div className="wrap"><div className="gallery-grid">
        {gallery.map((g, i) => (
          <button type="button" className="gallery-tile" key={g.src} onClick={() => setActive(i)} aria-label={`${g.caption} – vergrößern`}>
            <Photo src={g.src} alt={g.alt} className="gallery-tile__photo" sizes="(max-width: 700px) 100vw, 33vw" />
            <span><FrakturText>{g.caption}</FrakturText></span>
          </button>
        ))}
      </div></div></section>
      {active !== null && (
        <div className="lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label="Bildansicht" onClick={() => setActive(null)}>
          <button type="button" ref={closeRef} className="icon-btn lightbox__close" onClick={() => setActive(null)} aria-label="Schließen"><Icon name="close" size={22} /></button>
          <button type="button" className="icon-btn lightbox__nav lightbox__prev" onClick={(e) => { e.stopPropagation(); setActive((v) => (v === null ? null : (v - 1 + gallery.length) % gallery.length)); }} aria-label="Vorheriges Bild"><Icon name="arrowLeft" size={24} /></button>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <Photo src={gallery[active].src} alt={gallery[active].alt} className="lightbox__photo" sizes="90vw" />
            <p><FrakturText>{gallery[active].caption}</FrakturText><span className="lightbox__count">{active + 1} / {gallery.length}</span></p>
          </div>
          <button type="button" className="icon-btn lightbox__nav lightbox__next" onClick={(e) => { e.stopPropagation(); setActive((v) => (v === null ? null : (v + 1) % gallery.length)); }} aria-label="Nächstes Bild"><Icon name="arrow" size={24} /></button>
        </div>
      )}
      <PageCta title="Die schönsten Bilder entstehen vor Ort." text="Besuchen Sie uns – und machen Sie Ihre eigenen." primary={{ label: 'Kontakt', href: '/kontakt' }} />
    </>
  );
}

function MiniMap() {
  return (
    <div className="mini-map" role="img" aria-label="Stilisierte Karte: Irlenweg 3, 57223 Kreuztal-Ferndorf">
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="260" fill="#e7eadb" />
        <path d="M-20 60C90 90 130 30 240 70s120 20 180-10M-20 190c120-40 160 30 260-10s110-20 180 10" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M120 -10c-10 90 40 130 20 180s-10 80 0 110M300 -10c20 80-30 120-10 180s10 70 0 110" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M0 140h400" stroke="#d5dcbf" strokeWidth="3" fill="none" />
        <circle cx="208" cy="130" r="26" fill="#6f8f4f" opacity=".18" /><circle cx="208" cy="130" r="9" fill="#4f7a3a" /><circle cx="208" cy="130" r="3.5" fill="#fff" />
        <text x="222" y="124" fill="#32452a" fontSize="15"><tspan className="fraktur">Irlenhof</tspan></text>
        <text x="222" y="142" fill="#5d6b5a" fontSize="11">Irlenweg 3 · Ferndorf</text>
      </svg>
      <a href="https://www.openstreetmap.org/search?query=Irlenweg%203%2C%2057223%20Kreuztal" target="_blank" rel="noreferrer" className="mini-map__link">Karte öffnen <Icon name="external" size={14} /></a>
    </div>
  );
}

export function ContactPage() {
  const router = useRouter();
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: 'Frage zum Hofladen', message: '' });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [start] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const set = (key: keyof typeof values) => (v: string) => setValues((prev) => ({ ...prev, [key]: v }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (!values.message.trim()) next.message = 'Bitte schreiben Sie uns Ihre Nachricht.';
    if (!consent) next.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.';
    if (honeypot || Date.now() - start < 1500) { setStatus('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'); return; }
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('Bitte prüfen Sie die markierten Felder.');
      const first = ['name', 'email', 'message', 'consent'].find((key) => next[key]);
      if (first) window.setTimeout(() => {
        const target = first === 'consent'
          ? formRef.current?.querySelector<HTMLElement>('#consent')
          : formRef.current?.querySelector<HTMLElement>(`#field-${first}`);
        target?.focus();
      }, 0);
      return;
    }
    setStatus('Danke! Wir melden uns bei Ihnen.');
    router.push('/danke');
  };
  return (
    <>
      <Head eyebrow="Kontakt" title="Sprechen wir über Ihren Besuch." accent="Ihren Besuch" lead="Sie haben eine Frage zu unseren Produkten, möchten etwas vorbestellen oder suchen den Weg zu uns? Melden Sie sich gern." crumbs={[{ label: 'Kontakt' }]} art="/media/illustrations/ill-kontakt-house.png" />
      <section className="section"><div className="wrap contact-layout">
        <div className="contact-form-wrap">
          <div className="contact-form-shape">
            <h2>Schreiben Sie uns</h2>
            <p className="lead">Wir antworten in der Regel innerhalb eines Werktages.</p>
            <form onSubmit={submit} noValidate className="contact-form" ref={formRef}>
              <Field label="Ihr Name" name="name" required value={values.name} onChange={set('name')} error={errors.name} placeholder="Vor- und Nachname" />
              <Field label="E-Mail-Adresse" name="email" type="email" required value={values.email} onChange={set('email')} error={errors.email} placeholder="name@beispiel.de" />
              <Field label="Telefon (optional)" name="phone" type="tel" value={values.phone} onChange={set('phone')} placeholder="02732-4379" />
              <Field label="Worum geht es?" name="subject" as="select" options={['Frage zum Hofladen', 'Vorbestellung', 'Produkte & Preise', 'Besuch & Anfahrt', 'Mitarbeit', 'Sonstiges']} value={values.subject} onChange={set('subject')} />
              <Field label="Ihre Nachricht" name="message" as="textarea" required value={values.message} onChange={set('message')} error={errors.message} placeholder="Wie können wir Ihnen helfen?" />
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></div>
              <label className="consent"><input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-err' : undefined} /><span>Ich bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage gemäß der <Link href="/datenschutz">Datenschutzerklärung</Link> einverstanden.</span></label>
              {errors.consent && <p id="consent-err" className="form-error" role="status">{errors.consent}</p>}
              <div className="form-actions"><Button type="submit" icon="arrow">Nachricht senden</Button><span className="form-status" role="status">{status}</span></div>
            </form>
          </div>
        </div>
        <aside className="contact-side">
          <div className="contact-card">
            <Eyebrow>Direkt kontaktieren</Eyebrow><h2>Wir sind für Sie da.</h2>
            <div className="contact-card__line"><Icon name="pin" size={18} /><div><strong>Adresse</strong><span>{site.address[0]}<br />{site.address[1]}</span></div></div>
            <div className="contact-card__line"><Icon name="phone" size={18} /><div><strong>Telefon</strong><a href={site.phoneHref}>{site.phone}</a></div></div>
            <div className="contact-card__line"><Icon name="phone" size={18} /><div><strong>Mobil</strong><a href={site.mobileHref}>{site.mobile}</a></div></div>
            <div className="contact-card__line"><Icon name="mail" size={18} /><div><strong>E-Mail</strong><a href={`mailto:${site.email}`}>{site.email}</a></div></div>
            <div className="contact-card__line"><Icon name="clock" size={18} /><div><strong>Öffnungszeiten</strong><span>{site.hours}</span></div></div>
            <div className="contact-card__address"><MiniMap /></div>
            <div className="contact-card__social"><a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram <Icon name="external" size={13} /></a><a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook <Icon name="external" size={13} /></a></div>
          </div>
        </aside>
      </div></section>
      <section className="section section--tint">
        <div className="wrap">
          <SectionHead eyebrow="Fragen & Antworten" title="Häufige Fragen." />
          <Accordion items={faqs} name="faq-page" />
        </div>
      </section>
    </>
  );
}

export function ThanksPage() {
  return (
    <section className="thanks">
      <div className="wrap"><div className="thanks__card">
        <span className="thanks__check"><Icon name="check" size={34} /></span>
        <Eyebrow>Nachricht gesendet</Eyebrow>
        <h1>Danke für Ihre <em>Nachricht.</em></h1>
        <p>Wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb eines Werktages bei Ihnen.</p>
        <div className="thanks__steps"><span><Icon name="mail" size={18} /> Bestätigung</span><span><Icon name="phone" size={18} /> Rückmeldung</span><span><Icon name="store" size={18} /> Besuch</span></div>
        <div className="thanks__links"><Button href="/produkte" icon="arrow">Produkte entdecken</Button><Button href="/" variant="secondary">Zur Startseite</Button></div>
      </div></div>
    </section>
  );
}

function LegalShell({ title, lead, children, crumbs }: { title: string; lead: string; children: ReactNode; crumbs: Crumb[] }) {
  return (
    <>
      <Head eyebrow="Rechtliches" title={title} lead={lead} crumbs={crumbs} />
      <section className="section"><div className="wrap legal-layout"><div className="legal-body">{children}</div><aside className="legal-toc"><strong>Auf dieser Seite</strong><span>Version vom {site.revision}</span><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link href="/widerruf">Widerruf</Link></aside></div></section>
    </>
  );
}

export function LegalPage({ slug }: { slug: string }) {
  if (slug === 'impressum') return (
    <LegalShell title="Impressum" lead="Angaben gemäß § 5 DDG und § 18 Abs. 2 MStV." crumbs={[{ label: 'Impressum' }]}>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p><FrakturText>{site.legalName}</FrakturText><br />{site.address[0]}<br />{site.address[1]}</p>
      <p>Vertreten durch: Peter Stücher, Felix Stücher und Florian Stücher</p>
      <h2>Kontakt</h2>
      <p>Telefon / Telefax: {site.phone}<br />E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a></p>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {site.ustid}</p>
      <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p>Berufsbezeichnung: Landwirtschaftlicher Betrieb mit Direktvermarktung<br />Zuständige Kammer: Landwirtschaftskammer NRW, Nevinghoff 40, 48147 Münster, <a href="https://www.landwirtschaftskammer.de" target="_blank" rel="noreferrer">landwirtschaftskammer.de</a></p>
      <h2>Redaktionell verantwortlich</h2><p><FrakturText>{site.legalName}</FrakturText>, Anschrift wie oben.</p>
      <h2>EU-Streitschlichtung</h2><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr/</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </LegalShell>
  );
  if (slug === 'datenschutz') return (
    <LegalShell title="Datenschutzerklärung" lead="Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften." crumbs={[{ label: 'Datenschutz' }]}>
      <h2>1. Verantwortlicher</h2><p>Verantwortlich für die Datenverarbeitung auf dieser Website ist <FrakturText>{site.legalName}</FrakturText>, {site.addressLine}. Datenschutzbeauftragter: Florian Stücher, erreichbar über die oben genannten Kontaktdaten.</p>
      <h2>2. Hosting und Server-Logs</h2><p>Unsere Website wird bei Hochhardt & Partner, Dickmannstraße 43, 42287 Wuppertal, gehostet. Es wurde ein Auftragsverarbeitungsvertrag geschlossen. Beim Aufruf der Website werden automatisch Informationen in Server-Logfiles gespeichert (Browsertyp, Version, Betriebssystem, Referrer-URL, Uhrzeit des Zugriffs, IP-Adresse). Die Verarbeitung erfolgt zur Sicherstellung eines störungsfreien Verbindungsaufbaus und der Systemsicherheit (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach kurzer Zeit gelöscht.</p>
      <h2>3. Kontaktaufnahme</h2><p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind.</p>
      <h2>4. Kontaktformular</h2><p>Die Angaben in unserem Kontaktformular werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Eine Weitergabe an Dritte erfolgt nicht. Mit dem Absenden stimmen Sie der Verarbeitung zu. Die Übertragung erfolgt verschlüsselt über SSL/TLS.</p>
      <h2>5. Cookies und Einwilligungen</h2><p>Notwendige Cookies werden ohne Einwilligung gesetzt. Alle weiteren Inhalte – etwa eingebettete Karten – werden erst nach Ihrer ausdrücklichen Zustimmung geladen. Ihre Auswahl können Sie in den Cookie-Einstellungen jederzeit ändern. Auf dieser Website werden keine externen Tracking-Dienste ohne Zustimmung eingebunden.</p>
      <h2>6. Schriftarten und Icons</h2><p>Die verwendeten Schriftarten und Icons werden lokal von unserem Server ausgeliefert. Es werden dabei keine Daten an Dritte übertragen.</p>
      <h2>7. Eingebundene Karten</h2><p>Zur Anzeige unserer Anfahrt verlinken wir auf OpenStreetMap. Beim Aufruf der externen Seite gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Die Karte wird erst nach Ihrem Klick geladen.</p>
      <h2>8. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21). Außerdem steht Ihnen ein Beschwerderecht bei einer zuständigen Aufsichtsbehörde zu. Wenden Sie sich dazu bitte an die oben genannten Kontaktdaten.</p>
      <h2>9. Aktualität</h2><p>Diese Datenschutzerklärung ist auf dem Stand vom {site.revision}. Änderungen werden hier veröffentlicht.</p>
    </LegalShell>
  );
  if (slug === 'widerruf') return (
    <LegalShell title="Widerrufsbelehrung" lead="Informationen zum Widerrufsrecht bei Verträgen, die über diese Website geschlossen werden." crumbs={[{ label: 'Widerruf' }]}>
      <h2>Widerrufsrecht</h2><p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
      <h2>Ausübung des Widerrufsrechts</h2><p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (<FrakturText>{site.legalName}</FrakturText>, {site.addressLine}, Telefon {site.phone}, E-Mail <a href={`mailto:${site.email}`}>{site.email}</a>) mittels einer eindeutigen Erklärung über Ihren Entschluss informieren, diesen Vertrag zu widerrufen.</p>
      <h2>Widerrufsfolgen</h2><p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen zurückzuzahlen.</p>
      <p>Derzeit können über diese Website keine Bestellungen aufgegeben werden. Der Hofladen online ist nicht aktiv; Bestellungen werden nicht berücksichtigt.</p>
    </LegalShell>
  );
  return <NotFoundPage />;
}

export function NotFoundPage() {
  return (
    <section className="notfound">
      <div className="wrap"><div className="notfound__card">
        <span className="notfound__number">404</span>
        <h1>Diese Seite gibt es nicht.</h1>
        <p><FrakturText>Vielleicht ist die Adresse nicht mehr aktuell. Auf unserer Startseite finden Sie den Weg zu allen Bereichen des Irlenhofs.</FrakturText></p>
        <div className="notfound__links"><Button href="/">Zur Startseite</Button><Button href="/produkte" variant="secondary">Unsere Produkte</Button><Button href="/kontakt" variant="secondary">Kontakt</Button></div>
      </div></div>
    </section>
  );
}

export function PageView({ slug }: { slug: string }) {
  if (!slug) return <HomePage />;
  const parts = slug.split('/');
  switch (parts.join('/')) {
    case 'unser-hof': return <AboutPage />;
    case 'unser-hof/der-irlenhof': return <HistoryPage />;
    case 'unser-hof/unsere-philosophie': return <PhilosophyPage />;
    case 'unser-hof/unsere-tiere': return <AnimalsPage />;
    case 'aktuelles': return <NewsPage />;
    case 'hofladen': return <HofladenPage />;
    case 'oeffnungszeiten': return <HoursPage />;
    case 'produkte': return <ProductsPage />;
    case 'hofladen-online': return <OnlineShopPage />;
    case 'galerie': return <GalleryPage />;
    case 'kontakt': return <ContactPage />;
    case 'danke': return <ThanksPage />;
    case 'impressum':
    case 'datenschutz':
    case 'widerruf': return <LegalPage slug={parts[0]} />;
  }
  if (parts[0] === 'aktuelles' && parts.length === 2) return <NewsArticlePage slug={parts[1]} />;
  return <NotFoundPage />;
}
