FROM node:18.16.0-alpine3.16
RUN apk add --update git
WORKDIR /usr/src/app
# COPY ./packages/client .
COPY . .
RUN yarn
CMD ["yarn","run","dev"]

