FROM node:22-alpine AS build-front

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm ci

# Testing stage
FROM build-front AS test-front
RUN npm ci --include=dev
CMD [ "npm", "run", "test" ]

# Production build
FROM build-front AS prod-front
RUN npm run build

EXPOSE 4173
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]
