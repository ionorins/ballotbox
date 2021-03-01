import numpy as np
import pandas as pd
from ensembleLearner import ensembleLearner

def sentence_to_distribution(text):
  emoji = ['😂','😒','😩','😭','😍','😔','👌','😊','❤','😏','😁','🎶','😳','💯','😴',
         '😌','☺','🙌','💕','😑','😅','🙏','😕','😘','♥','😐','💁','😞','🙈','😫','✌'
         ,'😎','😡','👍','😢','😪','😋','😤','✋','😷','👏','👀','🔫','😣','😈','😓',
         '💔','♡','🎧','🙊','😉','💀','😖','😄','😜','😠','🙅','💪','👊','💜','💖',
         '💙','😬','✨']

  dist = np.array([text.count(emoji[i]) for i in range(len(emoji))])
  if sum(dist) != 0:
    dist = dist/sum(dist)
  text = text.encode('ascii', 'ignore').decode()

  return text, dist


data = pd.read_csv("testData.csv").to_numpy()


polarityError = 0
emotionError = 0
el = ensembleLearner()

# Just run this and change alpha in ensembleLearner. The cost is smooth so do binary search.
for i in range(data.shape[0]):
    # print(data[i][0])
    textAndEmojiDist = sentence_to_distribution(data[i][0])
    text = textAndEmojiDist[0]
    distEmoji = textAndEmojiDist[1]
    stats = el.getEmotion(distEmoji,text)
    # print(stats)  
    if stats[0] != data[i][2]:
      polarityError += 1
      print((i+2),stats[0],data[i][2])
    if stats[1] != data[i][1]:
      emotionError +=1
      print((i+2),stats[1],data[i][1])

polarityError = polarityError/data.shape[0]
emotionError = emotionError/data.shape[0]
print("POLARITY ERROR:",polarityError)
print("RAW EMOTION ERROR:", emotionError)

