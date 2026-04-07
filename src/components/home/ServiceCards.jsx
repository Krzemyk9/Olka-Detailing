import { Link } from 'react-router-dom'
import { Sparkles, Droplets, Shield, Layers } from 'lucide-react'

const services = [
  {
    title: 'Korekta lakieru',
    description:
      'Usuwanie defektów i przywracanie głębi koloru — bezpiecznie, wieloetapowo, pod jasny finisz.',
    icon: Sparkles,
    accent: 'gold',
  },
  {
    title: 'Wosk',
    description:
      'Klasyczna ochrona i soczysty połysk. Idealne uzupełnienie po korekcie lub dla regularnej pielęgnacji.',
    icon: Droplets,
    accent: 'cobalt',
  },
  {
    title: 'Ceramika',
    description:
      'Trwała powłoka hydrofobowa: łatwiejsze mycie, lepsza odporność na czynniki pogodowe i drobne zarysowania.',
    icon: Shield,
    accent: 'gold',
  },
  {
    title: 'Folia PPF',
    description:
      'Niewidoczna bariera na lakierze — chłonne uderzenia kamieni i zarysowania z codziennej jazdy.',
    icon: Layers,
    accent: 'cobalt',
  },
]

export default function ServiceCards() {
  return (
    <section
      className="border-b border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="services-heading"
          className="text-center text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl"
        >
          Oferta premium
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#f5f5f5]/60">
          Wybierz zakres prac dopasowany do auta i Twoich oczekiwań.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map(({ title, description, icon, accent }) => {
            const ServiceIcon = icon
            return (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <div
                className={[
                  'flex size-12 items-center justify-center rounded-xl border',
                  accent === 'gold'
                    ? 'border-[#d4af37]/35 bg-[#d4af37]/10 text-[#d4af37]'
                    : 'border-[#0047ab]/35 bg-[#0047ab]/15 text-[#5b9bd5]',
                ].join(' ')}
              >
                <ServiceIcon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#f5f5f5]">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f5f5f5]/60">
                {description}
              </p>
              <Link
                to="/cennik"
                className="mt-6 inline-flex w-fit text-sm font-semibold text-[#d4af37] transition duration-300 hover:-translate-y-0.5 hover:text-[#e8c547] hover:brightness-110"
              >
                Cennik →
              </Link>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
