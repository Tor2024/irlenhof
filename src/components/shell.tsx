'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { nav, site } from '@/lib/data';
import { Button, FrakturText, Icon } from './ui';

function useStoredBoolean(key: string, initial = false) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw !== null) setValue(raw === '1'); } catch { /* storage unavailable */ }
  }, [key]);
  const update = (next: boolean) => {
    setValue(next);
    try { localStorage.setItem(key, next ? '1' : '0'); } catch { /* storage unavailable */ }
  };
  return [value, update] as const;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? 'brand--light' : ''}`} aria-label="Irlenhof — Startseite">
      <span className="brand__logo">
        <Image src={light ? '/media/logo-mobil.png' : '/media/logo.png'} alt="" width={light ? 180 : 250} height={light ? 72 : 100} priority={!light} />
      </span>
      <span className="brand__text"><span className="brand__name"><FrakturText>Irlenhof</FrakturText></span><span className="brand__badge">hofladen · kreuztal</span></span>
    </Link>
  );
}

function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setMenu(false); setCartOpen(false); setAccountOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(false); setCartOpen(false); setAccountOpen(false); }
    };
    const onDown = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setCartOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);
  const childHrefs = nav.flatMap((n) => (n.children ?? []).map((c) => c.href));
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const item = nav.find((n) => n.href === href);
    if (item?.children?.length) {
      if (pathname === href) return true;
      return pathname.startsWith(`${href}/`) || item.children.some((c) => c.href === pathname);
    }
    if (childHrefs.includes(href)) {
      if (href === '/hofladen-online') return false;
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  return (
    <>
      <a className="top-strip" href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
        <Icon name="pin" size={14} /> Frische Lebensmittel aus Kreuztal-Ferndorf · <strong>{site.phone}</strong>
      </a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Brand />
          <nav className="site-nav" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <div className="site-nav__item" key={item.href}>
                <Link href={item.href} className={isActive(item.href) ? 'is-active' : ''} aria-current={isActive(item.href) ? 'page' : undefined}>
                  <FrakturText>{item.label}</FrakturText>{item.children && <Icon name="chevron" size={13} />}
                </Link>
                {item.children && (
                  <div className="site-nav__sub">
                    {item.children.map((c) => <Link href={c.href} key={c.href} className={isActive(c.href) ? 'is-active' : ''} aria-current={isActive(c.href) ? 'page' : undefined}><FrakturText>{c.label}</FrakturText></Link>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="site-header__tools" ref={toolsRef}>
            <div className="header-action">
              <button type="button" className={`icon-btn header-cart${cartOpen ? ' is-open' : ''}`} onClick={() => { setCartOpen((v) => !v); setAccountOpen(false); }} aria-label="Warenkorb" aria-expanded={cartOpen}>
                <Icon name="cart" size={20} />
                <span className="header-cart__count" aria-hidden="true">0</span>
              </button>
              {cartOpen && (
                <div className="header-popover" role="dialog" aria-label="Warenkorb">
                  <button type="button" className="header-popover__close" onClick={() => setCartOpen(false)} aria-label="Warenkorb schließen"><Icon name="close" size={16} /></button>
                  <div className="header-popover__icon"><Icon name="cart" size={24} /></div>
                  <h3>Ihr Korb ist leer.</h3>
                  <p>Der Online-Shop ist derzeit nicht aktiv. Stellen Sie Ihre Auswahl bitte persönlich im Hofladen zusammen oder rufen Sie uns an.</p>
                  <div className="header-popover__actions">
                    <Button href="/produkte">Produkte ansehen</Button>
                    <Button href="/hofladen" variant="secondary">Hofladen</Button>
                  </div>
                </div>
              )}
            </div>
            <div className="header-action">
              <button type="button" className={`header-account${accountOpen ? ' is-open' : ''}`} onClick={() => { setAccountOpen((v) => !v); setCartOpen(false); }} aria-label="Anmelden oder registrieren" aria-expanded={accountOpen}>
                <Icon name="user" size={18} />
                <span>Anmelden</span>
              </button>
              {accountOpen && (
                <div className="header-popover account-popover" role="dialog" aria-label="Konto">
                  <button type="button" className="header-popover__close" onClick={() => setAccountOpen(false)} aria-label="Konto schließen"><Icon name="close" size={16} /></button>
                  <div className="header-popover__icon"><Icon name="user" size={24} /></div>
                  <h3>Ihr Irlenhof-Konto.</h3>
                  <p>Anmeldung und Registrierung sind derzeit in Vorbereitung. Für Fragen und Vorbestellungen erreichen Sie uns direkt.</p>
                  <div className="header-popover__actions">
                    <Button href={site.phoneHref} icon="phone">{site.phone}</Button>
                    <Button href="/kontakt" variant="secondary">Nachricht schreiben</Button>
                  </div>
                  <p className="header-popover__hint">Kundenkonto folgt in Kürze.</p>
                </div>
              )}
            </div>
            <button type="button" className="icon-btn menu-btn" onClick={() => { setMenu(true); setCartOpen(false); setAccountOpen(false); }} aria-label="Menü öffnen" aria-expanded={menu} aria-controls="mobile-drawer"><Icon name="menu" size={22} /></button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="overlay-scrim" onClick={() => setMenu(false)} aria-hidden="true">
          <aside className="drawer" id="mobile-drawer" onClick={(e) => e.stopPropagation()} aria-label="Mobiles Menü">
            <div className="drawer__head"><Brand /><button type="button" className="icon-btn" onClick={() => setMenu(false)} aria-label="Menü schließen"><Icon name="close" /></button></div>
            <nav className="drawer__nav">
              {nav.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? 'is-active' : ''}><FrakturText>{item.label}</FrakturText><Icon name="arrow" size={17} /></Link>
                  {item.children && <div className="drawer__sub">{item.children.map((c) => <Link href={c.href} key={c.href} className={isActive(c.href) ? 'is-active' : ''} aria-current={isActive(c.href) ? 'page' : undefined}><FrakturText>{c.label}</FrakturText></Link>)}</div>}
                </div>
              ))}
            </nav>
            <div className="drawer__foot">
              <Button href="/produkte" icon="carrot">Unsere Produkte</Button>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="drawer__phone"><Icon name="phone" size={16} /> {site.phone}</a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Brand light />
            <p className="site-footer__claim">{site.claim}</p>
            <p>Frische und gesunde Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung zu einem angemessenen Preis.</p>
            <div className="site-footer__cta">
              <Button href="/oeffnungszeiten" variant="secondary" icon="clock">Wann haben wir offen?</Button>
              <Image className="animal-silhouette" src="/media/tiersilhouette.png" alt="" aria-hidden="true" width={520} height={87} />
            </div>
          </div>
          <div className="site-footer__cols">
            <div><h3>Unser Hof</h3><Link href="/unser-hof/der-irlenhof"><FrakturText>Der Irlenhof</FrakturText></Link><Link href="/unser-hof/unsere-philosophie">Unsere Philosophie</Link><Link href="/unser-hof/unsere-tiere">Unsere Tiere</Link><Link href="/aktuelles">Aktuelles</Link><Link href="/galerie">Galerie</Link></div>
            <div><h3>Hofladen</h3><Link href="/hofladen">Unser Hofladen</Link><Link href="/produkte">Unsere Produkte</Link><Link href="/oeffnungszeiten">Öffnungszeiten</Link><Link href="/hofladen-online">Hofladen online</Link><Link href="/kontakt">Kontakt & Anfahrt</Link></div>
            <div><h3>Kontakt</h3><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phone}</a><a href={site.mobileHref}>{site.mobile}</a><span>{site.address[0]}<br />{site.address[1]}</span></div>
            <div><h3>Folgen Sie uns</h3><a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram <Icon name="external" size={13} /></a><a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook <Icon name="external" size={13} /></a><div className="site-footer__nrw"><Image src="/media/nrw-foerderung.png" alt="" aria-hidden width={35} height={37} /><small>Gefördert durch das Land Nordrhein-Westfalen</small></div></div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} <FrakturText>{site.legalName}</FrakturText>. Alle Rechte vorbehalten.</span>
          <div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link href="/widerruf">Widerruf</Link><Link href="/kontakt">Kontakt</Link></div>
        </div>
      </div>
    </footer>
  );
}

function CookieNotice() {
  const [visible, setVisible] = useStoredBoolean('irlenhof-cookie', true);
  const [settings, setSettings] = useState(false);
  if (!visible) return null;
  return (
    <div className="cookie-notice" role="region" aria-label="Cookie-Hinweis">
      <div><strong>Wir achten Ihre Privatsphäre.</strong><p>Wir verwenden nur notwendige Cookies. Weitere Inhalte laden wir erst mit Ihrer Zustimmung.</p></div>
      <div className="cookie-notice__actions"><Button onClick={() => setVisible(false)}>Alle akzeptieren</Button><Button variant="secondary" onClick={() => setVisible(false)}>Nur notwendige</Button><button type="button" className="textlink" onClick={() => setSettings(!settings)}>Einstellungen</button></div>
      {settings && <p className="cookie-notice__hint">Karten und externe Medien bleiben deaktiviert, bis Sie sie freigeben. Ihre Auswahl wird in diesem Browser gespeichert.</p>}
    </div>
  );
}

function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  if (!open) return null;
  const all = [...nav.flatMap((n) => [n, ...(n.children ?? [])]), { label: 'Datenschutz', href: '/datenschutz' }, { label: 'Impressum', href: '/impressum' }, { label: 'Widerruf', href: '/widerruf' }];
  const results = all.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="overlay-scrim overlay-scrim--top" onClick={() => setOpen(false)} aria-hidden="true">
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette__input"><Icon name="search" size={19} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Seiten durchsuchen …" aria-label="Seiten durchsuchen" /><kbd>Esc</kbd></div>
        <div className="palette__group">Seiten</div>
        {results.map((n) => <button key={n.href} type="button" onClick={() => { router.push(n.href); setOpen(false); }}><Icon name="arrow" size={16} /><FrakturText>{n.label}</FrakturText><span>{n.href}</span></button>)}
        {results.length === 0 && <p className="palette__empty">Nichts gefunden. Versuchen Sie einen anderen Begriff.</p>}
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Nach oben"><Icon name="arrowUp" size={20} /></button>;
}

export function Frame({ children }: { children: ReactNode }) {
  return <><a className="skip-link" href="#main">Zum Inhalt springen</a><Header /><main id="main">{children}</main><Footer /><CookieNotice /><CommandPalette /><BackToTop /></>;
}
