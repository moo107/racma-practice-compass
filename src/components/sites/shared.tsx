import { useState, type ReactNode } from "react";
import { Camera } from "lucide-react";
import { CATEGORIES } from "@/config/categories";
import { SITE_DICT } from "@/i18n/dict";
import type { Business, SectionId, Service } from "@/config/types";
import { cn } from "@/lib/utils";

export interface SiteProps {
  business: Business;
  services: Service[];
  /** Called with request data. Undefined for read-only demo websites. */
  onRequest?: ((r: { customerName: string; email: string; phone: string; service: string; message: string; hasPhoto: boolean; preferredDate?: string }) => void) | undefined;
  compact?: boolean;
}

export const sd = (b: Business) => SITE_DICT[b.website.language];
export const title = (b: Business, id: SectionId, fallback: string) => b.website.titles[id] || fallback;
export const enabled = (b: Business) => b.website.sections.filter((s) => s.enabled).map((s) => s.id);
export const priceLabel = (b: Business, p: string) => {
  const d = sd(b);
  if (/^\d+([.,]\d+)?$/.test(p)) return `€${p}`;
  return p.replace(/^from /, `${d.from} €`).replace(/^on quote$/, d.onQuote);
};

export function HoursList({ b, className }: { b: Business; className?: string }) {
  const d = sd(b);
  return (
    <dl className={cn("space-y-1.5 text-sm", className)}>
      {b.hours.map((h) => (
        <div key={h.day} className="flex justify-between gap-6">
          <dt className="capitalize">{d.days[h.day]}</dt>
          <dd className="tabular-nums opacity-80">{h.closed ? d.closed : `${h.open} – ${h.close}`}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SiteForm({ business: b, services, onRequest, fieldClass, buttonClass, labelClass }: SiteProps & { fieldClass: string; buttonClass: string; labelClass?: string }) {
  const d = sd(b);
  const c = CATEGORIES[b.category];
  const [msg, setMsg] = useState<string | null>(null);
  const appt = c.formType === "appointment" || c.formType === "booking";
  const trade = c.formType === "quote" || c.formType === "service";
  const F = ({ label, children }: { label: string; children: ReactNode }) => (
    <label className="block space-y-1.5"><span className={cn("text-sm", labelClass)}>{label}</span>{children}</label>
  );
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const get = (k: string) => String(f.get(k) ?? "").trim().slice(0, 1000);
        if (onRequest) {
          const date = get("date");
          onRequest({
            customerName: get("name"), email: get("email"), phone: get("phone"), service: get("service") || "—",
            message: get("message") + (date ? ` (${date} ${get("time")})` : ""), hasPhoto: Boolean((f.get("photo") as File | null)?.size),
            ...(date ? { preferredDate: date } : {}),
          });
          setMsg(d.sent);
        } else setMsg(d.demoSent);
        e.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <F label={d.name}><input required name="name" maxLength={100} className={fieldClass} autoComplete="name" /></F>
        <F label={d.phone}><input name="phone" type="tel" maxLength={30} className={fieldClass} autoComplete="tel" /></F>
      </div>
      <F label={d.emailF}><input required name="email" type="email" maxLength={200} className={fieldClass} autoComplete="email" /></F>
      {c.formType !== "service" && (
        <F label={d.service}>
          <select name="service" className={fieldClass} defaultValue="">
            <option value="">{d.choose}</option>
            {services.filter((s) => s.visible).map((s) => <option key={s.id}>{s.name}</option>)}
          </select>
        </F>
      )}
      {appt && (
        <div className="grid gap-4 sm:grid-cols-2">
          <F label={d.date}><input name="date" type="date" className={fieldClass} /></F>
          <F label={d.time}><input name="time" type="time" className={fieldClass} /></F>
        </div>
      )}
      <F label={trade ? d.problem : d.message}><textarea name="message" rows={4} maxLength={1000} required={trade} className={fieldClass} /></F>
      {trade && (
        <label className={cn("flex cursor-pointer items-center gap-2 text-sm", labelClass)}>
          <Camera className="size-4" />{d.photo}<input name="photo" type="file" accept="image/*" className="sr-only" />
        </label>
      )}
      <button className={buttonClass} type="submit">{d.send}</button>
      <p className="text-xs opacity-70">{appt ? d.requestNote + " " : ""}{d.privacy}</p>
      {msg && <p role="status" className="rounded-md border border-current/20 p-3 text-sm">{msg}</p>}
    </form>
  );
}

export function TextLogo({ b, className }: { b: Business; className?: string }) {
  return <span className={className}>{b.name}</span>;
}

export function Gallery({ b, className }: { b: Business; className?: string }) {
  const imgs = b.photos.length ? b.photos : CATEGORIES[b.category].gallery;
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-3", className)}>
      {imgs.slice(0, 6).map((src, i) => (
        <img key={i} src={src.replace("w=1600", "w=800")} alt="" loading="lazy" className={cn("aspect-square w-full object-cover", i === 0 && "md:col-span-2 md:row-span-2 md:aspect-auto md:h-full")} />
      ))}
    </div>
  );
}
