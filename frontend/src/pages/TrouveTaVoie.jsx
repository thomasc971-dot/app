import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

// ============================================================
// PAGE /trouve-ta-voie — portage fidèle des 3 sous-parcours
// (Perdu·e / Idée précise / Reconversion), avec le vrai quiz RIASEC
// et le bilan à 5/10 ans. Remplace l'ancienne version à 4 questions.
// ============================================================

const SECTEUR_LABELS = {
  tech: "Tech", sante: "Santé", btp: "BTP", commerce: "Commerce", agriculture: "Agriculture",
  artisanat: "Artisanat", public: "Public", finance: "Finance", education: "Éducation",
  culture: "Culture", tourisme: "Tourisme", psychologie: "Psychologie",
};

const SECTEUR_ACTIVITE_MULT = { tech: 1.25, finance: 1.3, sante: 1.0, btp: 0.95, commerce: 0.9, agriculture: 0.8, artisanat: 0.85, public: 0.9, education: 0.85, culture: 0.9, tourisme: 0.85, psychologie: 0.95 };

const SECTEUR_TO_RIASEC = {
  tech: ["investigateur", "realiste"], sante: ["social", "realiste"], btp: ["realiste", "conventionnel"],
  commerce: ["entreprenant", "social"], agriculture: ["realiste", "investigateur"], artisanat: ["realiste", "artistique"],
  public: ["conventionnel", "social"], finance: ["conventionnel", "entreprenant"], education: ["social", "investigateur"],
  culture: ["artistique", "entreprenant"], tourisme: ["social", "entreprenant"], psychologie: ["social", "investigateur"],
};

const RIASEC_LABELS = {
  realiste: "🔧 Réaliste", investigateur: "🔬 Investigateur", artistique: "🎨 Artistique",
  social: "🤝 Social", entreprenant: "🚀 Entreprenant", conventionnel: "📋 Conventionnel",
};
const RIASEC_INFO = {
  realiste: "Tu es concret, pratique, tu aimes travailler avec tes mains, des outils ou de la matière plutôt qu'avec des concepts abstraits.",
  investigateur: "Tu es analytique, curieux, tu aimes comprendre comment les choses fonctionnent et résoudre des problèmes complexes.",
  artistique: "Tu es créatif, tu aimes l'expression personnelle, l'originalité, et tu préfères les cadres souples aux procédures rigides.",
  social: "Tu es empathique, tu aimes aider, enseigner ou accompagner les autres, et la coopération te motive plus que la compétition.",
  entreprenant: "Tu es persuasif, tu aimes convaincre, diriger, prendre des initiatives, et le risque ne te fait pas peur.",
  conventionnel: "Tu es méthodique, tu aimes l'ordre, la précision, les procédures claires et les systèmes qui fonctionnent bien.",
};

const TTV_SITUATIONS = [
  { cle: "college", label: "🎒 Au collège", precision: "au collège" },
  { cle: "lycee", label: "📘 Au lycée", precision: "au lycée" },
  { cle: "bts_but", label: "🎓 En BTS / BUT", precision: "en BTS ou BUT" },
  { cle: "licence", label: "📚 En licence", precision: "en licence" },
  { cle: "master_ecole", label: "🏛️ En master ou école", precision: "en master ou en école" },
  { cle: "alternance", label: "🔁 En alternance", precision: "en alternance" },
  { cle: "salarie", label: "💼 En poste, salarié·e", precision: "en poste" },
  { cle: "recherche", label: "🔍 En recherche d'emploi", precision: "en recherche d'emploi" },
  { cle: "independant", label: "🚀 Indépendant·e / entrepreneur·e", precision: "en tant qu'indépendant·e" },
];
const TTV_NIVEAU_DEPUIS_SITUATION = {
  college: "lycee", lycee: "lycee",
  bts_but: "postbac", licence: "postbac", master_ecole: "postbac",
  alternance: "actif", salarie: "actif", recherche: "actif", independant: "actif",
};

