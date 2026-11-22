import { Globe } from "lucide-react";
import { useApp } from "@/store/app-store";
import { cn } from "@/lib/utils";

export function LangSelect({ className }: { className?: string }) {
  const { lang, setLang } = useApp();
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md border border-border bg-background p-0.5 text-xs", className)} role="group" aria-label="Language">
      <Globe className="ml-1.5 size-3.5 text-muted-foreground" />
      {(["en", "nl"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("rounded px-2 py-1 font-medium uppercase transition-colors", lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}>
          {l}
        </button>
      ))}
    </div>
  );
}
