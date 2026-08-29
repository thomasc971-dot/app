import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

// ============================================================
// PAGE /tarifs/etablissements — Découverte / Pro / Groupe (B2B éducation)
// Écoles, CFA, missions locales, service public de l'orientation
// À intégrer dans src/pages/TarifsEtablissements.jsx
// Route à ajouter : <Route path="/tarifs/etablissements" element={<TarifsEtablissements />} />
// ============================================================

const OFFRES = [
  {
    nom: "Établissement Découverte",
    prix: "490€",
    periode: "HT/an",
    desc: "Pour les structures de moins de 250 élèves : petits établissements, CIO, missions locales.",
    features: [
      "Accès complet à la plateforme",
      "Jusqu'à 250 élèves",
      "Espace enseignant",
      "Ressources pédagogiques",
      "Statistiques agrégées",
      "Support par email sous 48h",
    ],
    accent: false,
    offreKey: "etablissement-decouverte",
  },
  {
    nom: "Établissement Pro",
    prix: "990€",
    periode: "HT/an",
    desc: "Pour les établissements jusqu'à 1 000 élèves.",
    features: [
      "Jusqu'à 1 000 élèves",
      "Espace équipe pédagogique",
      "Statistiques avancées",
      "Parcours personnalisables",
      "Suivi des usages",
      "Ressources exclusives",
      "Accompagnement dédié",
    ],
    accent: true,
    badge: "Le plus choisi",
    offreKey: "etablissement-pro",
  },
  {
    nom: "Groupe / réseau",
    prix: "2 500€",
    periode: "/an — jusqu'à 5 établissements inclus",
    prefixe: "à partir de",
    desc: "Pour piloter plusieurs établissements depuis un seul endroit.",
    features: [
      "Plusieurs établissements",
      "Administration centralisée",
      "Statistiques consolidées",
      "Personnalisation",
      "Accompagnement dédié",
    ],
    accent: false,
    offreKey: "groupe-etablissements",
  },
];

export default function TarifsEtablissements() {
  return (
    <div data-testid="tarifs-etablissements-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/tarifs" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-12">
        <div className="container-md max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-base uppercase tracking-[0.15em] text-brick font-bold">Établissements</span>
            <h1 className="font-heading text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
              Pour les écoles, CFA <span className="fraunces-italic">et structures</span> d'orientation.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              Missions locales, CIO, service public de l'orientation : accompagnez vos publics avec Moi Demain, à l'échelle de votre établissement ou de votre réseau.
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
            Vous êtes une entreprise ?{" "}
            <Link to="/tarifs/entreprises" className="text-navy underline font-semibold">
              Découvrez les offres entreprises
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
