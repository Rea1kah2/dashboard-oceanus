# Requirements: Dashboard Oceanus

## 1. Glosarium
- **Kreator**: Musisi, komposer, produser, atau penulis lirik di ekosistem Oceanus.
- **Karya Notable**: Karya yang memperoleh pengakuan / sitasi / dampak signifikan.
- **Bucket Karya**: Klasifikasi kuantitas karya kreator (`0`, `1`, `2-3`, `4-9`, `10+`).
- **Pengaruh Diterima**: Total metrik kreator lain yang mengadopsi atau merujuk gaya kreator ini.
- **Karya Dirujuk**: Jumlah spesifik karya yang dijadikan referensi musik lain.
- **Peran**: Kategori kontribusi: Performer, Komposer, Penulis Lirik, Produser.

## 2. User Stories
- Sebagai **Presenter BI**, saya ingin melihat ringkasan metrik utama (total kreator, genre teratas, era puncak, kreator elit) dalam sekejap agar audiens langsung memahami skala data.
- Sebagai **Presenter BI**, saya ingin mengklik bar pada chart genre untuk menyaring seluruh dashboard agar audiens dapat melihat analisis mendalam per genre tanpa repot mengetik.
- Sebagai **Audience/Dosen**, saya ingin mencari kreator berdasarkan nama atau nama panggung secara instan agar dapat memverifikasi profil kreator tertentu.
- Sebagai **Audience/Dosen**, saya ingin mengklik nama kreator untuk melihat popup detail (distribusi peran, tahun aktif, total pengaruh) tanpa meninggalkan halaman utama.
- Sebagai **Pengguna Mobile**, saya ingin mengakses dashboard dari smartphone dengan layout yang rapi tanpa ada elemen terpotong.

## 3. Kriteria Penerimaan berbasis EARS

### Ubiquitous Requirements
- THE Sistem SHALL menampilkan KPI global (total 11.361 kreator, genre #1 Dream Pop, era puncak 2020-an, kreator elit 65 orang) saat halaman pertama kali dimuat.
- THE Sistem SHALL menyediakan tema visual "Laut & Suara" berbasis palet biru gelap samudra dan tipografi DM Serif Display.

### Event-Driven Requirements
- WHEN pengguna mengklik salah satu bar pada chart distribusi genre, THE Sistem SHALL menyaring tabel data dan indikator filter hanya untuk genre tersebut.
- WHEN pengguna mengetikkan kata kunci pada search bar dengan jeda > 300ms, THE Sistem SHALL memicu kueri pencarian nama/nama panggung kreator.
- WHEN pengguna memilih baris kreator pada tabel atau leaderboard, THE Sistem SHALL menampilkan modal detail profil lengkap kreator.
- WHEN pengguna menekan tombol "Esc" atau mengklik overlay modal, THE Sistem SHALL menutup modal detail seketika.
- WHEN pengguna mengklik tombol reset filter, THE Sistem SHALL mengembalikan seluruh visualisasi ke kondisi awal tanpa filter.

### State-Driven Requirements
- WHILE viewport layar berada di bawah 640px (mobile), THE Sistem SHALL menampilkan tabel sebagai daftar kartu (card list) vertikal dengan sentuhan interaktif minimal 44x44px.
- WHILE data sedang di-fetch dari API, THE Sistem SHALL menampilkan skeleton loader atau spinner yang tidak menyebabkan layout shift.

### Unwanted Behavior / Edge Cases
- IF kueri pencarian atau kombinasi filter menghasilkan 0 data, THEN THE Sistem SHALL menampilkan state visual "Tidak ada kreator yang cocok" beserta tombol untuk mereset filter.
- IF database SQLite belum diinisialisasi atau koneksi gagal, THEN THE Sistem SHALL mengembalikan error JSON terstruktur dengan pesan diagnostik yang jelas.
