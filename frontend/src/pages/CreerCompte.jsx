import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookmarkCheck, PenLine, User } from "lucide-react";

// Placeholder création de compte (auth réelle prévue en V2 — évoquée dans le PRD)
export default function CreerCompte() {
  const [form, setForm] = useState({ prenom: "", email: "" });
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    // V1 : stockage local en attendant le vrai back auth
    try { localStorage.setItem("moidemain_lead", JSON.stringify(form)); } catch (_) {}
    nav("/trouve-ta-voie?prenom=" + encodeURIComponent(form.prenom));
  };
  const bene = [
    { icon: BookmarkCheck, t: "Retrouver tes métiers favoris", d: "Sauvegarde tes fiches et reprends là où tu t'étais arrêté." },
    { icon: PenLine, t: "Conserver tes simulations", d: "Compare plusieurs scénarios de carrière côte à côte." },
    { icon: Sparkles, t: "Recevoir des pistes personnalisées", d: "On te propose des métiers adaptés à ton profil, à ton rythme." },
  ];
  return (
    <div data-testid="creer-compte-page" className="min-h-[80vh] py-16">
      <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-6">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Créer un compte</span>
          <h1 className="font-heading text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
            Garde tes <span className="fraunces-italic">pistes</span> à portée de main.
          </h1>
          <p className="font-body text-lg text-navy/70 mt-6 max-w-xl leading-relaxed">
            Un compte gratuit pour retrouver tes fiches métier favorites, tes simulations et tes résultats de
            "Trouve ta voie" — sur tous tes appareils.
          </p>
          <ul className="mt-10 space-y-5">
            {bene.map((b, i) => (
              <motion.li key={b.t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i + 0.2 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brick/10 flex items-center justify-center shrink-0"><b.icon size={18} className="text-brick" /></div>
                <div>
                  <h3 className="font-heading text-lg text-navy">{b.t}</h3>
                  <p className="font-body text-sm text-navy/60 mt-1">{b.d}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
          data-testid="creer-compte-form"
          className="lg:col-span-6 bg-white rounded-[2rem] p-8 md:p-10 border border-navy/5 shadow-[0_30px_80px_rgba(30,58,138,0.08)]"
        >
          <div className="inline-flex items-center gap-2 bg-brick/10 text-brick rounded-full px-3 py-1.5 font-body text-xs mb-6">
            <Sparkles size={12} /> Bientôt disponible · rejoins la première vague
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-navy leading-tight">Laisse-nous <span className="fraunces-italic">une trace</span></h2>
          <p className="font-body text-sm text-navy/60 mt-2">On te prévient dès que les comptes ouvrent. Pas de spam, promis.</p>
          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ton prénom</span>
              <div className="relative mt-2">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  data-testid="creer-compte-prenom"
                  required value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                  className="w-full bg-cream rounded-xl pl-11 pr-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
                  placeholder="Camille"
                />
              </div>
            </label>
            <label className="block">
              <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ton email</span>
              <input
                data-testid="creer-compte-email"
                type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full mt-2 bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
                placeholder="camille@exemple.fr"
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="creer-compte-submit"
            className="group w-full mt-8 bg-navy text-cream rounded-full py-4 font-body font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-navy-900 transition-colors"
          >
            Je crée mon compte
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="font-body text-xs text-navy/40 mt-4 text-center">
            Déjà un compte ? <Link to="/creer-compte" className="text-navy underline underline-offset-2">Se connecter</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
