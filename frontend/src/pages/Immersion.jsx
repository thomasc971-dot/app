import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

// ============================================================
// PAGE /immersion — portage fidèle du parcours "Immersion pro"
// (jeu narratif à 7 étapes, panneau entreprise, badges de fin,
// suggestion de secteur). Remplace l'ancienne version placeholder.
// ============================================================

// --- Données entreprise : un seul secteur complet pour l'instant (tech).
// Les autres secteurs affichent "bientôt disponible" tant qu'ils n'ont
// pas leur propre entrée ici, exactement comme dans la version originale.
const ENTREPRISES_DEFI = {
  tech: {
    nom: "Nordis",
    secteur: "Édition de logiciels",
    effectif: "≈ 180 salariés en France",
    salaireDebutant: "34 à 42 k€/an brut selon le poste (grille indicative)",
    evolutionMoyenne: "≈ +6%/an de progression salariale moyenne les 5 premières années",
    interessement: "Intéressement collectif indexé sur la performance : en moyenne l'équivalent de 0,5 à 2 mois de salaire brut/an ces 3 dernières années",
    participation: "Participation légale (obligatoire au-delà de 50 salariés), reversée automatiquement sur le Plan d'Épargne Entreprise si non réclamée",
    avantages: ["Mutuelle prise en charge à 80%", "RTT (≈ 12 jours/an)", "3 jours de télétravail/semaine", "Enveloppe formation individuelle de 4 000 €/an", "Titres-restaurant"],
    postesRecherches: [
      "Développeur·se full stack", "Ingénieur·e DevOps", "Product manager junior", "Data analyst",
      "Développeur·se front-end", "Ingénieur·e QA / testeur·se", "Chef·fe de projet technique",
      "Support technique niveau 2", "UX designer", "Autre poste tech",
    ],
    lienCandidature: "https://www.welcometothejungle.com/fr",
    mentorNom: "Amélie",
    mentorRole: "développeuse senior",
    managerNom: "Karim",
    managerRole: "lead produit",
  },
};

const SECTEUR_LABELS_IMMERSION = {
  tech: "Tech", sante: "Santé", btp: "BTP", commerce: "Commerce", agriculture: "Agriculture",
  artisanat: "Artisanat", public: "Public", finance: "Finance", education: "Éducation",
  culture: "Culture", tourisme: "Tourisme", psychologie: "Psychologie",
};

const DEFI_ALEAS_POSITIFS = {
  tech: [
    "Le canal Slack #vendredi-brainstorm s'anime d'un débat sans fin sur le meilleur éditeur de code, qui finit en pari amical.",
    "Amélie te propose de co-animer un lightning talk interne sur un outil que tu as découvert récemment.",
    "L'équipe décroche le badge interne de la release la plus fluide du trimestre, fêtée avec des pâtisseries au bureau.",
    "La direction annonce l'ouverture d'un jour de télétravail supplémentaire par semaine pour toute l'équipe produit.",
  ],
};

