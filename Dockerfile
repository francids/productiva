# Etapa de construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

# Etapa de producción
FROM nginx:1.27.4-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/productiva-mente/* /usr/share/nginx/html/
EXPOSE 80
