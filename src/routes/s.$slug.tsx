import { createFileRoute } from "@tanstack/react-router";
import { SiteRenderer } from "@/components/sites/templates";
import { DEMO_SLUGS, defaultServices, demoBusiness } from "@/config/demo";
import { useApp } from "@/store/app-store";

export const Route = createFileRoute("/s/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — website made with RACMA` }, { name: "description", content: "A business website made with RACMA." }, { property: "og:title", content: params.slug }, { property: "og:description", content: "A business website made with RACMA." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: PublicSite,
});

function PublicSite() {
  const { slug } = Route.useParams();
  const app = useApp();
  const demoCat = DEMO_SLUGS[slug];
  if (demoCat) {
    const b = demoBusiness(demoCat);
    return <SiteRenderer business={b} services={defaultServices(b)} />;
  }
  if (app.business.slug === slug) return <SiteRenderer business={app.business} services={app.services} onRequest={(r) => app.addRequest(r)} />;
  return <div className="grid min-h-screen place-items-center text-muted-foreground">Website not found</div>;
}
