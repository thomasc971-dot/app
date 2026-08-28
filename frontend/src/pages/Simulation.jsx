import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, Home as HomeIcon, Wallet } from "lucide-react";
import { fetchMetiers, fetchSimPreview } from "../lib/api";

const VILLES = [
  { v: "paris", l: "Paris" }, { v: "lyon", l: "Lyon" }, { v: "bordeaux", l: "Bordeaux" },
  { v: "rennes", l: "Rennes" }, { v: "moyenne", l: "Ville moyenne" }, { v: "rural", l: "Zone rurale" },
];

export default function Simulation() {
  const [metiers, setMetiers] = useState([]);
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("lyon");
  const [rythme, setRythme] = useState("equilibre");
  const [preview, setPreview] = useState(null);

  useEffect(() => { fetchMetiers({ limit: 100 }).then(d => { setMetiers(d.items); if (d.items[0]) setMetier(d.items[0].slug); }); }, []);
  useEffect(() => { if (metier) fetchSimPreview({ metier, ville }).then(setPreview); }, [metier, ville]);

  const rythmeImpact = rythme === "epargne" ? -150 : rythme === "kif" ? +100 : 0;
  const resteFinal = preview ? Math.max(preview.reste_a_vivre - rythmeImpact, 0) : 0;

  return (
    <div data-testid="simulation-page" className="pb-24">
      <section className="pt-16 pb-12">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Simulation carrière</span>
            <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
              Vis ta <span className="fraunces-italic">vie de demain</span>.
            </h1>
            <p className="font-body text-lg text-navy/70 mt-6 max-w-2xl">
              Choisis ton métier, ta ville, ton rythme de vie. Découvre concrètement ton budget, ce qu'il te reste,
              et les conséquences de tes choix.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] p-8 border border-navy/5">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center"><Briefcase size={18} /></div><h2 className="font-heading text-2xl text-navy">Ton métier</h2></div>
              <select data-testid="sim-metier" value={metier} onChange={e => setMetier(e.target.value)} className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none">
                {metiers.map(m => <option key={m.slug} value={m.slug}>{m.nom} — {m.secteur_label}</option>)}
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-8 border border-navy/5">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-brick text-cream flex items-center justify-center"><MapPin size={18} /></div><h2 className="font-heading text-2xl text-navy">Ta ville</h2></div>
              <div className="flex flex-wrap gap-2">
                {VILLES.map(v => (
                  <button key={v.v} data-testid={`sim-ville-${v.v}`} onClick={() => setVille(v.v)} className={`rounded-full px-5 py-2 font-body text-sm border transition-colors ${ville === v.v ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10 hover:border-navy/30"}`}>{v.l}</button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-8 border border-navy/5">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-navy/10 text-navy flex items-center justify-center"><Wallet size={18} /></div><h2 className="font-heading text-2xl text-navy">Ton rythme de vie</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[{ v: "epargne", l: "Fourmi", d: "J'épargne d'abord" }, { v: "equilibre", l: "Équilibre", d: "Un peu des deux" }, { v: "kif", l: "Cigale", d: "Je profite" }].map(r => (
                  <button key={r.v} data-testid={`sim-rythme-${r.v}`} onClick={() => setRythme(r.v)} className={`text-left rounded-2xl p-4 border transition-all ${rythme === r.v ? "bg-navy text-cream border-navy" : "bg-cream border-navy/10 text-navy hover:border-navy/30"}`}>
                    <div className="font-heading text-lg">{r.l}</div>
                    <div className="font-body text-xs mt-1 opacity-80">{r.d}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <aside className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-navy text-cream rounded-[2rem] p-8 md:p-10 sticky top-24">
              <div className="font-body text-xs uppercase tracking-[0.2em] text-brick-soft mb-2">Ta fiche de résultat</div>
              <h3 className="font-heading text-3xl leading-tight">{preview?.metier || "..."}<br /><span className="fraunces-italic text-brick-soft">à {VILLES.find(v => v.v === ville)?.l}</span></h3>
              {preview && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-baseline border-b border-cream/10 pb-4">
                    <span className="font-body text-cream/70">Salaire net</span>
                    <span className="font-heading text-4xl">{preview.salaire_net_mois}€<span className="text-sm text-cream/50">/mois</span></span>
                  </div>
                  <div className="flex justify-between font-body"><span className="text-cream/70 inline-flex items-center gap-2"><HomeIcon size={14} /> Logement</span><span>−{preview.logement}€</span></div>
                  <div className="flex justify-between font-body"><span className="text-cream/70">Vie courante</span><span>−{preview.vie_courante}€</span></div>
                  {rythmeImpact !== 0 && <div className="flex justify-between font-body"><span className="text-cream/70">Rythme de vie</span><span>{rythmeImpact > 0 ? "+" : ""}{-rythmeImpact}€</span></div>}
                  <div className="pt-4 border-t border-cream/10 flex justify-between items-baseline">
                    <span className="font-body font-semibold">Reste à vivre</span>
                    <span className="font-heading text-4xl text-brick-soft">{resteFinal}€</span>
                  </div>
                  <p className="font-body text-xs text-cream/50 leading-relaxed mt-6">Estimation simplifiée à partir de données réelles. La vraie simulation intègre aussi impôts, aides, coloc, imprévus, évolution de carrière et bilan final chiffré.</p>
                </div>
              )}
              <Link to="/metiers" data-testid="sim-explore-cta" className="mt-8 inline-flex items-center gap-2 bg-cream text-navy rounded-full px-6 py-3 font-body font-semibold text-sm">
                Explorer d'autres métiers <ArrowRight size={14} />
              </Link>
            </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
}
