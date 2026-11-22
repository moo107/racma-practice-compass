import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/marketing/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — RACMA" }, { name: "description", content: "Log in to your RACMA account to manage your website, requests and customers." }, { property: "og:title", content: "Log in — RACMA" }, { property: "og:description", content: "Log in to your RACMA account to manage your website, requests and customers." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <AuthCard mode="login" />,
});
