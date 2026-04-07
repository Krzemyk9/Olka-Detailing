import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8"
      aria-label="Wprowadzenie"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-[#d4af37]/15 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-[#0047ab]/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <Motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-[#f5f5f5]/45"
        >
          Olka Detailing
        </Motion.p>
        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-[#f5f5f5] sm:text-5xl md:text-6xl lg:text-[3.5rem]"
        >
          Twoje auto{' '}
          <span className="bg-gradient-to-r from-[#d4af37] via-[#e8c547] to-[#5b9bd5] bg-clip-text text-transparent">
            zasługuje na blask
          </span>
        </Motion.h1>
        <Motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#f5f5f5]/65 sm:text-lg"
        >
          Specjalizujemy się w korekcie lakieru, powłokach ceramicznych, woskach i folii PPF.
          Pracujemy z pasją do detalu — każde auto opuszcza nas w stanie lepszym niż ze salonu.
        </Motion.p>
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#d4af37] px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.55)] transition duration-300 hover:-translate-y-0.5 hover:border-[#e8c547] hover:bg-[#e8c547] hover:shadow-[0_0_48px_-6px_rgba(232,197,71,0.6)] hover:brightness-110"
            >
              Zarezerwuj termin
            </Link>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  )
}
