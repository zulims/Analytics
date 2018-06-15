import csv

data_file = csv.DictReader(open("budget_data_2.csv"))

month_count = 0
total_revenue = 0
total_change = 0
previous_revenue = 0
previous_change = 0
max_increase = 0
max_decrease = 0

for row in data_file:
    month = row["Date"]
    revenue = int(row["Revenue"])
    month_count = month_count + 1
    total_revenue = total_revenue + revenue
    change = revenue - previous_revenue
    total_change = change + total_change

    if change > max_increase:
        max_increase = change
        max_month = month
    if change < max_decrease:
        max_decrease = change
        min_month = month

    previous_revenue = revenue
    previous_change = change


print("Financial Analysis")
print("-----------------------------------------")
print("Total Months:", month_count)
print("Total Revenue:", str('$'+str(total_revenue)))
print("Average Revenue Change:", str("$"+str(round(total_change/month_count))))
print("Greatest Increase in Revenue:", max_month, max_increase)
print("Greatest Decrease in Revenue:", min_month, max_decrease)


