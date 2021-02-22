import csv
import pandas as pd
from rpc_client import analyse

OUTPUT_PATH = 'gold_mine_EF.csv'
INPUT_PATH = 'emotions.csv'

df = pd.read_csv('tidyData_CE_EF.csv', header=None, sep=',')

TEST_SENTENCES = list(df[0])
EMOTIONS = list(df[1])

scores = []
for i, t in enumerate(TEST_SENTENCES):
    t_score = []
    print(i, ': ', t)
    distribution = analyse(t)
    t_score.extend(distribution)
    t_score.append(EMOTIONS[i])
    t_score.append(t)
    scores.append(t_score)


with open(OUTPUT_PATH, 'w') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', lineterminator='\n')
    for row in scores:
        writer.writerow(row)

