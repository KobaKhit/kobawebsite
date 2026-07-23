---
title: "Visualizing Indego bike geoson data in Python using Folium"
type: post
date: "2016-03-06"
summary: "A simple example of visualizing geoson data in python using Folium. We obtain Philly Indego bike data from opendataphilly website. We download the data using\u2026"
tags: ["python", "ipynb", "geoson", "indego-bike-share", "philly"]
---

Co-authored with [Shantanu Saha](https://www.linkedin.com/in/1saha) and [Koba Khitalishvili](http://www.kobakhit.com/about/).

Notebook: [download](/ipynb/2016-3-6-visualizing-indego-bike-geoson-data-in-python-using-folium.ipynb)

A simple example of visualizing geoson data in python using [Folium](https://folium.readthedocs.org/en/latest/). We obtain Philly Indego bike data from [opendataphilly](https://www.opendataphilly.org/dataset/bike-share-stations) website. We download the data using the website's free public api.

```python
import json,urllib2
import pandas as pd

# add a header so that the website doesnt give 403 error
opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
response = opener.open('https://api.phila.gov/bike-share-stations/v1')

# parse json using pandas
df = pd.read_json(response)
df.head()
```

|  | features | type |
| --- | --- | --- |
| 0 | {u'geometry': {u'type': u'Point', u'coordinate... | FeatureCollection |
| 1 | {u'geometry': {u'type': u'Point', u'coordinate... | FeatureCollection |
| 2 | {u'geometry': {u'type': u'Point', u'coordinate... | FeatureCollection |
| 3 | {u'geometry': {u'type': u'Point', u'coordinate... | FeatureCollection |
| 4 | {u'geometry': {u'type': u'Point', u'coordinate... | FeatureCollection |

Now, `df` is a dictionary of dictionaries. We are interested in the features column. Each entry looks like this.

```python
df['features'][0]
```

```
{u'geometry': {u'coordinates': [-75.16374, 39.95378], u'type': u'Point'},
 u'properties': {u'addressCity': u'Philadelphia',
  u'addressState': u'PA',
  u'addressStreet': u'1401 John F. Kennedy Blvd.',
  u'addressZipCode': u'19102',
  u'bikesAvailable': 6,
  u'closeTime': u'23:58:00',
  u'docksAvailable': 19,
  u'eventEnd': None,
  u'eventStart': None,
  u'isEventBased': False,
  u'isVirtual': False,
  u'kioskId': 3004,
  u'kioskPublicStatus': u'Active',
  u'name': u'Municipal Services Building Plaza',
  u'openTime': u'00:02:00',
  u'publicText': u'',
  u'timeZone': u'Eastern Standard Time',
  u'totalDocks': 25,
  u'trikesAvailable': 0},
 u'type': u'Feature'}
```

```python
# number of rows (bike stations)
len(df["features"])
```

    73

We organize data first before plotting to follow a [Folium example](http://nbviewer.jupyter.org/github/ocefpaf/folium_notebooks/blob/master/test_clustered_markes.ipynb). Basically we need to create a list of tuples with latitude and longtitude. We called it `coordinates`.

```python
# Organize data
coordinates = []

for i in range(0,len(df['features'])):
    coordinates.append(((df["features"][i]["geometry"]['coordinates'])))

# convert list of lists to list of tuples      
coordinates = [tuple([i[1],i[0]]) for i in coordinates] 
print(coordinates[0:10])
```

    [(39.95378, -75.16374), (39.94733, -75.14403), (39.9522, -75.20311), (39.94517, -75.15993), (39.98082, -75.14973), (39.95576, -75.18982), (39.94711, -75.16618), (39.96046, -75.19701), (39.94217, -75.1775), (39.96317, -75.14792)]

Let's visualize the coordinates geoson data using Folium.

```python
import folium
import numpy as np

#print(folium.__file__)
#print(folium.__version__)

# get center of map
meanlat = np.mean([i[0] for i in coordinates])
meanlon = np.mean([i[1] for i in coordinates])

# initialize map
mapa = folium.Map(location=[meanlat, meanlon],
                  tiles='OpenStreetMap', zoom_start=13)
# add markers
for i in range(0,len(coordinates)):
    
    # create popup on click
    html="""
    Address: {}<br>
    Bikes available: {}<br>
    Docks: {}<br>
    """
    html = html.format(df['features'][i]['properties']['addressStreet'],\
               df['features'][i]['properties']['bikesAvailable'],\
               df['features'][i]['properties']['docksAvailable'])
    iframe = folium.element.IFrame(html=html, width=150, height=150)
    popup = folium.Popup(iframe, max_width=2650)
    
    #  add marker to map
    folium.Marker(coordinates[i],
                  popup=popup,
                 ).add_to(mapa)

mapa # show map
```

<iframe class="embed-map" title="Indego bike stations — markers" src="/entries/2016-03-06-indego-bike-folium/embeds/indego-markers.html" loading="lazy"></iframe>

We can cluster nearby points. Also, let's look at a different background by changing the tiles argument. List of available tiles can be found in [Folium github repo](https://github.com/python-visualization/folium).

```python
from folium.plugins import MarkerCluster # for marker clusters

# initialize map
mapa = folium.Map(location=[meanlat, meanlon],
                  tiles='Cartodb Positron', zoom_start=13)

# add marker clusters
mapa.add_children(MarkerCluster(locations=coordinates, popups=coordinates))
mapa
```

<iframe class="embed-map" title="Indego bike stations — clusters" src="/entries/2016-03-06-indego-bike-folium/embeds/indego-clusters.html" loading="lazy"></iframe>

We can utilize Folium plugins to view the geoson data in different ways. For example, let's generate a heat map of the bike stations in Philly. We can see that there are dense areas in center city and Chinatown mostly.

```python
from folium.plugins import HeatMap

# initialize map
mapa = folium.Map(location=[meanlat, meanlon],
                  tiles='Cartodb Positron', zoom_start=13)

# add heat
mapa.add_children(HeatMap(coordinates))
mapa
```

<iframe class="embed-map" title="Indego bike stations — heatmap" src="/entries/2016-03-06-indego-bike-folium/embeds/indego-heatmap.html" loading="lazy"></iframe>

For more examples go to the Folium's examples [page](https://folium.readthedocs.org/en/latest/examples.html).

# Resources used

  - [Folium docs](https://folium.readthedocs.org/en/latest/)
  - [Folium Github](https://github.com/python-visualization/folium)
