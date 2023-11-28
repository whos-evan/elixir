FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

RUN yarn build

CMD [ "yarn", "start" ]

