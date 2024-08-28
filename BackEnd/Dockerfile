FROM node:alpine

WORKDIR /App 

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 9000

CMD node index.js
