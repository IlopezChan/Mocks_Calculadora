FROM node:16.15.1-alpine3.16 AS build

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

#RUN npm cache clean
RUN npm ci --only=production &&  rm -f .npmrc
RUN npm i
FROM node:lts-alpine3.16

# Establecemos zona horaria
RUN apk add -U tzdata
ENV TZ=America/Mexico_City
RUN cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime

RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app

EXPOSE 3000
CMD ["dumb-init", "node", "app"]
