import { motion } from "framer-motion";

const STEPS = [
  { n: "01", t: "Réservez votre appel gratuit", d: "Choisissez un créneau. Deux minutes suffisent." },
  { n: "02", t: "Participez à l'appel", d: "30 minutes, sans présentation commerciale. Juste vous, qui nous présentez votre entreprise." },
  { n: "03", t: "Repartez avec de la clarté", d: "Que vous nous engagiez ou non, vous saurez exactement par où commencer." },
];

export function HowItWorks() {
  return (
    <section id="methode" className="bg-canvas text-forest py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="max-w-[760px] mb-12">
          <div className="font-label text-[11px] uppercase tracking-[0.12em] text-teal mb-4 flex items-center gap-3">
            <span className="h-px w-7 bg-teal" /> Comment ça marche
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            Trois étapes. Aucune surprise<span className="text-mondrian-red">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-md border border-forest/15 bg-cream p-7"
            >
              <span className="inline-block font-mono text-[11px] bg-forest text-canvas px-2 py-1 rounded-sm">{s.n}</span>
              <h3 className="mt-5 font-head text-lg font-semibold">{s.t}</h3>
              <p className="mt-2.5 text-forest/70 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        {/* mid-page conversion point */}
        <div className="mt-12 text-center">
          <a href="#lead-form" className="group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring">
            Réserver mon appel découverte gratuit
            <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">→</span>
          </a>
          <p className="mt-4 font-label text-[11px] text-forest/60">Gratuit. 30 minutes. Sans présentation commerciale.</p>
        </div>
      </div>
    </section>
  );
}
