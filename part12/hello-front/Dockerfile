FROM node:22 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# Second stage
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html