# Build Stage -> Packaging up the React Project to be Served by Nginx
FROM node:alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# Serve Stage -> Serving the built React content
FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]