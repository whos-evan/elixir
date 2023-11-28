FROM node:current-slim

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npm ci --only=production --omit=dev

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
