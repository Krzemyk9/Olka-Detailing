import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { Sparkles, Droplets, Shield, Layers, Car, Wrench, ChevronRight } from 'lucide-react'
import PageNav from '../components/ui/PageNav.jsx'
import { PHONE_NUMBER, PHONE_DISPLAY } from '../constants/contactInfo.js'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const VEHICLE_COLS = [
  { key: 'sedan', label: 'Cabrio / Hatchback / Sedan / Kombi' },
  { key: 'suv', label: 'SUV / Minivan / Limuzyna' },
  { key: 'van', label: 'Małe Vany / Busy' },
]

const CARE_SERVICES = [
  {
    name: 'Mycie karoserii i felg',
    items: [
      'Mycie wstępne — oprysk pianą aktywną, spłukanie pod ciśnieniem',
      'Mycie zasadnicze — ręcznie szamponem i rękawicą',
      'Mycie felg i opon',
      'Osuszanie karoserii i wnęk drzwiowych',
      'Mycie dywaników gumowych / odkurzenie materiałowych',
      'Hydrowosk',
    ],
    prices: { sedan: '100', suv: '110', van: '150' },
  },
  {
    name: 'Czyszczenie wnętrza',
    subtitle: 'bieżące zabrudzenia',
    items: [
      'Odkurzanie wnętrza — fotele, tunel, schowki, podłoga, boczki, bagażnik',
      'Odświeżenie plastików i tworzyw — kokpit, tunel, drzwi, progi, słupki',
      'Mycie dywaników gumowych',
      'Czyszczenie szyb',
    ],
    prices: {
      sedan: '150',
      suv: '170 / 200 (3 rzędy)',
      van: '150 szoferka / 200–250 (2–3 rzędy)',
    },
  },
  {
    name: 'Pakiet komplet',
    subtitle: 'mycie karoserii + czyszczenie wnętrza',
    items: [],
    prices: {
      sedan: '220',
      suv: '250 / 280 (3 rzędy)',
      van: '270 / 320 / 370',
    },
  },
]

const CARE_ADDONS = [
  { name: 'Aplikacja wosku spray', desc: 'Wybłyszczenie, hydrofobowość, trwałość ok. 6 tygodni', price: '50' },
  { name: 'Aplikacja QD skóry', desc: 'Odświeżenie i utrwalenie zabezpieczenia tapicerki skórzanej', price: '50' },
  { name: 'Niewidzialna wycieraczka', desc: 'Hydrofobizacja szyby — lepsza widoczność w deszczu, od 45 km/h', price: '100' },
]

const DETAILING_WASH = {
  name: 'Wieloetapowe mycie detailingowe + wosk twardy',
  items: [
    'Mycie wstępne i zasadnicze',
    'Dokładne czyszczenie felg, opon i nadkoli',
    'Czyszczenie wnęk, szczelin, maskownic, emblematów',
    'Usuwanie smoły, asfaltu, soków z drzew',
    'Usuwanie zanieczyszczeń metalicznych',
    'Glinkowanie — przywrócenie śliskości lakieru',
    'Odtłuszczenie i zabezpieczenie twardym woskiem',
    'Zabezpieczenie felg, tworzyw i opon',
    'Mycie szyb wewnątrz i na zewnątrz',
  ],
  price: 'od 700',
}

const DETAILING_INTERIOR = {
  name: 'Detailing wnętrza',
  items: [
    'Dokładne odkurzanie — fotele, tunel, schowki, szczeliny, bagażnik',
    'Wydmuchiwanie głęboko zalegających zabrudzeń',
    'Doczyszczanie plastików, kratek nawiewów, uszczelek',
    'Aplikacja QD na skóry / odświeżenie tapicerki',
    'Mycie dywaników gumowych',
    'Odtłuszczenie i mycie szyb',
  ],
  prices: {
    sedan: 'od 450',
    suv: 'od 500 / 650 (3 rzędy)',
    van: 'od 300 szoferka / 500–650 (2–3 rzędy)',
  },
}

