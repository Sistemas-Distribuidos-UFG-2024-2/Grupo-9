FROM python:3.10

WORKDIR /usr/app

COPY . .

RUN pip install --no-cache-dir psutil

EXPOSE 9090

ENTRYPOINT ["python3", "main.py"]
