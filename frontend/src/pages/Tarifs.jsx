import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, School, Building2, ArrowRight } from "lucide-react";

// ============================================================
// PAGE /tarifs — routage vers le bon parcours tarifaire
// À intégrer dans src/pages/Tarifs.jsx (nouvelle route à ajouter dans App.js :
// <Route path="/tarifs" element={<Tarifs />} />)
// ============================================================

const PROFILS = [
  {
    icon: GraduationCap,
    titre: "Un particulier",
    sousTitre: "Élève, étudiant·e, en reconversion",
    desc: "Explore les métiers, teste ta compatibilité et construis ton parcours — au collège, au lycée, en études ou en reconversion.",
    to: "/tarifs/particuliers",
    cta: "Voir les offres particuliers",
  },
  {
    icon: School,
    titre: "Un établissement",
    sousTitre: "École, CFA, mission locale, service public de l'orientation",
    desc: "Accompagnez vos publics dans leur orientation, à l'échelle d'un établissement ou d'un réseau.",
    to: "/tarifs/etablissements",
    cta: "Voir les offres établissements",
  },
  {
    icon: Building2,
    titre: "Une entreprise",
    sousTitre: "Recrutement, marque employeur",
    desc: "Présentez vos métiers, votre environnement de travail et vos offres à de futurs talents.",
    to: "/tarifs/entreprises",
    cta: "Voir les offres entreprises",
  },
];

export default function Tarifs() {
  return (
    <div data-testid="tarifs-routage-page" className="pb-24">
      <section className="pt-16 pb-12">
        <div className="container-md max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Tarifs</span>
            <h1 className="font-heading text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
              Une offre <span className="fraunces-italic">adaptée</span> à ta situation.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6">
              Sélectionne ton profil pour découvrir les fonctionnalités et les tarifs qui te concernent.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILS.map((p, i) => (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={p.to}
                data-testid={`tarifs-profil-${p.to.split("/").pop()}`}
                className="group flex flex-col h-full bg-white rounded-[2rem] p-8 border border-navy/5 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,58,138,0.08)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mb-6">
                  <p.icon size={24} className="text-navy" />
                </div>
                <h2 className="font-heading text-2xl text-navy leading-tight">{p.titre}</h2>
                <p className="font-body text-xs uppercase tracking-widest text-brick mt-2">{p.sousTitre}</p>
                <p className="font-body text-sm text-navy/70 mt-4 leading-relaxed flex-1">{p.desc}</p>
                <div className="mt-6 pt-4 border-t border-navy/5 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy">
                  {p.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
