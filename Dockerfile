FROM node:alpine
ENV CI=true
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]