// Construit les 7 étapes du parcours pour un secteur donné (poste choisi injecté dynamiquement)
function getDefiSteps(secteur, poste) {
  const f = ENTREPRISES_DEFI[secteur];
  if (!f || secteur !== "tech") return [];
  const aleaTech = DEFI_ALEAS_POSITIFS.tech[Math.floor(Math.random() * DEFI_ALEAS_POSITIFS.tech.length)];
  return [
    {
      eyebrow: "Immersion → Étape 1 : Intégration",
      title: `Premier jour chez ${f.nom}, en tant que ${poste || "nouvel arrivant"}.`,
      body: `${f.mentorNom} t'attend à l'accueil avec un café et un post-it où elle a griffonné ton prénom, collé de travers sur ton futur écran. Premier couac de la journée : ton badge ne fonctionne pas, il faut sonner trois fois avant qu'on vienne t'ouvrir.`,
      info: `${f.mentorNom} sera ta référente pendant les 3 premiers mois. Chaque nouvel arrivant chez ${f.nom} bénéficie d'un parcours d'intégration structuré, pensé pour prendre ses marques sereinement.`,
      choices: [
        { label: `Tu poses toutes tes questions à ${f.mentorNom}, même les plus bêtes`, result: `Bien t'en a pris : ${f.mentorNom} rit en te disant qu'elle a posé les mêmes il y a 3 ans. Tu comprends vite les usages internes et gagnes un temps précieux.` },
        { label: "Tu préfères observer avant de te lancer", result: `Approche plus discrète : tu prends tes marques progressivement, à ton rythme, pendant qu'${f.mentorNom} garde un œil bienveillant sur toi de loin.` },
      ],
    },
    {
      eyebrow: "Immersion → Étape 2 : Le CSE",
      title: "Ton premier vrai projet démarre, et tu découvres le CSE au passage.",
      body: `Grâce au CSE de ${f.nom}, tu as accès à des chèques vacances, des tarifs réduits sur les loisirs, et une subvention sport ou culture chaque année. ${f.mentorNom} t'avoue qu'elle a mis 8 mois avant de découvrir qu'elle pouvait rembourser sa salle d'escalade avec.`,
      info: "Le CSE existe dans toute entreprise de plus de 11 salariés : c'est un droit, pas une faveur, mais peu de jeunes actifs savent tout ce qu'il propose concrètement.",
      choices: [
        { label: "Tu explores tout de suite les avantages proposés", result: "Tu débloques rapidement ton premier chèque vacances : petite victoire du quotidien qui fait sourire même après une journée de bugs." },
        { label: "Tu remets ça à plus tard, trop pris par le projet en cours", result: "Tu te concentres sur ton projet, tu regarderas les avantages CSE une autre fois. Le post-it reste collé sur ton écran pour te le rappeler." },
      ],
    },
    {
      eyebrow: "Immersion → Étape 3 : Se former",
      title: `${f.managerNom} passe à ton bureau avec une bonne nouvelle.`,
      body: `${f.nom} t'ouvre une enveloppe individuelle de 4 000 € par an pour te former sur le sujet de ton choix. ${f.managerNom} te glisse qu'il a utilisé la sienne pour une certification cloud qui lui a ouvert des portes en interne.`,
      info: "Ce type d'enveloppe formation, quand il existe, est souvent sous-utilisé faute d'en connaître l'existence ou les démarches pour l'activer.",
      choices: [
        { label: "Tu choisis une formation en IA appliquée à ton métier", result: "Tu montes en compétence sur un sujet d'avenir, directement utile dans ton quotidien. Amélie te demande déjà de lui montrer ce que tu as appris." },
        { label: "Tu choisis une formation en leadership et gestion d'équipe", result: `${f.managerNom} approuve d'un signe de tête : tu prépares en douceur une future prise de responsabilités.` },
        { label: "Tu choisis d'apprendre une langue pour évoluer à l'international", result: "Tu ouvres la porte à des missions ou une mobilité à l'étranger plus tard, un projet que tu gardais dans un coin de ta tête." },
      ],
    },
    {
      eyebrow: "Immersion → Étape 4 : Mobilité interne",
      title: "Une opportunité inattendue s'ouvre.",
      body: "L'équipe data recherche un profil comme le tien pour une mission de plusieurs mois, le temps de lancer un nouveau tableau de bord interne.",
      info: "La mobilité interne est un des leviers d'évolution les plus sous-estimés : elle permet de changer de poste sans changer d'employeur.",
      choices: [
        { label: "Tu tentes la mobilité interne", result: `Tu changes d'équipe sans changer d'entreprise, et tu élargis ton réseau interne. ${f.mentorNom} te manque un peu, mais vous continuez à déjeuner ensemble le mardi.` },
        { label: "Tu restes dans ton équipe actuelle", result: `Tu consolides ton expertise là où tu es, en pleine confiance avec ${f.mentorNom} et le reste de l'équipe.` },
      ],
    },
    {
      eyebrow: "Immersion → Étape 5 : Un imprévu du quotidien",
      title: "La vie de bureau continue, avec son lot de petits imprévus.",
      body: aleaTech,
      info: null,
      choices: [
        { label: "Tu participes activement", result: "Bonne ambiance garantie, et quelques nouveaux contacts en interne que tu recroiseras plus tard." },
        { label: "Tu restes en retrait cette fois", result: "Pas grave, il y aura d'autres occasions de t'impliquer. Tu retournes à ton clavier, tranquille." },
      ],
    },
    {
      eyebrow: "Immersion → Étape 6 : Évoluer",
      title: `Le bilan de mi-carrière chez ${f.nom} arrive, et ${f.managerNom} t'invite à en discuter.`,
      body: `${f.managerNom} te propose de candidater à un poste à responsabilité via le programme interne de détection des talents. « Tu as le profil, mais c'est ton choix », te dit-il en refermant la porte de la salle de réunion.`,
      info: "Beaucoup d'entreprises disposent de ce type de programme, mais elles communiquent rarement dessus de façon simple auprès des salariés.",
      choices: [
        { label: "Tu candidates pour évoluer vers un poste de manager", result: `Tu es retenu·e et prends la tête d'une petite équipe, avec un accompagnement managérial dédié. ${f.mentorNom} est la première à te féliciter.` },
        { label: "Tu préfères rester expert·e sur ton domaine", result: `Tu deviens la personne référente que toute l'équipe vient consulter sur ton sujet, sans encadrement d'équipe. ${f.managerNom} respecte totalement ce choix.` },
      ],
    },
    {
      eyebrow: "Immersion → Étape 7 : Sur la durée",
      title: "Plusieurs années après ton arrivée.",
      body: `${f.nom} propose à ses salariés un dispositif de participation et d'intéressement aux résultats, ainsi qu'un PEE. ${f.mentorNom}, devenue une amie autant qu'une collègue, te rappelle que c'est elle qui t'avait convaincu·e d'y penser dès ta première année.`,
      info: "Quand l'entreprise l'abonde, l'argent placé sur un PEE augmente sans effort d'épargne supplémentaire de ta part.",
      choices: [
        { label: "Tu places ton intéressement sur le PEE, abondé par l'entreprise", result: "Bonne pioche : l'abondement vient gonfler ton épargne sans effort supplémentaire de ta part." },
        { label: "Tu préfères percevoir la prime directement", result: "Tu profites immédiatement de cette prime, sans opter pour l'abondement, pour un projet personnel qui te tient à cœur." },
      ],
    },
  ];
}

