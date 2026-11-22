import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICT, type DictKey } from "@/i18n/dict";
import { createBusiness, defaultServices, demoBusiness, demoData, type BusinessInput } from "@/config/demo";
import type { Appointment, Business, CategoryId, Customer, CustomerRequest, Lang, Notification, Service } from "@/config/types";

/**
 * Phase 1 demo state, persisted to localStorage. Shape mirrors the future multi-tenant
 * tables (businesses, services, customers, requests, appointments) scoped by businessId.
 */
interface Workspace {
  business: Business; services: Service[]; customers: Customer[]; requests: CustomerRequest[];
  appointments: Appointment[]; notifications: Notification[];
}
interface Store extends Workspace {
  lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string; hydrated: boolean;
  setBusiness: (b: Business) => void; setServices: (s: Service[]) => void;
  updateRequest: (id: string, patch: Partial<CustomerRequest>) => void;
  addRequest: (r: Omit<CustomerRequest, "id" | "businessId" | "customerId" | "receivedAt" | "status" | "notes">) => void;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  setNotifications: (n: Notification[]) => void;
  createFromOnboarding: (cat: CategoryId, input: BusinessInput, siteLang: Lang) => void;
  resetDemo: (cat?: CategoryId) => void;
}

const KEY = "racma-demo-v1";
const LANG_KEY = "racma-lang";

function buildWorkspace(business: Business): Workspace {
  const services = defaultServices(business);
  return { business, services, ...demoData(business, services) };
}

const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ws, setWs] = useState<Workspace>(() => buildWorkspace(demoBusiness("nail")));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem(LANG_KEY);
      if (l === "en" || l === "nl") setLangState(l);
      const raw = localStorage.getItem(KEY);
      if (raw) setWs(JSON.parse(raw) as Workspace);
    } catch { /* ignore corrupt demo state */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY, JSON.stringify(ws)); }, [ws, hydrated]);

  const setLang = useCallback((l: Lang) => { setLangState(l); localStorage.setItem(LANG_KEY, l); }, []);
  const t = useCallback((k: DictKey) => DICT[lang][k] ?? DICT.en[k], [lang]);

  const value = useMemo<Store>(() => ({
    ...ws, lang, setLang, t, hydrated,
    setBusiness: (business) => setWs((w) => ({ ...w, business })),
    setServices: (services) => setWs((w) => ({ ...w, services })),
    updateRequest: (id, patch) => setWs((w) => ({ ...w, requests: w.requests.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
    addRequest: (r) => setWs((w) => {
      const id = Math.random().toString(36).slice(2, 9);
      const at = new Date().toISOString();
      return {
        ...w,
        customers: [{ id: `c-${id}`, businessId: w.business.id, name: r.customerName, email: r.email, phone: r.phone, lastInteraction: at }, ...w.customers],
        requests: [{ ...r, id: `r-${id}`, businessId: w.business.id, customerId: `c-${id}`, receivedAt: at, status: "new", notes: [] }, ...w.requests],
        notifications: [{ id: `n-${id}`, kind: "request", text: `New request from ${r.customerName}`, at, read: false }, ...w.notifications],
      };
    }),
    updateAppointment: (id, patch) => setWs((w) => ({ ...w, appointments: w.appointments.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
    setNotifications: (notifications) => setWs((w) => ({ ...w, notifications })),
    createFromOnboarding: (cat, input, siteLang) => setWs(buildWorkspace(createBusiness(cat, input, siteLang))),
    resetDemo: (cat = "nail") => setWs(buildWorkspace(demoBusiness(cat))),
  }), [ws, lang, setLang, t, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
