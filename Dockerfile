FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./src ./src

COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

### set env variable - can also be provided from docker compose

RUN npm install

RUN npm run build

EXPOSE 3007

CMD npm start