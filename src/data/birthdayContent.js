// File konfigurasi konten terpusat (sesuai PRD §11).
// Semua teks, path aset, dan pengaturan yang sering disesuaikan ada di sini
// agar mudah dipersonalisasi.

// Tanggal ulang tahun: 10 Oktober 2026.
// Default menggunakan zona waktu lokal pengunjung (lihat FR-01).
export const birthdayConfig = {
  // ISO string "YYYY-MM-DDTHH:mm:ss" di zona waktu lokal target.
  // Contoh ini menunjuk ke 10 Oktober 2026, pukul 00:00:00 waktu lokal.
  targetDate: '2026-10-10T00:00:00',
  // Catatan: interpretasi dilakukan sebagai waktu lokal pengunjung
  // saat runtime (lihat src/hooks/useCountdown.js).
}

export const recipientName = 'Andhine Zhira!'

export const revealMessages = {
  countdownHint: 'There is something special waiting for you…',
  countdownSub: 'Suatu hal yang istimewa aku buat khusus buat kamu.',
  countdownReady: 'This day is yours!. ✿',
  countdownCta: 'Open Now!',
  countdownSkip: 'Skip Countdown',
  revealTitle: `Selamat Ulang Tahun, ${recipientName} ♡`,
  revealSub:
    'Today, this page is dedicated to you. hope you enjoy the little surprises I made for you. ♡`',
  revealCta: 'Open Your Surprise',
  next: 'Lanjut',
  backToTop: 'Kembali ke atas',
}

export const photoGallery = {
  title: 'Some Moments Of Us',
  
  photos: [
    {
      src: 'photos/photo-1.jpg',
      caption: 'Biruuuu~~',
      alt: 'Foto placeholder 1 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-2.jpg',
      caption: 'Candidd ni yee',
      alt: 'Foto placeholder 2 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-3.jpg',
      caption: 'Thanks for surprise me!',
      alt: 'Foto placeholder 3 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-4.jpg',
      caption: 'Mie goreng akauu yuhuuu',
      alt: 'Foto placeholder 4 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-5.jpg',
      caption: 'Gorgoeus~~',
      alt: 'Foto placeholder 5 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-6.jpg',
      caption: 'Ini apa yaa humm',
      alt: 'Foto placeholder 6 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-7.jpg',
      caption: 'Ldr dulu kitaa, huhu',
      alt: 'Foto placeholder 7 — ganti dengan foto pribadi.',
    },
    {
      src: 'photos/photo-8.jpg',
      caption: 'Tpl Malem-malemm',
      alt: 'Foto placeholder 8 — ganti dengan foto pribadi.',
    },
  ],
}

export const musicPlayer = {
  title: 'Biru - Gabriella Fernaldi',
  label: 'Now Playing ♫',
  src: 'music/our-song.mp3',
}

export const loveLetter = {
  envelopeHint: 'Looks, there is a letter waiting for you!',
  envelopeCta: 'Open It!',
  letterHeading: `Untuk ${recipientName},`,
  // Teks dipisah paragraf agar format tetap terjaga (FR-05).
  paragraphs: [
    'Happy Birthday, Love! ♡',
    'Today is your special day. I hope this new age brings you joy, health, happiness, and may the world always be kind to you. ♡',
    'Thanks for being yourself. May good things always surround you. I hope you can achieve all of your dreams. Im always rooting and praying for you from afar.',
    'Once again, Happy Birthday! i love you, and i always will. ♡',
  ],
  showAllCta: 'Tampilkan semua',
  continueCta: 'Lanjut ke kejutan terakhir',
}

export const finalSurprise = {
  prelude: 'Once Again!',
  title: `Happy Birthday, ${recipientName}`,
  subtitle: 'May the world be kind to you, and may your own thoughts be gentle upon yourself". ♡',
  signoff: 'With Love, pyandraa',
  replay: 'Replay',
}