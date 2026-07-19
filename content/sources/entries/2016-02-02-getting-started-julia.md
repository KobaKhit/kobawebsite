---
type: post
title: "Getting started with Julia programming language"
date: "2016-02-02"
summary: "A tutorial on Julia using the Collatz Conjecture as a motivating example — data frames, plotting with Gadfly, and file I/O."
tags: ["julia", "data-science", "collatz"]
---

In undergrad I wrote a tutorial on the [Julia](https://julialang.org/) programming language in which I analyzed the output of the Collatz function. The Collatz Conjecture was fascinating to me due to its seemingly simple wording and almost impossible mystery. Since then, Julia has changed significantly, and Terence Tao made a contribution that gets us closer to a proof.

![Collatz infographic](/info-graphic.jpg)

**Update (2019):** Tao published a paper proving that the Collatz Conjecture is "almost true" for "almost all numbers."

- Tao's paper: [arxiv.org/abs/1909.03562](https://arxiv.org/abs/1909.03562)
- Tao's blog post: [terrytao.wordpress.com](https://terrytao.wordpress.com/2019/09/10/almost-all-collatz-orbits-attain-almost-bounded-values/)

View the full notebook on nbviewer: [nbviewer.jupyter.org](https://nbviewer.jupyter.org/url/www.kobakhit.com/ipynb/2016-2-2-getting-started-julia.ipynb)

## Table of contents

- [Download and Quick Start](#download)
- [Data frames, plotting, and file I/O](#data-frames)
- [Collatz analysis](#collatz-analysis)
- [Conclusion](#conclusion)

## Download

Julia binaries are at [julialang.org/downloads](https://julialang.org/downloads/). After installation:

```bash
julia
```

## Quick Start

```julia
# Variables
x = 5
y = 10.0
z = "Hello, Julia!"

println(x, " ", y, " ", z)
```

## Data frames, plotting, and file I/O

Julia has great packages for data work. Install them in the Julia REPL:

```julia
Pkg.add("DataFrames")
Pkg.add("Gadfly")
Pkg.add("CSV")
```

### Data frames

```julia
using DataFrames

df = DataFrame(A = 1:5, B = rand(5), C = ["a","b","c","d","e"])
println(df)
```

### Plotting data

```julia
using Gadfly

plot(x = df[:A], y = df[:B], Geom.point)
```

## Collatz analysis

The Collatz function: given a positive integer $n$, if $n$ is even divide by 2; if odd multiply by 3 and add 1. Repeat until you reach 1.

```julia
function collatz_length(n::Int)
    count = 1
    while n != 1
        n = iseven(n) ? div(n, 2) : 3n + 1
        count += 1
    end
    count
end

# Compute sequence lengths for 1 to 1000
lengths = [collatz_length(i) for i in 1:1000]
```

The number with the longest Collatz sequence under 1000 is `n = 871` with 178 steps.

## Conclusion

Julia combines Python-like syntax with C-like performance — a compelling choice for numerical computing. The Collatz function is a great first exercise: simple rule, complex behavior.
