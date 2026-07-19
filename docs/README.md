# Persona docs

Essential guides for forking and operating a Persona site. Also see `/deploy`, `/setup`, and `/llms.txt` on a running instance.

| Doc | Topic |
|---|---|
| [Entries](./entries.md) | Unified content: md / html / folders + type tabs |
| [Knowledge layer](./knowledge.md) | Sources, wiki, compile, contradictions |
| [Vector store](./vector-store.md) | SQLite default, optional pgvector |
| [Deploy](./deploy.md) | Vercel button, CI, env vars |
| [Agents & MCP](./agents.md) | `/api/mcp`, skills, AG-UI agent |

## Quick commands

```bash
npm run persona -- compile          # LLM synthesis (if keyed) + graph + vectors
npm run persona -- compile --no-llm # graph + vector reindex without synthesis
npm run persona -- doctor           # orphans, missing links, contradictions
npm run persona -- reindex          # graph + persist embeddings
npm run persona -- ingest <url|file>
```
