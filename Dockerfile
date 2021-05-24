FROM golang

WORKDIR /app

ADD /static/css/main.css /app/static/css/
ADD /static/js/main.js /app/static/js/
ADD go.mod /app
ADD main.go /app
ADD home.html /app

ENTRYPOINT go run .

EXPOSE 8080