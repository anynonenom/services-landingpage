import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/eiden/Nav";
import { Hero } from "@/components/eiden/Hero";
import { Problem } from "@/components/eiden/Problem";
import { Reframe } from "@/components/eiden/Reframe";
import { ProofBar } from "@/components/eiden/ProofBar";
import { HowItWorks } from "@/components/eiden/HowItWorks";
import { Testimonial } from "@/components/eiden/Testimonial";
import { Faq } from "@/components/eiden/Faq";
import { LeadForm } from "@/components/eiden/LeadForm";
import { Footer } from "@/components/eiden/Footer";
import { StickyCTA } from "@/components/eiden/StickyCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EIDEN | Appel découverte gratuit · Architecture d'entreprise" },
      { name: "description", content: "Vous n'avez pas un problème de stratégie. Vous avez un problème de structure. Réservez un appel gratuit de 30 minutes avec EIDEN, le premier cabinet d'architecture d'entreprise du Maroc." },
      { property: "og:title", content: "EIDEN | Appel découverte gratuit" },
      { property: "og:description", content: "30 minutes. Gratuit. Sans présentation commerciale. Voyez exactement où votre entreprise se fissure." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-canvas text-forest font-body">
      <Nav />
      <Hero />
      <Problem />
      <Reframe />
      <ProofBar />
      <HowItWorks />
      <Testimonial />
      <Faq />
      <LeadForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
