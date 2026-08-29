import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// ============================================================
// PAGE /contact-commercial — formulaire commun aux offres B2B
// (établissements + entreprises)
// À intégrer dans src/pages/ContactCommercial.jsx
// Route à ajouter : <Route path="/contact-commercial" element={<ContactCommercial />} />
//
// Utilisation : les boutons "Demander un échange" doivent pointer vers
// /contact-commercial?offre=<clé>, avec <clé> une des valeurs de OFFRES ci-dessous.
// ============================================================

const OFFRES = {
  "etablissement-decouverte": "Établissement Découverte — 490€ HT/an",
  "etablissement-pro": "Établissement Pro — 990€ HT/an",
  "groupe-etablissements": "Groupe / réseau — à partir de 2 500€/an",
  "entreprise-essentielle": "Offre Essentielle — 1 500€ HT/an",
  "entreprise-immersion": "Offre Immersion — 3 500€ HT/an",
  "entreprise-premium": "Offre Premium — à partir de 7 500€ HT/an",
};

export default function ContactCommercial() {
  const [searchParams] = useSearchParams();
  const offreKey = searchParams.get("offre");
  const offreLabel = offreKey && OFFRES[offreKey] ? OFFRES[offreKey] : null;

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", structure: "", fonction: "", effectif: "", message: "",
  });
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO intégration : envoyer `form` + `offreKey` à l'API backend
    // (endpoint à créer côté FastAPI, ex. POST /api/contact-commercial)
    // qui relaie par email à hello@moidemain.fr et/ou stocke la demande en base.
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div data-testid="contact-commercial-success" className="container-md py-24 max-w-xl text-center">
        <h1 className="font-heading text-3xl text-navy">Merci, {form.prenom} !</h1>
        <p className="font-body text-navy/70 mt-4">
          Votre demande a bien été transmise. Un membre de l'équipe Moi Demain vous recontacte sous 48h.
        </p>
        <Link to="/tarifs" className="inline-flex mt-8 bg-navy text-cream rounded-full px-6 py-3 font-body font-semibold text-sm">
          Retour aux tarifs
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="contact-commercial-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/tarifs" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour aux tarifs
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-2xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-base uppercase tracking-[0.15em] text-brick font-bold">Demande d'échange</span>
            <h1 className="font-heading text-5xl text-navy mt-4 leading-[1.05]">Parlons de votre projet.</h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              Décrivez-nous votre structure, un membre de l'équipe Moi Demain vous recontacte sous 48h pour affiner l'offre la plus adaptée.
            </p>
          </motion.div>

          <div className="mt-8 bg-white rounded-[1.25rem] p-6 border border-navy/10 flex items-center justify-between">
            <div>
              <div className="font-body text-[11px] uppercase tracking-widest text-navy/50">Offre sélectionnée</div>
              <div className="font-heading text-xl text-navy mt-1">{offreLabel || "—"}</div>
            </div>
            <span className="bg-navy text-cream text-xs font-body font-semibold rounded-full px-4 py-1.5 whitespace-nowrap">
              {offreLabel ? "Pré-sélectionnée" : "À préciser"}
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="container-md max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 md:p-10 border border-navy/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm font-semibold text-navy block mb-1.5">Prénom</label>
                <input required name="prenom" value={form.prenom} onChange={handleChange}
                  className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-navy block mb-1.5">Nom</label>
                <input required name="nom" value={form.nom} onChange={handleChange}
                  className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="font-body text-sm font-semibold text-navy block mb-1.5">Email professionnel</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-body text-sm font-semibold text-navy block mb-1.5">Établissement / entreprise</label>
                <input required name="structure" value={form.structure} onChange={handleChange}
                  className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-navy block mb-1.5">Votre fonction</label>
                <input required name="fonction" placeholder="Ex. Proviseur, CPE, DRH..." value={form.fonction} onChange={handleChange}
                  className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="font-body text-sm font-semibold text-navy block mb-1.5">
                Nombre d'élèves ou de collaborateurs concernés <span className="font-normal text-navy/40">(optionnel)</span>
              </label>
              <input type="number" min="0" name="effectif" value={form.effectif} onChange={handleChange}
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
            </div>

            <div className="mt-4">
              <label className="font-body text-sm font-semibold text-navy block mb-1.5">
                Votre message <span className="font-normal text-navy/40">(optionnel)</span>
              </label>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                placeholder="Précisez votre besoin, vos délais, ou toute question sur l'offre..."
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none resize-y" />
            </div>

            <button type="submit" data-testid="contact-commercial-submit"
              className="mt-6 w-full bg-navy text-cream rounded-full py-4 font-body font-semibold hover:scale-[1.01] transition-transform">
              Envoyer ma demande
            </button>
            <p className="font-body text-xs text-navy/45 mt-4 text-center leading-relaxed">
              Vos données sont utilisées uniquement pour vous recontacter dans le cadre de cette demande. Elles ne sont ni revendues ni utilisées à des fins commerciales tierces.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
