# Product Steering: Dashboard Oceanus

## Visi Produk
Dashboard analitik web komprehensif untuk mengeksplorasi, menganalisis, dan mempresentasikan karakteristik ekosistem 11.361 kreator musik di dunia fiksi *Oceanus* berbasis dataset historis 1975–2040.

## Target Pengguna & Personas
1. **Dosen Evaluator (Primary Evaluator)**: Membutuhkan ringkasan analitik Business Intelligence yang tajam, akurat, mudah dipahami dalam 1-2 menit presentasi, dengan visualisasi data yang relevan dan non-generic.
2. **Mahasiswa / Presenter BI (Presenter)**: Membutuhkan kemudahan navigasi interaktif, filter instan, pencarian cepat, drill-down metrik (modal popup), dan leaderboard kreator elit untuk bahan storytelling data.

## KPI Keberhasilan
- **Integritas Data 100%**: 11.361 baris data kreator terindeks lengkap tanpa data loss.
- **Performa Instan**: Respon filter, pencarian, dan render chart < 300ms berkat indeks database SQLite lokal.
- **Responsivitas Adaptif**: Layout nyaman digunakan baik di layar desktop (1280px+), tablet (768px), maupun layar ponsel (375px) dengan adaptasi komponen khusus (tabel beralih ke card list, modal beralih ke bottom sheet).
- **Estetika Tematik "Laut & Suara"**: Desain visual unik (*out-of-distribution craft*) dengan palet samudra gelap (*deep ocean navy*), aksen bioluminescent cyan, tipografi editorial DM Serif Display dan clean Inter, bebas elemen AI slop.

## Non-Goals
- Autentikasi multi-user / login system (fokus murni analitik data).
- Modifikasi data (CRUD write data kreator tidak diperlukan karena ini dataset historis analisis).
- Multi-tenancy / cloud database latency (gunakan local embedded SQLite).
