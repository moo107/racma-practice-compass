import type { CategoryId, FormType, Lang, SectionId } from "./types";
import { IMG } from "./images";

type L = Record<Lang, string>;
export interface CategoryConfig {
  id: CategoryId;
  template: "nail" | "hair" | "electrician" | "plumber" | "other";
  name: L;
  short: L;
  marketing: L;
  direction: L;
  image: string;
  gallery: string[];
  palettes: { id: string; name: string; swatch: [string, string, string] }[];
  availableSections: SectionId[];
  defaultSections: SectionId[];
  defaultServices: { name: L; description: L; price: string; duration?: number }[];
  cta: L;
  formType: FormType;
  usesAppointments: boolean;
  usesServiceAreas: boolean;
  dashboardPriorities: ("requests" | "appointments" | "followups" | "services")[];
  tools: L[];
  heroTitle: L;
  heroSubtitle: L;
  about: L;
}

export const CATEGORIES: Record<CategoryId, CategoryConfig> = {
  nail: {
    id: "nail", template: "nail",
    name: { en: "Nail Salon", nl: "Nagelsalon" },
    short: { en: "Appointments & treatments.", nl: "Afspraken & behandelingen." },
    marketing: { en: "Show your treatments and receive appointment requests.", nl: "Toon je behandelingen en ontvang afspraakverzoeken." },
    direction: { en: "Elegant, soft neutrals, refined serif typography.", nl: "Elegant, zachte tinten, verfijnde serif-typografie." },
    image: IMG.nail1, gallery: [IMG.nail1, IMG.nail2, IMG.nail3],
    palettes: [
      { id: "nail-blush", name: "Blush", swatch: ["#FBF7F3", "#B98074", "#463530"] },
      { id: "nail-sage", name: "Sage", swatch: ["#F8FAF5", "#7D917C", "#323C33"] },
      { id: "nail-noir", name: "Noir", swatch: ["#221B19", "#D9BD8E", "#F4EEE6"] },
    ],
    availableSections: ["hero", "services", "gallery", "about", "form", "hours", "location", "contact", "faq"],
    defaultSections: ["hero", "services", "gallery", "about", "form", "hours", "location", "contact"],
    defaultServices: [
      { name: { en: "Gel manicure", nl: "Gellak manicure" }, description: { en: "Shaping, cuticle care and long-lasting gel polish.", nl: "Vijlen, nagelriemverzorging en langhoudende gellak." }, price: "35", duration: 45 },
      { name: { en: "BIAB natural nails", nl: "BIAB natuurlijke nagels" }, description: { en: "Builder gel to strengthen your natural nails.", nl: "Builder gel om je eigen nagels te versterken." }, price: "50", duration: 75 },
      { name: { en: "Acrylic full set", nl: "Acryl nieuwe set" }, description: { en: "Full set of extensions in the shape of your choice.", nl: "Volledige set verlenging in de vorm die jij wilt." }, price: "60", duration: 90 },
      { name: { en: "Pedicure with polish", nl: "Pedicure met lak" }, description: { en: "Foot care treatment finished with colour.", nl: "Voetverzorging afgewerkt met kleur." }, price: "45", duration: 60 },
      { name: { en: "Nail art (per nail)", nl: "Nail art (per nagel)" }, description: { en: "Hand-painted details and accents.", nl: "Handgeschilderde details en accenten." }, price: "3" },
    ],
    cta: { en: "Book an appointment", nl: "Maak een afspraak" },
    formType: "appointment", usesAppointments: true, usesServiceAreas: false,
    dashboardPriorities: ["appointments", "requests", "followups", "services"],
    tools: [{ en: "Appointment requests", nl: "Afspraakverzoeken" }, { en: "Treatment price list", nl: "Prijslijst behandelingen" }, { en: "Photo gallery", nl: "Fotogalerij" }],
    heroTitle: { en: "Beautiful nails, carefully done.", nl: "Mooie nagels, met aandacht gemaakt." },
    heroSubtitle: { en: "Manicures, gel and nail art in a calm, welcoming studio.", nl: "Manicures, gel en nail art in een rustige, gastvrije studio." },
    about: { en: "Our studio is a place to slow down. We take time for every treatment and work with care and attention to detail.", nl: "Onze studio is een plek om even tot rust te komen. We nemen de tijd voor elke behandeling en werken met zorg en oog voor detail." },
  },
  hair: {
    id: "hair", template: "hair",
    name: { en: "Hair Salon", nl: "Kapsalon" },
    short: { en: "Services & bookings.", nl: "Diensten & boekingen." },
    marketing: { en: "An editorial website with your services, prices and booking requests.", nl: "Een stijlvolle website met je diensten, prijzen en boekingsverzoeken." },
    direction: { en: "Editorial, stylish, strong photography.", nl: "Redactioneel, stijlvol, sterke fotografie." },
    image: IMG.hair1, gallery: [IMG.hair2, IMG.hair3, IMG.hair4, IMG.hair5],
    palettes: [
      { id: "hair-mono", name: "Mono", swatch: ["#FAFAFA", "#111111", "#7A7A7A"] },
      { id: "hair-terracotta", name: "Terracotta", swatch: ["#F8F2EA", "#B55B3C", "#3B2A22"] },
      { id: "hair-forest", name: "Forest", swatch: ["#17261F", "#E6D89A", "#F1F0E6"] },
    ],
    availableSections: ["hero", "services", "gallery", "about", "form", "hours", "location", "contact", "faq"],
    defaultSections: ["hero", "services", "gallery", "about", "form", "hours", "location", "contact"],
    defaultServices: [
      { name: { en: "Women's cut & style", nl: "Knippen & stylen dames" }, description: { en: "Consultation, wash, cut and blow-dry.", nl: "Advies, wassen, knippen en föhnen." }, price: "55", duration: 60 },
      { name: { en: "Men's cut", nl: "Knippen heren" }, description: { en: "Classic or modern cut, finished with styling.", nl: "Klassiek of modern, afgewerkt met styling." }, price: "32", duration: 30 },
      { name: { en: "Full colour", nl: "Volledige kleuring" }, description: { en: "Root-to-tip colour with gloss treatment.", nl: "Kleuring van uitgroei tot punten met glossing." }, price: "85", duration: 120 },
      { name: { en: "Balayage", nl: "Balayage" }, description: { en: "Hand-painted, natural-looking highlights.", nl: "Handgeschilderde, natuurlijke highlights." }, price: "140", duration: 180 },
      { name: { en: "Blow-dry", nl: "Föhnen" }, description: { en: "Wash and blow-dry styling.", nl: "Wassen en föhnstyling." }, price: "30", duration: 30 },
    ],
    cta: { en: "Book your visit", nl: "Boek je bezoek" },
    formType: "booking", usesAppointments: true, usesServiceAreas: false,
    dashboardPriorities: ["appointments", "requests", "followups", "services"],
    tools: [{ en: "Booking requests", nl: "Boekingsverzoeken" }, { en: "Price list", nl: "Prijslijst" }, { en: "Editorial gallery", nl: "Redactionele galerij" }],
    heroTitle: { en: "Hair that feels like you.", nl: "Haar dat bij je past." },
    heroSubtitle: { en: "Cuts, colour and styling by a small, dedicated team.", nl: "Knippen, kleuren en stylen door een klein, toegewijd team." },
    about: { en: "We believe a good haircut starts with listening. Every appointment begins with a consultation about what suits you and your routine.", nl: "Een goede knipbeurt begint met luisteren. Elke afspraak start met advies over wat bij jou en je routine past." },
  },
  electrician: {
    id: "electrician", template: "electrician",
    name: { en: "Electrician", nl: "Elektricien" },
    short: { en: "Services & quotes.", nl: "Diensten & offertes." },
    marketing: { en: "A clear, trustworthy website that brings in quote requests.", nl: "Een heldere, betrouwbare website die offerteaanvragen oplevert." },
    direction: { en: "Trustworthy, clean, white and navy, strong calls to action.", nl: "Betrouwbaar, strak, wit en marineblauw, duidelijke actieknoppen." },
    image: IMG.elec1, gallery: [IMG.elec1],
    palettes: [
      { id: "elec-navy", name: "Navy", swatch: ["#FFFFFF", "#1E3A8A", "#1F2A44"] },
      { id: "elec-amber", name: "Amber", swatch: ["#FFFFFF", "#F2B632", "#1F2937"] },
      { id: "elec-slate", name: "Slate", swatch: ["#F8FAFC", "#2F6BDA", "#334155"] },
    ],
    availableSections: ["hero", "services", "areas", "about", "process", "form", "hours", "contact", "faq"],
    defaultSections: ["hero", "services", "areas", "about", "process", "form", "hours", "contact"],
    defaultServices: [
      { name: { en: "Fault finding & repair", nl: "Storing zoeken & verhelpen" }, description: { en: "Tripping breakers, dead sockets or flickering lights.", nl: "Doorslaande groepen, kapotte stopcontacten of knipperende lampen." }, price: "from 65" },
      { name: { en: "Fuse box replacement", nl: "Groepenkast vervangen" }, description: { en: "Upgrade to a modern, safe distribution board.", nl: "Vervangen door een moderne, veilige groepenkast." }, price: "on quote" },
      { name: { en: "EV charger installation", nl: "Laadpaal installeren" }, description: { en: "Home charging point connected to your installation.", nl: "Thuislaadpunt aangesloten op je installatie." }, price: "on quote" },
      { name: { en: "Sockets & lighting", nl: "Stopcontacten & verlichting" }, description: { en: "New points, switches and lighting installed.", nl: "Nieuwe aansluitpunten, schakelaars en verlichting." }, price: "from 45" },
      { name: { en: "Installation inspection", nl: "Installatiekeuring" }, description: { en: "A check of your electrical installation.", nl: "Controle van je elektrische installatie." }, price: "on quote" },
    ],
    cta: { en: "Request a quote", nl: "Vraag een offerte aan" },
    formType: "quote", usesAppointments: false, usesServiceAreas: true,
    dashboardPriorities: ["requests", "followups", "services"],
    tools: [{ en: "Quote requests with photos", nl: "Offerteaanvragen met foto's" }, { en: "Service areas", nl: "Werkgebied" }, { en: "Follow-ups", nl: "Opvolging" }],
    heroTitle: { en: "Electrical work, done properly.", nl: "Elektrawerk, goed geregeld." },
    heroSubtitle: { en: "Repairs, installations and upgrades for homes and small businesses.", nl: "Reparaties, installaties en vernieuwingen voor woningen en kleine bedrijven." },
    about: { en: "We are a local electrical business. We explain what we find, agree on the price beforehand and leave your home clean.", nl: "Wij zijn een lokaal elektrabedrijf. We leggen uit wat we vinden, spreken de prijs vooraf af en laten je huis netjes achter." },
  },
  plumber: {
    id: "plumber", template: "plumber",
    name: { en: "Plumber", nl: "Loodgieter" },
    short: { en: "Services & requests.", nl: "Diensten & aanvragen." },
    marketing: { en: "Clear service information and easy service requests.", nl: "Duidelijke informatie en eenvoudige serviceaanvragen." },
    direction: { en: "Reliable, modern, clean layout, strong contact actions.", nl: "Betrouwbaar, modern, overzichtelijk, duidelijke contactopties." },
    image: IMG.plumb1, gallery: [IMG.plumb1, IMG.plumb2],
    palettes: [
      { id: "plumb-teal", name: "Teal", swatch: ["#FFFFFF", "#167D8C", "#22343F"] },
      { id: "plumb-blue", name: "Blue", swatch: ["#FFFFFF", "#2563EB", "#1E2A44"] },
      { id: "plumb-graphite", name: "Graphite", swatch: ["#FAFAFA", "#E06A2B", "#222222"] },
    ],
    availableSections: ["hero", "services", "areas", "about", "process", "form", "hours", "contact", "faq"],
    defaultSections: ["hero", "services", "areas", "about", "form", "hours", "contact"],
    defaultServices: [
      { name: { en: "Leak repair", nl: "Lekkage verhelpen" }, description: { en: "Dripping taps, leaking pipes and connections.", nl: "Druppelende kranen, lekkende leidingen en koppelingen." }, price: "from 75" },
      { name: { en: "Blocked drain", nl: "Verstopping verhelpen" }, description: { en: "Toilets, sinks, showers and drains.", nl: "Toilet, gootsteen, douche en afvoer." }, price: "from 85" },
      { name: { en: "Boiler & heating", nl: "Cv-ketel & verwarming" }, description: { en: "Maintenance and repair of heating systems.", nl: "Onderhoud en reparatie van verwarming." }, price: "on quote" },
      { name: { en: "Bathroom installation", nl: "Badkamer installeren" }, description: { en: "Sanitary fittings, toilets and showers.", nl: "Sanitair, toiletten en douches." }, price: "on quote" },
    ],
    cta: { en: "Request a service", nl: "Vraag service aan" },
    formType: "service", usesAppointments: false, usesServiceAreas: true,
    dashboardPriorities: ["requests", "followups", "services"],
    tools: [{ en: "Service requests with photos", nl: "Serviceaanvragen met foto's" }, { en: "Service areas", nl: "Werkgebied" }, { en: "Follow-ups", nl: "Opvolging" }],
    heroTitle: { en: "Plumbing problems, solved.", nl: "Problemen met leidingen? Opgelost." },
    heroSubtitle: { en: "Leaks, blockages, heating and bathrooms. Clear prices, tidy work.", nl: "Lekkages, verstoppingen, verwarming en badkamers. Heldere prijzen, net werk." },
    about: { en: "A local plumbing business that picks up the phone, shows up when agreed and explains the work in plain language.", nl: "Een lokaal loodgietersbedrijf dat de telefoon opneemt, op tijd komt en het werk in gewone taal uitlegt." },
  },
  other: {
    id: "other", template: "other",
    name: { en: "Other business", nl: "Ander bedrijf" },
    short: { en: "A flexible professional website.", nl: "Een flexibele professionele website." },
    marketing: { en: "A flexible template for any service business.", nl: "Een flexibel sjabloon voor elk dienstverlenend bedrijf." },
    direction: { en: "Neutral, professional, flexible sections.", nl: "Neutraal, professioneel, flexibele secties." },
    image: IMG.office, gallery: [IMG.office],
    palettes: [
      { id: "other-ink", name: "Ink", swatch: ["#FFFFFF", "#1F2430", "#7B8190"] },
      { id: "other-olive", name: "Olive", swatch: ["#F9F8F2", "#6B7F45", "#3A3D2E"] },
      { id: "other-blue", name: "Blue", swatch: ["#FFFFFF", "#2563EB", "#111827"] },
    ],
    availableSections: ["hero", "services", "gallery", "about", "areas", "process", "form", "hours", "location", "contact", "faq"],
    defaultSections: ["hero", "services", "about", "form", "hours", "contact"],
    defaultServices: [
      { name: { en: "Consultation", nl: "Kennismaking" }, description: { en: "A first conversation about what you need.", nl: "Een eerste gesprek over wat je nodig hebt." }, price: "free" },
      { name: { en: "Standard service", nl: "Standaard dienst" }, description: { en: "Describe your main service here.", nl: "Beschrijf hier je belangrijkste dienst." }, price: "on request" },
    ],
    cta: { en: "Get in touch", nl: "Neem contact op" },
    formType: "contact", usesAppointments: false, usesServiceAreas: false,
    dashboardPriorities: ["requests", "followups", "services"],
    tools: [{ en: "Contact requests", nl: "Contactaanvragen" }, { en: "Flexible sections", nl: "Flexibele secties" }],
    heroTitle: { en: "Professional service, personally delivered.", nl: "Professionele service, persoonlijk geleverd." },
    heroSubtitle: { en: "Tell us what you need and we'll get back to you.", nl: "Vertel ons wat je nodig hebt en we nemen contact op." },
    about: { en: "A small, independent business focused on doing good work and keeping customers informed.", nl: "Een klein, onafhankelijk bedrijf dat zich richt op goed werk en duidelijke communicatie." },
  },
};

export const CATEGORY_ORDER: CategoryId[] = ["nail", "hair", "electrician", "plumber", "other"];
