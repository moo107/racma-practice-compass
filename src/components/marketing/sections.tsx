import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Bell, CalendarCheck, Check, Globe, Inbox, Languages, LayoutDashboard, ListChecks, MessageSquareWarning,
  Smartphone, Sparkles, Tag, Users, FileX, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CATEGORIES } from "@/config/categories";
import { IMG } from "@/config/images";
import { useApp } from "@/store/app-store";
import type { DictKey } from "@/i18n/dict";
import { SectionHead } from "./MarketingLayout";
import { LogoSymbol } from "@/components/brand/Logo";

const wrap = "mx-auto max-w-6xl px-5";

export function Hero() {
  const { t } = useApp();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className={`${wrap} relative pb-20 pt-16 md:pt-24`}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />{t("hero.eyebrow")}
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">{t("hero.title")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">{t("hero.sub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/signup">{t("hero.cta")} <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/how-it-works">{t("hero.cta2")}</Link></Button>
          </div>
        </div>
        <HeroDemo />
        <p className="mt-4 text-center text-xs text-muted-foreground">{t("hero.demoNote")}</p>
      </div>
    </section>
  );
}

function HeroDemo() {
  const { t } = useApp();
  return (
    <div className="relative mx-auto mt-16 grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1.3fr]">
      {/* Public website */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-float">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" />
          <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">/s/studio-lune</span>
        </div>
        <div className="site" data-palette="nail-blush">
          <div className="bg-s-bg p-4 text-s-ink">
            <p className="font-serif-elegant text-xl italic">Studio Lune</p>
            <img src={IMG.nail1.replace("w=1600", "w=600")} alt="" className="mt-3 h-28 w-full rounded-md object-cover" />
            <p className="mt-3 font-serif-elegant text-lg leading-tight">Beautiful nails, carefully done.</p>
            <div className="mt-3 inline-block rounded-full bg-s-accent px-3 py-1 text-[11px] text-s-accent-ink">Book an appointment</div>
          </div>
        </div>
        <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">{t("demo.site")}</p>
      </div>
      {/* Request in transit */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-56 rounded-lg border border-border bg-card p-3 shadow-soft md:w-48">
          <div className="flex items-center gap-2 text-xs font-medium"><Inbox className="size-3.5 text-accent" />{t("demo.request")}</div>
          <p className="mt-2 text-sm font-medium">Sanne de Vries</p>
          <p className="text-xs text-muted-foreground">Gel manicure · Sat 10:00</p>
        </div>
        <ArrowRight className="size-5 rotate-90 text-muted-foreground md:rotate-0" />
      </div>
      {/* Dashboard */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-float">
        <div className="flex">
          <div className="hidden w-12 flex-col items-center gap-3 border-r border-border bg-sidebar py-3 sm:flex">
            <LogoSymbol tile className="size-6" />
            {[LayoutDashboard, Inbox, CalendarCheck, Users].map((I, i) => <I key={i} className={`size-4 ${i === 1 ? "text-foreground" : "text-muted-foreground"}`} />)}
          </div>
          <div className="flex-1 p-4">
            <p className="text-xs text-muted-foreground">{t("demo.dashboard")}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[["3", t("ov.new")], ["2", t("ov.pending")], ["1", t("ov.followups")]].map(([n, l]) => (
                <div key={l} className="rounded-md border border-border p-2"><p className="text-lg font-semibold">{n}</p><p className="truncate text-[10px] text-muted-foreground">{l}</p></div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {[["Sanne de Vries", "st.new", true], ["Lars Jansen", "st.contacted", false], ["Emma Bakker", "st.won", false]].map(([n, s, hi]) => (
                <div key={n as string} className={`flex items-center justify-between rounded-md px-2 py-1.5 text-xs ${hi ? "bg-accent-soft" : ""}`}>
                  <span className="font-medium">{n as string}</span>
                  <span className="text-muted-foreground">{t(s as DictKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Problems() {
  const { t } = useApp();
  const items = [[MessageSquareWarning, "problems.1"], [FileX, "problems.2"], [Brain, "problems.3"]] as const;
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow={t("problems.eyebrow")} title={t("problems.title")} />
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {items.map(([I, k]) => (
          <div key={k} className="bg-background p-7">
            <I className="size-5 text-muted-foreground" />
            <h3 className="mt-4 font-medium">{t(`${k}.t` as DictKey)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`${k}.d` as DictKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Solution() {
  const { t } = useApp();
  const items = [[Globe, "solution.1"], [Users, "solution.2"], [LayoutDashboard, "solution.3"]] as const;
  return (
    <section className="border-y border-border bg-secondary py-24">
      <div className={wrap}>
        <SectionHead eyebrow={t("solution.eyebrow")} title={t("solution.title")} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(([I, k], i) => (
            <div key={k} className="rounded-xl border border-border bg-card p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent"><I className="size-5" /></span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-medium">{t(`${k}.t` as DictKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`${k}.d` as DictKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXAMPLES = [
  { cat: "nail", slug: "demo-nail-studio" }, { cat: "hair", slug: "demo-hair-salon" },
  { cat: "electrician", slug: "demo-electrician" }, { cat: "plumber", slug: "demo-plumber" },
] as const;

export function Categories() {
  const { t, lang } = useApp();
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow={t("cats.eyebrow")} title={t("cats.title")} sub={t("cats.sub")} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EXAMPLES.map(({ cat, slug }) => {
          const c = CATEGORIES[cat];
          return (
            <Link key={cat} to="/s/$slug" params={{ slug }} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-float">
              <div className="aspect-[4/3] overflow-hidden"><img src={c.image.replace("w=1600", "w=700")} alt={c.name[lang]} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-5">
                <h3 className="font-medium">{c.name[lang]}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.marketing[lang]}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm text-accent">{t("cats.view")} <ArrowRight className="size-3.5" /></p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Features() {
  const { t } = useApp();
  const items = [
    [Sparkles, "f.website"], [Inbox, "f.requests"], [CalendarCheck, "f.appointments"], [Users, "f.customers"],
    [Tag, "f.services"], [ListChecks, "f.followups"], [Languages, "f.language"], [Smartphone, "f.mobile"],
  ] as const;
  return (
    <section className="border-y border-border bg-secondary py-24">
      <div className={wrap}>
        <SectionHead eyebrow={t("features.eyebrow")} title={t("features.title")} />
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([I, k]) => (
            <div key={k}>
              <I className="size-5 text-accent" />
              <h3 className="mt-3 font-medium">{t(k as DictKey)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(`${k}.d` as DictKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Examples() {
  const { t, lang } = useApp();
  const styles = [
    { cat: "nail", font: "font-serif-elegant italic", palette: "nail-blush" },
    { cat: "hair", font: "font-editorial uppercase tracking-widest", palette: "hair-mono" },
    { cat: "electrician", font: "font-plex font-bold", palette: "elec-navy" },
    { cat: "plumber", font: "font-manrope font-extrabold", palette: "plumb-teal" },
  ] as const;
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow={t("examples.eyebrow")} title={t("examples.title")} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {styles.map(({ cat, font, palette }, i) => {
          const c = CATEGORIES[cat];
          return (
            <Link key={cat} to="/s/$slug" params={{ slug: EXAMPLES[i]!.slug }} className="site group block overflow-hidden rounded-xl border border-border" data-palette={palette}>
              <div className="relative h-64 bg-s-bg text-s-ink">
                <img src={c.image.replace("w=1600", "w=900")} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 bg-s-bg/95 p-5">
                  <p className={`text-xl ${font}`}>{c.heroTitle[lang]}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-s-accent px-3 py-1 text-xs text-s-accent-ink">{c.cta[lang]}</span>
                    <span className="text-xs text-s-muted">{c.name[lang]}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{t("examples.demo")}</p>
    </section>
  );
}

export function DashboardPreview() {
  const { t } = useApp();
  const rows = [
    ["Sanne de Vries", "Gel manicure", "st.new"], ["Lars Jansen", "BIAB natural nails", "st.contacted"],
    ["Emma Bakker", "Pedicure with polish", "st.quote_sent"], ["Daan Visser", "Acrylic full set", "st.won"],
  ];
  return (
    <section className="border-y border-border bg-foreground py-24 text-background">
      <div className={wrap}>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">{t("dash.eyebrow")}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{t("dash.title")}</h2>
          <p className="mt-4 text-lg text-background/70">{t("dash.sub")}</p>
        </div>
        <div className="mt-12 overflow-hidden rounded-xl border border-background/15 bg-background text-foreground">
          <div className="grid md:grid-cols-[200px_1fr]">
            <aside className="hidden border-r border-border bg-sidebar p-4 md:block">
              <div className="mb-6 flex items-center gap-2"><LogoSymbol tile className="size-7" /><span className="text-sm font-medium">Studio Lune</span></div>
              {[[LayoutDashboard, "app.overview"], [Inbox, "app.requests"], [CalendarCheck, "app.appointments"], [Users, "app.customers"], [Bell, "app.notifications"]].map(([I, k], i) => {
                const Icon = I as typeof Inbox;
                return <div key={k as string} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${i === 0 ? "bg-sidebar-accent font-medium" : "text-muted-foreground"}`}><Icon className="size-4" />{t(k as DictKey)}</div>;
              })}
            </aside>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[["3", "ov.new"], ["2", "ov.pending"], ["2", "ov.followups"], ["8", "ov.customers"]].map(([n, k]) => (
                  <div key={k} className="rounded-lg border border-border p-4"><p className="text-xs text-muted-foreground">{t(k as DictKey)}</p><p className="mt-1 text-2xl font-semibold">{n}</p></div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-border">
                <p className="border-b border-border px-4 py-3 text-sm font-medium">{t("ov.recent")}</p>
                {rows.map(([n, s, st]) => (
                  <div key={n} className="flex items-center justify-between border-b border-border px-4 py-3 text-sm last:border-0">
                    <div><p className="font-medium">{n}</p><p className="text-xs text-muted-foreground">{s}</p></div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{t(st as DictKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-background/60">{t("hero.demoNote")}</p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useApp();
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow={t("how.eyebrow")} title={t("how.title")} />
      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="border-t-2 border-foreground pt-5">
            <span className="font-mono text-sm text-muted-foreground">0{n}</span>
            <h3 className="mt-2 font-medium">{t(`how.${n}.t` as DictKey)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`how.${n}.d` as DictKey)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export const PLANS = [
  { id: "starter", name: "Starter", price: 19, features: { en: ["Sector-specific professional website", "Customer request form", "Services & price list", "Request inbox", "Dutch or English website"], nl: ["Professionele website voor jouw branche", "Klantformulier", "Diensten & prijslijst", "Aanvragen-inbox", "Website in Nederlands of Engels"] } },
  { id: "pro", name: "Pro", price: 39, features: { en: ["Everything in Starter", "Appointment requests", "Customer overview & history", "Follow-ups & internal notes", "Status tracking"], nl: ["Alles uit Starter", "Afspraakverzoeken", "Klantoverzicht & geschiedenis", "Opvolging & interne notities", "Statusoverzicht"] } },
  { id: "business", name: "Business", price: 69, features: { en: ["Everything in Pro", "Multiple team members (planned)", "Additional website sections", "Priority support", "Custom domain (planned)"], nl: ["Alles uit Pro", "Meerdere teamleden (gepland)", "Extra websitesecties", "Voorrang bij support", "Eigen domeinnaam (gepland)"] } },
] as const;

export function Pricing() {
  const { t, lang } = useApp();
  return (
    <section className="border-y border-border bg-secondary py-24">
      <div className={wrap}>
        <SectionHead center eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} sub={t("pricing.note")} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => {
            const pop = p.id === "pro";
            return (
              <div key={p.id} className={`flex flex-col rounded-xl border bg-card p-7 ${pop ? "border-foreground shadow-float" : "border-border"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.name}</h3>
                  {pop && <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs text-background">{t("pricing.popular")}</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t(`plan.${p.id}.d` as DictKey)}</p>
                <p className="mt-6"><span className="text-4xl font-semibold tracking-tight">€{p.price}</span><span className="text-sm text-muted-foreground">{t("pricing.month")}</span></p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features[lang].map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{f}</li>)}
                </ul>
                <Button asChild className="mt-8" variant={pop ? "default" : "outline"}><Link to="/signup">{t("pricing.choose")} {p.name}</Link></Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useApp();
  return (
    <section className={`${wrap} grid gap-10 py-24 md:grid-cols-[1fr_1.5fr]`}>
      <SectionHead eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
      <Accordion type="single" collapsible className="w-full">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <AccordionItem key={n} value={`q${n}`}>
            <AccordionTrigger className="text-left">{t(`faq.${n}.q` as DictKey)}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{t(`faq.${n}.a` as DictKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCta() {
  const { t } = useApp();
  return (
    <section className={`${wrap} pb-24`}>
      <div className="rounded-2xl border border-border bg-secondary px-6 py-16 text-center">
        <LogoSymbol tile className="mx-auto size-12" />
        <h2 className="mx-auto mt-6 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">{t("final.title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("final.sub")}</p>
        <Button asChild size="lg" className="mt-8"><Link to="/signup">{t("hero.cta")} <ArrowRight /></Link></Button>
      </div>
    </section>
  );
}
