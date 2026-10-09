import { useEffect, useState, useRef } from 'react'

/**
 * Menghitung mundur menuju tanggal target (FR-01).
 *
 * Interpretasi waktu (PRD FR-01, §5.1):
 * Secara default tanggal `targetDate` ditafsirkan sebagai **waktu lokal pengunjung**.
 * String ISO "YYYY-MM-DDTHH:mm:ss" (tanpa timezone offset) akan diperlakukan
 * sebagai waktu lokal saat `new Date()` dipanggil di browser pengunjung.
 *
 * Membersihkan interval saat unmount agar tidak ada timer ganda.
 *
 * @param {string} targetISO - tanggal target format ISO (waktu lokal)
 * @returns {{ days, hours, minutes, seconds, isPast, isNow, mounted }}
 */
export function useCountdown(targetISO) {
  const targetRef = useRef(new Date(targetISO).getTime())

  const calc = () => {
    const now = Date.now()
    const diff = targetRef.current - now
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isNow: diff <= 1000 }
    }
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false,
      isNow: false,
    }
  }

  const [state, setState] = useState(calc)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    const id = setInterval(() => {
      if (mounted.current) setState(calc())
    }, 1000)
    return () => {
      mounted.current = false
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...state, mounted: mounted.current }
}