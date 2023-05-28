FROM node:18.16.0-alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN yarn
# RUN yarn run build
# CMD [ "yarn", "run", "start:prod" ]
CMD [ "yarn", "run", "start:dev" ]
