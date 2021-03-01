import pandas as pd
import numpy as np
from sklearn.utils import shuffle

data = pd.read_csv("tidyData_PO.csv", header = None)


# Adjust the frequencies !
data.columns = ['text','label']

dataPositive = data[data.label == "positive"][0:1821]
dataNeutral = data[data.label == "neutral"][0:1821]
dataNegative = data[data.label == "negative"][0:1821]


# Concatenate!

tidyData = pd.concat([dataPositive,dataNeutral,dataNegative])


# Shuffle the Tidy Data!

tidyData = shuffle(tidyData)

# Import!
tidyData.to_csv("tidyData_PO_EF.csv", index = False, header = None)


#####################################################



