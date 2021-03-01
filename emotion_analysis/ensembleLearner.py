import pandas as pd
import numpy as np
from rpc_client import analyse

class ensembleLearner:

    # Alpha is the ensemble parameter (How much should you depend on the text?)
    alpha = 0.60
    # j2c is Emoji to Complex Emotion matrix. Going from emoji space to complex emotion is a linear transformation. 
    j2c = pd.read_csv('j2c_EF.csv', header=None).to_numpy().transpose()

    
    j2p = pd.read_csv('j2p_Bayes.csv', header=None).to_numpy().transpose()

    def getEmotion(self, distEmoji = np.zeros(64), text = ""):
        if text != "" and np.count_nonzero(distEmoji) != 0:
            distText = np.array(analyse(text))
            emojiVector = self.alpha*distText + (1-self.alpha)*distEmoji

        elif text != "" and np.count_nonzero(distEmoji) == 0:
            distText = np.array(analyse(text))
            emojiVector = distText

        elif text == "" and np.count_nonzero(distEmoji) != 0:
            emojiVector = distEmoji

        else:
            emojiVector = distEmoji

        complexEmotion = self.j2c.dot(emojiVector)
        polarity = self.j2p.dot(emojiVector)
        
        sentiments = ["positive", "neutral", "negative"]
        emotions = ["joy","anger","fear","sadness","love"]

        polarity = sentiments[np.argmax(polarity)]
        rawEmotion = emotions[np.argmax(complexEmotion)]
        return [polarity, rawEmotion]


# Some Extravagant Examples!

# el = ensembleLearner()
# distEmoji = np.zeros(64)
# # distEmoji[19] = 1

# print(el.getEmotion(distEmoji, "Don't hug me I'm scared"))
# print(el.getEmotion(distEmoji, "this is just spectacular"))    
