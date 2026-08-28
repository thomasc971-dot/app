from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os, json, logging, unicodedata, re
from pathlib import Path
from typing import Optional, List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Moi Demain API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def slugify(text: str) -> str:
    t = unicodedata.normalize('NFKD', text or '').encode('ascii', 'ignore').decode('ascii')
    t = re.sub(r'[^a-zA-Z0-9]+', '-', t).strip('-').lower()
    return t or 'item'


# ---------- SEED ----------
async def seed_data():
    """Load source_data.json (extracted from HTML v145) and seed MongoDB once."""
    marker = await db.meta.find_one({"_id": "seeded_v1"})
    if marker:
        logger.info("DB already seeded, skipping")
        return

    src_path = ROOT_DIR / 'source_data.json'
    if not src_path.exists():
        logger.warning("source_data.json missing — no seed performed")
        return

    with open(src_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # SOUS_FAMILLES = { secteur_id: [ {id, label, desc, postes:[...]} ] }
    sous_familles = data.get('SOUS_FAMILLES', {})
    secteur_labels = data.get('SECTEUR_LABELS', {})
    secteur_info = data.get('SECTEUR_INFO', {})

    metiers_docs = []
    secteurs_docs = []
    for sect_id, familles in sous_familles.items():
        sect_label = secteur_labels.get(sect_id, sect_id)
        sect_desc = (secteur_info.get(sect_id, {}) or {}).get('desc', '')
        sect_metiers_count = 0
        for famille in familles:
            fam_id = famille.get('id')
            fam_label = famille.get('label', '')
            for poste in famille.get('postes', []):
                sect_metiers_count += 1
                slug = slugify(f"{sect_id}-{poste.get('nom','')}")
                metier = {
                    "_id": slug,
                    "slug": slug,
                    "nom": poste.get('nom', ''),
                    "secteur_id": sect_id,
                    "secteur_label": sect_label,
                    "famille_id": fam_id,
                    "famille_label": fam_label,
                    "salaireDebutant": poste.get('salaireDebutant'),
                    "formations": poste.get('formations', []),
                    "sourceExterne": poste.get('sourceExterne'),
                    "evolution": poste.get('evolution', []),
                    "scene": poste.get('scene'),
                    "insight": poste.get('insight'),
                    "marche": poste.get('marche'),
                    "tensionScore": poste.get('tensionScore'),
                    "motsCles": poste.get('motsCles', []),
                    "missions": poste.get('missions', []),
                    "variabilite": poste.get('variabilite'),
                    "hierarchie": poste.get('hierarchie'),
                    "contexteEvolution": poste.get('contexteEvolution'),
                    "diplome": poste.get('diplome'),
                    "experience": poste.get('experience'),
                    "competencesTech": poste.get('competencesTech', []),
                    "softSkillsNote": poste.get('softSkillsNote'),
                    "remunerationTexte": poste.get('remunerationTexte'),
                    "evolutionsPossibles": poste.get('evolutionsPossibles', []),
                    "metiersPrecedents": poste.get('metiersPrecedents', []),
                }
                metiers_docs.append(metier)
        secteurs_docs.append({
            "_id": sect_id,
            "label": sect_label,
            "desc": sect_desc,
            "count": sect_metiers_count
        })

    if secteurs_docs:
        await db.secteurs.delete_many({})
        await db.secteurs.insert_many(secteurs_docs)
    if metiers_docs:
        await db.metiers.delete_many({})
        await db.metiers.insert_many(metiers_docs)
        await db.metiers.create_index("secteur_id")
        await db.metiers.create_index([("nom", "text"), ("motsCles", "text"), ("secteur_label", "text")])

    # Etablissements
    etabs_raw = data.get('ETABLISSEMENTS_REELS', {})
    etab_docs = []
    if isinstance(etabs_raw, dict):
        for key, arr in etabs_raw.items():
            if isinstance(arr, list):
                for e in arr:
                    e2 = dict(e)
                    e2['_id'] = slugify(f"{key}-{e.get('nom','')}-{e.get('ville','')}")
                    e2['categorie'] = key
                    etab_docs.append(e2)
    if etab_docs:
        await db.etablissements.delete_many({})
        await db.etablissements.insert_many(etab_docs)

    # Store misc dicts as single documents
    misc_keys = ['TTV_QUIZ', 'TTV_SITUATIONS', 'TTV_NIVEAU_DEPUIS_SITUATION', 'MINISIM_DATA',
                 'GRANDES_VILLES_FR', 'FAQ_QUESTIONS', 'AIDES_LISTE', 'AIDES_CATEGORIES',
                 'DESTINATIONS_EXPAT', 'RIASEC_LABELS', 'RIASEC_INFO', 'ORGANISMES_RECRUTEMENT',
                 'MOBILITE_VILLES', 'HERO_TEXTE_STANDARD', 'DISPOSITIFS_EXPAT',
                 'SECTEUR_LABELS', 'SECTEUR_INFO']
    misc_docs = [{"_id": k, "data": data.get(k)} for k in misc_keys if k in data]
    if misc_docs:
        await db.reference.delete_many({})
        await db.reference.insert_many(misc_docs)

    await db.meta.insert_one({"_id": "seeded_v1", "metiers": len(metiers_docs),
                              "secteurs": len(secteurs_docs), "etabs": len(etab_docs)})
    logger.info(f"Seeded {len(metiers_docs)} métiers, {len(secteurs_docs)} secteurs, {len(etab_docs)} etabs")


@app.on_event("startup")
async def on_startup():
    try:
        await seed_data()
    except Exception as e:
        logger.exception(f"Seed failed: {e}")


@app.on_event("shutdown")
async def shutdown():
    client.close()


# ---------- ROUTES ----------
@api_router.get("/")
async def root():
    stats = await db.meta.find_one({"_id": "seeded_v1"}) or {}
    return {"app": "Moi Demain", "version": "1.0",
            "metiers": stats.get("metiers", 0),
            "secteurs": stats.get("secteurs", 0)}


def clean(doc):
    if doc is None: return None
    if isinstance(doc, list): return [clean(x) for x in doc]
    if isinstance(doc, dict): return {k: clean(v) for k, v in doc.items() if k != "_id" or True}
    return doc


@api_router.get("/secteurs")
async def list_secteurs():
    docs = await db.secteurs.find({}).to_list(500)
    for d in docs: d['id'] = d.pop('_id')
    return docs


@api_router.get("/metiers")
async def list_metiers(
    secteur: Optional[str] = None,
    q: Optional[str] = Query(None, description="Recherche texte"),
    limit: int = 500,
    skip: int = 0
):
    filt = {}
    if secteur and secteur != "tous":
        filt["secteur_id"] = secteur
    if q:
        rx = re.compile(re.escape(q), re.I)
        filt["$or"] = [{"nom": rx}, {"motsCles": rx}, {"secteur_label": rx}]
    cursor = db.metiers.find(filt, {"_id": 0, "slug": 1, "nom": 1, "secteur_id": 1,
                                     "secteur_label": 1, "salaireDebutant": 1, "motsCles": 1,
                                     "tensionScore": 1, "insight": 1}).skip(skip).limit(limit)
    docs = await cursor.to_list(limit)
    total = await db.metiers.count_documents(filt)
    return {"total": total, "items": docs}


@api_router.get("/metiers/{slug}")
async def get_metier(slug: str):
    doc = await db.metiers.find_one({"_id": slug})
    if not doc:
        raise HTTPException(404, "Métier not found")
    doc.pop('_id', None)
    # related métiers same secteur
    related = await db.metiers.find(
        {"secteur_id": doc.get("secteur_id"), "slug": {"$ne": slug}},
        {"_id": 0, "slug": 1, "nom": 1, "salaireDebutant": 1}
    ).limit(6).to_list(6)
    doc['related'] = related
    return doc


@api_router.get("/reference/{key}")
async def get_reference(key: str):
    doc = await db.reference.find_one({"_id": key})
    if not doc:
        raise HTTPException(404, "Reference not found")
    return doc.get("data")


@api_router.get("/simulation/preview")
async def sim_preview(metier: str, ville: str = "moyenne"):
    """Quick budget preview for homepage mini-sim."""
    # Fetch cost-of-living reference
    minisim = (await db.reference.find_one({"_id": "MINISIM_DATA"}) or {}).get("data", {})
    doc = await db.metiers.find_one({"_id": metier}, {"nom": 1, "salaireDebutant": 1})
    if not doc:
        raise HTTPException(404, "Métier inconnu")
    salaire_brut_k = doc.get('salaireDebutant', 24)
    salaire_net_mois = int((salaire_brut_k * 1000 * 0.78) / 12)
    villes_costs = (minisim.get('villes') or minisim.get('cities') or {}) if isinstance(minisim, dict) else {}
    cost = villes_costs.get(ville) or villes_costs.get('moyenne') or {"rent": 500, "transport": 55, "food": 360}
    logement = cost.get('rent', 500)
    autres = cost.get('transport', 55) + cost.get('food', 360)
    reste = salaire_net_mois - logement - autres
    return {
        "metier": doc.get('nom'),
        "ville": ville,
        "salaire_net_mois": salaire_net_mois,
        "logement": logement,
        "vie_courante": autres,
        "reste_a_vivre": max(reste, 0)
    }


@api_router.get("/ressources")
async def ressources():
    """Curated resources from AIDES + DESTINATIONS + FAQ topics."""
    aides = (await db.reference.find_one({"_id": "AIDES_LISTE"}) or {}).get("data", [])
    faq = (await db.reference.find_one({"_id": "FAQ_QUESTIONS"}) or {}).get("data", [])
    return {"aides": aides if isinstance(aides, list) else [],
            "faq": faq if isinstance(faq, list) else []}


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware, allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"], allow_headers=["*"],
)
