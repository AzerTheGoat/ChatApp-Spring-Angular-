FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY dist/client/ /usr/share/nginx/html/

EXPOSE 80
