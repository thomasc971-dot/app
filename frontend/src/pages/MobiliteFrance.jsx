import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Users } from "lucide-react";

// ============================================================
// PAGE /ressources/mobilite-france — portage fidèle des 10 villes
// de l'original. La carte SVG pixel-perfect est remplacée par une
// grille de villes cliquables : même contenu, plus simple à maintenir
// et tout aussi fonctionnel.
// ============================================================

const SECTEUR_LABELS = {
  tech: "Tech", sante: "Santé", btp: "BTP", commerce: "Commerce", agriculture: "Agriculture",
  artisanat: "Artisanat", public: "Public", finance: "Finance", education: "Éducation",
  culture: "Culture", tourisme: "Tourisme", psychologie: "Psychologie",
};

const MOBILITE_VILLES = [
  { nom: "Lille", coutVie: "Modéré", secteurs: ["commerce", "tech", "public"], population: "240 109 hab.",
    desc: "Carrefour logistique et commercial du Nord, marché du travail dynamique, proximité avec la Belgique et le Royaume-Uni." },
  { nom: "Rennes", coutVie: "Modéré", secteurs: ["tech", "commerce", "public"], population: "230 890 hab.",
    desc: "Pôle universitaire et numérique de l'Ouest, cadre de vie apprécié, écosystème étudiant très développé." },
  { nom: "Paris", coutVie: "Très élevé", secteurs: ["tech", "finance", "commerce"], population: "2 119 412 hab.",
    desc: "Premier bassin d'emploi du pays, tous secteurs confondus, mais loyer et coût de la vie parmi les plus élevés d'Europe." },
  { nom: "Strasbourg", coutVie: "Modéré", secteurs: ["public", "tech", "finance"], population: "296 552 hab.",
    desc: "Siège d'institutions européennes, marché du travail transfrontalier avec l'Allemagne, qualité de vie reconnue." },
  { nom: "Nantes", coutVie: "Modéré", secteurs: ["tech", "btp", "commerce"], population: "332 515 hab.",
    desc: "Une des métropoles où la qualité de vie est la plus citée en France, écosystème startups en croissance." },
  { nom: "Lyon", coutVie: "Élevé", secteurs: ["tech", "finance", "sante"], population: "523 314 hab.",
    desc: "Deuxième bassin d'emploi de France, forte présence industrielle, pharmaceutique et numérique." },
  { nom: "Bordeaux", coutVie: "Élevé", secteurs: ["commerce", "tech", "agriculture"], population: "271 552 hab.",
    desc: "Attractivité forte ces dernières années, viticulture et aéronautique en plus du numérique en croissance." },
  { nom: "Toulouse", coutVie: "Modéré", secteurs: ["tech", "btp"], population: "519 940 hab.",
    desc: "Capitale européenne de l'aéronautique et du spatial, forte présence d'ingénieurs et de techniciens." },
  { nom: "Montpellier", coutVie: "Modéré", secteurs: ["tech", "sante", "agriculture"], population: "313 712 hab.",
    desc: "Croissance démographique parmi les plus fortes de France, pôle santé et numérique en expansion." },
  { nom: "Marseille", coutVie: "Modéré", secteurs: ["commerce", "btp", "public"], population: "892 391 hab.",
    desc: "Premier port de France, économie tournée vers le commerce international et la logistique." },
];

const COUT_VIE_STYLE = {
  "Modéré": "bg-teal-50 text-teal-700 border-teal-200",
  "Élevé": "bg-amber-50 text-amber-700 border-amber-200",
  "Très élevé": "bg-brick/10 text-brick border-brick/20",
};

export default function MobiliteFrance() {
  const [villeSelectionnee, setVilleSelectionnee] = useState(null);

  return (
    <div data-testid="mobilite-france-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-4xl">🗺️</div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Bouger en France</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Partir loin n'est pas la seule option.</h1>
            <p className="font-body text-lg text-navy/70 mt-6 leading-relaxed">
              Changer de région ou de ville en France peut ouvrir autant d'opportunités qu'un départ à l'étranger. Choisis une ville pour en savoir plus.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOBILITE_VILLES.map((v) => (
                <button
                  key={v.nom}
                  onClick={() => setVilleSelectionnee(v)}
                  data-testid={`mobilite-ville-${v.nom.toLowerCase()}`}
                  className={`text-left rounded-2xl p-4 border transition-all ${
                    villeSelectionnee?.nom === v.nom
                      ? "bg-navy text-cream border-navy"
                      : "bg-white text-navy border-navy/10 hover:border-navy/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-heading text-lg">
                    <MapPin size={14} className={villeSelectionnee?.nom === v.nom ? "text-brick-soft" : "text-brick"} />
                    {v.nom}
                  </div>
                  <div className={`text-xs font-body mt-1 ${villeSelectionnee?.nom === v.nom ? "text-cream/60" : "text-navy/50"}`}>
                    {v.coutVie}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {villeSelectionnee ? (
                <motion.div
                  key={villeSelectionnee.nom}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[1.5rem] p-6 border border-navy/10 sticky top-24"
                >
                  <h2 className="font-heading text-2xl text-navy">{villeSelectionnee.nom}</h2>
                  <div className="flex items-center gap-1.5 font-body text-sm text-navy/60 mt-1">
                    <Users size={13} /> {villeSelectionnee.population}
                  </div>
                  <span className={`inline-block mt-3 text-xs font-body font-semibold px-3 py-1 rounded-full border ${COUT_VIE_STYLE[villeSelectionnee.coutVie]}`}>
                    Coût de la vie : {villeSelectionnee.coutVie}
                  </span>
                  <p className="font-body text-sm text-navy/70 mt-4 leading-relaxed">{villeSelectionnee.desc}</p>
                  <div className="mt-4">
                    <div className="font-body text-xs uppercase tracking-widest text-navy/40 mb-2">Secteurs porteurs</div>
                    <div className="flex flex-wrap gap-1.5">
                      {villeSelectionnee.secteurs.map((s) => (
                        <span key={s} className="text-xs font-body px-2.5 py-1 rounded-full bg-cream text-navy/70 border border-navy/10">
                          {SECTEUR_LABELS[s] || s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/50 border border-dashed border-navy/15 rounded-[1.5rem] p-8 text-center font-body text-sm text-navy/50">
                  👆 Choisis une ville pour découvrir son coût de la vie, ses secteurs porteurs et sa taille.
                </div>
              )}
            </AnimatePresence>
          </aside>
        </div>

        <div className="container-md max-w-3xl">
          <p className="font-body text-xs text-navy/45 mt-8 leading-relaxed">
            Le coût de la vie est une appréciation qualitative générale, à affiner selon le quartier et le type de logement visé.
          </p>
        </div>
      </section>

      <div className="container-md max-w-3xl">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy mt-12">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>
    </div>
  );
}
