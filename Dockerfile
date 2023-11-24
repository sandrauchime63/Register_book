FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

CMD {"node", "start"}

EXPOSE 3000