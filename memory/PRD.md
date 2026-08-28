# Moi Demain — Product Requirements Document (V1)

## Original problem statement (résumé)
Refonte UX/UI complète de "Moi Demain", plateforme française d'orientation professionnelle intergénérationnelle (13-25 ans, étudiants, jeunes actifs, salariés, reconversion). Reconstruction en React + FastAPI + MongoDB à partir du HTML v145 (source de vérité). Direction UX/UI éditoriale/premium/humaine inspirée à 80% du prototype 1 (authentic-ui-1), à 20% du prototype 2 (future-path-app-2).

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + shadcn/ui + React Router v7
- **Backend**: FastAPI + Motor (MongoDB async)
- **Data**: 100 métiers extraits du HTML v145 → MongoDB seedé au démarrage via `source_data.json`
- **Design System**:
  - Palette: Navy #1E3A8A (dominante) / Brick #B85C5C (accent) / Cream #FAF8F5 (fond) / Teal secondaire discret
  - Typo: Fraunces (titres + italique expressif) / Manrope (corps) / Caveat (logo "moi")
  - Composants: floating cards (rounded 2rem), pill filters, timeline éditoriale, accordions, split hero éditorial

## User personas
- Ado/collégien qui découvre l'orientation
- Lycéen/étudiant qui cherche sa voie
- Jeune actif qui doute
- Salarié qui envisage reconversion
- Curieux intergénérationnel

## Core requirements (statiques)
1. Contenu 100% conservé (métiers, secteurs, quiz, simulation, ressources du HTML v145)
2. Palette bleu marine + rouge brique + crème verrouillée
3. Fraunces + Manrope verrouillées
4. Aucune intégration tierce en V1 (architecture prête pour auth/LLM plus tard)
5. Mobile-first réel (375/390/768/1024/1440+)
6. Positionnement intergénérationnel visible dans images/textes
7. Ton humain "je découvre" vs "base de données"

## What's implemented (2026-02-27)
### Backend (FastAPI + MongoDB)
- ✅ Seed automatique depuis `source_data.json` (100 métiers, 12 secteurs, 20+ blocs de référence)
- ✅ `/api/` — statut
- ✅ `/api/secteurs` — 12 secteurs avec compte de métiers
- ✅ `/api/metiers` — liste filtrée (secteur, recherche texte) + pagination
- ✅ `/api/metiers/{slug}` — fiche détaillée + 6 métiers reliés du même secteur
- ✅ `/api/reference/{key}` — TTV_QUIZ, MINISIM_DATA, FAQ, AIDES, etc.
- ✅ `/api/simulation/preview` — calcul budget mini
- ✅ `/api/ressources` — aides + FAQ
- ✅ 17/17 tests backend passent (voir `/app/backend/tests/backend_test.py`)

### Frontend
- ✅ **Logo** custom (Caveat "moi" + Manrope "demain" + point brick)
- ✅ **Header** sticky glassmorphism + menu mobile
- ✅ **Homepage**: Hero éditorial (2 photos + floating stat card), 3 entrées expériences (Simulation / Trouve ta voie / Annuaire), Raison d'être en navy avec photos, Mini-simulation live, Ressources cards, CTA final navy
- ✅ **Annuaire métiers**: recherche, filtres pill par secteur, grille cards (nom Fraunces, salaire, mots-clés, tension marché)
- ✅ **Fiche métier**: hero + sidebar sticky (salaire/tension/marché), timeline "Une journée au quotidien" avec accroche italique, imprévu en brick, missions grid, accordions (compétences, études, évolution, contexte, variabilité), métiers reliés
- ✅ **Trouve ta voie**: quiz 4 questions avec progress bar + résultat profil RIASEC + secteurs recommandés
- ✅ **Simulation**: 3 blocs config (métier / ville / rythme) + fiche résultat navy sticky avec calcul en direct
- ✅ **Ressources & À propos**: placeholders navigables cohérents avec le Design System
- ✅ **Footer**

## Backlog / non fait en V1
### P1 (prochaine itération)
- Enrichir Ressources : fiches paie détaillées, guide bourses, expatriation (contenu du HTML v145 déjà en base via `/api/reference`)
- Formations & établissements : pages annuaire complètes (données déjà seedées)
- Simulation carrière complète (7-9 étapes narratives, aléas, bilan final chiffré)
- Ajouter un vrai `quiz de compatibilité` par métier (données QUIZ_METIER déjà en base)
- Recherche globale multi-collections

### P2
- Compte utilisateur (JWT ou Google Auth Emergent) + sauvegarde parcours/favoris
- Éventuellement IA d'orientation (Claude Sonnet) branchée sur les vraies données Moi Demain
- Partage sur réseaux sociaux d'un résultat de simulation
- Fiche métier PDF exportable

## Files touched
- `/app/backend/server.py` — API + seed
- `/app/backend/source_data.json` — 825 KB de données extraites du HTML v145
- `/app/frontend/src/App.js` — router
- `/app/frontend/tailwind.config.js` — tokens design system (fonts, colors, radius)
- `/app/frontend/src/index.css` — fonts Google + CSS vars
- `/app/frontend/src/lib/api.js` — client axios
- `/app/frontend/src/components/{Logo,Header,Footer}.jsx`
- `/app/frontend/src/pages/{Home,Metiers,MetierDetail,TrouveTaVoie,Simulation,Placeholder}.jsx`
- `/app/backend/tests/backend_test.py` — 17 tests pytest

## Test credentials
Aucun compte utilisateur en V1. Site navigable en accès libre.
