import numpy as np
import pandas as pd

gold = pd.read_csv("gold_mine_PO.csv", header=None)

silver = gold.iloc[:,0:65].to_numpy()

likelihoodPositive = np.zeros(64)
likelihoodNeutral = np.zeros(64)
likelihoodNegative = np.zeros(64)


nRows = gold.shape[0]

probDistEmojis = np.zeros((64,3))

emotions = ["positive", "neutral", "negative"]
counter = [0]*3
for j in range(nRows):
    if silver[j,64] == 'positive':
        likelihoodPositive = likelihoodPositive + silver[j,0:64]
    elif silver[j,64] == 'neutral':
        likelihoodNeutral = likelihoodNeutral + silver[j,0:64]
    elif silver[j,64] == 'negative':
        likelihoodNegative = likelihoodNegative + silver[j,0:64]



likelihoodPositive /= nRows
likelihoodNeutral /= nRows
likelihoodNegative /= nRows


# Loop over emojis
for i in range(64):
    normalize = likelihoodPositive[i] +  likelihoodNeutral[i] + likelihoodNegative[i] 
    probDistEmojis[i][0] = likelihoodPositive[i]/normalize
    probDistEmojis[i][1] = likelihoodNeutral[i]/normalize
    probDistEmojis[i][2] = likelihoodNegative[i]/normalize


    print(str(i) + " " + emotions[np.argmax(probDistEmojis[i])])


pd.DataFrame(probDistEmojis).to_csv("j2p_Bayes.csv", header=None, index=None)






