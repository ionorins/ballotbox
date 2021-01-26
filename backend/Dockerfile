FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./requirements.txt /requirements.txt
WORKDIR /

RUN pip install -r requirements.txt

ENV DEBUG_MODE True
ENV DB_URL "mongodb://root:example@mongo:27017/admin?retryWrites=true&w=majority"
ENV DB_NAME "farmstack"