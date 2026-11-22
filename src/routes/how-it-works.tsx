import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Examples, FinalCta, HowItWorks, Faq } from "@/components/marketing/sections";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [{ title: "How it works — RACMA" }, { name: "description", content: "Choose your trade, add your details, customise and preview your website, then manage customer requests from one dashboard." }, { property: "og:title", content: "How it works — RACMA" }, { property: "og:description", content: "Choose your trade, add your details, customise and preview your website, then manage customer requests from one dashboard." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <MarketingLayout><HowItWorks /><Examples /><Faq /><FinalCta /></MarketingLayout>,
});
