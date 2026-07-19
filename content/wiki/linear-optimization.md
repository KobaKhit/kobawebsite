---
title: Linear Optimization
summary: >-
  A mathematical method for determining a way to achieve the best outcome in a
  given mathematical model.
type: concept
sources:
  - blog/2016-02-18-linear-opt-baseball
updated: '2026-07-19'
---
# Linear Optimization

**Linear and mixed-integer programming** appear throughout Koba's work as the bridge between *estimates* and *actions*. Once you have player projections (or any utility scores), roster rules become linear inequalities and selection becomes binary variables.

## Core pattern

1. Estimate coefficients (noisy; dominates solver precision).
2. Encode hard constraints (salary, positions, minutes).
3. Optimize expected utility with a MIP solver (CBC, Gurobi, PuLP).

This pattern connects [[nba-analytics]] lineup construction to later systems thinking in [[presence-framework]] — compile once, query under structure.

## Related

- Project ideas live in source `projects/nba-lineup-optimizer`
- Visualization of solutions and networks: [[d3js]]
- Career context: [[koba-career]]

## Views that evolved

The framing of linear optimization as a mixed-integer program emphasizes the importance of estimating coefficients accurately, as noise in player projections can significantly affect the optimization process. This perspective aligns with the insights shared in the source blog on lineup construction, highlighting the critical role of forecasting in optimization tasks. Additionally, the application of Integer Linear Programming (ILP) to select a reasonable 25-man MLB roster illustrates the versatility of linear optimization in practical scenarios, as discussed in the blog on linear optimization and baseball teams.
