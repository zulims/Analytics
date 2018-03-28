import csv

candidates = []
total_votes = 0
candidate_votes = 0
winner = 0

#Import and open csv as a dictionary (csv.DictReader)
data_file = csv.DictReader(open("election_data_1.csv"))

#loop through all votes to make a list of total votes and unique candidates
for row in data_file:
    total_votes = total_votes + 1
    candidate = row["Candidate"]
    if candidate not in candidates:
        candidates.append(candidate)

#print out the results header
print("Election Results")
print("------------------------")
print("Total Votes:", str(total_votes))
print("------------------------")

#loop through loop candidates list and tally votes for each
for names in candidates:
    #must restart csv since we've already ran through it
    data_file = csv.DictReader(open("election_data_1.csv"))
    for row in data_file:
        if names == row["Candidate"]:
            candidate_votes = candidate_votes + 1
        if candidate_votes > winner:
            winner = candidate_votes
            winner_name = names
    candidate_percentage = candidate_votes/total_votes
    print(names+ " " + str("{0:.1%}".format(candidate_percentage)) + " " + "("+str(candidate_votes)+")")
    candidate_votes = 0

#print out results footer
print("------------------------")
print("Winner:", winner_name)
print("------------------------")  
        
