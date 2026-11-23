import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHeader, Panel, StatusBadge, fmtDate } from "@/components/app/ui";
import { useApp } from "@/store/app-store";

export const Route = createFileRoute("/app/customers")({
  head: () => ({ meta: [{ title: "Customers — RACMA" }, { name: "description", content: "Customers in your RACMA dashboard." }, { property: "og:title", content: "Customers — RACMA" }, { property: "og:description", content: "Customers in your RACMA dashboard." }] }),
  component: Customers,
});

function Customers() {
  const { t, lang, customers, requests, appointments } = useApp();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = customers.filter((c) => [c.name, c.email, c.phone].join(" ").toLowerCase().includes(q.toLowerCase()));
  const open = customers.find((c) => c.id === openId);
  return (
    <>
      <PageHeader title={t("app.customers")} />
      <div className="relative mb-4"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("cu.search")} className="bg-card pl-9" /></div>
      <Panel>
        <ul className="divide-y divide-border">
          {list.map((c) => (
            <li key={c.id}><button onClick={() => setOpenId(c.id)} className="grid w-full gap-1 px-5 py-3.5 text-left text-sm hover:bg-muted/50 md:grid-cols-[1.2fr_1.3fr_1fr_100px] md:items-center md:gap-4">
              <span className="flex items-center gap-3 font-medium"><span className="grid size-8 place-items-center rounded-full bg-muted text-xs">{c.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>{c.name}</span>
              <span className="truncate text-muted-foreground">{c.email}</span><span className="text-muted-foreground">{c.phone}</span>
              <span className="text-xs text-muted-foreground">{fmtDate(c.lastInteraction, lang)}</span>
            </button></li>
          ))}
        </ul>
      </Panel>
      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {open && <>
            <SheetHeader><SheetTitle>{open.name}</SheetTitle><p className="text-sm text-muted-foreground">{t("cu.last")}: {fmtDate(open.lastInteraction, lang)}</p></SheetHeader>
            <div className="space-y-6 px-4 pb-8">
              <div className="space-y-2 text-sm"><a href={`mailto:${open.email}`} className="flex items-center gap-2"><Mail className="size-4 text-muted-foreground" />{open.email}</a><a href={`tel:${open.phone}`} className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" />{open.phone}</a></div>
              <div><p className="mb-2 text-xs font-medium text-muted-foreground">{t("cu.history")}</p>
                <ul className="space-y-2">
                  {requests.filter((r) => r.customerId === open.id).map((r) => <li key={r.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm"><span>{r.service}<span className="block text-xs text-muted-foreground">{fmtDate(r.receivedAt, lang)}</span></span><StatusBadge status={r.status} /></li>)}
                  {appointments.filter((a) => a.customerId === open.id).map((a) => <li key={a.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm"><span>{a.service}<span className="block text-xs text-muted-foreground">{fmtDate(a.date, lang)} · {a.time}</span></span><StatusBadge status={a.status} /></li>)}
                </ul></div>
            </div>
          </>}
        </SheetContent>
      </Sheet>
    </>
  );
}
