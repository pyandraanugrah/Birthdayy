import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Eye } from 'lucide-react'
import Envelope from './Envelope.jsx'
import { loveLetter } from '../data/birthdayContent.js'

const TYPING_SPEED = 34 // ms per karakter — nyaman dibaca (FR-05)

/**
 * FR-05 — Surat Cinta Interaktif.
 *
 * Alur (PRD FR-05):
 * 1. Tampilkan amplop tertutup + petunjuk.
 * 2-3. Klik amplop untuk membuka.
 * 4-5. Animasi amplop, lalu tampilkan surat.
 * 6. Efek teks muncul seolah diketik.
 * 7. Tombol "Tampilkan semua".
 * 8. Tombol lanjut ke kejutan terakhir.
 *
 * Performa:
 * - Interval tunggal yang dibersihkan saat unmount maupun saat teks selesai.
 * - Tidak mengulang animasi pada render ulang tak berkaitan (dependensi terkontrol).
 * - Menghormati prefers-reduced-motion (langsung tampil penuh).
 */
export default function LoveLetter({ onContinue }) {
  const [opened, setOpened] = useState(false)
  const [typedLength, setTypedLength] = useState(0)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  const fullText = useMemo(() => loveLetter.paragraphs.join('\n\n'), [])

  const prefersReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Mulai animasi pengetikan setelah amplop dibuka.
  useEffect(() => {
    if (!opened) return

    if (prefersReduced) {
      setTypedLength(fullText.length)
      setDone(true)
      return
    }

    let i = 0
    intervalRef.current = setInterval(() => {
      i += 1
      setTypedLength(i)
      if (i >= fullText.length) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDone(true)
      }
    }, TYPING_SPEED)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [opened, fullText, prefersReduced])

  const handleShowAll = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTypedLength(fullText.length)
    setDone(true)
  }

  const visibleText = fullText.slice(0, typedLength)

  return (
    <section className="scene" aria-labelledby="letter-title">
      <div className="scene__inner">
        <span className="eyebrow">✉️ Small Letter</span>
        <h2 id="letter-title" className="section-title">
          {opened ? 'For You' : 'There\'s Something for You'}
        </h2>
        <p className="section-subtitle">
          {opened ? 'Read it slowly, okay? ♡' : 'Click the envelope to open it.'}
        </p>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Envelope
                hint={loveLetter.envelopeHint}
                cta={loveLetter.envelopeCta}
                onOpen={() => setOpened(true)}
              />
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              className="letter-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="tape" aria-hidden="true" />
              <h3 className="letter-card__heading">{loveLetter.letterHeading}</h3>

              <p className="letter-card__body" aria-live="polite">
                {visibleText}
                {!done && <span className="caret" aria-hidden="true">▍</span>}
              </p>

              <div className="btn-row">
                {!done && (
                  <button className="btn btn--ghost" onClick={handleShowAll} type="button">
                    <Eye size={16} aria-hidden="true" />
                    {loveLetter.showAllCta}
                  </button>
                )}
                {done && (
                  <button className="btn" onClick={onContinue} type="button">
                    {loveLetter.continueCta}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .letter-card {
          position: relative;
          max-width: 640px;
          margin: 0 auto;
          background: var(--c-paper);
          padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1.25rem, 4vw, 2.25rem);
          border-radius: var(--radius-card);
          border: 1px solid rgba(73, 55, 53, 0.08);
          box-shadow: var(--shadow-soft);
          text-align: left;
        }
        .letter-card__heading {
          font-family: var(--font-hand);
          color: var(--c-rose);
          font-size: 1.6rem;
          margin: 0 0 1rem;
        }
        .letter-card__body {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--c-brown);
          white-space: pre-wrap;
          overflow-wrap: break-word;
          margin: 0;
          min-height: 6rem;
        }
        .caret {
          display: inline-block;
          color: var(--c-rose);
          animation: blink 1s steps(1) infinite;
          margin-left: 1px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media (max-width: 380px) {
          .letter-card__body { font-size: 0.98rem; line-height: 1.75; }
        }
      `}</style>
    </section>
  )
}