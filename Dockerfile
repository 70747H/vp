FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV development

USER node


ARG NODE_PORT=6000
ARG POSTGRES_HOST=postgresql
ARG POSTGRES_PORT=5432
ARG POSTGRES_USERNAME=username
ARG POSTGRES_PASSWORD=password
ARG POSTGRES_DATABASE=postgres

ENV NODE_PORT=$NODE_PORT
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_USERNAME=$POSTGRES_USERNAME
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DATABASE=$POSTGRES_DATABASE

CMD [ "node", "dist/src/main.js" ]