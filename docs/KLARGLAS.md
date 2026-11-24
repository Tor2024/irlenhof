# OK Studio — Design-Dokument «Klarglas»

Quelle: vom Nutzer bereitgestelltes Design-Dokument. Umsetzung: Next.js 16, App Router, de-DE, lokale Fonts, keine externen Dienste ohne Einwilligung.

## Konzept
Kristallklares Glas als Metapher für klare Preise, klaren Prozess, klares Ergebnis. Transparenz → offener Prozess; Brechung → Fokus; Licht → Geschwindigkeit; Biegsamkeit → geschwungene Formen; Frost → Ruhe und Seriosität des Mittelstands.

Prinzipien: ein Held pro Bildschirm, Klarheit vor Effekt, Beweis neben Versprechen, ein Weg zur Aktion („Kostenloses Erstgespräch“), Geschwindigkeit als Teil des Designs, quiet luxury, eine Formensprache (alle Rundungen blicken zur Sidebar). Tonal: sachlich, warm, konkret, „Sie“, kurze Sätze, Zahlen statt Adjektive, keine KI-Hype.

## Farben
`--olive-300:#A3A98F`, `--olive-500:#616752`, `--olive-700:#3F4434`, `--bg-base:#0A0A0B`, `--accent-grad:linear-gradient(135deg,#A8D8FF,#6FA9FF 45%,#7A5DE0)`, `--cream:#F5F2EB→#E4E0D6`. Theme „Frost“: `#E9EBE6`, Glas `rgba(255,255,255,.55)`, Text `#14160F`. Verhältnis 70/20/8/2 (Graphit/Creme · Glas · Olive · Akzent).

## Typografie
Plus Jakarta Sans (Display XL `clamp(44px,6.2vw,88px)/1.02/600`, H1 `clamp(36px,4.4vw,64px)/1.08/600`, H2 `clamp(28px,3.2vw,44px)/1.15/600`, H3 28/1.25/500, Lead 20/1.6, Body 17/1.65, UI 14.5/1.35, Label 11/.22em uppercase), Instrument Serif Italic **nur ein Wort** pro Überschrift + Zitate, Oswald 700 für Zahlen, JetBrains Mono für Code. `lang=de`, `hyphens:auto`, „…“, geschützte Leerzeichen vor Einheiten, Dezimalkomma.

## Glas
G0 blur0 / G1 blur8 `rgba(120,120,128,.30)` / G2 blur12 `rgba(120,120,128,.42)` +底部 Rim / G3 blur22 `rgba(90,90,98,.55)`. Maximal 4 sichtbare `backdrop-filter`-Flächen.

## Layout
1440: Sidebar 300 + 40 + 40 + 40 → Inhalt 1020, 12 Spalten, 24 Gap. Max 1160, Fließtext 680, Medien 960. Rhythmus 128/96/80. Sidebar 300→76, Mobile Header 56 + Bottom Bar 64. Footer 4 Spalten.

## Formencodes (siehe LUMEN-UI-KIT.md §0)
P0 flach · P1 Pinch · P2 Taille · P3 Fass · P4 Bogen · P5 Senke · P6 Welle · P7 Schräge · P8 Kerbe · P9 Kissen · P10 Pillenbiegung. Amplitude nach Größe: XS 2–3, S 4–8, M 8–16, L 16–24 px. Ein Held pro Screen mit A×1,5 (max 24). Konkave Seiten zeigen zur Sidebar; Nachbarn gespiegelt.

Zuordnungen: Sidebar P1 A22, Header P5 A6, Footer P4 A12, Hero P3 A20, Trust P5 A6, Services P4/P5 A8, Prozess P7 A10, Cases P7 A10, Zahlen P1/P9/P1 A12/4/12, Pakete P2/P3/P2 A6/12/6, Stimmen P6 A8, Über uns P9 A4, FAQ P5 A4, CTA P6 A14, Modal P3 A16, Palette P9 A6, Cookie P5 A8, Drawer P1 A16.

## Verstärker
- Stufe 1 (CSS, immer): E1 Spotlight, E2 Grain 3 %, E3 Aurora (olive/blau/violett, 60–90 s), E4 mehrschichtiger Rim, E5 Glastiefe, E6 Typografie-Akzent.
- Stufe 2 (JS, Desktop): E7 Scroll-Bend, E8 Parallax (0.2/0.5/1.0, ≤24px), E9 Magnet-CTA, E10 View Transitions, E11 SVG-Kurve zeichnet, E12 Cursor-Linse, E13 Text-Reveal, E14 Vorher/Nachher, E15 Command Palette, E16 Live-Metriken.
- Stufe 3 (starke Geräte): E17 Kantbrechung (SVG-Filter), E18 WebGL-Flüssiglinse, E19 3D-Kippung ≤4°.
Maximal 2 Stufe-2 und 1 Stufe-3 pro Bildschirm. `prefers-reduced-motion` schaltet E3, E7–E9, E11–E13, E18, E19 ab; 150 ms Fade bleibt.

## Seiten
`/` (11 Sektionen) · `/leistungen` · `/leistungen/[slug]` (webdesign, relaunch, ki-integration, web-systeme) · `/referenzen` · `/referenzen/[slug]` · `/ablauf` · `/pakete` · `/ueber-uns` · `/wissen` · `/wissen/[slug]` · `/faq` · `/kontakt` · `/danke` · `/impressum` · `/datenschutz` · `/cookies` · 404.

Jede Seite: ein H1, ein Haupt-CTA, gleiche Materialien, Formen aus dem Katalog, sichere Zone A+12. Rechtliches als ruhiger 720px-Lesetext. Alle Daten im Projekt sind realistische Beispieldaten (vom Nutzer gewünscht), keine `[TODO]`-Marker.

## Performance & Barrierefreiheit
Lighthouse mobil ≥95/100/100/100, LCP ≤2 s, CLS 0, INP ≤200 ms, JS ≤150 KB gzip zuerst, kritisch CSS ≤30 KB, ≤4 woff2 vor geladen 2, ≤4 Blurflächen. Geräteklassen T1/T2/T3 mit Downgrade bei <40 fps. Kontrast ≥4,5:1, Fokusring 2 px, Ziele ≥44 px, Tastaturbedienung, Esc schließt Overlays, `aria-current`, `aria-expanded`, `aria-live`, DSGVO: gleichwertige Cookie-Buttons, Karte erst nach Einwilligung, lokale Fonts, Datenschutz-Link an jedem Formularfeld.

## Umsetzung
`src/lib/shape.ts` generiert clip-path polygon + SVG-Rim aus derselben Geometrie (smootherstep-Profile, 16 Stichproben pro Kante, ResizeObserver). `src/components/shell.tsx` enthält Sidebar, Mobile Header, Footer, Cursor, Palette, Cookies, Sticky-CTA. `src/components/sections.tsx` enthält alle Homepage-Sektionen. `src/app/[[...slug]]/page.tsx` rendert alle weiteren Seiten aus der Inhaltsregistry in `src/lib/data.ts`.
