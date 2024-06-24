FROM node:20-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./ .
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]