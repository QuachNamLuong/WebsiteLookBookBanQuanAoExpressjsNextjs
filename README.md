# 🚀 Fullstack App — Express.js + Next.js + MySQL + MinIO + Docker

Dự án bao gồm:
- **Backend:** Express.js (TypeScript + tsx)
- **Frontend:** Next.js
- **Database:** MySQL + phpMyAdmin
- **Storage:** MinIO (S3-compatible)
- **Container:** Docker Compose hỗ trợ toàn bộ môi trường

---

## 📂 Cấu trúc thư mục
```
.
├── backend/ # API (Express.js + TypeScript)
│ ├── src/
│ │ └── server.ts
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/ # Next.js web app
│ ├── src/
│ └── package.json
│
└── docker/ # Docker setup (docker-compose.yml)
└── docker-compose.yml
```
---

# 🧩 1️⃣ Chạy không dùng Docker

### 🔧 Cài đặt backend
```bash
cd backend
npm install
```
Chạy dev (hot reload):
```
npm run dev
```
Build và chạy production:
```
npm run build
npm start
```
🔹 Mặc định backend chạy ở http://localhost:8080

🌐 Cài đặt frontend
```
cd frontend
npm install
```
Chạy dev:
```
npm run dev
```
🔹 Frontend chạy ở http://localhost:3000

🐳 2️⃣ Chạy bằng Docker Compose
📦 Bước 1: Di chuyển đến thư mục Docker
```
cd docker
```
🚀 Bước 2: Build và khởi động toàn bộ service
```
docker compose up --build
```
