---
type: project
title: "Digit Recognizer (Python CNN)"
date: "2015-11-01"
summary: "Convolutional neural network in Python that achieved 98.6% accuracy on the Kaggle handwritten digit recognition challenge."
tags: ["python", "machine-learning", "cnn", "kaggle"]
status: archived
image: /img/portfolio/digit-recognizer-python.png
url: https://www.kaggle.com/kobakhit/digit-recognizer/digit-recognizer-in-python-using-cnn
featured: true
---

The Kaggle [Digit Recognizer](https://www.kaggle.com/c/digit-recognizer) competition asks competitors to classify 28×28 grayscale images of handwritten digits (0–9) from the MNIST dataset.

I built a convolutional neural network (CNN) in Python using Theano + Lasagne that achieved **98.6% accuracy** on the test set.

## Architecture

- 2 convolutional layers (32 and 64 filters, 3×3 kernels)
- MaxPooling after each conv layer
- Dropout (0.25 after conv, 0.5 after dense)
- Dense layer: 256 units, ReLU
- Output: 10-class softmax

## Key takeaways

- CNNs dramatically outperform fully-connected networks on image tasks — the convolutional structure exploits spatial locality.
- Data augmentation (rotations, shifts) was the biggest single accuracy boost.
- Kaggle notebook: [view on Kaggle](https://www.kaggle.com/kobakhit/digit-recognizer/digit-recognizer-in-python-using-cnn)
