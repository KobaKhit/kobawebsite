---
type: post
title: "Impact of weather events in the US"
date: "2016-02-10"
summary: "Using NOAA storm data to identify which weather events cause the most harm to population health and the economy in the US."
tags: ["r", "data-analysis", "reproducible-research", "rmarkdown"]
---

Using the U.S. National Oceanic and Atmospheric Administration's (NOAA) storm database I explore which weather events are most harmful to population health and economy in the US.

Full R Markdown report on RPubs: [rpubs.com/Koba/159392](http://rpubs.com/Koba/159392)

Source RMD: [download](/ipynb/2016-2-10-impact-of-weather-events.Rmd)

## Key findings

**Population health:** The most frequent events are usually the most harmful (tornadoes, floods, thunderstorm winds, hurricanes, lightning). One exception: excessive heat ranks only 20th in frequency but is the **deadliest** with ~88 deaths per year on average during 2000–2011.

**Economy:** The most frequent events are NOT necessarily the most economically harmful. The top four are hydro-meteorological: floods, hail, storms, and hurricanes. During 2000–2011, property damage was **14× greater** than crop damage.

## Data

NOAA storm database — 902,297 observations and 37 variables. Filtered to 2000–2011 for consistency.

```r
url <- "https://d396qusza40orc.cloudfront.net/repdata%2Fdata%2FStormData.csv.bz2"
download.file(url, "data.bz2", method = "curl")
data <- read.csv("data.csv")
```

## Most harmful events by fatalities (2000–2011 average/year)

| Event | Avg. Fatalities/yr |
|---|---|
| Excessive Heat | 88 |
| Tornado | 79 |
| Flash Flood | 54 |
| Lightning | 44 |
| Thunderstorm Wind | 30 |

## Most harmful events by economic damage (2000–2011 total, $B)

| Event | Property ($B) | Crop ($B) |
|---|---|---|
| Flood | 144 | 5 |
| Hurricane/Typhoon | 83 | 5 |
| Storm Surge | 43 | 0 |
| Tornado | 25 | 0.3 |
| Hail | 16 | 3 |

## Reproducing the analysis

The analysis is fully reproducible using R and the `knitr` / `rmarkdown` packages. The RMD file downloads, cleans, and plots all results inline.

```r
library(rmarkdown)
render("2016-2-10-impact-of-weather-events.Rmd")
```
