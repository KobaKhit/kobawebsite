---
type: project
title: "Persona"
date: "2026-07-01"
summary: "An open-source Next.js personal site framework with a compounding LLM Wiki knowledge layer, versioned API, MCP/agent surfaces, and OpenRouter-first LLM integration."
tags: ["nextjs", "open-source", "ai", "knowledge-management"]
status: active
featured: true
---

Persona is the framework powering this site — a forkable Next.js personal site where:

- The site is the **front door**
- `/api/v1` is a **stable contract** (OpenAPI, `/llms.txt`, skills)
- A compiled **LLM Wiki** compounds knowledge for search, chat, MCP, and agent surfaces

## How it works

1. Write in `content/sources/` — blog posts, projects, resume (immutable)
2. Run `persona compile` — entity extraction + wiki page generation via OpenRouter/OpenAI
3. Search, chat, and agent surfaces are automatically grounded in the wiki

## Stack

- Next.js 15 + TypeScript + Tailwind CSS
- SQLite persistent vectors (optional pgvector)
- OpenRouter LLM (OpenAI fallback, extractive zero-config)
- GitHub Action: compile-as-PR on source changes

## Key surfaces

- `/wiki` — compiled knowledge graph with D3 link visualization
- `/chat` — wiki-grounded conversational interface
- `/api/v1/*` — versioned REST API + OpenAPI spec
- `/api/mcp` — MCP tool endpoint
- `/api/agent` — SSE agent streaming

[GitHub](https://github.com/kobakhit/persona)
