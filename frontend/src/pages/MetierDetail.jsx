import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight, TrendingUp, GraduationCap, Sparkles, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { fetchMetier } from "../lib/api";

const decode = (s) => typeof s === "string"
  ? s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»").replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  : s;

// Sanitize before injecting: only plain formatting tags are allowed, no
// scripts/handlers/iframes/etc. Use this for every dangerouslySetInnerHTML
// call fed by API/CMS content.
const sanitize = (html) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br", "p", "span", "a"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

// --- Sub-components extracted from the original monolithic MetierDetail ---
// This also addresses the "high complexity / long function" finding by
// splitting rendering logic into focused pieces.

function LoadingState() {
  return (
    <div className="container-md py-24">
      <p className="font-body text-navy/60">Chargement...</p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="container-md py-24">
      <p className="font-body text-navy/60">Métier introuvable.</p>
    </div>
  );
}

function MetierHero({ m }) {
  return (
    <section className="pt-12 pb-16">
      <div className="container-md grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">{m.secteur_label}</span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-navy mt-4 leading-[1.05]">{m.nom}</h1>
          {m.scene?.accroche && (
            <p className="font-heading fraunces-italic text-2xl md:text-3xl text-navy/70 mt-8 max-w-2xl leading-snug">« {decode(m.scene.accroche)} »</p>
          )}
          {m.motsCles?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {m.motsCles.map(mk => <span key={mk} className="font-body text-xs px-3 py-1.5 rounded-full bg-white text-navy border border-navy/10">{mk}</span>)}
            </div>
          )}
        </motion.div>
        <MetierKeyStats m={m} />
      </div>
    </section>
  );
}

function MetierKeyStats({ m }) {
  return (
    <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-4">
      <div className="bg-white rounded-[2rem] p-8 border border-navy/5 shadow-[0_20px_60px_rgba(30,58,138,0.06)] space-y-6 sticky top-24">
        {m.salaireDebutant && (
          <div><div className="font-body text-xs uppercase tracking-widest text-navy/40">Salaire débutant</div><div className="font-heading text-4xl text-navy mt-1">{m.salaireDebutant}k€<span className="text-base text-navy/50 ml-1">brut/an</span></div></div>
        )}
        {m.tensionScore >= 3 && (
          <div className="pt-6 border-t border-navy/10"><div className="font-body text-xs uppercase tracking-widest text-navy/40">Tension marché</div><div className="flex items-center gap-2 mt-2"><TrendingUp size={16} className="text-brick" /><span className="font-body text-navy">{m.tensionScore >= 4 ? "Très forte demande" : "Forte demande"}</span></div></div>
        )}
        {m.marche?.chiffre && (
          <div className="pt-6 border-t border-navy/10"><div className="font-heading text-3xl text-brick">{m.marche.chiffre}</div><div className="font-body text-xs text-navy/60 mt-1 leading-snug">{m.marche.label}</div></div>
        )}
      </div>
    </motion.aside>
  );
}

