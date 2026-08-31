import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";

// ============================================================
// PAGE /ressources/expatriation — portage fidèle : 3 dispositifs,
// 6 étapes du chemin, 12 destinations filtrables par dispositif,
// zone UE et recherche texte.
// ============================================================

const SECTEUR_LABELS = {
  tech: "Tech", sante: "Santé", btp: "BTP", commerce: "Commerce", agriculture: "Agriculture",
  artisanat: "Artisanat", public: "Public", finance: "Finance", education: "Éducation",
  culture: "Culture", tourisme: "Tourisme", psychologie: "Psychologie",
};

const DISPOSITIFS_EXPAT = {
  vie: { nom: "VIE", nomLong: "Volontariat International en Entreprise", emoji: "🎓",
    desc: "Mission de 6 à 24 mois pour une entreprise française à l'étranger, avec un statut public et une indemnité non imposable en France. Réservé aux 18-28 ans, ressortissants de l'Espace économique européen.",
    lien: "https://mon-vie-via.businessfrance.fr" },
  via: { nom: "VIA", nomLong: "Volontariat International en Administration", emoji: "🏛️",
    desc: "Le même principe que le VIE, mais au sein d'une ambassade, d'un consulat ou d'une administration française à l'étranger plutôt qu'une entreprise. Mêmes conditions d'âge (18-28 ans).",
    lien: "https://mon-vie-via.businessfrance.fr" },
  pvt: { nom: "PVT", nomLong: "Programme Vacances-Travail", emoji: "🎒",
    desc: "Visa qui permet de vivre et travailler librement dans un pays partenaire, généralement 1 an (parfois 2). Souvent limité aux 18-30 ou 18-35 ans selon le pays, avec des quotas annuels.",
    lien: "https://www.diplomatie.gouv.fr" },
  classique: { nom: "Expatriation classique", nomLong: "Contrat local ou détachement", emoji: "💼",
    desc: "Tu décroches un poste sur place (contrat local) ou ton entreprise française t'envoie (détachement/expatriation). Pas de limite d'âge, mais démarches de visa plus exigeantes hors Union européenne.",
    lien: "https://www.service-public.fr" },
};

const EXPAT_ETAPES = [
  { num: 1, titre: "Clarifier ton pourquoi", txt: "Partir pour la langue, le salaire, l'expérience, ou fuir une situation ? La réponse change complètement la destination et le dispositif à viser. Un projet flou tient rarement plus de six mois sur place." },
  { num: 2, titre: "Choisir le dispositif", txt: "VIE si tu as moins de 28 ans et vises une mission encadrée. PVT si tu veux de la liberté et découvrir avant de t'engager. Contrat local si tu as déjà de l'expérience et un secteur en tension." },
  { num: 3, titre: "Vérifier les conditions réelles", txt: "Visa, quotas, âge limite, reconnaissance du diplôme, niveau de langue exigé. C'est l'étape que tout le monde saute et qui fait perdre des mois.", lien: "https://www.diplomatie.gouv.fr", lienLabel: "France Diplomatie, conseils par pays" },
  { num: 4, titre: "Chiffrer le budget de départ", txt: "Compte 4 à 6 mois de coût de la vie sur place avant le premier salaire : logement (souvent avec caution), billet, assurance, temps de recherche. C'est le vrai filet de sécurité." },
  { num: 5, titre: "Créer ton profil et candidater", txt: "Pour le VIE, tout passe par la plateforme officielle Business France. Pour le reste, adapte ton CV au format local (une page, pas de photo dans les pays anglo-saxons) et active ton réseau.", lien: "https://mon-vie-via.businessfrance.fr", lienLabel: "Mon VIE Via, plateforme officielle" },
  { num: 6, titre: "Préparer l'après-départ", txt: "Sécurité sociale, fiscalité, retraite : ce que tu cotises à l'étranger ne se reporte pas automatiquement. Les conventions bilatérales existent, encore faut-il les activer.", lien: "https://www.cleiss.fr", lienLabel: "Cleiss, protection sociale à l'international" },
];

