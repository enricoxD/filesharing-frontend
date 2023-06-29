FROM node:16-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# TODO: build and run optimzed production environment
CMD npm run dev
