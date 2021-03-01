# pull official base image
FROM python:3

# install dependencies
RUN pip install pika numpy pandas

# copy relevant files
# COPY ./rpc_server.py /rpc_server.py
# COPY ./rpc_client.py /rpc_client.py
# COPY ./ensemble_learner.py /ensemble_learner.py
# COPY ./j2p_Bayes.csv /j2p_Bayes.csv
# COPY ./j2c_EF.csv /j2c_EF.csv

# start rpc server 
ENTRYPOINT python3 /emotion_analysis/rpc_server.py && /bin/bash