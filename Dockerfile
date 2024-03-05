FROM node:20 as builder

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build:prod

COPY . /usr/src/app

CMD npm run serve