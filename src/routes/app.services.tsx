import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel } from "@/components/app/ui";
import { CATEGORIES } from "@/config/categories";
import { uid } from "@/config/demo";
import type { Service } from "@/config/types";
import { useApp } from "@/store/app-store";

export const Route = createFileRoute("/app/services")({
  head: () => ({ meta: [{ title: "Services — RACMA" }, { name: "description", content: "Services in your RACMA dashboard." }, { property: "og:title", content: "Services — RACMA" }, { property: "og:description", content: "Services in your RACMA dashboard." }] }),
  component: Services,
});

function Services() {
  const { t, business, services, setServices } = useApp();
  const showDuration = CATEGORIES[business.category].usesAppointments;
  const up = (id: string, patch: Partial<Service>) => setServices(services.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  return (
    <>
      <PageHeader title={t("app.services")} actions={<Button size="sm" onClick={() => setServices([...services, { id: uid(), businessId: business.id, name: "", description: "", price: "", visible: true }])}><Plus />{t("sv.add")}</Button>} />
      <div className="space-y-3">
        {services.map((s) => (
          <Panel key={s.id} className="p-4">
            <div className="grid gap-3 md:grid-cols-[1.3fr_100px_auto_auto] md:items-end">
              <div className="space-y-1"><label className="text-xs text-muted-foreground">{t("sv.name")}</label><Input value={s.name} onChange={(e) => up(s.id, { name: e.target.value })} /></div>
              <div className="space-y-1"><label className="text-xs text-muted-foreground">{t("sv.price")} (€)</label><Input value={s.price} onChange={(e) => up(s.id, { price: e.target.value })} /></div>
              {showDuration ? <div className="space-y-1"><label className="text-xs text-muted-foreground">{t("sv.duration")}</label><Input type="number" className="w-24" value={s.duration ?? ""} onChange={(e) => up(s.id, { duration: e.target.value ? Number(e.target.value) : undefined })} /></div> : <span />}
              <div className="flex items-center gap-3 pb-2">
                <label className="flex items-center gap-2 text-xs text-muted-foreground"><Switch checked={s.visible} onCheckedChange={(v) => up(s.id, { visible: v })} />{t("sv.visible")}</label>
                <Button size="icon" variant="ghost" aria-label={t("sv.delete")} onClick={() => setServices(services.filter((x) => x.id !== s.id))}><Trash2 /></Button>
              </div>
            </div>
            <div className="mt-3 space-y-1"><label className="text-xs text-muted-foreground">{t("sv.desc")}</label><Input value={s.description} onChange={(e) => up(s.id, { description: e.target.value })} /></div>
          </Panel>
        ))}
      </div>
    </>
  );
}
