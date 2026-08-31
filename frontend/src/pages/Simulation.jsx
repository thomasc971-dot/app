import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

// ============================================================
// PAGE /simulation — portage fidèle du tronc principal de la
// "Simulation carrière" : 6 points d'entrée selon l'âge, profil,
// filière/postbac, premier poste, négociation salariale, dilemme,
// bifurcation, bilan final chiffré avec historique de salaire.
//
// Simplification assumée : les branches très spécifiques (carrière
// militaire, entrepreneuriat précoce dès le postbac, expatriation
// intégrée au parcours) sont regroupées dans la bifurcation standard
// plutôt que dupliquées en sous-parcours dédiés — l'expatriation a
// de toute façon sa propre page (/ressources/expatriation).
// ============================================================

const SECTEUR_LABELS = {
  tech: "Tech", sante: "Santé", btp: "BTP", commerce: "Commerce", agriculture: "Agriculture",
  artisanat: "Artisanat", public: "Public", finance: "Finance", education: "Éducation",
  culture: "Culture", tourisme: "Tourisme", psychologie: "Psychologie",
};
const SECTEUR_ACTIVITE_MULT = { tech: 1.25, finance: 1.3, sante: 1.0, btp: 0.95, commerce: 0.9, agriculture: 0.8, artisanat: 0.85, public: 0.9, education: 0.85, culture: 0.9, tourisme: 0.85, psychologie: 0.95 };

const euros = (n) => Math.round(n).toLocaleString("fr-FR") + " €";

const ENTRY_OPTIONS = [
  { v: "11-13", l: "🧒 Entre 11 et 13 ans, collège", sub: "tout est encore possible" },
  { v: "14-16", l: "🎒 Entre 14 et 16 ans, fin de collège et lycée", sub: "les choix sérieux commencent" },
  { v: "17-19", l: "🎓 Entre 17 et 19 ans, post-bac", sub: "le grand saut vers le supérieur" },
  { v: "20-27", l: "👔 Entre 20 et 27 ans, jeune actif", sub: "premier poste, premiers doutes" },
  { v: "28-45", l: "💼 Entre 28 et 45 ans, tournant de carrière", sub: "tout recommencer, ou presque" },
  { v: "46-60", l: "🔄 Entre 46 et 60 ans, cap vers la fin de carrière", sub: "une réalité trop souvent ignorée" },
];

function buildPath(entry) {
  const full = ["profil", "secteur", "filiere", "postbac", "poste", "dilemme", "bifurcation", "mobilite", "fin"];
  if (entry === "11-13" || entry === "14-16") return full;
  if (entry === "17-19") return ["profil", "secteur", "postbac", "poste", "dilemme", "bifurcation", "mobilite", "fin"];
  if (entry === "20-27") return ["profil", "secteur", "poste", "dilemme", "bifurcation", "mobilite", "fin"];
  if (entry === "28-45") return ["profil", "secteur", "bifurcation", "mobilite", "fin"];
  if (entry === "46-60") return ["profil", "secteur", "senior", "bifurcation", "mobilite", "fin"];
  return full;
}

