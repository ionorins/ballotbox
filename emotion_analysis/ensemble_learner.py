import numpy as np
import pandas as pd

from rpc_client import analyse


class EnsembleLearner:

    # Alpha is the ensemble parameter (How much should you depend on the text?)
    alpha = 0.60
    # j2c is Emoji to Complex Emotion matrix. Going from emoji space to complex emotion is a linear transformation.
    j2c = pd.read_csv('/emotion_analysis/j2c_EF.csv', header=None).to_numpy().transpose()

    j2p = pd.read_csv('/emotion_analysis/j2p_Bayes.csv', header=None).to_numpy().transpose()

    def _sentence_to_distribution(self, text):
        emoji = ['😂', '😒', '😩', '😭', '😍', '😔', '👌', '😊', '❤', '😏', '😁', '🎶', '😳', '💯', '😴',
                 '😌', '☺', '🙌', '💕', '😑', '😅', '🙏', '😕', '😘', '♥', '😐', '💁', '😞', '🙈', '😫', '✌',
                 '😎', '😡', '👍', '😢', '😪', '😋', '😤', '✋', '😷', '👏', '👀', '🔫', '😣', '😈', '😓',
                 '💔', '♡', '🎧', '🙊', '😉', '💀', '😖', '😄', '😜', '😠', '🙅', '💪', '👊', '💜', '💖',
                 '💙', '😬', '✨']

        dist = np.array([text.count(emoji[i]) for i in range(len(emoji))])
        text = text.encode('ascii', 'ignore').decode()

        return text, dist

    def getEmotion(self, sentence):
        text, distEmoji = self._sentence_to_distribution(sentence)

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

        # sentiments = ["positive", "neutral", "negative"]
        # emotions = ["joy","anger","fear","sadness","love"]

        # polarity = sentiments[np.argmax(polarity)]
        # rawEmotion = emotions[np.argmax(complexEmotion)]
        return polarity, complexEmotion


# Some Extravagant Examples!

# el = ensembleLearner()
# distEmoji = np.zeros(64)
# # distEmoji[19] = 1

# print(el.getEmotion(distEmoji, "Don't hug me I'm scared"))
# print(el.getEmotion(distEmoji, "this is just spectacular"))
