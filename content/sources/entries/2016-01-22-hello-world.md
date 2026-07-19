---
type: post
title: "Hello world!"
date: "2016-01-22"
summary: "Testing out Jekyll's code highlighting and LaTeX rendering — Ruby, R, Python, and the AKS primality test."
tags: ["r", "python", "ruby"]
---

This is my professional blog where I will be writing about data science, programming, math and, in general, about technical sciences. Let's test things out. Below I check how the highlighter renders code for Ruby, R, and Python.

# Ruby

([example](http://jekyllrb.com/docs/installation/) from Jekyll documentation)

```ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
```

# R

```r
# Read in a default data set
data(cars)
head(cars)
```

```
  speed dist
1     4    2
2     4   10
3     7    4
4     7   22
5     8   16
6     9   10
```

```r
# Simple regression model with distance as a dependent variable
model <- lm(dist ~ speed, cars)
summary(model)
```

```
Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) -17.5791     6.7584  -2.601   0.0123 *  
speed         3.9324     0.4155   9.464 1.49e-12 ***

Multiple R-squared: 0.6511, Adjusted R-squared: 0.6438
```

According to the regression model, the stopping distance strongly depends on the speed of the car (duh!).

# Python

```python
# A simple primality test
def isprime(n):
  ans = 'is prime'
  if n == 1:
    ans = 'not prime'
  elif n == 2 or n == 3:
    return ans
  else:
    for i in range(2, int(n ** 0.5) + 1):
      if n % i == 0:
        ans = 'not prime'
  return ans
```

You can run the code interactively via [trinket.io](https://trinket.io/):

<iframe src="https://trinket.io/embed/python/0066595bcc" width="100%" height="400" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>

# LaTeX

- Inline: the Euler identity is $e^{i\pi} + 1 = 0$
- Display — the [AKS primality test](http://en.wikipedia.org/wiki/AKS_primality_test):

> An integer $n$ is prime iff the congruence relation

$$(x-a)^n \equiv (x^n-a)$$

> holds for all integers $a$ that are coprime to $n$.

---

That's it for the warm-up. More posts coming covering data science, ML, and anything that comes to mind.
