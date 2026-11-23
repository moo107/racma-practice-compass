import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/app-store";
import type { DictKey } from "@/i18n/dict";

const TONE: Record<string, string> = {
  new: "bg-accent-soft text-accent", contacted: "bg-warning-soft text-warning", quote_sent: "bg-muted text-foreground",
  won: "bg-success-soft text-success", lost: "bg-muted text-muted-foreground",
  pending: "bg-warning-soft text-warning", confirmed: "bg-success-soft text-success", completed: "bg-muted text-foreground", cancelled: "bg-muted text-muted-foreground line-through",
};
export function StatusBadge({ status }: { status: string }) {
  const { t } = useApp();
  return <span className={cn("inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium", TONE[status])}>{t(`st.${status}` as DictKey)}</span>;
}
export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1>{sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}</div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-border bg-card", className)}>
      {title && <div className="flex items-center justify-between border-b border-border px-5 py-3"><h2 className="text-sm font-medium">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}
export const fmtDate = (iso: string, lang: string) => new Date(iso).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "short" });
