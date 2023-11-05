FROM node:16.9.0-bullseye-slim

WORKDIR /app
COPY . /app
RUN npm ci

EXPOSE 5000
ENTRYPOINT ["node", "server.js"]