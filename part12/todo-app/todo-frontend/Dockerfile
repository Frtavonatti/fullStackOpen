FROM node:22

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm ci

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0" ]