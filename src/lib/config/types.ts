export interface PersonaSocial {
  github?: string;
  twitter?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

export interface PersonaTheme {
  accent: string;
  accentBright: string;
  ink: string;
  muted: string;
  paper: string;
}

export interface PersonaModules {
  blog: boolean;
  projects: boolean;
  resume: boolean;
  wiki: boolean;
  chat: boolean;
  search: boolean;
}

export interface PersonaFeatures {
  showDeployBadge: boolean;
  enableMcp: boolean;
  enableAgent: boolean;
}

export interface PersonaKnowledgeConfig {
  provider: "wiki" | "graphrag";
  embeddingModel: string;
  chatModel: string;
}

export interface PersonaDeployConfig {
  /**
   * Public GitHub template URL for the Vercel clone button.
   * Leave empty until published — UI will show setup instructions instead of a fake URL.
   */
  templateRepoUrl?: string;
}

export interface PersonaConfig {
  name: string;
  fullName: string;
  tagline: string;
  bio: string;
  /** Rotating role labels shown on the home page */
  roles?: string[];
  /** Path to avatar image under /public, e.g. "/img/about-square.jpg" */
  avatar?: string;
  location?: string;
  email?: string;
  website?: string;
  social: PersonaSocial;
  theme: PersonaTheme;
  modules: PersonaModules;
  features: PersonaFeatures;
  knowledge: PersonaKnowledgeConfig;
  deploy?: PersonaDeployConfig;
}
