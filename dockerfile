# Gunakan image node
FROM node:18-alpine

# Buat direktori kerja
WORKDIR /app

# Salin file dan install dependency
COPY package*.json ./
RUN npm install

# Salin semua source code
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Jalankan server produksi
EXPOSE 3000
CMD ["npm", "start"]