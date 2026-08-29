import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// ============================================================
// PAGE /moi-demain-plus — souscription à l'abonnement B2C
// À intégrer dans src/pages/MoiDemainPlusSouscription.jsx
// Route à ajouter : <Route path="/moi-demain-plus" element={<MoiDemainPlusSouscription />} />
// ============================================================

export default function MoiDemainPlusSouscription() {
  const [plan, setPlan] = useState("mensuel");
  const [form, setForm] = useState({ prenom: "", nom: "", email: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO intégration : créer/associer le compte utilisateur, puis rediriger
    // vers le prestataire de paiement (Stripe Checkout, etc.) avec le `plan` choisi.
    // Après confirmation du paiement, activer l'abonnement Moi Demain+ côté backend.
    alert("Intégration paiement à brancher (Stripe ou équivalent).");
  };

  return (
    <div data-testid="moi-demain-plus-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/tarifs/particuliers" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour aux tarifs
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-base uppercase tracking-[0.15em] text-brick font-bold">Moi Demain+</span>
            <h1 className="font-heading text-5xl text-navy mt-4 leading-[1.05]">Passe à Moi Demain+.</h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              Choisis ta formule, renseigne tes informations, et débloque le suivi complet de ton parcours.
            </p>
          </motion.div>

          <div className="mt-8 flex bg-white border border-navy/10 rounded-full p-1">
            <button
              type="button"
              onClick={() => setPlan("mensuel")}
              className={`flex-1 rounded-full py-3 font-body font-semibold text-sm transition-colors ${
                plan === "mensuel" ? "bg-navy text-cream" : "text-navy/50"
              }`}
            >
              Mensuel — 4,99€/mois
            </button>
            <button
              type="button"
              onClick={() => setPlan("annuel")}
              className={`flex-1 rounded-full py-3 font-body font-semibold text-sm transition-colors ${
                plan === "annuel" ? "bg-navy text-cream" : "text-navy/50"
              }`}
            >
              Annuel — 39€/an
            </button>
          </div>

          <div className="mt-6 bg-white border border-navy/10 rounded-[1.5rem] p-7">
            <div className="font-heading text-4xl text-navy">
              {plan === "mensuel" ? "4,99€" : "39€"}
              <span className="font-body text-base text-navy/50 ml-1">{plan === "mensuel" ? "/mois" : "/an"}</span>
            </div>
            {plan === "annuel" && (
              <span className="inline-block mt-2 bg-brick text-cream text-xs font-body font-semibold rounded-full px-3 py-1">
                2 mois offerts
              </span>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container-md max-w-xl">
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
              <label className="font-body text-sm font-semibold text-navy block mb-1.5">Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none" />
            </div>

            <button type="submit" data-testid="moi-demain-plus-submit"
              className="mt-6 w-full bg-navy text-cream rounded-full py-4 font-body font-semibold hover:scale-[1.01] transition-transform">
              Continuer vers le paiement
            </button>
            <p className="font-body text-xs text-navy/45 mt-4 text-center">
              Paiement sécurisé. Résiliable à tout moment depuis ton compte.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
