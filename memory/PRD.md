# Moi Demain — PRD (V1.2)

## Statut
V1 livrée. V1.1 (2026-02-27) : ajustements UX/UI post-feedback utilisateur.

## Architecture
React 19 + Framer Motion + shadcn/ui + Tailwind + FastAPI + MongoDB + Motor.

## Palette & typo (verrouillées)
Navy #1E3A8A (dominante), Brick #B85C5C (accent parcimonieux), Cream #FAF8F5 (fond).
Fraunces (titres + italique expressif), Manrope (corps), Caveat (script pour annotations manuscrites + tagline logo).

## Assets
- `/img/logo.jpg` — logo officiel Moi Demain fourni par l'utilisateur (recadré 1407×649)
- `/img/hero-clay.png` — illustration 3D clay intergénérationnelle (père + adolescent + adolescente)
- `/backend/source_data.json` — 100 métiers + 12 secteurs + 20 blocs de référence extraits du HTML v145

## User personas
Ado / lycéen / étudiant / jeune actif qui doute / salarié en reconversion / curieux intergénérationnel.

## Ce qui est implémenté (V1.1, 2026-02-27)
### Backend
- ✅ Seed automatique 100 métiers + 12 secteurs + 17 aides + 5 FAQ + tables de référence
- ✅ 7 endpoints REST : `/api/`, `/api/secteurs`, `/api/metiers` (filtrable/recherche), `/api/metiers/{slug}`, `/api/reference/{key}`, `/api/simulation/preview`, `/api/ressources`
- ✅ 17/17 tests pytest passent (regressed testé 2 fois)

### Frontend
- ✅ **Logo image officiel** dans header et footer (avec mix-blend-mode multiply pour se fondre sur cream)
- ✅ **Header** sticky glassmorphism + menu mobile hamburger
- ✅ **Homepage** :
  - Hero avec illustration 3D clay intergénérationnelle + 2 cartes flottantes (100 métiers / Budget réel) + annotation manuscrite Caveat "essaie-le, pour de vrai"
  - Section 3 expériences (Navy / Brick / Blanc avec halo au hover)
  - Notre raison d'être en Navy avec 2 photos éditoriales (femme au tableau + reconversion) + annotation manuscrite "à tout âge"
  - Mini-simulation LIVE (métier + ville → salaire net + budget + reste à vivre) avec badge "Live"
  - Ressources 3 cartes
  - CTA final avec annotation manuscrite "on t'attend"
- ✅ **Footer 4 colonnes** : brand + tagline manuscrit "Explorer. Décider. Construire demain." / Explorer / Le projet / Rester en lien (email + réseaux sociaux) + signature "à demain 👋"
- ✅ **Annuaire métiers** : recherche + filtres pill par secteur + 100 cartes floating (nom Fraunces, salaire, mots-clés, tension marché)
- ✅ **Fiche métier** : hero + sidebar sticky (salaire/tension/marché) + timeline "Une journée au quotidien" avec accroche italique + imprévu en brick + missions grid + accordions (compétences/études/évolution/contexte/variabilité) + 6 métiers reliés + décodage HTML entités
- ✅ **Trouve ta voie** : quiz 4 questions avec progress bar + profil RIASEC + secteurs recommandés + refaire
- ✅ **Simulation** : 3 blocs config (métier / ville / rythme fourmi-équilibre-cigale) + fiche résultat navy sticky avec breakdown en direct
- ✅ **Ressources & À propos** : placeholders navigables cohérents avec DS
- ✅ **Micro-interactions** : hover lift sur cartes, arrow slide, image hover-scale, halo au survol des experience cards, entrance animations décalées

### Design System
- Espacements réduits (py-16 md:py-24 au lieu de py-24 md:py-32) pour éviter l'effet "vide magazine"
- Fraunces italic léger pour mise en valeur ponctuelle
- Annotations manuscrites Caveat éparses (hero, raison-d'être, CTA final, footer)
- Radius 1.75rem (cards) / 2rem (grand blocs) / rounded-full (buttons/badges)
- Ombres douces navy 8% / 12% / 25%

## Backlog V2
### P1
- Enrichir Ressources : longs formats fiche de paie / bourses / expatriation (data déjà dans `/api/reference`)
- Formations & Établissements : pages annuaire (data seedée)
- Simulation carrière narrative complète (7-9 étapes + aléas + bilan final chiffré)
- Quiz de compatibilité par métier (data QUIZ_METIER déjà en base)
- Recherche globale multi-collections

### P2
- Compte utilisateur (JWT ou Google Auth Emergent) + sauvegarde parcours/favoris
- IA d'orientation (Claude Sonnet) branchée sur les vraies données Moi Demain
- Partage résultats simulation
- Fiche métier PDF exportable

## Test credentials
Aucun compte utilisateur en V1. Site en accès libre.

## Fichiers principaux
- `/app/backend/server.py` — API + seed
- `/app/backend/source_data.json` — 825 KB données HTML v145
- `/app/backend/tests/backend_test.py` — 17 tests
- `/app/frontend/src/App.js`
- `/app/frontend/tailwind.config.js`
- `/app/frontend/src/index.css`
- `/app/frontend/src/lib/api.js`
- `/app/frontend/src/components/{Logo,Header,Footer}.jsx`
- `/app/frontend/src/pages/{Home,Metiers,MetierDetail,TrouveTaVoie,Simulation,Placeholder}.jsx`
- `/app/frontend/public/img/{logo.jpg,hero-clay.png}`
