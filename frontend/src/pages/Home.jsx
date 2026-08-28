import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles, Users, ArrowRight, PlayCircle, Wallet, TrendingUp, Star } from "lucide-react";
import { fetchMetiers, fetchSimPreview } from "../lib/api";

const IMG = {
  clay: "/img/hero-clay.png",
  // Photo intergénérationnelle: femme au tableau (science / transmission)
  raison1: "https://images.unsplash.com/photo-1758685848006-1bc450061624?auto=format&fit=crop&w=800&q=80",
  // Remplacement de la photo du monsieur : femme mature en réflexion / évolution pro
  raison2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const ROTATING_VERBS = ["essaie", "imagine", "invente", "explore", "construit"];
// Élision : "s'" devant voyelle/h muet, "se" devant consonne
const elision = (word) => /^[aeiouhéèêà]/i.test(word) ? "s'" : "se ";

const RotatingWord = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % ROTATING_VERBS.length), 2400);
    return () => clearInterval(t);
  }, []);
  const word = ROTATING_VERBS[i];
  return (
    <span className="whitespace-nowrap">
      Il {elision(word)}
      <span className="relative inline-block align-baseline" style={{ minWidth: "6.5ch", height: "1em", verticalAlign: "baseline" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fraunces-italic text-brick absolute left-0 top-0 whitespace-nowrap"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

// ============= HERO =============
const Hero = () => (
  <section data-testid="hero" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
    <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-6 relative z-10">
        <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-brick mb-6">
          <span className="w-8 h-px bg-brick" /> Explorer. Décider. Construire demain.
        </span>
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.05] tracking-tight">
          Ton avenir ne se <span className="fraunces-italic">devine</span> pas.
          <br />
          <RotatingWord />.
        </h1>
        <p className="font-body text-base md:text-lg text-navy/70 mt-6 max-w-xl leading-relaxed">
          Simule des métiers, des villes, un budget — pour de vrai. Un espace pour toi, que tu aies 15 ans
          ou que tu envisages une reconversion à 45.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/trouve-ta-voie" data-testid="hero-cta-primary" className="group inline-flex items-center gap-2 bg-navy text-cream rounded-full px-7 py-4 font-body font-semibold text-sm tracking-wide hover:bg-navy-900 hover:shadow-lg hover:shadow-navy/20 transition-all duration-300">
            Commencer un parcours
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={16} />
          </Link>
          <Link to="/metiers" data-testid="hero-cta-secondary" className="group inline-flex items-center gap-2 border border-navy/20 text-navy rounded-full px-7 py-4 font-body font-semibold text-sm tracking-wide hover:border-navy hover:bg-white transition-all duration-300">
            Découvrir les métiers
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </Link>
        </div>
        <div className="mt-10 flex items-center gap-6 text-xs font-body text-navy/50">
          <span className="inline-flex items-center gap-2"><Star size={12} className="text-brick fill-brick" /> 100% gratuit</span>
          <span className="w-1 h-1 rounded-full bg-navy/20" />
          <span>Sans inscription</span>
          <span className="w-1 h-1 rounded-full bg-navy/20" />
          <span>2 min pour démarrer</span>
        </div>
      </motion.div>

      <div className="lg:col-span-6 relative min-h-[500px] md:min-h-[560px]">
        {/* Backdrop blob */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-cream-dark via-brick/5 to-navy/5 blur-3xl" />
        </div>
        {/* Central 3D illustration */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          src={IMG.clay}
          alt="Trois générations qui explorent leur avenir ensemble"
          className="relative z-10 w-full h-auto max-h-[560px] object-contain drop-shadow-[0_30px_40px_rgba(30,58,138,0.15)]"
          draggable="false"
        />
        {/* Floating card 1 — top-left */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="absolute top-4 left-0 lg:-left-4 z-20 bg-white rounded-2xl px-4 py-3 shadow-[0_15px_40px_rgba(30,58,138,0.12)] border border-navy/5 hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brick/10 flex items-center justify-center"><TrendingUp size={16} className="text-brick" /></div>
            <div>
              <div className="font-heading text-xl text-navy leading-none">100</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-navy/50 mt-0.5">métiers racontés</div>
            </div>
          </div>
        </motion.div>
        {/* Floating card 2 — bottom-right, hors du personnage */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="absolute bottom-8 right-0 lg:-right-4 z-20 bg-navy text-cream rounded-2xl px-4 py-3 shadow-[0_15px_40px_rgba(30,58,138,0.25)] hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brick/30 flex items-center justify-center"><Wallet size={16} className="text-brick-soft" /></div>
            <div>
              <div className="font-heading text-sm">Budget réel</div>
              <div className="font-body text-[10px] uppercase tracking-widest text-cream/60 mt-0.5">simulé à la ville près</div>
            </div>
          </div>
        </motion.div>
        {/* Handwritten annotation — bottom-left */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
          animate={{ opacity: 1, rotate: -6, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="absolute -bottom-2 left-2 lg:left-8 z-20 pointer-events-none"
        >
          <span className="font-script text-brick text-3xl md:text-4xl">essaie-le, pour de vrai</span>
          <svg className="text-brick/70 -mt-2 ml-4" width="80" height="12" viewBox="0 0 80 12" fill="none">
            <path d="M2 8C15 3 40 3 78 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  </section>
);

// ============= EXPERIENCES =============
const ExperiencesSection = () => {
  const items = [
    { icon: Compass, title: "Simulation carrière", tag: "12 min · Aléas réalistes", desc: "Vis les grandes étapes d'une carrière : filière, premier poste, dilemme, mobilité. Bilan chiffré à la clé.", to: "/simulation", accent: "bg-navy text-cream" },
    { icon: Sparkles, title: "Trouve ta voie", tag: "2 min · Sans engagement", desc: "Un questionnaire qui s'adapte à ta situation. Perdu·e, une idée précise, ou en reconversion.", to: "/trouve-ta-voie", accent: "bg-brick text-cream" },
    { icon: Users, title: "Immersion pro", tag: "7 étapes · Terrain", desc: "Vis le quotidien d'une entreprise, de l'intérieur : CSE, formation, mobilité, participation — et des offres réelles à la fin.", to: "/immersion", accent: "bg-white text-navy border border-navy/10" },
  ];
  return (
    <section data-testid="experiences" className="py-16 md:py-24">
      <div className="container-md">
        <motion.div {...fadeUp} className="max-w-3xl mb-12">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Le concept</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy mt-3 leading-[1.1] tracking-tight">
            3 façons d'<span className="fraunces-italic">essayer</span> demain, aujourd'hui.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <Link to={it.to} data-testid={`exp-card-${i}`} className="group block h-full">
                <div className={`h-full rounded-[1.75rem] p-8 ${it.accent} transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl relative overflow-hidden`}>
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-700" />
                  <div className="flex items-start justify-between relative">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <it.icon size={20} className={it.accent.includes("text-cream") ? "text-cream" : "text-navy"} />
                    </div>
                    <span className="font-body text-xs uppercase tracking-widest opacity-50">0{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-3xl mt-10 leading-tight relative">{it.title}</h3>
                  <p className="font-body text-[11px] uppercase tracking-widest opacity-60 mt-2 relative">{it.tag}</p>
                  <p className="font-body text-sm leading-relaxed mt-5 opacity-90 relative">{it.desc}</p>
                  <div className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold relative">
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

// ============= RAISON D'ÊTRE =============
const RaisonDetre = () => (
  <section data-testid="raison-detre" className="py-16 md:py-24 bg-navy text-cream relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-brick/5 blur-3xl" />
    <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
      <div className="lg:col-span-5 relative h-[380px] md:h-[440px]">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          src={IMG.raison1}
          alt="Transmission et évolution"
          className="absolute top-0 left-0 w-[72%] h-[68%] object-cover rounded-[1.75rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          style={{ transform: "rotate(-2deg)" }}
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
          alt="Reconversion et nouveaux départs"
          className="absolute bottom-0 right-0 w-[58%] h-[52%] object-cover rounded-[1.75rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          style={{ transform: "rotate(3deg)" }}
        />
        <motion.div
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }} whileInView={{ opacity: 1, rotate: -8, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-[45%] right-[10%] z-20 pointer-events-none"
        >
          <span className="font-script text-brick-soft text-3xl">à tout âge</span>
        </motion.div>
      </div>
      <motion.div {...fadeUp} className="lg:col-span-7">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-brick-soft">Notre raison d'être</span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mt-3 leading-[1.1]">
          On ne veut pas te <span className="fraunces-italic">vendre</span> un avenir.
          <br />Juste t'aider à le <span className="fraunces-italic">choisir</span>.
        </h2>
        <p className="font-body text-base md:text-lg text-cream/80 mt-6 max-w-2xl leading-relaxed">
          « J'ai mis des années à comprendre ce que je voulais faire, faute d'avoir les bonnes infos au bon
          moment. Moi Demain, c'est cette explication que j'aurais aimé avoir, offerte à qui en a besoin
          aujourd'hui. »
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
          <div><div className="font-heading text-3xl md:text-4xl text-brick-soft">100</div><div className="font-body text-[10px] uppercase tracking-widest text-cream/60 mt-1">métiers racontés</div></div>
          <div><div className="font-heading text-3xl md:text-4xl text-brick-soft">12</div><div className="font-body text-[10px] uppercase tracking-widest text-cream/60 mt-1">secteurs couverts</div></div>
          <div><div className="font-heading text-3xl md:text-4xl text-brick-soft">100%</div><div className="font-body text-[10px] uppercase tracking-widest text-cream/60 mt-1">gratuit, sans compte</div></div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ============= PROFIL ENTRY (remplace mini-sim, fidèle HTML v145) =============
const ProfilEntry = () => {
  const [prenom, setPrenom] = useState("");
  const profils = [
    { key: "idee", emoji: "🎯", titre: "Je sais déjà", desc: "J'ai une idée assez précise en tête", to: "/trouve-ta-voie" },
    { key: "perdu", emoji: "🤷", titre: "Aucune idée", desc: "Et ça me questionne, franchement", to: "/trouve-ta-voie" },
    { key: "depend", emoji: "🎲", titre: "Ça dépend des jours", desc: "Parfois oui, parfois plus du tout", to: "/trouve-ta-voie" },
  ];
  return (
    <section data-testid="profil-entry" className="py-16 md:py-24 bg-cream-dark/40">
      <div className="container-md">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-navy/50">On te l'a sûrement déjà demandé cent fois</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy mt-4 leading-[1.1]">
            Qu'est-ce que tu aimerais faire <span className="fraunces-italic text-brick">plus tard</span> ?
          </h2>
          <p className="font-body text-navy/70 mt-6 max-w-xl mx-auto leading-relaxed">
            Cette question, tout le monde te la pose depuis que tu es petit·e. Cette fois, au lieu d'y répondre
            en l'air, viens vraiment tester ta réponse.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="max-w-xl mx-auto mt-10 flex flex-col sm:flex-row items-center gap-4">
          <input
            data-testid="profil-prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Ton prénom (facultatif)"
            className="w-full sm:flex-1 bg-white rounded-full px-6 py-3.5 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none placeholder:text-navy/40"
          />
          <span className="font-body text-xs text-navy/50 text-center sm:text-left">On s'en sert juste pour personnaliser ta visite</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 max-w-5xl mx-auto">
          {profils.map((p, i) => (
            <motion.div key={p.key} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <Link
                to={`${p.to}${prenom ? `?prenom=${encodeURIComponent(prenom)}` : ""}&profil=${p.key}`}
                data-testid={`profil-${p.key}`}
                className="group block bg-white rounded-[1.5rem] p-8 text-center border border-navy/5 hover:-translate-y-2 hover:shadow-xl hover:border-brick/20 transition-all duration-500"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{p.emoji}</div>
                <h3 className="font-heading text-2xl text-navy">{p.titre}</h3>
                <p className="font-body text-sm text-navy/60 mt-3 leading-relaxed">{p.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-brick opacity-0 group-hover:opacity-100 transition-opacity">
                  Commencer <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= MINI SIMULATION =============
const MiniSim = () => {
  const [metiers, setMetiers] = useState([]);
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("moyenne");
  const [preview, setPreview] = useState(null);
  useEffect(() => { fetchMetiers({ limit: 20 }).then(d => { setMetiers(d.items); if (d.items[0]) setMetier(d.items[0].slug); }); }, []);
  useEffect(() => { if (metier) fetchSimPreview({ metier, ville }).then(setPreview).catch(() => {}); }, [metier, ville]);
  return (
    <section data-testid="minisim" className="py-16 md:py-24">
      <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Mini-simulation</span>
          <h2 className="font-heading text-4xl md:text-5xl text-navy mt-3 leading-[1.1]">
            Teste ton futur budget, <span className="fraunces-italic">là, maintenant.</span>
          </h2>
          <p className="font-body text-navy/70 mt-5 leading-relaxed">
            Choisis un métier et une ville : on estime ton salaire net et la répartition de ton budget.
            La vraie simulation va beaucoup plus loin.
          </p>
          <Link to="/simulation" data-testid="minisim-cta" className="group inline-flex items-center gap-2 mt-6 text-navy font-body font-semibold underline underline-offset-4 decoration-brick decoration-2 hover:decoration-navy transition-colors">
            Voir la vraie simulation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div {...fadeUp} className="lg:col-span-7">
          <div className="bg-white rounded-[1.75rem] p-6 md:p-8 shadow-[0_25px_60px_rgba(30,58,138,0.08)] border border-navy/5 relative">
            <div className="absolute -top-3 -right-3 bg-brick text-cream text-[10px] uppercase tracking-widest font-body font-semibold px-3 py-1.5 rounded-full">Live</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ton métier</span>
                <select data-testid="minisim-metier" value={metier} onChange={e => setMetier(e.target.value)} className="w-full mt-2 bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none transition-shadow">
                  {metiers.map(m => <option key={m.slug} value={m.slug}>{m.nom}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="font-body text-xs uppercase tracking-widest text-navy/50">Ta ville</span>
                <select data-testid="minisim-ville" value={ville} onChange={e => setVille(e.target.value)} className="w-full mt-2 bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none transition-shadow">
                  <option value="paris">Paris</option><option value="lyon">Lyon</option>
                  <option value="bordeaux">Bordeaux</option><option value="rennes">Rennes</option>
                  <option value="moyenne">Ville moyenne</option><option value="rural">Zone rurale</option>
                </select>
              </label>
            </div>
            {preview && (
              <motion.div key={preview.salaire_net_mois + ville} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-navy/10 space-y-2.5">
                <div className="flex justify-between items-baseline"><span className="font-body text-navy/60">Salaire net estimé</span><span className="font-heading text-3xl text-navy">{preview.salaire_net_mois}€<span className="text-sm text-navy/50">/mois</span></span></div>
                <div className="flex justify-between text-sm font-body"><span className="text-navy/60">Loyer</span><span className="text-navy">−{preview.logement}€</span></div>
                <div className="flex justify-between text-sm font-body"><span className="text-navy/60">Vie courante</span><span className="text-navy">−{preview.vie_courante}€</span></div>
                <div className="flex justify-between items-baseline pt-3 border-t border-navy/10">
                  <span className="font-body font-semibold text-navy">Reste pour kiffer & épargner</span>
                  <span className="font-heading text-2xl text-brick">{preview.reste_a_vivre}€</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============= RESSOURCES =============
const Ressources = () => {
  const items = [
    { title: "Comprendre ta 1re fiche de paie", desc: "Brut, net, cotisations, prélèvement à la source : chaque ligne expliquée en français normal.", tag: "Éducation financière" },
    { title: "Bourses & aides : ce qui t'est dû", desc: "Bourse du lycée, Parcoursup, aides au logement, mobilité. La plupart passent à côté. Pas toi.", tag: "Aides" },
    { title: "Étudier ou bosser à l'étranger", desc: "Erasmus, PVT, stages internationaux : démarches, budgets, pièges à éviter.", tag: "Mobilité" },
  ];
  return (
    <section data-testid="ressources-home" className="py-16 md:py-24">
      <div className="container-md">
        <motion.div {...fadeUp} className="max-w-3xl mb-12">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Ressources</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy mt-3 leading-[1.1]">
            Les trucs qu'on aurait dû t'<span className="fraunces-italic">apprendre à l'école</span>.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((r, i) => (
            <motion.div key={r.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <Link to="/ressources" className="group block bg-white rounded-[1.75rem] p-7 h-full border border-navy/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                <span className="font-body text-[11px] uppercase tracking-widest text-brick">{r.tag}</span>
                <h3 className="font-heading text-2xl md:text-3xl text-navy mt-5 leading-tight">{r.title}</h3>
                <p className="font-body text-sm text-navy/70 mt-3 leading-relaxed">{r.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy">Lire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============= FINAL CTA =============
const FinalCTA = () => (
  <section data-testid="final-cta" className="py-16 md:py-24">
    <div className="container-md">
      <motion.div {...fadeUp} className="bg-navy rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-brick/20 blur-3xl" />
        <div className="absolute bottom-8 left-8 w-40 h-40 rounded-full bg-brick/10 blur-3xl" />
        <motion.div initial={{ opacity: 0, rotate: -6 }} whileInView={{ opacity: 1, rotate: -4 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative inline-block mb-3">
          <span className="font-script text-brick-soft text-2xl md:text-3xl">on t'attend</span>
        </motion.div>
        <h2 className="relative font-heading text-4xl md:text-6xl text-cream leading-[1.1] max-w-3xl mx-auto">
          Prêt·e à <span className="fraunces-italic text-brick-soft">rencontrer</span> le toi de demain ?
        </h2>
        <p className="relative font-body text-cream/70 mt-5 max-w-xl mx-auto">Deux minutes, zéro inscription, et des pistes concrètes à tester dès cette semaine.</p>
        <Link to="/trouve-ta-voie" data-testid="final-cta-btn" className="group relative inline-flex items-center gap-3 mt-8 bg-cream text-navy rounded-full px-9 py-4 font-body font-semibold hover:scale-105 transition-transform">
          <PlayCircle size={20} className="group-hover:rotate-12 transition-transform" /> Lancer ma simulation
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
      <ProfilEntry />
      <Ressources />
      <FinalCTA />
    </div>
  );
}
