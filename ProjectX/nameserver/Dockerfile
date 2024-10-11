FROM alpine:3.19

WORKDIR /usr/app

COPY . .

RUN adduser -S app && \
    chown -R app /usr/app && \
    apk update --no-cache && \
    apk add lua5.3 lua5.3-socket

USER app

EXPOSE 3000

CMD ["/usr/bin/lua5.3", "/usr/app/main.lua"]
