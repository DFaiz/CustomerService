FROM node:argon
MAINTAINER David Faizulaev maysam815@gmail.com

RUN "apt-get update && apt-get clean"
RUN npm install -g winston
RUN npm install -g body-parser
RUN npm install -g mongoose
RUN npm install -g bluebird
RUN npm install -g express
RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 9000