// Mapping: variable name → affichage français
const displayNames = {
  // Catégories
  "datacenter": "Data-center",
  "ia": "IA",
  
  // Sous-catégories
  "videos": "Vidéos",
  "articles": "Articles",
  "studies": "Études Scientifiques",
  "regulatory": "Réglementation & Gouvernance",
  "resources": "Ressources & Outils",
  "social": "Posts Réseaux Sociaux"
};

const linksData = [
  {
    category: "ia",
    subcategory: "videos",
    id: 3,
    title: "IA comment ca marche, l'exemple ChatGTP",
    url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
    level: 3,
    type: ["video"],
    source: "YouTube",
    tags: ["chatgpt", "llm",]
  },
 

  {
    category: "ia",
    subcategory: "videos",
    id: 4,
    title: "Laurence Devillers : Conf IA",
    url: "https://www.youtube.com/watch?v=EkvkY9IGFkw",
    level: 2,
    type: ["video"],
    source: "YouTube",
    tags: []
  },

  {
    category: "datacenter",
    subcategory: "videos",
    id: 6,
    title: "Comment on construit les puces informatiques?(ASML)",
    url: "https://www.youtube.com/watch?v=MiUHjLxm3V0",
    level: 2,
    type: ["video"],
    source: "YouTube",
    tags: ["ASML","puces"]
  },
  {
    category: "datacenter",
    subcategory: "videos",
    id: 7,
    title: "Fonctionnement d'un compresseur",
    url: "https://www.youtube.com/watch?v=PT0UIqAGacg",
    level: 3,
    type: ["video"],
    source: "YouTube",
    tags: []
  },
  {
    category: "ia",
    subcategory: "videos",
    id: 8,
    title: "IA et economie",
    url: "https://www.youtube.com/watch?v=WtE0trXodXo",
    level: 3,
    type: ["video"],
    source: "YouTube",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "videos",
    id: 9,
    title: "Le bruit des Data-centers",
    url: "https://www.youtube.com/shorts/AAQsnrAHy5Y",
    level: 1,
    type: ["video"],
    source: "YouTube",
    tags: ["temoignage", ]
  },

  {
    category: "datacenter",
    subcategory: "articles",
    id: 11,
    title: "Mieux respecter l'eau : un défi pour le numérique et les centres de données",
    url: "https://www.advaes.fr/analyses/mieux-respecter-leau-un-defi-pour-le-numerique-et-les-centres-de-donnees",
    level: 1,
    type: ["article"],
    source: "ADVAES",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 12,
    title: "Datacenter Anatomy Part 1: Electrical",
    url: "https://semianalysis.com/2024/10/14/datacenter-anatomy-part-1-electrical/#",
    level: 2,
    type: ["article"],
    source: "SemiAnalysis",
    tags: []
  },
  {
    category: "ia",
    subcategory: "articles",
    id: 13,
    title: "The Ecological Cost of AI is Much Higher Than You Think",
    url: "https://www.truthdig.com/articles/the-ecological-cost-of-ai-is-much-higher-than-you-think/",
    level: 2,
    type: ["article"],
    source: "Truthdig",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 14,
    title: "Consommation des datacenters en France : 24 TWh d'électricité et 6 millions de m³ d'eau",
    url: "https://next.ink/181389/consommation-des-datacenters-en-france-24-twh-delectricite-et-6-millions-de-m%C2%B3-deau/",
    level: 1,
    type: ["article"],
    source: "Next.ink",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 15,
    title: "Datacenters en France : l'État publie un guide d'implantation",
    url: "https://www.itforbusiness.fr/datacenters-en-france-letat-publie-un-guide-dimplantation-97861",
    level: 2,
    type: ["article"],
    source: "IT for Business",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 16,
    title: "Combien consomme une requête à ChatGPT ?",
    url: "https://scienceetonnante.substack.com/p/combien-consomme-une-requete-a-chatgpt?r=2hvplm&utm_campaign=post&utm_medium=web&triedRedirect=true",
    level: 2,
    type: ["article"],
    source: "Science Étonnante",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 17,
    title: "China's Rare Earth Controls May Impact Chip Industry by 2026",
    url: "https://www.eetimes.com/chinas-rare-earth-controls-may-impact-chip-industry-by-2026/",
    level: 2,
    type: ["article"],
    source: "EETimes",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "articles",
    id: 18,
    title: "Étude Harvard : L'IA, perdre du temps pour gagner",
    url: "https://pix-geeks.com/etude-havard-ia-perdre-temps-gagner/",
    level: 2,
    type: ["article"],
    source: "Pix-Geeks",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "studies",
    id: 19,
    title: "Fiche Refroidissement DataCenter- Journée du Data Center",
    url: "https://journeedudatacenter.com/wp-content/uploads/2023/05/fiche-refroidissement.pdf",
    level: 1,
    type: ["etude"],
    source: "Journée du Data Center",
    tags: []
  },
  {
    category: ["ia","datacenter"],
    subcategory: "studies",
    id: 20,
    title: "Science Robotics - Autonome Task Planning for Robots",
    url: "https://www.science.org/doi/10.1126/scirobotics.ady6304",
    level: 3,
    type: ["etude"],
    source: "Science",
    tags: []
  },
  {
    category: "ia",
    subcategory: "studies",
    id: 21,
    title: "IA et Robots - Histoires d'universités 2017",
    url: "https://histoiresduniversites.wordpress.com/wp-content/uploads/2017/03/ia-et-robots.pdf",
    level: 3,
    type: ["etude"],
    source: "Histoires d'Universités",
    tags: []
  },

  {
    category: "datacenter",
    subcategory: "studies",
    id: 23,
    title: "ArXiv - Latest AI Research Papers",
    url: "https://arxiv.org/abs/2511.18397",
    level: 3,
    type: ["etude"],
    source: "ArXiv",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "regulatory",
    id: 24,
    title: "Entrée en vigueur du Règlement Européen sur l'IA - CNIL",
    url: "https://www.cnil.fr/fr/entree-en-vigueur-du-reglement-europeen-sur-lia-les-premieres-questions-reponses-de-la-cnil",
    level: 2,
    type: ["reglementation"],
    source: "CNIL",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "regulatory",
    id: 25,
    title: "ARCEP - Environnement et Numérique 2025",
    url: "https://www.arcep.fr/actualites/actualites-et-communiques/detail/n/environnement-170425.html",
    level: 2,
    type: ["reglementation"],
    source: "ARCEP",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "regulatory",
    id: 26,
    title: "ARCEP - Enquête Annuelle pour un Numérique Soutenable 2026",
    url: "https://www.arcep.fr/fileadmin/cru-1781083209/user_upload/observatoire/enquete-pns/edition-2026/enquete-annuelle-pour-un-numerique-soutenable_edition2026_mai2026.pdf",
    level: 2,
    type: ["reglementation"],
    source: "ARCEP",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "regulatory",
    id: 27,
    title: "Vulnérabilités Systiques dans le Secteur du Numérique - Assemblée Nationale",
    url: "https://videos.assemblee-nationale.fr/video.18789257_69f2fbf68cae3.vulnerabilites-systemiques-dans-le-secteur-du-numerique--representants-de-l-anssi-et-du-cigref-30-avril-2026",
    level: 2,
    type: ["reglementation"],
    source: "Assemblée Nationale",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "regulatory",
    id: 28,
    title: "Commission Intelligence Artificielle - Assemblée Nationale",
    url: "https://videos.assemblee-nationale.fr/commissions.intelligence-artificielle-mission",
    level: 2,
    type: ["reglementation"],
    source: "Assemblée Nationale",
    tags: []
  },
  {
    category: "datacenter",
    subcategory: "resources",
    id: 29,
    title: "Cartographie des acteurs français de l'intelligence économique",
    url: "https://www.portail-ie.fr/ressources/fiches/cartographie-des-acteurs-francais-de-lintelligence-economique/",
    level: 2,
    type: ["ressource"],
    source: "Portail IE",
    tags: []
  },
  {
    category: "ia",
    subcategory: "resources",
    id: 30,
    title: "Portail IE - Qui sommes-nous",
    url: "https://www.portail-ie.fr/qui-sommes-nous/",
    level: 3,
    type: ["ressource"],
    source: "Portail IE",
    tags: []
  },
  {
    category: "ia",
    subcategory: "articles",
    id: 32,
    title: "Comment on entraine une IA?",
    url: "https://www.followtribes.io/performances-llm-puissance-gpu-parametres-dataset/",
    level: 2,
    type: ["ressource"],
    source: "Follow Tribes",
    tags: []
  },
 

  {
    category: "datacenter",
    subcategory: "social",
    id: 37,
    title: "Tweet - More Perfect Union",
    url: "https://x.com/MorePerfectUS/status/1961073344909918272",
    level: 1,
    type: ["social"],
    source: "Twitter/X",
    tags: []
  },
 

  {
    category: "ia",
    subcategory: "social",
    id: 40,
    title: "Tweet - Pirat Nation",
    url: "https://x.com/Pirat_Nation/status/2017251456177307847",
    level: 1,
    type: ["social"],
    source: "Twitter/X",
    tags: []
  },

  
  {
    category: "ia",
    subcategory: "social",
    id: 44,
    title: "Tweet - Yusuf Khanal : Les maths de l'IA",
    url: "https://x.com/_yusufknl/status/2080661615045718523",
    level: 3,
    type: ["social"],
    source: "Twitter/X",
    tags: []
  },




/////////LES LIENS SIDEBAR ICI POUR LES LIENS LOCAUX ET VERS DES JOURNAUX OU SITES GENERIQUES LIES AU SUJET "CATEGORIE"
  {
    category: "datacenter",
    subcategory: "social",
    id: 9991,
    title: "Data Center a Rodez",
    url: "https://inforsud-technologies.com/expertises/cloud-infrastructures-it/nos-datacenters/",
    // Pas de level!
    type: ["resources"],
    source: "Site",
    tags: ["rodez", "local"],
    sidebar: "local",
  },
  



];