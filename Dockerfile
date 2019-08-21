

FROM node:latest

RUN npm install -g pm2
COPY ./dist dist
COPY package*.json ./
COPY .env ./

RUN npm i

EXPOSE 80
CMD [ "pm2-runtime", "start", "dist/src/index.js" ]
