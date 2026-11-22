import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/marketing/AuthCard";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — RACMA" }, { name: "description", content: "Start setting up your professional business website with RACMA." }, { property: "og:title", content: "Create your account — RACMA" }, { property: "og:description", content: "Start setting up your professional business website with RACMA." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <AuthCard mode="signup" />,
});
