FROM nginx:latest

COPY localhost.crt /etc/ssl/cert/localhost.crt
COPY localhost.key /etc/ssl/cert/localhost.key

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
