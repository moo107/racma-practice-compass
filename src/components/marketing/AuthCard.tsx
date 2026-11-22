import { Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/store/app-store";
import { LangSelect } from "./LangSelect";

export function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const { t } = useApp();
  const nav = useNavigate();
  const signup = mode === "signup";
  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between"><Link to="/"><Logo /></Link><LangSelect /></div>
        <div className="rounded-xl border border-border bg-card p-7 shadow-soft">
          <h1 className="text-xl font-semibold">{t(signup ? "auth.signup.t" : "auth.login.t")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t(signup ? "auth.signup.s" : "auth.login.s")}</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: "/" }); }}>
            {signup && <div className="space-y-1.5"><Label htmlFor="n">{t("auth.name")}</Label><Input id="n" autoComplete="name" /></div>}
            <div className="space-y-1.5"><Label htmlFor="e">{t("auth.email")}</Label><Input id="e" type="email" autoComplete="email" /></div>
            <div className="space-y-1.5"><Label htmlFor="p">{t("auth.password")}</Label><Input id="p" type="password" autoComplete={signup ? "new-password" : "current-password"} /></div>
            <Button className="w-full" type="submit">{t(signup ? "auth.signup" : "auth.login")}</Button>
          </form>
          <p className="mt-5 flex gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground"><Info className="size-4 shrink-0" />{t("auth.demoNote")}</p>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t(signup ? "auth.haveAccount" : "auth.noAccount")}{" "}
          <Link to={signup ? "/login" : "/signup"} className="font-medium text-foreground underline-offset-4 hover:underline">{t(signup ? "auth.login" : "auth.signup")}</Link>
        </p>
      </div>
    </div>
  );
}
