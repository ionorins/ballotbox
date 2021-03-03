import json
from time import sleep

import pika

while True:
    try:
        from ensemble_learner import EnsembleLearner
        analyse = EnsembleLearner().getEmotion

        # set up rmq
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq", heartbeat=0))

        channel = connection.channel()

        channel.queue_declare(queue="emotion_analysis")

        def on_request(ch, method, props, body):
            polarity, moods = analyse(body.decode())

            response = {
                "polarity": polarity[0] - polarity[2],
                "moods": list(moods)
            }

            ch.basic_publish(exchange="",
                             routing_key=props.reply_to,
                             properties=pika.BasicProperties(
                                 correlation_id=props.correlation_id),
                             body=json.dumps(response))
            ch.basic_ack(delivery_tag=method.delivery_tag)

        channel.basic_qos(prefetch_count=1)
        channel.basic_consume(queue="emotion_analysis",
                              on_message_callback=on_request)

        channel.start_consuming()
    except Exception as e:
        print(e)
        sleep(0.5)
