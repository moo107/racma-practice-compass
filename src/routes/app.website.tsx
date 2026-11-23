import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Globe, ImagePlus, Info, Monitor, Share2, Smartphone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, Panel } from "@/components/app/ui";
import { SiteRenderer } from "@/components/sites/templates";
import { CATEGORIES } from "@/config/categories";
import type { Lang, SectionId, WebsiteConfig } from "@/config/types";
import { SITE_DICT } from "@/i18n/dict";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/website")({
  head: () => ({ meta: [{ title: "My Website — RACMA" }, { name: "description", content: "Customise and preview your business website." }, { property: "og:title", content: "My Website — RACMA" }, { property: "og:description", content: "Customise and preview your business website." }] }),
  component: WebsitePage,
});

const sectionLabel = (id: SectionId, l: Lang) => {
  const d = SITE_DICT[l] as Record<string, unknown>;
  return id === "hero" ? "Hero" : id === "form" ? (l === "nl" ? "Formulier" : "Request form") : String(d[id] ?? id);
};

function WebsitePage() {
  const { t, lang, business, services, setBusiness } = useApp();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [preview, setPreview] = useState(false);
  const [publish, setPublish] = useState(false);
  const c = CATEGORIES[business.category];
  const w = business.website;
  const setW = (patch: Partial<WebsiteConfig>) => setBusiness({ ...business, website: { ...w, ...patch } });
  const move = (i: number, dir: -1 | 1) => {
    const s = [...w.sections]; const j = i + dir;
    if (j < 0 || j >= s.length || s[i]!.id === "hero" || s[j]!.id === "hero") return;
    [s[i], s[j]] = [s[j]!, s[i]!]; setW({ sections: s });
  };
  const url = `/s/${business.slug}`;

  const frame = (
    <div className={cn("mx-auto overflow-hidden rounded-xl border border-border bg-background shadow-float transition-all", device === "mobile" ? "w-[375px] max-w-full" : "w-full")}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2"><span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" /><span className="size-2 rounded-full bg-border" /><span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{url}</span></div>
      <div className={cn("overflow-y-auto", device === "mobile" ? "h-[680px]" : "h-[720px]")}>
        <div className={device === "desktop" ? "origin-top-left" : ""} style={device === "mobile" ? { containerType: "inline-size" } : undefined}>
          <SiteRenderer business={business} services={services} compact={device === "mobile"} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title={t("app.website")} sub={`${c.name[lang]} · ${c.direction[lang]}`}
        actions={<><Button variant="outline" onClick={() => setPreview(true)}><Eye />{t("ws.preview")}</Button><Button onClick={() => setPublish(true)}><Globe />{t("ws.publish")}</Button></>} />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Panel className="p-4"><p className="text-xs text-muted-foreground">{t("ws.status")}</p><p className="mt-1 text-sm font-medium">{t("ov.draft")}</p></Panel>
        <Panel className="p-4 sm:col-span-2"><p className="text-xs text-muted-foreground">{t("ws.url")}</p><p className="mt-1 font-mono text-sm">{`racma.app${url}`}</p><p className="text-xs text-muted-foreground">{t("ws.urlNote")}</p></Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Panel>
          <Tabs defaultValue="appearance" className="p-4">
            <TabsList className="w-full"><TabsTrigger value="appearance">{t("ws.appearance")}</TabsTrigger><TabsTrigger value="content">{t("ws.content")}</TabsTrigger><TabsTrigger value="sections">{t("ws.sections")}</TabsTrigger></TabsList>

            <TabsContent value="appearance" className="space-y-6 pt-4">
              <Group label={t("ws.palette")}>
                <div className="grid grid-cols-3 gap-2">{c.palettes.map((p) => (
                  <button key={p.id} onClick={() => setW({ palette: p.id })} className={cn("rounded-lg border-2 p-2 text-left", w.palette === p.id ? "border-accent" : "border-border")}>
                    <div className="flex h-8 overflow-hidden rounded">{p.swatch.map((s) => <span key={s} className="flex-1" style={{ background: s }} />)}</div>
                    <p className="mt-1.5 text-xs">{p.name}</p>
                  </button>))}</div>
              </Group>
              <Group label={t("ws.style")}><Choice value={w.style} options={[["classic", t("ws.classic")], ["modern", t("ws.modern")]]} onChange={(v) => setW({ style: v as WebsiteConfig["style"] })} /></Group>
              <Group label={t("ws.layout")}><Choice value={w.layout} options={[["a", t("ws.layoutA")], ["b", t("ws.layoutB")]]} onChange={(v) => setW({ layout: v as WebsiteConfig["layout"] })} /></Group>
              <Group label={t("ob.siteLang")}><Choice value={w.language} options={[["nl", "Nederlands"], ["en", "English"]]} onChange={(v) => setW({ language: v as Lang })} /></Group>
              <Group label={t("ws.heroImage")}>
                <div className="flex flex-wrap gap-2">
                  {[...business.photos, ...c.gallery].slice(0, 6).map((src) => (
                    <button key={src.slice(-40)} onClick={() => setW({ heroImage: src })} className={cn("size-14 overflow-hidden rounded-md border-2", w.heroImage === src ? "border-accent" : "border-transparent")}><img src={src.replace("w=1600", "w=200")} alt="" className="size-full object-cover" /></button>
                  ))}
                  <label className="grid size-14 cursor-pointer place-items-center rounded-md border border-dashed border-border text-muted-foreground hover:bg-muted" title={t("ws.upload")}>
                    <ImagePlus className="size-4" />
                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                      const file = e.target.files?.[0]; if (!file || file.size > 3_000_000) return;
                      const r = new FileReader(); r.onload = () => { const src = String(r.result); setBusiness({ ...business, photos: [src, ...business.photos].slice(0, 6), website: { ...w, heroImage: src } }); }; r.readAsDataURL(file);
                    }} />
                  </label>
                </div>
              </Group>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 pt-4">
              <Group label={t("ob.name")}><Input value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} /></Group>
              <Group label={t("ws.heroTitle")}><Input value={w.heroTitle} onChange={(e) => setW({ heroTitle: e.target.value })} /></Group>
              <Group label={t("ws.heroSub")}><Textarea rows={2} value={w.heroSubtitle} onChange={(e) => setW({ heroSubtitle: e.target.value })} /></Group>
              <Group label={t("ws.about")}><Textarea rows={4} value={w.about} onChange={(e) => setW({ about: e.target.value })} /></Group>
              <Group label={t("ws.sectionTitle")}>
                <div className="space-y-2">{w.sections.filter((s) => s.enabled && !["hero", "form"].includes(s.id)).map((s) => (
                  <Input key={s.id} placeholder={sectionLabel(s.id, w.language)} value={w.titles[s.id] ?? ""} onChange={(e) => setW({ titles: { ...w.titles, [s.id]: e.target.value } })} />
                ))}</div>
              </Group>
              <p className="text-xs text-muted-foreground">{t("ws.servicesHint")} <Link to="/app/services" className="text-accent">{t("app.services")} →</Link></p>
            </TabsContent>

            <TabsContent value="sections" className="pt-4">
              <ul className="space-y-1.5">{w.sections.map((s, i) => (
                <li key={s.id} className={cn("flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm", !s.enabled && "opacity-50")}>
                  <span className="flex-1">{sectionLabel(s.id, w.language)}</span>
                  {s.id !== "hero" && <>
                    <button onClick={() => move(i, -1)} aria-label={t("common.up")} className="p-1 text-muted-foreground hover:text-foreground"><ArrowUp className="size-3.5" /></button>
                    <button onClick={() => move(i, 1)} aria-label={t("common.down")} className="p-1 text-muted-foreground hover:text-foreground"><ArrowDown className="size-3.5" /></button>
                    <button onClick={() => setW({ sections: w.sections.map((x) => x.id === s.id ? { ...x, enabled: !x.enabled } : x) })} aria-label={s.enabled ? t("common.hide") : t("common.show")} className="p-1 text-muted-foreground hover:text-foreground">{s.enabled ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}</button>
                  </>}
                </li>))}</ul>
            </TabsContent>
          </Tabs>
          <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">{t("ws.saved")}</p>
        </Panel>

        <div>
          <div className="mb-3 flex justify-end gap-1">
            {([["desktop", Monitor, t("ws.desktop")], ["mobile", Smartphone, t("ws.mobile")]] as const).map(([d, I, l]) => (
              <button key={d} onClick={() => setDevice(d)} className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm", device === d ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}><I className="size-4" />{l}</button>
            ))}
          </div>
          {frame}
        </div>
      </div>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-h-[95vh] max-w-6xl overflow-hidden p-0">
          <DialogHeader className="flex-row items-center justify-between border-b border-border px-5 py-3">
            <DialogTitle className="text-sm">{t("ws.preview")}</DialogTitle>
            <div className="mr-8 flex gap-1">{([["desktop", Monitor], ["mobile", Smartphone]] as const).map(([d, I]) => <button key={d} onClick={() => setDevice(d)} className={cn("rounded-md p-1.5", device === d ? "bg-foreground text-background" : "text-muted-foreground")}><I className="size-4" /></button>)}</div>
          </DialogHeader>
          <div className="max-h-[85vh] overflow-y-auto bg-secondary p-4"><div className={cn("mx-auto", device === "mobile" ? "w-[375px]" : "w-full")}><SiteRenderer business={business} services={services} /></div></div>
        </DialogContent>
      </Dialog>

      <Dialog open={publish} onOpenChange={setPublish}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("ws.publish")}</DialogTitle><DialogDescription className="flex gap-2 pt-2"><Info className="size-4 shrink-0 text-accent" />{t("ws.publishNote")}</DialogDescription></DialogHeader>
          <div className="rounded-lg bg-muted p-3 font-mono text-sm">racma.app{url}</div>
          <p className="text-xs font-medium text-muted-foreground">{t("ws.share")}</p>
          <div className="grid grid-cols-2 gap-2">
            {([[Copy, t("ws.copy")], [MessageCircle, t("ws.whatsapp")], [Share2, t("ws.social")], [MapPin, t("ws.google")]] as const).map(([I, l]) => <Button key={l} variant="outline" disabled className="justify-start"><I />{l}</Button>)}
          </div>
          <p className="text-xs text-muted-foreground">{t("ws.googleNote")}</p>
          <Button asChild variant="secondary"><Link to="/s/$slug" params={{ slug: business.slug }} target="_blank">{t("app.viewSite")}</Link></Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="space-y-2"><p className="text-xs font-medium text-muted-foreground">{label}</p>{children}</div>;
function Choice({ value, options, onChange }: { value: string; options: [string, string][]; onChange: (v: string) => void }) {
  return <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">{options.map(([v, l]) => <button key={v} onClick={() => onChange(v)} className={cn("rounded-md py-1.5 text-sm", value === v ? "bg-background font-medium shadow-sm" : "text-muted-foreground")}>{l}</button>)}</div>;
}
