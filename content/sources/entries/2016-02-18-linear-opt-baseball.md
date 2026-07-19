---
type: post
title: "Linear optimization and baseball teams"
date: "2016-02-18"
summary: "Using Integer Linear Programming to build an optimal 25-man MLB roster from 2015 season player data."
tags: ["r", "linear-optimization", "baseball", "operations-research"]
---

*Co-authored with [Jordan McIntyre](https://www.linkedin.com/in/mcintyrejordan) and [Manish Sharma](https://www.linkedin.com/in/manish-sharma-50318a34).*

Full R Markdown report on RPubs: [rpubs.com/Koba/linear-opt-baseball](http://rpubs.com/Koba/linear-opt-baseball)

Source: [download zip](/ipynb/2016-2-18-linear-opt-baseball.zip) | [Reddit thread](https://redd.it/49mfxu)

> **Edit:** The choice of statistics for our utility index is almost random. The main goal was to model the general constraints and objective function. This code allows you to easily add desired statistics and extend to more sophisticated preferences — e.g. using a weight vector.

## Problem

Can Integer Linear Programming (ILP) select a reasonable 25-man MLB roster? Given 2015 player data, we build an ILP model that maximizes a composite utility score subject to:

- Roster size: exactly 25 players
- Position constraints (pitchers, catchers, infielders, outfielders)
- Salary cap

## Utility index

We normalized offensive and defensive statistics to [0, 1] and combined them into a single utility score:

$$u_i = w_{off} \cdot \text{off\_norm}_i + w_{def} \cdot \text{def\_norm}_i$$

## The resulting best 25-man team

| Name | Position | Team | Salary | Off. | Def. |
|---|---|---|---|---|---|
| Clayton Kershaw | SP | — | $31,000,000 | 0.23 | 0.37 |
| David Price | SP | — | $19,750,000 | 0.23 | 0.37 |
| Buster Posey | C | Giants | $17,277,777 | 0.49 | 0.53 |
| Max Scherzer | SP | — | $17,142,857 | 0.23 | 0.37 |
| Joey Votto | 1B | Reds | $14,000,000 | 0.80 | 0.19 |
| Yoenis Cespedes | OF | — | $10,500,000 | 0.54 | 0.58 |
| Aroldis Chapman | Closer | Reds | $8,050,000 | 0.23 | 0.37 |
| Mike Trout | OF | Angels | $7,000,000 | 1.00 | 0.41 |
| Bryce Harper | OF | Nationals | $2,500,000 | 1.00 | 0.20 |
| Dee Gordon | 2B | Marlins | $2,500,000 | 0.38 | 0.54 |
| *…and 15 more* | | | | | |

## R implementation

```r
library(lpSolve)

# Objective: maximize utility
obj <- players$utility

# Constraints matrix
con <- rbind(
  rep(1, n),          # exactly 25 players
  players$is_pitcher, # at least 10 pitchers
  players$is_catcher, # at least 2 catchers
  players$salary      # salary cap
)

dir <- c("=", ">=", ">=", "<=")
rhs <- c(25, 10, 2, salary_cap)

result <- lp("max", obj, con, dir, rhs, all.bin = TRUE)
best_team <- players[result$solution == 1, ]
```

## Takeaways

- ILP finds a valid solution quickly, but the **quality is only as good as your utility index**.
- Small changes to weights produce very different rosters — a reminder that coefficient estimation dominates solver precision.
- The same framework applies cleanly to fantasy sports lineup optimization with tighter salary constraints.
