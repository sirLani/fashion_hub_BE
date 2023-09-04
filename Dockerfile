FROM node:18.17.1-slim

WORKDIR /usr/src/app

COPY ./src ./src

RUN yarn install --ignore-engines

RUN yarn install

RUN yarn build

EXPOSE 3007

CMD yarn start