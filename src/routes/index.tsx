import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { Categories, DashboardPreview, Examples, Faq, Features, FinalCta, Hero, HowItWorks, Pricing, Problems, Solution } from "@/components/marketing/sections";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "RACMA — Website, requests and customers in one place" }, { name: "description", content: "Create a professional business website, receive customer requests and manage your business — all from one simple platform." }, { property: "og:title", content: "RACMA — Website, requests and customers in one place" }, { property: "og:description", content: "Create a professional business website, receive customer requests and manage your business — all from one simple platform." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

function Home() {
  return (
    <MarketingLayout>
      <Hero /><Problems /><Solution /><Categories /><Features /><Examples /><DashboardPreview /><HowItWorks /><Pricing /><Faq /><FinalCta />
    </MarketingLayout>
  );
}
