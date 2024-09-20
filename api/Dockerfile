FROM python:3.11

ADD https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx /root/.u2net/u2net.onnx

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENV FLASK_ENV production

EXPOSE 5100

CMD ["gunicorn", "-b", ":5100", "app:app"]