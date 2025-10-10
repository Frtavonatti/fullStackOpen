FROM node:22-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

USER node

CMD [ "npm" , "start" ]