const FILIERES = {
  general: { label: "Voie générale", options: [
    { l: "Maths + Physique-Chimie (profil scientifique)", v: "scientifique", info: "Voie royale vers la prépa scientifique, le parcours santé ou les écoles d'ingénieurs, mais pas la seule." },
    { l: "Maths + SES (profil économie-gestion)", v: "eco", info: "Voie classique vers la prépa ECG (économique et commerciale) ou la fac d'économie-gestion." },
    { l: "SVT + Physique-Chimie (profil santé / bio)", v: "bio", info: "Profil apprécié pour les études de santé (PASS/LAS) et les licences de sciences de la vie." },
    { l: "HGGSP + Langues (profil sciences humaines)", v: "shs", info: "Ouvre vers Sciences Po, le droit, les lettres ou les écoles de communication." },
  ]},
  techno: { label: "Voie technologique", options: [
    { l: "STMG (management et gestion)", v: "STMG", info: "La moitié des gens qui te regardent de haut avec leur bac général vont te croiser en école de commerce dans 4 ans, en alternance, pendant que toi tu seras payé pour y être." },
    { l: "STI2D (industrie et développement durable)", v: "STI2D", info: "Filière solide vers les BUT industriels et les écoles d'ingénieurs par admission parallèle." },
    { l: "ST2S (santé et social)", v: "ST2S", info: "Tremplin naturel vers les métiers du social et du paramédical (BUT carrières sociales, IFSI infirmier)." },
  ]},
  pro: { label: "Voie professionnelle", options: [
    { l: "Commerce / Vente", v: "commerce", info: "L'insertion directe après un bac pro reste possible, mais le BTS en alternance ouvre aussi des portes vers des écoles supérieures que peu de gens envisagent." },
    { l: "Industriel (maintenance, électrotechnique...)", v: "industriel", info: "Les métiers techniques recrutent activement ; un BTS ou une licence pro en alternance valorise vite ce profil." },
    { l: "ASSP (accompagnement, soins et services)", v: "ASSP", info: "Débouché naturel vers les métiers du soin (aide-soignant, auxiliaire de vie) avec de vraies perspectives d'évolution." },
  ]},
};

const POSTBAC_OPTIONS = [
  { v: "prepa", l: "🎯 Prépa ECG (2 ans avant intégration d'une grande école)", info: "La prépa publique coûte souvent moins de 1000 €/an de frais réels, contre 8000 à 15000 €/an dans la plupart des écoles de commerce post-bac.", base: 32 },
  { v: "ecole", l: "🏫 École de commerce post-bac", info: "L'admission directe évite le concours mais le coût de scolarité tourne généralement entre 8000 et 13000 €/an. Bourses cumulables et méconnues.", base: 34 },
  { v: "fac", l: "📖 Fac, licence économie gestion", info: "La fac coûte environ 170 à 260 €/an de frais d'inscription et laisse le temps de changer d'avis. Passerelles vers les écoles possibles.", base: 28 },
  { v: "sante", l: "🩺 Santé → PASS/LAS", info: "Le parcours santé est sélectif et exigeant dès la première année, mais reste au tarif universitaire classique.", base: 32 },
  { v: "but", l: "🧪 BUT Chimie (bac+3 professionnalisant)", info: "Un BUT chimie coûte environ 170 à 260 €/an de frais d'inscription et ouvre directement sur l'industrie ou la poursuite en école d'ingénieur.", base: 30 },
];

const CONTRAT_OPTIONS = [
  { v: "stage", l: "📄 Stage", base: 6 },
  { v: "alternance", l: "🔁 Alternance", base: 15 },
  { v: "cdi", l: "📝 CDI direct", base: 30 },
];

const DILEMME_SCENARIOS = [
  {
    titre: "Ton manager te demande de présenter des chiffres légèrement embellis à un client important, \"pour débloquer le contrat\".",
    optA: "Tu t'exécutes, le contrat est signé", conseqVend: "Le contrat est signé, ton équipe encaisse une belle prime trimestrielle. Personne ne pose de questions cette fois.",
    optB: "Tu refuses et proposes les vrais chiffres", conseqRefuse: "Le client hésite davantage, mais respecte ta transparence. Le contrat se signe quand même, un peu plus tard, sur des bases saines.",
  },
];

const BIFURCATION_OPTIONS = {
  senior: [
    { v: "evolution", l: "📈 Viser une dernière évolution avant de lever le pied" },
    { v: "specialisation", l: "🎓 Devenir référent·e ou mentor sur ton expertise" },
    { v: "entrepreneuriat", l: "🚀 Te lancer à ton compte sur ton domaine d'expertise" },
    { v: "stable", l: "😌 Ne rien changer, stabiliser jusqu'à la retraite" },
  ],
  standard: [
    { v: "evolution", l: "📈 Continuer ta trajectoire, viser une évolution naturelle" },
    { v: "specialisation", l: "🎯 Te spécialiser dans un domaine pointu" },
    { v: "reconversion", l: "🔄 Te reconvertir vers un nouveau métier, toujours salarié" },
    { v: "entrepreneuriat", l: "🚀 Quitter le salariat pour te lancer en tant qu'entrepreneur·e" },
    { v: "stable", l: "😌 Ne rien changer, tu es bien là où tu es" },
  ],
};

