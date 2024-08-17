FROM alpine:latest

COPY . /app

WORKDIR /app

RUN apk add npm
RUN npm install tsx
RUN npm install vite

RUN npm run build
CMD [ "npm", "run", "preview" ]