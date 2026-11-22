import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Faq, FinalCta, Pricing } from "@/components/marketing/sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — RACMA" }, { name: "description", content: "Starter, Pro and Business plans for independent professionals. Demonstration prices from €19 per month." }, { property: "og:title", content: "Pricing — RACMA" }, { property: "og:description", content: "Starter, Pro and Business plans for independent professionals. Demonstration prices from €19 per month." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <MarketingLayout><div className="h-8" /><Pricing /><Faq /><FinalCta /></MarketingLayout>,
});
