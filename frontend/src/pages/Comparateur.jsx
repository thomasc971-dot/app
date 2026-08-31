import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fetchMetier } from "../lib/api";

// ============================================================
// PAGE /comparateur — compare jusqu'à 3 métiers sélectionnés
// depuis l'annuaire (checkbox "Comparer" sur chaque carte).
// La sélection est transmise via sessionStorage (clé
// "comparateurSelection", écrite par Metiers.jsx).
// ============================================================

export default function Comparateur() {
  const [metiers, setMetiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let selection = [];
    try {
      selection = JSON.parse(sessionStorage.getItem("comparateurSelection") || "[]");
    } catch (e) {
      selection = [];
    }
    if (!selection.length) { setLoading(false); return; }

    Promise.all(selection.map((slug) => fetchMetier(slug).catch(() => null)))
      .then((results) => {
        setMetiers(results.filter(Boolean));
        setLoading(false);
      });
  }, []);

  const maxPaliers = Math.max(0, ...metiers.map((m) => (m.evolution || []).length));

  if (loading) {
    return <div className="container-md py-24"><p className="font-body text-navy/60">Chargement...</p></div>;
  }

  return (
    <div data-testid="comparateur-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/metiers" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour à l'annuaire
        </Link>
      </div>

      <section className="pt-8 pb-8">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Comparateur</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Mets tes options côte à côte.</h1>
          </motion.div>
        </div>
      </section>

      {metiers.length < 2 ? (
        <div className="container-md">
          <div className="bg-white rounded-2xl border border-navy/10 p-8 text-center">
            <p className="font-body text-navy/60">Sélectionne au moins 2 métiers dans l'annuaire des métiers pour les comparer ici.</p>
            <Link to="/metiers" className="inline-flex mt-6 bg-navy text-cream rounded-full px-6 py-3 font-body font-semibold text-sm">
              Aller à l'annuaire
            </Link>
          </div>
        </div>
      ) : (
        <section>
          <div className="container-md">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metiers.length}, 1fr)` }}>
              {metiers.map((m) => (
                <div key={m.slug} className="bg-white rounded-[1.5rem] p-6 border border-navy/5 text-center">
                  <div className="font-heading text-xl text-navy">{m.nom}</div>
                  <div className="font-body text-xs text-navy/50 mt-1">{m.secteur_label}</div>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-xl text-navy mt-10 mb-3">💰 Salaire de départ</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metiers.length}, 1fr)` }}>
              {metiers.map((m) => (
                <div key={m.slug} className="bg-navy/5 rounded-xl p-4 text-center font-heading text-lg text-navy">
                  {m.salaireDebutant} k€/an
                </div>
              ))}
            </div>

            {maxPaliers > 0 && (
              <>
                <h2 className="font-heading text-xl text-navy mt-10 mb-3">📈 Perspective d'évolution</h2>
                {Array.from({ length: maxPaliers }).map((_, i) => (
                  <div key={i} className="grid gap-4 mb-2" style={{ gridTemplateColumns: `repeat(${metiers.length}, 1fr)` }}>
                    {metiers.map((m) => {
                      const palier = (m.evolution || [])[i];
                      return (
                        <div key={m.slug} className="bg-white border border-navy/10 rounded-xl p-3 text-center font-body text-sm">
                          {palier ? (
                            <><strong className="text-navy">{palier.salaire} k€/an</strong><br /><span className="text-navy/50 text-xs">{palier.niveau}</span></>
                          ) : "—"}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            )}

            <h2 className="font-heading text-xl text-navy mt-10 mb-3">🎓 Formations</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metiers.length}, 1fr)` }}>
              {metiers.map((m) => (
                <div key={m.slug} className="bg-white border border-navy/10 rounded-xl p-4 text-center font-body text-sm text-navy/70">
                  {(m.formations || []).join(", ") || "—"}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => { sessionStorage.removeItem("comparateurSelection"); setMetiers([]); }}
                className="border border-navy/20 text-navy rounded-full px-6 py-3 font-body font-semibold text-sm"
              >
                Vider la sélection
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
