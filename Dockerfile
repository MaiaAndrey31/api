FROM node:20-alpine

WORKDIR /home/app

COPY . ./

RUN npm i

EXPOSE 3131

CMD ["npm", "run", "dev"]
