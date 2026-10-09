import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import PhotoTile from './PhotoTile.jsx'
import { photoGallery, revealMessages } from '../data/birthdayContent.js'

const MAX_PHOTOS = 8

/**
 * FR-03 — Galeri Foto.
 * - Menampilkan maksimal 8 foto (dipaksa lewat slice).
 * - Tata letak Polaroid/scrapbook responsif.
 * - Bukan linimasa hubungan (hanya galeri).
 */
export default function PhotoGallery({ onContinue }) {
  const photos = photoGallery.photos.slice(0, MAX_PHOTOS)

  return (
    <section className="scene" aria-labelledby="gallery-title">
      <div className="scene__inner">
        <span className="eyebrow">✿ Galeri Kecil ✿</span>
        <h2 id="gallery-title" className="section-title">
          {photoGallery.title}
        </h2>
        <p className="section-subtitle">{photoGallery.subtitle}</p>

        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <PhotoTile key={photo.src + i} photo={photo} index={i} />
          ))}
        </div>

        <div className="btn-row">
          <motion.button
            className="btn"
            onClick={onContinue}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {revealMessages.next}
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: clamp(1rem, 3vw, 1.75rem);
          max-width: 900px;
          margin: 0 auto 0.5rem;
          padding: 0.5rem 0;
        }
        .photo-tile {
          margin: 0;
          background: var(--c-paper);
          border: 1px solid rgba(73, 55, 53, 0.08);
          border-radius: var(--radius-photo);
          padding: 0.75rem 0.75rem 0.35rem;
          box-shadow: var(--shadow-soft);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .photo-tile:hover {
          transform: rotate(0deg) translateY(-4px) !important;
          box-shadow: 0 14px 32px rgba(73, 55, 53, 0.2);
        }
        .photo-tile__frame {
          aspect-ratio: 1 / 1;
          width: 100%;
          overflow: hidden;
          border-radius: 3px;
          background: repeating-linear-gradient(
            45deg,
            #f2e6da,
            #f2e6da 10px,
            #ecdccd 10px,
            #ecdccd 20px
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photo-tile__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .photo-tile__placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          color: var(--c-brown-muted);
          font-size: 0.85rem;
          text-align: center;
          padding: 1rem;
        }
        .photo-tile__caption {
          font-family: var(--font-hand);
          font-size: 1.15rem;
          color: var(--c-rose);
          text-align: center;
          padding: 0.6rem 0.25rem 0.5rem;
        }
        @media (max-width: 380px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
          .photo-tile { padding: 0.5rem 0.5rem 0.2rem; }
          .photo-tile__caption { font-size: 1rem; }
        }
      `}</style>
    </section>
  )
}