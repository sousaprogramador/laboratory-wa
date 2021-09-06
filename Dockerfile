FROM node:12.18.1-alpine as base

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]