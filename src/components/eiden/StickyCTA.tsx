import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Mobile-only sticky CTA. Appears after the hero scrolls out of view and
 * hides once the lead form is on screen (avoid two CTAs at once).
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("lead-form");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const formVisible = form ? form.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !formVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[80] md:hidden p-3 bg-canvas/90 backdrop-blur-md border-t border-forest/10"
        >
          <a
            href="#lead-form"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-mondrian-red px-6 py-3.5 font-head text-sm font-semibold text-canvas focus-ring"
          >
            Réserver mon appel gratuit →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
