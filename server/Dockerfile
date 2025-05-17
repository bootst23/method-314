FROM node:24-alpine AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs24-debian12
COPY --from=build-env /app /app
WORKDIR /app
CMD ["server.js"]