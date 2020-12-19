### Dev Env
FROM node:14.15.3-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build

### Prod Env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]