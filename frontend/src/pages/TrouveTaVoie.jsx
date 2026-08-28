import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const QUESTIONS = [
  { key: "situation", q: "Où en es-tu aujourd'hui ?", options: [
    { v: "college", l: "Au collège" }, { v: "lycee", l: "Au lycée" },
    { v: "bts_but", l: "En BTS / BUT" }, { v: "licence", l: "En licence" },
    { v: "master", l: "En master ou école" }, { v: "alternance", l: "En alternance" },
    { v: "salarie", l: "En poste, satisfait·e" }, { v: "doute", l: "En poste, mais tu te poses des questions" },
    { v: "recherche", l: "Entre deux postes" }, { v: "reconversion", l: "En reconversion" },
    { v: "independant", l: "Indépendant·e / entrepreneur·e" },
  ]},
  { key: "horizon", q: "Court terme ou long terme ?", options: [
    { v: "court", l: "Court terme : les prochains mois" },
    { v: "long", l: "Long terme : à 5 ou 10 ans" },
  ]},
  { key: "profil", q: "Quel est ton profil aujourd'hui ?", options: [
    { v: "perdu", l: "Perdu·e, sans idée précise" },
    { v: "idee", l: "J'ai déjà une idée précise en tête" },
    { v: "reconv", l: "Je suis en reconversion, j'ai de l'expérience" },
  ]},
  { key: "interet", q: "Ce qui te fait vibrer, plutôt...", options: [
    { v: "R", l: "Manipuler, construire, réparer" },
    { v: "I", l: "Comprendre, analyser, chercher" },
    { v: "A", l: "Créer, imaginer, exprimer" },
    { v: "S", l: "Aider, écouter, transmettre" },
    { v: "E", l: "Convaincre, entreprendre, diriger" },
    { v: "C", l: "Organiser, structurer, sécuriser" },
  ]},
];

const RESULTS = {
  R: { titre: "Le·la Réaliste", desc: "Tu aimes le concret, les mains dans le cambouis, les résultats qu'on peut voir et toucher.", secteurs: ["btp", "artisanat", "agriculture"] },
  I: { titre: "Le·la Chercheur·se", desc: "Comprendre le pourquoi te motive plus que suivre une recette. La rigueur est ton alliée.", secteurs: ["tech", "sante"] },
  A: { titre: "Le·la Créatif·ve", desc: "Tu as besoin d'imaginer, de composer, d'inventer. L'esthétique compte pour toi.", secteurs: ["culture", "artisanat"] },
  S: { titre: "L'accompagnant·e", desc: "Le lien humain est central. Aider les autres à avancer donne du sens à ce que tu fais.", secteurs: ["sante", "education", "psychologie"] },
  E: { titre: "Le·la Bâtisseur·se", desc: "Tu veux entreprendre, convaincre, faire bouger les lignes. Le risque ne te fait pas peur.", secteurs: ["commerce", "finance"] },
  C: { titre: "L'organisateur·rice", desc: "Structurer, sécuriser, faire tourner les rouages : tu adores quand tout est en ordre.", secteurs: ["public", "finance"] },
};

export default function TrouveTaVoie() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const total = QUESTIONS.length;

  const answer = (v) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.key]: v };
    setAnswers(next);
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => { setStep(0); setAnswers({}); setDone(false); };
  const result = done ? RESULTS[answers.interet] : null;

  return (
    <div data-testid="ttv-page" className="min-h-[80vh] flex items-center py-16">
      <div className="container-md max-w-3xl">
        {!done && (
          <>
            <div className="mb-10">
              <div className="flex justify-between font-body text-xs uppercase tracking-widest text-navy/50 mb-3">
                <span>Trouve ta voie</span><span>{step + 1} / {total}</span>
              </div>
              <div className="h-1 bg-navy/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${((step + 1) / total) * 100}%` }} transition={{ duration: 0.5 }} className="h-full bg-brick" />
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <h2 data-testid={`ttv-question-${step}`} className="font-heading text-4xl md:text-5xl text-navy leading-tight">
                  {QUESTIONS[step].q}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                  {QUESTIONS[step].options.map(opt => (
                    <button key={opt.v} data-testid={`ttv-opt-${opt.v}`} onClick={() => answer(opt.v)}
                      className="text-left bg-white border border-navy/10 rounded-2xl p-5 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all">
                      {opt.l}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
        {done && result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} data-testid="ttv-result">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick flex items-center gap-2"><Sparkles size={14} /> Ton profil</span>
            <h2 className="font-heading text-5xl md:text-6xl text-navy mt-4">{result.titre}</h2>
            <p className="font-body text-lg text-navy/70 mt-6 max-w-2xl leading-relaxed">{result.desc}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {result.secteurs.map(s => (
                <Link key={s} to={`/metiers?secteur=${s}`} className="inline-flex items-center gap-2 bg-white border border-navy/10 rounded-full px-5 py-2.5 font-body text-sm text-navy hover:border-navy transition-colors">
                  Explorer ce secteur <ArrowRight size={14} />
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link data-testid="ttv-to-metiers" to="/metiers" className="inline-flex items-center gap-2 bg-navy text-cream rounded-full px-8 py-4 font-body font-semibold">
                Découvrir les métiers <ArrowRight size={16} />
              </Link>
              <button data-testid="ttv-restart" onClick={reset} className="inline-flex items-center gap-2 border border-navy/20 text-navy rounded-full px-8 py-4 font-body font-semibold">
                <RotateCcw size={14} /> Refaire
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
