# pull official base image
FROM python:2

# install git
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install git wget -y

# install deepmoji
WORKDIR /
RUN git clone https://github.com/bfelbo/DeepMoji
WORKDIR /DeepMoji
RUN pip2 install -e .
RUN wget https://www.dropbox.com/s/xqarafsl6a8f9ny/deepmoji_weights.hdf5\?dl\=0\# -O model/deepmoji_weights.hdf5
RUN pip2 install tensorflow==1.15.0
RUN pip2 install pika

COPY ./rpc_server.py /server/rpc_server.py

# start rpc server 
ENTRYPOINT python2 /server/rpc_server.py && /bin/bash