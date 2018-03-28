

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.patches as mpatches
```


```python
ride_data = pd.read_csv('raw_data/ride_data.csv')
city_data = pd.read_csv('raw_data/city_data.csv')
```


```python
#I previously found that city_data had a duplicate that should be removed before merging 
#(it was casuing every ride with that city to be added to the merged df twice)
seen = set()
duplicate = set()
for x in city_data['city']:
    if x not in seen:
        seen.add(x)
    else: 
        duplicate.add(x)

duplicate
```




    {'Port James'}




```python
#let's see what we're dealing with
port_james = city_data.loc[city_data['city']=='Port James']
port_james
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
      <th>city</th>
      <th>driver_count</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>84</th>
      <td>Port James</td>
      <td>15</td>
      <td>Suburban</td>
    </tr>
    <tr>
      <th>100</th>
      <td>Port James</td>
      <td>3</td>
      <td>Suburban</td>
    </tr>
  </tbody>
</table>
</div>




```python
#combine these rows into one
port_james_df = pd.DataFrame(port_james.groupby(['city', 'type']).sum()).reset_index()
port_james_df
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
      <th>city</th>
      <th>type</th>
      <th>driver_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Port James</td>
      <td>Suburban</td>
      <td>18</td>
    </tr>
  </tbody>
</table>
</div>




```python
#drop old Port James, add new, and check changes
city_data_clean = city_data[city_data.city != 'Port James']
city_data_clean = city_data_clean.append(port_james_df, ignore_index=True)
city_data_clean.loc[city_data_clean['city']=='Port James']
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
      <th>city</th>
      <th>driver_count</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>124</th>
      <td>Port James</td>
      <td>18</td>
      <td>Suburban</td>
    </tr>
  </tbody>
</table>
</div>




```python
#merge these datasets
combined_data = pd.merge(city_data_clean, ride_data, on="city")
combined_data.head()
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
      <th>city</th>
      <th>driver_count</th>
      <th>type</th>
      <th>date</th>
      <th>fare</th>
      <th>ride_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-19 04:27:52</td>
      <td>5.51</td>
      <td>6246006544795</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-04-17 06:59:50</td>
      <td>5.54</td>
      <td>7466473222333</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-05-04 15:06:07</td>
      <td>30.54</td>
      <td>2140501382736</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-01-25 20:44:56</td>
      <td>12.08</td>
      <td>1896987891309</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
      <td>2016-08-09 18:19:47</td>
      <td>17.91</td>
      <td>8784212854829</td>
    </tr>
  </tbody>
</table>
</div>




```python
#To make each city a single datapoint, group by city. First group to get avg fare and total driver count.
#Set as dataframe and reset index
city_avg = pd.DataFrame(combined_data.groupby(['city', 'type']).mean()).reset_index()

#drop column that 'avg' is irrelevant for
city_avg = city_avg.drop(['ride_id'], axis=1)
city_avg.head()
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
      <th>city</th>
      <th>type</th>
      <th>driver_count</th>
      <th>fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>Urban</td>
      <td>21.0</td>
      <td>23.928710</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>Urban</td>
      <td>67.0</td>
      <td>20.609615</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>Suburban</td>
      <td>16.0</td>
      <td>37.315556</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>Urban</td>
      <td>21.0</td>
      <td>23.625000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>Urban</td>
      <td>49.0</td>
      <td>21.981579</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Next, do the same but with 'count' instead of 'mean'
city_ride_count = pd.DataFrame(combined_data.groupby(['city', 'type']).count()).reset_index()
city_ride_count = city_ride_count.drop(['driver_count', 'date', 'fare', 'type'], axis=1)
city_ride_count.head()
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
      <th>city</th>
      <th>ride_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>26</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>22</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>19</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Merge this correct summary data and set proper index
scatter_plot_data = pd.merge(city_avg, city_ride_count, on="city").set_index('city')
scatter_plot_data.columns = ['Type', 'Driver Count', 'Avg Fare', 'Ride Count']
scatter_plot_data.head()
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
      <th>Type</th>
      <th>Driver Count</th>
      <th>Avg Fare</th>
      <th>Ride Count</th>
    </tr>
    <tr>
      <th>city</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Alvarezhaven</th>
      <td>Urban</td>
      <td>21.0</td>
      <td>23.928710</td>
      <td>31</td>
    </tr>
    <tr>
      <th>Alyssaberg</th>
      <td>Urban</td>
      <td>67.0</td>
      <td>20.609615</td>
      <td>26</td>
    </tr>
    <tr>
      <th>Anitamouth</th>
      <td>Suburban</td>
      <td>16.0</td>
      <td>37.315556</td>
      <td>9</td>
    </tr>
    <tr>
      <th>Antoniomouth</th>
      <td>Urban</td>
      <td>21.0</td>
      <td>23.625000</td>
      <td>22</td>
    </tr>
    <tr>
      <th>Aprilchester</th>
      <td>Urban</td>
      <td>49.0</td>
      <td>21.981579</td>
      <td>19</td>
    </tr>
  </tbody>
