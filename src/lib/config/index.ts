import config from "../../../content/persona.config";
import type { PersonaConfig } from "./types";

export type { PersonaConfig } from "./types";

export function getPersonaConfig(): PersonaConfig {
  return config;
}
