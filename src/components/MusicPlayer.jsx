import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Music } from 'lucide-react'
import { musicPlayer } from '../data/birthdayContent.js'

/**
 * FR-04 — Pemutar Musik Lokal.
 *
 * - Satu instans audio tunggal yang di-render di sini dan didaftarkan ke
 *   `audioRef` milik App agar dapat dijeda saat pengalaman diputar ulang.
 * - Tidak autoplay paksa; audio dimulai hanya setelah interaksi pengguna.
 * - Menangani file audio yang hilang/tidak didukung tanpa menghalangi navigasi.
 * - Dock mengambang di pojok, tidak menutupi konten (§8).
 */
export default function MusicPlayer({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)
  // Volume awal 0.9 (jelas terdengar), tetap dimulai oleh klik pengguna (PSD §8).
  const [volume, setVolume] = useState(0.9)
  const [errored, setErrored] = useState(false)
  const [el, setEl] = useState(null)
  // Menandai momen "play ditekan tapi browser masih membungkam audio"
  // agar pengguna diarahkan menyentuh slider volume (kebijakan autoplay browser).
  const [needsNudge, setNeedsNudge] = useState(false)
  const volumeRef = useRef(null)

  // Terapkan volume saat elemen siap atau volume berubah.
  useEffect(() => {
    if (el) el.volume = volume
  }, [el, volume])

  const toggle = async () => {
    if (!el || errored) return
    try {
      if (el.paused) {
        await el.play()
        setIsPlaying(true)
        // Browser mungkin membisukan audio sampai ada interaksi lanjutan (touch/scroll slider).
        // Dorong fokus ke slider agar pengguna tahu bisa menyentuhnya.
        setNeedsNudge(true)
        volumeRef.current?.focus({ preventScroll: true })
      } else {
        el.pause()
        setIsPlaying(false)
      }
    } catch {
      // Autoplay diblokir atau file tidak tersedia.
      setErrored(true)
      setIsPlaying(false)
    }
  }

  const handleVolume = (e) => {
    setVolume(parseFloat(e.target.value))
    setNeedsNudge(false)
  }

  const handleError = () => {
    setErrored(true)
    setIsPlaying(false)
  }

  const playStateLabel = errored
    ? 'Musik belum tersedia'
    : isPlaying
      ? needsNudge
        ? 'Geser volume untuk menyalakan suara ♪'
        : `Sedang diputar — ${musicPlayer.title}`
      : musicPlayer.label

  return (
    <div className="music-dock" role="region" aria-label="Pemutar musik">
      <button
        type="button"
        className="music-dock__btn"
        onClick={toggle}
        aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        aria-pressed={isPlaying}
        disabled={errored}
      >
        {errored ? (
          <Music size={18} aria-hidden="true" />
        ) : isPlaying ? (
          <Pause size={18} aria-hidden="true" />
        ) : (
          <Play size={18} aria-hidden="true" />
        )}
      </button>

      <span className="music-dock__label" aria-live="polite">
        {playStateLabel}
      </span>

      <input
        ref={volumeRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className={
          'music-dock__volume' + (needsNudge ? ' music-dock__volume--nudge' : '')
        }
        aria-label="Volume musik"
        disabled={errored}
      />

      {/* Instans audio tunggal. Tidak autoplay; didaftarkan ke ref App. */}
      <audio
        ref={(node) => {
          setEl(node)
          if (audioRef) audioRef.current = node
        }}
        src={musicPlayer.src}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
        style={{ display: 'none' }}
      />
    </div>
  )
}