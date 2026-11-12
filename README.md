# Harshvardhan Gupta — portfolio

Next.js 16 (App Router) · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · three.js · MDX

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (also type-checks)
```

Design decisions live in [`DESIGN.md`](./DESIGN.md).

## Adding a project

1. Add an entry to [`content/projects.ts`](./content/projects.ts). `category` picks the section:
   `featured` → Selected work, `daily` → Projects I use myself, `other` → Other projects.
2. *(Optional)* Write the long-form page in `content/projects/<slug>.mdx` — `##` headings,
   lists, tables and code blocks are styled automatically.
3. Put screenshots in `public/projects/<slug>/` and reference them as `cover` / `gallery`.

Use the same tool names as [`data/skills.ts`](./data/skills.ts) in `stack` so the Tech Stack
section can link skills to projects.

## Other content

| What | Where |
|---|---|
| Name, tagline, email, socials, hero stats | `data/profile.ts` |
| Education & coursework | `data/education.ts` |
| Achievements | `data/achievements.ts` |
| Skills | `data/skills.ts` |
| Résumé PDF | `public/resume.pdf` |

## Motion

Scroll animations are declarative — add a data attribute in any server component:
`data-reveal`, `data-split`, `data-scrub-words`, `data-count`, `data-draw`
(see `components/motion/motion-controller.tsx`). Every page renders `<MotionController />`
as its last child. Reduced-motion users get static content.

## Deploy

Import the repo on Vercel — no config needed. Set `NEXT_PUBLIC_SITE_URL` to the final domain
so metadata and Open Graph URLs are correct.