function computeBadge(salaireHistory) {
  if (!salaireHistory.length) return "Explorateur·rice";
  const positifs = salaireHistory.filter((h) => h.delta > 0).length;
  if (positifs >= 4) return "Ambitieux·se";
  if (positifs >= 2) return "Stratège";
  return "Prudent·e";
}

function StepCard({ eyebrow, title, children, choices, onBack, choicesCols = 1 }) {
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
        <div className={`grid grid-cols-1 ${choicesCols === 2 ? "sm:grid-cols-2" : ""} gap-3 mt-8`}>
          {choices.map((c) => (
            <button key={c.label} onClick={c.onClick}
              className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all">
              {c.label}
              {c.sub && <div className="text-xs text-navy/50 mt-1">{c.sub}</div>}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function SalaireBar({ montant, delta }) {
  return (
    <div className="bg-navy text-cream rounded-2xl p-5 mt-6 flex items-center justify-between">
      <div>
        <div className="font-body text-xs uppercase tracking-widest text-cream/50">Salaire estimé</div>
        <div className="font-heading text-3xl mt-1">{euros(montant)}<span className="text-sm text-cream/50">/an</span></div>
      </div>
      {delta != null && (
        <div className={`flex items-center gap-1 font-body text-sm font-semibold ${delta >= 0 ? "text-teal-300" : "text-brick-soft"}`}>
          {delta >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {delta > 0 ? "+" : ""}{delta}%
        </div>
      )}
    </div>
  );
}

export default function Simulation() {
  const [path, setPath] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [entry, setEntry] = useState(null);
  const [secteursActivite, setSecteursActivite] = useState([]);
  const [filiereGroupe, setFiliereGroupe] = useState(null);
  const [filiereDetail, setFiliereDetail] = useState(null);
  const [postBac, setPostBac] = useState(null);
  const [contrat, setContrat] = useState(null);
  const [salaire, setSalaire] = useState(null);
  const [salaireHistory, setSalaireHistory] = useState([]);
  const [dilemme, setDilemme] = useState(null);
  const [bifurcation, setBifurcation] = useState(null);
  const [seniorChoice, setSeniorChoice] = useState(null);
  const [mobilite, setMobilite] = useState(null);
  const [sousEcran, setSousEcran] = useState(null);

  const currentStep = path[stepIdx];

  const goNext = () => setStepIdx((i) => i + 1);
  const goStep = (name) => { setStepIdx(path.indexOf(name)); setSousEcran(null); };

  const applyDelta = (pct, label) => {
    setSalaire((s) => {
      if (s == null) return s;
      const next = Math.max(1000, Math.round(s * (1 + pct / 100)));
      setSalaireHistory((h) => [...h, { label, salaire: next, delta: pct }]);
      return next;
    });
  };

  const startEntry = (v) => { setEntry(v); setPath(buildPath(v)); setStepIdx(0); setSousEcran("profilDiscipline"); };

  const resetParcours = () => {
    setPath([]); setStepIdx(0); setEntry(null);
    setSecteursActivite([]); setFiliereGroupe(null); setFiliereDetail(null); setPostBac(null);
    setContrat(null); setSalaire(null); setSalaireHistory([]); setDilemme(null); setBifurcation(null);
    setSeniorChoice(null); setMobilite(null); setSousEcran(null);
  };

  if (!entry) {
    return (
      <div data-testid="simulation-page" className="pb-24 pt-8">
        <div className="container-md max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Simulation carrière</span>
            <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4 leading-tight">À quel moment de ta vie veux-tu commencer ton histoire ?</h1>
            <p className="font-body text-navy/70 mt-4">Chaque point de départ ouvre une trajectoire différente. Choisis celui qui te ressemble.</p>
            <div className="bg-brick/5 border border-brick/15 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/70">
              💡 Ce parcours est une simulation simplifiée, pas une prédiction. Une vraie carrière se construit pas à pas, avec ses propres surprises.
            </div>
            <div className="grid grid-cols-1 gap-3 mt-8">
              {ENTRY_OPTIONS.map((o) => (
                <button key={o.v} onClick={() => startEntry(o.v)} data-testid={`sim-entry-${o.v}`}
                  className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all">
                  {o.l}
                  <div className="text-xs text-navy/50 mt-1">{o.sub}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="simulation-jeu-page" className="pb-24 pt-8">
      <div className="container-md max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep + (sousEcran || "") + stepIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>

            {currentStep === "profil" && sousEcran === "profilDiscipline" && (
              <StepCard eyebrow="Étape 0 → Ton point de départ" title="Et niveau caractère, t'es plutôt du genre..." onBack={resetParcours}
                choices={[
                  { label: "💪 Tu bosses dur même sur un sujet qui t'ennuie", onClick: () => setSousEcran("profilAptitude") },
                  { label: "😌 Tu fais le strict minimum si ça t'intéresse pas", onClick: () => setSousEcran("profilAptitude") },
                ]} />
            )}
            {currentStep === "profil" && sousEcran === "profilAptitude" && (
              <StepCard eyebrow="Étape 0 → Fin" title="Dernier trait avant de commencer." onBack={() => setSousEcran("profilDiscipline")}
                choices={[
                  { label: "✨ Les choses te viennent facilement", onClick: () => { goNext(); setSousEcran(null); } },
                  { label: "🐢 Faut que tu rames deux fois plus que les autres", onClick: () => { goNext(); setSousEcran(null); } },
                ]}>
                <p className="font-body text-navy/70 mt-4">Et côté facilité d'apprentissage ?</p>
              </StepCard>
            )}

            {currentStep === "secteur" && (
              <StepCard eyebrow="Étape → Tes secteurs" title="Quel(s) secteur(s) t'attire(nt) le plus ?" onBack={() => goStep("profil")}
                choices={Object.keys(SECTEUR_LABELS).map((k) => ({
                  label: (secteursActivite.includes(k) ? "✓ " : "") + SECTEUR_LABELS[k],
                  onClick: () => setSecteursActivite((s) => s.includes(k) ? s.filter((x) => x !== k) : [...s, k].slice(-3)),
                }))}
                choicesCols={2}>
                <p className="font-body text-navy/70 mt-4">Choisis jusqu'à 3 secteurs qui t'intéressent.</p>
                {secteursActivite.length > 0 && (
                  <button onClick={goNext} className="mt-6 inline-flex items-center gap-2 bg-navy text-cream rounded-full px-6 py-3 font-body font-semibold text-sm">
                    Continuer <ArrowRight size={14} />
                  </button>
                )}
              </StepCard>
            )}

            {currentStep === "filiere" && !filiereGroupe && (
              <StepCard eyebrow="Étape 1 → Le lycée" title="Au lycée, tu choisis quelle voie ?" onBack={() => goStep("secteur")}
                choices={Object.entries(FILIERES).map(([k, f]) => ({ label: f.label, onClick: () => setFiliereGroupe(k) }))} />
            )}
            {currentStep === "filiere" && filiereGroupe && !filiereDetail && (
              <StepCard eyebrow="Étape 1 → Précision" title="Dans cette voie, tu choisis plutôt..." onBack={() => setFiliereGroupe(null)}
                choices={FILIERES[filiereGroupe].options.map((o) => ({ label: o.l, onClick: () => setFiliereDetail(o.v) }))}>
                <p className="font-body text-navy/70 mt-4">Depuis la réforme du bac, les filières fonctionnent par spécialités.</p>
              </StepCard>
            )}
            {currentStep === "filiere" && filiereDetail && (() => {
              const opt = FILIERES[filiereGroupe].options.find((o) => o.v === filiereDetail);
              return (
                <StepCard eyebrow="Étape 1 → Suite" title="Ce que peu de monde te dira à voix haute." onBack={() => setFiliereDetail(null)}
                  choices={[{ label: "Continuer →", onClick: goNext }]}>
                  <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80">{opt.info}</div>
                  <div className="bg-brick/5 border border-brick/15 rounded-xl px-4 py-3 mt-3 font-body text-sm text-navy/70">
                    Environ 95% des bacheliers généraux poursuivent des études supérieures, contre environ 80% des bacheliers technologiques et 50% des bacheliers professionnels (ordre de grandeur, source Depp).
                  </div>
                </StepCard>
              );
            })()}

            {currentStep === "postbac" && !postBac && (
              <StepCard eyebrow="Étape 2 → Après le bac" title="Le bac est en poche. Il est temps de choisir ta direction." onBack={() => goStep(path[path.indexOf("postbac") - 1])}
                choices={POSTBAC_OPTIONS.map((o) => ({ label: o.l, onClick: () => setPostBac(o.v) }))} />
            )}
            {currentStep === "postbac" && postBac && (() => {
              const opt = POSTBAC_OPTIONS.find((o) => o.v === postBac);
              return (
                <StepCard eyebrow="Étape 2 → Suite" title="L'info que ton entourage ne t'a peut-être jamais donnée." onBack={() => setPostBac(null)}
                  choices={[{ label: "Continuer →", onClick: () => { setSalaire(opt.base * 1000); goNext(); } }]}>
                  <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80">{opt.info}</div>
                </StepCard>
              );
            })()}

            {currentStep === "poste" && !contrat && (
              <StepCard eyebrow="Étape 3 → Le premier poste" title="Diplôme en poche. Premier vrai poste. La théorie s'arrête ici." onBack={() => goStep(path[path.indexOf("poste") - 1])}
                choices={CONTRAT_OPTIONS.map((o) => ({
                  label: o.l,
                  onClick: () => {
                    setContrat(o.v);
                    const mult = secteursActivite.length ? Math.max(...secteursActivite.map((s) => SECTEUR_ACTIVITE_MULT[s] || 1)) : 1;
                    setSalaire(Math.round(o.base * 1000 * mult));
                  },
                }))} />
            )}
            {currentStep === "poste" && contrat && (
              <StepCard eyebrow="Étape 3 → Suite" title="Premier poste confirmé." onBack={() => setContrat(null)}
                choices={[{ label: "Continuer →", onClick: goNext }]}>
                <p className="font-body text-navy/70 mt-4">
                  {contrat === "alternance"
                    ? "L'alternance reste la voie la plus solide pour sécuriser un premier emploi en France, avec un taux d'embauche à l'issue du contrat nettement supérieur à celui d'un stage classique."
                    : "Chaque type de contrat ouvre des portes différentes, aucun n'est un mauvais choix en soi."}
                </p>
                <SalaireBar montant={salaire} />
              </StepCard>
            )}

            {currentStep === "senior" && !seniorChoice && (
              <StepCard eyebrow="Étape spéciale → Cap sur la fin de carrière" title="50 ans passés. Le marché du travail n'est plus aussi tendre avec toi qu'à 25 ans." onBack={() => goStep("secteur")}
                choices={[
                  { v: "recherche", label: "🔎 Tu relances une recherche active, malgré la discrimination liée à l'âge" },
                  { v: "consulting", label: "🧑‍💼 Tu te mets à ton compte en consulting sur ton expertise" },
                  { v: "formation", label: "📚 Tu te reformes avec ton CPF pour rebondir sur un métier en tension" },
                  { v: "rupture", label: "🤝 Tu négocies une rupture conventionnelle et anticipes ta retraite" },
                ].map((o) => ({ label: o.label, onClick: () => setSeniorChoice(o.v) }))}>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/70">
                  Le taux de chômage des 50-64 ans reste globalement inférieur à la moyenne nationale, mais la durée moyenne de recherche d'un nouvel emploi après une perte de poste passé 50 ans est nettement plus longue que pour les plus jeunes.
                </div>
              </StepCard>
            )}
            {currentStep === "senior" && seniorChoice && (() => {
              const map = {
                recherche: "Les candidatures s'enchaînent, certaines sans retour. Tu finis par retrouver un poste, mais après une recherche plus longue que prévu.",
                consulting: "Ton carnet d'adresses accumulé pendant ta carrière devient ton meilleur atout. Les débuts sont incertains, mais un ancien contact te fait confiance en premier.",
                formation: "Se reconvertir à cet âge demande de l'humilité, mais les métiers en tension recrutent volontiers des profils expérimentés et fiables.",
                rupture: "Tu négocies un accord correct avec ton employeur. Cette étape sécurise ta transition vers la retraite sans rupture brutale de revenus.",
              };
              return (
                <StepCard eyebrow="Étape spéciale → Suite" title={map[seniorChoice]} onBack={() => setSeniorChoice(null)}
                  choices={[{ label: "Continuer →", onClick: () => { setSalaire(30000); goNext(); } }]}>
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/70">
                    Après 45 ans, des dispositifs existent (conseil en évolution professionnelle gratuit, CPF de transition, aides de France Travail dédiées aux seniors) mais restent largement sous-utilisés faute d'information.
                  </div>
                </StepCard>
              );
            })()}

            {currentStep === "dilemme" && !dilemme && (
              <StepCard eyebrow="Étape 4 → Le dilemme" title={DILEMME_SCENARIOS[0].titre} onBack={() => goStep("poste")}
                choices={[
                  { label: DILEMME_SCENARIOS[0].optA, onClick: () => { setDilemme("vend"); applyDelta(4, "Résultats à court terme"); } },
                  { label: DILEMME_SCENARIOS[0].optB, onClick: () => { setDilemme("refuse"); applyDelta(-1, "Intégrité, effet différé"); } },
                ]} />
            )}
            {currentStep === "dilemme" && dilemme && (
              <StepCard eyebrow="Étape 4 → Conséquence" title={dilemme === "vend" ? DILEMME_SCENARIOS[0].conseqVend : DILEMME_SCENARIOS[0].conseqRefuse}
                onBack={() => setDilemme(null)}
                choices={[{ label: "Continuer →", onClick: goNext }]}>
                <div className="bg-navy/5 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/80">
                  Dans la vraie vie, la réputation professionnelle se construit sur plusieurs années et pèse souvent plus lourd qu'un bon trimestre isolé.
                </div>
                <SalaireBar montant={salaire} delta={dilemme === "vend" ? 4 : -1} />
              </StepCard>
            )}

            {currentStep === "bifurcation" && !bifurcation && (
              <StepCard eyebrow="Étape 5 → Bifurcation"
                title={entry === "46-60" ? "Il te reste quelques années à travailler. Comment veux-tu les aborder ?" : entry === "28-45" ? "Tu as décidé de tout reprendre à zéro, ou presque. Nouveau chapitre." : "Quelques années dans le poste. Le temps de faire un vrai choix de direction."}
                onBack={() => goStep(entry === "28-45" || entry === "46-60" ? "secteur" : "dilemme")}
                choices={(entry === "46-60" ? BIFURCATION_OPTIONS.senior : BIFURCATION_OPTIONS.standard).map((o) => ({
                  label: o.l, onClick: () => { setBifurcation(o.v); const delta = o.v === "evolution" ? 15 : o.v === "specialisation" ? 10 : o.v === "entrepreneuriat" ? -5 : o.v === "reconversion" ? -8 : 2; applyDelta(delta, "Bifurcation : " + o.v); },
                }))} />
            )}
            {currentStep === "bifurcation" && bifurcation && (
              <StepCard eyebrow="Étape 5 → Résultat" title="Ta décision est prise, la suite s'écrit à partir de là." onBack={() => setBifurcation(null)}
                choices={[{ label: "Continuer →", onClick: goNext }]}>
                <SalaireBar montant={salaire} />
              </StepCard>
            )}

            {currentStep === "mobilite" && !mobilite && (
              <StepCard eyebrow="Étape 6 → La mobilité" title="Et question mobilité géographique, tu envisages quoi ?" onBack={() => goStep("bifurcation")}
                choices={[
                  { label: "🗺️ Rester en France, éventuellement changer de ville", onClick: () => setMobilite("france") },
                  { label: "🌍 Tenter ta chance à l'étranger", onClick: () => setMobilite("etranger") },
                  { label: "🏠 Ne rien changer, rester où tu es", onClick: () => setMobilite("stable") },
                ]} />
            )}
            {currentStep === "mobilite" && mobilite && (
              <StepCard eyebrow="Étape 6 → Suite" title={mobilite === "france" ? "Tu choisis de rester ancré·e en France, avec peut-être un nouveau terrain." : mobilite === "etranger" ? "Tu tentes ta chance ailleurs." : "Tu choisis la stabilité géographique."}
                onBack={() => setMobilite(null)}
                choices={[{ label: "Voir mon bilan final →", onClick: goNext }]}>
                {mobilite === "etranger" && (
                  <div className="bg-cream border border-navy/10 rounded-xl px-4 py-3 mt-4 font-body text-sm text-navy/70">
                    Pour préparer un vrai départ, consulte notre page dédiée :{" "}
                    <Link to="/ressources/expatriation" className="text-navy underline font-semibold">Partir à l'étranger</Link>.
                  </div>
                )}
              </StepCard>
            )}

            {currentStep === "fin" && (() => {
              const badge = computeBadge(salaireHistory);
              return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-brick flex items-center gap-2"><Sparkles size={14} /> Fin de partie</span>
                  <div className="inline-block mt-4 bg-brick text-cream rounded-full px-4 py-1.5 font-body text-sm font-semibold">{badge}</div>
                  <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4 leading-tight">Voici la carrière que tu as vécue.</h1>

                  {salaire != null && (
                    <div className="bg-navy text-cream rounded-2xl p-6 mt-6">
                      <div className="font-body text-xs uppercase tracking-widest text-cream/50">Salaire final estimé</div>
                      <div className="font-heading text-4xl mt-1">{euros(salaire)}<span className="text-base text-cream/50">/an</span></div>
                      {salaireHistory.length > 0 && (
                        <div className="mt-4 space-y-1.5">
                          {salaireHistory.map((h, i) => (
                            <div key={i} className="flex justify-between font-body text-xs text-cream/70">
                              <span>{h.label}</span>
                              <span className={h.delta >= 0 ? "text-teal-300" : "text-brick-soft"}>{h.delta > 0 ? "+" : ""}{h.delta}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-white rounded-2xl border border-navy/10 p-6 mt-6">
                    <div className="font-body text-xs uppercase tracking-widest text-navy/50">Ton parcours</div>
                    <div className="font-body text-sm text-navy/80 mt-2 space-y-1">
                      {secteursActivite.length > 0 && <div>Secteurs explorés : <strong className="text-navy">{secteursActivite.map((s) => SECTEUR_LABELS[s]).join(", ")}</strong></div>}
                      {bifurcation && <div>Bifurcation : <strong className="text-navy">{(entry === "46-60" ? BIFURCATION_OPTIONS.senior : BIFURCATION_OPTIONS.standard).find((o) => o.v === bifurcation)?.l}</strong></div>}
                    </div>
                  </div>

                  <p className="font-body text-xs text-navy/50 mt-4">
                    Ordres de grandeur indicatifs, pas une prédiction. Pour aller plus loin :{" "}
                    <a href="https://www.onisep.fr" target="_blank" rel="noopener noreferrer" className="underline">onisep.fr</a> et{" "}
                    <a href="https://www.apec.fr" target="_blank" rel="noopener noreferrer" className="underline">apec.fr</a>.
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
              );
            })()}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
