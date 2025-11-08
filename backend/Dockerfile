FROM node:22

# Tạo thư mục làm việc
WORKDIR /app

# Copy file cấu hình để cài dependencies
COPY package*.json ./

# Cài tsx để chạy TypeScript trực tiếp mà không cần build
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở port cho API
EXPOSE 8080

# Lệnh chạy dev server
CMD ["npm", "run", "dev"]