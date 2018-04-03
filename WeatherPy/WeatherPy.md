

```python
import json
import requests
import seaborn
import matplotlib as plt
import pandas as pd
from citipy import citipy
from config import api_key
from random import uniform
import datetime
```


```python
# Set query base url
url = "http://api.openweathermap.org/data/2.5/weather?"
```


```python
#create lists we will add to when we loop through queries
cities = []
countries = []
max_temps = []
city_lats = []
city_lons = []
humidities = []
cloudiness = []
windspeeds = []
dates = []


#generate random coordinates, find closest city, query that city, save its relevant info to lists
while len(cities) < 500:
    try:
        lat, lon = uniform(-180,180), uniform(-90, 90)
        city = citipy.nearest_city(lat, lon).city_name
        if city not in cities:
            city_cleaned = city.replace(" ", "%20")
            query_url = f"{url}appid={api_key}&q={city_cleaned}&units=imperial"
            weather_json = requests.get(query_url).json()
            countries.append(weather_json['sys']['country'])
            max_temps.append(weather_json['main']['temp_max'])
            city_lats.append(weather_json['coord']['lat']) 
            city_lons.append(weather_json['coord']['lon']) 
            humidities.append(weather_json['main']['humidity'])
            cloudiness.append(weather_json['clouds']['all'])
            windspeeds.append(weather_json['wind']['speed'])
            dates.append(weather_json['dt'])
            print(f"Retreiving weather data for city #{len(cities)+1} of 500, {city}: {query_url}")
            cities.append(city)
        
    except KeyError:
        pass
```

    Retreiving weather data for city #1 of 500, luderitz: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=luderitz&units=imperial
    Retreiving weather data for city #2 of 500, albany: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=albany&units=imperial
    Retreiving weather data for city #3 of 500, port elizabeth: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=port%20elizabeth&units=imperial
    Retreiving weather data for city #4 of 500, upernavik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=upernavik&units=imperial
    Retreiving weather data for city #5 of 500, kudahuvadhoo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kudahuvadhoo&units=imperial
    Retreiving weather data for city #6 of 500, tasiilaq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tasiilaq&units=imperial
    Retreiving weather data for city #7 of 500, port alfred: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=port%20alfred&units=imperial
    Retreiving weather data for city #8 of 500, longyearbyen: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=longyearbyen&units=imperial
    Retreiving weather data for city #9 of 500, bredasdorp: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bredasdorp&units=imperial
    Retreiving weather data for city #10 of 500, kehra: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kehra&units=imperial
    Retreiving weather data for city #11 of 500, dikson: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dikson&units=imperial
    Retreiving weather data for city #12 of 500, abu dhabi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=abu%20dhabi&units=imperial
    Retreiving weather data for city #13 of 500, cape town: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cape%20town&units=imperial
    Retreiving weather data for city #14 of 500, ushuaia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ushuaia&units=imperial
    Retreiving weather data for city #15 of 500, qaanaaq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=qaanaaq&units=imperial
    Retreiving weather data for city #16 of 500, seredka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=seredka&units=imperial
    Retreiving weather data for city #17 of 500, cidreira: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cidreira&units=imperial
    Retreiving weather data for city #18 of 500, narsaq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=narsaq&units=imperial
    Retreiving weather data for city #19 of 500, maltahohe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maltahohe&units=imperial
    Retreiving weather data for city #20 of 500, mahon: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mahon&units=imperial
    Retreiving weather data for city #21 of 500, umba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=umba&units=imperial
    Retreiving weather data for city #22 of 500, hermanus: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hermanus&units=imperial
    Retreiving weather data for city #23 of 500, paso de los toros: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=paso%20de%20los%20toros&units=imperial
    Retreiving weather data for city #24 of 500, emba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=emba&units=imperial
    Retreiving weather data for city #25 of 500, georgetown: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=georgetown&units=imperial
    Retreiving weather data for city #26 of 500, koindu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=koindu&units=imperial
    Retreiving weather data for city #27 of 500, jamestown: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jamestown&units=imperial
    Retreiving weather data for city #28 of 500, mahebourg: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mahebourg&units=imperial
    Retreiving weather data for city #29 of 500, kattivakkam: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kattivakkam&units=imperial
    Retreiving weather data for city #30 of 500, hammerfest: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hammerfest&units=imperial
    Retreiving weather data for city #31 of 500, ilulissat: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ilulissat&units=imperial
    Retreiving weather data for city #32 of 500, busselton: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=busselton&units=imperial
    Retreiving weather data for city #33 of 500, biskamzha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=biskamzha&units=imperial
    Retreiving weather data for city #34 of 500, mao: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mao&units=imperial
    Retreiving weather data for city #35 of 500, sao jose da coroa grande: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20jose%20da%20coroa%20grande&units=imperial
    Retreiving weather data for city #36 of 500, vista hermosa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vista%20hermosa&units=imperial
    Retreiving weather data for city #37 of 500, saint-philippe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-philippe&units=imperial
    Retreiving weather data for city #38 of 500, rabo de peixe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rabo%20de%20peixe&units=imperial
    Retreiving weather data for city #39 of 500, awjilah: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=awjilah&units=imperial
    Retreiving weather data for city #40 of 500, turinsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=turinsk&units=imperial
    Retreiving weather data for city #41 of 500, cockburn town: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cockburn%20town&units=imperial
    Retreiving weather data for city #42 of 500, veraval: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=veraval&units=imperial
    Retreiving weather data for city #43 of 500, falmouth: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=falmouth&units=imperial
    Retreiving weather data for city #44 of 500, jaisalmer: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jaisalmer&units=imperial
    Retreiving weather data for city #45 of 500, faya: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=faya&units=imperial
    Retreiving weather data for city #46 of 500, sangmelima: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sangmelima&units=imperial
    Retreiving weather data for city #47 of 500, tutoia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tutoia&units=imperial
    Retreiving weather data for city #48 of 500, izvoarele sucevei: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=izvoarele%20sucevei&units=imperial
    Retreiving weather data for city #49 of 500, kortkeros: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kortkeros&units=imperial
    Retreiving weather data for city #50 of 500, coihueco: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=coihueco&units=imperial
    Retreiving weather data for city #51 of 500, iquique: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=iquique&units=imperial
    Retreiving weather data for city #52 of 500, torbay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=torbay&units=imperial
    Retreiving weather data for city #53 of 500, leshukonskoye: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=leshukonskoye&units=imperial
    Retreiving weather data for city #54 of 500, basti: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=basti&units=imperial
    Retreiving weather data for city #55 of 500, kasongo-lunda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kasongo-lunda&units=imperial
    Retreiving weather data for city #56 of 500, lere: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lere&units=imperial
    Retreiving weather data for city #57 of 500, salalah: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=salalah&units=imperial
    Retreiving weather data for city #58 of 500, gorzow wielkopolski: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gorzow%20wielkopolski&units=imperial
    Retreiving weather data for city #59 of 500, atar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=atar&units=imperial
    Retreiving weather data for city #60 of 500, victoria: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=victoria&units=imperial
    Retreiving weather data for city #61 of 500, mitsamiouli: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mitsamiouli&units=imperial
    Retreiving weather data for city #62 of 500, san cristobal: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20cristobal&units=imperial
    Retreiving weather data for city #63 of 500, hithadhoo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hithadhoo&units=imperial
    Retreiving weather data for city #64 of 500, gurmatkal: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gurmatkal&units=imperial
    Retreiving weather data for city #65 of 500, saint george: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint%20george&units=imperial
    Retreiving weather data for city #66 of 500, maragogi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maragogi&units=imperial
    Retreiving weather data for city #67 of 500, najran: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=najran&units=imperial
    Retreiving weather data for city #68 of 500, mehamn: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mehamn&units=imperial
    Retreiving weather data for city #69 of 500, lasa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lasa&units=imperial
    Retreiving weather data for city #70 of 500, jalu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jalu&units=imperial
    Retreiving weather data for city #71 of 500, chuy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=chuy&units=imperial
    Retreiving weather data for city #72 of 500, brae: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=brae&units=imperial
    Retreiving weather data for city #73 of 500, awbari: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=awbari&units=imperial
    Retreiving weather data for city #74 of 500, nanortalik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nanortalik&units=imperial
    Retreiving weather data for city #75 of 500, san martin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20martin&units=imperial
    Retreiving weather data for city #76 of 500, cuamba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cuamba&units=imperial
    Retreiving weather data for city #77 of 500, sur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sur&units=imperial
    Retreiving weather data for city #78 of 500, crawley: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=crawley&units=imperial
    Retreiving weather data for city #79 of 500, antofagasta: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=antofagasta&units=imperial
    Retreiving weather data for city #80 of 500, milford: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=milford&units=imperial
    Retreiving weather data for city #81 of 500, san pedro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20pedro&units=imperial
    Retreiving weather data for city #82 of 500, paulo afonso: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=paulo%20afonso&units=imperial
    Retreiving weather data for city #83 of 500, kavaratti: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kavaratti&units=imperial
    Retreiving weather data for city #84 of 500, pangnirtung: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pangnirtung&units=imperial
    Retreiving weather data for city #85 of 500, sawakin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sawakin&units=imperial
    Retreiving weather data for city #86 of 500, porto novo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=porto%20novo&units=imperial
    Retreiving weather data for city #87 of 500, ylivieska: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ylivieska&units=imperial
    Retreiving weather data for city #88 of 500, bambous virieux: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bambous%20virieux&units=imperial
    Retreiving weather data for city #89 of 500, ondangwa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ondangwa&units=imperial
    Retreiving weather data for city #90 of 500, gat: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gat&units=imperial
    Retreiving weather data for city #91 of 500, fiumicino: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=fiumicino&units=imperial
    Retreiving weather data for city #92 of 500, paamiut: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=paamiut&units=imperial
    Retreiving weather data for city #93 of 500, taoudenni: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=taoudenni&units=imperial
    Retreiving weather data for city #94 of 500, maceio: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maceio&units=imperial
    Retreiving weather data for city #95 of 500, yarim: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=yarim&units=imperial
    Retreiving weather data for city #96 of 500, prestea: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=prestea&units=imperial
    Retreiving weather data for city #97 of 500, verkhnyaya inta: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=verkhnyaya%20inta&units=imperial
    Retreiving weather data for city #98 of 500, suez: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=suez&units=imperial
    Retreiving weather data for city #99 of 500, meulaboh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=meulaboh&units=imperial
    Retreiving weather data for city #100 of 500, pemba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pemba&units=imperial
    Retreiving weather data for city #101 of 500, qasigiannguit: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=qasigiannguit&units=imperial
    Retreiving weather data for city #102 of 500, guarapari: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=guarapari&units=imperial
    Retreiving weather data for city #103 of 500, tanda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tanda&units=imperial
    Retreiving weather data for city #104 of 500, storforshei: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=storforshei&units=imperial
    Retreiving weather data for city #105 of 500, itapira: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=itapira&units=imperial
    Retreiving weather data for city #106 of 500, tiznit: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tiznit&units=imperial
    Retreiving weather data for city #107 of 500, clyde river: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=clyde%20river&units=imperial
    Retreiving weather data for city #108 of 500, bathsheba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bathsheba&units=imperial
    Retreiving weather data for city #109 of 500, ponta do sol: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ponta%20do%20sol&units=imperial
    Retreiving weather data for city #110 of 500, ostrovnoy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ostrovnoy&units=imperial
    Retreiving weather data for city #111 of 500, kyshtovka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kyshtovka&units=imperial
    Retreiving weather data for city #112 of 500, la rioja: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=la%20rioja&units=imperial
    Retreiving weather data for city #113 of 500, port-gentil: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=port-gentil&units=imperial
    Retreiving weather data for city #114 of 500, kruisfontein: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kruisfontein&units=imperial
    Retreiving weather data for city #115 of 500, warrington: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=warrington&units=imperial
    Retreiving weather data for city #116 of 500, alekseyevka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=alekseyevka&units=imperial
    Retreiving weather data for city #117 of 500, punta arenas: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=punta%20arenas&units=imperial
    Retreiving weather data for city #118 of 500, talavera: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=talavera&units=imperial
    Retreiving weather data for city #119 of 500, buta: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=buta&units=imperial
    Retreiving weather data for city #120 of 500, marigot: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=marigot&units=imperial
    Retreiving weather data for city #121 of 500, yabelo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=yabelo&units=imperial
    Retreiving weather data for city #122 of 500, sao joao da barra: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20joao%20da%20barra&units=imperial
    Retreiving weather data for city #123 of 500, pskov: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pskov&units=imperial
    Retreiving weather data for city #124 of 500, rocha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rocha&units=imperial
    Retreiving weather data for city #125 of 500, el alto: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=el%20alto&units=imperial
    Retreiving weather data for city #126 of 500, liverpool: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=liverpool&units=imperial
    Retreiving weather data for city #127 of 500, vestmannaeyjar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vestmannaeyjar&units=imperial
    Retreiving weather data for city #128 of 500, saint-augustin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-augustin&units=imperial
    Retreiving weather data for city #129 of 500, ribeira grande: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ribeira%20grande&units=imperial
    Retreiving weather data for city #130 of 500, jawhar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jawhar&units=imperial
    Retreiving weather data for city #131 of 500, morococha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=morococha&units=imperial
    Retreiving weather data for city #132 of 500, engenheiro beltrao: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=engenheiro%20beltrao&units=imperial
    Retreiving weather data for city #133 of 500, ngorongoro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ngorongoro&units=imperial
    Retreiving weather data for city #134 of 500, los llanos de aridane: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=los%20llanos%20de%20aridane&units=imperial
    Retreiving weather data for city #135 of 500, bereznik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bereznik&units=imperial
    Retreiving weather data for city #136 of 500, coihaique: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=coihaique&units=imperial
    Retreiving weather data for city #137 of 500, muzhi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=muzhi&units=imperial
    Retreiving weather data for city #138 of 500, saint-pierre: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-pierre&units=imperial
    Retreiving weather data for city #139 of 500, balkanabat: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=balkanabat&units=imperial
    Retreiving weather data for city #140 of 500, malanje: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=malanje&units=imperial
    Retreiving weather data for city #141 of 500, kribi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kribi&units=imperial
    Retreiving weather data for city #142 of 500, sao miguel do araguaia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20miguel%20do%20araguaia&units=imperial
    Retreiving weather data for city #143 of 500, strezhevoy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=strezhevoy&units=imperial
    Retreiving weather data for city #144 of 500, tombouctou: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tombouctou&units=imperial
    Retreiving weather data for city #145 of 500, luanda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=luanda&units=imperial
    Retreiving weather data for city #146 of 500, saldanha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saldanha&units=imperial
    Retreiving weather data for city #147 of 500, passos: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=passos&units=imperial
    Retreiving weather data for city #148 of 500, songea: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=songea&units=imperial
    Retreiving weather data for city #149 of 500, maloyaroslavets: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maloyaroslavets&units=imperial
    Retreiving weather data for city #150 of 500, saint-francois: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-francois&units=imperial
    Retreiving weather data for city #151 of 500, chirongui: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=chirongui&units=imperial
    Retreiving weather data for city #152 of 500, bilma: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bilma&units=imperial
    Retreiving weather data for city #153 of 500, roura: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=roura&units=imperial
    Retreiving weather data for city #154 of 500, lafia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lafia&units=imperial
    Retreiving weather data for city #155 of 500, opuwo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=opuwo&units=imperial
    Retreiving weather data for city #156 of 500, inirida: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=inirida&units=imperial
    Retreiving weather data for city #157 of 500, progreso: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=progreso&units=imperial
    Retreiving weather data for city #158 of 500, watertown: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=watertown&units=imperial
    Retreiving weather data for city #159 of 500, dabakala: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dabakala&units=imperial
    Retreiving weather data for city #160 of 500, quatre cocos: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=quatre%20cocos&units=imperial
    Retreiving weather data for city #161 of 500, toamasina: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=toamasina&units=imperial
    Retreiving weather data for city #162 of 500, souillac: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=souillac&units=imperial
    Retreiving weather data for city #163 of 500, arraial do cabo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=arraial%20do%20cabo&units=imperial
    Retreiving weather data for city #164 of 500, vardo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vardo&units=imperial
    Retreiving weather data for city #165 of 500, san francisco: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20francisco&units=imperial
    Retreiving weather data for city #166 of 500, lebu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lebu&units=imperial
    Retreiving weather data for city #167 of 500, satu mare: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=satu%20mare&units=imperial
    Retreiving weather data for city #168 of 500, mar del plata: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mar%20del%20plata&units=imperial
    Retreiving weather data for city #169 of 500, mitu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mitu&units=imperial
    Retreiving weather data for city #170 of 500, husavik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=husavik&units=imperial
    Retreiving weather data for city #171 of 500, racale: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=racale&units=imperial
    Retreiving weather data for city #172 of 500, richards bay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=richards%20bay&units=imperial
    Retreiving weather data for city #173 of 500, iqaluit: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=iqaluit&units=imperial
    Retreiving weather data for city #174 of 500, klaksvik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=klaksvik&units=imperial
    Retreiving weather data for city #175 of 500, kokkola: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kokkola&units=imperial
    Retreiving weather data for city #176 of 500, evanton: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=evanton&units=imperial
    Retreiving weather data for city #177 of 500, hambantota: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hambantota&units=imperial
    Retreiving weather data for city #178 of 500, george town: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=george%20town&units=imperial
    Retreiving weather data for city #179 of 500, tazovskiy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tazovskiy&units=imperial
    Retreiving weather data for city #180 of 500, santiago: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=santiago&units=imperial
    Retreiving weather data for city #181 of 500, castro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=castro&units=imperial
    Retreiving weather data for city #182 of 500, dingle: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dingle&units=imperial
    Retreiving weather data for city #183 of 500, podosinovets: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=podosinovets&units=imperial
    Retreiving weather data for city #184 of 500, huarmey: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=huarmey&units=imperial
    Retreiving weather data for city #185 of 500, coquimbo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=coquimbo&units=imperial
    Retreiving weather data for city #186 of 500, matucana: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=matucana&units=imperial
    Retreiving weather data for city #187 of 500, oktyabrskoye: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=oktyabrskoye&units=imperial
    Retreiving weather data for city #188 of 500, nouakchott: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nouakchott&units=imperial
    Retreiving weather data for city #189 of 500, druzhba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=druzhba&units=imperial
    Retreiving weather data for city #190 of 500, touros: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=touros&units=imperial
    Retreiving weather data for city #191 of 500, gornopravdinsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gornopravdinsk&units=imperial
    Retreiving weather data for city #192 of 500, alta floresta: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=alta%20floresta&units=imperial
    Retreiving weather data for city #193 of 500, east london: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=east%20london&units=imperial
    Retreiving weather data for city #194 of 500, viedma: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=viedma&units=imperial
    Retreiving weather data for city #195 of 500, sharan: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sharan&units=imperial
    Retreiving weather data for city #196 of 500, praia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=praia&units=imperial
    Retreiving weather data for city #197 of 500, qaqortoq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=qaqortoq&units=imperial
    Retreiving weather data for city #198 of 500, henties bay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=henties%20bay&units=imperial
    Retreiving weather data for city #199 of 500, belem de sao francisco: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=belem%20de%20sao%20francisco&units=imperial
    Retreiving weather data for city #200 of 500, saint anthony: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint%20anthony&units=imperial
    Retreiving weather data for city #201 of 500, laguna: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=laguna&units=imperial
    Retreiving weather data for city #202 of 500, leua: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=leua&units=imperial
    Retreiving weather data for city #203 of 500, constitucion: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=constitucion&units=imperial
    Retreiving weather data for city #204 of 500, raudeberg: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=raudeberg&units=imperial
    Retreiving weather data for city #205 of 500, wukari: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=wukari&units=imperial
    Retreiving weather data for city #206 of 500, linden: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=linden&units=imperial
    Retreiving weather data for city #207 of 500, soderhamn: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=soderhamn&units=imperial
    Retreiving weather data for city #208 of 500, cururupu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cururupu&units=imperial
    Retreiving weather data for city #209 of 500, pohrebyshche: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pohrebyshche&units=imperial
    Retreiving weather data for city #210 of 500, kajaani: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kajaani&units=imperial
    Retreiving weather data for city #211 of 500, yarada: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=yarada&units=imperial
    Retreiving weather data for city #212 of 500, jarvenpaa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jarvenpaa&units=imperial
    Retreiving weather data for city #213 of 500, umm lajj: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=umm%20lajj&units=imperial
    Retreiving weather data for city #214 of 500, muravlenko: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=muravlenko&units=imperial
    Retreiving weather data for city #215 of 500, bhinmal: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bhinmal&units=imperial
    Retreiving weather data for city #216 of 500, nortelandia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nortelandia&units=imperial
    Retreiving weather data for city #217 of 500, cap malheureux: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cap%20malheureux&units=imperial
    Retreiving weather data for city #218 of 500, malindi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=malindi&units=imperial
    Retreiving weather data for city #219 of 500, zilair: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=zilair&units=imperial
    Retreiving weather data for city #220 of 500, goderich: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=goderich&units=imperial
    Retreiving weather data for city #221 of 500, amalapuram: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=amalapuram&units=imperial
    Retreiving weather data for city #222 of 500, neyshabur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=neyshabur&units=imperial
    Retreiving weather data for city #223 of 500, ouadda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ouadda&units=imperial
    Retreiving weather data for city #224 of 500, rawson: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rawson&units=imperial
    Retreiving weather data for city #225 of 500, scarborough: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=scarborough&units=imperial
    Retreiving weather data for city #226 of 500, aswan: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=aswan&units=imperial
    Retreiving weather data for city #227 of 500, contamana: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=contamana&units=imperial
    Retreiving weather data for city #228 of 500, aljezur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=aljezur&units=imperial
    Retreiving weather data for city #229 of 500, trincomalee: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=trincomalee&units=imperial
    Retreiving weather data for city #230 of 500, itigi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=itigi&units=imperial
    Retreiving weather data for city #231 of 500, weligama: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=weligama&units=imperial
    Retreiving weather data for city #232 of 500, bonavista: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bonavista&units=imperial
    Retreiving weather data for city #233 of 500, cocobeach: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cocobeach&units=imperial
    Retreiving weather data for city #234 of 500, tessalit: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tessalit&units=imperial
    Retreiving weather data for city #235 of 500, panaba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=panaba&units=imperial
    Retreiving weather data for city #236 of 500, lagoa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lagoa&units=imperial
    Retreiving weather data for city #237 of 500, maputo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maputo&units=imperial
    Retreiving weather data for city #238 of 500, sorland: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sorland&units=imperial
    Retreiving weather data for city #239 of 500, bolshaya martynovka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bolshaya%20martynovka&units=imperial
    Retreiving weather data for city #240 of 500, landsmeer: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=landsmeer&units=imperial
    Retreiving weather data for city #241 of 500, rochefort: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rochefort&units=imperial
    Retreiving weather data for city #242 of 500, tocopilla: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tocopilla&units=imperial
    Retreiving weather data for city #243 of 500, kristiansund: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kristiansund&units=imperial
    Retreiving weather data for city #244 of 500, khategaon: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=khategaon&units=imperial
    Retreiving weather data for city #245 of 500, dudinka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dudinka&units=imperial
    Retreiving weather data for city #246 of 500, sao raimundo das mangabeiras: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20raimundo%20das%20mangabeiras&units=imperial
    Retreiving weather data for city #247 of 500, ratangarh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ratangarh&units=imperial
    Retreiving weather data for city #248 of 500, magaria: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=magaria&units=imperial
    Retreiving weather data for city #249 of 500, usta muhammad: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=usta%20muhammad&units=imperial
    Retreiving weather data for city #250 of 500, carutapera: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=carutapera&units=imperial
    Retreiving weather data for city #251 of 500, xuddur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=xuddur&units=imperial
    Retreiving weather data for city #252 of 500, santo domingo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=santo%20domingo&units=imperial
    Retreiving weather data for city #253 of 500, piney green: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=piney%20green&units=imperial
    Retreiving weather data for city #254 of 500, saint-georges: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-georges&units=imperial
    Retreiving weather data for city #255 of 500, talas: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=talas&units=imperial
    Retreiving weather data for city #256 of 500, sambava: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sambava&units=imperial
    Retreiving weather data for city #257 of 500, trairi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=trairi&units=imperial
    Retreiving weather data for city #258 of 500, nisia floresta: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nisia%20floresta&units=imperial
    Retreiving weather data for city #259 of 500, marawi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=marawi&units=imperial
    Retreiving weather data for city #260 of 500, dwarka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dwarka&units=imperial
    Retreiving weather data for city #261 of 500, agirish: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=agirish&units=imperial
    Retreiving weather data for city #262 of 500, san joaquin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20joaquin&units=imperial
    Retreiving weather data for city #263 of 500, neuquen: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=neuquen&units=imperial
    Retreiving weather data for city #264 of 500, corbu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=corbu&units=imperial
    Retreiving weather data for city #265 of 500, hofn: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hofn&units=imperial
    Retreiving weather data for city #266 of 500, itarema: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=itarema&units=imperial
    Retreiving weather data for city #267 of 500, kilindoni: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kilindoni&units=imperial
    Retreiving weather data for city #268 of 500, balvi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=balvi&units=imperial
    Retreiving weather data for city #269 of 500, morant bay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=morant%20bay&units=imperial
    Retreiving weather data for city #270 of 500, araouane: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=araouane&units=imperial
    Retreiving weather data for city #271 of 500, moose factory: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=moose%20factory&units=imperial
    Retreiving weather data for city #272 of 500, margate: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=margate&units=imperial
    Retreiving weather data for city #273 of 500, carnarvon: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=carnarvon&units=imperial
    Retreiving weather data for city #274 of 500, dabat: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dabat&units=imperial
    Retreiving weather data for city #275 of 500, deep river: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=deep%20river&units=imperial
    Retreiving weather data for city #276 of 500, brigantine: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=brigantine&units=imperial
    Retreiving weather data for city #277 of 500, xai-xai: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=xai-xai&units=imperial
    Retreiving weather data for city #278 of 500, chapais: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=chapais&units=imperial
    Retreiving weather data for city #279 of 500, diu: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=diu&units=imperial
    Retreiving weather data for city #280 of 500, springbok: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=springbok&units=imperial
    Retreiving weather data for city #281 of 500, timra: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=timra&units=imperial
    Retreiving weather data for city #282 of 500, puquio: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=puquio&units=imperial
    Retreiving weather data for city #283 of 500, kez: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kez&units=imperial
    Retreiving weather data for city #284 of 500, cervo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cervo&units=imperial
    Retreiving weather data for city #285 of 500, machachi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=machachi&units=imperial
    Retreiving weather data for city #286 of 500, tema: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tema&units=imperial
    Retreiving weather data for city #287 of 500, san rafael: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20rafael&units=imperial
    Retreiving weather data for city #288 of 500, mizan teferi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mizan%20teferi&units=imperial
    Retreiving weather data for city #289 of 500, kaffrine: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kaffrine&units=imperial
    Retreiving weather data for city #290 of 500, beasain: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=beasain&units=imperial
    Retreiving weather data for city #291 of 500, ginda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ginda&units=imperial
    Retreiving weather data for city #292 of 500, dhidhdhoo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dhidhdhoo&units=imperial
    Retreiving weather data for city #293 of 500, rochegda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rochegda&units=imperial
    Retreiving weather data for city #294 of 500, yar-sale: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=yar-sale&units=imperial
    Retreiving weather data for city #295 of 500, sao filipe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20filipe&units=imperial
    Retreiving weather data for city #296 of 500, presidente medici: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=presidente%20medici&units=imperial
    Retreiving weather data for city #297 of 500, gremyachinsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gremyachinsk&units=imperial
    Retreiving weather data for city #298 of 500, alto araguaia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=alto%20araguaia&units=imperial
    Retreiving weather data for city #299 of 500, tokonou: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tokonou&units=imperial
    Retreiving weather data for city #300 of 500, cayenne: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cayenne&units=imperial
    Retreiving weather data for city #301 of 500, comodoro rivadavia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=comodoro%20rivadavia&units=imperial
    Retreiving weather data for city #302 of 500, la seyne-sur-mer: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=la%20seyne-sur-mer&units=imperial
    Retreiving weather data for city #303 of 500, kerchevskiy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kerchevskiy&units=imperial
    Retreiving weather data for city #304 of 500, namibe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=namibe&units=imperial
    Retreiving weather data for city #305 of 500, boca do acre: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=boca%20do%20acre&units=imperial
    Retreiving weather data for city #306 of 500, peniche: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=peniche&units=imperial
    Retreiving weather data for city #307 of 500, karlstad: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=karlstad&units=imperial
    Retreiving weather data for city #308 of 500, twinsburg: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=twinsburg&units=imperial
    Retreiving weather data for city #309 of 500, hamilton: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hamilton&units=imperial
    Retreiving weather data for city #310 of 500, lubao: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lubao&units=imperial
    Retreiving weather data for city #311 of 500, kangaatsiaq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kangaatsiaq&units=imperial
    Retreiving weather data for city #312 of 500, bosaso: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bosaso&units=imperial
    Retreiving weather data for city #313 of 500, maldonado: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maldonado&units=imperial
    Retreiving weather data for city #314 of 500, tabas: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tabas&units=imperial
    Retreiving weather data for city #315 of 500, andros: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=andros&units=imperial
    Retreiving weather data for city #316 of 500, antalaha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=antalaha&units=imperial
    Retreiving weather data for city #317 of 500, abnub: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=abnub&units=imperial
    Retreiving weather data for city #318 of 500, bubaque: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bubaque&units=imperial
    Retreiving weather data for city #319 of 500, dunda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dunda&units=imperial
    Retreiving weather data for city #320 of 500, cabedelo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cabedelo&units=imperial
    Retreiving weather data for city #321 of 500, adrar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=adrar&units=imperial
    Retreiving weather data for city #322 of 500, tricase: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tricase&units=imperial
    Retreiving weather data for city #323 of 500, lavello: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lavello&units=imperial
    Retreiving weather data for city #324 of 500, hauterive: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=hauterive&units=imperial
    Retreiving weather data for city #325 of 500, letlhakane: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=letlhakane&units=imperial
    Retreiving weather data for city #326 of 500, nantucket: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nantucket&units=imperial
    Retreiving weather data for city #327 of 500, caico: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=caico&units=imperial
    Retreiving weather data for city #328 of 500, vila velha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vila%20velha&units=imperial
    Retreiving weather data for city #329 of 500, conde: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=conde&units=imperial
    Retreiving weather data for city #330 of 500, nouadhibou: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nouadhibou&units=imperial
    Retreiving weather data for city #331 of 500, yurino: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=yurino&units=imperial
    Retreiving weather data for city #332 of 500, herouville-saint-clair: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=herouville-saint-clair&units=imperial
    Retreiving weather data for city #333 of 500, pisco: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pisco&units=imperial
    Retreiving weather data for city #334 of 500, vila franca do campo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vila%20franca%20do%20campo&units=imperial
    Retreiving weather data for city #335 of 500, ballina: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ballina&units=imperial
    Retreiving weather data for city #336 of 500, kargasok: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kargasok&units=imperial
    Retreiving weather data for city #337 of 500, savannah bight: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=savannah%20bight&units=imperial
    Retreiving weather data for city #338 of 500, erzurum: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=erzurum&units=imperial
    Retreiving weather data for city #339 of 500, le port: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=le%20port&units=imperial
    Retreiving weather data for city #340 of 500, altay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=altay&units=imperial
    Retreiving weather data for city #341 of 500, lakhdenpokhya: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lakhdenpokhya&units=imperial
    Retreiving weather data for city #342 of 500, asyut: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=asyut&units=imperial
    Retreiving weather data for city #343 of 500, neu-anspach: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=neu-anspach&units=imperial
    Retreiving weather data for city #344 of 500, abriaqui: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=abriaqui&units=imperial
    Retreiving weather data for city #345 of 500, tamandare: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tamandare&units=imperial
    Retreiving weather data for city #346 of 500, la tuque: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=la%20tuque&units=imperial
    Retreiving weather data for city #347 of 500, andros town: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=andros%20town&units=imperial
    Retreiving weather data for city #348 of 500, holguin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=holguin&units=imperial
    Retreiving weather data for city #349 of 500, fort abbas: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=fort%20abbas&units=imperial
    Retreiving weather data for city #350 of 500, londonderry: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=londonderry&units=imperial
    Retreiving weather data for city #351 of 500, ous: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ous&units=imperial
    Retreiving weather data for city #352 of 500, jeremie: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jeremie&units=imperial
    Retreiving weather data for city #353 of 500, kautokeino: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kautokeino&units=imperial
    Retreiving weather data for city #354 of 500, maua: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maua&units=imperial
    Retreiving weather data for city #355 of 500, monrovia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=monrovia&units=imperial
    Retreiving weather data for city #356 of 500, geraldton: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=geraldton&units=imperial
    Retreiving weather data for city #357 of 500, umm kaddadah: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=umm%20kaddadah&units=imperial
    Retreiving weather data for city #358 of 500, micheweni: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=micheweni&units=imperial
    Retreiving weather data for city #359 of 500, eydhafushi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=eydhafushi&units=imperial
    Retreiving weather data for city #360 of 500, talnakh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=talnakh&units=imperial
    Retreiving weather data for city #361 of 500, medzev: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=medzev&units=imperial
    Retreiving weather data for city #362 of 500, matagami: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=matagami&units=imperial
    Retreiving weather data for city #363 of 500, formosa do rio preto: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=formosa%20do%20rio%20preto&units=imperial
    Retreiving weather data for city #364 of 500, shaki: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=shaki&units=imperial
    Retreiving weather data for city #365 of 500, honningsvag: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=honningsvag&units=imperial
    Retreiving weather data for city #366 of 500, lubango: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lubango&units=imperial
    Retreiving weather data for city #367 of 500, umea: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=umea&units=imperial
    Retreiving weather data for city #368 of 500, shache: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=shache&units=imperial
    Retreiving weather data for city #369 of 500, santa isabel do rio negro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=santa%20isabel%20do%20rio%20negro&units=imperial
    Retreiving weather data for city #370 of 500, grand gaube: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=grand%20gaube&units=imperial
    Retreiving weather data for city #371 of 500, maamba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maamba&units=imperial
    Retreiving weather data for city #372 of 500, porto empedocle: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=porto%20empedocle&units=imperial
    Retreiving weather data for city #373 of 500, khabary: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=khabary&units=imperial
    Retreiving weather data for city #374 of 500, derzhavinsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=derzhavinsk&units=imperial
    Retreiving weather data for city #375 of 500, grindavik: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=grindavik&units=imperial
    Retreiving weather data for city #376 of 500, garautha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=garautha&units=imperial
    Retreiving weather data for city #377 of 500, tsiroanomandidy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tsiroanomandidy&units=imperial
    Retreiving weather data for city #378 of 500, kalmunai: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kalmunai&units=imperial
    Retreiving weather data for city #379 of 500, riyadh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=riyadh&units=imperial
    Retreiving weather data for city #380 of 500, thompson: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=thompson&units=imperial
    Retreiving weather data for city #381 of 500, nizhnevartovsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nizhnevartovsk&units=imperial
    Retreiving weather data for city #382 of 500, pitsunda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pitsunda&units=imperial
    Retreiving weather data for city #383 of 500, sioux lookout: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sioux%20lookout&units=imperial
    Retreiving weather data for city #384 of 500, key west: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=key%20west&units=imperial
    Retreiving weather data for city #385 of 500, conceicao do araguaia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=conceicao%20do%20araguaia&units=imperial
    Retreiving weather data for city #386 of 500, nyandoma: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nyandoma&units=imperial
    Retreiving weather data for city #387 of 500, santa cruz: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=santa%20cruz&units=imperial
    Retreiving weather data for city #388 of 500, svarstad: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=svarstad&units=imperial
    Retreiving weather data for city #389 of 500, cafelandia: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cafelandia&units=imperial
    Retreiving weather data for city #390 of 500, bandarbeyla: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bandarbeyla&units=imperial
    Retreiving weather data for city #391 of 500, mahanoro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mahanoro&units=imperial
    Retreiving weather data for city #392 of 500, chingirlau: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=chingirlau&units=imperial
    Retreiving weather data for city #393 of 500, liepaja: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=liepaja&units=imperial
    Retreiving weather data for city #394 of 500, harper: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=harper&units=imperial
    Retreiving weather data for city #395 of 500, ibra: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ibra&units=imperial
    Retreiving weather data for city #396 of 500, praia da vitoria: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=praia%20da%20vitoria&units=imperial
    Retreiving weather data for city #397 of 500, marzuq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=marzuq&units=imperial
    Retreiving weather data for city #398 of 500, acari: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=acari&units=imperial
    Retreiving weather data for city #399 of 500, tromso: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tromso&units=imperial
    Retreiving weather data for city #400 of 500, camacha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=camacha&units=imperial
    Retreiving weather data for city #401 of 500, sergeyevka: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sergeyevka&units=imperial
    Retreiving weather data for city #402 of 500, nkhata bay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nkhata%20bay&units=imperial
    Retreiving weather data for city #403 of 500, batangafo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=batangafo&units=imperial
    Retreiving weather data for city #404 of 500, iquitos: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=iquitos&units=imperial
    Retreiving weather data for city #405 of 500, dori: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dori&units=imperial
    Retreiving weather data for city #406 of 500, sikasso: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sikasso&units=imperial
    Retreiving weather data for city #407 of 500, puerto el triunfo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=puerto%20el%20triunfo&units=imperial
    Retreiving weather data for city #408 of 500, alcaniz: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=alcaniz&units=imperial
    Retreiving weather data for city #409 of 500, puerto ayacucho: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=puerto%20ayacucho&units=imperial
    Retreiving weather data for city #410 of 500, nacala: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nacala&units=imperial
    Retreiving weather data for city #411 of 500, serenje: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=serenje&units=imperial
    Retreiving weather data for city #412 of 500, taybad: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=taybad&units=imperial
    Retreiving weather data for city #413 of 500, port-cartier: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=port-cartier&units=imperial
    Retreiving weather data for city #414 of 500, agde: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=agde&units=imperial
    Retreiving weather data for city #415 of 500, sistranda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sistranda&units=imperial
    Retreiving weather data for city #416 of 500, lobito: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lobito&units=imperial
    Retreiving weather data for city #417 of 500, ust-shonosha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ust-shonosha&units=imperial
    Retreiving weather data for city #418 of 500, padang: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=padang&units=imperial
    Retreiving weather data for city #419 of 500, ambovombe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ambovombe&units=imperial
    Retreiving weather data for city #420 of 500, bogorodskoye: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bogorodskoye&units=imperial
    Retreiving weather data for city #421 of 500, businga: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=businga&units=imperial
    Retreiving weather data for city #422 of 500, sangin: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sangin&units=imperial
    Retreiving weather data for city #423 of 500, lar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lar&units=imperial
    Retreiving weather data for city #424 of 500, dzaoudzi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dzaoudzi&units=imperial
    Retreiving weather data for city #425 of 500, rognan: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=rognan&units=imperial
    Retreiving weather data for city #426 of 500, morondava: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=morondava&units=imperial
    Retreiving weather data for city #427 of 500, gedo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gedo&units=imperial
    Retreiving weather data for city #428 of 500, cankuzo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cankuzo&units=imperial
    Retreiving weather data for city #429 of 500, skawina: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=skawina&units=imperial
    Retreiving weather data for city #430 of 500, takhatpur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=takhatpur&units=imperial
    Retreiving weather data for city #431 of 500, paranga: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=paranga&units=imperial
    Retreiving weather data for city #432 of 500, penapolis: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=penapolis&units=imperial
    Retreiving weather data for city #433 of 500, solano: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=solano&units=imperial
    Retreiving weather data for city #434 of 500, abu zabad: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=abu%20zabad&units=imperial
    Retreiving weather data for city #435 of 500, tsabong: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tsabong&units=imperial
    Retreiving weather data for city #436 of 500, pachino: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=pachino&units=imperial
    Retreiving weather data for city #437 of 500, galle: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=galle&units=imperial
    Retreiving weather data for city #438 of 500, lieksa: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lieksa&units=imperial
    Retreiving weather data for city #439 of 500, takoradi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=takoradi&units=imperial
    Retreiving weather data for city #440 of 500, san ignacio: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20ignacio&units=imperial
    Retreiving weather data for city #441 of 500, usinsk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=usinsk&units=imperial
    Retreiving weather data for city #442 of 500, molina: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=molina&units=imperial
    Retreiving weather data for city #443 of 500, semey: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=semey&units=imperial
    Retreiving weather data for city #444 of 500, talcahuano: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=talcahuano&units=imperial
    Retreiving weather data for city #445 of 500, saint-joseph: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saint-joseph&units=imperial
    Retreiving weather data for city #446 of 500, plettenberg bay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=plettenberg%20bay&units=imperial
    Retreiving weather data for city #447 of 500, nioro: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nioro&units=imperial
    Retreiving weather data for city #448 of 500, abu samrah: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=abu%20samrah&units=imperial
    Retreiving weather data for city #449 of 500, san juan: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20juan&units=imperial
    Retreiving weather data for city #450 of 500, kollam: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kollam&units=imperial
    Retreiving weather data for city #451 of 500, uyuni: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=uyuni&units=imperial
    Retreiving weather data for city #452 of 500, nuuk: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nuuk&units=imperial
    Retreiving weather data for city #453 of 500, sao lourenco do sul: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sao%20lourenco%20do%20sul&units=imperial
    Retreiving weather data for city #454 of 500, birao: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=birao&units=imperial
    Retreiving weather data for city #455 of 500, bangangte: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bangangte&units=imperial
    Retreiving weather data for city #456 of 500, benghazi: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=benghazi&units=imperial
    Retreiving weather data for city #457 of 500, alampur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=alampur&units=imperial
    Retreiving weather data for city #458 of 500, mazagao: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=mazagao&units=imperial
    Retreiving weather data for city #459 of 500, lagdo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=lagdo&units=imperial
    Retreiving weather data for city #460 of 500, inyonga: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=inyonga&units=imperial
    Retreiving weather data for city #461 of 500, guntakal: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=guntakal&units=imperial
    Retreiving weather data for city #462 of 500, gaya: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=gaya&units=imperial
    Retreiving weather data for city #463 of 500, saurimo: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=saurimo&units=imperial
    Retreiving weather data for city #464 of 500, sinnar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sinnar&units=imperial
    Retreiving weather data for city #465 of 500, makamba: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=makamba&units=imperial
    Retreiving weather data for city #466 of 500, plavinas: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=plavinas&units=imperial
    Retreiving weather data for city #467 of 500, vagur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=vagur&units=imperial
    Retreiving weather data for city #468 of 500, sucre: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sucre&units=imperial
    Retreiving weather data for city #469 of 500, san andres: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=san%20andres&units=imperial
    Retreiving weather data for city #470 of 500, codrington: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=codrington&units=imperial
    Retreiving weather data for city #471 of 500, syamzha: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=syamzha&units=imperial
    Retreiving weather data for city #472 of 500, jasper: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=jasper&units=imperial
    Retreiving weather data for city #473 of 500, sumbe: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=sumbe&units=imperial
    Retreiving weather data for city #474 of 500, belmonte: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=belmonte&units=imperial
    Retreiving weather data for city #475 of 500, chernyshkovskiy: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=chernyshkovskiy&units=imperial
    Retreiving weather data for city #476 of 500, port saint john: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=port%20saint%20john&units=imperial
    Retreiving weather data for city #477 of 500, little current: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=little%20current&units=imperial
    Retreiving weather data for city #478 of 500, shelburne: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=shelburne&units=imperial
    Retreiving weather data for city #479 of 500, tayzhina: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tayzhina&units=imperial
    Retreiving weather data for city #480 of 500, constantine: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=constantine&units=imperial
    Retreiving weather data for city #481 of 500, ceamurlia de jos: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ceamurlia%20de%20jos&units=imperial
    Retreiving weather data for city #482 of 500, korem: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=korem&units=imperial
    Retreiving weather data for city #483 of 500, kibaya: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=kibaya&units=imperial
    Retreiving weather data for city #484 of 500, maniitsoq: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=maniitsoq&units=imperial
    Retreiving weather data for city #485 of 500, oranjemund: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=oranjemund&units=imperial
    Retreiving weather data for city #486 of 500, grosseto: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=grosseto&units=imperial
    Retreiving weather data for city #487 of 500, leh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=leh&units=imperial
    Retreiving weather data for city #488 of 500, bereda: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=bereda&units=imperial
    Retreiving weather data for city #489 of 500, tshane: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=tshane&units=imperial
    Retreiving weather data for city #490 of 500, ribeira brava: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=ribeira%20brava&units=imperial
    Retreiving weather data for city #491 of 500, nchelenge: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=nchelenge&units=imperial
    Retreiving weather data for city #492 of 500, cajamarca: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=cajamarca&units=imperial
    Retreiving weather data for city #493 of 500, skibbereen: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=skibbereen&units=imperial
    Retreiving weather data for city #494 of 500, aleksandrov gay: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=aleksandrov%20gay&units=imperial
    Retreiving weather data for city #495 of 500, marsa matruh: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=marsa%20matruh&units=imperial
    Retreiving weather data for city #496 of 500, havoysund: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=havoysund&units=imperial
    Retreiving weather data for city #497 of 500, astana: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=astana&units=imperial
    Retreiving weather data for city #498 of 500, palamos: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=palamos&units=imperial
    Retreiving weather data for city #499 of 500, dekar: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=dekar&units=imperial
    Retreiving weather data for city #500 of 500, udaipur: http://api.openweathermap.org/data/2.5/weather?appid=25bc90a1196e6f153eece0bc0b0fc9eb&q=udaipur&units=imperial
    


