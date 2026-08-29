import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

// ============================================================
// PAGE /tarifs/entreprises — Essentielle / Immersion / Premium (B2B recrutement)
// À intégrer dans src/pages/TarifsEntreprises.jsx
// Route à ajouter : <Route path="/tarifs/entreprises" element={<TarifsEntreprises />} />
// ============================================================

const OFFRES = [
  {
    nom: "Offre Essentielle",
    prix: "1 500€",
    periode: "HT/an",
    desc: "Présentez votre entreprise et vos métiers clés aux futurs talents.",
    features: [
      "Page entreprise dédiée",
      "3 métiers présentés",
      "Présentation de l'entreprise",
      "Environnement de travail",
      "Liens vers vos offres de recrutement",
      "Immersion simple",
    ],
    accent: false,
    offreKey: "entreprise-essentielle",
  },
  {
    nom: "Offre Immersion",
    prix: "3 500€",
    periode: "HT/an",
    desc: "Une expérience immersive pour donner envie de vous rejoindre.",
    features: [
      "5 métiers présentés",
      "Immersion interactive",
      "Témoignages de collaborateurs",
      "Parcours de carrière",
      "Quiz de compatibilité",
      "Présentation des avantages",
      "Liens vers vos offres d'emploi",
    ],
    accent: true,
    badge: "Le plus choisi",
    offreKey: "entreprise-immersion",
  },
  {
    nom: "Offre Premium",
    prix: "7 500€",
    periode: "HT/an",
    prefixe: "à partir de",
    desc: "Pour une présence complète sur plusieurs établissements et publics.",
    features: [
      "10 métiers présentés",
      "Plusieurs établissements ciblés",
      "Parcours personnalisés",
      "Contenus vidéo",
      "Campagne d'orientation dédiée",
      "Statistiques agrégées",
      "Participation à des événements",
    ],
    accent: false,
    offreKey: "entreprise-premium",
  },
];

export default function TarifsEntreprises() {
  return (
    <div data-testid="tarifs-entreprises-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/tarifs" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-12">
        <div className="container-md max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-base uppercase tracking-[0.15em] text-brick font-bold">Entreprises</span>
            <h1 className="font-heading text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
              Montrez vos métiers <span className="fraunces-italic">avant</span> qu'on postule.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              Présentez votre environnement de travail à de futurs talents en pleine réflexion d'orientation, avant même qu'ils n'envoient une candidature.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFRES.map((o, i) => (
            <motion.div
              key={o.nom}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-[2rem] p-8 flex flex-col relative ${
                o.accent ? "bg-navy text-cream" : "bg-white text-navy border border-navy/10"
              }`}
            >
              {o.badge && (
                <span className="absolute -top-3 left-8 bg-brick text-cream text-xs font-body font-semibold uppercase tracking-wide rounded-full px-4 py-1.5">
                  {o.badge}
                </span>
              )}
              <h2 className="font-heading text-3xl font-semibold mt-4">{o.nom}</h2>
              <p className={`font-body text-sm mt-2 ${o.accent ? "text-cream/70" : "text-navy/60"}`}>{o.desc}</p>
              <div className="mt-6 flex items-baseline gap-1 flex-wrap">
                {o.prefixe && (
                  <span className={`font-body text-xs mr-1 ${o.accent ? "text-cream/50" : "text-navy/50"}`}>{o.prefixe}</span>
                )}
                <span className="font-heading text-4xl">{o.prix}</span>
                <span className={`font-body text-sm ${o.accent ? "text-cream/60" : "text-navy/50"}`}>{o.periode}</span>
              </div>
              <ul className="mt-8 space-y-3 flex-1">
                {o.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-sm">
                    <Check size={16} className={`shrink-0 mt-0.5 ${o.accent ? "text-brick-soft" : "text-navy/40"}`} />
                    <span className={o.accent ? "text-cream/90" : "text-navy/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact-commercial?offre=${o.offreKey}`}
                data-testid={`tarifs-cta-${o.offreKey}`}
                className={`mt-8 text-center rounded-full px-8 py-4 font-body font-semibold transition-transform hover:scale-[1.02] ${
                  o.accent ? "bg-cream text-navy" : "bg-navy text-cream"
                }`}
              >
                Demander un échange
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="container-md max-w-3xl text-center">
          <p className="font-body text-sm text-navy/50">
            Vous êtes un établissement ou une structure d'orientation ?{" "}
            <Link to="/tarifs/etablissements" className="text-navy underline font-semibold">
              Découvrez les offres établissements
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
