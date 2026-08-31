import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

// ============================================================
// PAGE /organismes — "Où chercher un poste" : 10 plateformes de
// recrutement françaises, avec leurs points forts respectifs.
// ============================================================

const ORGANISMES_RECRUTEMENT = [
  { nom: "LinkedIn", icon: "💼", lien: "https://www.linkedin.com/jobs", desc: "Le réseau professionnel de référence : utile pour se faire connaître, suivre des entreprises, et candidater directement. Beaucoup de recruteurs y publient leurs offres en premier.", tags: ["Réseau", "Tous secteurs", "Visibilité"] },
  { nom: "Welcome to the Jungle", icon: "🌴", lien: "https://www.welcometothejungle.com/fr", desc: "Spécialisé sur les entreprises qui misent sur leur culture et leurs valeurs, avec des fiches entreprise très détaillées. Très utilisé côté startups, tech et scale-ups.", tags: ["Culture d'entreprise", "Startups", "Tech"] },
  { nom: "France Travail", icon: "🧭", lien: "https://www.francetravail.fr", desc: "Le service public de l'emploi : la base la plus large d'offres en France, tous secteurs et tous niveaux, avec un accompagnement gratuit possible en parallèle.", tags: ["Service public", "Tous secteurs", "Accompagnement"] },
  { nom: "Apec", icon: "🎓", lien: "https://www.apec.fr", desc: "Dédié aux cadres et jeunes diplômés à potentiel cadre. Bon réflexe dès la licence/master si tu vises un poste à responsabilités.", tags: ["Cadres", "Jeunes diplômés"] },
  { nom: "Indeed", icon: "🔍", lien: "https://www.indeed.com/fr", desc: "Moteur de recherche qui agrège des offres de très nombreuses sources en un seul endroit. Pratique pour balayer large rapidement, moins pour la qualité du tri.", tags: ["Agrégateur", "Volume", "Tous secteurs"] },
  { nom: "HelloWork", icon: "👋", lien: "https://www.hellowork.com", desc: "Plateforme française généraliste avec des offres et des conseils carrière, souvent bien référencée sur des postes en région.", tags: ["Généraliste", "Région"] },
  { nom: "L'Etudiant / Diplomeo", icon: "📚", lien: "https://www.letudiant.fr", desc: "Plutôt côté orientation et stages/alternance pour les plus jeunes, avec des salons et forums en complément des offres.", tags: ["Étudiants", "Alternance", "Orientation"] },
  { nom: "Chambre de Métiers et de l'Artisanat (CMA)", icon: "🛠️", lien: "https://www.cma-france.fr", desc: "Le bon réflexe pour trouver un contrat d'apprentissage ou une offre dans l'artisanat, secteur par secteur et région par région.", tags: ["Artisanat", "Apprentissage"] },
  { nom: "Place de l'Emploi Public", icon: "🏛️", lien: "https://www.place-emploi-public.gouv.fr", desc: "Le site officiel des offres dans la fonction publique d'État, territoriale et hospitalière, avec les concours associés.", tags: ["Fonction publique", "Concours"] },
  { nom: "AgroJob / Anefa", icon: "🌾", lien: "https://www.anefa.org", desc: "Plateformes spécialisées sur les métiers agricoles et de l'agroalimentaire, souvent avec des offres saisonnières en plus des postes permanents.", tags: ["Agriculture", "Saisonnier"] },
];

export default function Organismes() {
  return (
    <div data-testid="organismes-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour à l'accueil
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Où chercher un poste</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Dix plateformes, chacune avec son point fort.</h1>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md grid grid-cols-1 md:grid-cols-2 gap-5">
          {ORGANISMES_RECRUTEMENT.map((o) => (
            <div key={o.nom} className="bg-white rounded-[1.5rem] p-6 border border-navy/5 flex gap-4">
              <div className="text-3xl shrink-0">{o.icon}</div>
              <div>
                <h3 className="font-heading text-lg text-navy">{o.nom}</h3>
                <p className="font-body text-sm text-navy/70 mt-2 leading-relaxed">{o.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {o.tags.map((t) => (
                    <span key={t} className="text-[11px] font-body px-2.5 py-1 rounded-full bg-cream text-navy/60 border border-navy/10">{t}</span>
                  ))}
                </div>
                <a href={o.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-navy mt-4">
                  Ouvrir {o.nom} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
