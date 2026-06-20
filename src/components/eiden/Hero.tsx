import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import iconLogo from "@/assets/icon.png";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section id="hero" ref={ref} className="relative bg-canvas text-forest overflow-hidden border-b border-forest/10">
      {/* subtle paper grid only — no color blocks, no rule lines */}
      <div className="absolute inset-0 paper-grid opacity-60" />

      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-28 pb-16 min-h-[80vh] flex flex-col">

        {/* top meta row — Swiss */}
        <div className="flex items-start justify-between gap-6 mb-12 md:mb-20">
          <div className="font-mono text-[10px] md:text-xs text-forest/60 leading-relaxed">
            Agadir
          </div>
          <div className="font-mono text-[10px] md:text-xs text-forest/70 text-right">
            <div>EIDEN · ARCHITECTURE D'ENTREPRISE</div>
            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mondrian-red opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mondrian-red" />
              </span>
              APPELS DÉCOUVERTE OUVERTS
            </div>
          </div>
        </div>

        {/* headline */}
        <h1 className="font-display font-light text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.04em] text-balance max-w-[16ch]">
          {"Vous n'avez pas un problème de stratégie.".split(" ").map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.25em]">{w}</motion.span>
          ))}
          <br />
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }} className="inline-block">
            Vous avez un problème de{" "}
            <span className="font-display-wonk italic text-teal">structure</span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-mondrian-red">.</motion.span>
          </motion.span>
        </h1>

        {/* deck row */}
        <div className="mt-auto pt-16 grid md:grid-cols-12 gap-8 items-end">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="md:col-span-5 text-lg md:text-xl leading-[1.5] text-forest/70 text-pretty">
            Réservez un appel gratuit de 30 minutes avec EIDEN, le premier cabinet d'architecture d'entreprise du Maroc, et voyez précisément où la vôtre se fissure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="md:col-span-4 md:col-start-7 flex flex-col gap-3">
            <a href="#lead-form" className="group inline-flex items-center justify-between gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring">
              <span>Réserver mon appel découverte gratuit</span>
              <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">→</span>
            </a>
            <p className="font-label text-[10px] text-forest/55">
              Gratuit · 30 minutes · Sans présentation commerciale
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="md:col-span-2 md:col-start-11 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-forest/60">
            <img src={iconLogo} alt="" className="h-12 w-12 opacity-50" style={{ filter: "brightness(0.3) sepia(0.6)" }} />
            <div className="text-right leading-relaxed">
              fig.01<br />discovery call
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
