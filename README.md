# Persona

Open-source **Next.js personal site framework** where the site is the front door, the API is a contract, and a compiled LLM Wiki powers search, chat, and MCP.

> Fork → edit `content/` → deploy. Zero-config boot (SQLite vectors, no cloud DB required).

## Features

- **Site**: home, blog, projects, resume, wiki, chat, docs
- **Knowledge layer**: immutable `content/sources/` + compiled `content/wiki/` with `[[wiki-links]]`
- **Hybrid retrieval**: Fuse lexical + **persistent vectors** (SQLite default / optional pgvector) + graph expansion
- **Incremental compile**: entity extract → create/update pages → flag contradictions
- **API**: versioned `/api/v1/*` + generated `/openapi.json`
- **Agents**: `/api/agent` (SSE), `/api/mcp`, `/llms.txt`, skills
- **Growth loop**: deploy badge → `/deploy` (config-driven template URL)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scaffold a new site

```bash
node packages/create-persona/bin/create-persona.js my-site
```

### LLM (optional)

Copy `.env.example` → `.env.local`. Prefer **OpenRouter**:

```bash
OPENROUTER_API_KEY=sk-or-...
```

Fallback: `OPENAI_API_KEY`. With neither key, chat/search stay extractive (wiki-grounded).

## Customize

1. Edit `content/persona.config.ts` (name, bio, theme, `deploy.templateRepoUrl`, social)
2. Add content under `content/sources/entries/` with `type: post|project|visual` (single `.md`/`.html` or a folder with `index.md` + assets)
3. Run `npm run persona -- compile`
4. Review wiki PRs from the GitHub Action before merging

See [docs/entries.md](./docs/entries.md) for packaging details.

## CLI

```bash
npm run persona -- compile          # LLM synthesis (if keyed) + graph + vectors
npm run persona -- compile --no-llm # graph + vector reindex without synthesis
npm run persona -- doctor           # orphans / missing links / contradictions
npm run persona -- reindex          # graph + persist embeddings
npm run persona -- ingest <url-or-file>
```

See [docs/](./docs/) for vector store and CI details.

## Deploy

Set `deploy.templateRepoUrl` in `content/persona.config.ts` when your template repo is public. Until then, import the repo manually in Vercel / Railway / Render (`railway.json`, `render.yaml` included).

Live surfaces: `/deploy`, `/setup`, `/docs`.

## Architecture

```
content/          identity + sources + wiki
data/             local vectors.sqlite (gitignored)
src/lib/          config, KnowledgeProvider, llm/, vector-store
src/app/          pages + /api/v1 + agent + mcp
scripts/persona.ts
packages/create-persona/
.github/workflows/wiki-compile.yml
```

## Roadmap status

| Phase | Status |
|---|---|
| 0 Framework skeleton | ✅ |
| 1 Knowledge compiler | ✅ incremental + contradictions + vectors |
| 2 Surfaces (wiki, chat, search, save-back) | ✅ |
| 3 Agent access (MCP, skills) | ✅ |
| 4 Launch polish | ✅ scaffolder start, GH Action, docs, deploy config (no Ollama) |
