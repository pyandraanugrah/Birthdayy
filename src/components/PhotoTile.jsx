import { useState } from 'react'
import { motion } from 'motion/react'
import { ImageOff } from 'lucide-react'

/**
 * FR-03 — Satu ubin foto bergaya Polaroid.
 * - Menangani gambar yang gagal dimuat dengan placeholder yang tidak merusak layout.
 * - Mendukung keterangan + alt yang bermakna.
 */
export default function PhotoTile({ photo, index }) {
  const [failed, setFailed] = useState(false)

  // Rotasi kecil bergantian agar terasa seperti scrapbook, tetapi tetap rapi.
  const tilt = index % 2 === 0 ? -1.6 : 1.8

  return (
    <motion.figure
      className="photo-tile"
      style={{ transform: `rotate(${tilt}deg)` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08, ease: 'easeOut' }}
    >
      <div className="photo-tile__frame">
        {failed ? (
          <div className="photo-tile__placeholder" role="img" aria-label={photo.alt}>
            <ImageOff size={30} aria-hidden="true" />
            <span>Foto belum ditambahkan</span>
          </div>
        ) : (
          <img
            className="photo-tile__img"
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="photo-tile__caption">{photo.caption}</figcaption>
    </motion.figure>
  )
}