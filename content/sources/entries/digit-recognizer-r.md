---
type: project
title: "Digit Recognizer (R Neural Network)"
date: "2015-11-15"
summary: "Neural network in R achieving ~97.8% accuracy on Kaggle's digit recognition challenge — write-up tweeted by Kaggle as a neural network tutorial."
tags: ["r", "machine-learning", "neural-network", "kaggle"]
status: archived
image: /img/portfolio/digit-recognizer.png
url: https://www.kaggle.com/kobakhit/digit-recognizer/digital-recognizer-in-r
---

Same handwritten digit classification problem, approached entirely in R using the `nnet` and `neuralnet` packages.

Achieved **~97.8% accuracy**. The write-up was [tweeted by Kaggle](https://twitter.com/kaggle/status/668177223443226624) as a tutorial on neural networks in R.

## Notes

- R's neural network packages lag Python/TensorFlow for deep CNNs, but the `nnet` package is ergonomic for classical fully-connected architectures.
- Feature engineering (PCA to reduce 784 → ~50 dimensions) was essential for training speed.
- Kaggle notebook: [view on Kaggle](https://www.kaggle.com/kobakhit/digit-recognizer/digital-recognizer-in-r)
