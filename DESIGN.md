# DESIGN.md — Harshvardhan Gupta portfolio

**Direction: "Engineering notebook."** A light, warm-paper site that reads like a
working notebook: ink-black type, hairline rules, monospace annotations, and
one safety-orange signal that marks whatever is *live* or *active*. Chosen
deliberately against the default dark dev-portfolio look. Light only — there is
no dark theme; the paper is the identity.

> Not based on a UXKIN reference set (not connected). Derived from the brief,
> the content (backend systems, queues, RL environments) and the rules below.

---

## 1. Color

All colors live as CSS variables in `app/globals.css` and as Tailwind tokens
(`bg-paper`, `text-ink`, `text-muted`, `bg-signal`, …). Never use raw hex in
components.

| Token | Value | Role |
|---|---|---|
| `paper` | `#F2EEE5` | Page background |
| `paper-raised` | `#FAF8F3` | Cards, image frames, menus |
| `paper-sunk` | `#E9E4D8` | Inset areas: code, tag chips, hover fill |
| `rule` | `#16140F` @ 14% | Hairline borders and dividers |
| `rule-strong` | `#16140F` @ 28% | Hover borders, graph-paper major lines |
| `ink` | `#16140F` | Headings, body text, primary buttons (15.9:1 on paper) |
| `muted` | `#57524A` | Secondary text, mono labels (6.7:1) |
| `faint` | `#7D776B` | Decoration & ≥18px only — never body copy (3.8:1) |
| `signal` | `#FF4D12` | The one accent. Fills only: dots, active markers, highlight bars, button hover, 3D packets. Text on it is `ink` (5.5:1) |
| `signal-ink` | `#B5370A` | Accent-colored **text** (links on hover, small live labels) (5.2:1) |
| `ok` | `#2F7D4F` | Status: shipped / running |
| `warn` | `#A86A00` | Status: WIP / degraded |

Rules
- `signal` covers < 5% of any viewport. If two things are orange, one is wrong.
- No gradients, no glass, no colored shadows.
- Selection: `signal` background, `ink` text.

## 2. Typography

| Family | Token | Use |
|---|---|---|
| **Bricolage Grotesque** (600–800, opsz) | `font-display` | Headlines, project titles, big numbers |
| **Geist** (400/500) | `font-sans` | Body, UI |
| **Geist Mono** (400/500) | `font-mono` | Labels, metadata, dates, tags, stats, figure captions |

Scale (fluid where noted):

| Token | Size / line-height | Use |
|---|---|---|
| `text-label` | 12px / 1.4, mono, uppercase, +0.08em | Section indices, captions, tags |
| `text-sm` | 14px / 1.5 | Secondary UI |
| `text-base` | 17px / 1.65 | Body. Prose max width 66ch |
| `text-lg` | 20px / 1.5 | Lead paragraphs |
| `text-h3` | 28px / 1.15, display 600 | Card titles |
| `text-h2` | clamp(40px, 5.5vw, 72px) / 1.0, display 700, −0.03em | Section titles |
| `text-h1` | clamp(56px, 11vw, 168px) / 0.88, display 800, −0.045em | Hero name |
| `text-statement` | clamp(28px, 3.6vw, 52px) / 1.12, display 500 | About statement |

## 3. Spacing & layout

- 4px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section padding: `clamp(96px, 14vw, 176px)` top and bottom.
- Content max width 1280px; side gutter `clamp(16px, 4vw, 48px)`.
- 12-column grid. Layouts are **left-aligned and asymmetric** — section headers
  sit in columns 1–4, content in 5–12 on desktop. Nothing centered except the
  footer sign-off.
- Section header pattern: `01` (mono, muted) · `EDUCATION` (mono label) on a
  hairline rule, title below in `text-h2`.

## 4. Shape & depth

- Radius: `0` for frames and rules, `4px` for chips/inputs, `999px` for pills
  and status dots. Nothing in between.
- Depth comes from hairline borders and paper tones, not shadows.
- One shadow, used only on hover of interactive cards and primary buttons:
  `4px 4px 0 var(--ink)` (a hard, printed offset) with a −2px translate.

## 5. Components

- **Button / primary** — ink fill, paper text, 4px radius, 44px tall. Hover:
  signal fill + ink text + hard shadow. Focus: 2px signal outline, 3px offset.
  Disabled: `paper-sunk` fill, `faint` text.
- **Button / secondary** — 1px `ink` border, transparent. Hover: `paper-sunk`.
- **Button / quiet** — text + `↗`/`→`, underline on hover in `signal`.
- **Link (inline)** — ink, 1px underline in `rule-strong`, hover underline
  becomes `signal` and thickens to 2px.
- **Tag chip** — mono 12px, `paper-sunk` fill, 4px radius, muted text.
- **Status dot** — 8px circle; `signal` pulsing = live, `ok` = shipped,
  `warn` = WIP.
- **Project card** — `paper-raised`, 1px `rule` border, image frame with
  `FIG. 0N` mono caption, title in `text-h3`, one-line summary, chips. Hover:
  border `ink`, hard shadow, image scales 1.03.
- **Nav** — fixed top bar on paper with a blur-free solid background after
  scroll; monogram `HG` left, mono section links, primary "Résumé" button
  right. Active section gets a signal dot.
- **Footer** — oversized display sign-off, email as a giant link, mono
  socials row, build stamp.

## 6. Imagery, icons, texture

- Screenshots sit inside a "figure" frame: 1px rule border, raised paper, a
  mono caption strip (`FIG. 02 — Auramarket landing`).
- Diagrams (architecture) are inline SVG in ink + one signal line.
- Icons: none from icon fonts. Use typographic arrows (`↗ → ↓`) and simple
  inline SVG strokes at 1.5px.
- Texture: faint graph-paper grid (24px minor / 120px major) only behind the
  hero and the figure frames — never full-page.

## 7. Motion

- Library: GSAP + ScrollTrigger, Lenis for smooth scroll. Three.js only in the
  hero.
- Easing: `power3.out` for reveals, `expo.inOut` for big moves. Durations
  0.6–1.0s. Stagger 0.04–0.08s.
- Patterns: line-mask reveals on headings, scrubbed word-by-word ink-in on the
  About statement, count-up on stats, timeline rule that draws on scroll,
  pinned horizontal scroll for featured projects (desktop only).
- `prefers-reduced-motion: reduce` → no Lenis, no scrubbing, no 3D animation
  (static frame), all content visible immediately.
