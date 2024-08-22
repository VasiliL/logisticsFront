FROM node:20 AS builder

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build:dev

COPY . /usr/src/app

CMD npm run start
