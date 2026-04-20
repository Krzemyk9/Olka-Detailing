import { motion as Motion } from 'framer-motion'

export default function OwnerSection() {
  return (
    <section
      className="border-b border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="owner-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2
            id="owner-heading"
            className="text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl"
          >
            Za studiem stoi pasja
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-[#f5f5f5]/65">
            Olka Detailing to miejsce, gdzie detal ma znaczenie — od przygotowania powierzchni po
            finisz bez kompromisów. Łączymy doświadczenie z najlepszą chemią i sprzętem, żeby Twój
            lakier wyglądał głęboko, a powłoka była realnie chroniona na co dzień.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-[#f5f5f5]/55">
            Każdy projekt traktujemy indywidualnie: słuchamy oczekiwań, diagnozujemy stan i dobieramy
            proces, który da trwały efekt — nie tylko „na zdjęcie”.
          </p>
          <Motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#reviews"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[#f5f5f5] transition duration-300 hover:-translate-y-0.5 hover:border-[#0047ab]/50 hover:bg-[#0047ab]/10 hover:text-[#7eb8ff] hover:brightness-110"
            >
              Zobacz opinie
            </a>
          </Motion.div>
        </div>

        <div className="relative">
          <div
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] via-[#0f1729] to-[#0a0a0a] shadow-[0_24px_80px_-24px_rgba(0,71,171,0.35)] flex items-center justify-center"
          >
            <img
              src="/profesjonalne-zdjecie.png"
              alt="Profesjonalne zdjęcie właściciela studia Olka Detailing"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/5 blur-2xl"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
