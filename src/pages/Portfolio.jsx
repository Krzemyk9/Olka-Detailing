import PageNav from "../components/ui/PageNav.jsx";
import { GALLERY_ITEMS } from '../constants/galleryData.js'

const CONFIRMED_ITEMS = GALLERY_ITEMS.filter((item) => item.assetStatus === 'confirmed')
const CATEGORIES = [...new Set(CONFIRMED_ITEMS.map((item) => item.category))]

export default function Portfolio() {
  return (
    <>
      <PageNav />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl">
          Nasze realizacje
        </h1>
        <p className="mt-3 max-w-2xl text-[#f5f5f5]/60">
          Każde zdjęcie to prawdziwy efekt naszej pracy — bez filtrów, bez retuszu.
          Poniżej znajdziesz wybrane realizacje: od korekty lakieru, przez powłoki ceramiczne, aż po folię PPF.
        </p>

        <section aria-label="Galeria realizacji" className="mt-16 space-y-16">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#d4af37] sm:text-2xl">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CONFIRMED_ITEMS.filter((item) => item.category === category).map((item) => (
                  <article
                    key={item.id}
                    aria-label={item.imageAlt}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-white/[0.03]">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-[#f5f5f5]">{item.label}</p>
                      {item.hint && (
                        <p className="mt-0.5 text-xs text-[#f5f5f5]/50">{item.hint}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