```python
#create dataframe with our lists
city_weather = pd.DataFrame(
    {'City': cities,
     'Country': countries,
     'Date': dates,
     'Lat': city_lats,
     'Lon': city_lons,
     'Max Temp': max_temps,
     'Cloudiness': cloudiness,
     'Humidity': humidities,
     'Wind Speed': windspeeds,
    })

#grab date for chart titles, convert from unix timestamp
date = datetime.datetime.fromtimestamp(int(str(city_weather['Date'][0]))).strftime('%m/%d/%y')

city_weather.to_csv("weather_data_output.csv", index=False, header=True)

#show sample of data
city_weather.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>City</th>
      <th>Cloudiness</th>
      <th>Country</th>
      <th>Date</th>
      <th>Humidity</th>
      <th>Lat</th>
      <th>Lon</th>
      <th>Max Temp</th>
      <th>Wind Speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>luderitz</td>
      <td>56</td>
      <td>NA</td>
      <td>1522785600</td>
      <td>68</td>
      <td>-26.65</td>
      <td>15.16</td>
      <td>68.00</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>albany</td>
      <td>90</td>
      <td>US</td>
      <td>1522785240</td>
      <td>86</td>
      <td>42.65</td>
      <td>-73.75</td>
      <td>37.40</td>
      <td>5.82</td>
    </tr>
    <tr>
      <th>2</th>
      <td>port elizabeth</td>
      <td>90</td>
      <td>US</td>
      <td>1522786680</td>
      <td>100</td>
      <td>39.31</td>
      <td>-74.98</td>
      <td>50.00</td>
      <td>8.08</td>
    </tr>
    <tr>
      <th>3</th>
      <td>upernavik</td>
      <td>88</td>
      <td>GL</td>
      <td>1522788401</td>
      <td>100</td>
      <td>72.79</td>
      <td>-56.15</td>
      <td>18.38</td>
      <td>9.08</td>
    </tr>
    <tr>
      <th>4</th>
      <td>kudahuvadhoo</td>
      <td>76</td>
      <td>MV</td>
      <td>1522788401</td>
      <td>100</td>
      <td>2.67</td>
      <td>72.89</td>
      <td>85.52</td>
      <td>4.16</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Create and format scatterplot for Max Temp vs Latitude
my_plot = city_weather.plot(kind="scatter", x="Lat", y="Max Temp", grid=True, c='blue', figsize=(9,6), title=f"City Latitude vs. Max Temp ({date})", edgecolors='black', alpha=1)
my_plot.set_facecolor((0.93, 0.92, 0.94))
my_plot.grid(color='w', linestyle='-', linewidth=0.9)
my_plot.set_axisbelow(True)
my_plot.set_xlabel("Latitude", fontsize=12)
my_plot.set_ylabel("Max Temperature (F)", fontsize=12)
my_plot.set_title(my_plot.title.get_text(), fontsize=14)
fig = my_plot.get_figure()
fig.savefig("Latitude_vs_Temp.png")
```


