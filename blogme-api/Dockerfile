FROM node:10.19.0-alpine
WORKDIR /app
ENV NODE_ENV=development
COPY . .
RUN npm ci 
RUN npm run tsc
ENTRYPOINT [ "npm","run","start:production" ]
