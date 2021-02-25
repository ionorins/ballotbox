import pandas as pd
import numpy as np
from rpc_client import analyse

class ensembleLearner:

    # Alpha is the ensemble parameter
    alpha = 0.5
    # j2c is Emoji to Complex Emotion matrix. Going from emoji space to complex emotion is a linear transformation. 
    j2c = pd.read_csv('j2c_EF.csv', header=None).to_numpy().transpose()

    # To be added when the j2p dataset is available.
    # j2p = pd.read_csv('j2p.csv', header=None).to_numpy().transpose()

    def getComplexEmotion(self, distEmoji = np.zeros(64), text = ""):
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
        return(complexEmotion)


# Some Extravagant Examples!

el = ensembleLearner()
distEmoji = np.zeros(64)
# distEmoji[14] = 1
print(el.getComplexEmotion(distEmoji, ""))
# print(el.getComplexEmotion(distEmoji, "this is just spectacular"))    
