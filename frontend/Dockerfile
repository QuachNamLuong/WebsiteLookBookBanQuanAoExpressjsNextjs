FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Chạy ở chế độ dev
CMD ["npm", "run", "dev"]