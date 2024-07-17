FROM node:20.11.1-alpine

WORKDIR /user/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]