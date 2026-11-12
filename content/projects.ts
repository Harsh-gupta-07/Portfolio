/**
 * Every project on the site. To add one:
 *   1. Add an entry below (TypeScript checks the shape).
 *   2. Optionally write the long-form page in content/projects/<slug>.mdx.
 *   3. Drop images in public/projects/<slug>/.
 *
 * `category` decides where it shows on the landing page:
 *   featured → "Selected work"      daily → "Projects I use myself"
 *   other    → "Other projects"
 */

export type ProjectCategory = "featured" | "daily" | "other";
export type ProjectStatus = "live" | "shipped" | "wip" | "archived";

export type ProjectLink = { label: string; href: string; note?: string };

export type Project = {
  slug: string;
  title: string;
  /** One line for cards. */
  summary: string;
  /** Short paragraph for the top of the project page. */
  description: string;
  date: string; // "YYYY-MM" or "YYYY"
  category: ProjectCategory;
  status: ProjectStatus;
  role?: string;
  /** Use the names from data/skills.ts so the Tech Stack section can link them. */
  stack: string[];
  links: ProjectLink[];
  /** Headline numbers shown on the project page. */
  metrics?: { value: string; label: string }[];
  /** Built-in illustration used instead of a cover image. */
  diagram?: "goqueue";
  cover?: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number; caption?: string }[];
  /** For "Projects I use myself": how it fits into daily life. */
  usage?: string;
};

export const projects: Project[] = [
  {
    slug: "goqueue",
    title: "goQueue",
    summary: "A background job queue and task scheduler in Go — Redis for speed, Postgres for truth.",
    description:
      "goQueue lets an application hand off slow work — HTTP calls, timeouts, file logging  and get back to serving requests. Jobs land in Redis priority lanes, a pool of Go workers drains them, and every state change is recorded in PostgreSQL so nothing is lost or run twice.",
    date: "2026-03",
    category: "featured",
    status: "shipped",
    role: "Solo — design & build",
    stack: ["Go", "Redis", "PostgreSQL", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Harsh-gupta-07/goQueue" }],
    metrics: [
      { value: "1,000+", label: "jobs / sec" },
      { value: "3", label: "priority lanes" },
      { value: "7", label: "REST endpoints" },
    ],
    diagram: "goqueue",
    gallery: [
      {
        src: "/projects/goqueue/repo.jpg",
        alt: "goQueue GitHub repository showing api, cmd, db and job packages",
        width: 2000,
        height: 880,
        caption: "Repository layout — api, cmd, db, job",
      },
    ],
  },
  {
    slug: "smart-emergency",
    title: "Smart Emergency",
    summary: "An OpenEnv RL environment where an LLM plays 911 dispatcher. Hackathon finalist.",
    description:
      "Each episode streams live 911 call transcripts at an agent that has to triage severity, spot duplicate calls and dispatch the right unit across a procedurally generated city. Built for the Meta × PyTorch × OpenEnv Hackathon, where it reached the finals, and used to fine-tune Qwen2.5-1.7B with SFT and GRPO.",
    date: "2025",
    category: "featured",
    status: "live",
    role: "Environment, reward design & training",
    stack: ["Python", "PyTorch", "Hugging Face", "Transformers", "Unsloth", "Docker"],
    links: [
      { label: "Hugging Face Space", href: "https://huggingface.co/spaces/Harsh-Gupta-07/smart_emergency" },
      { label: "Source", href: "https://huggingface.co/spaces/Harsh-Gupta-07/smart_emergency/tree/main" },
    ],
    metrics: [
      { value: "5", label: "reward components" },
      { value: "20", label: "steps / episode" },
      { value: "1.7B", label: "params fine-tuned" },
    ],
    cover: {
      src: "/projects/smart-emergency/playground.jpg",
      alt: "OpenEnv playground with dispatch action fields for the Smart Emergency environment",
      width: 2000,
      height: 1225,
    },
    gallery: [
      {
        src: "/projects/smart-emergency/code.jpg",
        alt: "Hugging Face Space file tree including server, GRPO notes and the SFT + GRPO training script",
        width: 2000,
        height: 973,
        caption: "Space files — server, training notebook, GRPO notes",
      },
    ],
  },
  {
    slug: "auramarket",
    title: "Auramarket",
    summary: "Full-stack store with a 100k-product catalogue, JWT auth and an admin dashboard.",
    description:
      "A three-tier e-commerce platform: a Next.js storefront, an Express API and a PostgreSQL database through Prisma. Customers search, filter and check out; admins manage products, orders and users from their own dashboard.",
    date: "2025-10",
    category: "daily",
    status: "live",
    role: "Solo — frontend, API & data model",
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma"],
    links: [
      { label: "Live site", href: "https://auramarket.vercel.app/" },
      { label: "Frontend", href: "https://github.com/Harsh-gupta-07/auramarket" },
      { label: "Backend", href: "https://github.com/Harsh-gupta-07/Auramarket-server" },
    ],
    metrics: [
      { value: "100k+", label: "products" },
      { value: "2", label: "roles — admin & user" },
      { value: "12", label: "API endpoints" },
    ],
    cover: {
      src: "/projects/auramarket/landing.jpg",
      alt: "Auramarket landing page with the headline Shop Smart, Live Better",
      width: 2000,
      height: 1022,
    },
    gallery: [
      {
        src: "/projects/auramarket/repo.jpg",
        alt: "Auramarket GitHub repository",
        width: 2000,
        height: 993,
        caption: "Frontend repository",
      },
    ],
  },
  {
    slug: "budget-tracker",
    title: "Budget Tracker",
    summary: "Personal finance tracker with categories, live charts and recurring reminders.",
    description:
      "A personal finance tool built on Firebase: set budgets per category, log expenses as they happen and watch the charts update in real time. Recurring reminders keep bills from slipping, and Firebase sync keeps every session consistent.",
    date: "2025-05",
    category: "other",
    status: "shipped",
    stack: ["Next.js", "React", "Firebase"],
    links: [{ label: "GitHub", href: "https://github.com/Harsh-gupta-07/Budget-Tracker" }],
    cover: {
      src: "/projects/budget-tracker/login.jpg",
      alt: "Budget Tracker sign-in screen on a dark grid background",
      width: 2000,
      height: 1012,
    },
    gallery: [
      {
        src: "/projects/budget-tracker/repo.jpg",
        alt: "Budget Tracker GitHub repository",
        width: 2000,
        height: 1040,
        caption: "Repository",
      },
    ],
  },
];
