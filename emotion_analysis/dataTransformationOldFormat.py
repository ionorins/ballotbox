import numpy as np
import pandas as pd

gold = pd.read_csv("gold_mine_EF.csv", header=None)

silver = gold.iloc[:,0:65].to_numpy()

likelihoodJoy = np.zeros(64)
likelihoodAnger = np.zeros(64)
likelihoodFear = np.zeros(64)
likelihoodSadness = np.zeros(64)
likelihoodLove = np.zeros(64)

nRows = 8200
probDistEmojis = np.zeros((64,5))
emotions = ["joy", "anger", "fear", "sadness", "love"]
counter = [0]*5
for j in range(nRows):
    if silver[j,64] == 'joy':
        likelihoodJoy = likelihoodJoy + silver[j,0:64]
    elif silver[j,64] == 'anger':
        likelihoodAnger = likelihoodAnger + silver[j,0:64]
    elif silver[j,64] == 'fear':
        likelihoodFear = likelihoodFear + silver[j,0:64]
    elif silver[j,64] == 'sadness':
        likelihoodSadness = likelihoodSadness + silver[j,0:64]
    elif silver[j,64] == 'love':
        likelihoodLove = likelihoodLove + silver[j,0:64]

for i in range(64):
    if likelihoodAnger[i] > likelihoodJoy[i]:
        print("Anger")


likelihoodJoy /= nRows
likelihoodAnger /= nRows
likelihoodFear /= nRows
likelihoodSadness /= nRows
likelihoodLove /= nRows


# Loop over emojis
for i in range(64):
    normalize = likelihoodJoy[i] +  likelihoodAnger[i] + likelihoodFear[i] + likelihoodSadness[i] + likelihoodLove[i] 
    probDistEmojis[i][0] = likelihoodJoy[i]/normalize
    probDistEmojis[i][1] = likelihoodAnger[i]/normalize
    probDistEmojis[i][2] = likelihoodFear[i]/normalize
    probDistEmojis[i][3] = likelihoodSadness[i]/normalize
    probDistEmojis[i][4] = likelihoodLove[i]/normalize


    print(str(i) + " " + emotions[np.argmax(probDistEmojis[i])])


pd.DataFrame(probDistEmojis).to_csv("j2c_8200_EF.csv", header=None, index=None)






