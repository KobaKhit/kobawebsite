---
title: LLM Wiki
summary: >-
  A personal knowledge management system that compiles and organizes information
  into a structured wiki format.
type: hub
sources:
  - projects/presence
updated: '2026-07-19'
---
# LLM Wiki

The **LLM Wiki** pattern treats personal writing like source code: an agent *compiles* it into concept pages that are denser, deduplicated, and cross-referenced.

## Three layers

1. **Sources** — immutable audit trail
2. **Wiki** — agent-written pages with dense wiki-links
3. **Query + save-back** — answers from wiki; novel syntheses can become new pages (with approval)

## Retrieval

At query time, [[presence-framework]] seeds matches with lexical/vector search, then expands 1–2 hops on the link graph. That yields multi-hop answers — e.g. how [[linear-optimization]] influenced [[nba-analytics]] — that naive RAG misses.

## Related

- [[index]]
- [[presence-framework]]
- [[koba-career]]


Existing wiki slugs: d3js, index, koba-career, linear-optimization, llm-wiki, nba-analytics, presence-framework, adjusted-plus-minus, nba-lineup-optimizer

Corpus excerpt (authoritative):
### SOURCE blog/linear-optimization-lineups
title: Linear Optimization for Lineup Construction

Fantasy and coaching staffs face the same combinatorial problem: pick a subset of players under salary, position, and minutes constraints that maximizes expected value.

I frame this as a mixed-integer program. Binary variables select players; linear inequalities encode roster rules; the objective is expected points (or plus-minus, or a custom utility).

The important modeling choice is not the solver — CBC or Gurobi will both finish — it's how you estimate the coefficients. Noise in player projections dominates solver precision. So the optimization work sits on top of a forecasting stack: aging curves, injury priors, and matchup adjustments.

This pattern — **estimate, then optimize under hard constraints** — shows up everywhere in my later work, from draft boards to personal knowledge systems that decide what to compile next.

---

### SOURCE blog/personal-wikis-beat-rag
title: Why Personal Wikis Beat Naive RAG

Standard RAG retrieves random chunks. It has no sense that your 2015 optimization post influenced your 2016 NBA work, and it re-derives relationships on every query.

An **LLM Wiki** flips the timeline: at ingest time, an agent extracts entities, writes dense concept pages, and densifies `[[wiki-links]]`. Query time becomes retrieval over a pre-compiled graph — wiki pages first, source excerpts second, with 1–2 hop expansion along links.

That is the knowledge layer behind Presence. Sources stay immutable; the wiki is the compiled artifact; contradictions and orphans surface in `presence doctor`.

---

### SOURCE blog/plus-minus-without-fools
title: Reading Plus-Minus Without Getting Fooled

Raw plus-minus is seductive and wrong. A player next to stars looks elite; a stopper on a bad team looks average. Adjusted plus-minus (APM) tries to untangle teammate and opponent effects with a large regression — usually ridge-regularized because the design matrix is wildly collinear.

What matters in practice:

1. **Regularization strength** trades bias for variance. Too little and you overfit lineup noise; too much and everyone shrinks toward the mean.
2. **Sample size** still rules. A 200-minute sample of APM is barely informative.
3. **Context features** (pace, lineup type) often beat cleverer estimators.

I use APM-style thinking as a habit: whenever a metric looks like credit assignment, ask what confounds are baked in, then shrink aggressively.

---

### SOURCE projects/court-vision-charts
title: Court Vision Charts

Interactive D3 charts for basketball analytics: hexbin shot charts, player–player link diagrams for lineups, and small-multiples for rolling plus-minus.

The lineup network work later informed how Presence renders its **wiki link graph** — same instinct: nodes as entities, edges as relationships, interaction for exploration.

---

### SOURCE projects/nba-lineup-optimizer
title: NBA Lineup Optimizer

A Python toolkit that takes player projections and league roster rules, then solves a mixed-integer program for optimal lineups. Used as a teaching vehicle for connecting forecasting to constrained optimization.

Key pieces: projection CSV ingest, constraint DSL, CBC/PuLP solve path, and a small report of selected players with dual-ish sensitivity notes (which constraints bind).

---

### SOURCE projects/presence
title: Presence

**Presence** is a forkable personal site: beautiful pages on the outside, a versioned `/api/v1` contract and MCP endpoint underneath, and a compiled wiki that powers search and chat.

### Design pillars

- **Sources immutable** — blog, projects, resume live in `content/sources/`
- **Wiki compiled** — LLM agent maintains `content/wiki/` with dense links
- **One service layer** — REST, MCP, and chat tools share the same functions
- **Zero-config boot** — SQLite + lexical search without a database; Postgres/pgvector as you grow

---

### SOURCE resume
title: resume

# Koba Khitalishvili

**Focus:** decision models, NBA analytics, knowledge systems for personal sites.

## Experience

- **Independent / open source** — Building Presence, a Next.js personal site framework with an LLM Wiki knowledge layer (2026–).
- **Sports analytics** — Forecasting, adjusted plus-minus, and lineup optimization for basketball applications (2013–2016 corpus; ongoing interest).
- **Data visualization** — D3-based exploratory tools for shot charts and lineup networks.

## Skills

- Statistical modeling, mixed-integer programming, Python, R, TypeScript
- Next.js, knowledge retrieval, agent tooling (MCP, structured APIs)
- Data visualization (D3)

## Education

- Quantitative methods / applied statistics background applied to sports and decision problems

## Contact

- Site: kobakhit.com
- GitHub: github.com/kobakhit