![png](output_4_0.png)



```python
#copy previous chart, changing items as necessary for Humidity
my_plot = city_weather.plot(kind="scatter", x="Lat", y="Humidity", grid=True, c='blue', figsize=(9,6), title=f"City Latitude vs. Humidity ({date})", edgecolors='black', alpha=1)
my_plot.set_facecolor((0.93, 0.92, 0.94))
my_plot.grid(color='w', linestyle='-', linewidth=0.9)
my_plot.set_axisbelow(True)
my_plot.set_xlabel("Latitude", fontsize=12)
my_plot.set_ylabel("Humidity (%)", fontsize=12)
my_plot.set_title(my_plot.title.get_text(), fontsize=14)
fig = my_plot.get_figure()
fig.savefig("Latitude_vs_Humidity.png")
```


![png](output_5_0.png)



```python
#copy previous chart, changing items as necessary for Cloudiness
my_plot = city_weather.plot(kind="scatter", x="Lon", y="Cloudiness", grid=True, c='blue', figsize=(9,6), title=f"City Latitude vs. Cloudiness ({date})", edgecolors='black', alpha=1)
my_plot.set_facecolor((0.93, 0.92, 0.94))
my_plot.grid(color='w', linestyle='-', linewidth=0.9)
my_plot.set_axisbelow(True)
my_plot.set_xlabel("Latitude", fontsize=12)
my_plot.set_ylabel("Cloudiness (%)", fontsize=12)
my_plot.set_title(my_plot.title.get_text(), fontsize=14)
fig = my_plot.get_figure()
fig.savefig("Latitude_vs_Cloudiness.png")
```


![png](output_6_0.png)



```python
#copy previous chart, changing items as necessary for Wind Speed
my_plot = city_weather.plot(kind="scatter", x="Lat", y="Wind Speed", grid=True, c='blue', figsize=(9,6), title=f"City Latitude vs. Wind Speed ({date})", edgecolors='black', alpha=1)
my_plot.set_facecolor((0.93, 0.92, 0.94))
my_plot.grid(color='w', linestyle='-', linewidth=0.9)
my_plot.set_axisbelow(True)
my_plot.set_xlabel("Latitude", fontsize=12)
my_plot.set_ylabel("Wind Speed (mph)", fontsize=12)
my_plot.set_title(my_plot.title.get_text(), fontsize=14)
fig = my_plot.get_figure()
fig.savefig("Latitude_vs_Wind.png")
```


![png](output_7_0.png)

