import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

// ============================================================
// PAGE /ressources/fiche-paie — portage fidèle du simulateur
// brut/net interactif de l'original. Remplace le "Lire →" mort.
// ============================================================

const PMSS_2026 = 4005;
const SMIC_REFERENCE_2026 = 1823.03;

const GRILLE_APPRENTI = [
  { tranche: "Moins de 18 ans", pourcentages: [27, 39, 55] },
  { tranche: "18 à 20 ans", pourcentages: [43, 51, 67] },
  { tranche: "21 à 25 ans", pourcentages: [53, 61, 78] },
  { tranche: "26 ans et plus", pourcentages: [100, 100, 100] },
];

const FICHE_PAIE_SECTIONS = [
  { titre: "Salaire de base", lignes: [
    { libelle: "Salaire brut", montant: "2 500,00 €", type: "brut",
      desc: "Le chiffre annoncé dans ton contrat et dans l'offre d'emploi. C'est le point de départ de tout le calcul, pas ce que tu touches réellement." },
  ]},
  { titre: "Cotisations et contributions salariales", lignes: [
    { libelle: "Sécurité sociale — Maladie", taux: "0,00 %", montant: "0,00 €",
      desc: "Depuis une réforme de 2018, cette cotisation n'est quasiment plus à la charge du salarié : elle est compensée par la CSG. Elle apparaît quand même sur la fiche, souvent à 0 %." },
    { libelle: "Assurance vieillesse (retraite de base)", taux: "~7,30 %", montant: "~182,50 €",
      desc: "Finance ta future pension de retraite de base, versée par la Sécurité sociale. Une part est plafonnée, une autre non, d'où parfois deux lignes distinctes sur une vraie fiche." },
    { libelle: "Retraite complémentaire (Agirc-Arrco)", taux: "~4,01 %", montant: "~100,25 €",
      desc: "Vient s'ajouter à la retraite de base : tout salarié du privé cotise aussi à une caisse complémentaire, obligatoire, qui verse une deuxième pension au moment de la retraite." },
    { libelle: "Assurance chômage", taux: "0,00 %", montant: "0,00 €",
      desc: "Comme la cotisation maladie, la part salariale a été supprimée en 2018. L'assurance chômage est aujourd'hui presque entièrement financée par les cotisations patronales et la CSG." },
    { libelle: "CSG déductible", taux: "6,80 %", montant: "~167,00 €",
      desc: "La Contribution Sociale Généralisée finance la protection sociale (santé, famille, retraite). Cette part est déduite avant impôt, elle réduit donc ton revenu imposable." },
    { libelle: "CSG non déductible + CRDS", taux: "3,40 %", montant: "~84,00 €",
      desc: "Une autre part de CSG, plus la CRDS (Contribution au Remboursement de la Dette Sociale). Contrairement à la ligne précédente, celle-ci ne réduit pas ton revenu imposable." },
  ]},
  { titre: "Net avant impôt", lignes: [
    { libelle: "Salaire net avant impôt", montant: "1 966,00 €", type: "net",
      desc: "Ce qui reste une fois toutes les cotisations sociales retirées. C'est le chiffre que la plupart des gens appellent \"le net\", mais l'impôt n'est pas encore passé." },
  ]},
  { titre: "Impôt sur le revenu", lignes: [
    { libelle: "Prélèvement à la source", taux: "exemple à 3 %", montant: "~59,00 €",
      desc: "Calculé selon ton taux personnalisé, transmis par l'administration fiscale à ton employeur. En début de carrière avec un revenu modeste, ce taux est très souvent proche de 0 %. Ce n'est en aucun cas une moyenne fixe." },
  ]},
  { titre: "Net payé", lignes: [
    { libelle: "Net à payer (viré sur ton compte)", montant: "1 907,00 €", type: "final",
      desc: "Le seul chiffre qui compte vraiment au quotidien : ce qui arrive réellement sur ton compte en banque ce mois-ci." },
  ]},
];

