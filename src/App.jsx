import { useRef, useState } from 'react'
import Countdown from './components/Countdown.jsx'
import BirthdayReveal from './components/BirthdayReveal.jsx'
import PhotoGallery from './components/PhotoGallery.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import FinalSurprise from './components/FinalSurprise.jsx'
import { birthdayConfig } from './data/birthdayContent.js'

const SCENES = ['countdown', 'reveal', 'gallery', 'letter', 'final']

export default function App() {
  const audioRef = useRef(null)
  const [scene, setScene] = useState(SCENES[0])

  const go = (name) => {
    if (!SCENES.includes(name)) return
    setScene(name)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const replay = () => {
    // Jangan buat timer atau audio ganda (PRD FR-06).
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    go('countdown')
  }

  return (
    <>
      {scene === 'countdown' && (
        <Countdown
          targetISO={birthdayConfig.targetDate}
          onContinue={() => go('reveal')}
        />
      )}
      {scene === 'reveal' && (
        <BirthdayReveal onContinue={() => go('gallery')} />
      )}
      {scene === 'gallery' && (
        <PhotoGallery onContinue={() => go('letter')} />
      )}
      {scene === 'letter' && (
        <LoveLetter onContinue={() => go('final')} />
      )}
      {scene === 'final' && (
        <FinalSurprise onReplay={replay} />
      )}

      {/* Pemutar musik tersedia di semua bagian, tidak menghalangi navigasi (FR-04, §8) */}
      <MusicPlayer audioRef={audioRef} />
    </>
  )
}