import pandas as pd
import numpy as np
from rpc_client import analyse

alpha = 0.5

distEmoji = np.zeros(64)
distEmoji[4] = 1
distEmoji[8] = 1
distEmoji = distEmoji/sum(distEmoji)

text = "This workshop changed my life. It was amazing!"
distText = np.array(analyse(text))

# print(distText)
# print(distEmoji)


v = alpha*distText + (1-alpha)*distEmoji


j2c = pd.read_csv('emojiProbabilityDistribution.csv', header=None).to_numpy().transpose()


print(j2c.dot(v))





# alpha the weight from the ensemble

# distEmoji
# distText 

# v = alpha*distText + (1-alpha)*distEmoji

# j2c matrix

# compEmotion = matrix vector product of j2c and v