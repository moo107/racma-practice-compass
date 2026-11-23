import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Globe, Inbox, ListChecks, Tag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel, StatusBadge, fmtDate } from "@/components/app/ui";
import { CATEGORIES } from "@/config/categories";
import { useApp } from "@/store/app-store";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — RACMA" }, { name: "description", content: "Overview in your RACMA dashboard." }, { property: "og:title", content: "Overview — RACMA" }, { property: "og:description", content: "Overview in your RACMA dashboard." }] }),
  component: Overview,
});

function Overview() {
  const { t, lang, business, requests, appointments, customers } = useApp();
  const c = CATEGORIES[business.category];
  const today = new Date().toISOString().slice(0, 10);
  const newReq = requests.filter((r) => r.status === "new");
  const pending = appointments.filter((a) => a.status === "pending");
  const follow = requests.filter((r) => r.followUp && r.status !== "won" && r.status !== "lost").sort((a, b) => a.followUp!.localeCompare(b.followUp!));
  const upcoming = appointments.filter((a) => a.date >= today && a.status !== "cancelled").sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  type Stat = [typeof Inbox, string, number, "/app/requests" | "/app/appointments" | "/app/customers"];
  const stats: Stat[] = [
    [Inbox, t("ov.new"), newReq.length, "/app/requests"],
    ...(c.usesAppointments ? [[CalendarCheck, t("ov.pending"), pending.length, "/app/appointments"] as Stat] : []),
    [ListChecks, t("ov.followups"), follow.filter((r) => r.followUp! <= today).length, "/app/requests"],
    [Users, t("ov.customers"), customers.length, "/app/customers"],
  ];

  const recent = (
    <Panel title={t("ov.recent")} action={<Link to="/app/requests" className="text-xs text-accent">{t("ov.viewAll")}</Link>}>
      <ul className="divide-y divide-border">
        {requests.slice(0, 5).map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="min-w-0"><p className="truncate text-sm font-medium">{r.customerName}</p><p className="truncate text-xs text-muted-foreground">{r.service} · {fmtDate(r.receivedAt, lang)}</p></div>
            <StatusBadge status={r.status} />
          </li>
        ))}
      </ul>
    </Panel>
  );
  const appts = c.usesAppointments && (
    <Panel title={t("ov.upcoming")} action={<Link to="/app/appointments" className="text-xs text-accent">{t("ov.viewAll")}</Link>}>
      {upcoming.length ? <ul className="divide-y divide-border">{upcoming.slice(0, 4).map((a) => (
        <li key={a.id} className="flex items-center gap-4 px-5 py-3">
          <div className="w-14 text-center"><p className="text-xs text-muted-foreground">{fmtDate(a.date, lang)}</p><p className="text-sm font-medium tabular-nums">{a.time}</p></div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{a.customerName}</p><p className="truncate text-xs text-muted-foreground">{a.service}</p></div>
          <StatusBadge status={a.status} />
        </li>))}</ul> : <p className="px-5 py-6 text-sm text-muted-foreground">{t("ov.none")}</p>}
    </Panel>
  );

  return (
    <>
      <PageHeader title={`${t("ov.hello")} 👋`} sub={business.name} actions={<Button asChild variant="outline" size="sm"><Link to="/app/website"><Globe />{t("app.website")}</Link></Button>} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([I, l, n, to]) => (
          <Link key={l} to={to} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-soft">
            <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs">{l}</span><I className="size-4" /></div>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{n}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">{c.dashboardPriorities[0] === "appointments" ? <>{appts}{recent}</> : <>{recent}</>}</div>
        <div className="space-y-6">
          <Panel title={t("ov.followupList")}>
            {follow.length ? <ul className="divide-y divide-border">{follow.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="truncate">{r.customerName}</span>
                <span className={r.followUp! <= today ? "text-xs font-medium text-warning" : "text-xs text-muted-foreground"}>{fmtDate(r.followUp!, lang)}</span>
              </li>))}</ul> : <p className="px-5 py-6 text-sm text-muted-foreground">{t("ov.none")}</p>}
          </Panel>
          <Panel title={t("ov.website")}>
            <div className="flex items-center justify-between gap-3 p-5">
              <div><p className="text-sm font-medium">{business.name}</p><p className="text-xs text-muted-foreground">{t("ov.draft")}</p></div>
              <Button asChild size="sm" variant="outline"><Link to="/app/website">{t("common.edit")}<ArrowRight /></Link></Button>
            </div>
          </Panel>
          <Panel title={t("ov.quick")}>
            <div className="grid grid-cols-2 gap-2 p-3">
              <Button asChild variant="ghost" className="justify-start"><Link to="/app/requests"><Inbox />{t("app.requests")}</Link></Button>
              <Button asChild variant="ghost" className="justify-start"><Link to="/app/services"><Tag />{t("app.services")}</Link></Button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
