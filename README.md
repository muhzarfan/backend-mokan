# 🍰 Backend Website Mokan Kitchen

Repositori ini adalah RESTful API sederhana untuk website Mokan Kitchen. Website ini menyediakan fitur lihat produk dan pengumuman serta CRUD bagi admin untuk mengelola produk dan pengumuman.

## Software yang Digunakan
- **Node.js**  
- **Express.js**  
- **Database** menggunakan PostgreSQL pada Supabase

## Instalasi & Menjalankan Server

1. Clone repositori:
   ```bash
   https://github.com/muhzarfan/backend-mokan.git
   cd backend-mokan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   ```
   atau jika menggunakan nodemon:
   ```bash
   npm run dev
   ```

4. Server akan berjalan di:
   ```
   http://localhost:5000
   ```

---

## Autentikasi
Sebagian besar endpoint membutuhkan **token JWT** yang diperoleh saat login. Token dikirimkan melalui header:

```
Authorization: Bearer <token>
```

---

## Dokumentasi Endpoint API

### 1. Login Admin
**Request**
```http
POST /api/auth/login
```
**Body**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response**
```json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "token": "karakter-acak",
        "admin": {
            "id": 1,
            "username": "johndoe"
        }
    }
}
```

---

### 2. Logout Admin
**Request**
```http
POST /api/auth/logout
```

**Response**
```json
{
    "success": true,
    "message": "Logout berhasil"
}
```

---

### 3. Lihat Pengumuman
**Request**
```http
GET /api/pengumuman
```

**Response**
```json
{
    "success": true,
    "message": "Data pengumuman berhasil diambil",
    "data": [
        {
            "id_peng": 1,
            "judul": "Diskon Akhir Tahun Sebesar 20%",
            "createdAt": "2025-10-10T06:45:29.192+00:00",
            "deskripsi": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "updatedAt": "2025-10-10T07:13:23.954+00:00"
        },
        {
          // data selanjutnya
        }
    ]
}
```

---

### 4. Lihat Pengumuman Berdasarkan ID
**Request**
```http
GET /api/pengumuman/:id
```

**Response**
```json
{
    "success": true,
    "message": "Data pengumuman berhasil diambil",
    "data": [
        {
            "id_peng": 1,
            "judul": "Diskon Akhir Tahun Sebesar 20%",
            "createdAt": "2025-10-10T06:45:29.192+00:00",
            "deskripsi": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
            "updatedAt": "2025-10-10T07:13:23.954+00:00"
        }
    ]
}
```

---

### 5. Buat Pengumuman (Hanya Untuk Admin)
**Request**
```http
POST /api/pengumuman
Authorization: Bearer <token>
```
**Body**
```
{
    "judul":"Produk Baru Kami",
    "deskripsi":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

**Response**
```json
{
    "success": true,
    "message": "Pengumuman berhasil dibuat",
    "data": {
        "id_peng": 1,
        "judul": "Produk Baru Kami",
        "createdAt": "2025-11-13T07:36:08.059+00:00",
        "deskripsi": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "updatedAt": "2025-11-13T07:36:08.059+00:00"
    }
}
```

---

### 6. Edit Pengumuman (Hanya Untuk Admin)
**Request**
```http
PUT /api/pengumuman/:id
Authorization: Bearer <token>
```

**Body**
```
{
    "judul":"Produk Baru Kami",
    "deskripsi":"Kami baru saja memproduksi kue kering Butter Almond."
}
```

**Response**
```json
{
    "success": true,
    "message": "Pengumuman berhasil diupdate",
    "data": {
        "id_peng": 1,
        "judul": "Produk Baru Kami",
        "createdAt": "2025-11-13T07:36:08.059+00:00",
        "deskripsi": "Kami baru saja memproduksi kue kering Butter Almond.",
        "updatedAt": "2025-11-13T07:40:56.921+00:00"
    }
}
```

---

### 7. Hapus Pengumuman (Hanya Untuk Admin)
**Request**
```http
DELETE /api/pengumuman/:id
Authorization: Bearer <token>
```

**Response**
```json
{
    "success": true,
    "message": "Pengumuman berhasil dihapus"
}
```

---

### 8. Lihat Produk
**Request**
```http
GET /api/produk
```

**Response**
```json
{
    "success": true,
    "message": "Data produk berhasil diambil",
    "data": [
        {
            "id_produk": 1,
            "nama": "Marmer Cake",
            "harga": 60000,
            "gambar": "https://link-gambar.com/marmer-cake.jpg",
            "deskripsi": "Kue klasik yang mudah dikenali dari motifnya yang belang-belang atau bergaris-garis, mirip dengan pola pada batu marmer."
        },
        {
          // data selanjutnya
        }
    ]
}
```

---

### 9. Lihat Produk Berdasarkan ID
**Request**
```http
GET /api/produk/:id
```

**Response**
```json
{
    "success": true,
    "message": "Data produk berhasil diambil",
    "data": {
        "id_produk": 1,
        "nama": "Marmer Cake",
        "harga": 60000,
        "gambar": "https://link-gambar.com/marmer-cake.jpg",
        "deskripsi": "Kue klasik yang mudah dikenali dari motifnya yang belang-belang atau bergaris-garis, mirip dengan pola pada batu marmer."
    }
}
```

---

### 10. Buat Produk (Hanya Untuk Admin)
**Request**
```http
POST /api/produk/:id
Authorization: Bearer <token>
```
**Body**
```
{
    "nama":"Nastar",
    "harga":"140000",
    "deskripsi":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "gambar": **//gambar diuplad pada form-data dengan tipe data file**,
}
```

**Response**
```json
{
    "success": true,
    "message": "Produk berhasil dibuat",
    "data": {
        "id_produk": 1,
        "nama": "Nastar",
        "harga": 140000,
        "gambar": "https://link-gambar.com/nastar.jpg", // gambar otomatis disimpan di bucket supabase dan link gambar disimpan pada database
        "deskripsi": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
}
```

---

### 11. Edit Produk (Hanya Untuk Admin)
**Request**
```http
PUT /api/produk/:id
Authorization: Bearer <token>
```

**Body**
```
{
    "nama":"Nastar Keju",
    "harga":"145000",
    "deskripsi":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "gambar": //gambar diuplad pada form-data dengan tipe data file,
}
```

**Response**
```json
{
    "success": true,
    "message": "Produk berhasil diupdate",
    "data": {
        "id_produk": 1,
        "nama": "Nastar Keju",
        "harga": 145000,
        "gambar": "https://link-gambar.com/nastar2.jpg", // gambar otomatis disimpan di bucket supabase dan link gambar disimpan pada database
        "deskripsi": "Nastar adalah kue kering dari adonan tepung terigu, mentega, dan telur yang diisi dengan selai nanas, cokelat, maupun rasa lainnya. Asal katanya dari bahasa Belanda ananas dan taart."
    }
}
```

---

### 12. Hapus Produk (Hanya Untuk Admin)
**Request**
```http
DELETE /api/produk/:id
Authorization: Bearer <token>
```

**Response**
```json
{
    "success": true,
    "message": "Produk berhasil dihapus"
}
```




