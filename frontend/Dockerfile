FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
