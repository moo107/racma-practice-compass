import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarCheck, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel, fmtDate } from "@/components/app/ui";
import { useApp } from "@/store/app-store";
import type { DictKey } from "@/i18n/dict";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — RACMA" }, { name: "description", content: "Notifications in your RACMA dashboard." }, { property: "og:title", content: "Notifications — RACMA" }, { property: "og:description", content: "Notifications in your RACMA dashboard." }] }),
  component: Notifications,
});

function Notifications() {
  const { t, lang, notifications, setNotifications } = useApp();
  const icon = { request: Inbox, appointment: CalendarCheck, system: Bell };
  return (
    <>
      <PageHeader title={t("app.notifications")} actions={<Button size="sm" variant="outline" onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}>{t("nt.markRead")}</Button>} />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title={t("nt.title")}>
          <ul className="divide-y divide-border">{notifications.map((n) => { const I = icon[n.kind]; return (
            <li key={n.id} className="flex items-center gap-3 px-5 py-3.5 text-sm"><I className="size-4 text-muted-foreground" /><span className={n.read ? "flex-1 text-muted-foreground" : "flex-1 font-medium"}>{n.text}</span><span className="text-xs text-muted-foreground">{fmtDate(n.at, lang)}</span>{!n.read && <span className="size-1.5 rounded-full bg-accent" />}</li>
          ); })}</ul>
        </Panel>
        <Panel title={t("nt.prefs")}>
          <div className="space-y-4 p-5">
            {(["nt.p.request", "nt.p.appointment", "nt.p.followup", "nt.p.weekly"] as DictKey[]).map((k, i) => <label key={k} className="flex items-center justify-between text-sm">{t(k)}<Switch defaultChecked={i < 3} /></label>)}
            <p className="text-xs text-muted-foreground">{t("nt.prefsNote")}</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
