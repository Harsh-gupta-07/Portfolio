export type Achievement = {
  year: string;
  title: string;
  org: string;
  summary: string;
  points: string[];
  project?: string; // slug of the related project page
  image?: { src: string; alt: string };
};

export const achievements: Achievement[] = [
  {
    year: "2025",
    title: "Finalist",
    org: "Meta × PyTorch × OpenEnv Hackathon",
    summary: "Reached the finals out of hundreds of teams in a hackathon co-organised by Meta, PyTorch and OpenEnv.",
    points: [
      "Built a custom RL environment on OpenEnv that simulates 911 dispatch, scoring LLMs on severity triage, duplicate-call detection and rerouting of low-priority units.",
      "Fine-tuned Qwen2.5-1.7B with SFT then GRPO using Unsloth, and deployed it on Hugging Face Spaces.",
    ],
    project: "smart-emergency",
    image: {
      src: "/projects/smart-emergency/playground.jpg",
      alt: "OpenEnv playground for the Smart Emergency environment with dispatch action fields",
    },
  },
];
