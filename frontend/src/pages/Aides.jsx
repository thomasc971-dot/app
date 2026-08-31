import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";

// ============================================================
// PAGE /ressources/aides — portage fidèle du filtrage par profil
// (âge / statut / handicap) sur les 17 aides réelles de l'original.
// ============================================================

const AIDES_CATEGORIES = {
  nationales: { label: "Aides nationales", emoji: "🏛️", desc: "Les dispositifs les plus larges, accessibles quelle que soit ta région." },
  mobilite: { label: "Mobilité interne", emoji: "🚚", desc: "Pour changer de région ou de ville en France, pour un emploi, une formation ou une alternance." },
  outremer: { label: "Outre-mer", emoji: "🏝️", desc: "Pour se déplacer entre l'Outre-mer et la métropole, ou s'y installer pour un projet professionnel." },
  handicap: { label: "Situation de handicap", emoji: "♿", desc: "Que tu sois encore scolarisé·e ou déjà dans la vie active, des dispositifs existent pour adapter ton parcours et t'accompagner vers l'emploi. Le portail officiel Mon Parcours Handicap centralise l'essentiel." },
};

const AIDES_LISTE = [
  { cat: "nationales", nom: "APL (Aide Personnalisée au Logement)", organisme: "CAF / MSA", lien: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/les-aides-personnelles-au-logement",
    desc: "Aide au paiement du loyer, calculée selon tes revenus, ta situation familiale et le montant de ton loyer. Accessible dès qu'on a son propre logement, y compris en résidence étudiante ou en colocation.",
    ages: ["17-19", "20-27", "28-45"], statuts: ["etudiant", "alternant", "emploi", "recherche"] },
  { cat: "nationales", nom: "Mobili-Jeune", organisme: "Action Logement", lien: "https://www.actionlogement.fr/l-aide-mobili-jeune",
    desc: "Aide au paiement du loyer pour les alternants de moins de 30 ans (apprentissage ou professionnalisation), cumulable avec l'APL. Simple à demander en ligne avec ton contrat d'alternance.",
    ages: ["17-19", "20-27"], statuts: ["alternant"] },
  { cat: "nationales", nom: "Garantie Visale", organisme: "Action Logement", lien: "https://www.visale.fr",
    desc: "Caution locative gratuite garantie par l'État : utile quand tu n'as pas de garant familial pour signer un bail. De plus en plus reconnue par les propriétaires et agences.",
    ages: ["17-19", "20-27", "28-45"], statuts: ["etudiant", "alternant", "emploi", "recherche"] },
  { cat: "nationales", nom: "Bourses sur critères sociaux", organisme: "CROUS", lien: "https://www.messervices.etudiant.gouv.fr",
    desc: "Bourse versée aux étudiants selon les revenus du foyer familial, avec plusieurs échelons possibles. La demande se fait via le Dossier Social Étudiant, généralement entre janvier et mai pour la rentrée suivante.",
    ages: ["17-19", "20-27"], statuts: ["etudiant"] },
  { cat: "nationales", nom: "Aide au permis de conduire", organisme: "France Travail / Régions / CPF", lien: "https://mes-aides.francetravail.fr/mobilite/financer-vos-permis",
    desc: "Plusieurs dispositifs coexistent selon ta situation (demandeur d'emploi, apprenti, jeune en insertion) : renseigne-toi à la fois auprès de France Travail et de ta région, les conditions varient beaucoup d'un territoire à l'autre.",
    ages: ["17-19", "20-27"], statuts: ["alternant", "recherche"] },
  { cat: "mobilite", nom: "Aide Mobili-Pass", organisme: "Action Logement", lien: "https://www.actionlogement.fr/financement-mobilite",
    desc: "Aide financière au déménagement quand tu changes de région pour un nouvel emploi, une mutation ou les débuts d'un contrat d'alternance loin de chez toi.",
    ages: ["20-27", "28-45", "46-60"], statuts: ["alternant", "emploi"] },
  { cat: "mobilite", nom: "Aide à la mobilité géographique", organisme: "France Travail", lien: "https://www.francetravail.fr/candidat/vos-recherches/les-aides-financieres/recherche-demploi---laide-au-dep.html",
    desc: "Prise en charge partielle des frais de déplacement, d'hébergement et de repas quand tu dois te déplacer loin pour un entretien d'embauche, un concours ou une formation.",
    ages: ["20-27", "28-45", "46-60"], statuts: ["recherche"] },
  { cat: "mobilite", nom: "Aide au double logement", organisme: "Action Logement", lien: "https://www.actionlogement.fr/financement-mobilite",
    desc: "Utile pendant une période de transition où tu payes temporairement deux loyers (ancien logement et nouveau, le temps de finaliser un déménagement professionnel).",
    ages: ["20-27", "28-45", "46-60"], statuts: ["emploi"] },
  { cat: "outremer", nom: "Continuité territoriale", organisme: "LADOM", lien: "https://www.ladom.fr",
    desc: "Aide au financement du billet d'avion entre l'Outre-mer et la métropole, sous conditions de ressources. Concerne aussi bien les déplacements pour étudier que pour certaines démarches professionnelles.",
    ages: ["17-19", "20-27", "28-45"], statuts: ["etudiant", "alternant", "emploi", "recherche"] },
  { cat: "outremer", nom: "Passeport pour la mobilité des études", organisme: "LADOM", lien: "https://ladom.fr/vie-etudiante/pme/",
    desc: "Prise en charge d'une partie du transport pour un étudiant ultramarin qui part se former en métropole, quand la formation visée n'existe pas sur son territoire d'origine.",
    ages: ["17-19", "20-27"], statuts: ["etudiant"] },
  { cat: "outremer", nom: "Passeport pour la mobilité en stage professionnel", organisme: "LADOM", lien: "https://www.ladom.fr",
    desc: "Équivalent du dispositif ci-dessus, mais pour un stage ou une formation professionnelle plutôt qu'un cursus d'études classique.",
    ages: ["17-19", "20-27"], statuts: ["etudiant", "alternant"] },
  { cat: "outremer", nom: "Aide à la continuité funéraire et familiale", organisme: "LADOM", lien: "https://www.ladom.fr",
    desc: "Dispositif moins connu mais réel : une aide existe aussi pour des déplacements liés à des événements familiaux graves. À vérifier directement auprès de LADOM selon ta situation.",
    ages: ["17-19", "20-27", "28-45", "46-60"], statuts: ["etudiant", "alternant", "emploi", "recherche"] },
  { cat: "handicap", nom: "MDPH et RQTH", organisme: "Maison départementale des personnes handicapées", lien: "https://www.monparcourshandicap.gouv.fr",
    desc: "La MDPH de ton département est le point d'entrée pour faire reconnaître une situation de handicap, que ce soit pour la scolarité (PPS) ou pour le monde du travail (RQTH, à partir de 16 ans). C'est souvent la première démarche à lancer, les délais peuvent être longs donc mieux vaut anticiper.",
    ages: ["14-16", "17-19", "20-27", "28-45", "46-60"], statuts: ["etudiant", "alternant", "emploi", "recherche"], handicap: true },
  { cat: "handicap", nom: "Projet personnalisé de scolarisation (PPS)", organisme: "MDPH / Éducation nationale", lien: "https://www.monparcourshandicap.gouv.fr/scolarite/quest-ce-que-le-pps-projet-personnalise-de-scolarisation",
    desc: "Pour les collégien·nes et lycéen·nes en situation de handicap : ce document définit les aménagements pédagogiques, le matériel adapté et l'accompagnement humain (comme un·e AESH) nécessaires à la scolarité. L'enseignant référent de l'établissement est le bon interlocuteur pour lancer la démarche.",
    ages: ["11-13", "14-16", "17-19"], statuts: ["etudiant"], handicap: true },
  { cat: "handicap", nom: "Aménagements aux examens", organisme: "Éducation nationale (DSDEN)", lien: "https://www.education.gouv.fr",
    desc: "Temps supplémentaire, secrétaire, ordinateur ou salle adaptée : ces aménagements se demandent auprès du chef d'établissement au moment de l'inscription à l'examen (brevet, bac, concours), pas au dernier moment.",
    ages: ["14-16", "17-19", "20-27"], statuts: ["etudiant"], handicap: true },
  { cat: "handicap", nom: "Cap Emploi", organisme: "Réseau Cap Emploi", lien: "https://www.francetravail.fr/candidat/cap-emploi.html",
    desc: "Un réseau spécialisé, gratuit, pour préparer et sécuriser une insertion professionnelle quand on est reconnu·e travailleur·se handicapé·e (RQTH) : évaluation, orientation vers des formations adaptées, mise en relation avec des employeurs inclusifs.",
    ages: ["17-19", "20-27", "28-45", "46-60"], statuts: ["recherche", "emploi"], handicap: true },
  { cat: "handicap", nom: "Aides Agefiph et FIPHFP", organisme: "Agefiph (privé) / FIPHFP (fonction publique)", lien: "https://www.agefiph.fr",
    desc: "Une fois la RQTH obtenue, ces organismes financent des aménagements de poste, du matériel adapté (ordinateur, logiciels), des formations ou des aides à l'embauche. L'Agefiph concerne le secteur privé, le FIPHFP la fonction publique.",
    ages: ["17-19", "20-27", "28-45", "46-60"], statuts: ["emploi", "recherche"], handicap: true },
];

