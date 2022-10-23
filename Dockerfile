FROM node:18-alpine
WORKDIR /usr/app
RUN npm install
CMD [ "npm", "start" ]