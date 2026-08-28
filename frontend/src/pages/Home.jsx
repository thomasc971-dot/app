import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles, Building2, ArrowRight, PlayCircle } from "lucide-react";
import { fetchMetiers, fetchSimPreview } from "../lib/api";

const IMG = {
  youth: "https://images.unsplash.com/photo-1514369118554-e20d93546b30?auto=format&fit=crop&w=800&q=80",
  adult: "https://images.unsplash.com/photo-1752856408620-2e6fc6ac072f?auto=format&fit=crop&w=800&q=80",
  mature: "https://images.unsplash.com/photo-1758685848006-1bc450061624?auto=format&fit=crop&w=800&q=80",
};

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } };

const Hero = () => (
  <section data-testid="hero" className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
    <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <motion.div {...fadeUp} className="lg:col-span-7">
        <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-brick mb-8">
          <span className="w-8 h-px bg-brick" /> Explorer. Décider. Construire demain.
        </span>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.05] tracking-tight">
          Ton avenir ne se <span className="fraunces-italic text-brick">devine</span> pas.
          <br />
          Il s'<span className="fraunces-italic">essaie</span>.
        </h1>
        <p className="font-body text-base md:text-lg text-navy/70 mt-8 max-w-xl leading-relaxed">
          Simule des métiers, des villes, un budget — pour de vrai. Un espace pour toi, que tu aies 15 ans
          ou que tu envisages une reconversion à 45.
        </p>
        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/trouve-ta-voie" data-testid="hero-cta-primary" className="group inline-flex items-center gap-3 bg-navy text-cream rounded-full px-8 py-4 font-body font-semibold text-sm tracking-wide hover:bg-navy-900 transition-colors">
            Commencer un parcours
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </Link>
          <Link to="/metiers" data-testid="hero-cta-secondary" className="inline-flex items-center gap-3 border border-navy/20 text-navy rounded-full px-8 py-4 font-body font-semibold text-sm tracking-wide hover:bg-white transition-colors">
            Découvrir les métiers
          </Link>
        </div>
      </motion.div>
      <div className="lg:col-span-5 relative h-[480px] md:h-[560px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
          className="absolute top-0 right-0 w-[70%] h-[65%] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(30,58,138,0.15)]" style={{ transform: "rotate(2deg)" }}>
          <img src={IMG.youth} alt="Jeunesse et découverte" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(184,92,92,0.15)]" style={{ transform: "rotate(-3deg)" }}>
          <img src={IMG.adult} alt="Évolution et reconversion" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="absolute top-[52%] left-[42%] w-40 bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(30,58,138,0.12)]">
          <div className="font-heading text-3xl text-navy">850+</div>
          <div className="font-body text-xs text-navy/60 leading-snug mt-1">métiers racontés sans filtre</div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ExperiencesSection = () => {
  const items = [
    { icon: Compass, title: "Simulation carrière", tag: "12 min · Aléas réalistes", desc: "Vis les grandes étapes d'une carrière : filière, premier poste, dilemme, mobilité. Bilan chiffré à la clé.", to: "/simulation", accent: "bg-navy text-cream" },
    { icon: Sparkles, title: "Trouve ta voie", tag: "2 min · Sans engagement", desc: "Un questionnaire qui s'adapte à ta situation. Perdu·e, une idée précise, ou en reconversion.", to: "/trouve-ta-voie", accent: "bg-brick text-cream" },
    { icon: Building2, title: "Annuaire métiers", tag: "850+ fiches", desc: "Salaire réel, durée d'études, quotidien : l'essentiel, sans brochure qui embellit tout.", to: "/metiers", accent: "bg-white text-navy border border-navy/10" },
  ];
  return (
    <section data-testid="experiences" className="py-24 md:py-32">
      <div className="container-md">
        <motion.div {...fadeUp} className="max-w-3xl mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Le concept</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy mt-4 leading-[1.1] tracking-tight">
            3 façons d'<span className="fraunces-italic">essayer</span> demain,
            <br />aujourd'hui.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={it.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <Link to={it.to} data-testid={`exp-card-${i}`} className="group block h-full">
                <div className={`h-full rounded-[2rem] p-8 ${it.accent} transition-transform duration-500 group-hover:-translate-y-2`}>
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                      <it.icon size={22} className={it.accent.includes("text-cream") ? "text-cream" : "text-navy"} />
                    </div>
                    <span className="font-body text-xs uppercase tracking-widest opacity-60">0{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-3xl mt-10 leading-tight">{it.title}</h3>
                  <p className="font-body text-xs uppercase tracking-widest opacity-60 mt-3">{it.tag}</p>
                  <p className="font-body text-sm leading-relaxed mt-6 opacity-90">{it.desc}</p>
                  <div className="mt-10 inline-flex items-center gap-2 font-body text-sm font-semibold">
                    Explorer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RaisonDetre = () => (
  <section data-testid="raison-detre" className="py-24 md:py-32 bg-navy text-cream relative overflow-hidden">
    <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
      <div className="lg:col-span-5 relative h-[420px]">
        <motion.img {...fadeUp} src={IMG.mature} alt="Reconversion" className="absolute top-0 left-0 w-[75%] h-[70%] object-cover rounded-[2rem]" style={{ transform: "rotate(-2deg)" }} />
        <motion.img {...fadeUp} src={IMG.adult} alt="Évolution pro" className="absolute bottom-0 right-0 w-[55%] h-[50%] object-cover rounded-[2rem] shadow-2xl" style={{ transform: "rotate(3deg)" }} />
      </div>
      <motion.div {...fadeUp} className="lg:col-span-7">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-brick-soft">Notre raison d'être</span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.1]">
          On ne veut pas te <span className="fraunces-italic">vendre</span> un avenir.
          <br />Juste t'aider à le <span className="fraunces-italic">choisir</span>.
        </h2>
        <p className="font-body text-base md:text-lg text-cream/80 mt-8 max-w-2xl leading-relaxed">
          « J'ai mis des années à comprendre ce que je voulais faire, faute d'avoir les bonnes infos au bon
          moment. Moi Demain, c'est cette explication que j'aurais aimé avoir, offerte à qui en a besoin
          aujourd'hui. »
        </p>
        <div className="mt-12 grid grid-cols-2 gap-8 max-w-lg">
          <div><div className="font-heading text-4xl text-brick-soft">850+</div><div className="font-body text-xs uppercase tracking-widest text-cream/60 mt-2">métiers racontés</div></div>
          <div><div className="font-heading text-4xl text-brick-soft">100%</div><div className="font-body text-xs uppercase tracking-widest text-cream/60 mt-2">gratuit, sans inscription</div></div>
        </div>
      </motion.div>
    </div>
  </section>
);

const MiniSim = () => {
  const [metiers, setMetiers] = useState([]);
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("moyenne");
  const [preview, setPreview] = useState(null);
  useEffect(() => { fetchMetiers({ limit: 12 }).then(d => { setMetiers(d.items); if (d.items[0]) setMetier(d.items[0].slug); }); }, []);
  useEffect(() => { if (metier) fetchSimPreview({ metier, ville }).then(setPreview).catch(() => {}); }, [metier, ville]);
  return (
    <section data-testid="minisim" className="py-24 md:py-32">
      <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Mini-simulation</span>
          <h2 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.1]">
            Teste ton futur budget, <span className="fraunces-italic">là, maintenant.</span>
          </h2>
          <p className="font-body text-navy/70 mt-6 leading-relaxed">
            Choisis un métier et une ville : on estime ton salaire net et la répartition de ton budget.
            La vraie simulation va beaucoup plus loin.
          </p>
          <Link to="/simulation" data-testid="minisim-cta" className="inline-flex items-center gap-2 mt-8 text-navy font-body font-semibold underline underline-offset-4 decoration-brick">
            Voir la vraie simulation <ArrowRight size={16} />
          </Link>
        </motion.div>
        <motion.div {...fadeUp} className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(30,58,138,0.08)] border border-navy/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ton métier</span>
                <select data-testid="minisim-metier" value={metier} onChange={e => setMetier(e.target.value)} className="w-full mt-2 bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none">
                  {metiers.map(m => <option key={m.slug} value={m.slug}>{m.nom}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ta ville</span>
                <select data-testid="minisim-ville" value={ville} onChange={e => setVille(e.target.value)} className="w-full mt-2 bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none">
                  <option value="paris">Paris</option><option value="lyon">Lyon</option>
                  <option value="bordeaux">Bordeaux</option><option value="rennes">Rennes</option>
                  <option value="moyenne">Ville moyenne</option><option value="rural">Zone rurale</option>
                </select>
              </label>
            </div>
            {preview && (
              <div className="mt-8 pt-8 border-t border-navy/10 space-y-3">
                <div className="flex justify-between items-baseline"><span className="font-body text-navy/60">Salaire net estimé</span><span className="font-heading text-3xl text-navy">{preview.salaire_net_mois}€<span className="text-sm text-navy/50">/mois</span></span></div>
                <div className="flex justify-between text-sm font-body"><span className="text-navy/60">Loyer</span><span className="text-navy">−{preview.logement}€</span></div>
                <div className="flex justify-between text-sm font-body"><span className="text-navy/60">Vie courante</span><span className="text-navy">−{preview.vie_courante}€</span></div>
                <div className="flex justify-between items-baseline pt-3 border-t border-navy/10"><span className="font-body font-semibold text-navy">Reste pour kiffer & épargner</span><span className="font-heading text-2xl text-brick">{preview.reste_a_vivre}€</span></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Ressources = () => {
  const items = [
    { title: "Comprendre ta 1re fiche de paie", desc: "Brut, net, cotisations, prélèvement à la source : chaque ligne expliquée en français normal.", tag: "Éducation financière" },
    { title: "Bourses & aides : ce qui t'est dû", desc: "Bourse du lycée, Parcoursup, aides au logement, mobilité. La plupart passent à côté. Pas toi.", tag: "Aides" },
    { title: "Étudier ou bosser à l'étranger", desc: "Erasmus, PVT, stages internationaux : démarches, budgets, pièges à éviter.", tag: "Mobilité" },
  ];
  return (
    <section data-testid="ressources-home" className="py-24 md:py-32">
      <div className="container-md">
        <motion.div {...fadeUp} className="max-w-3xl mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Ressources</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy mt-4 leading-[1.1]">
            Les trucs qu'on aurait dû t'<span className="fraunces-italic">apprendre à l'école</span>.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <motion.div key={r.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <Link to="/ressources" className="group block bg-white rounded-[2rem] p-8 h-full border border-navy/5 hover:-translate-y-2 transition-transform duration-500">
                <span className="font-body text-xs uppercase tracking-widest text-brick">{r.tag}</span>
                <h3 className="font-heading text-2xl md:text-3xl text-navy mt-6 leading-tight">{r.title}</h3>
                <p className="font-body text-sm text-navy/70 mt-4 leading-relaxed">{r.desc}</p>
                <div className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy">Lire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section data-testid="final-cta" className="py-24 md:py-32">
    <div className="container-md">
      <motion.div {...fadeUp} className="bg-navy rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-brick/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-brick/10 blur-3xl" />
        <h2 className="relative font-heading text-4xl md:text-6xl text-cream leading-[1.1] max-w-3xl mx-auto">
          Prêt·e à <span className="fraunces-italic text-brick-soft">rencontrer</span> le toi de demain ?
        </h2>
        <p className="relative font-body text-cream/70 mt-6 max-w-xl mx-auto">Deux minutes, zéro inscription, et des pistes concrètes à tester dès cette semaine.</p>
        <Link to="/trouve-ta-voie" data-testid="final-cta-btn" className="relative inline-flex items-center gap-3 mt-10 bg-cream text-navy rounded-full px-10 py-5 font-body font-semibold hover:scale-105 transition-transform">
          <PlayCircle size={20} /> Lancer ma simulation
        </Link>
      </motion.div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div data-testid="home-page" className="paper-texture">
      <Hero />
      <ExperiencesSection />
      <RaisonDetre />
      <MiniSim />
      <Ressources />
      <FinalCTA />
    </div>
  );
}
