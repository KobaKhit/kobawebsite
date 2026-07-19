#!/usr/bin/env node
/**
 * create-persona — scaffold a new Persona site from this template.
 * Usage: node packages/create-persona/bin/create-persona.js [dir]
 *    or: npx create-persona my-site  (when published)
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const targetArg = process.argv[2] || "my-persona";
const targetDir = path.resolve(process.cwd(), targetArg);

const TEMPLATE_HINTS = [
  "content/persona.config.ts",
  "content/sources",
  "content/wiki",
  "package.json",
  "README.md",
];

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function copyDir(src, dest, skip = new Set()) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to, skip);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function findTemplateRoot() {
  // Prefer walking up from this package to the Persona repo root
  let dir = path.resolve(__dirname, "../../..");
  if (fs.existsSync(path.join(dir, "content", "persona.config.ts"))) return dir;

  dir = path.resolve(__dirname, "..");
  if (fs.existsSync(path.join(dir, "template"))) return path.join(dir, "template");

  // When installed standalone, look for bundled template/
  const bundled = path.join(__dirname, "..", "template");
  if (fs.existsSync(bundled)) return bundled;

  return null;
}

function writeMinimalTemplate(dest) {
  const pkg = {
    name: path.basename(dest),
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev --turbopack",
      build: "next build",
      start: "next start",
      persona: "tsx scripts/persona.ts",
    },
    dependencies: {
      next: "15.5.20",
      react: "19.1.0",
      "react-dom": "19.1.0",
    },
  };
  fs.mkdirSync(dest, { recursive: true });
  fs.writeFileSync(path.join(dest, "package.json"), JSON.stringify(pkg, null, 2));
  fs.writeFileSync(
    path.join(dest, "README.md"),
    `# ${path.basename(dest)}

Scaffolded by create-persona.

This is a **minimal stub**. Clone or copy the full Persona repo for the complete framework:

1. Copy the Persona template repository into this folder, or
2. From a Persona checkout: \`node packages/create-persona/bin/create-persona.js ${path.basename(dest)}\`

Then:

\`\`\`bash
npm install
cp .env.example .env.local   # add OPENROUTER_API_KEY
npm run persona -- compile --no-llm
npm run dev
\`\`\`
`,
  );
  fs.mkdirSync(path.join(dest, "content"), { recursive: true });
  fs.writeFileSync(
    path.join(dest, "content", "persona.config.ts"),
    `import type { PersonaConfig } from "@/lib/config/types";

const config: PersonaConfig = {
  name: "You",
  fullName: "Your Name",
  tagline: "Replace me — edit content/persona.config.ts",
  bio: "Short bio for your Persona site.",
  social: {
    github: "",
    twitter: "",
    linkedin: "",
  },
  theme: {
    accent: "#0f766e",
    accentBright: "#14b8a6",
    ink: "#0d1b2a",
    muted: "#5c6b7a",
    paper: "#f0f3f7",
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
    // Set after you publish a template repo, e.g. https://github.com/you/persona
    templateRepoUrl: "",
  },
};

export default config;
`,
  );
}

function main() {
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    die(`Target directory is not empty: ${targetDir}`);
  }

  const root = findTemplateRoot();
  console.log(`create-persona → ${targetDir}`);

  if (!root) {
    console.warn("Full Persona template not found nearby — writing minimal stub.");
    writeMinimalTemplate(targetDir);
    console.log("Done (minimal). Prefer running from a Persona checkout for a full copy.");
    return;
  }

  const skip = new Set([
    "node_modules",
    ".next",
    ".git",
    "data",
    ".vercel",
    "packages",
    "dist",
  ]);

  // If root is the monorepo, copy framework files
  if (fs.existsSync(path.join(root, "content", "persona.config.ts"))) {
    console.log(`Copying from ${root}`);
    copyDir(root, targetDir, skip);
    // Reset identity config to placeholders
    const configPath = path.join(targetDir, "content", "persona.config.ts");
    if (fs.existsSync(configPath)) {
      let text = fs.readFileSync(configPath, "utf8");
      text = text
        .replace(/name:\s*"[^"]+"/, 'name: "You"')
        .replace(/fullName:\s*"[^"]+"/, 'fullName: "Your Name"')
        .replace(/tagline:\s*"[^"]+"/, 'tagline: "Edit content/persona.config.ts"');
      fs.writeFileSync(configPath, text);
    }
    // Drop local env if copied
    for (const envName of [".env", ".env.local"]) {
      const p = path.join(targetDir, envName);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  } else {
    copyDir(root, targetDir, skip);
  }

  console.log("\nNext steps:");
  console.log(`  cd ${targetArg}`);
  console.log("  npm install");
  console.log("  cp .env.example .env.local");
  console.log("  npm run persona -- compile --no-llm");
  console.log("  npm run dev");
  console.log("\nChecked paths:", TEMPLATE_HINTS.join(", "));

  try {
    execSync("npm --version", { stdio: "ignore" });
  } catch {
    /* ignore */
  }
}

main();