function MetierJournee({ scene }) {
  if (!scene?.moments?.length) return null;
  return (
    <section className="py-16 bg-white/50">
      <div className="container-md">
        <h2 className="font-heading text-3xl md:text-4xl text-navy mb-10">Une journée <span className="fraunces-italic">au quotidien</span></h2>
        <div className="space-y-6 max-w-4xl">
          {scene.moments.map((mom, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 border-l-2 border-brick/30 pl-6">
              <div className="shrink-0"><div className="font-heading text-3xl text-brick">{mom.heure}</div></div>
              <div><h3 className="font-heading text-xl text-navy">{decode(mom.titre)}</h3><p className="font-body text-navy/70 mt-2 leading-relaxed">{decode(mom.texte)}</p></div>
            </motion.div>
          ))}
        </div>
        {scene.imprevu && (
          <div className="mt-12 max-w-4xl bg-brick/5 border border-brick/20 rounded-[1.5rem] p-8">
            <div className="flex items-center gap-3 mb-3"><AlertCircle className="text-brick" size={20} /><h3 className="font-heading text-xl text-navy">L'imprévu</h3></div>
            <p className="font-body text-navy/80 leading-relaxed">{decode(scene.imprevu)}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MetierMissions({ missions }) {
  if (!missions?.length) return null;
  return (
    <section className="py-16">
      <div className="container-md">
        <h2 className="font-heading text-3xl md:text-4xl text-navy mb-10">Missions <span className="fraunces-italic">principales</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mi, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
              <div className="font-heading text-2xl text-brick mb-3">{i + 1}</div>
              <h3 className="font-heading text-xl text-navy">{decode(mi.titre)}</h3>
              <p className="font-body text-navy/70 mt-3 leading-relaxed">{decode(mi.texte)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetierAllerPlusLoin({ m }) {
  const hasAny = m.competencesTech?.length > 0 || m.diplome || m.evolution?.length > 0 || m.contexteEvolution || m.variabilite;
  if (!hasAny) return null;
  return (
    <section className="py-16 bg-white/50">
      <div className="container-md max-w-4xl">
        <h2 className="font-heading text-3xl md:text-4xl text-navy mb-10">Aller <span className="fraunces-italic">plus loin</span></h2>
        <Accordion type="single" collapsible className="space-y-3">
          {m.diplome && (
            <AccordionItem value="diplome" className="bg-white rounded-[1.5rem] border border-navy/5 px-6">
              <AccordionTrigger className="font-heading text-xl text-navy hover:no-underline">Études & formations</AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-4 font-body text-navy/70">
                  {[m.diplome.niveau1, m.diplome.niveau2].filter(Boolean).map((n, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 font-body font-semibold text-navy"><GraduationCap size={16} className="text-brick" />{typeof n === "string" ? "Niveau" : n.titre}</div>
                      {typeof n === "string" ? <p className="mt-2 pl-6">{n}</p> :
                        <ul className="mt-2 pl-6 space-y-1">{(n.options || []).map((o, j) => <li key={j}>• {o}</li>)}</ul>}
                    </div>
                  ))}
                  {m.experience && <p className="pt-4 border-t border-navy/10"><strong className="text-navy">Expérience :</strong> {m.experience}</p>}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          {m.competencesTech?.length > 0 && (
            <AccordionItem value="skills" className="bg-white rounded-[1.5rem] border border-navy/5 px-6">
              <AccordionTrigger className="font-heading text-xl text-navy hover:no-underline">Compétences techniques</AccordionTrigger>
              <AccordionContent><ul className="font-body text-navy/70 space-y-2 pt-2">{m.competencesTech.map((c, i) => <li key={i} className="flex gap-3"><Sparkles size={14} className="text-brick shrink-0 mt-1" />{decode(c)}</li>)}</ul></AccordionContent>
            </AccordionItem>
          )}
          {m.evolution?.length > 0 && (
            <AccordionItem value="evol" className="bg-white rounded-[1.5rem] border border-navy/5 px-6">
              <AccordionTrigger className="font-heading text-xl text-navy hover:no-underline">Évolution & rémunération</AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3">
                  {m.evolution.map((e, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-navy/5 last:border-0">
                      <span className="font-body text-navy/70">{e.niveau}</span>
                      <span className="font-heading text-xl text-navy">{e.salaire}k€</span>
                    </div>
                  ))}
                </div>
                {m.remunerationTexte && (
                  // SECURITY: sanitized with DOMPurify — was raw dangerouslySetInnerHTML before.
                  <p className="font-body text-navy/70 mt-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitize(m.remunerationTexte) }} />
                )}
              </AccordionContent>
            </AccordionItem>
          )}
          {m.contexteEvolution && (
            <AccordionItem value="context" className="bg-white rounded-[1.5rem] border border-navy/5 px-6">
              <AccordionTrigger className="font-heading text-xl text-navy hover:no-underline">Contexte & évolution du métier</AccordionTrigger>
              <AccordionContent>
                {/* SECURITY: sanitized with DOMPurify — was raw dangerouslySetInnerHTML before. */}
                <p className="font-body text-navy/70 leading-relaxed pt-2" dangerouslySetInnerHTML={{ __html: sanitize(m.contexteEvolution) }} />
              </AccordionContent>
            </AccordionItem>
          )}
          {m.variabilite && (
            <AccordionItem value="var" className="bg-white rounded-[1.5rem] border border-navy/5 px-6">
              <AccordionTrigger className="font-heading text-xl text-navy hover:no-underline">Variabilité selon le contexte</AccordionTrigger>
              <AccordionContent>
                {/* SECURITY: sanitized with DOMPurify — was raw dangerouslySetInnerHTML before. */}
                <p className="font-body text-navy/70 leading-relaxed pt-2" dangerouslySetInnerHTML={{ __html: sanitize(m.variabilite) }} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </section>
  );
}

function MetierRelated({ related }) {
  if (!related?.length) return null;
  return (
    <section className="py-16">
      <div className="container-md">
        <h2 className="font-heading text-3xl md:text-4xl text-navy mb-10">Métiers du <span className="fraunces-italic">même univers</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map(r => (
            <Link key={r.slug} to={`/metiers/${r.slug}`} className="group bg-white rounded-[1.5rem] p-6 border border-navy/5 hover:-translate-y-1 transition-transform">
              <h3 className="font-heading text-xl text-navy">{r.nom}</h3>
              {r.salaireDebutant && <p className="font-body text-sm text-navy/60 mt-2">{r.salaireDebutant}k€ brut/an · débutant</p>}
              <div className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-navy">Voir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MetierDetail() {
  const { slug } = useParams();
  const [m, setM] = useState(null);

  const loadMetier = useCallback(() => {
    fetchMetier(slug).then(setM).catch(() => setM(false));
  }, [slug]);

  useEffect(() => { loadMetier(); }, [loadMetier]);

  if (m === false) return <ErrorState />;
  if (!m) return <LoadingState />;

  return (
    <div data-testid="metier-detail" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/metiers" data-testid="back-to-metiers" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour à l'annuaire
        </Link>
      </div>

      <MetierHero m={m} />
      <MetierJournee scene={m.scene} />
      <MetierMissions missions={m.missions} />
      <MetierAllerPlusLoin m={m} />
      <MetierRelated related={m.related} />
    </div>
  );
}
