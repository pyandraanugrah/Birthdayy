import { motion } from 'motion/react'
import { Mail, Heart } from 'lucide-react'

/**
 * FR-05 — Amplop tertutup yang bisa dibuka.
 * - Bisa diklik/tap maupun diakses via keyboard (pakai <button>).
 * - Animasi pembukaan (flap & naiknya surat).
 * - Petunjuk "Ada surat kecil untukmu".
 */
export default function Envelope({ hint, cta, onOpen }) {
  return (
    <div className="envelope-wrap">
      <motion.button
        type="button"
        className="envelope"
        onClick={onOpen}
        aria-label={`${cta}. ${hint}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        <span className="envelope__flap" aria-hidden="true" />
        <span className="envelope__body" aria-hidden="true">
          <Heart className="envelope__heart" size={30} aria-hidden="true" />
        </span>
        <span className="envelope__label" aria-hidden="true">
          <Mail size={16} /> {cta}
        </span>
      </motion.button>

      <p className="envelope-hint">{hint}</p>

      <style>{`
        .envelope-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 0;
        }
        .envelope {
          position: relative;
          width: min(320px, 78vw);
          aspect-ratio: 3 / 2;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          perspective: 900px;
        }
        .envelope__body {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #fdf3ea 0%, #f3e2d3 100%);
          border: 1px solid rgba(73, 55, 53, 0.14);
          border-radius: 10px;
          box-shadow: var(--shadow-soft);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .envelope__heart {
          color: var(--c-rose);
        }
        .envelope__flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 62%;
          background: linear-gradient(180deg, #f7e7d9 0%, #eed8c4 100%);
          border: 1px solid rgba(73, 55, 53, 0.14);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          transform-origin: top center;
          transform: rotateX(0deg);
          transition: transform 0.6s ease;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          z-index: 2;
        }
        .envelope:hover .envelope__flap {
          transform: rotateX(-24deg);
        }
        .envelope__label {
          position: absolute;
          bottom: -2.2rem;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-hand);
          font-size: 1.2rem;
          color: var(--c-rose);
          white-space: nowrap;
        }
        .envelope-hint {
          font-family: var(--font-hand);
          font-size: 1.35rem;
          color: var(--c-brown-muted);
          margin: 0;
          text-align: center;
        }
      `}</style>
    </div>
  )
}