const TTV_QUIZ = [
  { q: "Dans un projet de groupe, tu es plutôt du genre à...", opts: [
    { label: "Organiser et coordonner tout le monde", tags: ["conventionnel", "entreprenant"] },
    { label: "Mettre les mains dans le concret, fabriquer, réparer", tags: ["realiste"] },
    { label: "Aider, écouter, accompagner les autres", tags: ["social"] },
    { label: "Résoudre des problèmes techniques ou logiques", tags: ["investigateur"] },
  ]},
  { q: "Un dimanche libre, tu préfères...", opts: [
    { label: "Bricoler ou construire quelque chose de tes mains", tags: ["realiste"] },
    { label: "Passer du temps dehors, avec des animaux ou dans la nature", tags: ["realiste", "investigateur"] },
    { label: "Discuter, négocier, convaincre quelqu'un", tags: ["entreprenant"] },
    { label: "Coder, jouer à des jeux vidéo, tester des applis", tags: ["investigateur"] },
  ]},
  { q: "Ce qui te motiverait le plus dans un travail...", opts: [
    { label: "Aider concrètement des gens au quotidien", tags: ["social"] },
    { label: "Un cadre stable, utile à la collectivité", tags: ["conventionnel", "social"] },
    { label: "Gagner bien ma vie, évoluer vite", tags: ["entreprenant"] },
    { label: "Créer ou réparer des choses avec mes mains", tags: ["realiste"] },
  ]},
  { q: "Face à un problème compliqué, ta première réaction...", opts: [
    { label: "Tu cherches à comprendre en profondeur avant d'agir", tags: ["investigateur"] },
    { label: "Tu imagines une solution originale, hors des sentiers battus", tags: ["artistique"] },
    { label: "Tu suis une méthode connue, étape par étape", tags: ["conventionnel"] },
    { label: "Tu rassembles les gens concernés pour trancher ensemble", tags: ["social", "entreprenant"] },
  ]},
  { q: "Dans ton environnement idéal, tu voudrais surtout...", opts: [
    { label: "De la liberté pour exprimer tes idées sans trop de contraintes", tags: ["artistique"] },
    { label: "Des objectifs clairs et la possibilité de convaincre, de vendre, de diriger", tags: ["entreprenant"] },
    { label: "Des règles claires et un travail bien fait, sans surprise", tags: ["conventionnel"] },
    { label: "Du concret, du terrain, pas juste du bureau", tags: ["realiste"] },
  ]},
  { q: "Le compliment qui te toucherait le plus...", opts: [
    { label: "Tu es quelqu'un de très créatif", tags: ["artistique"] },
    { label: "On peut toujours compter sur toi, tu es fiable", tags: ["conventionnel"] },
    { label: "Tu comprends vraiment les choses en profondeur", tags: ["investigateur"] },
    { label: "Tu sais motiver et embarquer les autres", tags: ["entreprenant", "social"] },
  ]},
];

const RAISONS_RECONV = {
  sens: "Tu ne te retrouvais plus dans ton métier actuel.",
  conditions: "Tu cherchais un meilleur salaire ou de meilleures conditions.",
  subie: "Ton secteur ou ton poste actuel est en difficulté.",
  envie: "Tu avais simplement envie de repartir de zéro.",
};

const TEMOIGNAGES_PROJECTION = [
  { titre: "Celle qui a tenu un cap", texte: "« Un secteur choisi à 20 ans, gardé même sans être exaltant. À 28 ans : un poste où je suis reconnue. »" },
  { titre: "Celui qui a suivi les occasions", texte: "« Trois voies en 6 ans, à chaque fois une bonne occasion sur le moment. Avec le recul, je recommence souvent à zéro. »" },
];

function riasecToSecteurs(riasecScores) {
  const secteurScores = {};
  Object.keys(SECTEUR_TO_RIASEC).forEach((secteur) => {
    const dims = SECTEUR_TO_RIASEC[secteur];
    const total = dims.reduce((sum, d) => sum + (riasecScores[d] || 0), 0);
    secteurScores[secteur] = total / dims.length;
  });
  return secteurScores;
}

