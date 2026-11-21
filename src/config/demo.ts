import { CATEGORIES } from "./categories";
import type {
  Appointment, Business, CategoryId, Customer, CustomerRequest, Lang, Notification, OpeningHour, SectionId, Service,
} from "./types";

export const uid = () => Math.random().toString(36).slice(2, 10);
export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "my-business";

export const defaultHours = (cat: CategoryId): OpeningHour[] =>
  [1, 2, 3, 4, 5, 6, 0].map((day) => {
    const beauty = cat === "nail" || cat === "hair";
    if (day === 0) return { day, open: "10:00", close: "16:00", closed: true };
    if (day === 6) return { day, open: beauty ? "09:00" : "08:00", close: beauty ? "17:00" : "13:00", closed: !beauty && cat === "other" };
    if (beauty && day === 1) return { day, open: "09:00", close: "18:00", closed: true };
    return { day, open: beauty ? "09:00" : "07:30", close: beauty ? (day === 4 ? "21:00" : "18:00") : "17:30", closed: false };
  });

export interface BusinessInput {
  name: string; description: string; email: string; phone: string; address: string; postalCode: string; city: string;
  serviceAreas: string[]; hours: OpeningHour[]; photos: string[];
}

export function createBusiness(category: CategoryId, input: BusinessInput, lang: Lang, isDemo = false): Business {
  const c = CATEGORIES[category];
  return {
    id: uid(), slug: slugify(input.name), category, isDemo, ...input,
    website: {
      palette: c.palettes[0]!.id, style: "classic", layout: "a", language: lang,
      sections: c.availableSections.map((id) => ({ id, enabled: c.defaultSections.includes(id) })),
      titles: {}, heroTitle: c.heroTitle[lang], heroSubtitle: input.description || c.heroSubtitle[lang],
      about: c.about[lang], heroImage: input.photos[0] ?? c.image,
    },
  };
}

export const defaultServices = (b: Business): Service[] =>
  CATEGORIES[b.category].defaultServices.map((s) => ({
    id: uid(), businessId: b.id, name: s.name[b.website.language], description: s.description[b.website.language],
    price: s.price, duration: s.duration, visible: true,
  }));

const DEMO_INFO: Record<CategoryId, BusinessInput & { slug: string }> = {
  nail: { slug: "demo-nail-studio", name: "Studio Lune Nails", description: "", email: "hello@example.com", phone: "+31 20 000 0000", address: "Voorbeeldstraat 12", postalCode: "1012 AB", city: "Amsterdam", serviceAreas: [], hours: defaultHours("nail"), photos: [] },
  hair: { slug: "demo-hair-salon", name: "Atelier Noor", description: "", email: "hello@example.com", phone: "+31 10 000 0000", address: "Voorbeeldlaan 8", postalCode: "3011 AA", city: "Rotterdam", serviceAreas: [], hours: defaultHours("hair"), photos: [] },
  electrician: { slug: "demo-electrician", name: "Van Dijk Elektra", description: "", email: "info@example.com", phone: "+31 30 000 0000", address: "Voorbeeldweg 3", postalCode: "3511 AB", city: "Utrecht", serviceAreas: ["Utrecht", "Nieuwegein", "Zeist", "Houten", "Maarssen"], hours: defaultHours("electrician"), photos: [] },
  plumber: { slug: "demo-plumber", name: "Waterwerk Loodgieters", description: "", email: "info@example.com", phone: "+31 40 000 0000", address: "Voorbeeldplein 21", postalCode: "5611 AA", city: "Eindhoven", serviceAreas: ["Eindhoven", "Veldhoven", "Best", "Geldrop", "Nuenen"], hours: defaultHours("plumber"), photos: [] },
  other: { slug: "demo-business", name: "Bureau Verde", description: "", email: "hello@example.com", phone: "+31 70 000 0000", address: "Voorbeeldkade 5", postalCode: "2511 AA", city: "Den Haag", serviceAreas: [], hours: defaultHours("other"), photos: [] },
};

