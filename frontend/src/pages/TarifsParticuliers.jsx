import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowLeft, Compass, Heart, Scale, TrendingUp, Map, Target, BookOpen, Bell, FileText } from "lucide-react";

// ============================================================
// PAGE /tarifs/particuliers — Gratuit vs Moi Demain+ (B2C)
// À intégrer dans src/pages/TarifsParticuliers.jsx
// Route à ajouter : <Route path="/tarifs/particuliers" element={<TarifsParticuliers />} />
// ============================================================

const GRATUIT_FEATURES = [
  "Accès à toutes les fiches métiers",
  "Recherche et annuaire (écoles, métiers)",
  "Quiz de compatibilité par métier",
  "Découverte des 12 secteurs",
  "Trouve ta voie // Simulation carrière",
  "Comparateur de 3 métiers",
  "Aides et bourses",
  "Formations et ressources",
  "Une première feuille de route (PDF)",
];

const PLUS_FEATURES = [
  { icon: Compass, titre: "Mon Passeport Moi Demain", desc: "Un profil qui se met à jour au fil de tes explorations." },
  { icon: Heart, titre: "Mes métiers favoris", desc: "Enregistre les métiers qui t'intéressent et retrouve-les à tout moment." },
  { icon: Scale, titre: "Comparaisons illimitées", desc: "Aucune limite sur le nombre de métiers comparés simultanément." },
  { icon: TrendingUp, titre: "Mon évolution", desc: "Visualise l'évolution de tes intérêts et de tes choix dans le temps." },
  { icon: Map, titre: "Ma feuille de route", desc: "Une feuille de route actualisée à chaque étape de ton parcours." },
  { icon: Target, titre: "Mes objectifs", desc: "Définis des étapes concrètes et suis ta progression." },
  { icon: BookOpen, titre: "Mes compétences à développer", desc: "Une liste personnalisée des compétences à développer selon tes métiers ciblés." },
  { icon: Bell, titre: "Alertes personnalisées", desc: "Formations, événements, journées portes ouvertes, Parcoursup, opportunités." },
  { icon: FileText, titre: "Mon dossier Moi Demain", desc: "Un PDF récapitulatif : intérêts, métiers explorés, points forts, prochaines actions." },
];

export default function TarifsParticuliers() {
  return (
    <div data-testid="tarifs-particuliers-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/tarifs" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-12">
        <div className="container-md max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Tarifs particuliers</span>
            <h1 className="font-heading text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
              Explore <span className="fraunces-italic">gratuitement</span>.<br />
              Approfondis si tu en as besoin.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              L'essentiel de Moi Demain reste gratuit, sans compte. Moi Demain+ te donne un suivi structuré et personnalisé de ton parcours, si tu veux aller plus loin.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne Gratuit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 border border-navy/10 flex flex-col"
          >
            <span className="inline-block self-start font-body text-xs uppercase tracking-widest bg-navy/5 text-navy rounded-full px-4 py-1.5">
              Offre gratuite
            </span>
            <h2 className="font-heading text-3xl text-navy mt-6">Moi Demain</h2>
            <p className="font-body text-navy/60 mt-2">Le grand public découvre le site.</p>
            <div className="mt-6">
              <span className="font-heading text-5xl text-navy">0€</span>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              {GRATUIT_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 font-body text-sm text-navy/80">
                  <Check size={16} className="text-navy/40 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/"
              data-testid="tarifs-cta-gratuit"
              className="mt-8 text-center bg-white text-navy border border-navy/20 rounded-full px-8 py-4 font-body font-semibold hover:bg-cream transition-colors"
            >
              Commencer gratuitement
            </Link>
          </motion.div>

          {/* Colonne Moi Demain+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-navy text-cream rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-brick/20 blur-3xl" />
            <span className="relative inline-block self-start font-body text-xs uppercase tracking-widest bg-brick text-cream rounded-full px-4 py-1.5">
              Offre BtoC
            </span>
            <h2 className="relative font-heading text-3xl mt-6">Moi Demain+</h2>
            <p className="relative font-body text-cream/70 mt-2">Pour la personnalisation et le suivi de ton parcours.</p>
            <div className="relative mt-6 flex items-baseline gap-2">
              <span className="font-heading text-5xl">4,99€</span>
              <span className="font-body text-cream/60">/mois</span>
            </div>
            <p className="relative font-body text-xs text-cream/50 mt-1">ou 39€/an</p>
            <ul className="relative mt-8 space-y-4 flex-1">
              {PLUS_FEATURES.map((f) => (
                <li key={f.titre} className="flex items-start gap-3">
                  <f.icon size={16} className="text-brick-soft shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-sm font-semibold">{f.titre}</div>
                    <div className="font-body text-xs text-cream/60 mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/moi-demain-plus"
              data-testid="tarifs-cta-plus"
              className="relative mt-8 text-center bg-cream text-navy rounded-full px-8 py-4 font-body font-semibold hover:scale-[1.02] transition-transform"
            >
              Passer à Moi Demain+
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mt-16">
        <div className="container-md max-w-3xl text-center">
          <p className="font-body text-sm text-navy/50">
            Tu es un établissement ou une entreprise ?{" "}
            <Link to="/tarifs" className="text-navy underline font-semibold">
              Découvre les offres dédiées
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
