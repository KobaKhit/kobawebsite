# AGENTS.md

Canonical copy also served at `/AGENTS.md` (see `public/AGENTS.md`).

You are helping maintain a **Persona** site — Next.js personal platform with an LLM Wiki knowledge layer.

## Quick map
- Identity: `content/persona.config.ts`
- Sources (immutable): `content/sources/`
- Wiki (compiled): `content/wiki/`
- Graph index: `content/wiki-graph.json`
- API contract: `/openapi.json`
- Machine index: `/llms.txt`
- Skills: `/skills/*/SKILL.md`

## Commands
```bash
npm run dev
npm run persona -- compile
npm run persona -- doctor
npm run persona -- reindex
npm run persona -- ingest <url-or-file>
node packages/create-persona/bin/create-persona.js my-site
```

## LLM
Prefer `OPENROUTER_API_KEY` (OpenAI-compatible at `https://openrouter.ai/api/v1`). Fall back to `OPENAI_API_KEY`. Selection lives in `src/lib/llm/`. Without keys, chat/compile stay extractive/graph-only.

## Vectors
Default persistent store: `data/vectors.sqlite` (SQLite). Optional Postgres/pgvector via `DATABASE_URL` + `npm install pg` — see `docs/vector-store.md`.

## Rules
1. Prefer `/api/v1` over scraping.
2. Do not edit sources to “fix” wiki — update wiki or add a new source.
3. After wiki changes, recompile the graph (`persona compile` / `--no-llm`).
4. Keep Zod schemas in sync when adding routes.
5. Do not invent a published template URL — set `deploy.templateRepoUrl` only when real.
