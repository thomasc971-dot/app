import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { fetchMetiers, fetchSecteurs } from "../lib/api";

export default function Metiers() {
  const [secteurs, setSecteurs] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [secteur, setSecteur] = useState("tous");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSecteurs().then(setSecteurs); }, []);
  useEffect(() => {
    setLoading(true);
    const params = { limit: 500 };
    if (secteur !== "tous") params.secteur = secteur;
    if (q) params.q = q;
    const t = setTimeout(() => fetchMetiers(params).then(d => { setItems(d.items); setTotal(d.total); setLoading(false); }), 250);
    return () => clearTimeout(t);
  }, [secteur, q]);

  return (
    <div data-testid="metiers-page" className="pb-24">
      <section className="pt-16 pb-12">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">L'annuaire</span>
            <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
              Des métiers <span className="fraunces-italic">racontés</span> sans filtre.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6 max-w-2xl">
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
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            <button data-testid="filter-tous" onClick={() => setSecteur("tous")} className={`shrink-0 rounded-full px-5 py-2 font-body text-sm border transition-colors ${secteur === "tous" ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10 hover:border-navy/30"}`}>
              Tous les secteurs
            </button>
            {secteurs.map(s => (
              <button key={s.id} data-testid={`filter-${s.id}`} onClick={() => setSecteur(s.id)} className={`shrink-0 rounded-full px-5 py-2 font-body text-sm border transition-colors ${secteur === s.id ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10 hover:border-navy/30"}`}>
                {s.label}
              </button>
            ))}
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
                <Link to={`/metiers/${m.slug}`} data-testid={`metier-card-${m.slug}`} className="group block bg-white rounded-[1.5rem] p-6 h-full border border-navy/5 hover:-translate-y-1 transition-transform duration-300">
                  <span className="font-body text-[11px] uppercase tracking-widest text-brick">{m.secteur_label}</span>
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
                        <span key={mk} className="text-[11px] font-body px-2.5 py-1 rounded-full bg-cream text-navy/70 border border-navy/10">{mk}</span>
                      ))}
                    </div>
                  )}
                  {m.tensionScore >= 4 && (
                    <div className="inline-flex items-center gap-1 mt-4 text-xs font-body text-brick">
                      <TrendingUp size={12} /> Forte demande
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
