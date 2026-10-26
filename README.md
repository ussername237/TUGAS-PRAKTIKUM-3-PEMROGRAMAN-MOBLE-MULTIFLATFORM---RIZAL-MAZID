# Diary App (Pertemuan 5 - Navigasi)

**Nama:** Rizal Mazid
**NIM:** 2430511031
**Mata Kuliah:** Pemrograman Mobile Multiplatform
**Universitas:** Universitas Muhammadiyah Sukabumi

Aplikasi diary React Native dan Expo untuk mencatat kegiatan atau cerita sehari-hari. Navigasi menggunakan Expo Router.

## Fitur
- Home dengan daftar dan pencarian catatan
- Menambahkan catatan melalui tab Tambah
- Detail catatan dengan dynamic route dan route parameter
- Like tersinkron antara Home, Favorit, dan Detail
- Daftar catatan Favorit
- Tab Pengaturan dan halaman Tentang Aplikasi
- Tombol kembali ke Home dari Detail
- Shared state dengan React Context

## Teknologi
- React Native
- Expo SDK 58
- Expo Router (Stack dan Bottom Tabs)
- React Context
- JavaScript

## Cara Menjalankan
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npx expo start
   ```
3. Buka dengan Expo Go atau Android Emulator. Tekan `w` untuk menjalankan versi web jika dependensi web tersedia.

## Struktur Navigasi
- `src/app/_layout.js`: Root Stack dan provider shared state
- `src/app/(tabs)/index.js`: Home
- `src/app/(tabs)/create.js`: Tambah catatan
- `src/app/(tabs)/favorites.js`: Catatan Favorit
- `src/app/(tabs)/settings.js`: Pengaturan
- `src/app/detail/[id].js`: Detail dengan parameter `id`
- `src/app/about.js`: Tentang Aplikasi

Catatan dan status suka disimpan di Context selama aplikasi berjalan. Data belum disimpan secara persisten setelah aplikasi ditutup.