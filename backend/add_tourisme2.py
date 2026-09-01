import json

with open('source_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

nouveau_poste_animation = [
    {
        "nom": "Animateur·rice touristique",
        "salaireDebutant": 18,
        "formations": [
            "BAFA (Brevet d'aptitude aux fonctions d'animateur)",
            "BPJEPS animation (recommandé pour évoluer)"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/animateur-animatrice-touristique"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 18},
            {"niveau": "Confirmé·e / Chef·fe animateur", "salaire": 22},
            {"niveau": "Responsable d'activités / Directeur·rice de centre", "salaire": 28}
        ],
        "motsCles": ["Animation", "Vacances", "Groupes", "Saisonnier", "Loisirs", "Convivialité"],
        "missions": [
            {"icone": "🎉", "titre": "Créer des activités", "texte": "Concevoir et animer des activités variées (sportives, culturelles, ludiques) pour des vacanciers de tous âges, en s'adaptant au public présent."},
            {"icone": "🎤", "titre": "Animer les soirées", "texte": "Organiser et présenter les spectacles ou événements du soir, souvent le moment fort de la journée pour créer une ambiance conviviale."},
            {"icone": "👶", "titre": "Encadrer un club enfants", "texte": "Pour les animateurs spécialisés, veiller à la sécurité et à l'épanouissement des enfants confiés le temps du séjour de leurs parents."},
            {"icone": "🗣️", "titre": "Créer du lien", "texte": "Aller à la rencontre des vacanciers tout au long du séjour, être disponible et souriant même après une longue journée."}
        ],
        "variabilite": "En <strong>club de vacances</strong> (type village vacances, Club Med), le contrat est souvent saisonnier avec logement, nourriture et blanchisserie inclus, mais des horaires très intenses. En <strong>parc de loisirs</strong> ou <strong>croisière</strong>, l'environnement diffère mais la logique reste similaire&nbsp;: forte disponibilité demandée, peu de jours de repos en haute saison.",
        "scene": {
            "accroche": "21h00&nbsp;: le silence avant que 200 vacanciers arrivent pour le spectacle du soir.",
            "moments": [
                {"heure": "10h00", "titre": "L'activité du matin", "texte": "Animer un tournoi sportif ou un atelier créatif, en gérant des niveaux très différents parmi les participants, du débutant au passionné."},
                {"heure": "15h00", "titre": "Le club enfants", "texte": "Pour les animateurs spécialisés jeunesse, proposer des jeux adaptés à l'âge, tout en restant très vigilant sur la sécurité de chaque enfant."},
                {"heure": "21h00", "titre": "Le spectacle du soir", "texte": "Répéter puis présenter un show devant les vacanciers, souvent après une journée déjà bien remplie, avec l'énergie qu'il faut garder jusqu'au bout."}
            ],
            "imprevu": "Un enfant du club se blesse légèrement pendant une activité. Il faut réagir calmement, appliquer les premiers gestes appropriés, prévenir la famille et le responsable, tout en rassurant les autres enfants du groupe."
        },
        "insight": {
            "type": "vigilance",
            "texte": "Contrairement à l'image de vacances permanentes, c'est un métier très intense et fatigant&nbsp;: les journées sont longues, la disponibilité est quasi totale, et le rythme peut être épuisant sur plusieurs mois consécutifs. La passion pour le contact humain est indispensable pour tenir la saison."
        },
        "marche": {
            "chiffre": "Fort turnover",
            "label": "le secteur recrute massivement chaque saison, avec des besoins particulièrement importants l'été en bord de mer et l'hiver dans les stations de ski"
        },
        "tensionScore": 3,
        "hierarchie": {
            "intro": "Dans un club de vacances, l'animateur fait partie d'une équipe encadrée par un responsable animation.",
            "n1": "Chef·fe animateur ou responsable d'activités selon la structure.",
            "n2": "Directeur·rice du village vacances ou du centre.",
            "collabDirects": "Autres animateurs, personnel d'hébergement et de restauration de l'établissement."
        },
        "contexteEvolution": "Le secteur reste très saisonnier, mais certaines structures développent des contrats à l'année en combinant plusieurs sites (été en France, hiver à l'étranger). Les attentes des vacanciers évoluent aussi vers plus de bien-être et d'activités personnalisées, au-delà de l'animation traditionnelle.",
        "diplome": {
            "niveau1": {"titre": "BAFA suffisant pour débuter", "options": ["Brevet d'aptitude aux fonctions d'animateur (BAFA)", "Aucun diplôme spécifique obligatoire selon les structures"]},
            "niveau2": {"titre": "Bac+2 pour évoluer", "options": ["BPJEPS animation", "BTS animation et gestion touristiques locales"]}
        },
        "experience": "Aucun diplôme spécifique n'est strictement obligatoire pour débuter, mais le BAFA est très largement demandé, et le BNS (secourisme) ou le BPJEPS sont des atouts pour évoluer plus vite.",
        "competencesTech": [
            "Techniques d'animation de groupe pour différents publics",
            "Bases de premiers secours",
            "Créativité pour concevoir des activités variées",
            "Résistance physique et disponibilité",
            "Notions de langues étrangères, un vrai atout"
        ],
        "softSkillsNote": "L'énergie et le sourire permanent, même en fin de saison, font toute la différence&nbsp;: c'est un métier où l'enthousiasme communicatif compte autant que les compétences techniques.",
        "remunerationTexte": "Un métier proche du <strong>SMIC (environ 1500&nbsp;€ brut/mois)</strong>, mais avec logement, repas et blanchisserie généralement inclus, ce qui compense en partie le salaire modeste.",
        "evolutionsPossibles": ["Chef·fe animateur", "Responsable d'activités", "Directeur·rice de centre de vacances", "Reconversion vers l'événementiel"],
        "metiersPrecedents": ["BAFA obtenu en parallèle des études", "Animateur·rice de centre de loisirs (pendant les vacances scolaires)"]
    }
]

nouveau_poste_hebergement = [
    {
        "nom": "Responsable d'hébergement",
        "salaireDebutant": 23,
        "formations": [
            "BTS Management en hôtellerie-restauration",
            "Bachelor ou Master en hôtellerie-tourisme (pour évoluer plus vite)"
        ],
        "sourceExterne": {
            "type": "apec",
            "lien": "https://www.apec.fr/tous-nos-metiers/commercial-marketing/responsable-dhebergement-touristique.html"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 23},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 30},
            {"niveau": "Directeur·rice d'hébergement / Directeur·rice d'hôtel", "salaire": 42}
        ],
        "motsCles": ["Hôtellerie", "Management", "Accueil", "Qualité", "Équipe", "Réservations"],
        "missions": [
            {"icone": "🏨", "titre": "Superviser la réception", "texte": "Encadrer l'équipe de réceptionnistes, garantir un accueil de qualité et gérer les situations délicates avec les clients."},
            {"icone": "🧹", "titre": "Coordonner l'entretien", "texte": "Travailler avec l'équipe de ménage pour assurer la propreté et la qualité des chambres, un enjeu central de la satisfaction client."},
            {"icone": "📊", "titre": "Optimiser le taux d'occupation", "texte": "Suivre les réservations et ajuster la stratégie tarifaire selon la saison, en lien avec la direction commerciale de l'établissement."},
            {"icone": "👥", "titre": "Manager une équipe", "texte": "Recruter, former et organiser les plannings du personnel d'hébergement, souvent une équipe importante dans les grands établissements."}
        ],
        "variabilite": "Dans un <strong>petit hôtel indépendant</strong>, le responsable d'hébergement touche à tout, de la réception à la gestion administrative. Dans une <strong>chaîne hôtelière</strong>, le poste est plus spécialisé, avec des process et standards de marque à respecter scrupuleusement.",
        "scene": {
            "accroche": "18h00&nbsp;: complet ce soir, et une réclamation client qui monte en escalade.",
            "moments": [
                {"heure": "9h00", "titre": "Le point du matin", "texte": "Faire le tour des chambres avec l'équipe de ménage pour vérifier la qualité de préparation avant les arrivées du jour."},
                {"heure": "14h00", "titre": "La gestion des réservations", "texte": "Ajuster les tarifs et l'allocation des chambres selon le remplissage prévu, en anticipant les périodes de forte affluence."},
                {"heure": "18h00", "titre": "La gestion d'une réclamation", "texte": "Un client mécontent d'une chambre non conforme à ses attentes. Il faut trouver rapidement une solution satisfaisante, tout en gérant l'affluence des arrivées du soir."}
            ],
            "imprevu": "Une panne technique majeure (plomberie, climatisation) touche plusieurs chambres réservées le soir même, alors que l'hôtel affiche complet. Il faut reloger rapidement les clients concernés, parfois dans un établissement partenaire, en gérant le mécontentement légitime."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le poste n'est pas qu'administratif&nbsp;: le responsable d'hébergement est souvent le premier recours en cas de problème client, un vrai rôle de terrain qui demande sang-froid et sens du service, pas seulement de la gestion de planning."
        },
        "marche": {
            "chiffre": "Secteur en tension",
            "label": "l'hôtellerie peine à recruter sur les métiers de l'accueil et du management d'équipe, en particulier dans les zones touristiques à forte saisonnalité"
        },
        "tensionScore": 3,
        "hierarchie": {
            "intro": "Le responsable d'hébergement encadre l'équipe de réception et d'étages, sous l'autorité de la direction.",
            "n1": "Directeur·rice d'hôtel ou directeur·rice général·e de l'établissement.",
            "n2": "Direction régionale ou siège du groupe hôtelier, selon la structure.",
            "collabDirects": "Réceptionnistes, gouvernantes, personnel d'étage, service commercial de l'hôtel."
        },
        "contexteEvolution": "La digitalisation transforme le métier (réservations en ligne, check-in automatisé), avec une évolution du rôle vers plus de conseil et de gestion de la relation client, tandis que les tâches administratives se simplifient. Les attentes en matière de développement durable (économie d'eau, tri des déchets) prennent aussi une place croissante dans la gestion quotidienne.",
        "diplome": {
            "niveau1": {"titre": "Accessible dès Bac+2", "options": ["BTS Management en hôtellerie-restauration"]},
            "niveau2": {"titre": "Bac+3 à Bac+5 pour évoluer", "options": ["Bachelor en hôtellerie-tourisme", "Master spécialisé en management hôtelier", "École spécialisée en hôtellerie-restauration"]}
        },
        "experience": "Une expérience minimum de 2 ans dans l'hôtellerie-restauration ou le tourisme est fréquemment demandée, souvent acquise via des stages ou une première expérience en réception.",
        "competencesTech": [
            "Maîtrise des logiciels de gestion hôtelière (PMS)",
            "Anglais courant impératif, autres langues un plus",
            "Techniques de management d'équipe",
            "Connaissance des normes et réglementations du secteur",
            "Gestion budgétaire et suivi du taux d'occupation"
        ],
        "softSkillsNote": "Le sang-froid face aux imprévus et la diplomatie dans la gestion des réclamations sont essentiels&nbsp;: ce poste demande de garder le sourire même dans les moments de forte pression.",
        "remunerationTexte": "Un métier avec une bonne progression&nbsp;: entre <strong>1900 et 2100&nbsp;€ brut/mois</strong> en début de carrière, évoluant vers 2900-3300&nbsp;€ pour un profil confirmé.",
        "evolutionsPossibles": ["Directeur·rice d'hébergement", "Directeur·rice d'hôtel", "Responsable qualité hôtelière", "Consultant·e en hôtellerie"],
        "metiersPrecedents": ["Réceptionniste en hôtellerie", "Stage ou alternance en gestion hôtelière"]
    }
]

