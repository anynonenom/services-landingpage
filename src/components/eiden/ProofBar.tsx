import { motion } from "framer-motion";
import logoAllAccor from "@/assets/All Accor.png";
import logoBoPassage from "@/assets/bopassage.png";
import logoChillOut from "@/assets/chill-out.png";
import logoDmc from "@/assets/dmc.png";
import logoEducazenKids from "@/assets/educazenkids.png";
import logoLunjaVillage from "@/assets/lunja-village.png";
import logoMedicalBay from "@/assets/medical-bay.png";

const BRAND_LOGOS = [
  { name: "Lunja Village", src: logoLunjaVillage },
  { name: "DMC Hospitality Morocco", src: logoDmc },
  { name: "Bô Passage", src: logoBoPassage },
  { name: "EducazenKids", src: logoEducazenKids },
  { name: "All Accor", src: logoAllAccor },
  { name: "Chill Out Bar & Lounge", src: logoChillOut },
  { name: "Medical Bay", src: logoMedicalBay },
];

export function ProofBar() {
  return (
    <section id="references" className="bg-canvas text-forest py-16 md:py-24 border-y border-forest/10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="font-label text-[11px] uppercase tracking-[0.12em] text-forest/50 text-center mb-9">
          Ils nous font confiance
        </div>
      </div>

      {/* animated marquee */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="overflow-hidden">
          <div className="marquee-track flex items-center gap-14 md:gap-20 px-5 md:px-10 will-change-transform">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
              <div key={i} className="shrink-0 h-24 md:h-36 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-[280px] md:max-w-[340px] object-contain opacity-80 hover:opacity-100 transition"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
