import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// First quote is the real, published testimonial (per brief). The other two are
// existing placeholders carried over from the project, confirm/replace before launch.
const TESTIMONIALS = [
  { q: "EIDEN n'a pas livré une stratégie ; ils ont reconstruit le système qui fait tourner nos opérations. Six mois plus tard, nous gérons 35 % de charge en plus avec la même équipe. Ce n'est pas du conseil. C'est de l'architecture.", n: "Amine El Idrissi", r: "Directeur Général" },
  { q: "Personne n'a regardé notre business avec cette rigueur. Le diagnostic seul a payé l'engagement entier.", n: "Sophia M.", r: "Directrice générale · DMC" },
  { q: "Marque, marketing et opérations alignés sur une seule logique. Coût d'acquisition −38 % en un trimestre.", n: "Karim L.", r: "Fondateur · E-commerce" },
];

export function Testimonial() {
  const [tIndex, setTIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="temoignage" className="relative bg-forest text-cream py-16 md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Title */}
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-gold mb-3 md:mb-4">TÉMOIGNAGES</div>
            <h2 className="font-display font-light text-[clamp(1.9rem,7vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance">
              Ce qu'en disent ceux qui nous ont fait <span className="font-display-wonk italic text-gold">confiance</span>
              <span className="text-mondrian-red">.</span>
            </h2>
          </div>

          {/* Controls + slider */}
          <div className="md:col-span-7 min-w-0">
            <div className="flex justify-end gap-2 mb-5 md:mb-6">
              <button aria-label="Témoignage précédent" onClick={() => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="h-10 w-10 grid place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream hover:bg-cream/10 focus-ring">
                ←
              </button>
              <button aria-label="Témoignage suivant" onClick={() => setTIndex((i) => (i + 1) % TESTIMONIALS.length)} className="h-10 w-10 grid place-items-center rounded-full border border-cream/30 text-cream transition hover:border-cream hover:bg-cream/10 focus-ring">
                →
              </button>
            </div>

            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: `translateX(-${tIndex * 100}%)` }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="shrink-0 w-full min-w-0">
                    <div className="flex items-start gap-3 md:gap-5">
                      <span className="font-display text-4xl md:text-7xl leading-none text-gold/30 select-none">"</span>
                      <div className="min-w-0">
                        <blockquote className="font-display text-lg sm:text-xl md:text-3xl leading-[1.3] tracking-[-0.01em] text-pretty break-words">
                          {t.q}
                        </blockquote>
                        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full grid place-items-center bg-gold text-forest font-mono text-xs">
                            {t.n[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="font-head text-sm font-medium truncate">{t.n}</div>
                            <div className="font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-cream/70 truncate">{t.r}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-8 md:mt-10 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} aria-label={`Témoignage ${i + 1}`} onClick={() => setTIndex(i)} className={`h-0.5 rounded-full transition-all ${i === tIndex ? "w-10 md:w-12 bg-gold" : "w-[18px] bg-cream/30"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Founder credibility strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-14 md:mt-20 grid gap-4 md:grid-cols-12 md:gap-6 items-start border-t border-cream/15 pt-8 md:pt-10"
        >
          <div className="md:col-span-3 font-mono text-[10px] text-gold">LE FONDATEUR</div>
          <h3 className="md:col-span-4 font-head text-lg font-semibold leading-snug">
            Conçu par quelqu'un qui l'a fait de l'intérieur
          </h3>
          <p className="md:col-span-5 text-cream/75 leading-relaxed">
            Avant de fonder EIDEN, Oualid Laati a passé douze ans au sein de grandes marques
            mondiales, dont Amazon, Orange, Samsung et Renault, en vente, marketing,
            opérations et déploiement de l'IA. EIDEN est le cabinet qu'il aurait aimé pouvoir engager.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
