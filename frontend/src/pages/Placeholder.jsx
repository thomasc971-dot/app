import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import { fetchRessources } from "../lib/api";

// Sanitize before injecting: only plain formatting tags are allowed, no
// scripts/handlers/iframes/etc.
const sanitize = (html) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br", "p", "span", "a"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

// Les 3 outils interactifs mis en avant sur la page Ressources, chacun
// menant vers sa propre page dédiée (simulateur fiche de paie, filtrage
// des aides par profil, mobilité en France).
const RESSOURCES_OUTILS = [
  {
    to: "/ressources/fiche-paie",
    icon: "📄",
    titre: "Comprendre ta 1re fiche de paie",
    desc: "Brut, net, cotisations, prélèvement à la source : chaque ligne expliquée en français normal, avec un vrai exemple.",
  },
  {
    to: "/ressources/aides",
    icon: "🎓",
    titre: "Bourses & aides : ce qui t'est dû",
    desc: "Bourse du lycée, Parcoursup, aides au logement, mobilité... La plupart des jeunes passent à côté. Pas toi.",
  },
  {
    to: "/ressources/mobilite-france",
    icon: "🗺️",
    titre: "Bouger en France",
    desc: "Changer de région ou de ville peut ouvrir autant d'opportunités qu'un départ à l'étranger. Découvre 10 villes.",
  },
];

function OutilsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {RESSOURCES_OUTILS.map((o) => (
        <Link
          key={o.to}
          to={o.to}
          data-testid={`ressource-card-${o.to.split("/").pop()}`}
          className="group bg-white rounded-[1.5rem] p-6 border border-navy/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-xl mb-4">{o.icon}</div>
          <h3 className="font-heading text-lg text-navy leading-snug">{o.titre}</h3>
          <p className="font-body text-sm text-navy/60 mt-2.5 leading-relaxed flex-1">{o.desc}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-navy">
            Lire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function AidesGrid({ aides }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {aides.slice(0, 12).map((a, i) => (
        <div key={a.id ?? a.nom ?? a.titre ?? i} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
          <h3 className="font-heading text-xl text-navy">{a.nom || a.titre || `Aide ${i + 1}`}</h3>
          {a.description && <p className="font-body text-sm text-navy/70 mt-3 leading-relaxed line-clamp-4">{a.description}</p>}
          {a.montant && <p className="font-body text-xs text-brick mt-3 font-semibold">{a.montant}</p>}
        </div>
      ))}
    </div>
  );
}

function FaqList({ faq }) {
  return (
    <div className="space-y-4">
      {faq.slice(0, 10).map((f, i) => (
        <details key={f.id ?? f.q ?? f.question ?? i} className="bg-white rounded-[1.5rem] p-6 border border-navy/5 group">
          <summary className="font-heading text-lg text-navy cursor-pointer list-none flex justify-between items-center">
            {f.q || f.question} <span className="text-brick group-open:rotate-45 transition-transform">+</span>
          </summary>
          {/* SECURITY: sanitized with DOMPurify — was raw dangerouslySetInnerHTML before. */}
          <p
            className="font-body text-navy/70 mt-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitize(f.a || f.reponse || "") }}
          />
        </details>
      ))}
    </div>
  );
}

export const Ressources = () => {
  const [data, setData] = useState({ aides: [], faq: [] });
  useEffect(() => { fetchRessources().then(setData).catch(() => {}); }, []);

  const aides = Array.isArray(data.aides) ? data.aides : [];
  const faq = Array.isArray(data.faq) ? data.faq : [];

  return (
    <div data-testid="ressources-page" className="pb-24">
      <section className="pt-16 pb-12">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Ressources</span>
            <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
              Les trucs qu'on aurait dû t'<span className="fraunces-italic">apprendre</span>.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6 max-w-2xl">
              Fiche de paie, bourses, aides au logement, mobilité en France, expatriation. Le vrai savoir utile
              pour construire ton parcours.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md">
          <OutilsGrid />
        </div>
      </section>

      <section className="mt-16">
        <div className="container-md">
          <h2 className="font-heading text-3xl text-navy mb-8">Aides & bourses</h2>
          <AidesGrid aides={aides} />
        </div>
      </section>

      {faq.length > 0 && (
        <section className="mt-20">
          <div className="container-md max-w-4xl">
            <h2 className="font-heading text-3xl text-navy mb-8">Foire aux questions</h2>
            <FaqList faq={faq} />
          </div>
        </section>
      )}
    </div>
  );
};

export const APropos = () => (
  <div data-testid="apropos-page" className="pb-24">
    <section className="pt-16 pb-24">
      <div className="container-md max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Notre raison d'être</span>
          <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
            On ne veut pas te <span className="fraunces-italic">vendre</span> un avenir.
          </h1>
          <p className="font-body text-lg text-navy/70 mt-8 leading-relaxed max-w-3xl">
            « J'ai mis des années à comprendre ce que je voulais faire, faute d'avoir les bonnes infos au bon
            moment. Moi Demain, c'est cette explication que j'aurais aimé avoir, offerte à qui en a besoin
            aujourd'hui. »
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[{ n: "850+", l: "métiers racontés" }, { n: "64", l: "formations recensées" }, { n: "6", l: "familles RIASEC" }, { n: "100%", l: "gratuit, sans compte" }].map((s) => (
              <div key={s.l}><div className="font-heading text-4xl text-brick">{s.n}</div><div className="font-body text-xs uppercase tracking-widest text-navy/50 mt-2">{s.l}</div></div>
            ))}
          </div>
          <div className="mt-16 bg-white rounded-[2rem] p-8 border border-navy/5">
            <h3 className="font-heading text-2xl text-navy">Pour toi, quel que soit ton âge</h3>
            <p className="font-body text-navy/70 mt-4 leading-relaxed">
              Que tu sois au collège en train de te poser tes premières questions, jeune actif·ve qui doute,
              salarié·e qui envisage une reconversion, ou simplement curieux·se de découvrir ce que fait vraiment
              un DevOps ou un fleuriste au quotidien — cette plateforme est faite pour toi.
            </p>
            <Link to="/trouve-ta-voie" className="inline-flex items-center gap-2 mt-6 bg-navy text-cream rounded-full px-6 py-3 font-body font-semibold text-sm">
              Trouver ta voie <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);
