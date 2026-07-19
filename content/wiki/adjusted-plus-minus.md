---
title: Adjusted Plus-Minus
summary: >-
  A basketball statistic that attempts to measure a player's impact on the game
  by accounting for teammates and opponents.
type: concept
sources: []
updated: '2026-07-19'
---
# Adjusted Plus-Minus

Adjusted Plus-Minus (APM) is a sophisticated basketball statistic designed to evaluate a player's contribution to their team's performance while controlling for the effects of teammates and opponents. This metric is particularly relevant in the realm of [[nba-analytics]] and is often used to inform decisions in player selection and lineup optimization.

## Methodology

APM employs a regression-based approach to disentangle the contributions of individual players from the collective performance of the team. The methodology typically involves ridge regression to manage the multicollinearity present in the design matrix. Key considerations in the application of APM include:

- **Regularization Strength**: Balancing bias and variance is crucial; insufficient regularization may lead to overfitting, while excessive regularization can cause all players' values to converge towards the mean.
- **Sample Size**: A minimum threshold of playing time is necessary for APM to yield meaningful insights, as small samples can distort the metric's reliability.
- **Contextual Features**: Incorporating additional factors such as pace and lineup type can enhance the accuracy of APM estimates, often surpassing more complex estimators.

## Applications

APM is widely utilized in various aspects of basketball analytics, particularly in the construction of optimal lineups. Tools like the [[nba-lineup-optimizer]] leverage APM alongside other metrics to formulate strategies that maximize expected performance under specific constraints. The integration of APM into these tools exemplifies its importance in the decision-making processes of coaching and fantasy sports.

## Views that evolved

- Some sources emphasize the limitations of raw plus-minus metrics, advocating for APM as a more nuanced alternative that mitigates the influence of surrounding players.
- Others highlight the necessity of context and sample size, suggesting that APM should be interpreted with caution, particularly in small-sample scenarios.
