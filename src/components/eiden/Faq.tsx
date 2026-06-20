import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Est-ce vraiment gratuit ?",
    a: "Oui. L'appel de 30 minutes ne coûte rien : pas de carte bancaire, pas de piège. S'il y a une adéquation pour une mission payante ensuite, le plus petit engagement démarre à 3 000 MAD pour un diagnostic structuré, et nous vous le dirons clairement. S'il n'y a pas d'adéquation, vous repartez tout de même avec une vision plus claire de votre entreprise qu'avant l'appel.",
  },
  {
    q: "Vais-je avoir droit à un argumentaire de vente ?",
    a: "Non. C'est une conversation directe sur votre entreprise et la direction à prendre : pas de slides, aucune pression pour décider quoi que ce soit pendant l'appel.",
  },
  {
    q: "À quelle taille d'entreprise est-ce destiné ?",
    a: "La plupart de nos clients réalisent entre 2 et 100 millions de MAD de chiffre d'affaires. Plus petit ou plus tôt dans votre développement ? Nous prendrons l'appel quand même et vous orienterons vers le bon point de départ, même si ce n'est pas encore nous.",
  },
  {
    q: "Sous combien de temps me répondez-vous ?",
    a: "Sous 24 heures. Un membre de l'équipe EIDEN lit personnellement chaque demande, aucune réponse automatique ne remplace une vraie.",
  },
  {
    q: "Travaillez-vous uniquement avec certains secteurs ?",
    a: "Non. Nos clients actuels couvrent l'hôtellerie, les opérations, le commerce de détail, l'éducation et la santé. Le diagnostic vient d'abord dans tous les cas, c'est lui qui nous dit s'il y a une réelle adéquation.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-canvas text-forest py-20 md:py-28">
      <div className="mx-auto max-w-[820px] px-5 md:px-8">
        <div className="mb-12">
          <div className="font-label text-[11px] uppercase tracking-[0.12em] text-teal mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-teal" /> Questions fréquentes
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Les derniers doutes avant de cliquer<span className="text-mondrian-red">.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-forest/15">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-forest/15">
              <AccordionTrigger className="font-head text-base md:text-lg hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-forest/70 text-base leading-relaxed pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