const AGES = [
  { v: "11-13", l: "11-13 ans" }, { v: "14-16", l: "14-16 ans" }, { v: "17-19", l: "17-19 ans" },
  { v: "20-27", l: "20-27 ans" }, { v: "28-45", l: "28-45 ans" }, { v: "46-60", l: "46-60 ans" },
];
const STATUTS = [
  { v: "etudiant", l: "🎓 Étudiant·e" }, { v: "alternant", l: "🧑‍🏭 Alternant·e" },
  { v: "emploi", l: "💼 En emploi" }, { v: "recherche", l: "🔍 En recherche" },
];

export default function Aides() {
  const [age, setAge] = useState(null);
  const [statut, setStatut] = useState(null);
  const [handicap, setHandicap] = useState(null);
  const [categorieActive, setCategorieActive] = useState("toutes");

  const profilActif = age || statut || handicap !== null;

  // Reproduit le tri de l'original : les aides correspondant au profil remontent
  // en premier, sans jamais masquer les autres (juste mieux triées).
  const aidesTriees = useMemo(() => {
    let liste = categorieActive === "toutes" ? AIDES_LISTE : AIDES_LISTE.filter((a) => a.cat === categorieActive);
    if (!profilActif) return liste;
    const score = (a) => {
      let s = 0;
      if (age && a.ages.includes(age)) s += 1;
      if (statut && a.statuts.includes(statut)) s += 1;
      if (handicap === true && a.handicap) s += 2;
      if (handicap === false && a.handicap) s -= 1;
      return s;
    };
    return [...liste].sort((a, b) => score(b) - score(a));
  }, [categorieActive, age, statut, handicap, profilActif]);

  const resetProfil = () => { setAge(null); setStatut(null); setHandicap(null); };

  return (
    <div data-testid="aides-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-4xl">🧭</div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">S'orienter dans les aides</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Des aides existent. Encore faut-il savoir qu'elles existent.</h1>
            <p className="font-body text-lg text-navy/70 mt-6 leading-relaxed">
              Cette page est autant pensée pour toi que pour un parent ou un proche qui t'accompagne : comprendre ce qui existe en France aide à mieux se projeter, à deux.
            </p>
            <p className="font-body text-sm text-navy/60 mt-4 leading-relaxed">
              On ne connaît presque jamais toutes les aides auxquelles on a droit : elles sont dispersées entre plusieurs organismes, avec des conditions qui changent selon l'âge, les revenus et la situation. Voici un premier aiguillage, classé par situation, avec le lien officiel de chaque dispositif pour vérifier ton éligibilité réelle et le montant exact.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md max-w-3xl">
          <div className="bg-white rounded-[2rem] p-7 border border-navy/5">
            <h2 className="font-heading text-xl text-navy">Trouve les aides qui te concernent vraiment</h2>
            <p className="font-body text-sm text-navy/60 mt-2">
              Facultatif : réponds à deux questions pour faire remonter en premier les aides les plus probables pour ta situation. Rien n'est jamais caché, juste mieux trié.
            </p>

            <div className="font-body text-sm font-semibold text-navy mt-6 mb-2">Ton âge</div>
            <div className="flex flex-wrap gap-2">
              {AGES.map((a) => (
                <button key={a.v} onClick={() => setAge(age === a.v ? null : a.v)}
                  className={`text-sm font-body px-4 py-2 rounded-full border transition-colors ${age === a.v ? "bg-navy text-cream border-navy" : "bg-cream text-navy/70 border-navy/10 hover:border-navy/30"}`}>
                  {a.l}
                </button>
              ))}
            </div>

            <div className="font-body text-sm font-semibold text-navy mt-6 mb-2">Ta situation actuelle</div>
            <div className="flex flex-wrap gap-2">
              {STATUTS.map((s) => (
                <button key={s.v} onClick={() => setStatut(statut === s.v ? null : s.v)}
                  className={`text-sm font-body px-4 py-2 rounded-full border transition-colors ${statut === s.v ? "bg-navy text-cream border-navy" : "bg-cream text-navy/70 border-navy/10 hover:border-navy/30"}`}>
                  {s.l}
                </button>
              ))}
            </div>

            <div className="font-body text-sm font-semibold text-navy mt-6 mb-2">Une situation de handicap te concerne&nbsp;?</div>
            <div className="flex gap-2">
              <button onClick={() => setHandicap(handicap === true ? null : true)}
                className={`text-sm font-body px-4 py-2 rounded-full border transition-colors ${handicap === true ? "bg-navy text-cream border-navy" : "bg-cream text-navy/70 border-navy/10 hover:border-navy/30"}`}>
                Oui
              </button>
              <button onClick={() => setHandicap(handicap === false ? null : false)}
                className={`text-sm font-body px-4 py-2 rounded-full border transition-colors ${handicap === false ? "bg-navy text-cream border-navy" : "bg-cream text-navy/70 border-navy/10 hover:border-navy/30"}`}>
                Non
              </button>
            </div>

            {profilActif && (
              <button onClick={resetProfil} className="mt-5 inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy">
                <RotateCcw size={13} /> Réinitialiser mon profil
              </button>
            )}
          </div>

          {/* Filtres catégorie */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-8 pb-2">
            <button onClick={() => setCategorieActive("toutes")}
              className={`shrink-0 rounded-full px-5 py-2 font-body text-sm border transition-colors ${categorieActive === "toutes" ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10"}`}>
              Toutes
            </button>
            {Object.entries(AIDES_CATEGORIES).map(([key, c]) => (
              <button key={key} onClick={() => setCategorieActive(key)}
                className={`shrink-0 rounded-full px-5 py-2 font-body text-sm border transition-colors ${categorieActive === key ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10"}`}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {/* Liste des aides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {aidesTriees.map((a) => (
              <div key={a.nom} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
                <span className="font-body text-[11px] uppercase tracking-widest text-brick">{AIDES_CATEGORIES[a.cat].emoji} {a.organisme}</span>
                <h3 className="font-heading text-lg text-navy mt-2 leading-snug">{a.nom}</h3>
                <p className="font-body text-sm text-navy/60 mt-2 leading-relaxed">{a.desc}</p>
                <a href={a.lien} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-navy">
                  En savoir plus <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>

          <div className="bg-cream border border-navy/10 rounded-xl px-4 py-3 mt-8 font-body text-sm text-navy/70">
            Les montants ne sont volontairement pas affichés ici : ils évoluent chaque année et dépendent de ta situation personnelle. Le simulateur officiel{" "}
            <a href="https://www.mesdroitssociaux.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold underline">
              Mes Droits Sociaux
            </a>{" "}
            permet d'estimer en une fois plusieurs aides auxquelles tu pourrais avoir droit, à partir de ta situation réelle.
          </div>
        </div>
      </section>

      <div className="container-md max-w-3xl">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy mt-12">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>
    </div>
  );
}