export function demoBusiness(cat: CategoryId, lang: Lang = "en"): Business {
  const { slug, ...info } = DEMO_INFO[cat];
  const b = createBusiness(cat, info, lang, true);
  b.id = `demo-${cat}`;
  b.slug = slug;
  if (cat === "hair") b.website.palette = "hair-mono";
  return b;
}
export const DEMO_SLUGS = Object.fromEntries(Object.entries(DEMO_INFO).map(([k, v]) => [v.slug, k as CategoryId]));

const NAMES = ["Sanne de Vries", "Lars Jansen", "Emma Bakker", "Daan Visser", "Noor el Amrani", "Julia Smit", "Thomas Mulder", "Fleur de Boer", "Mehmet Yilmaz", "Lotte Meijer"];
const day = (offset: number, h = 10) => { const d = new Date(); d.setDate(d.getDate() + offset); d.setHours(h, 0, 0, 0); return d.toISOString(); };

const MESSAGES: Record<CategoryId, string[]> = {
  nail: ["Would love a gel manicure on Saturday morning if possible.", "First time BIAB — can you advise on length?", "Pedicure for two people, any evening next week."],
  hair: ["Looking for balayage, my hair is shoulder length.", "Quick men's cut this week please.", "Colour correction after a home dye — possible?"],
  electrician: ["Main breaker trips when the oven and washing machine run together.", "We'd like a quote for an EV charger at our driveway.", "Old fuse box from the 80s, want it replaced."],
  plumber: ["Kitchen sink drains very slowly since yesterday.", "Small leak under the bathroom sink, see photo.", "Boiler shows error code, no hot water."],
  other: ["Can we schedule a first conversation?", "Do you work with small companies?", "I'd like more information about your services."],
};

export function demoData(b: Business, services: Service[]) {
  const cat = b.category;
  const customers: Customer[] = NAMES.slice(0, 8).map((name, i) => ({
    id: `c${i}`, businessId: b.id, name,
    email: `${name.split(" ")[0]!.toLowerCase()}@example.com`, phone: `+31 6 0000 00${10 + i}`, lastInteraction: day(-i * 2),
  }));
  const statuses: CustomerRequest["status"][] = ["new", "new", "contacted", "quote_sent", "won", "contacted", "lost", "new"];
  const requests: CustomerRequest[] = customers.map((c, i) => ({
    id: `r${i}`, businessId: b.id, customerId: c.id, customerName: c.name, email: c.email, phone: c.phone,
    service: services[i % services.length]?.name ?? "—", message: MESSAGES[cat][i % 3]!,
    receivedAt: day(-i, 9 + i), status: statuses[i]!, notes: i === 2 ? [{ text: "Called, will send availability.", at: day(-1) }] : [],
    followUp: i === 2 || i === 3 ? day(i - 2).slice(0, 10) : undefined,
    hasPhoto: (cat === "electrician" || cat === "plumber") && i % 2 === 1,
  }));
  const apptStatus: Appointment["status"][] = ["pending", "confirmed", "confirmed", "pending", "completed", "cancelled"];
  const appointments: Appointment[] = CATEGORIES[cat].usesAppointments
    ? customers.slice(0, 6).map((c, i) => ({
        id: `a${i}`, businessId: b.id, customerId: c.id, customerName: c.name, service: services[i % services.length]?.name ?? "—",
        date: day(i < 4 ? i : -(i - 3)).slice(0, 10), time: ["09:30", "11:00", "13:30", "15:00", "10:00", "16:30"][i]!, status: apptStatus[i]!,
      }))
    : [];
  const notifications: Notification[] = [
    { id: "n1", kind: "request", text: `New request from ${requests[0]!.customerName}`, at: requests[0]!.receivedAt, read: false },
    { id: "n2", kind: "request", text: `New request from ${requests[1]!.customerName}`, at: requests[1]!.receivedAt, read: false },
    ...(appointments.length ? [{ id: "n3", kind: "appointment" as const, text: `Appointment request from ${appointments[0]!.customerName} awaits confirmation`, at: day(0, 8), read: false }] : []),
    { id: "n4", kind: "system", text: "Your website draft was saved", at: day(-3), read: true },
  ];
  return { customers, requests, appointments, notifications };
}

export const sectionOrderFor = (b: Business): SectionId[] => b.website.sections.filter((s) => s.enabled).map((s) => s.id);
