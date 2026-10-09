import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { finalSurprise } from '../data/birthdayContent.js'

const CONFETTI_COUNT = 40 // tidak berlebihan (FR-06)
const COLORS = ['#c76d82', '#dda3a8', '#f7eee4', '#fff9f2', '#b85d72']

/**
 * FR-06 — Kejutan Terakhir.
 * - Ucapan akhir, konfeti sederhana (sekali saat mount).
 * - Tombol putar ulang kembali ke pembuka.
 * - Tidak membuat timer/audio ganda saat replay.
 */
export default function FinalSurprise({ onReplay }) {
  const [confetti, setConfetti] = useState([])
  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    // Konfeti dijalankan saat pertama kali masuk (atau replay me-remount komponen).
    if (reduceMotion) return
    const pieces = []
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // vw position
        delay: Math.random() * 0.5,
        duration: 1.4 + Math.random() * 1.0,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })
    }
    setConfetti(pieces)
  }, [reduceMotion])

  return (
    <section className="scene scene--final" aria-labelledby="final-title">
      {/* Lapisan konfeti — posisi absolute, tidak mengganggu konten */}
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.x}vw`,
              background: p.color,
              top: '-20px',
            }}
            initial={{ y: 0, opacity: 1, rotate: p.rotate }}
            animate={{ y: '100vh', opacity: [1, 1, 0], rotate: p.rotate + 180 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeIn',
              repeat: 0,
            }}
          />
        ))}
      </div>

      <motion.div
        className="scene__inner scene--paper final-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="tape" aria-hidden="true" />
        <span className="tape tape--right" aria-hidden="true" />

        <p className="eyebrow">{finalSurprise.prelude}</p>
        <h1 id="final-title" className="section-title final-card__title">
          {finalSurprise.title}
        </h1>
        <p className="section-subtitle">{finalSurprise.subtitle}</p>

        <p className="final-card__signoff">
          {finalSurprise.signoff}{' '}
          <span className="final-card__heart">♡</span>
        </p>

        <div className="btn-row">
          <button className="btn btn--ghost" onClick={onReplay} type="button">
            <RotateCcw size={16} aria-hidden="true" />
            {finalSurprise.replay}
          </button>
        </div>
      </motion.div>

      <style>{`
        .scene--final {
          position: relative;
          overflow: hidden;
        }
        .confetti-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .final-card {
          position: relative;
          z-index: 2;
          max-width: 720px;
        }
        .final-card__title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
        }
        .final-card__signoff {
          font-family: var(--font-hand);
          font-size: 1.4rem;
          color: var(--c-brown-muted);
          margin: 0.5rem 0 0;
        }
        .final-card__heart {
          color: var(--c-rose);
        }
      `}</style>
    </section>
  )
}