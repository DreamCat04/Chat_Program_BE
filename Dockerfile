FROM node:16.9.0-bullseye-slim

WORKDIR /app
COPY server.js package.json package-lock.json /app/
RUN npm ci

EXPOSE 5000
ENTRYPOINT ["node", "server.js"]