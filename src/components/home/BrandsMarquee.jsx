const brands = [
  { name: 'ADBL', accent: 'gold' },
  { name: 'Koch-Chemie', accent: 'cobalt' },
  { name: 'Rupes', accent: 'gold' },
]

function BrandWord({ name, accent }) {
  return (
    <span
      className={[
        'inline-flex shrink-0 items-center px-10 text-lg font-semibold tracking-tight grayscale transition duration-500 sm:text-xl',
        accent === 'cobalt'
          ? 'text-[#f5f5f5]/35 hover:grayscale-0 hover:text-[#5b9bd5]'
          : 'text-[#f5f5f5]/35 hover:grayscale-0 hover:text-[#d4af37]',
      ].join(' ')}
    >
      {name}
    </span>
  )
}

export default function BrandsMarquee() {
  const track = [...brands, ...brands]

  return (
    <section
      className="border-b border-white/[0.06] bg-[#0a0a0a]/80 py-10"
      aria-label="Marki partnerskie"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.28em] text-[#f5f5f5]/40">
          Zaufały nam marki
        </p>
      </div>
      <div className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-2 py-2">
          {track.map((b, i) => (
            <BrandWord key={`${b.name}-${i}`} name={b.name} accent={b.accent} />
          ))}
        </div>
      </div>
    </section>
  )
}
