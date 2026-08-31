import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const FAQ_QUESTIONS = [
  { q: "Faut-il créer un compte pour commencer ?", r: "Non. Les trois parcours (Simulation carrière, Trouve ta voie, Immersion pro) sont accessibles sans inscription. Un compte débloquera plus tard des options supplémentaires, sans jamais devenir obligatoire pour utiliser l'essentiel du site." },
  { q: "Les chiffres affichés (salaires, taux d'insertion) sont-ils fiables ?", r: "Ce sont des ordres de grandeur pédagogiques, pas des données officielles vérifiées en temps réel. Chaque parcours renvoie vers les vraies sources (Apec, Insee, Depp) pour vérifier avant toute décision réelle." },
  { q: "Le site restera-t-il gratuit ?", r: "L'essentiel du contenu (les trois parcours, les conseils, l'annuaire) reste gratuit. Certaines fonctionnalités plus poussées pourront devenir payantes à l'avenir, pour financer le développement du projet dans la durée, sans jamais fermer l'accès aux fonctions de base." },
  { q: "Mes réponses et mes données sont-elles conservées ?", r: "Aucune donnée nominative n'est collectée sans ton consentement explicite (par exemple si tu choisis de laisser ton email pour recevoir des conseils). Les réponses données pendant un parcours restent techniques et anonymes." },
  { q: "Un mineur de moins de 15 ans peut-il utiliser le site ou créer un compte ?", r: "Les parcours sont utilisables librement, y compris par un collégien ou une collégienne. Pour un futur compte utilisateur, l'autorisation d'un parent sera nécessaire pour les moins de 15 ans, avec un email de confirmation avant toute activation." },
];

export default function Faq() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { alert("Merci de renseigner une adresse email valide."); return; }
    if (!message.trim()) { alert("Écris ton message avant d'envoyer."); return; }
    // TODO intégration : envoyer vers une route API backend qui relaie par email.
    setEnvoye(true);
    setEmail(""); setMessage("");
  };

  return (
    <div data-testid="faq-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour à l'accueil
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Foire aux questions</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Ce qu'on nous demande le plus souvent.</h1>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md max-w-3xl space-y-4">
          {FAQ_QUESTIONS.map((item) => (
            <div key={item.q} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
              <p className="font-heading text-lg text-navy">{item.q}</p>
              <p className="font-body text-sm text-navy/70 mt-2 leading-relaxed">{item.r}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="container-md max-w-3xl">
          <h2 className="font-heading text-2xl text-navy mb-4">Une autre question ?</h2>
          {envoye ? (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 font-body text-sm text-navy/80">
              Merci, ton message est enregistré. On te répond dès que possible.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-[1.5rem] p-6 border border-navy/5 space-y-4">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.fr" data-testid="contact-email-input"
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none"
              />
              <textarea
                value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
                placeholder="Ton message..." data-testid="contact-message-input"
                className="w-full bg-cream rounded-xl px-4 py-3 font-body text-navy border border-navy/10 focus:ring-2 focus:ring-navy/20 outline-none resize-y"
              />
              <button type="submit" data-testid="contact-envoyer" className="bg-navy text-cream rounded-full px-6 py-3 font-body font-semibold text-sm">
                Envoyer
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
