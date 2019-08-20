FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache bash

RUN npm install -g pm2

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD [ "pm2-runtime", "start", "dist/src/index.js" ]