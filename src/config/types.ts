export type Lang = "en" | "nl";
export type CategoryId = "nail" | "hair" | "electrician" | "plumber" | "other";
export type SectionId =
  | "hero" | "services" | "gallery" | "about" | "form" | "hours" | "location" | "areas" | "contact" | "faq" | "process";
export type FormType = "appointment" | "booking" | "quote" | "service" | "contact";
export type RequestStatus = "new" | "contacted" | "quote_sent" | "won" | "lost";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface OpeningHour { day: number; open: string; close: string; closed: boolean }

export interface WebsiteConfig {
  palette: string;
  style: "classic" | "modern";
  layout: "a" | "b";
  language: Lang;
  sections: { id: SectionId; enabled: boolean }[];
  titles: Partial<Record<SectionId, string>>;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  heroImage: string;
}

/** One tenant. In production every row below is scoped by business_id with RLS. */
export interface Business {
  id: string;
  slug: string;
  category: CategoryId;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  serviceAreas: string[];
  hours: OpeningHour[];
  photos: string[];
  website: WebsiteConfig;
  isDemo?: boolean;
}

export interface Service {
  id: string; businessId: string; name: string; description: string; price: string; duration?: number; visible: boolean;
}
export interface Customer { id: string; businessId: string; name: string; email: string; phone: string; lastInteraction: string }
export interface RequestNote { text: string; at: string }
export interface CustomerRequest {
  id: string; businessId: string; customerId: string; customerName: string; email: string; phone: string;
  service: string; message: string; receivedAt: string; status: RequestStatus; notes: RequestNote[];
  followUp?: string; hasPhoto?: boolean; preferredDate?: string;
}
export interface Appointment {
  id: string; businessId: string; customerId: string; customerName: string; service: string;
  date: string; time: string; status: AppointmentStatus;
}
export interface Notification { id: string; text: string; at: string; read: boolean; kind: "request" | "appointment" | "system" }
