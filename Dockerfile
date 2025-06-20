FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG HTTP_SERVER_PORT
ARG DOMAIN_URL
ENV VITE_HttpServerPort=$HTTP_SERVER_PORT
ENV VITE_BackendDomain=$DOMAIN_URL
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
