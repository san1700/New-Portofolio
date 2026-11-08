# Panduan Setup Sanity.io CMS untuk SANMHMD Portfolio

Sistem CMS Sanity.io telah berhasil dipasang dan diintegrasikan ke website Nuxt 3 Anda.

---

### Langkah Mudah Menghubungkan CMS (Hanya 3 Menit):

#### 1. Buat Akun & Projek Gratis di Sanity
1. Buka [https://www.sanity.io](https://www.sanity.io) lalu klik **Get Started / Sign In** (Bisa login pakai akun Google atau GitHub Anda).
2. Buat projek baru, beri nama misalnya: `sanmhmd-portfolio`.
3. Pilih dataset: `production`.
4. Setelah projek terbuat, masuk ke dashboard [sanity.io/manage](https://www.sanity.io/manage). Di sana Anda akan melihat **Project ID** (kombinasi 8 huruf/angka unik, contoh: `a1b2c3d4`).

#### 2. Pasang Project ID ke Website Anda
Buat atau buka file `.env` di folder utama projek ini:
```env
NUXT_SANITY_PROJECT_ID=a1b2c3d4
NUXT_SANITY_DATASET=production
```
*(Ganti `a1b2c3d4` dengan Project ID asli Anda).*

#### 3. Tambahkan di Vercel (Agar Live di Web)
1. Buka dashboard Vercel projek Anda di [vercel.com](https://vercel.com).
2. Masuk ke **Settings** > **Environment Variables**.
3. Tambahkan:
   - Key: `NUXT_SANITY_PROJECT_ID`, Value: *(Project ID Anda)*
   - Key: `NUXT_SANITY_DATASET`, Value: `production`
4. Di Sanity Dashboard (**Settings** > **API** > **CORS Origins**), tambahkan URL website Anda:
   - `https://sanmhmd.vercel.app` (Centang: *Allow credentials*).
   - `http://localhost:3000` (untuk pengujian di komputer lokal).

---

### Cara Mengisi / Mengelola Projek di Sanity:
Anda bisa membuka Sanity Studio langsung dari browser via Sanity Cloud atau menjalankan lokal:
```bash
npx sanity dev
```
Di dashboard studio visual, Anda dapat:
- Menambah projek video/desain baru.
- Memilih kategori (*Video Editing*, *Videography*, *UI/UX Design*, dll).
- Upload cover gambar dengan fitur **Hotspot Cropping** (fokus gambar tidak akan terpotong aneh di HP).
- Memasukkan ID YouTube atau video link.
- Mengatur urutan prioritas tampil.

*Catatan: Jika Sanity belum di-setting atau internet terputus, website secara otomatis menggunakan data cadangan lokal sehingga website tidak akan pernah rusak/kosong.*

