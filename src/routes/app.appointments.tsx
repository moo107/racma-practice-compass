import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel, StatusBadge, fmtDate } from "@/components/app/ui";
import { CATEGORIES } from "@/config/categories";
import type { AppointmentStatus } from "@/config/types";
import type { DictKey } from "@/i18n/dict";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/appointments")({
  head: () => ({ meta: [{ title: "Appointments — RACMA" }, { name: "description", content: "Appointments in your RACMA dashboard." }, { property: "og:title", content: "Appointments — RACMA" }, { property: "og:description", content: "Appointments in your RACMA dashboard." }] }),
  component: Appointments,
});

const ST: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled"];

function Appointments() {
  const { t, lang, business, appointments, updateAppointment } = useApp();
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");
  if (!CATEGORIES[business.category].usesAppointments) return (
    <><PageHeader title={t("app.appointments")} /><Panel><div className="p-8 text-center"><p className="text-sm text-muted-foreground">{t("ap.notUsed")}</p><Button asChild className="mt-4" variant="outline"><Link to="/app/requests">{t("ap.goRequests")}</Link></Button></div></Panel></>
  );
  const list = appointments.filter((a) => filter === "all" || a.status === filter).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  return (
    <>
      <PageHeader title={t("app.appointments")} />
      <p className="mb-4 flex gap-2 rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground"><Info className="size-4 shrink-0 text-accent" />{t("ap.confirmNote")}</p>
      <div className="mb-4 flex gap-1 overflow-x-auto">
        {(["all", ...ST] as const).map((s) => <button key={s} onClick={() => setFilter(s)} className={cn("whitespace-nowrap rounded-md px-3 py-1.5 text-sm", filter === s ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>{s === "all" ? t("req.all") : t(`st.${s}` as DictKey)}</button>)}
      </div>
      <Panel>
        <ul className="divide-y divide-border">
          {list.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="w-16"><p className="text-xs text-muted-foreground">{fmtDate(a.date, lang)}</p><p className="font-medium tabular-nums">{a.time}</p></div>
              <div className="min-w-0 flex-1"><p className="text-sm font-medium">{a.customerName}</p><p className="text-xs text-muted-foreground">{a.service}</p></div>
              <StatusBadge status={a.status} />
              <select value={a.status} onChange={(e) => updateAppointment(a.id, { status: e.target.value as AppointmentStatus })} className="rounded-md border border-border bg-background px-2 py-1 text-xs" aria-label={t("req.status")}>
                {ST.map((s) => <option key={s} value={s}>{t(`st.${s}` as DictKey)}</option>)}
              </select>
            </li>
          ))}
          {!list.length && <li className="px-5 py-10 text-center text-sm text-muted-foreground">{t("ov.none")}</li>}
        </ul>
      </Panel>
    </>
  );
}
