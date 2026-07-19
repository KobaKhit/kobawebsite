---
title: NBA Analytics
summary: >-
  The use of data analysis techniques to evaluate player performance and team
  strategy in the NBA.
type: hub
sources:
  - blog/plus-minus-without-fools
  - blog/linear-optimization-lineups
  - projects/nba-lineup-optimizer
  - projects/court-vision-charts
  - blog/2016-02-18-linear-opt-baseball
  - blog/2016-03-06-indego-bike-folium
updated: '2026-07-19'
---
# NBA Analytics

Koba's basketball analytics work (roughly 2013–2016 corpus) centers on **credit assignment** and **decision models**.

## Themes

- **Plus-minus & APM** — teammate/opponent confounds; ridge regularization; sample-size humility. See source *Reading Plus-Minus Without Getting Fooled*.
- **Lineup construction** — projections feed [[linear-optimization]] MIPs under salary and position constraints.
- **Visualization** — shot charts and lineup networks via [[d3js]], informing later wiki graph UX in [[persona-framework]].

## Multi-hop note

Optimization work influenced NBA analysis by treating lineups as constrained combinatorial problems rather than ranked lists — the same instinct that makes [[llm-wiki]] prefer compiled structure over naive chunk RAG.

## Views that evolved

- The definition of NBA analytics has expanded to include various data analysis techniques beyond traditional statistics, emphasizing the importance of modern tools and methodologies in evaluating player performance and team strategy (source: blog/2016-02-18-linear-opt-baseball, blog/2016-03-06-indego-bike-folium).
