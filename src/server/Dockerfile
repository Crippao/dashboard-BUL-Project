FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY ./ /app
COPY ./data /data

ENV DATA_FOLDER=/data

EXPOSE 8080

CMD [ "python", "main.py" ]