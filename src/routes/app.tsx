import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CalendarCheck, ExternalLink, Globe, Inbox, LayoutDashboard, Menu, RotateCcw, Settings, Tag, Users } from "lucide-react";
import { Logo, LogoSymbol } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CATEGORIES } from "@/config/categories";
import { useApp } from "@/store/app-store";
import type { DictKey } from "@/i18n/dict";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Dashboard — RACMA" }, { name: "description", content: "Your RACMA business dashboard." }, { property: "og:title", content: "Dashboard — RACMA" }, { property: "og:description", content: "Your RACMA business dashboard." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

function Nav({ onNav }: { onNav?: () => void }) {
  const { t, business, requests, notifications } = useApp();
  const c = CATEGORIES[business.category];
  const items: [string, typeof Inbox, DictKey, number?][] = [
    ["/app", LayoutDashboard, "app.overview"],
    ["/app/requests", Inbox, "app.requests", requests.filter((r) => r.status === "new").length],
    ...(c.usesAppointments ? [["/app/appointments", CalendarCheck, "app.appointments"] as [string, typeof Inbox, DictKey]] : []),
    ["/app/customers", Users, "app.customers"],
    ["/app/services", Tag, "app.services"],
    ["/app/website", Globe, "app.website"],
    ["/app/notifications", Bell, "app.notifications", notifications.filter((n) => !n.read).length],
    ["/app/settings", Settings, "app.settings"],
  ];
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map(([to, I, k, n]) => (
        <Link key={to} to={to as "/app"} onClick={onNav} activeOptions={{ exact: to === "/app" }}
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          activeProps={{ className: "bg-sidebar-accent font-medium text-foreground" }}>
          <I className="size-4" /><span className="flex-1">{t(k)}</span>
          {!!n && <span className="rounded-full bg-accent px-1.5 text-[11px] font-medium text-accent-foreground">{n}</span>}
        </Link>
      ))}
    </nav>
  );
}

function SidebarBody({ onNav }: { onNav?: () => void }) {
  const { business, lang } = useApp();
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="px-1"><Logo /></Link>
      <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-2.5">
        <span className="grid size-8 place-items-center rounded-md bg-muted text-sm font-semibold">{business.name.charAt(0)}</span>
        <div className="min-w-0"><p className="truncate text-sm font-medium">{business.name}</p><p className="text-xs text-muted-foreground">{CATEGORIES[business.category].name[lang]}</p></div>
      </div>
      <Nav {...(onNav ? { onNav } : {})} />
    </div>
  );
}

function AppLayout() {
  const { t, business, resetDemo } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:block"><SidebarBody /></aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-sidebar p-0"><SheetTitle className="sr-only">Menu</SheetTitle><SidebarBody onNav={() => setOpen(false)} /></SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-2 text-xs text-muted-foreground md:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu className="size-5 text-foreground" /></button>
            <LogoSymbol tile className="size-6 md:hidden" />
            <span className="hidden sm:inline">{t("app.demoBanner")}</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => resetDemo(business.category)} className="flex items-center gap-1 hover:text-foreground"><RotateCcw className="size-3.5" />{t("app.reset")}</button>
            <Link to="/s/$slug" params={{ slug: business.slug }} target="_blank" className="flex items-center gap-1 hover:text-foreground"><ExternalLink className="size-3.5" />{t("app.viewSite")}</Link>
          </div>
        </div>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8"><Outlet /></main>
      </div>
    </div>
  );
}
