import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/config/brand";
import { useApp } from "@/store/app-store";
import { LangSelect } from "./LangSelect";

export function MarketingLayout({ children }: { children: ReactNode }) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/features" as const, label: t("nav.features") },
    { to: "/how-it-works" as const, label: t("nav.how") },
    { to: "/pricing" as const, label: t("nav.pricing") },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" aria-label={`${BRAND.name} home`}><Logo /></Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{l.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <LangSelect />
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">{t("nav.login")}</Link>
            <Button asChild size="sm"><Link to="/signup">{t("nav.start")}</Link></Button>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="border-t border-border px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
              <Link to="/login">{t("nav.login")}</Link>
              <LangSelect className="w-fit" />
              <Button asChild><Link to="/signup">{t("nav.start")}</Link></Button>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">{BRAND.tagline}</p>
            <p className="text-xs text-muted-foreground">{t("footer.demo")}</p>
          </div>
          <FooterCol title={t("footer.product")}>
            <Link to="/features">{t("nav.features")}</Link><Link to="/how-it-works">{t("nav.how")}</Link><Link to="/pricing">{t("nav.pricing")}</Link>
          </FooterCol>
          <FooterCol title={t("nav.examples")}>
            <Link to="/s/$slug" params={{ slug: "demo-nail-studio" }}>Nail Salon</Link>
            <Link to="/s/$slug" params={{ slug: "demo-hair-salon" }}>Hair Salon</Link>
            <Link to="/s/$slug" params={{ slug: "demo-electrician" }}>Electrician</Link>
            <Link to="/s/$slug" params={{ slug: "demo-plumber" }}>Plumber</Link>
          </FooterCol>
          <FooterCol title={t("footer.company")}>
            <a href={`mailto:${BRAND.supportEmail}`}>{t("footer.contact")}</a><span>{t("footer.privacy")}</span><span>{t("footer.terms")}</span>
          </FooterCol>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND.name}</div>
      </footer>
    </div>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium">{title}</h4>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground [&>a:hover]:text-foreground">{children}</div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-medium text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
