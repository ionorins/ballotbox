# pull official base image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# install requirements
COPY ./requirements.txt /requirements.txt
WORKDIR /
RUN pip install -r requirements.txt

# export relevant environment variables
ENV DEBUG_MODE True
ENV DB_URL "mongodb://root:example@mongo:27017/admin?retryWrites=true&w=majority"
ENV DB_NAME "farmstack"