import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, TrendingUp, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { fetchMetiers, fetchSecteurs } from "../lib/api";

// Retire les emojis / pictos des chaînes (secteur labels, tags…)
// Enlève aussi les tirets ou séparateurs orphelins laissés après suppression
const stripEmoji = (s = "") =>
  s
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\uFE0F/g, "")
    .replace(/^\s*[-–—·•|]\s*|\s*[-–—·•|]\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const VISIBLE_FILTERS = 7;

export default function Metiers() {
  const [secteurs, setSecteurs] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [secteur, setSecteur] = useState("tous");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => { fetchSecteurs().then(setSecteurs); }, []);
  useEffect(() => {
    setLoading(true);
    const params = { limit: 500 };
    if (secteur !== "tous") params.secteur = secteur;
    if (q) params.q = q;
    const t = setTimeout(() => fetchMetiers(params).then(d => { setItems(d.items); setTotal(d.total); setLoading(false); }), 250);
    return () => clearTimeout(t);
  }, [secteur, q]);

  const shown = showAllFilters ? secteurs : secteurs.slice(0, VISIBLE_FILTERS);
  const hidden = secteurs.length - VISIBLE_FILTERS;
  const activeIsHidden =
    secteur !== "tous" &&
    secteurs.findIndex(s => s.id === secteur) >= VISIBLE_FILTERS &&
    !showAllFilters;

  return (
    <div data-testid="metiers-page" className="pb-24">
      <section className="pt-16 pb-12">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">L'annuaire</span>
            <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
              Des métiers <span className="fraunces-italic">racontés</span> sans filtre.
            </h1>
            <p className="font-body text-lg text-neutral-800 mt-6 max-w-2xl">
              Salaire réel, durée d'études, quotidien concret : l'essentiel, sans brochure qui embellit tout.
            </p>
          </motion.div>
          <div className="mt-10 relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
            <input
              data-testid="metiers-search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Chercher un métier, une compétence..."
              className="w-full bg-white rounded-full pl-14 pr-6 py-4 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="container-md">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              data-testid="filter-tous"
              onClick={() => setSecteur("tous")}
              className={`rounded-full px-5 py-2 font-body text-sm border transition-colors ${secteur === "tous" ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10 hover:border-navy/30"}`}
            >
              Tous les secteurs
            </button>
            {shown.map(s => (
              <button
                key={s.id}
                data-testid={`filter-${s.id}`}
                onClick={() => setSecteur(s.id)}
                className={`rounded-full px-5 py-2 font-body text-sm border transition-colors ${secteur === s.id ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10 hover:border-navy/30"}`}
              >
                {stripEmoji(s.label)}
              </button>
            ))}
            {hidden > 0 && (
              <button
                data-testid="filter-toggle-more"
                onClick={() => setShowAllFilters(v => !v)}
                className={`inline-flex items-center gap-1 rounded-full px-4 py-2 font-body text-sm border transition-colors ${activeIsHidden ? "bg-brick text-cream border-brick" : "bg-cream text-navy/70 border-navy/15 hover:border-navy/40"}`}
              >
                {showAllFilters ? <>Voir moins <ChevronUp size={14} /></> : <>Voir plus ({hidden}) <ChevronDown size={14} /></>}
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container-md">
          <div className="flex items-baseline justify-between mb-6">
            <p data-testid="metiers-count" className="font-body text-sm text-navy/60">
              {loading ? "Recherche..." : `${total} métier${total > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((m, i) => (
              <motion.div key={m.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}>
                <Link
                  to={`/metiers/${m.slug}`}
                  data-testid={`metier-card-${m.slug}`}
                  className="group block bg-white rounded-[1.5rem] p-6 h-full border border-navy/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative"
                >
                  {m.tensionScore >= 4 && (
                    <div data-testid={`tension-badge-${m.slug}`} className="absolute -top-2 left-4 inline-flex items-center gap-1 bg-brick text-cream text-[10px] uppercase tracking-widest font-body font-semibold px-3 py-1.5 rounded-full shadow-md">
                      <Flame size={11} /> Forte demande
                    </div>
                  )}
                  <span className="font-body text-[11px] uppercase tracking-widest text-brick block mt-2">
                    {stripEmoji(m.secteur_label)}
                  </span>
                  <h3 className="font-heading text-2xl text-navy mt-3 leading-tight">{m.nom}</h3>
                  {m.salaireDebutant && (
                    <div className="mt-4 font-body text-sm text-navy/70">
                      <span className="font-heading text-2xl text-navy">{m.salaireDebutant}k€</span>
                      <span className="text-navy/50"> brut/an · débutant</span>
                    </div>
                  )}
                  {m.motsCles?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {m.motsCles.slice(0, 3).map(mk => (
                        <span key={mk} className="text-[11px] font-body px-2.5 py-1 rounded-full bg-cream text-navy/70 border border-navy/10">{stripEmoji(mk)}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 pt-4 border-t border-navy/5 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy">
                    Voir la fiche <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
