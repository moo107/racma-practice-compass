import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ImagePlus, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LangSelect } from "@/components/marketing/LangSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CATEGORY_ORDER } from "@/config/categories";
import { defaultHours } from "@/config/demo";
import type { CategoryId, Lang, OpeningHour } from "@/config/types";
import { SITE_DICT } from "@/i18n/dict";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your business — RACMA" }, { name: "description", content: "Choose your business category and create your professional website in a few guided steps." }, { property: "og:title", content: "Set up your business — RACMA" }, { property: "og:description", content: "Create your professional business website in a few guided steps." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Onboarding,
});

function Onboarding() {
  const { t, lang, createFromOnboarding } = useApp();
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState<CategoryId | null>(null);
  const [siteLang, setSiteLang] = useState<Lang>("nl");
  const [f, setF] = useState({ name: "", description: "", email: "", phone: "", address: "", postalCode: "", city: "", areas: "" });
  const [hours, setHours] = useState<OpeningHour[]>(defaultHours("nail"));
  const [photos, setPhotos] = useState<string[]>([]);
  const c = cat ? CATEGORIES[cat] : null;
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const pick = (id: CategoryId) => { setCat(id); setHours(defaultHours(id)); };
  const canNext = step === 1 ? !!cat : step === 2 ? f.name.trim().length > 1 && /\S+@\S+/.test(f.email) : true;

  const finish = () => {
    if (!cat) return;
    createFromOnboarding(cat, {
      name: f.name.trim(), description: f.description.trim(), email: f.email.trim(), phone: f.phone.trim(),
      address: f.address.trim(), postalCode: f.postalCode.trim(), city: f.city.trim(),
      serviceAreas: f.areas.split(",").map((s) => s.trim()).filter(Boolean), hours, photos,
    }, siteLang);
    nav({ to: "/app/website" });
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/"><Logo /></Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">{t("ob.step")} {step} {t("ob.of")} 3</span>
            <LangSelect />
          </div>
        </div>
        <div className="h-0.5 bg-border"><div className="h-full bg-accent transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12">
        {step === 1 && (
          <>
            <Head title={t("ob.1.t")} sub={t("ob.1.s")} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORY_ORDER.filter((id) => id !== "other").map((id) => {
                const k = CATEGORIES[id]; const sel = cat === id;
                return (
                  <button key={id} onClick={() => pick(id)} aria-pressed={sel}
                    className={cn("group relative overflow-hidden rounded-xl border-2 bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-float", sel ? "border-accent shadow-float" : "border-transparent shadow-soft")}>
                    <div className="aspect-[4/3] overflow-hidden"><img src={k.image.replace("w=1600", "w=600")} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                    <div className="p-4"><p className="font-medium">{k.name[lang]}</p><p className="text-sm text-muted-foreground">{k.short[lang]}</p></div>
                    {sel && <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="size-4" /></span>}
                  </button>
                );
              })}
            </div>
            <button onClick={() => pick("other")} aria-pressed={cat === "other"}
              className={cn("mt-4 flex w-full items-center justify-between rounded-xl border-2 bg-card p-5 text-left transition-all hover:shadow-soft", cat === "other" ? "border-accent" : "border-transparent")}>
              <div><p className="font-medium">{CATEGORIES.other.name[lang]}</p><p className="text-sm text-muted-foreground">{CATEGORIES.other.short[lang]}</p></div>
              {cat === "other" ? <Check className="size-5 text-accent" /> : <ArrowRight className="size-5 text-muted-foreground" />}
            </button>
          </>
        )}

        {step === 2 && c && (
          <>
            <Head title={t("ob.2.t")} sub={t("ob.2.s")} />
            <div className="mx-auto mt-10 max-w-2xl space-y-6 rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
              <Field label={t("ob.name")} id="name"><Input id="name" value={f.name} onChange={set("name")} maxLength={80} /></Field>
              <p className="-mt-3 text-xs text-muted-foreground">{t("ob.logo.hint")}</p>
              <Field label={t("ob.desc")} id="desc"><Textarea id="desc" value={f.description} onChange={set("description")} placeholder={t("ob.desc.ph")} maxLength={240} rows={2} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("auth.email")} id="email"><Input id="email" type="email" value={f.email} onChange={set("email")} /></Field>
                <Field label={t("ob.phone")} id="phone"><Input id="phone" type="tel" value={f.phone} onChange={set("phone")} /></Field>
              </div>
              <Field label={t("ob.address")} id="addr"><Input id="addr" value={f.address} onChange={set("address")} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("ob.postal")} id="pc"><Input id="pc" value={f.postalCode} onChange={set("postalCode")} /></Field>
                <Field label={t("ob.city")} id="city"><Input id="city" value={f.city} onChange={set("city")} /></Field>
              </div>
              {c.usesServiceAreas && <Field label={t("ob.areas")} id="areas"><Input id="areas" value={f.areas} onChange={set("areas")} placeholder={t("ob.areas.ph")} /></Field>}
              <div>
                <Label>{t("ob.hours")}</Label>
                <div className="mt-2 divide-y divide-border rounded-lg border border-border">
                  {hours.map((h, i) => (
                    <div key={h.day} className="flex flex-wrap items-center gap-3 px-3 py-2 text-sm">
                      <span className="w-24 capitalize">{SITE_DICT[lang].days[h.day]}</span>
                      <label className="flex items-center gap-1.5 text-muted-foreground"><input type="checkbox" checked={h.closed} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, closed: e.target.checked } : x))} />{t("ob.closed")}</label>
                      {!h.closed && <span className="ml-auto flex items-center gap-1">
                        <Input type="time" className="h-8 w-28" value={h.open} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, open: e.target.value } : x))} />–
                        <Input type="time" className="h-8 w-28" value={h.close} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, close: e.target.value } : x))} />
                      </span>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>{t("ob.photos")} <span className="font-normal text-muted-foreground">({t("ob.optional")})</span></Label>
                <p className="mt-1 text-xs text-muted-foreground">{t("ob.photos.hint")}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {photos.map((p, i) => (
                    <div key={i} className="relative"><img src={p} alt="" className="size-20 rounded-md object-cover" />
                      <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-foreground text-background" aria-label="Remove"><X className="size-3" /></button></div>
                  ))}
                  {photos.length < 6 && <label className="grid size-20 cursor-pointer place-items-center rounded-md border border-dashed border-border text-muted-foreground hover:bg-muted">
                    <ImagePlus className="size-5" />
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => {
                      Array.from(e.target.files ?? []).slice(0, 6 - photos.length).forEach((file) => {
                        if (file.size > 3_000_000) return;
                        const r = new FileReader(); r.onload = () => setPhotos((p) => [...p, String(r.result)]); r.readAsDataURL(file);
                      });
                    }} />
                  </label>}
                </div>
              </div>
              <div>
                <Label>{t("ob.siteLang")}</Label>
                <p className="mt-1 text-xs text-muted-foreground">{t("ob.siteLang.hint")}</p>
                <div className="mt-2 flex gap-2">
                  {([["nl", "Nederlands"], ["en", "English"]] as const).map(([l, n]) => (
                    <button key={l} onClick={() => setSiteLang(l)} className={cn("rounded-md border px-4 py-2 text-sm", siteLang === l ? "border-foreground bg-foreground text-background" : "border-border")}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && c && (
          <>
            <Head title={t("ob.3.t")} sub={t("ob.3.s")} />
            <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <img src={photos[0] ?? c.image.replace("w=1600", "w=900")} alt="" className="aspect-video w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.name[lang]}</p>
                  <p className="mt-1 text-2xl font-semibold">{f.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.direction[lang]}</p>
                </div>
              </div>
              <div className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-soft">
                <Info label={t("ob.cta")}>{c.cta[siteLang]}</Info>
                <Info label={t("ob.form")}>{c.formType}</Info>
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{t("ob.includes")}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{c.defaultSections.map((s) => <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs">{SITE_DICT[siteLang][s as keyof typeof SITE_DICT.en] as string ?? s}</span>)}</div></div>
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{t("ob.tools")}</p>
                  <ul className="mt-2 space-y-1.5 text-sm">{c.tools.map((x) => <li key={x.en} className="flex gap-2"><Check className="size-4 text-accent" />{x[lang]}</li>)}</ul></div>
              </div>
            </div>
          </>
        )}

        <div className="mx-auto mt-10 flex max-w-2xl justify-between">
          {step > 1 ? <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft />{t("ob.back")}</Button> : <span />}
          {step < 3
            ? <Button size="lg" disabled={!canNext} onClick={() => setStep(step + 1)}>{t("ob.next")}<ArrowRight /></Button>
            : <Button size="lg" onClick={finish}>{t("ob.finish")}<ArrowRight /></Button>}
        </div>
      </main>
    </div>
  );
}

const Head = ({ title, sub }: { title: string; sub: string }) => (
  <div className="text-center"><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1><p className="mt-3 text-muted-foreground">{sub}</p></div>
);
const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
  <div className="space-y-1.5"><Label htmlFor={id}>{label}</Label>{children}</div>
);
const Info = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 font-medium capitalize">{children}</p></div>
);
