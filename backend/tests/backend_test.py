"""Backend API tests for Moi Demain V1"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://demain-redesign.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_info(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        d = r.json()
        assert d.get("app") == "Moi Demain"
        assert d.get("metiers") == 100
        assert d.get("secteurs") == 12


# ---------- Secteurs ----------
class TestSecteurs:
    def test_list_secteurs(self, client):
        r = client.get(f"{API}/secteurs")
        assert r.status_code == 200
        docs = r.json()
        assert isinstance(docs, list)
        assert len(docs) == 12
        ids = {d["id"] for d in docs}
        expected = {"tech", "sante", "btp", "commerce", "agriculture",
                    "artisanat", "public", "finance", "education",
                    "culture", "tourisme", "psychologie"}
        assert expected.issubset(ids), f"Missing: {expected - ids}"
        for d in docs:
            assert "label" in d and "desc" in d and "count" in d
            assert isinstance(d["count"], int)


# ---------- Métiers list ----------
class TestMetiersList:
    def test_all_metiers(self, client):
        r = client.get(f"{API}/metiers", params={"limit": 500})
        assert r.status_code == 200
        d = r.json()
        assert d["total"] == 100
        assert len(d["items"]) == 100
        it = d["items"][0]
        for k in ("slug", "nom", "secteur_id", "secteur_label", "salaireDebutant", "motsCles", "tensionScore",
                  "famille_id", "famille_label", "formations"):
            assert k in it, f"missing key {k} in items"
        # New enriched fields
        assert it["famille_id"] is not None
        assert isinstance(it["famille_label"], str) and it["famille_label"]
        assert isinstance(it["formations"], list)

    def test_filter_tech(self, client):
        r = client.get(f"{API}/metiers", params={"secteur": "tech", "limit": 500})
        assert r.status_code == 200
        d = r.json()
        assert d["total"] == 13, f"expected 13 tech métiers, got {d['total']}"
        assert all(i["secteur_id"] == "tech" for i in d["items"])

    def test_filter_sante(self, client):
        r = client.get(f"{API}/metiers", params={"secteur": "sante", "limit": 500})
        assert r.status_code == 200
        d = r.json()
        assert d["total"] == 11, f"expected 11 santé métiers, got {d['total']}"
        assert all(i["secteur_id"] == "sante" for i in d["items"])

    def test_text_search_psychologue(self, client):
        r = client.get(f"{API}/metiers", params={"q": "psychologue"})
        assert r.status_code == 200
        d = r.json()
        assert d["total"] >= 1
        # verify at least one match contains substring
        blob = " ".join(str(i).lower() for i in d["items"])
        assert "psycholog" in blob

    def test_filter_unknown_sector(self, client):
        r = client.get(f"{API}/metiers", params={"secteur": "tousfake"})
        assert r.status_code == 200
        d = r.json()
        assert d["total"] == 0
        assert d["items"] == []


# ---------- Métier detail ----------
class TestMetierDetail:
    def test_get_metier(self, client):
        r = client.get(f"{API}/metiers/tech-developpeurse-web")
        assert r.status_code == 200, r.text
        d = r.json()
        assert d.get("slug") == "tech-developpeurse-web"
        assert "_id" not in d
        for k in ("missions", "scene", "competencesTech", "diplome", "evolution", "related"):
            assert k in d, f"missing field {k}"
        assert isinstance(d["related"], list)
        assert len(d["related"]) == 6
        for rel in d["related"]:
            assert "slug" in rel and "nom" in rel

    def test_get_metier_404(self, client):
        r = client.get(f"{API}/metiers/inexistant")
        assert r.status_code == 404


# ---------- Reference ----------
class TestReference:
    def test_ttv_quiz(self, client):
        r = client.get(f"{API}/reference/TTV_QUIZ")
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d, (list, dict))
        assert d

    def test_minisim_data(self, client):
        r = client.get(f"{API}/reference/MINISIM_DATA")
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d, (list, dict))
        assert d

    def test_faq(self, client):
        r = client.get(f"{API}/reference/FAQ_QUESTIONS")
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d, list)

    def test_ref_unknown_404(self, client):
        r = client.get(f"{API}/reference/UNKNOWN")
        assert r.status_code == 404


# ---------- Simulation ----------
class TestSimulation:
    def test_preview_paris(self, client):
        r = client.get(f"{API}/simulation/preview",
                       params={"metier": "tech-developpeurse-web", "ville": "paris"})
        assert r.status_code == 200, r.text
        d = r.json()
        for k in ("metier", "ville", "salaire_net_mois", "logement", "vie_courante", "reste_a_vivre"):
            assert k in d
        assert isinstance(d["salaire_net_mois"], int)
        assert isinstance(d["logement"], int)
        assert isinstance(d["vie_courante"], int)
        assert isinstance(d["reste_a_vivre"], int)
        assert isinstance(d["ville"], str)
        assert isinstance(d["metier"], str)

    def test_preview_fallback_moyenne(self, client):
        r = client.get(f"{API}/simulation/preview",
                       params={"metier": "tech-developpeurse-web", "ville": "moyenne"})
        assert r.status_code == 200
        d = r.json()
        assert d["salaire_net_mois"] > 0

    def test_preview_404(self, client):
        r = client.get(f"{API}/simulation/preview", params={"metier": "inexistant"})
        assert r.status_code == 404


# ---------- Ressources ----------
class TestRessources:
    def test_ressources(self, client):
        r = client.get(f"{API}/ressources")
        assert r.status_code == 200
        d = r.json()
        assert "aides" in d and "faq" in d
        assert isinstance(d["aides"], list)
        assert isinstance(d["faq"], list)
