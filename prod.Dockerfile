# syntax=docker/dockerfile:1

# --------------> The build image

FROM node:latest AS build

LABEL maintainer="Abhishek Jadhav <www.abhishek3jadhav@gmail.com>"
RUN apt-get update && apt-get install

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install
RUN npm run build

# --------------> The production image
FROM node:18.17.0-bullseye-slim AS final

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/build ./

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

EXPOSE 4000

CMD ["node", "index.js"]