// Names here must match the `stack` strings in content/projects.ts so the
// Tech Stack section can link skills to the projects that use them.
export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "Go", "Rust", "Swift"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "AWS", "Supabase", "Firebase", "Redis"] },
  { group: "Databases & ORMs", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { group: "DevOps & Tools", items: ["Docker", "Git", "GitHub Actions", "Postman"] },
  {
    group: "AI / ML",
    items: ["PyTorch", "TensorFlow", "Hugging Face", "Transformers", "Unsloth", "Claude Code"],
  },
];
