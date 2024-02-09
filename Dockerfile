FROM node:20 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build:prod

EXPOSE 5000

CMD [ "npm", "run", "serve" ]