function computeDefiBadge(choices) {
  const proactifRegex = /tout de suite|toutes tes questions|tentes|candidates|participes activement/i;
  const proactif = choices.filter((c) => proactifRegex.test(c)).length;
  const stable = choices.length - proactif;
  if (proactif >= 5) return "Pilier d'équipe";
  if (proactif >= 3) return "Sur la voie du management";
  if (stable >= 5) return "Expert·e discret·e";
  return "Électron libre";
}

const ETAPE_ICONES = ["👋", "🎁", "📚", "🔀", "⚡", "📈", "🏆"];

// --- Écrans du parcours, chacun comme sous-composant pour rester lisible ---

function ChoixSecteur({ onChoisirSecteur, autreSecteur, setAutreSecteur, onEnvoyerAutre, autreEnvoye }) {
  const [showAutreForm, setShowAutreForm] = useState(false);
  return (
    <>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Immersion pro</span>
      <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4 leading-tight">
        Dans quel univers veux-tu vivre l'immersion&nbsp;?
      </h1>
      <p className="font-body text-navy/70 mt-4 leading-relaxed">
        Chaque secteur te plonge dans une entreprise différente, avec ses propres codes, ses propres avantages, et une équipe qui t'accompagne du premier jour à la mi-carrière.
      </p>
      <div className="mt-4 bg-brick/5 border border-brick/15 rounded-xl px-4 py-3 font-body text-sm text-navy/70">
        💡 L'entreprise et les personnages de cette immersion sont fictifs, construits pour te donner un aperçu réaliste. Le vrai quotidien varie d'une entreprise à l'autre : à prendre comme un aperçu, pas une prédiction.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        {Object.entries(SECTEUR_LABELS_IMMERSION).map(([key, label]) => {
          const dispo = !!ENTREPRISES_DEFI[key];
          return (
            <button
              key={key}
              disabled={!dispo}
              onClick={() => dispo && onChoisirSecteur(key)}
              data-testid={`immersion-secteur-${key}`}
              className={`text-left rounded-2xl p-4 font-body border transition-all ${
                dispo
                  ? "bg-white border-navy/10 text-navy hover:border-navy hover:-translate-y-0.5 cursor-pointer"
                  : "bg-white/50 border-navy/5 text-navy/40 cursor-not-allowed"
              }`}
            >
              {label}{!dispo && " (bientôt disponible)"}
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {!showAutreForm ? (
          <button onClick={() => setShowAutreForm(true)} className="font-body text-sm text-navy/60 underline">
            + Autre secteur (dis-nous lequel)
          </button>
        ) : (
          <div className="mt-2 max-w-md">
            <input
              type="text"
              value={autreSecteur}
              onChange={(e) => setAutreSecteur(e.target.value)}
              maxLength={80}
              placeholder="Ex. hôtellerie, sport, aéronautique..."
              className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
            />
            {!autreEnvoye ? (
              <button
                onClick={onEnvoyerAutre}
                disabled={!autreSecteur.trim()}
                className="mt-2 w-full border border-navy/20 text-navy rounded-xl px-4 py-2.5 font-body text-sm font-semibold disabled:opacity-40"
              >
                Envoyer cette suggestion
              </button>
            ) : (
              <p className="mt-2 font-body text-sm text-teal-700">Merci, c'est noté&nbsp;! On en tient compte pour les prochains secteurs à développer.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function FicheEntreprise({ f, onVoirPostes }) {
  return (
    <>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Fiche entreprise</span>
      <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4">{f.nom}</h1>
      <p className="font-body text-navy/70 mt-4 leading-relaxed">
        Avant de vivre l'immersion, voici ce qui justifie concrètement pourquoi cette entreprise attire des talents, au-delà du seul salaire de base. Tu seras accompagné·e par {f.mentorNom}, {f.mentorRole}, et tu croiseras régulièrement {f.managerNom}, {f.managerRole}.
      </p>
      <div className="bg-white rounded-2xl border border-navy/10 p-6 mt-6 font-body text-sm text-navy/80 space-y-2 leading-relaxed">
        <div><strong className="text-navy">Secteur :</strong> {f.secteur}</div>
        <div><strong className="text-navy">Effectif :</strong> {f.effectif}</div>
        <div><strong className="text-navy">Rémunération d'entrée :</strong> {f.salaireDebutant}</div>
        <div><strong className="text-navy">Évolution salariale :</strong> {f.evolutionMoyenne}</div>
        <div><strong className="text-navy">Intéressement :</strong> {f.interessement}</div>
        <div><strong className="text-navy">Participation :</strong> {f.participation}</div>
        <div>
          <strong className="text-navy">Autres avantages :</strong>
          <ul className="mt-1 space-y-0.5">
            {f.avantages.map((a) => <li key={a}>• {a}</li>)}
          </ul>
        </div>
      </div>
      <p className="font-body text-xs text-navy/50 mt-4 leading-relaxed">
        {f.nom} est une entreprise fictive de démonstration ; les chiffres ci-dessus sont des ordres de grandeur inspirés de grilles réelles du secteur, pas des données officielles de cette entreprise.
      </p>
      <button onClick={onVoirPostes} className="mt-8 bg-navy text-cream rounded-full px-6 py-3.5 font-body font-semibold text-sm">
        Voir les postes recherchés →
      </button>
    </>
  );
}

function ChoixPoste({ f, onChoisirPoste }) {
  return (
    <>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Fiche entreprise → Ton poste</span>
      <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4">Sur quel poste te projettes-tu chez {f.nom}&nbsp;?</h1>
      <p className="font-body text-navy/70 mt-4">Voici les postes actuellement recherchés. Choisis celui qui te correspond, ou précise le tien si aucun ne colle.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        {f.postesRecherches.map((poste) => (
          <button
            key={poste}
            onClick={() => {
              if (poste.startsWith("Autre")) {
                const saisie = window.prompt("Précise l'intitulé du poste que tu vises :");
                onChoisirPoste(saisie || poste);
              } else {
                onChoisirPoste(poste);
              }
            }}
            className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all"
          >
            {poste}
          </button>
        ))}
      </div>
    </>
  );
}

function EtapeJeu({ step, onChoix }) {
  return (
    <>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">{step.eyebrow}</span>
      <h1 className="font-heading text-2xl md:text-3xl text-navy mt-4 leading-snug">{step.title}</h1>
      <p className="font-body text-navy/70 mt-4 leading-relaxed">{step.body}</p>
      {step.info && (
        <div className="mt-4 bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 font-body text-sm text-navy/70">
          {step.info}
        </div>
      )}
      <div className="flex flex-col gap-3 mt-8">
        {step.choices.map((choice) => (
          <button
            key={choice.label}
            onClick={() => onChoix(choice)}
            className="text-left bg-white border border-navy/10 rounded-2xl p-4 font-body text-navy hover:border-navy hover:-translate-y-0.5 transition-all"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </>
  );
}

function EtapeResultat({ resultText, onContinuer }) {
  return (
    <>
      <h1 className="font-heading text-2xl md:text-3xl text-navy leading-snug">{resultText}</h1>
      <button onClick={onContinuer} className="mt-8 bg-navy text-cream rounded-full px-6 py-3.5 font-body font-semibold text-sm">
        Continuer →
      </button>
    </>
  );
}

function ParcoursFin({ f, defiState, onRecommencer }) {
  const [openIdx, setOpenIdx] = useState(null);
  const badge = computeDefiBadge(defiState.choices);
  const steps = getDefiSteps(defiState.secteur, defiState.poste);

  return (
    <>
      <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Immersion terminée</span>
      <div className="inline-block mt-4 bg-brick text-cream rounded-full px-4 py-1.5 font-body text-sm font-semibold">
        {badge}
      </div>
      <h1 className="font-heading text-3xl md:text-4xl text-navy mt-4 leading-tight">
        Voici ton parcours chez {f.nom}.
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {defiState.log.map((resultat, i) => {
          const step = steps[i];
          const labelCourt = step ? step.eyebrow.split(":").pop().trim() : `Étape ${i + 1}`;
          return (
            <button
              key={i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className={`flex flex-col items-center gap-1 rounded-2xl p-4 border font-body text-xs text-center transition-all ${
                openIdx === i ? "bg-navy text-cream border-navy" : "bg-white text-navy border-navy/10"
              }`}
            >
              <span className="text-2xl">{ETAPE_ICONES[i] || "✨"}</span>
              <span>{labelCourt}</span>
            </button>
          );
        })}
      </div>
      {openIdx !== null && (
        <div className="mt-4 bg-white rounded-2xl border border-navy/10 p-5 font-body text-sm text-navy/80 leading-relaxed">
          {defiState.log[openIdx]}
        </div>
      )}
      <div className="mt-8 bg-cream border border-navy/10 rounded-2xl p-6 font-body italic text-navy/80">
        « Franchement, {defiState.choices.length ? "on a bien fait de te recruter" : "ça a été un plaisir de t'accompagner"}. »
        <div className="not-italic text-xs text-navy/50 mt-2">{f.mentorNom}, {f.mentorRole} chez {f.nom}</div>
      </div>
      <button
        onClick={() => window.print()}
        className="mt-6 w-full border border-navy/20 text-navy rounded-full px-6 py-3.5 font-body font-semibold text-sm"
      >
        Télécharger mon bilan en PDF
      </button>
      <p className="font-body text-sm text-navy/70 mt-4">Ce type de parcours te parle&nbsp;? Ce bouton mènerait vers les offres d'emploi de l'entreprise partenaire.</p>
      <a
        href={f.lienCandidature}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-center bg-navy text-cream rounded-full px-6 py-3.5 font-body font-semibold text-sm"
      >
        Voir des offres similaires →
      </a>
      <p className="font-body text-xs text-navy/45 mt-4">{f.nom} est une entreprise fictive de démonstration. Ce module est prévu pour être personnalisé avec une vraie entreprise partenaire.</p>
      <button onClick={onRecommencer} className="mt-4 font-body text-sm text-navy/60 underline">
        ← Choisir une nouvelle expérience
      </button>
    </>
  );
}

// --- Composant principal : machine à états du parcours ---

const ECRAN = {
  INTRO: "intro",
  SECTEUR: "secteur",
  FICHE: "fiche",
  POSTE: "poste",
  ETAPE: "etape",
  RESULTAT: "resultat",
  FIN: "fin",
};

export default function Immersion() {
  const [ecran, setEcran] = useState(ECRAN.INTRO);
  const [defiState, setDefiState] = useState({ stepIndex: 0, choices: [], log: [], secteur: null, poste: null });
  const [dernierResultat, setDernierResultat] = useState("");
  const [autreSecteur, setAutreSecteur] = useState("");
  const [autreEnvoye, setAutreEnvoye] = useState(false);

  const resetParcours = useCallback(() => {
    setDefiState({ stepIndex: 0, choices: [], log: [], secteur: null, poste: null });
    setEcran(ECRAN.SECTEUR);
  }, []);

  const handleChoisirSecteur = (secteur) => {
    setDefiState((s) => ({ ...s, secteur }));
    setEcran(ECRAN.FICHE);
  };

  const handleChoisirPoste = (poste) => {
    setDefiState((s) => ({ ...s, poste }));
    setEcran(ECRAN.ETAPE);
  };

  const handleChoix = (choice) => {
    setDefiState((s) => ({ ...s, choices: [...s.choices, choice.label], log: [...s.log, choice.result] }));
    setDernierResultat(choice.result);
    setEcran(ECRAN.RESULTAT);
  };

  const handleContinuerApresResultat = () => {
    const steps = getDefiSteps(defiState.secteur, defiState.poste);
    const nextIndex = defiState.stepIndex + 1;
    if (nextIndex >= steps.length) {
      setEcran(ECRAN.FIN);
    } else {
      setDefiState((s) => ({ ...s, stepIndex: nextIndex }));
      setEcran(ECRAN.ETAPE);
    }
  };

  const handleEnvoyerAutre = () => {
    if (!autreSecteur.trim()) return;
    // TODO intégration : persister la suggestion côté backend (équivalent de
    // window.storage.set('suggestion-secteur:...') dans l'original), pour que
    // l'équipe priorise les prochains secteurs Immersion à développer.
    setAutreEnvoye(true);
  };

  const f = defiState.secteur ? ENTREPRISES_DEFI[defiState.secteur] : null;
  const steps = defiState.secteur ? getDefiSteps(defiState.secteur, defiState.poste) : [];
  const currentStep = steps[defiState.stepIndex];

  const handleBack = () => {
    if (ecran === ECRAN.FICHE) setEcran(ECRAN.SECTEUR);
    else if (ecran === ECRAN.POSTE) setEcran(ECRAN.FICHE);
    else if (ecran === ECRAN.ETAPE) {
      if (defiState.stepIndex > 0) {
        setDefiState((s) => ({ ...s, stepIndex: s.stepIndex - 1 }));
      } else {
        setEcran(ECRAN.POSTE);
      }
    }
  };

  // --- Écran d'accueil (avant de lancer le parcours) ---
  if (ecran === ECRAN.INTRO) {
    return (
      <div data-testid="immersion-page" className="pb-24">
        <section className="pt-16 pb-12">
          <div className="container-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Immersion pro</span>
              <h1 className="font-heading text-5xl md:text-7xl text-navy mt-4 leading-[1.05]">
                Vis le quotidien d'une entreprise,<br />
                de l'<span className="fraunces-italic">intérieur</span>.
              </h1>
              <p className="font-body text-lg text-navy/70 mt-6 max-w-2xl leading-relaxed">
                Sept étapes pour découvrir ce qu'une entreprise offre réellement à ses salariés : CSE, formation,
                mobilité interne, participation. Du premier jour à la mi-carrière — avec de vraies offres d'emploi
                liées à la fin.
              </p>
              <button
                onClick={resetParcours}
                data-testid="immersion-start"
                className="mt-8 inline-flex items-center gap-2 bg-navy text-cream rounded-full px-7 py-4 font-body font-semibold text-sm hover:scale-105 transition-transform"
              >
                <Sparkles size={16} /> Lancer mon immersion
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // --- Écrans du parcours interactif ---
  return (
    <div data-testid="immersion-jeu-page" className="pb-24 pt-8">
      <div className="container-md max-w-2xl">
        {ecran !== ECRAN.SECTEUR && (
          <button onClick={handleBack} className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy mb-6">
            <ArrowLeft size={14} /> Retour
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={ecran + defiState.stepIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {ecran === ECRAN.SECTEUR && (
              <ChoixSecteur
                onChoisirSecteur={handleChoisirSecteur}
                autreSecteur={autreSecteur}
                setAutreSecteur={setAutreSecteur}
                onEnvoyerAutre={handleEnvoyerAutre}
                autreEnvoye={autreEnvoye}
              />
            )}
            {ecran === ECRAN.FICHE && f && (
              <FicheEntreprise f={f} onVoirPostes={() => setEcran(ECRAN.POSTE)} />
            )}
            {ecran === ECRAN.POSTE && f && (
              <ChoixPoste f={f} onChoisirPoste={handleChoisirPoste} />
            )}
            {ecran === ECRAN.ETAPE && currentStep && (
              <EtapeJeu step={currentStep} onChoix={handleChoix} />
            )}
            {ecran === ECRAN.RESULTAT && (
              <EtapeResultat resultText={dernierResultat} onContinuer={handleContinuerApresResultat} />
            )}
            {ecran === ECRAN.FIN && f && (
              <ParcoursFin f={f} defiState={defiState} onRecommencer={resetParcours} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
