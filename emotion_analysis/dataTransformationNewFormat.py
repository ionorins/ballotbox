# Change the code after deciding on the new format
import numpy as np
import pandas as pd

gold = pd.read_csv("gold_mine.csv", header=None)

silver = gold.iloc[:,0:65].to_numpy()

likelihoodJoy = np.zeros(64)
likelihoodAnger = np.zeros(64)
likelihoodSurprise = np.zeros(64)
likelihoodFear = np.zeros(64)
likelihoodSadness = np.zeros(64)
likelihoodLove = np.zeros(64)


probDistEmojis = np.zeros((64,6))
emotions = ["joy", "anger", "surprise", "fear", "sadness", "love"]
counter = [0]*6
for j in range(2000):
    if silver[j,64] == 'joy':
        likelihoodJoy = likelihoodJoy + silver[j,0:64]
    elif silver[j,64] == 'anger':
        likelihoodAnger = likelihoodAnger + silver[j,0:64]
    elif silver[j,64] == 'surprise':
        likelihoodSurprise = likelihoodSurprise + silver[j,0:64]
    elif silver[j,64] == 'fear':
        likelihoodFear = likelihoodFear + silver[j,0:64]
    elif silver[j,64] == 'sadness':
        likelihoodSadness = likelihoodSadness + silver[j,0:64]
    elif silver[j,64] == 'love':
        likelihoodLove = likelihoodLove + silver[j,0:64]

for i in range(64):
    if likelihoodAnger[i] > likelihoodJoy[i]:
        print("Anger")

likelihoodJoy /= 2000
likelihoodAnger /= 2000
likelihoodSurprise /= 2000
likelihoodFear /= 2000
likelihoodSadness /= 2000
likelihoodLove /= 2000


# Loop over emojis
for i in range(64):
    normalize = likelihoodJoy[i] +  likelihoodAnger[i] + likelihoodSurprise[i] + likelihoodFear[i] + likelihoodSadness[i] + likelihoodLove[i] 
    probDistEmojis[i][0] = likelihoodJoy[i]/normalize
    probDistEmojis[i][1] = likelihoodAnger[i]/normalize
    probDistEmojis[i][2] = likelihoodSurprise[i]/normalize
    probDistEmojis[i][3] = likelihoodFear[i]/normalize
    probDistEmojis[i][4] = likelihoodSadness[i]/normalize
    probDistEmojis[i][5] = likelihoodLove[i]/normalize


    print(str(i) + " " + emotions[np.argmax(probDistEmojis[i])])


# pd.DataFrame(probDistEmojis).to_csv("emojiProbabilityDistribution.csv", header=None, index=None)