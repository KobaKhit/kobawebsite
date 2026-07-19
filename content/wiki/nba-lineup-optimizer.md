---
title: NBA Lineup Optimizer
summary: >-
  A tool using linear programming to optimize NBA team lineups based on player
  statistics.
type: entity
sources:
  - blog/2016-02-18-linear-opt-baseball
updated: '2026-07-19'
---
# NBA Lineup Optimizer

The **NBA Lineup Optimizer** is a specialized Python toolkit that facilitates the construction of optimal basketball lineups by leveraging player projections and adhering to league constraints. This tool is particularly useful for fantasy sports and coaching staff who face the combinatorial challenge of selecting players while maximizing expected value under various constraints.

## Optimization Framework

The optimizer operates as a mixed-integer program, where binary variables are employed to select players, and linear inequalities represent roster rules. The primary objective is to maximize expected points, adjusted plus-minus, or a custom utility metric. This approach is grounded in the principles of [[linear-optimization]] and is designed to handle constraints related to salary, position, and minutes effectively.

## Forecasting and Constraints

A critical aspect of the optimizer is its reliance on accurate player projections. The effectiveness of the optimization process is heavily influenced by the quality of these projections, which must account for factors such as aging curves, injury histories, and matchup adjustments. The methodology emphasizes the importance of estimating coefficients accurately before applying optimization techniques, as noise in player projections can significantly impact results [[nba-analytics]].

## Usage and Features

Key features of the NBA Lineup Optimizer include:
- **Projection CSV Ingest**: Import player data in CSV format for analysis.
- **Constraint DSL**: Define league-specific constraints easily.
- **Solver Integration**: Utilize solvers like CBC or PuLP to compute optimal lineups.
- **Reporting**: Generate reports that include selected players and sensitivity notes regarding binding constraints [[koba-career]].

## Views that evolved
- The approach to lineup optimization has shifted towards integrating robust forecasting methods alongside optimization techniques, highlighting the interplay between data quality and optimization outcomes.
