import numpy as np
import pandas as pd

gold = pd.read_csv("gold_mine.csv", header=None)

silver = gold.iloc[:,0:65].to_numpy()

counter = [0]*6
for i in range(2000):
    if silver[i][64] == "joy":
        counter[0]+=1
    elif silver[i][64] == "anger":
        counter[1]+=1
    elif silver[i][64] == "surprise":
        counter[2]+=1
    elif silver[i][64] == "fear":
        counter[3]+=1
    elif silver[i][64] == "sadness":
        counter[4]+=1
    elif silver[i][64] == "love":
        counter[5]+=1

print(counter)