export const profile = {
  name: "Harshvardhan Gupta",
  firstName: "Harshvardhan",
  lastName: "Gupta",
  initials: "HG",
  tagline:
    "I build backend systems that move work around job queues, APIs, and reinforcement-learning environments for LLMs.",
  currently: "B.Tech in Computer Science & AI at Newton School of Technology, class of 2028.",
  email: "harshvardhangofficial@gmail.com",
  resume: "/resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshvardhan-gupta.vercel.app",
  socials: [
    { label: "GitHub", href: "https://github.com/Harsh-gupta-07" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harshvardhan-gupta07/" },
    { label: "LeetCode", href: "https://leetcode.com/u/Harsh-G/" },
  ],
  stats: [
    { value: 8.4, decimals: 1, suffix: "/10", label: "CGPA at NST" },
    { value: 1000, suffix: "+", label: "jobs/sec through goQueue" },
    { value: 100000, suffix: "+", label: "products on Auramarket" },
    { text: "Finalist", label: "Meta × PyTorch × OpenEnv ’25" },
  ] satisfies Stat[],
};

// Numeric stats count up on scroll; `text` stats are shown as-is.
export type Stat =
  | { value: number; decimals?: number; suffix?: string; label: string }
  | { text: string; label: string };