// --- Écran générique réutilisé par tous les sous-parcours ---
function TTVCard({ eyebrow, title, children, choices, onBack }) {
  return (
    <>
      {onBack && (
        <button onClick={onBack} className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy mb-6">
          <ArrowLeft size={14} /> Retour
        </button>
      )}
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">{eyebrow}</span>
      <h1 className="font-heading text-2xl md:text-3xl text-navy mt-4 leading-snug">{title}</h1>
      {children}
      {choices && (
        <div className="flex flex-col gap-3 mt-8">
          {choices.map((c) => (
            <button key={c.label} onClick={c.onClick}
              className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all">
              {c.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

const ECRAN = {
  INTRO: "intro", SITUATION: "situation", MOBILITE: "mobilite", MOBILITE_DETAIL: "mobiliteDetail",
  PROFIL_CHOICE: "profilChoice",
  PERDU_QUIZ: "perduQuiz", PERDU_RESULTAT: "perduResultat", EXPLORE_SECTEUR: "exploreSecteur",
  IDEE_Q1: "ideeQ1", IDEE_RESULTAT: "ideeResultat",
  RECONV_Q1: "reconvQ1", RECONV_Q2: "reconvQ2", RECONV_FINANCE: "reconvFinance", RECONV_RESULTAT: "reconvResultat",
  BILAN_RAPIDE: "bilanRapide", PLAN_B: "planB", HORIZON: "horizon", TEMOIGNAGE: "temoignage", FIN: "fin",
};

export default function TrouveTaVoie() {
  const [ecran, setEcran] = useState(ECRAN.INTRO);
  const [horizon, setHorizon] = useState(null);
  const [situationActuelle, setSituationActuelle] = useState(null);
  const [situationPrecision, setSituationPrecision] = useState(null);
  const [mobiliteOuverte, setMobiliteOuverte] = useState(null);
  const [profil, setProfil] = useState(null);
  const [secteurChoisi, setSecteurChoisi] = useState(null);
  const [raisonReconv, setRaisonReconv] = useState(null);
  const [planB, setPlanB] = useState(null);
  // quiz RIASEC
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScores, setQuizScores] = useState({});
  const [topSecteurs, setTopSecteurs] = useState([]);

  const niveau = TTV_NIVEAU_DEPUIS_SITUATION[situationActuelle] || "actif";

  const handleChoixQuiz = (opt) => {
    const next = { ...quizScores };
    opt.tags.forEach((t) => { next[t] = (next[t] || 0) + 1; });
    setQuizScores(next);
    if (quizIdx + 1 >= TTV_QUIZ.length) {
      const maxScore = Math.max(3, ...Object.values(next));
      const secteurScores = riasecToSecteurs(next);
      const sorted = Object.entries(secteurScores).sort((a, b) => b[1] - a[1]).slice(0, 3).map((s) => s[0]);
      setTopSecteurs(sorted);
      setEcran(ECRAN.PERDU_RESULTAT);
    } else {
      setQuizIdx(quizIdx + 1);
    }
  };

  const goBilanRapide = (secteur) => { setSecteurChoisi(secteur); setEcran(ECRAN.BILAN_RAPIDE); };
  const salaireIndicatif = secteurChoisi ? Math.round(28 * (SECTEUR_ACTIVITE_MULT[secteurChoisi] || 1)) : 0;

  const aujourdhuiTxt = () => {
    if (profil === "perdu") return "Tu ne savais pas encore vraiment où te diriger, et c'est très bien ainsi à ce stade. Le profil de personnalité t'a donné un premier repère.";
    if (profil === "idee") return "Tu avais déjà une idée assez précise en tête avant de commencer ce parcours.";
    return RAISONS_RECONV[raisonReconv] || "Tu es en réflexion sur une reconversion.";
  };

  const mapEtapesIdee = {
    lycee: "☐ Vérifier dès maintenant les spécialités de lycée qui ouvrent vers ce secteur, pour ne pas te fermer de portes.\n☐ Chercher un stage de découverte de 3ème ou une journée d'immersion dans ce métier.",
    postbac: "☐ Repérer sur Parcoursup les formations qui mènent à ce secteur, et vérifier leurs attendus réels.\n☐ Contacter d'anciens élèves de ces formations via LinkedIn pour un retour d'expérience direct.",
    actif: "☐ Identifier une formation courte, une VAE ou une alternance pour valider tes compétences dans ce secteur.\n☐ Te faire accompagner gratuitement par l'Apec ou France Travail pour affiner ton projet.",
  };

  const resetParcours = () => {
    setEcran(ECRAN.INTRO); setHorizon(null); setSituationActuelle(null); setSituationPrecision(null);
    setMobiliteOuverte(null); setProfil(null); setSecteurChoisi(null); setRaisonReconv(null); setPlanB(null);
    setQuizIdx(0); setQuizScores({}); setTopSecteurs([]);
  };

  return (
    <div data-testid="ttv-page" className="pb-24 pt-8">
      <div className="container-md max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={ecran + quizIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>

            {ecran === ECRAN.INTRO && (
              <TTVCard eyebrow="Trouve ta voie" title="D'abord, une question simple."
                choices={[
                  { label: "📅 Plutôt maintenant, dans les prochains mois", onClick: () => { setHorizon("court"); setEcran(ECRAN.SITUATION); } },
                  { label: "🔭 Plutôt sur les 5 à 10 prochaines années", onClick: () => { setHorizon("long"); setEcran(ECRAN.SITUATION); } },
                ]}>
                <p className="font-body text-navy/70 mt-4">Tu préfères qu'on parle de ta situation là, maintenant, ou qu'on prenne un peu de recul sur les années qui viennent ?</p>
                <div className="mt-4 bg-brick/5 border border-brick/15 rounded-xl px-4 py-3 font-body text-sm text-navy/70">
                  💡 Ce quiz donne des pistes à explorer, pas une réponse figée. Ta voie se construira pas à pas, avec le temps : aucune urgence à tout savoir aujourd'hui.
                </div>
              </TTVCard>
            )}

            {ecran === ECRAN.SITUATION && (
              <TTVCard eyebrow="Trouve ta voie" title="Concrètement, tu es où aujourd'hui ?" onBack={() => setEcran(ECRAN.INTRO)}
                choices={TTV_SITUATIONS.map((s) => ({
                  label: s.label,
                  onClick: () => { setSituationActuelle(s.cle); setSituationPrecision(s.precision); setEcran(ECRAN.MOBILITE); },
                }))}>
                <p className="font-body text-navy/70 mt-4">Ça permet de partir de ta vraie situation, pas d'une case générique.</p>
              </TTVCard>
            )}

            {ecran === ECRAN.MOBILITE && (
              <TTVCard eyebrow="Trouve ta voie" title="Bouger, ça t'intéresse ?" onBack={() => setEcran(ECRAN.SITUATION)}
                choices={[
                  { label: "✅ Oui, je suis mobile", onClick: () => { setMobiliteOuverte(true); setEcran(ECRAN.MOBILITE_DETAIL); } },
                  { label: "❌ Non, je préfère rester sur place", onClick: () => { setMobiliteOuverte(false); setEcran(ECRAN.PROFIL_CHOICE); } },
                ]}>
                <p className="font-body text-navy/70 mt-4">Changer de ville, de région, ou même de pays fait partie des options possibles. Est-ce que la mobilité est envisageable pour toi ?</p>
              </TTVCard>
            )}

            {ecran === ECRAN.MOBILITE_DETAIL && (
              <TTVCard eyebrow="Trouve ta voie" title="Plutôt en France, ou plus loin ?" onBack={() => setEcran(ECRAN.MOBILITE)}
                choices={[{ label: "Continuer le parcours →", onClick: () => setEcran(ECRAN.PROFIL_CHOICE) }]}>
                <p className="font-body text-navy/70 mt-4">Les deux se préparent différemment. On a des pages dédiées pour t'aider dans les deux cas.</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Link to="/ressources/mobilite-france" className="flex-1 text-center bg-cream border border-navy/10 rounded-xl px-4 py-3 font-body text-sm font-semibold text-navy">🗺️ Bouger en France</Link>
                  <Link to="/ressources/expatriation" className="flex-1 text-center bg-cream border border-navy/10 rounded-xl px-4 py-3 font-body text-sm font-semibold text-navy">🌍 Partir à l'étranger</Link>
                </div>
              </TTVCard>
            )}

            {ecran === ECRAN.PROFIL_CHOICE && (
              <TTVCard eyebrow="Trouve ta voie" title="Où en es-tu, là, maintenant ?" onBack={() => setEcran(ECRAN.MOBILITE)}
                choices={[
                  { label: "🌫️ Je suis perdu·e, aucune idée précise", onClick: () => { setProfil("perdu"); setEcran(ECRAN.PERDU_QUIZ); } },
                  { label: "🎯 J'ai déjà une idée précise en tête", onClick: () => { setProfil("idee"); setEcran(ECRAN.IDEE_Q1); } },
                  { label: "🔄 Je suis en reconversion, j'ai déjà de l'expérience", onClick: () => { setProfil("reconversion"); setEcran(ECRAN.RECONV_Q1); } },
                ]}>
                <p className="font-body text-navy/70 mt-4">Pas de bonne ou de mauvaise réponse. Choisis ce qui te ressemble le plus aujourd'hui, on adapte le parcours en fonction.</p>
              </TTVCard>
            )}

            {/* --- Sous-parcours PERDU : quiz RIASEC --- */}
            {ecran === ECRAN.PERDU_QUIZ && (
              <TTVCard eyebrow="Trouve ta voie → Perdu·e" title={TTV_QUIZ[quizIdx].q}
                onBack={() => (quizIdx > 0 ? setQuizIdx(quizIdx - 1) : setEcran(ECRAN.PROFIL_CHOICE))}
                choices={TTV_QUIZ[quizIdx].opts.map((o) => ({ label: o.label, onClick: () => handleChoixQuiz(o) }))}>
                <p className="font-body text-navy/70 mt-4">Question {quizIdx + 1} sur {TTV_QUIZ.length}, réponds à l'instinct.</p>
              </TTVCard>
            )}

            {ecran === ECRAN.PERDU_RESULTAT && (() => {
              const riasecKeys = Object.keys(RIASEC_LABELS);
              const scores = {}; riasecKeys.forEach((k) => { scores[k] = quizScores[k] || 0; });
              const maxScore = Math.max(3, ...Object.values(scores));
              const sortedRiasec = Object.entries(scores).sort((a, b) => b[1] - a[1]).filter((s) => s[1] > 0).slice(0, 3);
              return (
                <TTVCard eyebrow="Trouve ta voie → Perdu·e → Ton profil" title="Voici ton profil de personnalité professionnelle."
                  onBack={() => setEcran(ECRAN.PERDU_QUIZ)}
                  choices={[
                    ...topSecteurs.map((s) => ({ label: `${SECTEUR_LABELS[s] || s} → voir des métiers concrets`, onClick: () => setEcran(ECRAN.EXPLORE_SECTEUR) && setSecteurChoisi(s) })),
                  ]}>
                  <p className="font-body text-navy/70 mt-4">Une photographie de ce qui te correspond le plus aujourd'hui, pas une case définitive. Ce profil s'appuie sur le modèle RIASEC, utilisé par la plupart des tests d'orientation sérieux.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    {sortedRiasec.map(([key, val], idx) => (
                      <div key={key} className="bg-white rounded-xl border border-navy/10 p-4">
                        <div className="font-body text-xs text-brick font-semibold">#{idx + 1}</div>
                        <div className="font-heading text-lg text-navy mt-1">{RIASEC_LABELS[key]}, {Math.round((val / maxScore) * 100)}%</div>
                        <div className="font-body text-xs text-navy/60 mt-2 leading-relaxed">{RIASEC_INFO[key]}</div>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-navy/70 mt-6">D'après ce profil, voici les secteurs qui te correspondent le mieux :</p>
                  <div className="flex flex-col gap-3 mt-4">
                    {topSecteurs.map((s) => (
                      <button key={s} onClick={() => goBilanRapide(s)}
                        className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all">
                        {SECTEUR_LABELS[s] || s} → voir des métiers concrets
                      </button>
                    ))}
                  </div>
                </TTVCard>
              );
            })()}

            {/* --- Sous-parcours IDÉE PRÉCISE --- */}
            {ecran === ECRAN.IDEE_Q1 && (
              <TTVCard eyebrow="Trouve ta voie → Idée précise" title="Dans quel domaine te vois-tu déjà ?" onBack={() => setEcran(ECRAN.PROFIL_CHOICE)}
                choices={Object.keys(SECTEUR_LABELS).map((k) => ({ label: SECTEUR_LABELS[k], onClick: () => { setSecteurChoisi(k); setEcran(ECRAN.IDEE_RESULTAT); } }))}>
                <p className="font-body text-navy/70 mt-4">Choisis le secteur qui se rapproche le plus de ton idée.</p>
              </TTVCard>
            )}

            {ecran === ECRAN.IDEE_RESULTAT && (
              <TTVCard eyebrow="Trouve ta voie → Idée précise → Résultat" title={`${SECTEUR_LABELS[secteurChoisi]}, voici ce que ça donne concrètement.`}
                onBack={() => setEcran(ECRAN.IDEE_Q1)}
                choices={[{ label: "Voir ma feuille de route →", onClick: () => goBilanRapide(secteurChoisi) }]}>
                <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80">
                  Salaire indicatif : environ {salaireIndicatif} k€/an en début de carrière, jusqu'à environ {Math.round(salaireIndicatif * 1.4)} k€/an avec quelques années d'expérience (ordre de grandeur, à vérifier avec l'Apec/Insee).
                </div>
              </TTVCard>
            )}

            {/* --- Sous-parcours RECONVERSION --- */}
            {ecran === ECRAN.RECONV_Q1 && (
              <TTVCard eyebrow="Trouve ta voie → Reconversion" title="Qu'est-ce qui te pousse à vouloir changer ?" onBack={() => setEcran(ECRAN.PROFIL_CHOICE)}
                choices={[
                  { label: "Je ne me retrouve plus dans mon métier actuel", onClick: () => { setRaisonReconv("sens"); setEcran(ECRAN.RECONV_Q2); } },
                  { label: "Je veux un meilleur salaire ou de meilleures conditions", onClick: () => { setRaisonReconv("conditions"); setEcran(ECRAN.RECONV_Q2); } },
                  { label: "Mon secteur ou mon poste est en difficulté", onClick: () => { setRaisonReconv("subie"); setEcran(ECRAN.RECONV_Q2); } },
                  { label: "Envie de repartir de zéro, sans raison précise", onClick: () => { setRaisonReconv("envie"); setEcran(ECRAN.RECONV_Q2); } },
                ]} />
            )}

            {ecran === ECRAN.RECONV_Q2 && (
              <TTVCard eyebrow="Trouve ta voie → Reconversion" title="Vers quel type de secteur te tournerais-tu ?" onBack={() => setEcran(ECRAN.RECONV_Q1)}
                choices={Object.keys(SECTEUR_LABELS).map((k) => ({ label: SECTEUR_LABELS[k], onClick: () => { setSecteurChoisi(k); setEcran(ECRAN.RECONV_FINANCE); } }))} />
            )}

            {ecran === ECRAN.RECONV_FINANCE && (
              <TTVCard eyebrow="Trouve ta voie → Reconversion" title="Un point essentiel avant d'aller plus loin : le financement." onBack={() => setEcran(ECRAN.RECONV_Q2)}
                choices={[{ label: "Voir mon estimation de reconversion →", onClick: () => setEcran(ECRAN.RECONV_RESULTAT) }]}>
                <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80 leading-relaxed">
                  Se reconvertir ne veut pas dire tout perdre financièrement. Plusieurs dispositifs existent :<br />
                  • <strong>CPF</strong> : des droits déjà accumulés, utilisables pour financer une formation.<br />
                  • <strong>CEP</strong> : un accompagnement humain gratuit pour construire ton projet, sans jugement.<br />
                  • Le Projet de Transition Professionnelle (ex-CIF) peut financer une formation longue en gardant une partie de ton salaire.<br />
                  • Un bilan de compétences (finançable via le CPF) aide à objectiver la reconversion avant de se lancer.
                </div>
              </TTVCard>
            )}

            {ecran === ECRAN.RECONV_RESULTAT && (
              <TTVCard eyebrow="Trouve ta voie → Reconversion → Résultat" title={`Se reconvertir vers ${SECTEUR_LABELS[secteurChoisi]}, en pratique.`}
                onBack={() => setEcran(ECRAN.RECONV_FINANCE)}
                choices={[{ label: "Voir ma feuille de route →", onClick: () => goBilanRapide(secteurChoisi) }]}>
                <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80">
                  Salaire indicatif en reprise dans ce secteur : environ {salaireIndicatif} k€/an au départ, souvent en dessous de ton salaire actuel le temps de monter en compétence.
                </div>
                <div className="bg-brick/5 border border-brick/15 rounded-xl px-4 py-3 mt-3 font-body text-sm text-navy/70">
                  Ce que peu de gens savent : la reconversion est souvent progressive, pas un saut dans le vide du jour au lendemain. Beaucoup gardent un pied dans leur ancien métier le temps de la transition.
                </div>
              </TTVCard>
            )}

            {/* --- Tronc commun de fin : bilan, plan B, horizon, témoignage, fin --- */}
            {ecran === ECRAN.BILAN_RAPIDE && (
              <TTVCard eyebrow="Trouve ta voie → Ton bilan" title="D'où tu pars, où tu veux aller." onBack={() => setEcran(ECRAN.PROFIL_CHOICE)}
                choices={[{ label: "Continuer →", onClick: () => setEcran(ECRAN.PLAN_B) }]}>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3 mt-6">
                  <div className="bg-white rounded-xl border border-navy/10 p-4">
                    <div className="font-body text-xs uppercase tracking-widest text-navy/40">Aujourd'hui</div>
                    <div className="font-body text-sm text-navy/80 mt-2">{aujourdhuiTxt()}{situationPrecision ? ` Aujourd'hui, tu es ${situationPrecision}.` : ""}</div>
                  </div>
                  <div className="text-center font-heading text-2xl text-brick">→</div>
                  <div className="bg-brick/5 rounded-xl border border-brick/15 p-4">
                    <div className="font-body text-xs uppercase tracking-widest text-navy/40">Où tu veux aller</div>
                    <div className="font-heading text-lg text-navy mt-2">{SECTEUR_LABELS[secteurChoisi]}</div>
                  </div>
                </div>
                <p className="font-body text-sm text-navy/60 mt-4">Ce n'est pas un engagement définitif, juste une photo de ta réflexion à cet instant. Tu pourras toujours revenir ici et refaire ce bilan plus tard.</p>
              </TTVCard>
            )}

            {ecran === ECRAN.PLAN_B && (
              <TTVCard eyebrow="Trouve ta voie → Projection" title="Avant d'aller plus loin : et si ça ne se passait pas comme prévu ?"
                onBack={() => setEcran(ECRAN.BILAN_RAPIDE)}
                choices={[
                  ...Object.keys(SECTEUR_LABELS).filter((s) => s !== secteurChoisi).slice(0, 6).map((s) => ({
                    label: SECTEUR_LABELS[s], onClick: () => { setPlanB(s); setEcran(ECRAN.HORIZON); },
                  })),
                  { label: "Passer cette étape pour l'instant", onClick: () => { setPlanB(null); setEcran(ECRAN.HORIZON); } },
                ]}>
                <p className="font-body text-navy/70 mt-4">
                  Avoir un plan B n'est pas un aveu de faiblesse sur ton plan A, c'est ce qui te permet de t'y engager à fond sans avoir peur de tout perdre si un obstacle se présente. Quel secteur pourrait être ta porte de sortie si {SECTEUR_LABELS[secteurChoisi]} ne fonctionnait pas comme prévu ?
                </p>
              </TTVCard>
            )}

            {ecran === ECRAN.HORIZON && (
              <TTVCard eyebrow="Trouve ta voie → Projection" title="Vue à 5 et 10 ans, pas juste demain." onBack={() => setEcran(ECRAN.PLAN_B)}
                choices={[{ label: "Continuer →", onClick: () => setEcran(ECRAN.TEMOIGNAGE) }]}>
                <p className="font-body text-navy/70 mt-4">
                  Beaucoup de jeunes actifs avancent au jour le jour, sans mauvaise raison, juste parce que personne ne leur a proposé de prendre un peu de recul. Ce que tu poses comme base aujourd'hui, même modestement, te donne plus d'options demain que si tu recommences chaque fois de zéro.
                </p>
                <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80 leading-relaxed">
                  📍 Aujourd'hui : environ {salaireIndicatif} k€/an pour un premier poste dans ce secteur.<br />
                  📈 Dans 5 ans, en restant sur cette voie : autour de {Math.round(salaireIndicatif * 1.25)} k€/an.<br />
                  🚀 Dans 10 ans, avec une vraie progression : autour de {Math.round(salaireIndicatif * 1.5)} k€/an.
                </div>
              </TTVCard>
            )}

            {ecran === ECRAN.TEMOIGNAGE && (
              <TTVCard eyebrow="Trouve ta voie → Deux trajectoires" title="Deux façons de faire, ni bonnes ni mauvaises." onBack={() => setEcran(ECRAN.HORIZON)}
                choices={[{ label: "Voir mon bilan final →", onClick: () => setEcran(ECRAN.FIN) }]}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {TEMOIGNAGES_PROJECTION.map((t) => (
                    <div key={t.titre} className="bg-white rounded-xl border border-navy/10 p-4">
                      <div className="font-heading text-base text-navy">{t.titre}</div>
                      <p className="font-body text-sm text-navy/70 mt-2 italic leading-relaxed">{t.texte}</p>
                    </div>
                  ))}
                </div>
              </TTVCard>
            )}

            {ecran === ECRAN.FIN && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-brick flex items-center gap-2"><Sparkles size={14} /> Ton profil</span>
                <h2 className="font-heading text-3xl md:text-4xl text-navy mt-4">
                  {profil === "idee" ? "Ton idée est bonne : reste à la rendre concrète." : profil === "reconversion" ? "Se reconvertir est un projet, pas un coup de tête. Le tien est déjà en marche." : "Ton profil est clair, la suite t'appartient."}
                </h2>
                <div className="bg-white rounded-2xl border border-navy/10 p-6 mt-6">
                  <div className="font-body text-sm text-navy/70">Secteur visé : <strong className="text-navy">{SECTEUR_LABELS[secteurChoisi]}</strong></div>
                  {planB && <div className="font-body text-sm text-navy/70 mt-1">Plan B : <strong className="text-navy">{SECTEUR_LABELS[planB]}</strong></div>}
                  {profil === "idee" && (
                    <div className="font-body text-sm text-navy/70 mt-4 whitespace-pre-line leading-relaxed">
                      <strong className="text-navy">Ta feuille de route :</strong>{"\n"}{mapEtapesIdee[niveau]}
                    </div>
                  )}
                </div>
                <p className="font-body text-xs text-navy/50 mt-4">
                  Pour aller plus loin : <a href="https://www.onisep.fr" target="_blank" rel="noopener noreferrer" className="underline">onisep.fr</a> et <a href="https://www.apec.fr" target="_blank" rel="noopener noreferrer" className="underline">apec.fr</a>.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/metiers" className="inline-flex items-center gap-2 bg-navy text-cream rounded-full px-8 py-4 font-body font-semibold">
                    Découvrir les métiers <ArrowRight size={16} />
                  </Link>
                  <button onClick={resetParcours} className="inline-flex items-center gap-2 border border-navy/20 text-navy rounded-full px-8 py-4 font-body font-semibold">
                    <RotateCcw size={14} /> Refaire
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
