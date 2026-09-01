import json

with open('source_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

nouveaux_postes_voyage = [
    {
        "nom": "Guide-conférencier·ère",
        "salaireDebutant": 23,
        "formations": [
            "Licence professionnelle Guide-conférencier",
            "Carte professionnelle de guide-conférencier (obligatoire)"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/guide-conferencier-guide-conferenciere"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 23},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 30},
            {"niveau": "Spécialisé·e / Formateur·rice", "salaire": 40}
        ],
        "motsCles": ["Patrimoine", "Langues", "Culture", "Musées", "Groupes", "Histoire de l'art"],
        "missions": [
            {"icone": "🏛️", "titre": "Préparer une visite", "texte": "Rechercher et actualiser le contenu historique et culturel d'un site, d'un musée ou d'un monument, pour construire un récit vivant et accessible."},
            {"icone": "🗣️", "titre": "Animer un groupe", "texte": "Guider des visiteurs de tous horizons, adapter son discours selon l'âge et les attentes du public (scolaires, touristes étrangers, groupes VIP)."},
            {"icone": "🌍", "titre": "Traduire et interpréter", "texte": "Assurer les visites en plusieurs langues selon les compétences linguistiques, souvent un vrai atout pour multiplier les missions."},
            {"icone": "📋", "titre": "Gérer la logistique", "texte": "Organiser le timing d'une visite, gérer les imprévus (retard, groupe trop nombreux, météo) tout en gardant l'attention du public."}
        ],
        "variabilite": "En <strong>indépendant</strong> (auto-entrepreneur ou freelance), le guide-conférencier construit sa propre clientèle et choisit ses missions, avec des revenus variables selon la saison touristique. En <strong>salarié</strong> d'un office de tourisme, d'un musée ou d'une agence, le rythme est plus stable mais avec moins d'autonomie sur le contenu des visites.",
        "scene": {
            "accroche": "10h00&nbsp;: un groupe de 30 visiteurs, trois langues différentes dans la même salle.",
            "moments": [
                {"heure": "9h30", "titre": "L'accueil du groupe", "texte": "Rassembler les visiteurs devant le site, présenter le déroulé de la visite et capter l'attention dès les premières minutes, un moment clé pour donner envie de suivre."},
                {"heure": "10h00", "titre": "La visite guidée", "texte": "Faire vivre l'histoire d'un lieu à travers des anecdotes et des explications adaptées au public, en gérant le rythme pour ne perdre personne en chemin."},
                {"heure": "12h00", "titre": "Les questions du public", "texte": "Répondre aux questions parfois pointues d'un visiteur passionné, ou reformuler simplement pour un enfant qui décroche un peu."}
            ],
            "imprevu": "Le site est exceptionnellement fermé pour travaux au moment de l'arrivée du groupe. Il faut improviser rapidement un parcours alternatif à l'extérieur, sans décevoir des visiteurs venus parfois de loin pour cette visite précise."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le métier ne se limite pas à réciter des dates et des faits&nbsp;: le vrai savoir-faire du guide-conférencier est de raconter une histoire vivante, de créer une connexion émotionnelle avec un lieu, bien plus qu'un simple exposé factuel."
        },
        "marche": {
            "chiffre": "Marché saisonnier",
            "label": "l'activité est fortement concentrée sur les périodes touristiques, avec une demande qui varie beaucoup selon les régions et la saison"
        },
        "tensionScore": 2,
        "hierarchie": {
            "intro": "En office de tourisme ou institution culturelle, le guide-conférencier travaille sous la responsabilité d'un service dédié.",
            "n1": "Responsable des visites guidées ou responsable médiation culturelle.",
            "n2": "Direction de l'office de tourisme ou de l'établissement culturel.",
            "collabDirects": "Autres guides-conférenciers, agents d'accueil, service de communication de l'établissement."
        },
        "contexteEvolution": "Le tourisme culturel se développe, avec une demande croissante pour des visites thématiques originales (patrimoine industriel, street art, tourisme mémoriel). Les outils numériques (audioguides connectés, réalité augmentée) transforment aussi progressivement le métier, sans le remplacer.",
        "diplome": {
            "niveau1": {"titre": "Carte professionnelle obligatoire", "options": ["Impossible de guider officiellement dans les musées et monuments sans la carte de guide-conférencier"]},
            "niveau2": {"titre": "Bac+3 (Licence professionnelle)", "options": ["Licence professionnelle Guide-conférencier", "Diplôme Universitaire Guide-interprète (DUGI)"]}
        },
        "experience": "La carte professionnelle de guide-conférencier est obligatoire pour exercer officiellement dans les musées et monuments historiques, délivrée après une formation spécifique reconnue.",
        "competencesTech": [
            "Solides connaissances en histoire de l'art et patrimoine",
            "Maîtrise d'au moins une langue étrangère (souvent un vrai atout)",
            "Techniques d'animation de groupe et prise de parole en public",
            "Capacité à adapter son discours selon le public",
            "Gestion logistique d'une visite (timing, imprévus)"
        ],
        "softSkillsNote": "Le charisme et la capacité à improviser face à un imprévu comptent autant que les connaissances théoriques&nbsp;: un bon guide sait captiver même quand tout ne se passe pas comme prévu.",
        "remunerationTexte": "Un métier avec des revenus variables selon le statut&nbsp;: entre <strong>1800 et 2400&nbsp;€ brut/mois</strong> en salariat, avec des revenus pouvant être plus élevés en indépendant selon la clientèle développée.",
        "evolutionsPossibles": ["Formateur·rice de futurs guides", "Responsable médiation culturelle", "Responsable d'accueil de site touristique", "Spécialisation en tourisme international"],
        "metiersPrecedents": ["Stage en office de tourisme ou institution culturelle", "Bénévolat dans une association patrimoniale"]
    }
]

for famille in data['SOUS_FAMILLES']['tourisme']:
    if famille['id'] == 'voyage_sejours' or 'Voyage' in famille.get('label', ''):
        famille['postes'].extend(nouveaux_postes_voyage)
        print(f"Ajoute a la famille: {famille['label']}")

with open('source_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)

print("Termine")