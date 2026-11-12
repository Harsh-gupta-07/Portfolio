export type EducationEntry = {
  period: string;
  title: string;
  institute: string;
  score: string;
  scoreLabel: string;
  primary?: boolean;
  note?: string;
};

export const education: EducationEntry[] = [
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Artificial Intelligence",
    institute: "Newton School of Technology × Rishihood University",
    score: "8.4",
    scoreLabel: "CGPA / 10",
    primary: true,
  },
  {
    period: "2022 — 2023",
    title: "Intermediate (Class XII)",
    institute: "Rungta Public School",
    score: "73%",
    scoreLabel: "Marks",
  },
  {
    period: "2020 — 2021",
    title: "Matriculation (Class X)",
    institute: "Rungta Public School",
    score: "85%",
    scoreLabel: "Marks",
  },
];

export const coursework: { group: string; items: string[] }[] = [
  {
    group: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    group: "Databases & Backend",
    items: ["Database Management Systems", "Web Development", "API Design", "System Design Fundamentals"],
  },
  {
    group: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "Reinforcement Learning", "Probability & Statistics"],
  },
  {
    group: "Foundations",
    items: ["Discrete Mathematics", "Linear Algebra", "Computer Architecture"],
  },
];
