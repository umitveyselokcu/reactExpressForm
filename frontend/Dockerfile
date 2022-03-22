ARG REACT_APP_BFF_URL=https://merlin-dev.sodexoavantaj.com/bff/

FROM node:14.16.0-alpine AS BUILD_IMAGE

RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

COPY . .
RUN npm i
CMD ["npm","run", "start"]