import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, GraduationCap, Users, Briefcase, TrendingUp, Sparkles } from "lucide-react";

const STEPS = [
  { icon: Briefcase, titre: "Premier jour", desc: "L'intégration : ce qu'on te dit vraiment, ce qu'on te cache, ce qui compte." },
  { icon: Users, titre: "Vie d'équipe", desc: "Les codes, les rituels, les collègues avec qui tu travailleras chaque jour." },
  { icon: GraduationCap, titre: "Formation continue", desc: "Comment tu progresses concrètement — CPF, formations internes, certifications." },
  { icon: TrendingUp, titre: "Évolutions internes", desc: "Mobilité, promotions, changements de poste : ce qui est réellement possible." },
  { icon: Sparkles, titre: "Avantages salariés", desc: "CSE, participation, mutuelle, télétravail : au-delà du salaire brut." },
  { icon: Building2, titre: "Culture d'entreprise", desc: "Ce qui se voit dans la brochure vs. ce que tu vis vraiment au quotidien." },
];

export default function Immersion() {
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
            <div className="mt-8 inline-flex items-center gap-3 bg-brick/10 text-brick rounded-full px-4 py-2 font-body text-sm">
              <Sparkles size={14} /> Bientôt disponible dans son intégralité
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group bg-white rounded-[1.5rem] p-7 border border-navy/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-brick/10 flex items-center justify-center">
                    <s.icon size={20} className="text-brick" />
                  </div>
                  <span className="font-body text-xs uppercase tracking-widest text-navy/40">0{i + 1}</span>
                </div>
                <h3 className="font-heading text-2xl text-navy mt-6 leading-tight">{s.titre}</h3>
                <p className="font-body text-sm text-navy/70 mt-3 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-md">
          <div className="bg-navy text-cream rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-brick/15 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-brick-soft">En attendant</span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 leading-tight">
                Explore les <span className="fraunces-italic">100 métiers</span> déjà racontés sans filtre.
              </h2>
              <p className="font-body text-cream/75 mt-4 leading-relaxed">
                Salaire réel, quotidien concret, études, débouchés : chaque fiche va au-delà de la brochure.
              </p>
              <Link
                to="/metiers"
                data-testid="immersion-to-metiers"
                className="group inline-flex items-center gap-2 mt-8 bg-cream text-navy rounded-full px-7 py-4 font-body font-semibold text-sm hover:scale-105 transition-transform"
              >
                Découvrir l'annuaire <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
