FROM node:22-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.27.5-alpine-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/browser/ /usr/share/nginx/html/
EXPOSE 80
