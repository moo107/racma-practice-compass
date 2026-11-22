import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Categories, DashboardPreview, Features, FinalCta, Solution } from "@/components/marketing/sections";

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [{ title: "Features — RACMA" }, { name: "description", content: "Sector-specific websites, a request inbox, appointment requests, customer overview and follow-ups for independent professionals." }, { property: "og:title", content: "Features — RACMA" }, { property: "og:description", content: "Sector-specific websites, a request inbox, appointment requests, customer overview and follow-ups for independent professionals." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <MarketingLayout><div className="h-8" /><Solution /><Features /><Categories /><DashboardPreview /><FinalCta /></MarketingLayout>,
});
