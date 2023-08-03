ARG NODE_VERSION=19-alpine3.16
FROM node:${NODE_VERSION} AS node
FROM node AS builder

RUN apk add git \
  make \
  gcc \
  musl-dev \
  linux-headers \
  ca-certificates \
  bash \
  curl \
  jq \
  && update-ca-certificates


# copy dependencies
COPY ./package.json ./

RUN npm install --frozen-lockfile


COPY ./ ./

RUN npm run build

CMD ["node", "build/main.js"]
