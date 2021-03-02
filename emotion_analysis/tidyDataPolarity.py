import numpy as np
import pandas as pd

df = pd.read_csv('TwitterSentiment.csv')
df = df.drop(['textID','selected_text'], 1)

print(df.head())

df[0:6615].to_csv("tidyData_PO.csv", header = False, index = False)