</table>
</div>




```python
#See if preset color palette will work
palette = sns.color_palette("RdYlBu", n_colors=7)
sns.palplot(palette)
```


![png](output_10_0.png)



```python
#Get exact brand colors using Seaborn and hex codes
palette2 = sns.color_palette([ '#FFD700','#86CDF9','#F08080',  ])
sns.palplot(palette2)
```


![png](output_11_0.png)



```python
#create a list of colors corresponding to City Type
colors = []

for i in scatter_plot_data['Type']:
    if i == 'Urban':
        colors.append(palette2[0])
    elif i == 'Suburban':
        colors.append(palette2[1])
    else:
        colors.append(palette2[2])
```


```python
my_plot = scatter_plot_data.plot(kind="scatter", x="Ride Count", y="Avg Fare", grid=True, c=colors, figsize=(12,6), title="Pyber Ride Sharing Data 2016", edgecolors='black', alpha=0.8, sizes=(scatter_plot_data['Driver Count']*10)-9)
my_plot.grid(color='w', linestyle='-', linewidth=0.9)
my_plot.set_axisbelow(True)
my_plot.set_xlabel("Total Number of Rides (Per City)", fontsize=12)
my_plot.set_ylabel("Average Fare ($)", fontsize=12)
my_plot.set_title(my_plot.title.get_text(), fontsize=14)
my_plot.set_facecolor((0.91, 0.92, 0.94))
patch1 = mpatches.Patch(color=palette2[0], label='Urban')
patch2 = mpatches.Patch(color=palette2[1], label='Suburban')
patch3 = mpatches.Patch(color=palette2[2], label='Rural')
my_plot.legend(handles=[patch1, patch2, patch3], title="City Type", facecolor='none', fontsize=10)
print("Note: Circle size corresponds to driver count per city.")
```

    Note: Circle size corresponds to driver count per city.
    


![png](output_13_1.png)



```python
#Get data summed up by City Type for pie charts
by_type_summed = combined_data.groupby(['type']).sum()
by_type_counted = combined_data.groupby(['type']).count()
by_type_average = combined_data.groupby(['type']).mean()
by_type_average
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
      <th>driver_count</th>
      <th>fare</th>
      <th>ride_id</th>
    </tr>
    <tr>
      <th>type</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Rural</th>
      <td>5.816000</td>
      <td>34.040720</td>
      <td>5.269835e+12</td>
    </tr>
    <tr>
      <th>Suburban</th>
      <td>15.568000</td>
      <td>30.908608</td>
      <td>4.810247e+12</td>
    </tr>
    <tr>
      <th>Urban</th>
      <td>39.692923</td>
      <td>24.663594</td>
      <td>4.855504e+12</td>
    </tr>
  </tbody>
</table>
</div>




```python
plt.pie(by_type_summed['fare'], autopct="%1.2f%%", shadow=True, startangle=150, colors=palette2, labels=['Rural', 'Suburban', 'Urban'], explode=[0, 0, 0.1])
plt.title('% of Total Fares by City Type')
```




    Text(0.5,1,'% of Total Fares by City Type')




![png](output_15_1.png)



```python
plt.pie(by_type_counted['ride_id'], autopct="%1.2f%%", shadow=True, startangle=150, colors=palette2, labels=['Rural', 'Suburban', 'Urban'], explode=[0, 0, 0.1])
plt.title('% of Total Rides by City Type')
```




    Text(0.5,1,'% of Total Rides by City Type')




![png](output_16_1.png)



```python
plt.pie(by_type_average['driver_count'], autopct="%1.2f%%", shadow=True, startangle=150, colors=palette2, labels=['Rural', 'Suburban', 'Urban'], explode=[0, 0, 0.1])
plt.title('% of Total Drivers by City Type')
```




    Text(0.5,1,'% of Total Drivers by City Type')




![png](output_17_1.png)