const DESTINATIONS_EXPAT = [
  { key: "irlande", emoji: "🇮🇪", pays: "Irlande", villes: "Dublin, Cork", dispositifs: ["vie", "via", "classique"], langue: "Anglais", ue: true, secteurs: ["tech", "finance"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Élevé, surtout le logement à Dublin", atout: "Hub européen des grandes entreprises tech et de la finance, forte communauté française.", vigilance: "Le logement à Dublin est le principal poste de dépense et la principale difficulté à l'arrivée." },
  { key: "canada", emoji: "🇨🇦", pays: "Canada", villes: "Montréal, Toronto, Vancouver", dispositifs: ["pvt", "vie", "via", "classique"], langue: "Français au Québec, anglais ailleurs", ue: false, secteurs: ["tech", "sante", "btp"], visa: "PVT (quotas annuels) ou permis de travail", coutVie: "Modéré hors Toronto et Vancouver", atout: "Le Québec facilite l'installation des francophones, et le PVT est une porte d'entrée très utilisée.", vigilance: "Les quotas PVT partent vite, l'hiver et la reconnaissance des diplômes demandent de l'anticipation." },
  { key: "australie", emoji: "🇦🇺", pays: "Australie", villes: "Sydney, Melbourne", dispositifs: ["pvt", "via", "classique"], langue: "Anglais", ue: false, secteurs: ["btp", "sante", "commerce"], visa: "PVT jusqu'à 30 ans (parfois 35), ou visa de travail qualifié", coutVie: "Élevé dans les grandes villes", atout: "Salaire minimum élevé et forte demande de main d'œuvre dans plusieurs secteurs.", vigilance: "Très loin de la France, billet coûteux, décalage horaire important pour garder le lien familial." },
  { key: "allemagne", emoji: "🇩🇪", pays: "Allemagne", villes: "Berlin, Munich, Francfort", dispositifs: ["vie", "via", "classique"], langue: "Allemand (anglais suffisant à Berlin dans la tech)", ue: true, secteurs: ["tech", "btp", "finance"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Modéré, Berlin reste plus abordable que Munich", atout: "Première économie européenne, industrie et ingénierie très demandeuses, proximité avec la France.", vigilance: "L'allemand reste un vrai atout hors des milieux tech internationaux." },
  { key: "espagne", emoji: "🇪🇸", pays: "Espagne", villes: "Barcelone, Madrid, Valence", dispositifs: ["vie", "via", "classique"], langue: "Espagnol", ue: true, secteurs: ["commerce", "tech"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Plus bas qu'en France dans la plupart des villes", atout: "Qualité de vie, proximité, langue accessible, forte communauté d'expatriés et de nomades.", vigilance: "Les salaires locaux sont souvent nettement inférieurs aux salaires français." },
  { key: "suisse", emoji: "🇨🇭", pays: "Suisse", villes: "Genève, Lausanne, Zurich", dispositifs: ["via", "classique"], langue: "Français en Suisse romande", ue: false, secteurs: ["finance", "sante", "tech"], visa: "Permis de travail via accords bilatéraux", coutVie: "Très élevé, mais compensé par les salaires", atout: "Parmi les salaires les plus élevés au monde, et le travail frontalier depuis la France est possible.", vigilance: "Coût du logement et assurance maladie privée à budgéter très sérieusement." },
  { key: "royaumeuni", emoji: "🇬🇧", pays: "Royaume-Uni", villes: "Londres, Manchester", dispositifs: ["vie", "via", "classique"], langue: "Anglais", ue: false, secteurs: ["finance", "tech", "commerce"], visa: "Visa de travail requis depuis le Brexit", coutVie: "Très élevé à Londres", atout: "Place financière majeure et marché du travail dynamique.", vigilance: "Depuis le Brexit, il faut un sponsor employeur pour le visa : ce n'est plus une destination de libre installation." },
  { key: "belgique", emoji: "🇧🇪", pays: "Belgique", villes: "Bruxelles", dispositifs: ["vie", "via", "classique"], langue: "Français à Bruxelles et en Wallonie", ue: true, secteurs: ["public", "finance", "commerce"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Comparable à la France", atout: "Institutions européennes, langue commune, et proximité immédiate avec la France.", vigilance: "Fiscalité et cotisations sociales élevées, à comparer avant de signer." },
  { key: "usa", emoji: "🇺🇸", pays: "États-Unis", villes: "New York, San Francisco, Miami", dispositifs: ["vie", "via", "classique"], langue: "Anglais", ue: false, secteurs: ["tech", "finance", "commerce"], visa: "Visa difficile à obtenir (H-1B, L-1, J-1 selon les cas)", coutVie: "Très élevé dans les grandes métropoles", atout: "Salaires les plus élevés du monde dans la tech et la finance.", vigilance: "Le visa est le vrai obstacle, et la couverture santé privée est un poste de dépense majeur à anticiper." },
  { key: "emirats", emoji: "🇦🇪", pays: "Émirats arabes unis", villes: "Dubaï, Abu Dhabi", dispositifs: ["vie", "via", "classique"], langue: "Anglais", ue: false, secteurs: ["btp", "finance", "commerce"], visa: "Visa de travail sponsorisé par l'employeur", coutVie: "Élevé, mais aucun impôt sur le revenu", atout: "Absence d'impôt sur le revenu et forte demande dans la construction, le luxe et la finance.", vigilance: "Le statut dépend entièrement de l'employeur : perdre son emploi peut signifier perdre son droit de séjour." },
  { key: "suede", emoji: "🇸🇪", pays: "Suède", villes: "Stockholm, Göteborg", dispositifs: ["vie", "via", "classique"], langue: "Anglais très largement pratiqué", ue: true, secteurs: ["tech", "public"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Élevé, mais services publics très développés", atout: "Excellent équilibre vie professionnelle et vie personnelle, écosystème tech reconnu.", vigilance: "Hiver long et sombre, et marché du travail assez fermé sans réseau local." },
  { key: "portugal", emoji: "🇵🇹", pays: "Portugal", villes: "Lisbonne, Porto", dispositifs: ["vie", "via", "classique"], langue: "Portugais (anglais courant à Lisbonne)", ue: true, secteurs: ["tech", "commerce"], visa: "Aucun visa nécessaire (Union européenne)", coutVie: "Parmi les plus bas d'Europe de l'Ouest", atout: "Coût de la vie contenu, climat, et écosystème de startups en croissance à Lisbonne.", vigilance: "Salaires locaux bas, la destination est surtout intéressante avec un revenu français ou international." },
];

export default function Expatriation() {
  const [filtreDispositif, setFiltreDispositif] = useState("tous");
  const [filtreUe, setFiltreUe] = useState("tous");
  const [recherche, setRecherche] = useState("");

  const destinations = useMemo(() => {
    let d = filtreDispositif === "tous" ? DESTINATIONS_EXPAT : DESTINATIONS_EXPAT.filter((p) => p.dispositifs.includes(filtreDispositif));
    if (filtreUe === "ue") d = d.filter((p) => p.ue === true);
    if (filtreUe === "horsue") d = d.filter((p) => p.ue === false);
    if (recherche.trim()) {
      const q = recherche.trim().toLowerCase();
      d = d.filter((p) => p.pays.toLowerCase().includes(q) || p.villes.toLowerCase().includes(q));
    }
    return d;
  }, [filtreDispositif, filtreUe, recherche]);

  return (
    <div data-testid="expatriation-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-4xl">🌍</div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Partir à l'étranger</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Travailler ailleurs, ça se prépare.</h1>
            <p className="font-body text-lg text-navy/70 mt-6 leading-relaxed">
              Les trois voies possibles, douze destinations, et un plan concret étape par étape jusqu'à ta candidature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 dispositifs */}
      <section>
        <div className="container-md max-w-3xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Trois voies possibles</span>
          <h2 className="font-heading text-2xl text-navy mt-2">Laquelle te correspond ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {Object.entries(DISPOSITIFS_EXPAT).map(([cle, d]) => {
              const nbPays = DESTINATIONS_EXPAT.filter((p) => p.dispositifs.includes(cle)).length;
              return (
                <div key={cle} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
                  <div className="text-3xl">{d.emoji}</div>
                  <h3 className="font-heading text-xl text-navy mt-3">{d.nom}</h3>
                  <div className="font-body text-xs text-navy/50">{d.nomLong}</div>
                  <p className="font-body text-sm text-navy/70 mt-3 leading-relaxed">{d.desc}</p>
                  <div className="font-body text-xs text-navy/50 mt-3">{nbPays} destination{nbPays > 1 ? "s" : ""} concernée{nbPays > 1 ? "s" : ""}</div>
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => setFiltreDispositif(cle)} className="font-body text-sm font-semibold text-navy underline">
                      Voir les destinations ↓
                    </button>
                    <a href={d.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-body text-sm text-navy/60">
                      Site officiel <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 étapes */}
      <section className="mt-16">
        <div className="container-md max-w-3xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Le chemin</span>
          <h2 className="font-heading text-2xl text-navy mt-2">De l'idée à la candidature, en 6 étapes</h2>
          <div className="space-y-4 mt-6">
            {EXPAT_ETAPES.map((e) => (
              <div key={e.num} className="flex gap-5 bg-white rounded-2xl border border-navy/5 p-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-navy text-cream flex items-center justify-center font-heading text-sm">{e.num}</div>
                <div>
                  <h3 className="font-heading text-lg text-navy">{e.titre}</h3>
                  <p className="font-body text-sm text-navy/70 mt-1.5 leading-relaxed">{e.txt}</p>
                  {e.lien && (
                    <a href={e.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-body text-sm font-semibold text-navy mt-2">
                      {e.lienLabel} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 destinations filtrables */}
      <section id="destinations" className="mt-16">
        <div className="container-md max-w-5xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Où partir</span>
          <h2 className="font-heading text-2xl text-navy mt-2">12 destinations, sans langue de bois</h2>
          <p className="font-body text-sm text-navy/60 mt-3">Pour chacune : ce qui attire, et ce à quoi il faut faire attention.</p>

          <div className="relative max-w-md mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={16} />
            <input
              type="text" value={recherche} onChange={(e) => setRecherche(e.target.value)}
              placeholder="Chercher un pays, une ville..."
              className="w-full bg-white rounded-full pl-11 pr-4 py-3 font-body text-sm text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
            <button onClick={() => setFiltreDispositif("tous")}
              className={`shrink-0 rounded-full px-4 py-2 font-body text-sm border ${filtreDispositif === "tous" ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10"}`}>
              Toutes les destinations
            </button>
            {Object.entries(DISPOSITIFS_EXPAT).map(([cle, d]) => (
              <button key={cle} onClick={() => setFiltreDispositif(cle)}
                className={`shrink-0 rounded-full px-4 py-2 font-body text-sm border ${filtreDispositif === cle ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10"}`}>
                {d.emoji} {d.nom}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {[["tous", "Toutes zones"], ["ue", "🇪🇺 Union européenne"], ["horsue", "Hors Union européenne"]].map(([cle, label]) => (
              <button key={cle} onClick={() => setFiltreUe(cle)}
                className={`rounded-full px-4 py-2 font-body text-sm border ${filtreUe === cle ? "bg-navy text-cream border-navy" : "bg-white text-navy/70 border-navy/10"}`}>
                {label}
              </button>
            ))}
          </div>

          {destinations.length === 0 ? (
            <p className="font-body text-sm text-navy/50 mt-8">Aucune destination ne correspond à ces filtres pour l'instant.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {destinations.map((p) => (
                <div key={p.key} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1">
                      <div className="font-heading text-lg text-navy">{p.pays}</div>
                      <div className="font-body text-xs text-navy/50">{p.villes}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.dispositifs.map((d) => (
                      <span key={d} className="text-[10px] font-body px-2 py-0.5 rounded-full bg-cream text-navy/70 border border-navy/10">
                        {DISPOSITIFS_EXPAT[d].nom}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 font-body text-xs">
                    <div><strong className="text-navy">🗣️ Langue</strong><div className="text-navy/60 mt-0.5">{p.langue}</div></div>
                    <div><strong className="text-navy">🛂 Visa</strong><div className="text-navy/60 mt-0.5">{p.visa}</div></div>
                    <div><strong className="text-navy">💰 Coût de la vie</strong><div className="text-navy/60 mt-0.5">{p.coutVie}</div></div>
                    <div><strong className="text-navy">📈 Secteurs</strong><div className="text-navy/60 mt-0.5">{p.secteurs.map((s) => SECTEUR_LABELS[s] || s).join(", ")}</div></div>
                  </div>
                  <div className="mt-3 font-body text-sm text-teal-700">✅ {p.atout}</div>
                  <div className="mt-1.5 font-body text-sm text-amber-700">⚠️ {p.vigilance}</div>
                </div>
              ))}
            </div>
          )}
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
