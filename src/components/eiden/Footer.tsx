import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/eiden-logo.png";

export function Footer() {
  return (
    <footer className="bg-canvas text-forest border-t border-forest/15">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <img src={logo} alt="EIDEN Group" className="h-9 w-auto" />
          </div>

          <div className="md:col-span-5 space-y-3 font-head text-sm">
            <a href="mailto:contact@eiden-group.com" className="flex items-center gap-3 text-forest/75 hover:text-forest transition">
              <Mail className="h-4 w-4 text-teal" /> contact@eiden-group.com
            </a>
            <a href="tel:+212777777428" className="flex items-center gap-3 text-forest/75 hover:text-forest transition">
              <Phone className="h-4 w-4 text-teal" /> +212 7 77 77 74 28
            </a>
            <div className="flex items-center gap-3 text-forest/75">
              <MapPin className="h-4 w-4 text-teal" /> Agadir Bay, Technopole, Agadir, Maroc
            </div>
          </div>

          <div className="md:col-span-3 flex md:justify-end gap-5 font-label text-[11px] text-forest/70">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-forest transition">LinkedIn</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-forest transition">Instagram</a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-forest/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] text-forest/55">
          <div>© {new Date().getFullYear()} EIDEN GROUP · TOUS DROITS RÉSERVÉS</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-forest transition">Confidentialité</a>
            <a href="#" className="hover:text-forest transition">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
