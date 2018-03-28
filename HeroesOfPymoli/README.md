

```python
import pandas as pd
```


```python
#read in the json file

data_file = "purchase_data.json"
purchase_data = pd.read_json(data_file)
```


```python
#add an age category column for later
bins = [0, 9, 14, 19, 24, 29, 34, 39, 1000]
group_names = ['<10', '10-14', '15-19', '20-24', '25-29', '30-34','35-39','40+']
purchase_data["Age Group"]=pd.cut(purchase_data["Age"], bins, labels=group_names)

#create a dataframe with only unique players and count them
unique_players = purchase_data.drop_duplicates(subset=['SN'], keep='first')
players_count = unique_players.count()[5]

#turn count of unique players into a dataframe
total_players = pd.DataFrame({"Total Players":players_count}, index=[0])
total_players
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
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>573</td>
    </tr>
  </tbody>
</table>
</div>




```python
#calculate number of unique items
unique_items = purchase_data.drop_duplicates(subset=['Item ID'], keep='first').count()[2]
unique_items
```




    183




```python
#calculate the average price of items
average_purchase_price = "${0:.2f}".format(purchase_data['Price'].mean())

#calculate total purchases
total_purchases = purchase_data.count()[1]

#calculate total revenue
total_revenue = "${0:.2f}".format(purchase_data['Price'].sum())
```


```python
#create summary dataframe
summary_table = pd.DataFrame({"Number of Unique Items":unique_items, "Average Price":average_purchase_price, "Number of Purchases":total_purchases, "Total Revenue": total_revenue}, index=[0])
summary_table = summary_table[["Number of Unique Items", "Average Price", "Number of Purchases", "Total Revenue"]]
summary_table
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
      <th>Number of Unique Items</th>
      <th>Average Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>183</td>
      <td>$2.93</td>
      <td>780</td>
      <td>$2286.33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Find the percent and number of unique players by gender
genders = unique_players["Gender"].value_counts()
male_players = genders[0]
percent_male = "{0:.2f}%".format((male_players/players_count)*100)
female_players = genders[1]
percent_female = "{0:.2f}%".format((female_players/players_count)*100)
other_players = genders[2]
percent_other = "{0:.2f}%".format((other_players/players_count)*100)
```


```python
genders_count = pd.DataFrame({"Gender":["Male", "Female", "Other/Non-Disclosed"], "Percentage of Players":[percent_male, percent_female, percent_other], "Total Count":[male_players, female_players, other_players]})
genders_count.set_index("Gender")

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
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>81.15%</td>
      <td>465</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>17.45%</td>
      <td>100</td>
    </tr>
    <tr>
      <th>Other/Non-Disclosed</th>
      <td>1.40%</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python
gg = purchase_data.groupby(["Gender"])
```


```python
purchases_by_g = gg['Age'].count()
price_by_g = round(gg['Price'].mean(),2).map("${:,.2f}".format)
revenue_by_g = gg['Price'].sum().map("${:,.2f}".format)
normalized_by_g = round(gg['Price'].sum()/genders,2).map("${:,.2f}".format)
```


```python
genders_summary = pd.DataFrame({"Purchase Count": purchases_by_g, "Average Purchase Price": price_by_g, "Total Purchase Value":revenue_by_g, "Normalized Totals": normalized_by_g})
genders_summary = genders_summary[["Purchase Count", "Average Purchase Price", "Total Purchase Value", "Normalized Totals"]]
genders_summary
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>136</td>
      <td>$2.82</td>
      <td>$382.91</td>
      <td>$3.83</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>633</td>
      <td>$2.95</td>
      <td>$1,867.68</td>
      <td>$4.02</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>11</td>
      <td>$3.25</td>
      <td>$35.74</td>
      <td>$4.47</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Find the percent of total players and player count for each age group
by_age = purchase_data.groupby(['Age Group'])
unique_by_age = unique_players.groupby(['Age Group'])
players_by_a = unique_by_age['SN'].count()
age_group_count = pd.DataFrame({"Total Count":players_by_a, "Percent of Players":((players_by_a/players_count)*100).map("{0:.2f}%".format)})
age_group_count
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
      <th>Percent of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Age Group</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>3.32%</td>
      <td>19</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>4.01%</td>
      <td>23</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>17.45%</td>
      <td>100</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>45.20%</td>
      <td>259</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>15.18%</td>
      <td>87</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>8.20%</td>
      <td>47</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>4.71%</td>
      <td>27</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>1.92%</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
</div>




