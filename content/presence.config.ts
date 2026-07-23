import type { PresenceConfig } from "@/lib/config/types";

/**
 * Identity & module toggles — forks edit this file, never framework code.
 */
const config: PresenceConfig = {
  name: "Koba",
  fullName: "Koba Khitalishvili",
  tagline: "Data scientist, analytics engineer, and occasional web builder.",
  bio: "I'm a data scientist and analytics expert with experience in academia, sports, and marketing technology. I love creating value through data-driven solutions — clean models, good visualizations, and a clear story. Outside of work I volunteer as a Global Shaper (Philadelphia hub) and build websites for fun.",
  roles: ["Data Scientist", "Analytics Engineer", "BI Expert", "Baller"],
  avatar: "/img/about-square.jpg",
  location: "United States",
  email: "kobakhit@gmail.com",
  website: "https://kobakhit.com",
  social: {
    github: "https://github.com/KobaKhit",
    twitter: "https://x.com/kobakhit",
    linkedin: "https://linkedin.com/in/kobakhit",
    instagram: "https://instagram.com/dostre",
  },
  theme: {
    defaultTheme: "lab",
    presets: {
      lab: {
        label: "Editorial lab",
        accent: "#0f766e",
        accentBright: "#14b8a6",
        ink: "#0d1b2a",
        muted: "#5c6b7a",
        paper: "#f0f3f7",
        paperDeep: "#e2e7ee",
        accentWarm: "#c45c26",
      },
      midnight: {
        label: "Midnight agentic",
        accent: "#38bdf8",
        accentBright: "#7dd3fc",
        ink: "#e2e8f0",
        muted: "#94a3b8",
        paper: "#0b1220",
        paperDeep: "#111827",
        accentWarm: "#f472b6",
      },
      minimal: {
        label: "Minimal professional",
        accent: "#2563eb",
        accentBright: "#3b82f6",
        ink: "#111827",
        muted: "#6b7280",
        paper: "#fafafa",
        paperDeep: "#f3f4f6",
        accentWarm: "#d97706",
      },
    },
  },
  modules: {
    blog: true,
    projects: true,
    resume: true,
    wiki: true,
    chat: true,
    search: true,
  },
  features: {
    showDeployBadge: true,
    enableMcp: true,
    enableAgent: true,
  },
  knowledge: {
    provider: "wiki",
    embeddingModel: "openai/text-embedding-3-small",
    chatModel: "openai/gpt-4o-mini",
  },
  deploy: {
    templateRepoUrl: "https://github.com/KobaKhit/presence",
  },
};

export default config;