const CONCEPTS = [
  { emoji: "🧓", titre: "Pourquoi deux lignes pour la retraite ?", txt: "La retraite de base (Sécurité sociale) et la retraite complémentaire (Agirc-Arrco) sont deux systèmes distincts mais obligatoires. Ta pension finale sera la somme des deux, jamais l'une sans l'autre." },
  { emoji: "🏛️", titre: "CSG et CRDS, à quoi ça sert vraiment ?", txt: "Ce sont des impôts, pas des cotisations classiques : ils financent la Sécurité sociale dans son ensemble et le remboursement de sa dette. Contrairement aux cotisations, ils sont prélevés sur presque tous les revenus, pas seulement les salaires." },
  { emoji: "🔍", titre: "Toujours comparer en brut, jamais en net", txt: "Deux offres d'emploi ne se comparent qu'en brut : le passage au net dépend du statut, de la mutuelle, des primes... Un \"net garanti\" annoncé dans une offre cache souvent des conditions particulières, à faire préciser avant de signer." },
  { emoji: "📊", titre: "Net payé, net imposable : pas pareil", txt: "Le \"net payé\" est ce qui arrive sur ton compte. Le \"net imposable\", légèrement différent, sert de base au calcul de tes impôts (il réintègre notamment la CSG non déductible). C'est ce chiffre-là qu'il faut regarder sur ta déclaration, pas le net payé." },
];

const euros = (n) => Math.round(n).toLocaleString("fr-FR") + " €";

// Reproduit fidèlement la logique de calculerSalaire() de l'original :
// cotisations décomposées poste par poste (retraite base/complémentaire,
// CEG, CSG/CRDS, prévoyance cadre), impôt indicatif simplifié, coût employeur.
function calculerSalaire(brut, statutCadre) {
  const tranche1 = Math.min(brut, PMSS_2026);
  const tranche2 = Math.max(0, brut - PMSS_2026);

  const retraiteBase = tranche1 * 0.069;
  const retraiteCompT1 = tranche1 * 0.0387;
  const retraiteCompT2 = tranche2 * 0.0864;
  const cegT1 = tranche1 * 0.0086;
  const cegT2 = tranche2 * 0.0108;
  const csgDeductible = brut * 0.068;
  const csgCrds = brut * 0.034;
  const prevoyanceCadre = statutCadre ? tranche1 * 0.015 : 0;

  const cotisations = Math.round(retraiteBase + retraiteCompT1 + retraiteCompT2 + cegT1 + cegT2 + csgDeductible + csgCrds + prevoyanceCadre);
  const netAvantImpot = brut - cotisations;

  let tauxImpot = 0;
  if (netAvantImpot > 1600) tauxImpot = Math.min(0.14, ((netAvantImpot - 1600) / 1600) * 0.06);
  const impot = Math.round(netAvantImpot * tauxImpot);
  const netPaye = netAvantImpot - impot;

  const patronalDeplafonne = brut * 0.26;
  const patronalRetraiteBase = tranche1 * 0.0855;
  const patronalRetraiteCompT1 = tranche1 * 0.0587;
  const patronalRetraiteCompT2 = tranche2 * 0.1296;
  const patronalChomage = brut * 0.0405;
  const cotisationsPatronales = Math.round(patronalDeplafonne + patronalRetraiteBase + patronalRetraiteCompT1 + patronalRetraiteCompT2 + patronalChomage);
  const coutEmployeur = brut + cotisationsPatronales;

  return { brut, cotisations, netAvantImpot, impot, netPaye, coutEmployeur, cotisationsPatronales, tranche2Active: tranche2 > 0 };
}

const REPERES = [
  { label: "SMIC (1802€)", val: 1802 },
  { label: "Médian (2500€)", val: 2500 },
  { label: "Cadre (4500€)", val: 4500 },
  { label: "Senior (7000€)", val: 7000 },
];

