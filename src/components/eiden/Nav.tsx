import { motion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import logo from "@/assets/eiden-logo.png";

/**
 * Lead-gen header — hard rule (Build Guide §1): NO navigation menu.
 * The only non-CTA contact point allowed is a click-to-call phone number.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(254,253,251,0)", "rgba(254,253,251,0.92)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(18,38,32,0)", "rgba(18,38,32,0.10)"]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center group">
          <img src={logo} alt="EIDEN Group" className="h-7 md:h-8 w-auto" />
        </a>

        {/* Click-to-call — the only escape hatch */}
        <a
          href="tel:+212777777428"
          className="group inline-flex items-center gap-2.5 font-label text-[11px] text-forest/80 hover:text-forest transition"
        >
          <span className="grid place-items-center h-9 w-9 rounded-full bg-forest/5 group-hover:bg-forest group-hover:text-canvas transition">
            <Phone className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline tracking-wide">+212 7 77 77 74 28</span>
        </a>
      </div>
    </motion.header>
  );
}
