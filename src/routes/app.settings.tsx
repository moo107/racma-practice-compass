import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel } from "@/components/app/ui";
import { LangSelect } from "@/components/marketing/LangSelect";
import type { Business } from "@/config/types";
import { useApp } from "@/store/app-store";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — RACMA" }, { name: "description", content: "Settings in your RACMA dashboard." }, { property: "og:title", content: "Settings — RACMA" }, { property: "og:description", content: "Settings in your RACMA dashboard." }] }),
  component: Settings,
});

function Settings() {
  const { t, business, setBusiness, resetDemo } = useApp();
  const nav = useNavigate();
  const up = (k: keyof Business) => (e: { target: { value: string } }) => setBusiness({ ...business, [k]: e.target.value });
  const fields: [keyof Business, string][] = [["name", t("ob.name")], ["email", t("auth.email")], ["phone", t("ob.phone")], ["address", t("ob.address")], ["postalCode", t("ob.postal")], ["city", t("ob.city")]];
  return (
    <>
      <PageHeader title={t("app.settings")} />
      <div className="space-y-6">
        <Panel title={t("set.language")}><div className="flex flex-wrap items-center justify-between gap-3 p-5"><p className="text-sm text-muted-foreground">{t("set.languageHint")}</p><LangSelect /></div></Panel>
        <Panel title={t("set.business")}>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {fields.map(([k, l]) => <label key={k} className="space-y-1"><span className="text-xs text-muted-foreground">{l}</span><Input value={String(business[k] ?? "")} onChange={up(k)} /></label>)}
          </div>
        </Panel>
        <Panel title={t("set.subscription")}><p className="p-5 text-sm text-muted-foreground">{t("set.subNote")}</p></Panel>
        <Panel title={t("set.manage")}>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-muted-foreground">{t("set.deleteNote")}</p>
            <Button variant="outline" onClick={() => { localStorage.removeItem("racma-demo-v1"); resetDemo(); nav({ to: "/onboarding" }); }}>{t("set.deleteDemo")}</Button>
          </div>
        </Panel>
      </div>
    </>
  );
}
