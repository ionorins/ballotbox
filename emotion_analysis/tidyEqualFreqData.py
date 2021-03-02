import pandas as pd
import numpy as np
from sklearn.utils import shuffle

data = pd.read_csv("nlp_datasetfull.txt", sep = ";", header = None)

# Remove Surprise!

data.columns = ["text","label"]
data = data[data.label != "surprise"]

# Adjust the frequencies !

dataJoy = data[data.label == "joy"][0:1640]
dataAnger = data[data.label == "anger"][0:1640]
dataFear = data[data.label == "fear"][0:1640]
dataSadness = data[data.label == "sadness"][0:1640]
dataLove = data[data.label == "love"][0:1640]


# Concatenate!

tidyData = pd.concat([dataJoy,dataAnger,dataFear,dataSadness,dataLove])


# Shuffle the Tidy Data!

tidyData = shuffle(tidyData)

# Import!
tidyData.to_csv("tidyData_CE_EF.csv", index = False, header = None)


#####################################################



