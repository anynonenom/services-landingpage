import { motion } from "framer-motion";

const STATS = [
  { v: "2025", l: "Fondé" },
  { v: "27+", l: "Entreprises architecturées" },
  { v: "43%", l: "Gain d'efficacité moyen" },
  { v: "4", l: "Continents servis" },
];

export function Reframe() {
  return (
    <section id="reframe" className="relative bg-forest text-cream py-20 md:py-28 overflow-hidden grain">
      <div className="absolute inset-0 paper-grid opacity-[0.06]" />
      <div className="absolute top-0 left-0 h-2 w-1/4 bg-mondrian-yellow" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="max-w-[820px]">
          <div className="font-label text-[11px] uppercase tracking-[0.12em] text-gold mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-gold" /> Le recadrage
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Pas un problème de stratégie. Un problème de{" "}
            <span className="font-display-wonk italic text-gold">structure</span>
            <span className="text-mondrian-red">.</span>
          </h2>
          <p className="mt-7 text-lg md:text-xl leading-relaxed text-cream/80 text-pretty">
            La plupart des consultants vous vendent un plan. EIDEN conçoit l'architecture
            sur laquelle votre entreprise fonctionne réellement : les systèmes et les
            décisions qui se trouvent sous le plan. Nous sommes le premier cabinet à mener
            ce travail au Maroc. Fondé en 2025. Déjà derrière les systèmes qui font tourner
            plus de 27 entreprises, avec un gain d'efficacité moyen de 43 % en moins de six mois.
          </p>
        </div>

        {/* stat chips */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/15 border border-cream/15 rounded-md overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-forest p-6"
            >
              <div className="font-display text-4xl md:text-5xl text-gold leading-none">{s.v}</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-cream/60">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
