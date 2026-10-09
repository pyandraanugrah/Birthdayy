# Kejutan Ulang Tahun Kecil

Situs web ulang tahun interaktif bergaya **scrapbook romantis** untuk seseorang yang spesial.
Dibuat dengan React + Vite, tanpa backend, dan siap untuk di-deploy ke Vercel secara manual.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build Produksi

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`.

## Personalisasi Konten

Semua teks dan aset yang sering disesuaikan berada di **satu file terpusat**:

```
src/data/birthdayContent.js
```

### Yang dapat diubah di file tersebut

| Bagian | Field | Keterangan |
|---|---|---|
| Tanggal ulang tahun | `birthdayConfig.targetDate` | Format `YYYY-MM-DDTHH:mm:ss`, waktu lokal pengunjung |
| Nama penerima | `recipientName` | Digunakan di judul, surat, dan kejutan akhir |
| Pesan pembuka | `revealMessages.countdownHint` dll. | Teks yang tampil di hitung mundur |
| Pengungkapan | `revealMessages.revealTitle` dll. | Judul & subjudul bagian ulang tahun |
| Foto galeri | `photoGallery.photos` | Maksimal 5 foto (path, keterangan, alt) |
| Musik | `musicPlayer.src` & `musicPlayer.label` | Path MP3 dan label tombol |
| Surat cinta | `loveLetter.paragraphs` | Array paragraf; format terjaga |
| Kejutan akhir | `finalSurprise.title` dll. | Ucapan terakhir |

### Mengganti Foto

Letakkan foto di folder berikut (lihat `public/photos/`):

```
public/photos/photo-1.jpg
public/photos/photo-2.jpg
public/photos/photo-3.jpg
public/photos/photo-4.jpg
public/photos/photo-5.jpg
```

Nama file harus sesuai dengan `photoGallery.photos[].src` di `birthdayContent.js`.
Jika foto belum ada, galeri menampilkan placeholder tanpa merusak tata letak.

### Mengganti Musik

Letakkan file MP3 di:

```
public/music/our-song.mp3
```

Nama file harus sesuai dengan `musicPlayer.src` di `birthdayContent.js`.
Jika file belum ada, pemutar menampilkan "Musik belum tersedia" tanpa menghalangi fitur lain.

## Struktur Proyek

```
birthday-scrapbook/
├── public/
│   ├── photos/          ← foto pribadi (photo-1.jpg … photo-5.jpg)
│   └── music/           ← file MP3 (our-song.mp3)
├── src/
│   ├── components/
│   │   ├── Countdown.jsx        ← FR-01 hitung mundur
│   │   ├── BirthdayReveal.jsx   ← FR-02 pengungkapan
│   │   ├── PhotoGallery.jsx     ← FR-03 galeri (max 5 foto)
│   │   ├── PhotoTile.jsx       ← satu ubin Polaroid
│   │   ├── MusicPlayer.jsx     ← FR-04 pemutar MP3
│   │   ├── LoveLetter.jsx      ← FR-05 surat + efek ketik
│   │   ├── Envelope.jsx        ← amplop tertutup
│   │   └── FinalSurprise.jsx  ← FR-06 kejutan akhir
│   ├── data/
│   │   └── birthdayContent.js  ← konfigurasi konten terpusat
│   ├── hooks/
│   │   └── useCountdown.js     ← logika hitung mundur
│   ├── App.jsx                 ← navigasi antar bagian
│   ├── main.jsx                ← entry point
│   └── index.css               ← gaya scrapbook + palet
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── PRD.md
```

## Alur Pengguna

1. **Hitung mundur** — menunggu tanggal tujuan (bisa dilewati).
2. **Pengungkapan ulang tahun** — judul besar + tombol lanjut.
3. **Galeri foto** — maksimal 5 foto bergaya Polaroid.
4. **Surat cinta** — klik amplop → efek pengetikan → tombol "Tampilkan semua".
5. **Kejutan terakhir** — ucapan akhir + konfeti + tombol putar ulang.

Pemutar musik tersedia di pojok kanan bawah sepanjang pengalaman.

## Aksesibilitas

- Semua interaksi utama dapat digunakan via keyboard.
- Indikator fokus yang terlihat (`:focus-visible`).
- `prefers-reduced-motion` dihormati (animasi dan pengetikan dilewati).
- HTML semantik dan `alt` gambar yang bermakna.
- Responsif mulai dari lebar 320 px.

## Deployment ke Vercel

Deployment dilakukan **secara manual oleh pengguna**. Langkah umum:

1. Jalankan `npm run build` untuk menghasilkan folder `dist/`.
2. Upload folder `dist/` ke Vercel (atau hubungkan repositori Git).
3. Atur framework preset ke "Vite" jika menggunakan CLI Vercel.

Agen AI tidak melakukan deployment.

## Teknologi

- React 18 + Vite 6
- `motion` (Motion for React) untuk animasi
- `lucide-react` untuk ikon
- HTML Audio API untuk musik lokal
- CSS murni (tanpa Tailwind)
