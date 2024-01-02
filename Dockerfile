# Compile and Build Angular Application
FROM node:16-alpine AS build
ARG CONFIG
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@latest
RUN ng build --project=CinemarkAngular --configuration $CONFIG

# Serve Application using Nginx Server
FROM nginx:1.23.1-alpine
COPY --from=build /app/dist/cinemark-angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