```python
players_in_age_group = unique_players["Age Group"].value_counts()
purchases_by_a = by_age['Age'].count()
price_by_a = by_age['Price'].mean().map("${:,.2f}".format)
revenue_by_a = by_age['Price'].sum().map("${:,.2f}".format)
normalized_by_a = (by_age['Price'].sum()/players_in_age_group).map("${:,.2f}".format)

age_summary = pd.DataFrame({"Purchase Count": purchases_by_a, "Average Purchase Price": price_by_a, "Total Purchase Value":revenue_by_a, "Normalized Totals": normalized_by_a})
age_summary = age_summary[["Purchase Count", "Average Purchase Price", "Total Purchase Value", "Normalized Totals"]]
age_summary
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>10-14</th>
      <td>35</td>
      <td>$2.77</td>
      <td>$96.95</td>
      <td>$4.22</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>133</td>
      <td>$2.91</td>
      <td>$386.42</td>
      <td>$3.86</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>336</td>
      <td>$2.91</td>
      <td>$978.77</td>
      <td>$3.78</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>125</td>
      <td>$2.96</td>
      <td>$370.33</td>
      <td>$4.26</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>64</td>
      <td>$3.08</td>
      <td>$197.25</td>
      <td>$4.20</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>42</td>
      <td>$2.84</td>
      <td>$119.40</td>
      <td>$4.42</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>17</td>
      <td>$3.16</td>
      <td>$53.75</td>
      <td>$4.89</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>28</td>
      <td>$2.98</td>
      <td>$83.46</td>
      <td>$4.39</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_sn = purchase_data.groupby(['SN'])
purchases_by_sn = by_sn['Age'].count()
price_by_sn = by_sn['Price'].mean().map("${:,.2f}".format)
revenue_by_sn = by_sn['Price'].sum()

##create data frame of top 5 items sorted by Total Purchase Value
top_spenders = pd.DataFrame({"Purchase Count": purchases_by_sn, "Average Purchase Price": price_by_sn, "Total Purchase Value":revenue_by_sn})
top_spenders_sorted = top_spenders.sort_values('Total Purchase Value', ascending=False).head(5)

#Total Purchase Value must be formated after sorting
top_spenders_sorted["Total Purchase Value"] = top_spenders_sorted["Total Purchase Value"].map("${:,.2f}".format)
top_spenders_sorted = top_spenders_sorted[["Purchase Count", "Average Purchase Price", "Total Purchase Value"]]
top_spenders_sorted
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
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>SN</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Undirrala66</th>
      <td>5</td>
      <td>$3.41</td>
      <td>$17.06</td>
    </tr>
    <tr>
      <th>Saedue76</th>
      <td>4</td>
      <td>$3.39</td>
      <td>$13.56</td>
    </tr>
    <tr>
      <th>Mindimnya67</th>
      <td>4</td>
      <td>$3.18</td>
      <td>$12.74</td>
    </tr>
    <tr>
      <th>Haellysu29</th>
      <td>3</td>
      <td>$4.24</td>
      <td>$12.73</td>
    </tr>
    <tr>
      <th>Eoda93</th>
      <td>3</td>
      <td>$3.86</td>
      <td>$11.58</td>
    </tr>
  </tbody>
</table>
</div>




```python
by_item = purchase_data.groupby(['Item ID', 'Item Name'])
purchases_by_item = by_item['Age'].count()
price_by_item = by_item['Price'].mean().map("${:,.2f}".format)
revenue_by_item = by_item['Price'].sum()

#Create top items dataframe
top_items = pd.DataFrame({"Purchase Count": purchases_by_item, "Item Price": price_by_item, "Total Purchase Value":revenue_by_item})

#Create dataframe of top 5 items sorted by purchase count
by_count = top_items.sort_values('Purchase Count', ascending=False).head(5)

#Format the Total Purchase Value column
by_count["Total Purchase Value"] = by_count["Total Purchase Value"].map("${:,.2f}".format)
by_count = by_count[["Purchase Count", 'Item Price', "Total Purchase Value"]]
by_count
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
      <th></th>
      <th>Purchase Count</th>
      <th>Item Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>39</th>
      <th>Betrayal, Whisper of Grieving Widows</th>
      <td>11</td>
      <td>$2.35</td>
      <td>$25.85</td>
    </tr>
    <tr>
      <th>84</th>
      <th>Arcane Gem</th>
      <td>11</td>
      <td>$2.23</td>
      <td>$24.53</td>
    </tr>
    <tr>
      <th>31</th>
      <th>Trickster</th>
      <td>9</td>
      <td>$2.07</td>
      <td>$18.63</td>
    </tr>
    <tr>
      <th>175</th>
      <th>Woeful Adamantite Claymore</th>
      <td>9</td>
      <td>$1.24</td>
      <td>$11.16</td>
    </tr>
    <tr>
      <th>13</th>
      <th>Serenity</th>
      <td>9</td>
      <td>$1.49</td>
      <td>$13.41</td>
    </tr>
  </tbody>
</table>
</div>




```python
#create data frame of top 5 items sorted by Total Purchase Value
by_total_value = top_items.sort_values('Total Purchase Value', ascending=False).head(5)

#Total Purchase Value must be formated after sorting
by_total_value["Total Purchase Value"] = by_total_value["Total Purchase Value"].map("${:,.2f}".format)
by_total_value = by_total_value[["Purchase Count", 'Item Price', "Total Purchase Value"]]
by_total_value
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
      <th></th>
      <th>Purchase Count</th>
      <th>Item Price</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>34</th>
      <th>Retribution Axe</th>
      <td>9</td>
      <td>$4.14</td>
      <td>$37.26</td>
    </tr>
    <tr>
      <th>115</th>
      <th>Spectral Diamond Doomblade</th>
      <td>7</td>
      <td>$4.25</td>
      <td>$29.75</td>
    </tr>
    <tr>
      <th>32</th>
      <th>Orenmir</th>
      <td>6</td>
      <td>$4.95</td>
      <td>$29.70</td>
    </tr>
    <tr>
      <th>103</th>
      <th>Singed Scalpel</th>
      <td>6</td>
      <td>$4.87</td>
      <td>$29.22</td>
    </tr>
    <tr>
      <th>107</th>
      <th>Splitter, Foe Of Subtlety</th>
      <td>8</td>
      <td>$3.61</td>
      <td>$28.88</td>
    </tr>
  </tbody>
</table>
</div>


