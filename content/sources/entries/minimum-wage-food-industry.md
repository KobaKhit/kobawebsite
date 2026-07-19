---
type: project
title: "Effect of Minimum Wage on Food Industry Employment in PA"
date: "2014-06-01"
summary: "OLS regression analysis confirming that Pennsylvania's minimum wage increase decreased food industry employment by ~1.33% (roughly 6,000 jobs)."
tags: ["r", "economics", "regression", "policy"]
status: archived
image: /img/portfolio/above-minwage.png
pdf: https://github.com/KobaKhit/ECON322/raw/master/Paper/Paper.pdf
github: https://github.com/KobaKhit/ECON322/tree/master/R
---

A research paper testing whether Pennsylvania's minimum wage increase affected employment in the food industry.

## Method

- Data: U.S. Bureau of Labor Statistics employment data for Pennsylvania food-service industries
- Model: OLS regression with employment as the dependent variable and minimum wage level as the key predictor
- Controls: time trend, seasonal dummies

## Result

The increase in minimum wage **decreased employment by 1.33%**, equivalent to approximately **6,000 people**. The result was statistically significant.

This aligns with the standard competitive labor market prediction — though the magnitude is modest, suggesting partial pass-through to prices and hours rather than pure headcount cuts.

[Full paper (PDF)](https://github.com/KobaKhit/ECON322/raw/master/Paper/Paper.pdf) | [R code](https://github.com/KobaKhit/ECON322/tree/master/R)