export default function FichePaie() {
  const [brut, setBrut] = useState(2500);
  const [cadre, setCadre] = useState(false);
  const [detailOuvert, setDetailOuvert] = useState(false);
  const [ligneOuverte, setLigneOuverte] = useState(null);

  const r = useMemo(() => calculerSalaire(brut, cadre), [brut, cadre]);
  const pctNet = Math.round((r.netPaye / r.brut) * 100);
  const pctCotis = Math.round((r.cotisations / r.brut) * 100);
  const pctImpot = 100 - pctNet - pctCotis;

  const retenuesSalariales = r.cotisations + r.impot;
  const pctNetEmployeur = Math.round((r.netPaye / r.coutEmployeur) * 100);
  const pctRetenues = Math.round((retenuesSalariales / r.coutEmployeur) * 100);
  const pctPatronales = 100 - pctNetEmployeur - pctRetenues;

  return (
    <div data-testid="fiche-paie-page" className="pb-24">
      <div className="container-md pt-8">
        <Link to="/ressources" className="inline-flex items-center gap-2 font-body text-sm text-navy/60 hover:text-navy">
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>

      <section className="pt-8 pb-8 max-w-3xl">
        <div className="container-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-4xl">📄</div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Comprendre son salaire</span>
            <h1 className="font-heading text-4xl md:text-5xl text-navy mt-4 leading-[1.05]">Lire une fiche de paie sans paniquer.</h1>
            <p className="font-body text-lg text-navy/70 mt-6 leading-relaxed">
              Une trentaine de lignes, des sigles partout, et personne ne t'a jamais expliqué à quoi ça sert. On reprend chaque ligne, une par une.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container-md max-w-3xl">
          <p className="font-body text-sm text-navy/60 leading-relaxed">
            Entre ton propre salaire brut ci-dessous : le calcul se met à jour en direct. Les taux utilisés sont des ordres de grandeur pédagogiques : ils varient selon ton statut (cadre ou non-cadre), ta convention collective et l'année en cours. Le détail ligne par ligne juste en dessous reste sur l'exemple à 2 500 € pour comprendre chaque poste.
          </p>

          <div className="bg-white rounded-[2rem] p-8 mt-8 border border-navy/5">
            <div className="font-body text-xs uppercase tracking-widest text-navy/50">Ton salaire brut mensuel</div>
            <div className="flex items-baseline gap-2 mt-2">
              <input
                type="number"
                value={brut}
                min={1500}
                max={15000}
                step={50}
                onChange={(e) => setBrut(Math.max(1500, Math.min(15000, parseInt(e.target.value, 10) || 1500)))}
                className="font-heading text-4xl text-navy border-b-2 border-navy/20 bg-transparent w-40 focus:outline-none focus:border-navy"
              />
              <span className="font-body text-navy/50">€ / mois</span>
            </div>
            <input
              type="range"
              min={1500}
              max={8000}
              step={50}
              value={Math.min(brut, 8000)}
              onChange={(e) => setBrut(parseInt(e.target.value, 10))}
              className="w-full mt-4 accent-navy"
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {REPERES.map((rp) => (
                <button key={rp.label} onClick={() => setBrut(rp.val)}
                  className="text-xs font-body px-3 py-1.5 rounded-full bg-cream border border-navy/10 text-navy/70 hover:border-navy/30">
                  {rp.label}
                </button>
              ))}
            </div>
            <div className="flex mt-5 bg-cream rounded-full p-1 max-w-xs">
              <button onClick={() => setCadre(false)}
                className={`flex-1 rounded-full py-2 font-body text-sm font-semibold ${!cadre ? "bg-navy text-cream" : "text-navy/50"}`}>
                Non-cadre
              </button>
              <button onClick={() => setCadre(true)}
                className={`flex-1 rounded-full py-2 font-body text-sm font-semibold ${cadre ? "bg-navy text-cream" : "text-navy/50"}`}>
                Cadre
              </button>
            </div>
          </div>

          {/* Barre de répartition brut → net */}
          <div className="flex rounded-full overflow-hidden h-8 mt-6 font-body text-xs font-semibold text-white">
            <div style={{ width: `${pctNet}%` }} className="bg-teal-600 flex items-center justify-center">{pctNet}%</div>
            <div style={{ width: `${pctCotis}%` }} className="bg-amber-500 text-navy flex items-center justify-center">{pctCotis}%</div>
            {pctImpot > 3 && <div style={{ width: `${Math.max(pctImpot, 0)}%` }} className="bg-navy flex items-center justify-center">{pctImpot}%</div>}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 font-body text-xs text-navy/60">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600" />Net payé ({euros(r.netPaye)})</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Cotisations salariales ({euros(r.cotisations)})</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy" />Impôt estimé ({euros(r.impot)})</div>
          </div>

          <div className="bg-navy text-cream rounded-[1.5rem] p-6 mt-6">
            <div className="font-body text-xs uppercase tracking-widest text-cream/60">Ce qui arrive vraiment sur ton compte</div>
            <div className="font-heading text-4xl mt-1">{euros(r.netPaye)}</div>
            <div className="font-body text-sm text-cream/70 mt-1">
              soit environ {pctNet}&nbsp;% de ton salaire brut · coût employeur réel ≈ {euros(r.coutEmployeur)}
              {r.tranche2Active ? " · une partie de ton salaire dépasse le plafond de la Sécu (tranche 2)" : ""}
            </div>
          </div>

          <button onClick={() => setDetailOuvert((o) => !o)} className="mt-6 font-body text-sm font-semibold text-navy underline">
            {detailOuvert ? "Masquer le détail ligne par ligne ↑" : "Voir le détail ligne par ligne ↓"}
          </button>

          {detailOuvert && (
            <div className="mt-4 space-y-6">
              {FICHE_PAIE_SECTIONS.map((section, si) => (
                <div key={section.titre}>
                  <div className="font-body text-xs uppercase tracking-widest text-navy/50 mb-2">{section.titre}</div>
                  {section.lignes.map((ligne, li) => {
                    const key = `${si}-${li}`;
                    const ouvert = ligneOuverte === key;
                    return (
                      <div key={key}
                        onClick={() => setLigneOuverte(ouvert ? null : key)}
                        className={`bg-white border border-navy/10 rounded-xl p-4 mb-2 cursor-pointer ${ligne.type === "final" ? "border-brick/30 bg-brick/5" : ""}`}>
                        <div className="flex items-center justify-between gap-3 font-body text-sm">
                          <span className="text-navy font-medium">{ligne.libelle}</span>
                          {ligne.taux && <span className="text-navy/40 text-xs">{ligne.taux}</span>}
                          <span className="text-navy font-semibold ml-auto">{ligne.montant}</span>
                        </div>
                        {ouvert && <div className="font-body text-xs text-navy/60 mt-2 leading-relaxed">{ligne.desc}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          <div className="bg-cream border border-navy/10 rounded-xl px-4 py-3 mt-6 font-body text-sm text-navy/70">
            🔗 Pour une estimation encore plus précise et personnalisée (enfants, situation familiale, région) :{" "}
            <a href="https://code.travail.gouv.fr/outils/simulateur-embauche" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold underline inline-flex items-center gap-1">
              Simulateur officiel du Ministère du Travail <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Coût employeur */}
      <section className="mt-16">
        <div className="container-md max-w-3xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Ce que ta fiche de paie ne montre jamais</span>
          <h2 className="font-heading text-2xl text-navy mt-2">Ce que ton employeur paie réellement</h2>
          <p className="font-body text-sm text-navy/60 mt-3 leading-relaxed">
            Au-dessus de ton salaire brut, ton employeur verse aussi des <strong>cotisations patronales</strong> : elles n'apparaissent sur aucune fiche de paie, mais elles représentent une part importante du budget consacré à ton poste.
          </p>

          <div className="bg-white rounded-[1.5rem] p-6 mt-6 border border-navy/10">
            <div className="font-body text-xs uppercase tracking-widest text-navy/50">Coût total pour l'employeur, chaque mois pour un brut de {euros(r.brut)}</div>
            <div className="font-heading text-3xl text-navy mt-1">≈ {euros(r.coutEmployeur)}</div>
          </div>

          <div className="flex rounded-full overflow-hidden h-8 mt-4 font-body text-xs font-semibold text-white">
            <div style={{ width: `${pctNetEmployeur}%` }} className="bg-teal-600 flex items-center justify-center">{pctNetEmployeur}%</div>
            <div style={{ width: `${pctRetenues}%` }} className="bg-amber-500 text-navy flex items-center justify-center">{pctRetenues}%</div>
            <div style={{ width: `${pctPatronales}%` }} className="bg-navy flex items-center justify-center">{pctPatronales}%</div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 font-body text-xs text-navy/60">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600" />Net payé au salarié ({euros(r.netPaye)})</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Cotisations salariales + impôt ({euros(retenuesSalariales)})</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy" />Cotisations patronales, invisibles sur la fiche ({euros(r.cotisationsPatronales)})</div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mt-6 font-body text-sm text-navy/70 leading-relaxed">
            Sur les <strong>≈ {euros(r.coutEmployeur)}</strong> réellement dépensés par l'employeur chaque mois pour ce poste, environ <strong>{pctNetEmployeur}&nbsp;%</strong> arrivent effectivement dans la poche du salarié en net payé. Le reste finance les cotisations salariales, l'impôt, et les cotisations patronales invisibles sur la fiche de paie : retraite, santé, formation professionnelle, accidents du travail, allocations familiales, et bien d'autres.
          </div>
        </div>
      </section>

      {/* Grille apprentis */}
      <section className="mt-16">
        <div className="container-md max-w-3xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Tu es en apprentissage ou tu y penses ?</span>
          <h2 className="font-heading text-2xl text-navy mt-2">La grille de salaire des apprentis</h2>
          <p className="font-body text-sm text-navy/60 mt-3 leading-relaxed">
            Contrairement au salarié classique, le salaire minimum d'un·e apprenti·e est fixé par la loi selon deux critères seulement : ton âge et l'année d'exécution de ton contrat. Le diplôme préparé n'y change rien.
          </p>

          <div className="mt-6 bg-white rounded-[1.5rem] border border-navy/10 overflow-hidden">
            <div className="grid grid-cols-4 bg-navy text-cream font-body text-xs font-semibold">
              <div className="p-3">Âge à la signature</div>
              <div className="p-3 text-center">1re année</div>
              <div className="p-3 text-center">2e année</div>
              <div className="p-3 text-center">3e année</div>
            </div>
            {GRILLE_APPRENTI.map((t) => (
              <div key={t.tranche} className="grid grid-cols-4 border-t border-navy/5 font-body text-sm">
                <div className="p-3 text-navy">{t.tranche}</div>
                {t.pourcentages.map((pct, i) => (
                  <div key={i} className="p-3 text-center">
                    <div className="text-navy font-semibold">{pct}&nbsp;%</div>
                    <div className="text-navy/50 text-xs">{Math.round((SMIC_REFERENCE_2026 * pct) / 100)}&nbsp;€/mois</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-6 font-body text-sm text-navy/70 leading-relaxed">
            Pour la plupart des apprenti·es, le salaire net est très proche du brut, grâce à des exonérations de cotisations. Le salaire est aussi <strong>exonéré d'impôt sur le revenu</strong> jusqu'à un certain plafond annuel.
          </div>

          <p className="font-body text-xs text-navy/45 mt-4 leading-relaxed">
            Grille pédagogique et indicative, basée sur un SMIC brut mensuel de référence à {SMIC_REFERENCE_2026.toFixed(2).replace(".", ",")} €. Il s'agit de <strong>minimums légaux</strong> : ta convention collective ou ton employeur peuvent prévoir davantage. Pour ta situation exacte, utilise le{" "}
            <a href="https://labonnealternance.apprentissage.beta.gouv.fr/salaire-alternant" target="_blank" rel="noopener noreferrer" className="text-navy underline">simulateur officiel du ministère du Travail</a>.
          </p>
        </div>
      </section>

      {/* Concepts / FAQ */}
      <section className="mt-16">
        <div className="container-md max-w-3xl">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-brick">Les questions qu'on se pose toutes et tous</span>
          <h2 className="font-heading text-2xl text-navy mt-2">Ce que peu de gens expliquent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {CONCEPTS.map((c) => (
              <div key={c.titre} className="bg-white rounded-[1.5rem] p-6 border border-navy/5">
                <div className="text-2xl">{c.emoji}</div>
                <h3 className="font-heading text-lg text-navy mt-3">{c.titre}</h3>
                <p className="font-body text-sm text-navy/60 mt-2 leading-relaxed">{c.txt}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-navy/45 mt-6 leading-relaxed">
            Cet exemple est une reconstitution pédagogique, pas un document officiel. Les taux réels figurent sur ta propre fiche de paie et peuvent différer selon ta situation. En cas de doute sur une ligne précise, ton service RH ou un conseiller du{" "}
            <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer" className="text-navy underline">service public</a> peut te répondre précisément.
          </p>
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
