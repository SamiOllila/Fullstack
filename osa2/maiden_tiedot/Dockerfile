FROM node:10
WORKDIR /usr/app
COPY . .
RUN npm ci
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build"]