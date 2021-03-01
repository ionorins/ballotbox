import numpy as np
import pandas as pd

data = pd.read_csv("Emoji_Sentiment.csv", header = None)[[1]].to_numpy()
print(data)
maxPol = 0
minPol = 0

for i in range(len(data)):
    if maxPol < data[i]:
        maxPol = data[i]

    if minPol > data[i]:
        minPol = data[i]

# Scaling the polarities into (-1,1) to preserve variation.
for i in range(len(data)):
    data[i] = 2*(data[i]-minPol)/(maxPol-minPol) - 1


pd.DataFrame(data).to_csv("j2p.csv", header = False, index = False)