# create-persona

Scaffold a new [Persona](../../README.md) site.

## Usage

From a Persona checkout (full copy of the framework):

```bash
node packages/create-persona/bin/create-persona.js my-site
cd my-site
npm install
cp .env.example .env.local
npm run persona -- compile --no-llm
npm run dev
```

When published to npm:

```bash
npx create-persona my-site
```

If the scaffolder cannot find the template repo, it writes a minimal stub and points you at the full framework.
