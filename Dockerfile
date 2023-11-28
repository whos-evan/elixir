# Use Node.js as base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
