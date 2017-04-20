FROM zzswang/docker-nginx-react:latest
MAINTAINER zzswang@gmail.com
ENV APP_DIR=/app
COPY ./dist /app
