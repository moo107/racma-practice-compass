import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Camera, Mail, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHeader, Panel, StatusBadge, fmtDate } from "@/components/app/ui";
import type { RequestStatus } from "@/config/types";
import type { DictKey } from "@/i18n/dict";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/requests")({
  head: () => ({ meta: [{ title: "Requests — RACMA" }, { name: "description", content: "Requests in your RACMA dashboard." }, { property: "og:title", content: "Requests — RACMA" }, { property: "og:description", content: "Requests in your RACMA dashboard." }] }),
  component: Requests,
});

const STATUSES: RequestStatus[] = ["new", "contacted", "quote_sent", "won", "lost"];

function Requests() {
  const { t, lang, requests, updateRequest } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<RequestStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const list = useMemo(() => requests.filter((r) =>
    (filter === "all" || r.status === filter) &&
    [r.customerName, r.service, r.email, r.message].join(" ").toLowerCase().includes(q.toLowerCase())), [requests, q, filter]);
  const open = requests.find((r) => r.id === openId);

  return (
    <>
      <PageHeader title={t("app.requests")} />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("req.search")} className="bg-card pl-9" /></div>
        <div className="flex gap-1 overflow-x-auto">
          {(["all", ...STATUSES] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={cn("whitespace-nowrap rounded-md px-3 py-1.5 text-sm", filter === s ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
              {s === "all" ? t("req.all") : t(`st.${s}` as DictKey)} <span className="opacity-60">{s === "all" ? requests.length : requests.filter((r) => r.status === s).length}</span>
            </button>
          ))}
        </div>
      </div>
      <Panel>
        <div className="hidden grid-cols-[1.2fr_1fr_1.2fr_80px_110px] gap-4 border-b border-border px-5 py-2.5 text-xs text-muted-foreground md:grid">
          <span>{t("req.customer")}</span><span>{t("req.service")}</span><span>{t("req.contact")}</span><span>{t("req.received")}</span><span>{t("req.status")}</span>
        </div>
        {list.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted-foreground">{t("req.empty")}</p>}
        <ul className="divide-y divide-border">
          {list.map((r) => (
            <li key={r.id}>
              <button onClick={() => setOpenId(r.id)} className="grid w-full gap-1 px-5 py-3.5 text-left text-sm hover:bg-muted/50 md:grid-cols-[1.2fr_1fr_1.2fr_80px_110px] md:items-center md:gap-4">
                <span className="flex items-center gap-2 font-medium">{r.status === "new" && <span className="size-1.5 rounded-full bg-accent" />}{r.customerName}{r.hasPhoto && <Camera className="size-3.5 text-muted-foreground" />}</span>
                <span className="text-muted-foreground">{r.service}</span>
                <span className="truncate text-muted-foreground">{r.email}</span>
                <span className="text-muted-foreground">{fmtDate(r.receivedAt, lang)}</span>
                <span><StatusBadge status={r.status} /></span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {open && <>
            <SheetHeader><SheetTitle>{open.customerName}</SheetTitle><p className="text-sm text-muted-foreground">{t("req.details")} · {fmtDate(open.receivedAt, lang)}</p></SheetHeader>
            <div className="space-y-6 px-4 pb-8">
              <div className="space-y-2 text-sm">
                <a href={`mailto:${open.email}`} className="flex items-center gap-2"><Mail className="size-4 text-muted-foreground" />{open.email}</a>
                {open.phone && <a href={`tel:${open.phone}`} className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" />{open.phone}</a>}
              </div>
              <div className="rounded-lg bg-muted p-4 text-sm"><p className="mb-1 text-xs text-muted-foreground">{open.service}</p>{open.message}{open.hasPhoto && <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Camera className="size-3.5" />{t("req.photo")}</p>}</div>
              <div><p className="mb-2 text-xs font-medium text-muted-foreground">{t("req.status")}</p>
                <div className="flex flex-wrap gap-1.5">{STATUSES.map((s) => (
                  <button key={s} onClick={() => updateRequest(open.id, { status: s })} className={cn("rounded-md border px-2.5 py-1 text-xs", open.status === s ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted")}>{t(`st.${s}` as DictKey)}</button>
                ))}</div></div>
              <div><label className="mb-2 block text-xs font-medium text-muted-foreground" htmlFor="fu">{t("req.followUp")}</label>
                <Input id="fu" type="date" value={open.followUp ?? ""} onChange={(e) => updateRequest(open.id, { followUp: e.target.value || undefined })} className="w-48" /></div>
              <div><p className="mb-2 text-xs font-medium text-muted-foreground">{t("req.notes")}</p>
                <ul className="mb-3 space-y-2">{open.notes.map((n, i) => <li key={i} className="rounded-md border border-border p-3 text-sm">{n.text}<p className="mt-1 text-xs text-muted-foreground">{fmtDate(n.at, lang)}</p></li>)}</ul>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("req.note.ph")} rows={3} maxLength={1000} />
                <Button size="sm" className="mt-2" disabled={!note.trim()} onClick={() => { updateRequest(open.id, { notes: [...open.notes, { text: note.trim(), at: new Date().toISOString() }] }); setNote(""); }}>{t("req.addNote")}</Button>
              </div>
            </div>
          </>}
        </SheetContent>
      </Sheet>
    </>
  );
}
