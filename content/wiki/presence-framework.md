---
title: Presence Framework
summary: >-
  Presence is the framework powering this site — a forkable Next.js personal site
  where: - The site is the **front door** - `/api/v1` is a **stable contract**
  (OpenAPI, `/llms.txt`, skills) - A compiled **LLM Wiki** compounds knowledge
  for search, chat, MCP, and agent surfaces.
type: entity
sources:
  - projects/presence
updated: '2026-07-19'
---
# Presence Framework

**Presence** is a forkable personal platform: beautiful pages on the outside, a versioned `/api/v1` contract and MCP endpoint underneath, and a compiled wiki that powers search and chat.

## Architecture (compressed)

- `content/sources/` — immutable intake
- `content/wiki/` — LLM-maintained compiled pages with dense wiki-links
- `KnowledgeProvider` — hybrid search with graph expansion (wiki first, sources second)
- Modules for blog, projects, resume, wiki, chat, search — toggled in `presence.config.ts`

## Design pillars

- **Sources immutable** — blog, projects, resume live in `content/sources/`
- **Wiki compiled** — LLM agent maintains `content/wiki/` with dense links
- **One service layer** — REST, MCP, and chat tools share the same functions
- **Zero-config boot** — SQLite + lexical search without a database; Postgres/pgvector as you grow

## Lineage

Ideas from [[linear-optimization]] (structure before query-time cleverness), [[nba-analytics]] (confound-aware measurement), and [[d3js]] (relationship visualization) converge here.

See also: [[koba-career]]
