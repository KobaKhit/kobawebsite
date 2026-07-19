---
type: post
title: "Visualizing Indego bike share data in Python using Folium"
date: "2016-03-06"
summary: "A simple example of visualizing GeoJSON data in Python — fetching Philadelphia's Indego bike share station feed and plotting it on a Leaflet map with Folium."
tags: ["python", "geospatial", "folium", "data-visualization", "philly"]
---

*Co-authored with [Shantanu Saha](https://www.linkedin.com/in/1saha).*

Full notebook on nbviewer: [view ipynb](/ipynb/2016-3-6-visualizing-indego-bike-geoson-data-in-python-using-folium.ipynb)

A simple example of visualizing GeoJSON data in Python using [Folium](https://folium.readthedocs.org/en/latest/). We obtain Philadelphia Indego bike share station data from [OpenDataPhilly](https://www.opendataphilly.org/dataset/bike-share-stations) using their free public API.

## Fetching the data

```python
import json, urllib2
import pandas as pd

opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
response = opener.open('https://api.phila.gov/bike-share-stations/v1')

df = pd.read_json(response)
df.head()
```

Each entry in the `features` column looks like:

```json
{
  "geometry": {"coordinates": [-75.16374, 39.95378], "type": "Point"},
  "properties": {
    "name": "Municipal Services Building Plaza",
    "bikesAvailable": 6,
    "docksAvailable": 19,
    "kioskPublicStatus": "Active"
  }
}
```

## Flattening the nested structure

```python
stations = pd.io.json.json_normalize(df['features'].tolist())
stations = stations.rename(columns={
    'geometry.coordinates': 'coordinates',
    'properties.name': 'name',
    'properties.bikesAvailable': 'bikes',
    'properties.docksAvailable': 'docks'
})
stations[['lng', 'lat']] = stations['coordinates'].apply(pd.Series)
```

## Plotting with Folium

```python
import folium

philly = folium.Map(location=[39.9526, -75.1652], zoom_start=13)

for _, row in stations.iterrows():
    folium.CircleMarker(
        location=[row['lat'], row['lng']],
        radius=6,
        popup=f"{row['name']}\n{row['bikes']} bikes / {row['docks']} docks",
        color='#0f766e',
        fill=True
    ).add_to(philly)

philly.save('indego_map.html')
```

The resulting map shows all active Indego stations across Philadelphia, with a popup for each showing available bikes and docks. Folium wraps [Leaflet.js](https://leafletjs.com/) and makes it easy to build interactive web maps entirely from Python.
