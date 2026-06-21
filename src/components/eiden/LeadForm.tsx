import { motion } from "framer-motion";
import { useState } from "react";
import { Check, User, Phone, Mail, Building2, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import icon from "@/assets/icon.png";
import { supabase, supabaseConfigured } from "@/lib/supabase";

type Form = { name: string; phone: string; email: string; company: string; consent: boolean };
const empty: Form = { name: "", phone: "", email: "", company: "", consent: false };

const TRUST = [
  "100 % gratuit, sans carte bancaire",
  "30 minutes, sans présentation commerciale",
  "Réponse personnelle d'un associé sous 24 h",
];

export function LeadForm() {
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errors = {
    name: form.name.trim().length < 2 ? "Indiquez votre nom." : "",
    phone: form.phone.trim().length < 6 ? "Numéro de téléphone invalide." : "",
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "E-mail invalide." : "",
    consent: !form.consent ? "Veuillez accepter pour continuer." : "",
  };
  const valid = !errors.name && !errors.phone && !errors.email && !errors.consent;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      if (!supabaseConfigured || !supabase) {
        throw new Error("Supabase not configured");
      }

      const { error: fnError } = await supabase.functions.invoke(
        "send-email-appel",
        {
          body: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            company: form.company.trim(),
          },
        }
      );

      if (fnError) throw fnError;
      setSent(true);
    } catch (err) {
      console.error("Edge function error:", err);
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="relative bg-forest text-cream py-20 md:py-28 overflow-hidden grain">
      <div className="absolute inset-0 paper-grid opacity-[0.06]" />
      <div className="absolute top-0 right-0 h-2 w-1/4 bg-mondrian-red" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8 grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* closing headline + reassurance + trust */}
        <div className="md:col-span-5">
          <div className="font-label text-[11px] uppercase tracking-[0.12em] text-gold mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-gold" /> Réserver
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.03] tracking-[-0.02em] text-balance">
            Voyez exactement où agir{" "}
            <span className="font-display-wonk italic text-gold">en premier</span>
            <span className="text-mondrian-red">.</span>
          </h2>
          <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
            Un membre de l'équipe EIDEN lit chaque demande personnellement et vous répond
            sous 24 heures.
          </p>

          <ul className="mt-8 space-y-3">
            {TRUST.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-cream/85">
                <span className="mt-0.5 grid place-items-center h-5 w-5 shrink-0 rounded-full bg-gold/20 text-gold">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 rounded-2xl bg-canvas text-forest shadow-2xl overflow-hidden"
        >
          {/* card header */}
          <div className="flex items-center justify-between px-7 md:px-9 py-5 border-b border-forest/10 bg-cream/60">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-forest/50">Appel découverte</div>
              <div className="font-head text-base font-semibold">Réservez votre créneau</div>
            </div>
            <span className="grid place-items-center h-11 w-11 rounded-full bg-forest">
              <img src={icon} alt="" className="h-6 w-6" />
            </span>
          </div>

          <div className="p-7 md:p-9">
            {sent ? (
              /* Success state */
              <div className="py-10 text-center">
                <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-teal text-canvas">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-3xl">Demande transmise.</h3>
                <p className="mt-3 text-forest/70 max-w-sm mx-auto">
                  Un membre de l'équipe EIDEN lit chaque demande personnellement et vous répond
                  sous 24 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field icon={User} label="Nom complet" required v={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Prénom Nom" error={showErrors ? errors.name : ""} />
                  <Field icon={Phone} label="Téléphone" type="tel" required v={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+212 …" error={showErrors ? errors.phone : ""} />
                </div>
                <Field icon={Mail} label="E-mail" type="email" required v={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="vous@entreprise.com" error={showErrors ? errors.email : ""} />
                <Field icon={Building2} label="Nom de l'entreprise" optional v={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Optionnel" />

                <label className="flex items-start gap-3 text-sm text-forest/70 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--forest)]"
                  />
                  <span>
                    J'accepte qu'EIDEN traite mes données afin de me recontacter, conformément à la{" "}
                    <a href="#" className="text-teal underline underline-offset-2">politique de confidentialité</a>.
                  </span>
                </label>
                {showErrors && errors.consent && (
                  <p className="text-[12px] text-mondrian-red -mt-3">{errors.consent}</p>
                )}

                {/* Error banner */}
                {error && (
                  <div className="flex items-start gap-3 rounded-xl bg-mondrian-red/10 border border-mondrian-red/30 px-4 py-3 text-sm text-mondrian-red">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-forest px-7 py-4 font-head text-sm font-medium text-canvas hover:bg-mondrian-red transition focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Réserver mon appel découverte gratuit
                      <span className="grid place-items-center h-7 w-7 rounded-full bg-canvas/15 group-hover:bg-canvas/25 transition">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 font-label text-[11px] text-forest/50">
                  <Lock className="h-3 w-3" /> Vos informations restent confidentielles.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, v, onChange, type = "text", required, optional, placeholder, error }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; v: string; onChange: (v: string) => void; type?: string; required?: boolean; optional?: boolean; placeholder?: string; error?: string;
}) {
  return (
    <label className="block">
      <span className="font-label text-[10px] uppercase tracking-[0.08em] text-forest/55">
        {label}{required && " *"}{optional && <span className="text-forest/35"> · optionnel</span>}
      </span>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/35" />
        <input
          type={type}
          required={required}
          value={v}
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-cream rounded-xl pl-11 pr-4 py-3.5 text-forest font-head text-base outline-none transition focus:bg-canvas focus:ring-2 placeholder:text-forest/35 ${
            error ? "border border-mondrian-red focus:border-mondrian-red focus:ring-mondrian-red/25" : "border border-forest/15 focus:border-forest focus:ring-teal/25"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-[12px] text-mondrian-red">{error}</p>}
    </label>
  );
}
