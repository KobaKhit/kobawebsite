# Koba's Presence site

This repository is **Koba Khitalishvili's** personal site, built on the open-source **[Presence](https://github.com/KobaKhit/presence)** framework — Next.js personal platform where the site is the front door, the API is a contract, and a compiled LLM Wiki powers search, chat, and MCP.

Framework template: [https://github.com/KobaKhit/presence](https://github.com/KobaKhit/presence)

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
node packages/create-presence/bin/create-presence.js my-site
```

### LLM (optional)

Copy `.env.example` → `.env.local`. Prefer **OpenRouter**:

```bash
OPENROUTER_API_KEY=sk-or-...
```

Fallback: `OPENAI_API_KEY`. With neither key, chat/search stay extractive (wiki-grounded).

## Customize

1. Edit `content/presence.config.ts` (name, bio, theme, `deploy.templateRepoUrl`, social)
2. Add content under `content/sources/entries/` with `type: post|project|visual` (single `.md`/`.html` or a folder with `index.md` + assets)
3. Run `npm run presence -- compile`
4. Review wiki PRs from the GitHub Action before merging

See [docs/entries.md](./docs/entries.md) for packaging details.

## CLI

```bash
npm run presence -- compile          # LLM synthesis (if keyed) + graph + vectors
npm run presence -- compile --no-llm # graph + vector reindex without synthesis
npm run presence -- doctor           # orphans / missing links / contradictions
npm run presence -- reindex          # graph + persist embeddings
npm run presence -- ingest <url-or-file>
```

`npm run persona` still works as an alias for the same CLI.

See [docs/](./docs/) for vector store and CI details.

## Deploy

Set `deploy.templateRepoUrl` in `content/presence.config.ts` when your template repo is public. Until then, import the repo manually in Vercel / Railway / Render (`railway.json`, `render.yaml` included).

Live surfaces: `/deploy`, `/setup`, `/docs`.

## Architecture

```
content/          identity + sources + wiki
data/             local vectors.sqlite (gitignored)
src/lib/          config, KnowledgeProvider, llm/, vector-store
src/app/          pages + /api/v1 + agent + mcp
scripts/presence.ts
packages/create-presence/
.github/workflows/wiki-compile.yml
```

## Upstream

To sync framework improvements from the template, see [docs/upstream-sync.md](./docs/upstream-sync.md).
