import pandas as pd
import numpy as np
from rpc_client import analyse

alpha = 0.5

distText = np.random.uniform(0,1,64)
distEmoji = np.random.uniform(0,1,64)
distText = distText/sum(distText)
distEmoji = distEmoji/sum(distEmoji)

v = alpha*distText + (1-alpha)*distEmoji


j2c = pd.read_csv('emojiProbabilityDistribution.csv', header=None).to_numpy().transpose()


text = "This workshop changed my life. It was amazing!"
response = analyse(text)

print(j2c.dot(v))
print(sum(j2c.dot(v)))



# alpha the weight from the ensemble

# distEmoji
# distText 

# v = alpha*distText + (1-alpha)*distEmoji

# j2c matrix

# compEmotion = matrix vector product of j2c and v