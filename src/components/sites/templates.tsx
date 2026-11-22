import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone, Zap, Droplets, ArrowRight, Check } from "lucide-react";
import { CATEGORIES } from "@/config/categories";
import type { SectionId } from "@/config/types";
import { cn } from "@/lib/utils";
import { BRAND } from "@/config/brand";
import { Gallery, HoursList, SiteForm, enabled, priceLabel, sd, title, type SiteProps } from "./shared";

function Footer({ p, className }: { p: SiteProps; className?: string }) {
  return (
    <footer className={cn("px-6 py-8 text-center text-xs opacity-70", className)}>
      © {new Date().getFullYear()} {p.business.name} · {sd(p.business).poweredBy} {BRAND.name}
    </footer>
  );
}

function render(p: SiteProps, map: Partial<Record<SectionId, () => ReactNode>>) {
  return enabled(p.business).map((id) => { const f = map[id]; return f ? <div key={id} id={id}>{f()}</div> : null; });
}

/* ---------------- Nail: elegant, soft, serif ---------------- */
export function NailSite(p: SiteProps) {
  const { business: b, services } = p; const d = sd(b); const c = CATEGORIES[b.category]; const w = b.website;
  const round = w.style === "modern" ? "rounded-none" : "rounded-full";
  const field = "w-full border-b border-s-line bg-transparent py-2 outline-none focus:border-s-accent";
  const cta = <a href="#form" className={cn("inline-block bg-s-accent px-7 py-3 text-sm tracking-wide text-s-accent-ink", round)}>{c.cta[w.language]}</a>;
  return (
    <div className="site min-h-full bg-s-bg text-s-ink" data-palette={w.palette}>
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-serif-elegant text-2xl italic">{b.name}</span>
        <a href="#form" className="hidden text-sm underline underline-offset-4 sm:block">{c.cta[w.language]}</a>
      </header>
      {render(p, {
        hero: () => w.layout === "a" ? (
          <section className="grid items-center gap-10 px-6 pb-16 pt-6 md:grid-cols-2 md:px-12">
            <div className="order-2 md:order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-s-muted">{b.city}</p>
              <h1 className="mt-4 font-serif-elegant text-5xl leading-[1.05] md:text-6xl">{w.heroTitle}</h1>
              <p className="mt-5 max-w-md text-s-muted">{w.heroSubtitle}</p>
              <div className="mt-8">{cta}</div>
            </div>
            <img src={w.heroImage} alt="" className="order-1 aspect-[4/5] w-full rounded-t-full object-cover md:order-2" />
          </section>
        ) : (
          <section className="relative">
            <img src={w.heroImage} alt="" className="h-[70vh] min-h-[420px] w-full object-cover" />
            <div className="absolute inset-x-6 bottom-6 bg-s-bg/95 p-8 text-center md:inset-x-auto md:left-1/2 md:w-[520px] md:-translate-x-1/2">
              <h1 className="font-serif-elegant text-4xl leading-tight md:text-5xl">{w.heroTitle}</h1>
              <p className="mt-3 text-s-muted">{w.heroSubtitle}</p>
              <div className="mt-6">{cta}</div>
            </div>
          </section>
        ),
        services: () => (
          <section className="bg-s-surface px-6 py-20 md:px-12">
            <h2 className="text-center font-serif-elegant text-4xl">{title(b, "services", d.prices)}</h2>
            <div className="mx-auto mt-12 max-w-2xl divide-y divide-s-line">
              {services.filter((s) => s.visible).map((s) => (
                <div key={s.id} className="flex items-baseline gap-4 py-5">
                  <div className="flex-1">
                    <p className="font-serif-elegant text-xl">{s.name}</p>
                    <p className="text-sm text-s-muted">{s.description}{s.duration ? ` · ${s.duration} ${d.minutes}` : ""}</p>
                  </div>
                  <p className="font-serif-elegant text-xl">{priceLabel(b, s.price)}</p>
                </div>
              ))}
            </div>
          </section>
        ),
        gallery: () => <section className="px-6 py-20 md:px-12"><h2 className="mb-10 text-center font-serif-elegant text-4xl">{title(b, "gallery", d.gallery)}</h2><Gallery b={b} className="[&_img]:rounded-sm" /></section>,
        about: () => (
          <section className="px-6 py-20 text-center md:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-s-muted">{title(b, "about", d.about)}</p>
            <p className="mx-auto mt-6 max-w-2xl font-serif-elegant text-2xl leading-relaxed md:text-3xl">{w.about}</p>
          </section>
        ),
        form: () => (
          <section className="bg-s-surface px-6 py-20 md:px-12">
            <div className="mx-auto max-w-xl">
              <h2 className="text-center font-serif-elegant text-4xl">{c.cta[w.language]}</h2>
              <div className="mt-10"><SiteForm {...p} fieldClass={field} buttonClass={cn("w-full bg-s-accent py-3 text-sm tracking-wide text-s-accent-ink", round)} labelClass="text-s-muted" /></div>
            </div>
          </section>
        ),
        hours: () => <section className="mx-auto max-w-md px-6 py-16"><h2 className="mb-6 text-center font-serif-elegant text-3xl">{title(b, "hours", d.hours)}</h2><HoursList b={b} /></section>,
        location: () => <section className="px-6 py-12 text-center"><h2 className="font-serif-elegant text-3xl">{title(b, "location", d.location)}</h2><p className="mt-3 text-s-muted">{b.address}, {b.postalCode} {b.city}</p></section>,
        contact: () => (
          <section className="flex flex-wrap justify-center gap-6 border-t border-s-line px-6 py-10 text-sm">
            {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2"><Phone className="size-4" />{b.phone}</a>}
            {b.email && <a href={`mailto:${b.email}`} className="flex items-center gap-2"><Mail className="size-4" />{b.email}</a>}
          </section>
        ),
      })}
      <Footer p={p} />
    </div>
  );
}

/* ---------------- Hair: editorial, bold photography ---------------- */
export function HairSite(p: SiteProps) {
  const { business: b, services } = p; const d = sd(b); const c = CATEGORIES[b.category]; const w = b.website;
  const field = "w-full border border-s-line bg-transparent px-3 py-2.5 outline-none focus:border-s-ink";
  const gallery = b.photos.length ? b.photos : c.gallery;
  return (
    <div className="site min-h-full bg-s-bg text-s-ink" data-palette={w.palette}>
      <header className="flex items-center justify-between border-b border-s-line px-6 py-4 md:px-10">
        <span className="font-editorial text-xl uppercase tracking-[0.25em]">{b.name}</span>
        <a href="#form" className="bg-s-accent px-4 py-2 text-xs uppercase tracking-widest text-s-accent-ink">{c.cta[w.language]}</a>
      </header>
      {render(p, {
        hero: () => (
          <section className={cn("grid md:grid-cols-12", w.layout === "b" && "md:[direction:rtl]")}>
            <div className="flex flex-col justify-end p-6 [direction:ltr] md:col-span-5 md:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-s-muted">{c.name[w.language]} — {b.city}</p>
              <h1 className={cn("mt-6 font-editorial text-5xl leading-[0.95] md:text-7xl", w.style === "modern" && "uppercase")}>{w.heroTitle}</h1>
              <p className="mt-6 max-w-sm text-s-muted">{w.heroSubtitle}</p>
              <a href="#form" className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-s-ink pb-1 text-sm uppercase tracking-widest">{c.cta[w.language]} <ArrowRight className="size-4" /></a>
            </div>
            <img src={w.heroImage} alt="" className="h-[60vh] min-h-[380px] w-full object-cover md:col-span-7 md:h-[85vh]" />
          </section>
        ),
        services: () => (
          <section className="px-6 py-20 md:px-10">
            <div className="grid gap-10 md:grid-cols-12">
              <h2 className="font-editorial text-4xl md:col-span-4 md:text-5xl">{title(b, "services", d.services)}</h2>
              <div className="md:col-span-8">
                {services.filter((s) => s.visible).map((s, i) => (
                  <div key={s.id} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-s-line py-5">
                    <span className="font-editorial text-sm text-s-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div><p className="text-lg font-medium">{s.name}</p><p className="text-sm text-s-muted">{s.description}</p></div>
                    <p className="font-editorial text-xl">{priceLabel(b, s.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
        gallery: () => (
          <section className="grid grid-cols-2 gap-1 md:grid-cols-4">
            {gallery.slice(0, 4).map((s, i) => <img key={i} src={s.replace("w=1600", "w=800")} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover grayscale-[30%]" />)}
          </section>
        ),
        about: () => (
          <section className="px-6 py-24 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-s-muted">{title(b, "about", d.about)}</p>
            <p className="mt-6 max-w-4xl font-editorial text-3xl italic leading-snug md:text-5xl">"{w.about}"</p>
          </section>
        ),
        form: () => (
          <section className="bg-s-surface px-6 py-20 md:px-10">
            <div className="grid gap-10 md:grid-cols-12">
              <h2 className="font-editorial text-4xl md:col-span-4 md:text-5xl">{c.cta[w.language]}</h2>
              <div className="md:col-span-8"><SiteForm {...p} fieldClass={field} buttonClass="bg-s-accent px-8 py-3 text-xs uppercase tracking-widest text-s-accent-ink" labelClass="text-xs uppercase tracking-widest text-s-muted" /></div>
            </div>
          </section>
        ),
        hours: () => <section className="grid gap-6 px-6 py-16 md:grid-cols-12 md:px-10"><h2 className="font-editorial text-3xl md:col-span-4">{title(b, "hours", d.hours)}</h2><HoursList b={b} className="md:col-span-5" /></section>,
        location: () => <section className="grid gap-6 border-t border-s-line px-6 py-16 md:grid-cols-12 md:px-10"><h2 className="font-editorial text-3xl md:col-span-4">{title(b, "location", d.location)}</h2><p className="md:col-span-8">{b.address}<br />{b.postalCode} {b.city}</p></section>,
        contact: () => (
          <section className="grid gap-6 border-t border-s-line px-6 py-16 md:grid-cols-12 md:px-10">
            <h2 className="font-editorial text-3xl md:col-span-4">{title(b, "contact", d.contact)}</h2>
            <div className="space-y-2 md:col-span-8">
              {b.phone && <a href={`tel:${b.phone}`} className="block text-xl">{b.phone}</a>}
              {b.email && <a href={`mailto:${b.email}`} className="block text-xl">{b.email}</a>}
            </div>
          </section>
        ),
      })}
      <Footer p={p} className="border-t border-s-line" />
    </div>
  );
}

/* ---------------- Trades: electrician & plumber share structure ideas, distinct styling ---------------- */
function TradeSite(p: SiteProps & { kind: "elec" | "plumb" }) {
  const { business: b, services, kind } = p; const d = sd(b); const c = CATEGORIES[b.category]; const w = b.website;
  const elec = kind === "elec";
  const font = elec ? "font-plex" : "font-manrope";
  const r = w.style === "modern" ? "rounded-2xl" : elec ? "rounded-sm" : "rounded-lg";
  const Icon = elec ? Zap : Droplets;
  const field = cn("w-full border border-s-line bg-s-bg px-3 py-2.5 outline-none focus:border-s-accent", r);
  const btn = cn("inline-flex items-center justify-center gap-2 bg-s-accent px-6 py-3 font-semibold text-s-accent-ink", r);
  const call = b.phone && <a href={`tel:${b.phone}`} className={cn("inline-flex items-center justify-center gap-2 border-2 border-s-ink px-6 py-3 font-semibold", r)}><Phone className="size-4" />{b.phone}</a>;
  return (
    <div className={cn("site min-h-full bg-s-bg text-s-ink", font)} data-palette={w.palette}>
      {elec && <div className="bg-s-ink px-6 py-2 text-center text-xs text-s-bg md:px-10">{b.serviceAreas.slice(0, 4).join(" · ")} {b.phone && `· ${b.phone}`}</div>}
      <header className="flex items-center justify-between border-b border-s-line px-6 py-4 md:px-10">
        <span className="flex items-center gap-2 text-lg font-bold"><span className={cn("grid size-8 place-items-center bg-s-accent text-s-accent-ink", r)}><Icon className="size-4" /></span>{b.name}</span>
        <a href="#form" className={cn(btn, "hidden px-4 py-2 text-sm sm:inline-flex")}>{c.cta[w.language]}</a>
      </header>
      {render(p, {
        hero: () => (
          <section className={cn(elec ? "bg-s-surface" : "bg-s-bg")}>
            <div className={cn("grid items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-10 md:py-20", w.layout === "b" && "md:[&>*:first-child]:order-2")}>
              <div>
                <h1 className={cn("text-4xl font-bold leading-tight md:text-5xl", !elec && "font-extrabold tracking-tight")}>{w.heroTitle}</h1>
                <p className="mt-5 max-w-lg text-lg text-s-muted">{w.heroSubtitle}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#form" className={btn}>{c.cta[w.language]} <ArrowRight className="size-4" /></a>{call}</div>
                {b.serviceAreas.length > 0 && <p className="mt-6 flex items-center gap-2 text-sm text-s-muted"><MapPin className="size-4" />{b.serviceAreas.join(", ")}</p>}
              </div>
              <div className="relative">
                <img src={w.heroImage} alt="" className={cn("aspect-[4/3] w-full object-cover", r)} />
                {!elec && <div className={cn("absolute -bottom-5 left-5 flex items-center gap-3 bg-s-bg p-4 shadow-lg", r)}><Clock className="size-5 text-s-accent" /><div className="text-sm"><p className="font-bold">{d.hours}</p><p className="text-s-muted">{b.hours.find((h) => !h.closed)?.open} – {b.hours.find((h) => !h.closed)?.close}</p></div></div>}
              </div>
            </div>
          </section>
        ),
        services: () => (
          <section className="px-6 py-20 md:px-10">
            <h2 className="text-3xl font-bold">{title(b, "services", d.services)}</h2>
            <div className={cn("mt-10 grid gap-4", elec ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {services.filter((s) => s.visible).map((s) => (
                <div key={s.id} className={cn("border border-s-line p-6", r, elec ? "border-l-4 border-l-s-accent" : "bg-s-surface")}>
                  <div className="flex items-start justify-between gap-4"><h3 className="text-lg font-semibold">{s.name}</h3><span className="whitespace-nowrap text-sm font-semibold text-s-accent">{priceLabel(b, s.price)}</span></div>
                  <p className="mt-2 text-sm text-s-muted">{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        ),
        areas: () => (
          <section className={cn("px-6 py-16 md:px-10", elec ? "bg-s-ink text-s-bg" : "bg-s-surface")}>
            <h2 className="text-2xl font-bold">{title(b, "areas", d.areas)}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {(b.serviceAreas.length ? b.serviceAreas : [b.city]).map((a) => <span key={a} className={cn("flex items-center gap-1.5 border px-3 py-1.5 text-sm", r, elec ? "border-s-bg/30" : "border-s-line bg-s-bg")}><MapPin className="size-3.5" />{a}</span>)}
            </div>
          </section>
        ),
        about: () => (
          <section className="grid gap-8 px-6 py-20 md:grid-cols-2 md:px-10">
            <h2 className="text-3xl font-bold">{title(b, "about", d.about)}</h2>
            <p className="text-lg leading-relaxed text-s-muted">{w.about}</p>
          </section>
        ),
        process: () => (
          <section className="border-y border-s-line px-6 py-16 md:px-10">
            <h2 className="text-2xl font-bold">{title(b, "process", d.process)}</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {[[d.p1, d.p1d], [d.p2, d.p2d], [d.p3, d.p3d]].map(([t, x], i) => (
                <li key={i} className="flex gap-4"><span className={cn("grid size-9 shrink-0 place-items-center bg-s-accent font-bold text-s-accent-ink", r)}>{i + 1}</span><div><p className="font-semibold">{t}</p><p className="text-sm text-s-muted">{x}</p></div></li>
              ))}
            </ol>
          </section>
        ),
        form: () => (
          <section className={cn("px-6 py-20 md:px-10", elec ? "bg-s-surface" : "bg-s-bg")}>
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="text-3xl font-bold">{c.cta[w.language]}</h2>
                <ul className="mt-6 space-y-3 text-sm">{[d.p1d, d.p2d].map((x) => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-s-accent" />{x}</li>)}</ul>
                <div className="mt-8">{call}</div>
              </div>
              <div className={cn("border border-s-line bg-s-bg p-6", r)}><SiteForm {...p} fieldClass={field} buttonClass={cn(btn, "w-full")} labelClass="font-medium" /></div>
            </div>
          </section>
        ),
        hours: () => <section className="px-6 py-16 md:px-10"><div className="max-w-md"><h2 className="mb-6 flex items-center gap-2 text-2xl font-bold"><Clock className="size-5 text-s-accent" />{title(b, "hours", d.hours)}</h2><HoursList b={b} /></div></section>,
        contact: () => (
          <section className="grid gap-4 px-6 pb-16 md:grid-cols-3 md:px-10">
            {[[Phone, b.phone, `tel:${b.phone}`], [Mail, b.email, `mailto:${b.email}`], [MapPin, `${b.address}, ${b.city}`, undefined]].filter(([, v]) => v).map(([I, v, href], i) => {
              const Ic = I as typeof Phone;
              return <a key={i} href={href as string | undefined} className={cn("flex items-center gap-3 border border-s-line p-5", r)}><Ic className="size-5 text-s-accent" /><span className="text-sm font-medium">{v as string}</span></a>;
            })}
          </section>
        ),
        faq: () => (
          <section className="px-6 py-16 md:px-10"><h2 className="text-2xl font-bold">{title(b, "faq", d.faq)}</h2>
            <dl className="mt-6 space-y-5">{[[d.faq1q, d.faq1a], [d.faq2q, d.faq2a]].map(([q, a]) => <div key={q}><dt className="font-semibold">{q}</dt><dd className="text-s-muted">{a}</dd></div>)}</dl>
          </section>
        ),
      })}
      {b.phone && <a href={`tel:${b.phone}`} className="fixed bottom-4 right-4 z-10 grid size-14 place-items-center rounded-full bg-s-accent text-s-accent-ink shadow-lg sm:hidden" aria-label={d.call}><Phone className="size-5" /></a>}
      <Footer p={p} className="border-t border-s-line" />
    </div>
  );
}
export const ElectricianSite = (p: SiteProps) => <TradeSite {...p} kind="elec" />;
export const PlumberSite = (p: SiteProps) => <TradeSite {...p} kind="plumb" />;

/* ---------------- Other: neutral flexible ---------------- */
export function OtherSite(p: SiteProps) {
  const { business: b, services } = p; const d = sd(b); const c = CATEGORIES[b.category]; const w = b.website;
  const field = "w-full rounded-md border border-s-line bg-s-bg px-3 py-2.5 outline-none focus:border-s-accent";
  return (
    <div className="site min-h-full bg-s-bg text-s-ink" data-palette={w.palette}>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"><span className="text-lg font-semibold">{b.name}</span><a href="#form" className="rounded-md bg-s-accent px-4 py-2 text-sm text-s-accent-ink">{c.cta[w.language]}</a></header>
      {render(p, {
        hero: () => <section className="mx-auto max-w-5xl px-6 py-16"><h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{w.heroTitle}</h1><p className="mt-5 max-w-xl text-lg text-s-muted">{w.heroSubtitle}</p><img src={w.heroImage} alt="" className="mt-12 aspect-[21/9] w-full rounded-xl object-cover" /></section>,
        services: () => <section className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-2xl font-semibold">{title(b, "services", d.services)}</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{services.filter((s) => s.visible).map((s) => <div key={s.id} className="rounded-xl bg-s-surface p-6"><div className="flex justify-between gap-4"><h3 className="font-medium">{s.name}</h3><span className="text-sm text-s-muted">{priceLabel(b, s.price)}</span></div><p className="mt-2 text-sm text-s-muted">{s.description}</p></div>)}</div></section>,
        gallery: () => <section className="mx-auto max-w-5xl px-6 py-16"><Gallery b={b} className="[&_img]:rounded-lg" /></section>,
        about: () => <section className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-2xl font-semibold">{title(b, "about", d.about)}</h2><p className="mt-4 max-w-2xl text-lg text-s-muted">{w.about}</p></section>,
        areas: () => <section className="mx-auto max-w-5xl px-6 py-12"><h2 className="text-xl font-semibold">{title(b, "areas", d.areas)}</h2><p className="mt-2 text-s-muted">{(b.serviceAreas.length ? b.serviceAreas : [b.city]).join(", ")}</p></section>,
        process: () => <section className="mx-auto max-w-5xl px-6 py-12"><h2 className="text-xl font-semibold">{title(b, "process", d.process)}</h2><ol className="mt-6 grid gap-4 md:grid-cols-3">{[[d.p1, d.p1d], [d.p2, d.p2d], [d.p3, d.p3d]].map(([t, x]) => <li key={t} className="rounded-lg border border-s-line p-5"><p className="font-medium">{t}</p><p className="text-sm text-s-muted">{x}</p></li>)}</ol></section>,
        form: () => <section className="mx-auto max-w-5xl px-6 py-16"><div className="rounded-2xl bg-s-surface p-6 md:p-10"><h2 className="text-2xl font-semibold">{c.cta[w.language]}</h2><div className="mt-6 max-w-xl"><SiteForm {...p} fieldClass={field} buttonClass="rounded-md bg-s-accent px-6 py-3 text-sm font-medium text-s-accent-ink" /></div></div></section>,
        hours: () => <section className="mx-auto max-w-5xl px-6 py-12"><h2 className="mb-4 text-xl font-semibold">{title(b, "hours", d.hours)}</h2><HoursList b={b} className="max-w-sm" /></section>,
        location: () => <section className="mx-auto max-w-5xl px-6 py-8"><h2 className="text-xl font-semibold">{title(b, "location", d.location)}</h2><p className="mt-2 text-s-muted">{b.address}, {b.postalCode} {b.city}</p></section>,
        contact: () => <section className="mx-auto flex max-w-5xl flex-wrap gap-6 px-6 py-12 text-sm">{b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2"><Phone className="size-4" />{b.phone}</a>}{b.email && <a href={`mailto:${b.email}`} className="flex items-center gap-2"><Mail className="size-4" />{b.email}</a>}</section>,
        faq: () => <section className="mx-auto max-w-5xl px-6 py-12"><h2 className="text-xl font-semibold">{title(b, "faq", d.faq)}</h2><dl className="mt-4 space-y-4">{[[d.faq1q, d.faq1a], [d.faq2q, d.faq2a]].map(([q, a]) => <div key={q}><dt className="font-medium">{q}</dt><dd className="text-s-muted">{a}</dd></div>)}</dl></section>,
      })}
      <Footer p={p} />
    </div>
  );
}

export function SiteRenderer(p: SiteProps) {
  switch (CATEGORIES[p.business.category].template) {
    case "nail": return <NailSite {...p} />;
    case "hair": return <HairSite {...p} />;
    case "electrician": return <ElectricianSite {...p} />;
    case "plumber": return <PlumberSite {...p} />;
    default: return <OtherSite {...p} />;
  }
}