const UPHOLSTERY_SERVICES = [
  {
    name: 'Pranie foteli + suszenie',
    subtitle: 'fotele, boczki, podłokietnik, dywaniki',
    prices: {
      sedan: '450 / 250 (2 os.)',
      suv: '450 / 700 (3 rzędy)',
      van: '300 szoferka / 600–900 (2–3 rzędy)',
    },
  },
  {
    name: 'Pranie tapicerki całego pojazdu + suszenie',
    subtitle: 'fotele, boczki, podłokietnik, podsufitka, podłoga, dywaniki, bagażnik',
    prices: {
      sedan: 'od 850 / od 600 (2 os.)',
      suv: 'od 850 / 1100 (3 rzędy)',
      van: 'od 400 szoferka / 1100–1200 (2–3 rzędy)',
    },
  },
  {
    name: 'Czyszczenie i konserwacja skór',
    subtitle: 'fotele, boczki, kierownica, podłokietnik',
    prices: {
      sedan: '550 / 350 (2 os.)',
      suv: '550 / 800 (3 rzędy)',
      van: 'od 450 szoferka / 750–1125 (2–3 rzędy)',
    },
  },
  {
    name: 'Skóry + pranie elementów materiałowych',
    subtitle: 'podsufitka, podłoga, dywaniki, bagażnik',
    prices: {
      sedan: 'od 950',
      suv: 'od 950 / 1200 (3 rzędy)',
      van: 'od 550 szoferka / 1250–1350 (2–3 rzędy)',
    },
  },
]

const POLISHING = [
  {
    name: 'Odświeżenie lakieru',
    desc: 'Jednoetapowa korekta lakieru z myciem detailingowym i aplikacją twardego wosku. Usunięcie mikrozarysowań, wybłyszczenie.',
    price: 'od 1 500',
  },
  {
    name: 'Pełna renowacja lakieru',
    desc: 'Dwu- lub wieloetapowa korekta z myciem detailingowym i aplikacją wosku. Usunięcie rys, przywrócenie blasku.',
    price: 'od 2 800',
  },
]

const COATINGS = [
  { name: 'Powłoka roczna', desc: 'Głębia koloru, szkliste wykończenie, hydrofobowość, ochrona przed zabrudzeniami i utlenianiem', price: 'od 1 150' },
  { name: 'Powłoka dwuletnia', desc: 'Wysoki połysk, duża śliskość, odporna na agresywną chemię i promieniowanie UV', price: 'od 2 000' },
  { name: 'Powłoka pięcioletnia', desc: 'Silne odbicie, właściwości samoczyszczące, ochrona przed mikrorysami, solą, chemikaliami i UV', price: 'od 3 500' },
]

const PPF_SINGLES = [
  { name: 'Wnęki klamek', price: '300 (4 szt.)' },
  { name: 'Słupki drzwiowe — piano black', price: '75 / szt.' },
  { name: 'Próg załadunkowy', price: '300' },
  { name: 'Progi drzwiowe', price: '200 / szt.' },
  { name: 'Ranty drzwi', price: '75 / szt.' },
  { name: 'Reflektory', price: '400' },
  { name: 'Wyświetlacz — folia matowa', price: 'od 200' },
]

const PPF_FULL_FRONT_ITEMS = [
  'Zderzak przedni', 'Reflektory', 'Maska', 'Przednie błotniki',
  'Przednie słupki', 'Lusterka', 'Nadszybie', 'Wnęki klamek',
  'Progi drzwiowe i załadunkowy', 'Piano black',
]

const ADDITIONAL = [
  { name: 'Felgi — mycie (zdemontowany komplet)', price: '50' },
  { name: 'Felgi — mycie wieloetapowe + wosk + dressing opon', price: '300' },
  { name: 'Felgi — mycie, polerowanie, wosk + dressing', price: 'od 650' },
  { name: 'Felgi — powłoka ceramiczna', price: 'od 400', note: 'dodatkowo do przygotowania' },
  { name: 'Powłoka hydrofobowa szyby', price: '200 przednia / od 400 wszystkie' },
  { name: 'Renowacja reflektorów', price: '150–200 / szt.', note: 'szlifowanie, polerowanie, powłoka' },
  { name: 'Pielęgnacja komory silnika', price: '150' },
  { name: 'Dach cabrio — czyszczenie + impregnacja', price: '500' },
  { name: 'Impregnacja tapicerki materiałowej', price: 'od 450', note: 'po wcześniejszym praniu' },
  { name: 'Zaprawki lakiernicze', price: 'od 50' },
]

const SECTION_ICONS = {
  care: Droplets,
  detailing: Sparkles,
  upholstery: Car,
  polishing: Shield,
  ppf: Layers,
  additional: Wrench,
}

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                   */
/* ------------------------------------------------------------------ */

function SectionHeading({ id, icon, title, subtitle }) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
        {createElement(icon, { className: 'size-6 text-[#d4af37]', 'aria-hidden': true })}
      </div>
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-[#f5f5f5] sm:text-3xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-xl text-sm text-[#f5f5f5]/50">{subtitle}</p>
      )}
    </div>
  )
}

