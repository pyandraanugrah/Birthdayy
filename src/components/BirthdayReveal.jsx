import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { revealMessages } from '../data/birthdayContent.js'

/**
 * FR-02 — Pengungkapan Ulang Tahun.
 * - Judul besar, subjudul singkat, tombol lanjut.
 * - Animasi pengungkapan elegan, tidak berlebihan.
 */
export default function BirthdayReveal({ onContinue }) {
  return (
    <section className="scene" aria-labelledby="reveal-title">
      <motion.div
        className="scene scene--paper"
        style={{ position: 'relative' }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="tape" aria-hidden="true" />
        <span className="tape tape--right" aria-hidden="true" />

        <div className="scene__inner" style={{ padding: '1rem 0.5rem' }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ✿ For you who are special ✿
          </motion.span>

          <motion.h1
            id="reveal-title"
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {revealMessages.revealTitle}
          </motion.h1>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {revealMessages.revealSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button className="btn" onClick={onContinue} type="button">
              <Sparkles size={18} aria-hidden="true" />
              {revealMessages.revealCta}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}