import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown.js'
import { revealMessages } from '../data/birthdayContent.js'

/**
 * FR-01 — Pembuka Hitung Mundur.
 * - Menampilkan hari, jam, menit, detik secara real-time.
 * - Tidak pernah bernilai negatif (hook).
 * - Sediakan tombol untuk melanjutkan meski tanggal belum tiba.
 */
export default function Countdown({ targetISO, onContinue }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetISO)

  const cells = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ]

  return (
    <section className="scene" aria-labelledby="countdown-title">
      <motion.div
        className="scene scene--paper"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="scene__inner">
          <span className="eyebrow">♡ A little surprise, for u ♡</span>
          <h1 id="countdown-title" className="section-title">
            {isPast ? revealMessages.countdownReady : revealMessages.countdownHint}
          </h1>
          <p className="section-subtitle">
            {isPast ? revealMessages.countdownReady : revealMessages.countdownSub}
          </p>

          {!isPast && (
            <div
              className="countdown-grid"
              role="timer"
              aria-live="polite"
              aria-label="Hitung mundur menuju tanggal tujuan"
            >
              {cells.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="countdown-cell"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <span className="countdown-cell__num">
                    {String(c.value).padStart(2, '0')}
                  </span>
                  <span className="countdown-cell__label">{c.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          <div className="btn-row">
            <button className="btn" onClick={onContinue} type="button">
              <Heart size={18} aria-hidden="true" />
              {isPast ? revealMessages.countdownCta : revealMessages.countdownSkip}
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .countdown-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.6rem;
          max-width: 520px;
          margin: 1.5rem auto 0.5rem;
        }
        .countdown-cell {
          background: var(--c-paper);
          border: 1px dashed rgba(73, 55, 53, 0.18);
          border-radius: 12px;
          padding: 0.9rem 0.5rem 0.7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .countdown-cell__num {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 600;
          color: var(--c-brown);
          font-variant-numeric: tabular-nums;
        }
        .countdown-cell__label {
          font-size: 0.8rem;
          color: var(--c-brown-muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
        @media (max-width: 380px) {
          .countdown-grid { gap: 0.4rem; }
          .countdown-cell { padding: 0.7rem 0.3rem 0.5rem; }
        }
      `}</style>
    </section>
  )
}