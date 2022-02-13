FROM node

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 8080

RUN npm install --save -g nodemon

CMD ["nodemon"]