function PriceTable({ prices, cols = VEHICLE_COLS }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            {cols.map((col) => (
              <th
                key={col.key}
                className="px-3 pb-3 pt-1 text-center text-xs font-medium uppercase tracking-wider text-[#f5f5f5]/40"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {cols.map((col) => (
              <td
                key={col.key}
                className="px-3 py-3 text-center font-semibold text-[#d4af37]"
              >
                {prices[col.key]}&nbsp;zł
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function ServiceItemList({ items }) {
  if (!items || items.length === 0) return null
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#f5f5f5]/55">
          <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-[#d4af37]/50" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

function PriceCard({ name, subtitle, items, prices, index = 0 }) {
  return (
    <Motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-[#f5f5f5]">{name}</h3>
      {subtitle && (
        <p className="mt-1 text-sm text-[#f5f5f5]/45">{subtitle}</p>
      )}
      <ServiceItemList items={items} />
      <PriceTable prices={prices} />
    </Motion.article>
  )
}

function FlatPriceCard({ name, desc, price, note, index = 0 }) {
  return (
    <Motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-[#f5f5f5]">{name}</h3>
        {desc && (
          <p className="mt-2 text-sm leading-relaxed text-[#f5f5f5]/55">{desc}</p>
        )}
        {note && (
          <p className="mt-1.5 text-xs italic text-[#f5f5f5]/35">{note}</p>
        )}
      </div>
      <p className="mt-4 text-xl font-semibold text-[#d4af37]">{price}&nbsp;zł</p>
    </Motion.article>
  )
}

function CtaBanner() {
  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="mt-16 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] p-8 text-center sm:mt-20 sm:p-12"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-[#f5f5f5] sm:text-3xl">
        Potrzebujesz indywidualnej wyceny?
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#f5f5f5]/55">
        Każde auto jest inne — skontaktuj się z nami, aby ustalić dokładny zakres
        prac i koszt dostosowany do Twojego pojazdu.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#d4af37] px-8 py-3 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.55)] transition duration-300 hover:-translate-y-0.5 hover:border-[#e8c547] hover:bg-[#e8c547] hover:shadow-[0_0_48px_-6px_rgba(232,197,71,0.6)] hover:brightness-110"
          >
            Umów wizytę
          </Link>
        </Motion.div>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#f5f5f5]/60 transition hover:text-[#d4af37]"
        >
          <span>lub zadzwoń: {PHONE_DISPLAY}</span>
          <ChevronRight className="size-4" aria-hidden />
        </a>
      </div>
    </Motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <>
      <PageNav />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Page header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#f5f5f5]/40">
          Olka Detailing
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#f5f5f5] sm:text-4xl lg:text-5xl">
          Cennik usług
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#f5f5f5]/55 sm:text-base">
          Podane ceny zawierają VAT 23&nbsp;%. Wycena renowacji lakieru poprzedzona
          jest inspekcją i pomiarem grubości powłoki.
        </p>
      </Motion.div>

      {/* ─── BIEŻĄCA PIELĘGNACJA ─── */}
      <section className="mt-16 sm:mt-20" aria-labelledby="care-heading">
        <SectionHeading
          id="care-heading"
          icon={SECTION_ICONS.care}
          title="Bieżąca pielęgnacja"
          subtitle="Dla aut po detailingu, regularnie czyszczonych i nowych"
        />
        <div className="space-y-6">
          {CARE_SERVICES.map((svc, i) => (
            <PriceCard
              key={svc.name}
              name={svc.name}
              subtitle={svc.subtitle}
              items={svc.items}
              prices={svc.prices}
              index={i}
            />
          ))}
        </div>

        {/* Dodatki */}
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#f5f5f5]/40">
            Dodatkowo
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {CARE_ADDONS.map((addon, i) => (
              <FlatPriceCard
                key={addon.name}
                name={addon.name}
                desc={addon.desc}
                price={addon.price}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DETAILING ─── */}
      <section className="mt-20 sm:mt-24" aria-labelledby="detailing-heading">
        <SectionHeading
          id="detailing-heading"
          icon={SECTION_ICONS.detailing}
          title="Detailing"
        />

        {/* Mycie detailingowe */}
        <Motion.article
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#f5f5f5]">{DETAILING_WASH.name}</h3>
              <ServiceItemList items={DETAILING_WASH.items} />
            </div>
            <p className="shrink-0 text-2xl font-semibold text-[#d4af37] sm:text-right">
              {DETAILING_WASH.price}&nbsp;zł
            </p>
          </div>
        </Motion.article>

        {/* Detailing wnętrza */}
        <div className="mt-6">
          <PriceCard
            name={DETAILING_INTERIOR.name}
            items={DETAILING_INTERIOR.items}
            prices={DETAILING_INTERIOR.prices}
            index={1}
          />
        </div>
      </section>

      {/* ─── CZYSZCZENIE TAPICERKI ─── */}
      <section className="mt-20 sm:mt-24" aria-labelledby="upholstery-heading">
        <SectionHeading
          id="upholstery-heading"
          icon={SECTION_ICONS.upholstery}
          title="Czyszczenie tapicerki"
          subtitle="Dodatkowo do bieżącej pielęgnacji lub detailingu wnętrza"
        />
        <div className="space-y-6">
          {UPHOLSTERY_SERVICES.map((svc, i) => (
            <PriceCard
              key={svc.name}
              name={svc.name}
              subtitle={svc.subtitle}
              prices={svc.prices}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ─── POLEROWANIE ─── */}
      <section className="mt-20 sm:mt-24" aria-labelledby="polishing-heading">
        <SectionHeading
          id="polishing-heading"
          icon={SECTION_ICONS.polishing}
          title="Polerowanie"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {POLISHING.map((item, i) => (
            <FlatPriceCard key={item.name} {...item} index={i} />
          ))}
        </div>

        {/* Powłoki ochronne */}
        <div className="mt-8">
          <h3 className="mb-2 text-lg font-semibold text-[#f5f5f5]">
            Powłoki ochronne
          </h3>
          <p className="mb-6 text-sm text-[#f5f5f5]/45">
            Dodatkowo do jednego z pakietów korekty lakieru. Zabezpieczenie lakieru,
            reflektorów, lamp i tworzyw sztucznych.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {COATINGS.map((item, i) => (
              <FlatPriceCard key={item.name} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOLIA PPF ─── */}
      <section className="mt-20 sm:mt-24" aria-labelledby="ppf-heading">
        <SectionHeading
          id="ppf-heading"
          icon={SECTION_ICONS.ppf}
          title="Folia PPF"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pojedyncze elementy */}
          <Motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-[#f5f5f5]">
              Pojedyncze elementy
            </h3>
            <ul className="space-y-3">
              {PPF_SINGLES.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-sm text-[#f5f5f5]/70">{item.name}</span>
                  <span className="shrink-0 text-sm font-semibold text-[#d4af37]">
                    {item.price}&nbsp;zł
                  </span>
                </li>
              ))}
            </ul>
          </Motion.article>

          {/* Full Front */}
          <Motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={1}
            className="flex flex-col rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.03] p-5 sm:p-6"
          >
            <h3 className="text-lg font-semibold text-[#f5f5f5]">Full Front</h3>
            <ul className="mt-4 flex-1 columns-2 gap-x-4 space-y-1.5">
              {PPF_FULL_FRONT_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#f5f5f5]/55"
                >
                  <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-[#d4af37]/50" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-2xl font-semibold text-[#d4af37]">od 6 000&nbsp;zł</p>
          </Motion.article>
        </div>

        {/* Full Body */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center sm:px-6"
        >
          <p className="text-sm text-[#f5f5f5]/60">
            <span className="font-semibold text-[#f5f5f5]">Full Body</span> — wycena indywidualna.{' '}
            <Link to="/kontakt" className="font-medium text-[#d4af37] transition hover:text-[#e8c547]">
              Zapytaj o wycenę&nbsp;→
            </Link>
          </p>
        </Motion.div>
      </section>

      {/* ─── USŁUGI DODATKOWE ─── */}
      <section className="mt-20 sm:mt-24" aria-labelledby="additional-heading">
        <SectionHeading
          id="additional-heading"
          icon={SECTION_ICONS.additional}
          title="Usługi dodatkowe"
        />
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
        >
          <ul className="space-y-3">
            {ADDITIONAL.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-1 border-b border-white/[0.05] pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex-1">
                  <span className="text-sm text-[#f5f5f5]/70">{item.name}</span>
                  {item.note && (
                    <span className="ml-2 text-xs italic text-[#f5f5f5]/35">({item.note})</span>
                  )}
                </div>
                <span className="shrink-0 text-sm font-semibold text-[#d4af37]">
                  {item.price}&nbsp;zł
                </span>
              </li>
            ))}
          </ul>
        </Motion.div>
      </section>

      {/* ─── CTA ─── */}
      <CtaBanner />
      </div>
    </>
  )
}
