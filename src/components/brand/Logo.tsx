import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * RACMA symbol: four blocks interlocking into one square — separate parts of a business
 * working as one system. Uses currentColor so it adapts to dark/light surfaces.
 */
export function LogoSymbol({ className, tile = false }: { className?: string; tile?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true">
      {tile && <rect width="32" height="32" rx="8" className="fill-foreground" />}
      <g className={tile ? "fill-background" : "fill-current"}>
        <rect x="7" y="7" width="8" height="8" rx="2" />
        <rect x="17" y="17" width="8" height="8" rx="2" />
        <path d="M7 17h8v8h-4a4 4 0 0 1-4-4z" opacity=".4" />
      </g>
      <path d="M17 7h4a4 4 0 0 1 4 4v4h-8z" className="fill-accent" />
    </svg>
  );
}

/** Variants: default (dark on light), "white" (on dark), "compact" (dashboard/mobile). */
export function Logo({ variant = "default", className }: { variant?: "default" | "white" | "compact"; className?: string }) {
  if (variant === "compact") return <LogoSymbol tile className={cn("size-8", className)} />;
  return (
    <span className={cn("inline-flex items-center gap-2", variant === "white" ? "text-background" : "text-foreground", className)}>
      <LogoSymbol className="size-7" />
      <span className="text-[19px] font-semibold tracking-[0.14em] leading-none">{BRAND.name}</span>
    </span>
  );
}
