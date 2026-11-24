'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Eyebrow, FrakturText, Icon, Photo, Reveal, SectionArt, SectionHead, SplitText } from './ui';
import { animals, news, openingHours, pillars, products, site, stats } from '@/lib/data';

const heroSlides = [
  { src: '/media/hero-original.jpg', title: 'hofladen Irlenhof', position: 'center 42%' },
  { src: '/media/hero-hofladen.jpg', title: 'hofladen Irlenhof', position: 'center 45%' },
  { src: '/media/hero-reno.jpg', title: 'hofladen Irlenhof', position: 'center 50%' },
  { src: '/media/hero-kuerbisfest.jpg', title: 'Kürbisfest Irlenhof', position: 'center 40%' },
] as const;

const SLIDE_MS = 7000;
const CROSSFADE_MS = 700;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [cycles, setCycles] = useState<number[]>(() => heroSlides.map(() => 0));
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const leaveTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(mq.matches);
    const syncVisibility = () => setHidden(document.hidden);
    syncMotion();
    syncVisibility();
    mq.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      mq.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  const show = (next: number) => {
    if (next === index) return;
    setLeaving(index);
    setCycles((prev) => prev.map((c, i) => (i === next ? c + 1 : c)));
    setIndex(next);
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setLeaving(null), CROSSFADE_MS);
  };

  useEffect(() => {
    if (paused || reduced || hidden) return;
    const timer = window.setTimeout(() => show((index + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, hidden]);

  const go = (direction: number) => show((index + direction + heroSlides.length) % heroSlides.length);

  return (
    <section className={`hero${paused ? ' is-paused' : ''}`} aria-label="Bilder vom Irlenhof" aria-roledescription="carousel" aria-labelledby="hero-title">
      <div className="hero__stage">
        {heroSlides.map((slide, i) => (
          <div className={`hero__slide${i === index ? ' is-active' : ''}${i === leaving ? ' is-leaving' : ''}`} key={slide.src} aria-hidden={i !== index}>
            <Image key={`${slide.src}-${cycles[i]}`} src={slide.src} alt="" fill priority={i === 0} loading={i === 0 ? undefined : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'} sizes="100vw" className="hero__bg"
              style={{ objectPosition: slide.position }} />
          </div>
        ))}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="wrap hero__center">
        <h1 id="hero-title" key={heroSlides[index].title} className="hero__title"><FrakturText>{heroSlides[index].title}</FrakturText></h1>
        <p className="hero__sub">Kreuztal-Ferndorf · seit 2012</p>
      </div>
      <div className="hero__controls">
        <button type="button" className="hero__arrow hero__arrow--prev" onClick={() => go(-1)} aria-label="Vorheriges Bild">
          <Icon name="arrowLeft" size={18} />
        </button>
        <div className="hero__dots" role="group" aria-label="Bilder auswählen">
          {heroSlides.map((slide, i) => (
            <button key={slide.src} type="button" className={`hero__dot${i === index ? ' is-active' : ''}`}
              onClick={() => show(i)} aria-label={`Bild ${i + 1} von ${heroSlides.length} anzeigen`}
              aria-current={i === index ? 'true' : undefined}>
              <i key={`${index}-${i}`} />
            </button>
          ))}
        </div>
        <span className="hero__count" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span>
        <button type="button" className="hero__pause" onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Slideshow abspielen' : 'Slideshow pausieren'}>
          <Icon name={paused ? 'play' : 'pause'} size={15} />
        </button>
        <button type="button" className="hero__arrow hero__arrow--next" onClick={() => go(1)} aria-label="Nächstes Bild">
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <div className="hero__scroll" aria-hidden="true"><span>Entdecken Sie den Hof</span><span className="hero__scroll-line" /></div>
    </section>
  );
}

export function Welcome() {
  return (
    <section className="section section--tint welcome" aria-labelledby="welcome-title">
      <div className="wrap welcome__inner">
        <Reveal className="welcome__copy" variant="up">
          <Eyebrow>Willkommen auf dem Irlenhof</Eyebrow>
          <h2 id="welcome-title"><SplitText text="Wissen, wo’s herkommt." accent="herkommt." /></h2>
          <p className="lead">Frische, gesunde Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung zu einem angemessenen Preis. Direkt von unserem Hof in Ihrer Küche.</p>
          <div className="welcome__actions">
            <Button href="/produkte" icon="arrow">Unsere Produkte</Button>
            <Button href="/unser-hof" variant="secondary">Unser Hof</Button>
          </div>
          <div className="welcome__facts">
            <span><Icon name="clock" size={16} /> Mo–Fr & Sa für Sie da</span>
            <span><Icon name="pin" size={16} /> Nur 10 Min. von Kreuztal</span>
          </div>
        </Reveal>
        <SectionArt src="/media/illustrations/ill-start-gate.png" className="welcome__art" />
      </div>
    </section>
  );
}

export function MarqueeStrip() {
  const words = ['Wissen, wo’s herkommt', 'Frisch aus Ferndorf', 'Artgerechte Tierhaltung', 'Kurze Wege', 'Regional denken'];
  const repeated = Array.from({ length: 6 }, () => words).flat();
  return (
    <div className="marquee" aria-label="Unsere Versprechen">
      <div className="marquee__track">
        {[...repeated, ...repeated].map((w, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= words.length}>{w}</span>
        ))}
      </div>
    </div>
  );
}

export function Mission() {
  return (
    <section className="section mission" aria-labelledby="mission-title">
      <div className="wrap mission__grid">
        <Reveal className="parallax-frame parallax--mission" variant="left"><Photo src="/media/hof.jpg" alt="Der Irlenhof am Ortsrand von Kreuztal-Ferndorf" className="mission__photo" /></Reveal>
        <Reveal delay={80} variant="right">
          <Eyebrow>Unser Hof</Eyebrow>
          <h2 id="mission-title"><SplitText text="Ein Hof mit Geschichte – und einer klaren Haltung." accent="Haltung." /></h2>
          <p className="lead"><FrakturText>Am Fuße des Kindelsbergs bewirtschaften Peter, Felix und Florian Stücher den Irlenhof gemeinsam mit vielen Mitstreitern. Was wir tun, ist einfach: Wir erzeugen Lebensmittel, die wir selbst gerne essen.</FrakturText></p>
          <p>Unser Hof gehört zu den vier Urhöfen um Ferndorf und wurde im 14. Jahrhundert erstmals urkundlich erwähnt. Seit 2012 dürfen Sie unsere Produkte auch direkt im Hofladen kaufen.</p>
          <Button href="/unser-hof/der-irlenhof" variant="link" icon="arrow">Mehr über den Irlenhof</Button>
          <div className="mission__stats">
            {stats.map((s) => (
              <div key={s.label} className="mission__stat">
                <strong>{s.value}</strong><span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="progress-card">
            <div className="progress-card__head"><strong>Futter aus eigenem Anbau</strong><span>&gt; 90 %</span></div>
            <div className="progress-card__bar"><i /></div>
            <p>Mehr als 90 Prozent des Futters unserer Milchkühe stammen von unseren eigenen Flächen – dazu gehören Heu, Silage, Getreide, Mais und Erbsen.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProductsPreview() {
  return (
    <section className="section products-preview" aria-labelledby="products-title">
      <div className="wrap">
        <SectionHead eyebrow="Aus eigener Produktion" title="Gute Lebensmittel, die ihren Weg zu Ihnen kennen." accent="ihren Weg" align="center" lead="Eier, Kartoffeln, Gemüse, Fleisch und Wurst – direkt von unserem Hof und aus der Region. Ohne lange Transportwege und ohne Umwege." />
        <div className="product-grid">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.name} delay={i * 150} variant="cards">
              <Link href="/produkte" className="product-card">
                <Photo src={p.image} alt={p.name} className="product-card__photo" sizes="(max-width: 700px) 100vw, 25vw" />
                <div className="product-card__body">
                  <span className="product-card__cat">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p><FrakturText>{p.description}</FrakturText></p>
                  <div className="product-card__foot"><strong>{p.price}</strong><span>{p.unit}</span></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="events__foot"><Button href="/produkte" variant="secondary" icon="arrow">Alle Produkte ansehen</Button></div>
      </div>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section className="section pillars" aria-labelledby="pillars-title">
      <div className="wrap">
        <SectionHead eyebrow="Unsere Philosophie" title="Nachhaltig. Nachhaltig!" accent="Nachhaltig!" align="center" lead="Drei Säulen tragen unseren Betrieb – und unsere Entscheidungen. Sie stehen in einer ständigen Wechselbeziehung zueinander." />
        <div className="pillars__grid">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant="cards">
              <article className="pillar-card">
                <Photo src={p.image} alt={p.title} className="pillar-card__photo" sizes="(max-width: 800px) 100vw, 33vw" />
                <div className="pillar-card__body">
                  <span className="pillar-card__n">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p className="pillar-card__kicker">{p.kicker}</p>
                  <p><FrakturText>{p.text[0]}</FrakturText></p>
                  <Link href="/unser-hof/unsere-philosophie" className="textlink">Mehr lesen <Icon name="arrow" size={16} /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AnimalsPreview() {
  return (
    <section className="section animals-preview" aria-labelledby="animals-title">
      <div className="wrap">
        <Reveal variant="text">
          <div className="animals-preview__head">
            <div><Eyebrow>Leben auf dem Hof</Eyebrow><h2 id="animals-title"><SplitText text="Unsere Tiere." accent="Tiere." /></h2></div>
            <p className="lead"><FrakturText>Von den Weidegänschen bis zur Milchkuh: Alle Tiere auf dem Irlenhof haben Namen, Platz und eine Geschichte.</FrakturText></p>
          </div>
        </Reveal>
        <div className="animals__grid">
          {animals.slice(0, 4).map((a, i) => (
            <Reveal key={a.name} delay={i * 150} variant="cards">
              <Link href="/unser-hof/unsere-tiere" className="animal-card">
                <Photo src={a.image} alt={a.name} className="animal-card__photo" sizes="(max-width: 700px) 100vw, 25vw" />
                <div className="animal-card__body"><h3>{a.name}</h3><p>{a.short}</p><span className="animal-card__fact">{a.fact}</span></div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="events__foot"><Button href="/unser-hof/unsere-tiere" variant="secondary" icon="arrow">Alle Tiere kennenlernen</Button></div>
      </div>
    </section>
  );
}

export function HoursBand() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleWidth, setTitleWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const update = () => setTitleWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hours-band" aria-labelledby="hours-title">
      <div className="wrap hours-band__inner">
        <Reveal variant="left">
          <div>
            <Eyebrow>Besuchen Sie uns</Eyebrow>
            <h2 id="hours-title" ref={titleRef}><SplitText text="Wann haben wir offen?" accent="offen?" /></h2>
            <p>{site.hours}</p>
            <p className="hours-band__sb">Selbstbedienungsladen: {site.sbHours}</p>
            <div className="hours-band__art" style={titleWidth ? { width: titleWidth } : undefined}>
              <Image className="animal-silhouette" src="/media/tiersilhouette.png" alt="" aria-hidden="true" width={520} height={87} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100} variant="right">
          <div className="hours-band__list">
            {openingHours.slice(0, 5).map((h) => <div key={h.day}><span>{h.day}</span><strong>{h.hours}</strong></div>)}
            <span className="hours-band__cta">
              <Button href="/oeffnungszeiten" variant="secondary" icon="arrow">Alle Zeiten</Button>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function NewsPreview() {
  return (
    <section className="section news-preview" aria-labelledby="news-title">
      <div className="wrap">
        <Reveal variant="text">
          <div className="news-preview__head"><div><Eyebrow>Aktuelles</Eyebrow><h2 id="news-title"><SplitText text="Was gerade passiert." accent="passiert." /></h2></div><Button href="/aktuelles" variant="link" icon="arrow">Alle Neuigkeiten</Button></div>
        </Reveal>
        <div className="news__grid">
          {news.slice(0, 3).map((n, i) => (
            <Reveal key={n.slug} delay={i * 150} variant="cards">
              <Link href={`/aktuelles/${n.slug}`} className="news-card">
                <Photo src={n.image} alt={n.title} className="news-card__photo" sizes="(max-width: 700px) 100vw, 33vw" />
                <div className="news-card__body"><span className="news-card__meta"><FrakturText>{n.category} · {n.date}</FrakturText></span><h3><FrakturText>{n.title}</FrakturText></h3><p><FrakturText>{n.excerpt}</FrakturText></p><span className="news-card__more">Weiterlesen <Icon name="arrow" size={16} /></span></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section className="section gallery-preview" aria-labelledby="gallery-title">
      <div className="wrap">
        <Reveal variant="text">
          <Eyebrow>Ein Blick hinter die Kulissen</Eyebrow>
          <h2 id="gallery-title" className="gallery-preview__title"><SplitText text="Unser Hof in Bildern." accent="Bildern." /></h2>
        </Reveal>
        <Reveal className="gallery-preview__frame parallax-frame parallax--gallery" variant="up">
          <Photo src="/media/hof.jpg" alt="Der Irlenhof aus der Luft" className="gallery-preview__photo" sizes="(max-width: 900px) 100vw, 70vw" />
          <span className="gallery-preview__caption"><FrakturText>Der Irlenhof aus der Luft</FrakturText></span>
          <span className="gallery-preview__badge">Galerie · 2026</span>
        </Reveal>
        <div className="gallery-preview__foot"><Button href="/galerie" icon="arrow">Zur Galerie</Button></div>
      </div>
    </section>
  );
}

export function HomeCta() {
  return (
    <section className="home-cta">
      <Reveal className="home-cta__inner" variant="up">
        <Eyebrow>Kommen Sie vorbei</Eyebrow>
        <h2><SplitText text="Frisch. Regional. Vom Irlenhof." accent="Vom Irlenhof." frakturAccent /></h2>
        <p>Wir freuen uns auf Ihren Besuch – im Hofladen mit Bedienung oder rund um die Uhr im Selbstbedienungsladen.</p>
        <div className="home-cta__actions"><Button href="/oeffnungszeiten" icon="clock">Öffnungszeiten</Button><Button href="/kontakt" variant="secondary">Kontakt & Anfahrt</Button></div>
        <Image className="animal-silhouette" src="/media/tiersilhouette.png" alt="" aria-hidden="true" width={520} height={87} />
      </Reveal>
    </section>
  );
}
