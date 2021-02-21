import pandas as pd
import numpy as np
from sklearn.utils import shuffle

data = pd.read_csv("nlp_datasetfull.txt", sep = ";", header = None)

# Remove Surprise!

data.columns = ["text","label"]
data = data[data.label != "surprise"]

# Adjust the frequencies !

# [JOY ANGER FEAR SADNESS LOVE] 
# [0.35 0.10 0.05 0.20 0.30]
# [1914 547 274 1094 1641]

dataJoy = data[data.label == "joy"][0:1914]
dataAnger = data[data.label == "anger"][0:547]
dataFear = data[data.label == "fear"][0:274]
dataSadness = data[data.label == "sadness"][0:1094]
dataLove = data[data.label == "love"][0:1641]



# Split into Train Test and Validation sets!



dataJoyTrain = dataJoy[0:1340]
dataJoyVal = dataJoy[1340:1340+287]
dataJoyTest = dataJoy[1340+287:1340+2*287]

dataAngerTrain = dataAnger[0:383]
dataAngerVal =  dataAnger[383:383+82]
dataAngerTest = dataAnger[383+82:383+2*82]

dataFearTrain = dataFear[0:192]
dataFearVal = dataFear[192:192+41]
dataFearTest = dataFear[192+41:192+2*41]

dataSadnessTrain = dataSadness[0:766]
dataSadnessVal = dataSadness[766:766+164]
dataSadnessTest = dataSadness[766+164:766+2*164]

dataLoveTrain = dataLove[0:1149]
dataLoveVal = dataLove[1149:1149+246]
dataLoveTest = dataLove[1149:1149+2*246]

tidyDataTrain = pd.concat([dataJoyTrain,dataAngerTrain,dataFearTrain,dataSadnessTrain,dataLoveTrain])
tidyDataVal = pd.concat([dataJoyVal,dataAngerVal,dataFearVal, dataSadnessVal, dataLoveVal])
tidyDataTest = pd.concat([dataJoyTest,dataAngerTest,dataFearTest,dataSadnessTest,dataLoveTest])

# Shuffle the Tidy Data!

tidyDataTrain = shuffle(tidyDataTrain)
tidyDataVal = shuffle(tidyDataVal)
tidyDataTest = shuffle(tidyDataTest)


# Import data to csv!
tidyDataTrain.to_csv("tidyTrain.csv", index=False, header = None)
tidyDataVal.to_csv("tidyVal.csv", index=False, header = None)
tidyDataTest.to_csv("tidyTest.csv", index=False, header = None)



#####################################################



