import pika
import json
from time import sleep
from deepmoji.sentence_tokenizer import SentenceTokenizer
from deepmoji.model_def import deepmoji_emojis
from deepmoji.global_variables import PRETRAINED_PATH, VOCAB_PATH

# set up rmq
while True:
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='rabbitmq'))
        break
    except:
        sleep(0.5)

channel = connection.channel()

channel.queue_declare(queue='deepmoji')

# set up deep moji
maxlen = 30
batch_size = 32

with open(VOCAB_PATH, 'r') as f:
    vocabulary = json.load(f)
st = SentenceTokenizer(vocabulary, maxlen)

model = deepmoji_emojis(maxlen, PRETRAINED_PATH)
model.summary()

def analyse(sentence):
    sentence = unicode(sentence)
    print("analysed sentence: ", sentence)
    tokenized, _, _ = st.tokenize_sentences([sentence])
    prob = model.predict(tokenized)
    return list(prob[0])
    
def on_request(ch, method, props, body):
    response = analyse(body)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='deepmoji', on_message_callback=on_request)

channel.start_consuming()