nouveau_poste_accueil = [
    {
        "nom": "Agent·e d'accueil touristique",
        "salaireDebutant": 19,
        "formations": [
            "BTS Tourisme",
            "Bac Pro Métiers de l'accueil (accessible dès ce niveau)"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/hote-hotesse-d-accueil"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 19},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 22},
            {"niveau": "Responsable d'office de tourisme", "salaire": 28}
        ],
        "motsCles": ["Accueil", "Information", "Territoire", "Langues", "Visiteurs", "Conseil"],
        "missions": [
            {"icone": "🗺️", "titre": "Renseigner les visiteurs", "texte": "Conseiller les touristes sur les lieux à visiter, les événements locaux et les bonnes adresses, avec une connaissance fine du territoire."},
            {"icone": "📞", "titre": "Gérer les demandes", "texte": "Répondre aux questions par téléphone, email ou en physique, souvent en plusieurs langues selon la fréquentation internationale."},
            {"icone": "🎫", "titre": "Vendre et réserver", "texte": "Proposer et vendre des billets de visites guidées, des pass touristiques ou des produits de la boutique de l'office de tourisme."},
            {"icone": "📋", "titre": "Gérer la documentation", "texte": "Organiser et actualiser les brochures et supports d'information mis à disposition des visiteurs."}
        ],
        "variabilite": "En <strong>office de tourisme urbain</strong>, l'affluence est plus régulière toute l'année. Dans une <strong>station touristique saisonnière</strong> (mer, montagne), le rythme est très intense en haute saison, avec parfois des contrats courts limités à quelques mois.",
        "scene": {
            "accroche": "11h00&nbsp;: une famille perdue, un plan à la main, et trois langues qui se mélangent.",
            "moments": [
                {"heure": "9h30", "titre": "L'ouverture", "texte": "Préparer l'espace d'accueil, vérifier les stocks de brochures et se tenir informé des événements du jour à recommander aux visiteurs."},
                {"heure": "11h00", "titre": "Le conseil personnalisé", "texte": "Aider une famille internationale à organiser sa journée de visite, en jonglant entre plusieurs langues et en s'adaptant à leurs envies précises."},
                {"heure": "15h00", "titre": "La vente de billets", "texte": "Proposer et vendre des places pour une visite guidée du soir, en valorisant l'expérience proposée sans être trop insistant·e."}
            ],
            "imprevu": "Un événement local majeur attire une affluence bien plus importante que prévu, avec une file d'attente qui s'allonge. Il faut gérer la pression tout en gardant un accueil de qualité pour chaque visiteur, sans se laisser déborder."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le métier ne se limite pas à distribuer des plans&nbsp;: l'agent d'accueil touristique est un vrai ambassadeur du territoire, capable de créer une expérience mémorable dès les premières minutes du séjour d'un visiteur."
        },
        "marche": {
            "chiffre": "Marché stable",
            "label": "la France restant le pays le plus visité au monde, les offices de tourisme recrutent régulièrement, avec une forte saisonnalité selon les régions"
        },
        "tensionScore": 2,
        "hierarchie": {
            "intro": "L'agent d'accueil travaille sous la responsabilité du service accueil de l'office de tourisme.",
            "n1": "Responsable accueil ou chargé·e de mission tourisme.",
            "n2": "Direction de l'office de tourisme ou de la collectivité territoriale.",
            "collabDirects": "Autres agents d'accueil, service communication, prestataires touristiques locaux (guides, hébergeurs)."
        },
        "contexteEvolution": "Les outils numériques (bornes interactives, applications mobiles) transforment progressivement le métier vers plus de conseil personnalisé, tandis que l'information de base devient accessible en ligne. La maîtrise de plusieurs langues reste un vrai atout différenciant sur le marché de l'emploi.",
        "diplome": {
            "niveau1": {"titre": "Accessible dès le Bac", "options": ["Bac Pro Métiers de l'accueil", "BTS Tourisme (fortement recommandé)"]},
            "niveau2": {"titre": "Bac+2 pour de meilleures opportunités", "options": ["BTS Tourisme", "Licence professionnelle Tourisme"]}
        },
        "experience": "Le métier recrute essentiellement à partir d'un Bac+2, la maîtrise d'au moins une langue étrangère (souvent l'anglais) étant quasiment indispensable.",
        "competencesTech": [
            "Connaissance approfondie du territoire local",
            "Maîtrise d'au moins une langue étrangère",
            "Techniques de vente et de conseil client",
            "Utilisation d'outils de billetterie et de réservation",
            "Bonne présentation et sens de l'accueil"
        ],
        "softSkillsNote": "La patience et le sourire, même face à des questions répétitives ou un afflux important de visiteurs, sont au cœur du métier&nbsp;: chaque visiteur doit repartir avec le sentiment d'avoir été bien accueilli.",
        "remunerationTexte": "Un métier avec un salaire d'entrée modeste&nbsp;: environ <strong>1600 à 1800&nbsp;€ brut/mois</strong>, avec une évolution progressive selon l'ancienneté et les responsabilités prises.",
        "evolutionsPossibles": ["Responsable accueil", "Chargé·e de mission tourisme", "Responsable d'office de tourisme", "Conseiller·ère en agence de voyages"],
        "metiersPrecedents": ["Stage en office de tourisme", "Job saisonnier dans l'accueil touristique"]
    }
]

for famille in data['SOUS_FAMILLES']['tourisme']:
    if 'Voyage' in famille.get('label', ''):
        famille['postes'].extend(nouveau_poste_animation)
        famille['postes'].extend(nouveau_poste_accueil)
        print(f"Ajoute a: {famille['label']}")
    if 'Hôtellerie' in famille.get('label', ''):
        famille['postes'].extend(nouveau_poste_hebergement)
        print(f"Ajoute a: {famille['label']}")

with open('source_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)

print("Termine")