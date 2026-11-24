# Структура сайта Greens NGO

Техническая база — текущий Next.js 16 проект `C:\1-2\ok`. Контент OK Studio полностью заменяется на экологическую НКО; дизайн-система Klarglas больше не используется (сохранена только в `docs/` как архив).

## Язык и бренд
- Язык интерфейса: **English (en)**, `lang="en"`.
- Бренд: **Greens**, tagline «Non-profit environmental organization».
- Главный CTA: **Donate**; вторичный: **Join us** / **Get involved**.

## Маршруты
| Путь | Назначение | Ключевые блоки |
| --- | --- | --- |
| `/` | Home (лендинг из референса) | Hero → Marquee → Mission + Stats → Events → Green Campaign → Get Involved → Gallery → CTA → Footer |
| `/about` | About us | Breadcrumbs, H1, история, миссия, ценности, команда, цифры, партнёры, CTA |
| `/projects` | Projects & Events | Фильтры (All / Clean-up / Forest gardens / Campaigns / Education), сетка карточек, CTA |
| `/projects/[slug]` | Проект | Обложка, проблема, решение, результаты, галерея, Related, CTA |
| `/gallery` | Gallery | Заголовок, фильтры по годам, masonry-сетка, лайтбокс |
| `/get-involved` | Get involved | Четыре способа участия (accordion/cards), форма волонтёра, FAQ, CTA |
| `/contact` | Contact | Контактная форма, адрес/часы, карта-схема, FAQ, CTA |
| `/donate` | Donate | Суммы, одноразово/ежемесячно, форма, прозрачность расходов |
| `/privacy`, `/terms` | Legal | Типичные страницы НКО, упрощённая типографика |
| `/404` | 404 | Спокойная страница с поиском/ссылками |

## Оболочка
- **Header** (sticky, светлый): лого · навигация · кнопка Donate; на мобильных — burger + drawer.
- **Footer** (тёмно-лесной): бренд/девиз, 3 колонки ссылок, контакты, соцсети, копирайт, Legal.
- **Overlays**: mobile drawer, donate modal, gallery lightbox, cookie notice (базовая версия), command palette (Ctrl/⌘K), back-to-top.

## Дизайн-токены
- Colors: `--cream #F7F8F2`, `--sage #DCEFC0`, `--sage-2 #C7E39A`, `--leaf #7CB342`, `--forest #173B23`, `--ink #162014`, `--muted #5D6B5A`, `--white #FFFFFF`.
- Type: Plus Jakarta Sans (заголовки/интерфейс, уже есть локально), Instrument Serif Italic (акцентное слово/цитаты), Oswald (числа), JetBrains Mono (мелкие метки).
- Radii: 12 / 20 / 30 / 999; shadows: мягкие 0 12px 32px rgba(23,59,35,.08).
- Spacing: 8px-base; секции 96 desktop / 64 mobile; контейнер 1160px.
- Motion: плавное появление секций (opacity + translateY 16px), деликатный parallax круглых фото, hover-сдвиг карточек; `prefers-reduced-motion` — мгновенные состояния.

## Компоненты (переиспользование архитектуры)
- `components/shape.tsx` — генератор мягких форм (используем P0/P4/P9 с амплитудой 4–12, только где нужно).
- `components/ui.tsx` — Button, Chip, Eyebrow, SectionHead, Accordion, Reveal, Stat, Marquee, Breadcrumbs, Field, Stepper.
- `components/sections.tsx` — секции главной: Hero, Mission, Events, CampaignBand, GetInvolved, Gallery, CTA.
- `components/pages.tsx` — страницы маршрутов и их секции.
- `components/shell.tsx` — Header, MobileNav, Footer, Overlays, PageExtras.
- `lib/data.ts` — весь контент (английский), массивы projects/gallery/team/faq/stats.
- `app/[[...slug]]/page.tsx` — единый catch-all для всех маршрутов + generateMetadata + generateStaticParams.

## Порядок работ
1. Описание и структура (эти файлы).
2. Замена данных и текстов (:en, правдоподобные примеры без [TODO]).
3. Новая светло-зелёная тема в globals.css, переделка shell под top-header.
4. Секции главной строго по референсу.
5. Внутренние страницы, формы, лайтбокс.
6. Метаданные, sitemap/robots, проверка typecheck/build и визуальный осмотр.
