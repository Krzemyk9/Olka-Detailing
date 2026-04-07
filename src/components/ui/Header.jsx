import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { Headphones } from 'lucide-react'
import { PHONE_NUMBER, PHONE_DISPLAY } from '../../constants/contactInfo.js'

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/55 backdrop-blur-md"
      style={{
        boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,0.04)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 outline-offset-4 transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37]/60"
        >
          <img
            src="/olka-logo.webp"
            alt="Olka Detailing"
            className="h-9 w-auto sm:h-10"
            width={180}
            height={40}
            decoding="async"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="group flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2 text-[#f5f5f5] transition duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/40 hover:bg-white/[0.06] hover:brightness-110 sm:flex-nowrap sm:px-4 sm:text-base"
            aria-label={`Zadzwoń: ${PHONE_DISPLAY}`}
          >
            <Headphones
              className="size-4 shrink-0 text-[#d4af37] sm:size-5"
              aria-hidden
            />
            <span className="tabular-nums text-sm sm:text-base">{PHONE_DISPLAY}</span>
          </a>
        </div>

        <Motion.div className="shrink-0" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center rounded-lg border border-[#d4af37] bg-transparent px-3 py-2 text-xs font-semibold text-[#d4af37] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:brightness-110 sm:px-5 sm:text-sm"
          >
            Umów wizytę
          </Link>
        </Motion.div>
      </div>
    </header>
  )
}
