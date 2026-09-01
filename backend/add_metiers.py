import json

with open('source_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

nouveaux_postes = [
    {
        "nom": "Neuropsychologue",
        "salaireDebutant": 27,
        "formations": [
            "Master 2 de psychologie (mention neuropsychologie)",
            "Titre de psychologue protégé par la loi"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/neuropsychologue"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 27},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 33},
            {"niveau": "Neuropsychologue senior / Coordinateur·rice", "salaire": 43}
        ],
        "motsCles": ["Bilan cognitif", "Mémoire", "Rééducation", "Neurologie", "Tests", "Vieillissement"],
        "missions": [
            {"icone": "🧠", "titre": "Évaluer les fonctions cognitives", "texte": "Faire passer des tests standardisés (mémoire, attention, langage) pour mesurer précisément l'impact d'un accident vasculaire cérébral, d'un traumatisme crânien ou d'une maladie neurodégénérative."},
            {"icone": "📝", "titre": "Rédiger un bilan", "texte": "Analyser les résultats des tests pour produire un bilan neuropsychologique détaillé, transmis aux médecins et utilisé pour orienter la prise en charge du patient."},
            {"icone": "🔄", "titre": "Rééduquer", "texte": "Mettre en place des exercices de stimulation cognitive pour aider le patient à retrouver ou compenser des capacités altérées, en particulier après un AVC."},
            {"icone": "👨‍👩‍👧", "titre": "Accompagner les familles", "texte": "Expliquer aux proches les troubles constatés et donner des clés concrètes pour adapter le quotidien face à des troubles de la mémoire ou du comportement."}
        ],
        "variabilite": "En <strong>service hospitalier</strong> (neurologie, gériatrie), le neuropsychologue est intégré à une équipe médicale, avec un rythme soutenu et des cas souvent aigus (post-AVC, post-traumatisme). En <strong>libéral</strong> ou cabinet spécialisé, le suivi est plus long terme, avec une patientèle variée allant de l'enfant avec trouble de l'apprentissage à la personne âgée avec suspicion de maladie d'Alzheimer.",
        "scene": {
            "accroche": "10h30&nbsp;: un test de mémoire qui va changer une prise en charge.",
            "moments": [
                {"heure": "9h00", "titre": "Le bilan initial", "texte": "Faire passer une série de tests à un patient adressé par un neurologue après un accident vasculaire cérébral, pour objectiver précisément les fonctions touchées."},
                {"heure": "10h30", "titre": "L'analyse des résultats", "texte": "Comparer les scores obtenus aux normes attendues pour l'âge et le niveau d'études du patient, afin de distinguer un trouble réel d'une simple variation individuelle."},
                {"heure": "14h00", "titre": "La restitution", "texte": "Expliquer les résultats au patient et à sa famille, avec des mots simples, en évitant le jargon technique qui pourrait inquiéter inutilement."}
            ],
            "imprevu": "Un patient présente des résultats bien plus faibles que ce que laissait supposer l'entretien initial, avec un doute sur un trouble neurodégénératif débutant. Il faut orienter rapidement vers un bilan médical complémentaire, tout en restant prudent sur l'annonce à ce stade."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le neuropsychologue ne se contente pas de faire passer des tests&nbsp;: son rôle inclut aussi la rééducation cognitive, un travail de stimulation qui peut réellement améliorer le quotidien d'un patient après un AVC, bien au-delà du simple diagnostic."
        },
        "marche": {
            "chiffre": "Demande croissante",
            "label": "le vieillissement de la population et les progrès dans le repérage des troubles neurodégénératifs (Alzheimer notamment) augmentent fortement les besoins"
        },
        "tensionScore": 4,
        "hierarchie": {
            "intro": "En établissement hospitalier, le neuropsychologue collabore étroitement avec l'équipe médicale de neurologie ou de gériatrie.",
            "n1": "Psychologue coordinateur·rice ou chef·fe de service selon l'établissement.",
            "n2": "Direction médicale de l'établissement.",
            "collabDirects": "Neurologues, gériatres, orthophonistes, ergothérapeutes, dans le cadre d'une prise en charge pluridisciplinaire."
        },
        "contexteEvolution": "Le vieillissement de la population française augmente fortement la demande de bilans neuropsychologiques, en particulier pour le repérage précoce des troubles neurodégénératifs. Les neurosciences progressent aussi rapidement, avec de nouveaux outils d'évaluation numériques qui viennent compléter les tests traditionnels papier-crayon.",
        "diplome": {
            "niveau1": {"titre": "Le titre est protégé par la loi", "options": ["Impossible d'exercer sans le titre de psychologue, réservé aux titulaires d'un Master 2"]},
            "niveau2": {"titre": "Bac+5 (Master 2 obligatoire)", "options": ["Master 2 de psychologie, mention neuropsychologie", "Stage professionnel obligatoire en service de neurologie ou gériatrie"]}
        },
        "experience": "Le titre de psychologue est protégé par la loi&nbsp;: un Master 2 validé est indispensable, avec idéalement une spécialisation en neuropsychologie durant la formation.",
        "competencesTech": [
            "Maîtrise des tests neuropsychologiques standardisés (MMSE, tests de mémoire, etc.)",
            "Connaissance des pathologies neurologiques et de leur impact cognitif",
            "Capacité à rédiger des bilans clairs pour d'autres professionnels de santé",
            "Techniques de remédiation et stimulation cognitive",
            "Travail en équipe pluridisciplinaire hospitalière"
        ],
        "softSkillsNote": "La rigueur méthodologique compte autant que l'empathie&nbsp;: il faut savoir annoncer des résultats parfois difficiles (début de trouble neurodégénératif) avec justesse, sans alarmer inutilement ni minimiser.",
        "remunerationTexte": "Un métier avec une reconnaissance salariale correcte en début de carrière&nbsp;: entre <strong>1800 et 2400&nbsp;€ brut/mois</strong> dans le public, avec une progression vers 3000-3400&nbsp;€ en fin de grille, et des revenus plus élevés possibles en libéral.",
        "evolutionsPossibles": ["Neuropsychologue coordinateur·rice", "Chercheur·se en neurosciences cognitives", "Formateur·rice spécialisé·e", "Neuropsychologue libéral·e"],
        "metiersPrecedents": ["Stage professionnel de Master 2 en service de neurologie", "Assistant·e de recherche en neurosciences"]
    },
        {
        "nom": "Psychomotricien·ne",
        "salaireDebutant": 22,
        "formations": [
            "Diplôme d'État de psychomotricien (Bac+3)",
            "Concours d'entrée en institut de formation"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/psychomotricien-psychomotricienne"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 22},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 26},
            {"niveau": "Psychomotricien·ne senior / Cadre de santé", "salaire": 34}
        ],
        "motsCles": ["Corps", "Motricité", "Rééducation", "Enfance", "Gérontologie", "Bien-être"],
        "missions": [
            {"icone": "🤸", "titre": "Évaluer la motricité", "texte": "Observer et mesurer les capacités motrices, l'équilibre et la coordination d'un patient, enfant ou adulte, pour identifier d'éventuels troubles psychomoteurs."},
            {"icone": "🧩", "titre": "Concevoir des exercices", "texte": "Créer des séances de rééducation basées sur le jeu ou le mouvement, adaptées à l'âge et aux difficultés spécifiques de chaque patient."},
            {"icone": "🗣️", "titre": "Accompagner par le corps", "texte": "Aider une personne à mieux gérer ses émotions ou son stress en passant par des exercices corporels, la respiration ou la relaxation."},
            {"icone": "👥", "titre": "Travailler en équipe", "texte": "Échanger avec les autres professionnels (médecins, éducateurs, enseignants) pour adapter la prise en charge globale du patient."}
        ],
        "variabilite": "En <strong>pédiatrie</strong> ou service pour enfants, le travail se fait beaucoup par le jeu, avec des séances courtes et dynamiques. En <strong>gériatrie</strong>, l'approche est différente&nbsp;: prévention des chutes, maintien de l'autonomie, stimulation douce. Beaucoup de psychomotriciens combinent plusieurs employeurs à temps partiel (hôpital, libéral, structure médico-sociale).",
        "scene": {
            "accroche": "15h30&nbsp;: un enfant qui refuse de tenir un crayon, et pourtant tout change en une séance.",
            "moments": [
                {"heure": "9h00", "titre": "La séance en pédiatrie", "texte": "Recevoir un enfant qui a des difficultés à tenir un crayon ou à sauter à cloche-pied. La séance passe par le jeu pour travailler la coordination sans que l'enfant ne se sente en échec."},
                {"heure": "11h30", "titre": "Le bilan psychomoteur", "texte": "Faire passer des tests standardisés pour objectiver un trouble du développement moteur, en lien avec l'école ou le médecin traitant."},
                {"heure": "15h30", "titre": "La séance en gériatrie", "texte": "Travailler l'équilibre avec une personne âgée pour prévenir les chutes, dans une ambiance rassurante où la confiance en soi retrouvée compte autant que l'exercice physique lui-même."}
            ],
            "imprevu": "Un enfant suivi depuis plusieurs mois montre une régression soudaine de ses acquis, sans cause médicale évidente. Il faut échanger rapidement avec la famille et l'équipe pédagogique pour comprendre si un facteur extérieur (stress, changement familial) explique ce recul."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le psychomotricien ne travaille pas que sur le mouvement physique&nbsp;: son approche part du principe que le corps et le psychisme sont intimement liés, et qu'agir sur l'un peut débloquer l'autre, notamment chez les enfants qui n'ont pas encore les mots pour exprimer leur mal-être."
        },
        "marche": {
            "chiffre": "Demande croissante",
            "label": "le vieillissement de la population et une meilleure reconnaissance des troubles du développement chez l'enfant augmentent les besoins, avec des postes parfois difficiles à pourvoir en zone rurale"
        },
        "tensionScore": 4,
        "hierarchie": {
            "intro": "En établissement, le psychomotricien fait partie d'une équipe paramédicale, avec une hiérarchie propre à la fonction publique hospitalière.",
            "n1": "Cadre de santé ou responsable de service selon l'établissement.",
            "n2": "Direction des soins de l'établissement.",
            "collabDirects": "Médecins, éducateurs spécialisés, ergothérapeutes, orthophonistes, enseignants pour les enfants scolarisés."
        },
        "contexteEvolution": "La profession, réglementée depuis 1974, bénéficie d'une reconnaissance croissante, en particulier pour le repérage précoce des troubles du développement chez l'enfant (autisme, troubles de l'attention). Le vieillissement de la population ouvre aussi de nouveaux postes en gériatrie et prévention des chutes.",
        "diplome": {
            "niveau1": {"titre": "Diplôme d'État obligatoire", "options": ["Impossible d'exercer sans le Diplôme d'État de psychomotricien"]},
            "niveau2": {"titre": "Bac+3 (Diplôme d'État)", "options": ["Concours d'entrée sélectif en institut de formation", "3 ans de formation avec stages pratiques nombreux"]}
        },
        "experience": "Le Diplôme d'État est obligatoire et protégé&nbsp;: impossible d'exercer sans lui. L'accès en institut de formation se fait généralement sur concours ou via Parcoursup selon les régions.",
        "competencesTech": [
            "Techniques de bilan psychomoteur standardisées",
            "Connaissance du développement moteur de l'enfant et du vieillissement",
            "Techniques de relaxation et de médiation corporelle",
            "Capacité à adapter les séances selon l'âge et le handicap",
            "Travail en équipe pluridisciplinaire"
        ],
        "softSkillsNote": "La créativité et la patience sont essentielles&nbsp;: chaque séance doit être adaptée en temps réel selon la réaction du patient, en particulier avec les jeunes enfants qui ne suivent pas toujours le plan prévu.",
        "remunerationTexte": "Un métier avec un salaire d'entrée modeste&nbsp;: environ <strong>1800 à 2200&nbsp;€ brut/mois</strong> dans le public, avec une progression vers 2800-3100&nbsp;€ en fin de grille, et des revenus plus élevés possibles en exercice libéral.",
        "evolutionsPossibles": ["Cadre de santé", "Psychomotricien·ne libéral·e", "Formateur·rice en institut", "Spécialisation en gérontologie ou périnatalité"],
        "metiersPrecedents": ["Stage pratique en institut de formation", "Aide médico-psychologique (parcours de reconversion)"]
    },
        {
        "nom": "Psychologue de l'Éducation nationale",
        "salaireDebutant": 23,
        "formations": [
            "Master 2 de psychologie (mention EDA ou EDO)",
            "Concours de recrutement des psychologues de l'Éducation nationale"
        ],
        "sourceExterne": {
            "type": "onisep",
            "lien": "https://www.onisep.fr/ressources/univers-metier/metiers/psychologue-de-l-education-nationale"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 23},
            {"niveau": "Confirmé·e (5-10 ans)", "salaire": 30},
            {"niveau": "Fin de carrière / Hors classe", "salaire": 45}
        ],
        "motsCles": ["Enfance", "Apprentissage", "Orientation", "École", "Difficultés scolaires", "Bienveillance"],
        "missions": [
            {"icone": "🎒", "titre": "Repérer les difficultés", "texte": "Identifier les élèves en difficulté d'apprentissage ou de comportement, à la demande des enseignants ou des familles, pour comprendre l'origine du blocage."},
            {"icone": "📊", "titre": "Réaliser des bilans", "texte": "Faire passer des tests psychométriques (comme le WISC) pour évaluer le fonctionnement cognitif d'un enfant et orienter d'éventuels aménagements pédagogiques."},
            {"icone": "🗣️", "titre": "Conseiller les équipes", "texte": "Accompagner les enseignants dans l'adaptation de leur pédagogie face à un élève en difficulté, sans se substituer à leur rôle."},
            {"icone": "👨‍👩‍👧", "titre": "Recevoir les familles", "texte": "Écouter les parents inquiets pour la scolarité de leur enfant, expliquer les résultats d'un bilan avec des mots accessibles, et orienter vers d'autres professionnels si besoin."}
        ],
        "variabilite": "Selon la spécialité choisie, le métier diffère fortement&nbsp;: en <strong>premier degré</strong> (maternelle et primaire), l'accompagnement porte sur les apprentissages fondamentaux et le développement de l'enfant. En <strong>second degré</strong> (collège, lycée), l'accent est mis sur l'orientation scolaire et professionnelle, avec un public adolescent aux problématiques différentes.",
        "scene": {
            "accroche": "10h00&nbsp;: un enfant qui n'arrive pas à lire, et une équipe enseignante démunie.",
            "moments": [
                {"heure": "9h00", "titre": "L'observation en classe", "texte": "Observer discrètement un enfant signalé par son enseignant pour des difficultés de concentration, afin de comprendre le contexte avant tout entretien formel."},
                {"heure": "10h00", "titre": "Le bilan psychométrique", "texte": "Faire passer un test de niveau à un enfant pour objectiver ses difficultés de lecture, et distinguer un simple retard d'un trouble spécifique comme la dyslexie."},
                {"heure": "14h00", "titre": "La réunion avec les parents", "texte": "Restituer les résultats du bilan à la famille, souvent inquiète, en expliquant clairement les prochaines étapes possibles (orthophonie, aménagements scolaires)."}
            ],
            "imprevu": "Un enseignant signale en urgence un enfant qui exprime une détresse inhabituelle en classe, avec des propos inquiétants. Il faut réagir rapidement, évaluer la situation avec prudence, et activer si besoin le réseau d'aide (assistante sociale scolaire, médecin scolaire) sans attendre le circuit habituel."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, le psychologue de l'Éducation nationale ne fait pas de suivi thérapeutique au long cours&nbsp;: son rôle est d'évaluer, d'orienter et de conseiller, pas de soigner. Pour un accompagnement thérapeutique, l'enfant est orienté vers un psychologue clinicien extérieur à l'école."
        },
        "marche": {
            "chiffre": "Recrutement soutenu",
            "label": "l'Éducation nationale recrute chaque année par concours, avec un nombre de postes qui reste globalement stable face à une demande croissante d'accompagnement des élèves"
        },
        "tensionScore": 3,
        "hierarchie": {
            "intro": "Le PsyEN dépend de l'Éducation nationale, avec un rattachement à une circonscription ou un établissement.",
            "n1": "Inspecteur·rice de l'Éducation nationale (premier degré) ou conseiller·ère principal·e d'éducation (second degré).",
            "n2": "Direction académique des services de l'Éducation nationale (DASEN).",
            "collabDirects": "Enseignants, directeurs d'école, infirmières scolaires, assistantes sociales scolaires, médecins scolaires."
        },
        "contexteEvolution": "La réforme de 2017 a unifié le métier sous le statut de psychologue de l'Éducation nationale, avec deux spécialités distinctes. La sensibilisation croissante aux troubles de l'apprentissage (dyslexie, dyspraxie, TDAH) et au harcèlement scolaire renforce le rôle de ce professionnel dans les établissements.",
        "diplome": {
            "niveau1": {"titre": "Concours obligatoire", "options": ["Impossible d'exercer sans réussir le concours de recrutement PsyEN"]},
            "niveau2": {"titre": "Bac+5 (Master 2 + concours)", "options": ["Master 2 de psychologie, spécialité EDA (1er degré) ou EDO (2nd degré)", "Concours externe ou interne de l'Éducation nationale"]}
        },
        "experience": "Le concours de recrutement est obligatoire pour exercer, en plus du Master 2 de psychologie. Certains enseignants se reconvertissent vers ce métier via le concours interne après plusieurs années d'exercice.",
        "competencesTech": [
            "Maîtrise des tests psychométriques utilisés en milieu scolaire (WISC, etc.)",
            "Connaissance du système éducatif et de ses dispositifs d'aide",
            "Techniques d'entretien avec les enfants, adolescents et familles",
            "Capacité à travailler avec les équipes pédagogiques",
            "Connaissance des troubles de l'apprentissage (dys, TDAH, etc.)"
        ],
        "softSkillsNote": "La capacité à instaurer la confiance à la fois avec l'enfant, les parents et les enseignants est essentielle&nbsp;: le PsyEN doit être perçu comme un soutien, pas comme une figure d'évaluation qui juge ou sanctionne.",
        "remunerationTexte": "Un métier avec une grille de fonction publique claire&nbsp;: environ <strong>1950 à 2300&nbsp;€ brut/mois</strong> en début de carrière, avec primes spécifiques, et une progression vers 3500-4000&nbsp;€ en fin de grille.",
        "evolutionsPossibles": ["PsyEN hors classe", "Formateur·rice en institut de formation", "Inspecteur·rice de l'Éducation nationale (via concours spécifique)", "Retour vers un poste de professeur des écoles"],
        "metiersPrecedents": ["Professeur·e des écoles (reconversion via concours interne)", "Stage professionnel de Master 2 en milieu scolaire"]
    },
    {
        "nom": "Psychologue en addictologie",
        "salaireDebutant": 27,
        "formations": [
            "Master 2 de psychologie (mention clinique)",
            "DU (Diplôme Universitaire) d'addictologie recommandé"
        ],
        "sourceExterne": {
            "type": "apec",
            "lien": "https://www.apec.fr/tous-nos-metiers/sante-social/psychologue.html"
        },
        "evolution": [
            {"niveau": "Débutant·e (0-2 ans)", "salaire": 27},
            {"niveau": "Confirmé·e (3-5 ans)", "salaire": 33},
            {"niveau": "Coordinateur·rice de soins / Chef·fe de service", "salaire": 42}
        ],
        "motsCles": ["Addiction", "Sevrage", "CSAPA", "Rechute", "Accompagnement", "Prévention"],
        "missions": [
            {"icone": "🗣️", "titre": "Recevoir en entretien", "texte": "Accueillir des personnes en difficulté avec l'alcool, le cannabis ou d'autres substances, souvent dans un moment de grande fragilité, sans jugement sur leur parcours."},
            {"icone": "📋", "titre": "Évaluer la dépendance", "texte": "Faire le point sur la situation de la personne, ses motivations au changement et les risques associés, pour adapter l'accompagnement proposé."},
            {"icone": "🔄", "titre": "Accompagner le sevrage", "texte": "Soutenir la personne dans la durée, y compris après une rechute, en considérant que le chemin vers l'abstinence ou la réduction des risques n'est jamais linéaire."},
            {"icone": "🛡️", "titre": "Prévenir", "texte": "Intervenir parfois en milieu scolaire ou associatif pour sensibiliser aux risques liés aux conduites addictives, en particulier auprès des jeunes."}
        ],
        "variabilite": "En <strong>CSAPA</strong> (Centre de Soins, d'Accompagnement et de Prévention en Addictologie), le travail est ancré dans une équipe pluridisciplinaire avec un public très varié. En <strong>service hospitalier</strong> d'addictologie, l'accompagnement est souvent lié à une hospitalisation pour sevrage, avec un rythme plus intensif sur une période courte.",
        "scene": {
            "accroche": "11h00&nbsp;: une rechute après six mois d'abstinence, et la question de savoir comment continuer.",
            "moments": [
                {"heure": "9h00", "titre": "Le premier accueil", "texte": "Recevoir une personne qui vient pour la première fois, souvent poussée par son entourage ou une obligation judiciaire, avec un vrai travail à faire pour qu'elle trouve sa propre motivation."},
                {"heure": "11h00", "titre": "Le suivi après rechute", "texte": "Accompagner une personne qui a replongé après plusieurs mois d'abstinence, sans dramatiser la rechute mais en l'aidant à comprendre ce qui l'a déclenchée."},
                {"heure": "15h00", "titre": "La réunion d'équipe", "texte": "Échanger avec les médecins et travailleurs sociaux du CSAPA pour coordonner un accompagnement global, qui dépasse souvent le seul enjeu de l'addiction (logement, emploi, santé physique)."}
            ],
            "imprevu": "Une personne suivie arrive en consultation dans un état de crise aiguë, avec un risque de mise en danger immédiat. Il faut évaluer rapidement la situation et, si nécessaire, orienter vers une hospitalisation en urgence, tout en maintenant le lien de confiance construit avec elle."
        },
        "insight": {
            "type": "positif",
            "texte": "Contrairement à une idée reçue, l'objectif n'est pas toujours l'abstinence totale et immédiate&nbsp;: l'approche de réduction des risques, de plus en plus utilisée, vise d'abord à limiter les dommages et à accompagner la personne à son propre rythme, ce qui donne souvent de meilleurs résultats sur la durée."
        },
        "marche": {
            "chiffre": "Demande soutenue",
            "label": "les CSAPA et services d'addictologie peinent parfois à recruter, notamment en dehors des grandes villes, malgré des besoins d'accompagnement importants"
        },
        "tensionScore": 3,
        "hierarchie": {
            "intro": "En CSAPA ou service hospitalier, le psychologue en addictologie fait partie d'une équipe pluridisciplinaire dédiée.",
            "n1": "Chef·fe de service ou coordinateur·rice de soins selon la structure.",
            "n2": "Direction de l'établissement ou de l'association gestionnaire.",
            "collabDirects": "Médecins addictologues, infirmier·ères, travailleurs sociaux, éducateurs spécialisés."
        },
        "contexteEvolution": "L'approche de réduction des risques gagne du terrain face à l'objectif traditionnel d'abstinence totale, ce qui fait évoluer les pratiques professionnelles. Les addictions comportementales (jeux vidéo, écrans, jeux d'argent) deviennent aussi un sujet de préoccupation croissant, en plus des addictions aux substances traditionnelles.",
        "diplome": {
            "niveau1": {"titre": "Le titre est protégé par la loi", "options": ["Impossible d'exercer sans le titre de psychologue, réservé aux titulaires d'un Master 2"]},
            "niveau2": {"titre": "Bac+5 (Master 2 + spécialisation)", "options": ["Master 2 de psychologie, mention clinique", "DU d'addictologie fortement recommandé en complément"]}
        },
        "experience": "Le titre de psychologue est obligatoire, avec une spécialisation en addictologie souvent acquise via un DU en complément du Master 2, ou par l'expérience de terrain en CSAPA.",
        "competencesTech": [
            "Connaissance des mécanismes de dépendance (substances et comportements)",
            "Techniques d'entretien motivationnel",
            "Approches de réduction des risques",
            "Travail en réseau avec les structures sociales et médicales",
            "Gestion des situations de crise et de rechute"
        ],
        "softSkillsNote": "La capacité à ne pas juger et à accepter les rechutes comme partie du processus, sans se décourager, est essentielle&nbsp;: la patience sur le temps long fait toute la différence dans ce métier.",
        "remunerationTexte": "Un métier avec une reconnaissance salariale correcte&nbsp;: entre <strong>2200 et 2800&nbsp;€ brut/mois</strong> en début de carrière selon la structure, avec une évolution vers 3200-3500&nbsp;€ pour les postes de coordination.",
        "evolutionsPossibles": ["Coordinateur·rice de soins en CSAPA", "Chef·fe de service", "Formateur·rice en prévention des addictions", "Psychologue clinicien·ne libéral·e spécialisé·e"],
        "metiersPrecedents": ["Stage professionnel de Master 2 en CSAPA ou service d'addictologie", "Éducateur·rice spécialisé·e (reconversion)"]
    }
]

for famille in data['SOUS_FAMILLES']['psychologie']:
    if famille['id'] == 'accompagnement_psy':
        famille['postes'].extend(nouveaux_postes)

with open('source_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)

print(f"OK — {len(nouveaux_postes)} métiers ajoutés à la famille accompagnement_psy")
