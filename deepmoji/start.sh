docker container rm some-rabbit
docker run -d  --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management &

docker build -t dm .
docker run --net=host -d dm &