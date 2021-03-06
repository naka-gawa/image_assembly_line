ARG NODE_VERSION

FROM node:$NODE_VERSION-slim AS base
RUN apt update \
    && apt install icu-devtools git sudo curl ca-certificates build-essential unzip openssh-client -y --no-install-recommends
WORKDIR /app
COPY . .

FROM base AS dev
RUN npm install
