import { motion } from "framer-motion";

const SYMPTOMS = [
  "Certains mois sont excellents. D'autres, vous ne savez pas les expliquer. Et personne dans l'équipe ne peut vous dire exactement pourquoi.",
  "Vos opérations tiennent sur des notes vocales WhatsApp et des groupes de discussion — et, d'une manière ou d'une autre, ça tient encore. Pour l'instant.",
  "Vous avez acheté les outils, recruté les freelances, lancé les publicités. Le chiffre d'affaires ne bouge toujours pas comme il le devrait.",
  "La marque est belle vue de l'extérieur. En dessous, tout tient avec du scotch.",
];

export function Problem() {
  return (
    <section id="probleme" className="relative bg-canvas text-forest py-20 md:py-28 border-t border-forest/10">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="max-w-[760px] mb-12">
          <div className="font-label text-[11px] uppercase tracking-[0.12em] text-teal mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-teal" /> Le constat
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Ça vous parle<span className="text-mondrian-red">?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {SYMPTOMS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-md border border-forest/15 bg-cream p-7"
            >
              <span className="font-mono text-[11px] text-forest/35">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-lg leading-snug text-pretty">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
