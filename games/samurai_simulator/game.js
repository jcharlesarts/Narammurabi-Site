const copy = {
  en: {
    hudEyebrow: "RETRO HISTORY RPG",
    hudTitle: "Samurai Paths",
    hudSubtitle: "Lead your clan through big choices in Japanese history.",
    languageLabel: "Language",
    glossaryOn: "Words ON",
    glossaryOff: "Words OFF",
    teacherNotesButton: "Guide",
    teacherNotesTitle: "Guide",
    teacherNotes: [
      "Samurai work changed over time. They were not always doing the same job.",
      "Watch what each era rewards. A bold move can help in one chapter and fail in the next.",
      "Battles matter, but so do grain, roads, records, law, and village trust."
    ],
    profileHeading: "Leader",
    legacyScoreLabel: "Legacy",
    eraScoreLabel: "Era",
    statsHeading: "Stats",
    traitsHeading: "Traits",
    vocabHeading: "Word Help",
    tier2Legend: "Tier 2 words",
    tier3Legend: "Tier 3 words",
    logHeading: "Recent Log",
    titleEyebrow: "PRESS START",
    titleHeading: "Samurai Paths",
    titleCopy: "Build your leader, face real turning points in Japanese history, and see what kind of clan survives.",
    titleStart: "Start Game",
    titleBriefHeading: "Your Mission",
    titleBrief: [
      "Start with a name, a background, and a leadership style.",
      "Then guide your clan through eight chapters of war, peace, reform, and change."
    ],
    titleMenuHeading: "How to Play",
    titleMenu: [
      "1. Build your clan one step at a time.",
      "2. Read the chapter intro, then scout the map.",
      "3. Check key places, unlock your orders, and choose a move."
    ],
    titleHow: "About",
    titleBlurb: [
      "This is a one-screen history RPG.",
      "Build your clan, then guide it through eight turning points in Japan's past.",
      "Turn word help on or off whenever you need it."
    ],
    setupEyebrow: "BUILD YOUR CLAN",
    setupHeading: "Create Your Leader",
    setupHeadings: {
      name: "Name Your Clan",
      family: "Choose a Background",
      focus: "Choose a Leader Style",
      summary: "Ready to Begin"
    },
    nameLabel: "Family name",
    namePlaceholder: "Takeda",
    randomNameButton: "Random Name",
    nameHelper: "Type your own family name or generate one.",
    familyHeading: "Background",
    focusHeading: "Leader style",
    setupHint: "Build your clan one step at a time.",
    previewLabel: "So Far",
    setupBack: "Back",
    setupBackToStart: "Back",
    setupBackStep: "Back",
    setupContinue: "Next",
    setupReview: "Review",
    beginJourney: "Begin Journey",
    setupStepLabel: (current, total) => `STEP ${current} OF ${total}`,
    setupPrompts: {
      name: "Choose the name your clan will carry.",
      family: "Pick the background your clan starts with.",
      focus: "Pick the style that will guide your choices.",
      summary: "Check your clan card, then begin the journey."
    },
    objectiveLabel: "Your Mission",
    narratorLabel: "Narrator",
    skipIntro: "Fast Forward",
    choiceHeading: "Issue Your Command",
    mapLabel: "Field Map",
    mapDockLabel: "Scout Brief",
    mapDockLead: "Scout the marked places. You need real proof before you give an order.",
    mapDockReadyLead: "You have enough clues. Return from the map and review what your scouts found.",
    mapDockProgress: (checked, total) => `Clues ${checked}/${total}`,
    mapOpenButton: "Scout for Clues",
    mapCloseButton: "Return",
    mapMinimapStub: "MINIMAP BAY",
    investigationHeading: "Scouting Report",
    investigationLead: (checked, total) => `Scouts checked ${checked} of ${total} key sites.`,
    investigationLocked: "Scout the marked places to build your case.",
    investigationNeedMore: remaining =>
      `${remaining} key site${remaining === 1 ? "" : "s"} still need checking.`,
    investigationReady: "You have enough evidence. Review the report, then give your order.",
    investigationWhatLearned: "What The Scout Run Revealed",
    investigationNoNotes: "No field notes yet.",
    investigationMoreNotes: count => `+${count} more notes in the full scout log.`,
    reviewEyebrow: "SCOUT REPORT",
    reviewHeading: "Review the Scouting Report",
    reviewBackToMap: "Back to Map",
    reviewHintsButton: "Read Pressure Hints",
    reviewChooseButton: "Issue Your Command",
    reviewHintsHeading: "Pressure Hints",
    reviewHintsLead: "These hints show what each move solves first, and what it leaves exposed.",
    choiceBackButton: "Back to Report",
    strategyPressureLabel: "Strongest pressures",
    strategyReadLabel: "Your clan reads",
    strategyGuideLabel: "Response guide",
    strategyEvidenceLabel: "Scouts saw",
    strategyRiskLabel: "Risk",
    strategyRemainingLabel: "Still at risk",
    intelFindingLabel: "Scouts uncover",
    intelWhyLabel: "Why it matters",
    intelMissionLabel: "Mission pressure",
    intelNextStepLabel: "Best next step",
    intelBlockedLabel: "Why scouts stop here",
    intelAccessLabel: "What opens this path",
    intelNoteLabel: "Report note",
    intelSupportLabel: "Points toward",
    intelRepeatPrefix: "Your notes still point to",
    intelDefaultStatus: "Mission Intel",
    intelDefaultFinding: "Scout the marked places to see what is failing on the ground.",
    intelDefaultWhy: "Each clue can change which order makes the most sense.",
    intelDefaultNote: "Different places reveal different parts of the problem.",
    intelGenericWhy: "This clue changes how the final order might work.",
    mapLocationLabel: "Current Spot",
    mapObjectivesLabel: "Scout Goals",
    mapLegendLabel: "Map Help",
    mapHelpOpen: "Help",
    mapHelpClose: "Close",
    mapInspectDismiss: "Back to Map",
    mapControlsLabel: "Touch Pad",
    mapFactionLabel: "Power Map",
    mapControlsHint: "Tap the pad to move. Tap A to inspect. Arrows and WASD still work.",
    mapInteract: "Inspect",
    mapMoveNorth: "Up",
    mapMoveWest: "Left",
    mapMoveEast: "Right",
    mapMoveSouth: "Down",
    mapStatusReady: "Ready",
    mapStatusDone: "Checked",
    mapStatusNew: "New",
    mapNeedMore: remaining => `Scout ${remaining} more place${remaining === 1 ? "" : "s"} to unlock your orders.`,
    mapReady: "Scout run complete. Review what your scouts found next.",
    mapBlocked: "A wall, river, or closed path stops you.",
    mapNothingNearby: "No marked place is within reach here.",
    mapCoords: (x, y) => `X ${String(x + 1).padStart(2, "0")}  Y ${String(y + 1).padStart(2, "0")}`,
    mapInspectPrompt: place => `Inspect ${place}.`,
    mapVisitedPrompt: place => `Review your notes on ${place}.`,
    mapLockedPrompt: place => `${place} is not open yet.`,
    mapTierNames: {
      village: "Village Map",
      city: "Castle Town",
      regional: "Regional Map",
      japan: "Japan Map"
    },
    historyNote: "History Note",
    mythCheck: "Myth Check",
    latestScore: "Chapter Points",
    effects: "Stats",
    continue: "Next",
    endEyebrow: "ENDING",
    endHeading: "How History Remembers Your Clan",
    eraBreakdownHeading: "Chapter Scores",
    finalReflection:
      "Big idea: samurai did not stay the same. In one era they fought on horseback. In another they judged cases, kept ledgers, taught students, or joined the new state. The strongest clan changed with the times.",
    restart: "Play Again",
    houseNameLabel: "Clan",
    originLabel: "Background",
    focusLabel: "Style",
    statusLabel: "Rank",
    languageValueLabel: "Language",
    noTraits: "No traits yet",
    traitsMore: count => `+${count} more`,
    noLogTitle: "No entries yet",
    noLogCopy: "Your next choice will show here.",
    rankRising: "Clan on the Rise",
    rankDaimyo: "Daimyo Clan",
    rankBroker: "Shogun's Ally",
    rankScholar: "Learning Clan",
    rankSteward: "Steady Clan",
    rankFragile: "Struggling Clan",
    defaultName: "Takeda",
    chapterLabel: (current, total) => `CHAPTER ${current} OF ${total}`,
    languageNames: {
      en: "English",
      es: "Espanol"
    },
    statLabels: {
      standing: "Standing",
      giri: "Duty",
      koku: "Rice",
      learning: "Learning",
      people: "Trust"
    },
    termTier2: "Tier 2 word",
    termTier3: "Tier 3 word",
    startLogOrigin: (name, origin) => `${name} starts as a ${origin}.`,
    startLogFocus: focus => `Its leader follows the ${focus} style.`,
    reflectionLead: (name, first, second) =>
      `${name}'s strongest traits by the end were ${first.toLowerCase()} and ${second.toLowerCase()}.`,
    playHint: "Tap a highlighted word to see what it means.",
    titleSummaryHeading: "About"
  },
  es: {
    hudEyebrow: "RPG HISTORICO RETRO",
    hudTitle: "Samurai Paths",
    hudSubtitle: "Lidera tu clan por grandes decisiones de la historia japonesa.",
    languageLabel: "Idioma",
    glossaryOn: "Palabras ON",
    glossaryOff: "Palabras OFF",
    teacherNotesButton: "Guia",
    teacherNotesTitle: "Guia",
    teacherNotes: [
      "El trabajo samurai cambio con el tiempo. No siempre significo lo mismo.",
      "Mira lo que cada era recompensa. Una decision audaz puede ayudar en un capitulo y fallar en otro.",
      "Las batallas importan, pero tambien el arroz, los caminos, los registros, la ley y la confianza."
    ],
    profileHeading: "Lider",
    legacyScoreLabel: "Legado",
    eraScoreLabel: "Era",
    statsHeading: "Stats",
    traitsHeading: "Rasgos",
    vocabHeading: "Ayuda",
    tier2Legend: "Palabras nivel 2",
    tier3Legend: "Palabras nivel 3",
    logHeading: "Registro",
    titleEyebrow: "PULSA START",
    titleHeading: "Samurai Paths",
    titleCopy: "Construye tu lider, enfrenta grandes giros de la historia japonesa y descubre que clase de clan sobrevive.",
    titleStart: "Iniciar juego",
    titleBriefHeading: "Tu mision",
    titleBrief: [
      "Empieza con un nombre, un origen y un estilo de liderazgo.",
      "Luego guia tu clan por ocho capitulos de guerra, paz, reforma y cambio."
    ],
    titleMenuHeading: "Como jugar",
    titleMenu: [
      "1. Construye tu clan paso a paso.",
      "2. Lee la introduccion y luego explora el mapa.",
      "3. Revisa lugares clave, desbloquea tus ordenes y elige un movimiento."
    ],
    titleHow: "Acerca de",
    titleBlurb: [
      "Este es un RPG historico de una sola pantalla.",
      "Construye tu clan y guialo por ocho momentos clave del pasado de Japon.",
      "Activa o desactiva la ayuda de palabras cuando la necesites."
    ],
    setupEyebrow: "CONSTRUYE TU CLAN",
    setupHeading: "Crea tu lider",
    setupHeadings: {
      name: "Nombra tu clan",
      family: "Elige un origen",
      focus: "Elige un estilo",
      summary: "Listo para empezar"
    },
    nameLabel: "Nombre de familia",
    namePlaceholder: "Takeda",
    randomNameButton: "Nombre al azar",
    nameHelper: "Escribe tu propio nombre de familia o crea uno al azar.",
    familyHeading: "Origen",
    focusHeading: "Estilo de lider",
    setupHint: "Construye tu clan paso a paso.",
    previewLabel: "Hasta ahora",
    setupBack: "Volver",
    setupBackToStart: "Volver",
    setupBackStep: "Volver",
    setupContinue: "Siguiente",
    setupReview: "Revisar",
    beginJourney: "Comenzar viaje",
    setupStepLabel: (current, total) => `PASO ${current} DE ${total}`,
    setupPrompts: {
      name: "Elige el nombre que llevara tu clan.",
      family: "Escoge el origen con el que empieza tu clan.",
      focus: "Escoge el estilo que guiara tus decisiones.",
      summary: "Revisa tu tarjeta y luego comienza el viaje."
    },
    objectiveLabel: "Tu mision",
    narratorLabel: "Narrador",
    skipIntro: "Avanzar",
    choiceHeading: "Da tu orden",
    mapLabel: "Mapa",
    mapDockLabel: "Informe de exploracion",
    mapDockLead: "Explora los lugares marcados. Necesitas pruebas reales antes de dar una orden.",
    mapDockReadyLead: "Ya tienes suficientes pistas. Vuelve del mapa y revisa lo que encontraron tus exploradores.",
    mapDockProgress: (checked, total) => `Pistas ${checked}/${total}`,
    mapOpenButton: "Buscar pistas",
    mapCloseButton: "Volver",
    mapMinimapStub: "ESPACIO MINIMAPA",
    investigationHeading: "Informe de exploracion",
    investigationLead: (checked, total) => `Tus exploradores revisaron ${checked} de ${total} sitios clave.`,
    investigationLocked: "Explora los lugares marcados para construir tu caso.",
    investigationNeedMore: remaining =>
      `Aun faltan ${remaining} sitio${remaining === 1 ? "" : "s"} clave por revisar.`,
    investigationReady: "Ya tienes suficiente evidencia. Revisa el informe y luego da tu orden.",
    investigationWhatLearned: "Lo que revelo la exploracion",
    investigationNoNotes: "Todavia no hay notas de campo.",
    investigationMoreNotes: count => `+${count} notas mas en el registro completo.`,
    reviewEyebrow: "INFORME DE EXPLORACION",
    reviewHeading: "Revisa el informe de exploracion",
    reviewBackToMap: "Volver al mapa",
    reviewHintsButton: "Leer presiones",
    reviewChooseButton: "Dar tu orden",
    reviewHintsHeading: "Pistas de presion",
    reviewHintsLead: "Estas pistas muestran que resuelve primero cada movimiento y que deja expuesto.",
    choiceBackButton: "Volver al informe",
    strategyPressureLabel: "Presiones mas fuertes",
    strategyReadLabel: "Tu clan lo lee asi",
    strategyGuideLabel: "Guia de respuesta",
    strategyEvidenceLabel: "Los exploradores vieron",
    strategyRiskLabel: "Riesgo",
    strategyRemainingLabel: "Sigue en riesgo",
    intelFindingLabel: "Los exploradores descubren",
    intelWhyLabel: "Por que importa",
    intelMissionLabel: "Presion de la mision",
    intelNextStepLabel: "Mejor siguiente paso",
    intelBlockedLabel: "Por que se detienen los exploradores",
    intelAccessLabel: "Que abre este paso",
    intelNoteLabel: "Nota del informe",
    intelSupportLabel: "Apunta hacia",
    intelRepeatPrefix: "Tus notas aun apuntan a",
    intelDefaultStatus: "Intel de mision",
    intelDefaultFinding: "Explora los lugares marcados para ver que esta fallando en el terreno.",
    intelDefaultWhy: "Cada pista puede cambiar que orden tiene mas sentido.",
    intelDefaultNote: "Cada lugar muestra una parte distinta del problema.",
    intelGenericWhy: "Esta pista cambia como podria funcionar la orden final.",
    mapLocationLabel: "Lugar actual",
    mapObjectivesLabel: "Metas",
    mapLegendLabel: "Ayuda del mapa",
    mapHelpOpen: "Ayuda",
    mapHelpClose: "Cerrar",
    mapInspectDismiss: "Volver al mapa",
    mapControlsLabel: "Pad tactil",
    mapFactionLabel: "Poderes",
    mapControlsHint: "Toca el pad para moverte. Toca A para inspeccionar. Flechas y WASD tambien sirven.",
    mapInteract: "Inspeccionar",
    mapMoveNorth: "Arriba",
    mapMoveWest: "Izq.",
    mapMoveEast: "Der.",
    mapMoveSouth: "Abajo",
    mapStatusReady: "Listo",
    mapStatusDone: "Hecho",
    mapStatusNew: "Nuevo",
    mapNeedMore: remaining => `Explora ${remaining} lugar${remaining === 1 ? "" : "es"} mas para desbloquear tus ordenes.`,
    mapReady: "Exploracion completa. Revisa ahora lo que encontraron tus exploradores.",
    mapBlocked: "Un muro, un rio o un camino cerrado te detiene.",
    mapNothingNearby: "No hay un lugar marcado al alcance aqui.",
    mapCoords: (x, y) => `X ${String(x + 1).padStart(2, "0")}  Y ${String(y + 1).padStart(2, "0")}`,
    mapInspectPrompt: place => `Inspecciona ${place}.`,
    mapVisitedPrompt: place => `Revisa tus notas sobre ${place}.`,
    mapLockedPrompt: place => `${place} todavia no esta abierto.`,
    mapTierNames: {
      village: "Mapa de aldea",
      city: "Ciudad-castillo",
      regional: "Mapa regional",
      japan: "Mapa de Japon"
    },
    historyNote: "Dato historico",
    mythCheck: "Revision del mito",
    latestScore: "Puntos del capitulo",
    effects: "Stats",
    continue: "Siguiente",
    endEyebrow: "FINAL",
    endHeading: "Como recuerda la historia a tu clan",
    eraBreakdownHeading: "Puntos por capitulo",
    finalReflection:
      "Idea clave: los samurai no fueron siempre iguales. En una era combatieron a caballo. En otra llevaron registros, juzgaron casos, ensenaron o entraron al nuevo estado. El mejor clan cambia con el tiempo.",
    restart: "Jugar otra vez",
    houseNameLabel: "Clan",
    originLabel: "Origen",
    focusLabel: "Estilo",
    statusLabel: "Rango",
    languageValueLabel: "Idioma",
    noTraits: "Todavia no hay rasgos",
    traitsMore: count => `+${count} mas`,
    noLogTitle: "Sin entradas",
    noLogCopy: "Tu siguiente eleccion aparecera aqui.",
    rankRising: "Clan en ascenso",
    rankDaimyo: "Clan daimyo",
    rankBroker: "Aliado del shogun",
    rankScholar: "Clan de estudio",
    rankSteward: "Clan firme",
    rankFragile: "Clan en problemas",
    defaultName: "Takeda",
    chapterLabel: (current, total) => `CAPITULO ${current} DE ${total}`,
    languageNames: {
      en: "English",
      es: "Espanol"
    },
    statLabels: {
      standing: "Prestigio",
      giri: "Deber",
      koku: "Arroz",
      learning: "Aprendizaje",
      people: "Confianza"
    },
    termTier2: "Palabra nivel 2",
    termTier3: "Palabra nivel 3",
    startLogOrigin: (name, origin) => `${name} empieza como ${origin}.`,
    startLogFocus: focus => `Su lider sigue el estilo ${focus}.`,
    reflectionLead: (name, first, second) =>
      `Los rasgos mas fuertes de ${name} al final fueron ${first.toLowerCase()} y ${second.toLowerCase()}.`,
    playHint: "Toca una palabra resaltada para ver que significa.",
    titleSummaryHeading: "Acerca de"
  }
};

const historicalClanNamePool = [
  "Minamoto",
  "Taira",
  "Fujiwara",
  "Tachibana",
  "Hojo",
  "Ashikaga",
  "Tokugawa",
  "Mori",
  "Shimazu",
  "Date",
  "Uesugi",
  "Takeda",
  "Oda",
  "Imagawa",
  "Chosokabe",
  "Hosokawa",
  "Satake",
  "Maeda",
  "Sanada",
  "Ogasawara"
];

const baseStats = {
  standing: 42,
  giri: 50,
  koku: 44,
  learning: 38,
  people: 46
};

const statOrder = ["standing", "giri", "koku", "learning", "people"];

const families = [
  {
    id: "provincial",
    name: {
      en: "Border Clan",
      es: "Clan de frontera"
    },
    description: {
      en: "You guard farms, roads, and villages far from the capital.",
      es: "Proteges campos, caminos y aldeas lejos de la capital."
    },
    effects: {
      standing: -1,
      giri: 4,
      koku: 3,
      learning: 0,
      people: 5
    },
    badge: {
      id: "provincial-roots",
      en: "Border Roots",
      es: "Raices provinciales"
    }
  },
  {
    id: "court",
    name: {
      en: "Court Clan",
      es: "Clan cortesano"
    },
    description: {
      en: "You know titles, ceremony, and powerful people in Kyoto.",
      es: "Conoces titulos, ceremonia y gente poderosa en Kioto."
    },
    effects: {
      standing: 6,
      giri: 1,
      koku: 1,
      learning: 4,
      people: -1
    },
    badge: {
      id: "court-ties",
      en: "Court Ties",
      es: "Lazos cortesanos"
    }
  },
  {
    id: "scholar",
    name: {
      en: "Record Clan",
      es: "Clan de registros"
    },
    description: {
      en: "You trust maps, ledgers, and careful planning.",
      es: "Confias en mapas, registros y planes cuidadosos."
    },
    effects: {
      standing: 1,
      giri: 2,
      koku: 0,
      learning: 7,
      people: 2
    },
    badge: {
      id: "learning-tradition",
      en: "Record Keepers",
      es: "Tradicion de aprendizaje"
    }
  }
];

const focuses = [
  {
    id: "martial",
    name: {
      en: "Commander",
      es: "Comandante"
    },
    description: {
      en: "Lead with drills, retainers, and bold attacks.",
      es: "Lidera con practica, jinetes y ataques audaces."
    },
    effects: {
      standing: 4,
      giri: 3,
      koku: 1,
      learning: 0,
      people: -1
    },
    badge: {
      id: "martial-focus",
      en: "Command Style",
      es: "Enfoque marcial"
    }
  },
  {
    id: "steward",
    name: {
      en: "Steward",
      es: "Administrador"
    },
    description: {
      en: "Lead with rice, taxes, roads, and order.",
      es: "Lidera con arroz, impuestos, caminos y orden."
    },
    effects: {
      standing: 1,
      giri: 2,
      koku: 6,
      learning: 2,
      people: 3
    },
    badge: {
      id: "steward-focus",
      en: "Steward's Ledger",
      es: "Libro del administrador"
    }
  },
  {
    id: "scholar",
    name: {
      en: "Strategist",
      es: "Estratega"
    },
    description: {
      en: "Lead with plans, timing, and smart deals.",
      es: "Lidera con planes, tiempo oportuno y acuerdos inteligentes."
    },
    effects: {
      standing: 2,
      giri: 1,
      koku: 1,
      learning: 6,
      people: 2
    },
    badge: {
      id: "scholar-focus",
      en: "Strategist's Mind",
      es: "Mente estratega"
    }
  }
];

const glossary = {
  alliance: {
    tier: 2,
    term: {
      en: "alliance",
      es: "alianza"
    },
    definition: {
      en: "A cooperative relationship between people or groups who support each other.",
      es: "Relacion cooperativa entre personas o grupos que se apoyan mutuamente."
    }
  },
  legitimacy: {
    tier: 2,
    term: {
      en: "legitimacy",
      es: "legitimidad"
    },
    definition: {
      en: "Publicly recognized right to rule or act with authority.",
      es: "Derecho reconocido publicamente para gobernar o actuar con autoridad."
    }
  },
  administration: {
    tier: 2,
    term: {
      en: "administration",
      es: "administracion"
    },
    definition: {
      en: "The work of managing records, rules, taxes, and officials.",
      es: "Trabajo de gestionar registros, normas, impuestos y funcionarios."
    }
  },
  reform: {
    tier: 2,
    term: {
      en: "reform",
      es: "reforma"
    },
    definition: {
      en: "A planned change meant to improve a system.",
      es: "Cambio planificado para mejorar un sistema."
    }
  },
  negotiate: {
    tier: 2,
    term: {
      en: "negotiate",
      es: "negociar"
    },
    definition: {
      en: "To discuss terms so different groups can reach an agreement.",
      es: "Hablar condiciones para que distintos grupos lleguen a un acuerdo."
    }
  },
  revenue: {
    tier: 2,
    term: {
      en: "revenue",
      es: "ingresos"
    },
    definition: {
      en: "Income collected through taxes, trade, or other resources.",
      es: "Ingreso obtenido por impuestos, comercio u otros recursos."
    }
  },
  adapt: {
    tier: 2,
    term: {
      en: "adapt",
      es: "adaptarse"
    },
    definition: {
      en: "To change methods or behavior so you can succeed in new conditions.",
      es: "Cambiar metodos o conducta para tener exito en nuevas condiciones."
    }
  },
  retainer: {
    tier: 3,
    term: {
      en: "retainer",
      es: "retenedor"
    },
    definition: {
      en: "A warrior or servant who owes military or political service to a lord.",
      es: "Guerrero o servidor que debe servicio militar o politico a un senor."
    }
  },
  shogunate: {
    tier: 3,
    term: {
      en: "shogunate",
      es: "shogunato"
    },
    definition: {
      en: "The military government led by a shogun.",
      es: "Gobierno militar dirigido por un shogun."
    }
  },
  bakufu: {
    tier: 3,
    term: {
      en: "bakufu",
      es: "bakufu"
    },
    definition: {
      en: "A Japanese term for the military government headed by the shogun.",
      es: "Termino japones para el gobierno militar encabezado por el shogun."
    }
  },
  gokenin: {
    tier: 3,
    term: {
      en: "gokenin",
      es: "gokenin"
    },
    definition: {
      en: "A direct vassal of the Kamakura shogunate who owed service in return for protection and land rights.",
      es: "Vasallo directo del shogunato de Kamakura que debia servicio a cambio de proteccion y derechos de tierra."
    }
  },
  daimyo: {
    tier: 3,
    term: {
      en: "daimyo",
      es: "daimyo"
    },
    definition: {
      en: "A powerful territorial lord who controlled land, retainers, and local government.",
      es: "Senor territorial poderoso que controlaba tierras, retenedores y gobierno local."
    }
  },
  koku: {
    tier: 3,
    term: {
      en: "koku",
      es: "koku"
    },
    definition: {
      en: "A rice-based unit used to estimate agricultural output and domain wealth.",
      es: "Unidad basada en arroz usada para estimar produccion agricola y riqueza del dominio."
    }
  },
  sankinKotai: {
    tier: 3,
    term: {
      en: "sankin-kotai",
      es: "sankin-kotai"
    },
    definition: {
      en: "The Tokugawa system that required daimyo to alternate residence between their domains and Edo.",
      es: "Sistema Tokugawa que exigia a los daimyo alternar residencia entre sus dominios y Edo."
    }
  },
  rangaku: {
    tier: 3,
    term: {
      en: "rangaku",
      es: "rangaku"
    },
    definition: {
      en: "Dutch learning, or the study of Western science and knowledge through Dutch sources in Edo Japan.",
      es: "Aprendizaje holandes, o estudio de ciencia y saber occidental por fuentes neerlandesas en el Japon Edo."
    }
  },
  stipend: {
    tier: 3,
    term: {
      en: "stipend",
      es: "estipendio"
    },
    definition: {
      en: "A regular payment or allowance, often given to samurai by a domain lord.",
      es: "Pago regular o asignacion entregada con frecuencia a samurai por un senor del dominio."
    }
  },
  meijiRestoration: {
    tier: 3,
    term: {
      en: "Meiji Restoration",
      es: "Restauracion Meiji"
    },
    definition: {
      en: "The political transformation beginning in 1868 that restored imperial rule and accelerated modernization.",
      es: "Transformacion politica iniciada en 1868 que restauro el poder imperial y acelero la modernizacion."
    }
  }
};

const scenes = [
  {
    id: "heian",
    period: {
      en: "Late Heian countryside",
      es: "Campo del Heian tardio"
    },
    years: "c. 1085",
    title: {
      en: "Raiders at the Edge of the Estate",
      es: "Alarma en la frontera de la hacienda"
    },
    lens: {
      en: "Land security and local ties",
      es: "Seguridad territorial y lazos locales"
    },
    objective: {
      en: "Find what is breaking estate safety, then decide what your house protects first.",
      es: "Demuestra que tu casa puede proteger haciendas sin perder la confianza local."
    },
    scoreLabel: {
      en: "Estate Security Score",
      es: "Puntuacion de seguridad de la hacienda"
    },
    weights: {
      standing: 0.2,
      giri: 0.2,
      koku: 0.25,
      learning: 0.1,
      people: 0.25
    },
    paragraphs: {
      en: [
        "Kyoto feels far away. Out here, one raid can empty a rice storehouse or ruin a whole harvest, but long patrols can drain the same grain.",
        "Village heads want to know if your retainers can guard the roads, fields, and granaries without turning on the people.",
        "How will you answer the alarm?"
      ],
      es: [
        "Tu casa sirve a una hacienda tributaria lejos de Kioto. Saqueos, disputas de tierras y patrullas debiles amenazan las cosechas, pero las patrullas largas tambien gastan ese mismo grano.",
        "Si demuestras que tu linaje es una casa de [[retainer|retenedores]] confiable, los funcionarios locales podrian confiarte mas jinetes y almacenes.",
        "Como aseguras el distrito y fortaleces tu [[legitimacy|legitimidad]]?"
      ]
    },
    note: {
      en: "Early samurai power grew in the provinces, where families protected estates far from the capital.",
      es: "El poder samurai temprano crecio en las provincias mediante defensa de haciendas, servicio montado y lazos personales con propietarios."
    },
    myth: {
      en: "Samurai were not yet the rulers of Japan. Many began as local land guards and mounted retainers.",
      es: "Los samurai todavia no eran una clase gobernante unica en todo Japon. Eran especialistas militares locales en ascenso."
    },
    choices: [
      {
        id: "heian-alliance",
        text: {
          en: "Call village heads, retainers, and nearby house guards to build shared watch posts and warning routes.",
          es: "Reune jefes de aldea, retenedores y jinetes cercanos para crear puestos compartidos de vigilancia y aviso."
        },
        result: {
          en: "Watch posts rise, warning routes improve, and more villages begin to trust your house. But gifts, grain shares, and extra watch duty cut into stored rice, and the roads still take time to cover.",
          es: "Se levantan puestos de vigilancia, mejoran las rutas de aviso y mas aldeas empiezan a confiar en tu casa. Pero los regalos, el grano compartido y la guardia extra gastan las reservas, y aun hace falta tiempo para cubrir todos los caminos."
        },
        log: {
          en: "Village heads and retainers tied the estate together, but shared defense cost grain.",
          es: "Jefes de aldea y retenedores unieron la hacienda, pero la defensa compartida costo grano."
        },
        effects: {
          standing: 2,
          giri: 3,
          koku: -2,
          learning: 1,
          people: 5
        },
        scoreBonus: 4,
        badge: {
          id: "alliance-builder",
          en: "Alliance Builder",
          es: "Tejedor de alianzas"
        }
      },
      {
        id: "heian-martial",
        text: {
          en: "Send mounted retainers at once and harden the east road with stronger patrols.",
          es: "Envia jinetes montados de inmediato y refuerza el camino oriental con patrullas mas duras."
        },
        result: {
          en: "Your retainers scatter the raiders and the roads feel safer fast, but extra horse patrols eat into stored rice and nearby villages now watch your guards with fear.",
          es: "Tus retenedores dispersan a los saqueadores y los caminos se sienten mas seguros rapido, pero las patrullas a caballo gastan arroz almacenado y las aldeas cercanas ahora miran a tus guardias con miedo."
        },
        log: {
          en: "Fast patrols closed the roads, but grain ran low and fear spread with them.",
          es: "Las patrullas rapidas cerraron los caminos, pero el grano bajo y el miedo avanzo con ellas."
        },
        effects: {
          standing: 6,
          giri: 4,
          koku: -2,
          learning: 0,
          people: -1
        },
        scoreBonus: 5,
        badge: {
          id: "mounted-patrol",
          en: "Mounted Patrol",
          es: "Patrulla montada"
        }
      },
      {
        id: "heian-survey",
        text: {
          en: "Check tax ledgers, field lines, and old border fights before moving more troops.",
          es: "Revisa padrones, linderos y viejas disputas de frontera antes de mover mas tropas."
        },
        result: {
          en: "Your ledgers sharpen, grain and field claims grow clearer, and border fights become easier to settle. But the road guards stay thin, and the next raid could still hit before new orders spread.",
          es: "Tus registros se aclaran, el grano y los reclamos de tierras quedan mas claros y las disputas de frontera se vuelven mas faciles de resolver. Pero los guardias del camino siguen siendo pocos y el siguiente saqueo aun puede llegar antes de que se repartan las nuevas ordenes."
        },
        log: {
          en: "Clear records steadied the estate, even while road defense stayed thin.",
          es: "Los registros claros estabilizaron la hacienda, aunque la defensa del camino siguio siendo delgada."
        },
        effects: {
          standing: 0,
          giri: 1,
          koku: 4,
          learning: 5,
          people: -1
        },
        scoreBonus: 4,
        badge: {
          id: "estate-surveyor",
          en: "Estate Surveyor",
          es: "Inspector de haciendas"
        }
      }
    ]
  },
  {
    id: "genpei",
    period: {
      en: "Genpei War",
      es: "Guerra Genpei"
    },
    years: "1180-1185",
    title: {
      en: "Choose a Banner",
      es: "Estandartes de guerra por las provincias"
    },
    lens: {
      en: "Logistics, loyalty, and survival",
      es: "Logistica, lealtad y supervivencia"
    },
    objective: {
      en: "Scout the war pressure around you, then decide where your grain and loyalty will go.",
      es: "Elige una estrategia de guerra que mantenga viva a tu casa mientras clanes mayores luchan por el poder."
    },
    scoreLabel: {
      en: "War Coalition Score",
      es: "Puntuacion de coalicion de guerra"
    },
    weights: {
      standing: 0.25,
      giri: 0.25,
      koku: 0.15,
      learning: 0.15,
      people: 0.2
    },
    paragraphs: {
      en: [
        "The Taira and Minamoto are pulling smaller houses into civil war.",
        "A brave charge can win fame, but so can full storehouses, guarded roads, and backing the right banner at the right time.",
        "Which risk will you take?"
      ],
      es: [
        "Los Taira y los Minamoto luchan por la supremacia. Cada casa debe decidir adonde enviar hombres, suministros y mensajes.",
        "El valor en batalla importa, pero tambien la comida, los caminos y la capacidad de [[negotiate|negociar]] lealtades.",
        "Como respondera tu casa a los estandartes de guerra?"
      ]
    },
    note: {
      en: "The Genpei War helped warrior houses take more power and cleared the way for shogunal rule.",
      es: "La Guerra Genpei ayudo a trasladar la autoridad politica hacia casas militares y preparo el camino para el gobierno shogunal."
    },
    myth: {
      en: "Wars were not won by sword fights alone. Food, transport, and alliances mattered just as much.",
      es: "La victoria no dependio solo de duelos y heroismo. Tambien importaron suministros, comunicacion y redes regionales."
    },
    choices: [
      {
        id: "genpei-commit",
        text: {
          en: "Ride under the Minamoto banner now and send your best warriors.",
          es: "Comprometete pronto con la coalicion Minamoto y envia jinetes para probar lealtad."
        },
        result: {
          en: "Your banner appears in hard fighting, and rising Minamoto leaders remember your name.",
          es: "Tu compromiso audaz llama la atencion de comandantes en ascenso, pero tus tierras sienten el costo de la guerra."
        },
        log: {
          en: "The house rode early under the Minamoto banner.",
          es: "La casa aposto por la coalicion Minamoto en ascenso."
        },
        effects: {
          standing: 7,
          giri: 5,
          koku: 0,
          learning: 1,
          people: -3
        },
        scoreBonus: 6,
        badge: {
          id: "war-banner",
          en: "War Banner",
          es: "Estandarte de guerra"
        }
      },
      {
        id: "genpei-supply",
        text: {
          en: "Guard supply roads and river crossings while backing one side with care.",
          es: "Protege lineas de suministro y aldeas mientras ofreces apoyo limitado a un pretendiente."
        },
        result: {
          en: "Grain keeps moving, villages hold together, and commanders learn your house can be trusted in chaos.",
          es: "Tu casa se vuelve conocida por ser confiable en el caos, y las comunidades cercanas siguen funcionando."
        },
        log: {
          en: "The house kept food and messengers moving through the war.",
          es: "La casa sobrevivio la guerra al proteger suministros y aldeas."
        },
        effects: {
          standing: 3,
          giri: 5,
          koku: 3,
          learning: 2,
          people: 4
        },
        scoreBonus: 5,
        badge: {
          id: "supply-commander",
          en: "Supply Commander",
          es: "Comandante de suministros"
        }
      },
      {
        id: "genpei-intel",
        text: {
          en: "Hold back, gather reports, and ride only when the war begins to tilt.",
          es: "Retrasa un compromiso abierto, reune informacion y espera a que cambie el equilibrio."
        },
        result: {
          en: "You avoid an early disaster, but some warriors whisper that your house waited too long.",
          es: "Algunos rivales te llaman cauteloso, pero tu casa conserva fuerzas y lee la guerra con cuidado."
        },
        log: {
          en: "The house watched the banners before showing its own.",
          es: "La casa observo la guerra de cerca antes de actuar."
        },
        effects: {
          standing: 1,
          giri: 1,
          koku: 2,
          learning: 6,
          people: 0
        },
        scoreBonus: 4,
        badge: {
          id: "watcher-of-fortunes",
          en: "Watcher of Fortunes",
          es: "Observador del destino"
        }
      }
    ]
  },
  {
    id: "kamakura",
    period: {
      en: "Kamakura shogunate",
      es: "Shogunato Kamakura"
    },
    years: "c. 1232",
    title: {
      en: "Summons from Kamakura",
      es: "Servicio bajo el nuevo gobierno militar"
    },
    lens: {
      en: "Law, vassal ties, and practical rule",
      es: "Ley, lazos vasallaticos y gobierno practico"
    },
    objective: {
      en: "Judge what the new [[shogunate|shogunate]] can offer and what tying your house to it may cost.",
      es: "Decide como operara tu casa bajo el nuevo [[shogunate|shogunato]]."
    },
    scoreLabel: {
      en: "Bakufu Service Score",
      es: "Puntuacion de servicio al bakufu"
    },
    weights: {
      standing: 0.25,
      giri: 0.25,
      koku: 0.15,
      learning: 0.15,
      people: 0.2
    },
    paragraphs: {
      en: [
        "A new government in Kamakura wants names, seals, land records, and military service.",
        "Stand close to the [[bakufu|bakufu]] and you may win protection in land disputes. Stand too close, and your house is tied to its fortunes.",
        "How will you answer the summons?"
      ],
      es: [
        "El [[bakufu|bakufu]] de Kamakura ahora reclama la verdadera autoridad militar, mientras la corte sigue siendo simbolicamente importante.",
        "Los vasallos directos llamados [[gokenin|gokenin]] deben servicio a cambio de proteccion, apoyo legal y reconocimiento.",
        "Que camino da a tu casa el lugar mas fuerte en este nuevo orden?"
      ]
    },
    note: {
      en: "Kamakura rule tied many warriors to the shogunate through service, law, and land rights.",
      es: "El gobierno de Kamakura vinculo a los guerreros con un gobierno militar mediante servicio, casos legales y derechos sobre la tierra."
    },
    myth: {
      en: "The emperor still mattered, but the shogunate handled more of the real military and land power.",
      es: "El emperador no desaparecio, pero el shogunato gestiono cada vez mas el poder militar practico."
    },
    choices: [
      {
        id: "kamakura-direct",
        text: {
          en: "Swear direct service as a [[gokenin|gokenin]] and place your house near Kamakura.",
          es: "Jura servicio directo como gokenin y ata tu futuro al bakufu."
        },
        result: {
          en: "Your land claims gain stronger backing, and your house rises in the new military order.",
          es: "Tu casa gana prestigio en el nuevo orden militar y pasa a formar parte de la politica shogunal."
        },
        log: {
          en: "The house entered direct service to Kamakura.",
          es: "La casa entro en servicio directo al bakufu."
        },
        effects: {
          standing: 7,
          giri: 6,
          koku: 2,
          learning: 1,
          people: 0
        },
        scoreBonus: 6,
        badge: {
          id: "gokenin-service",
          en: "Gokenin Service",
          es: "Servicio gokenin"
        }
      },
      {
        id: "kamakura-balance",
        text: {
          en: "Keep court ties alive while serving the bakufu with care.",
          es: "Equilibra costumbres cortesanas con deber al bakufu mediante registros y protocolo cuidadosos."
        },
        result: {
          en: "You move between court rank and military power, opening doors in both places.",
          es: "Te mueves entre viejo prestigio y nuevo poder, construyendo influencia sin abandonar ninguno de los dos mundos."
        },
        log: {
          en: "The house balanced court rank with bakufu service.",
          es: "La casa equilibrio prestigio cortesano con servicio al bakufu."
        },
        effects: {
          standing: 5,
          giri: 4,
          koku: 2,
          learning: 4,
          people: 1
        },
        scoreBonus: 5,
        badge: {
          id: "two-worlds",
          en: "Two Worlds",
          es: "Dos mundos"
        }
      },
      {
        id: "kamakura-local",
        text: {
          en: "Stay close to home: settle disputes, feed retainers, and keep village justice steady.",
          es: "Resuelve disputas locales con justicia y asegurate de que los retenedores esten pagados y alimentados."
        },
        result: {
          en: "Retainers stay loyal, and local people begin to see your house as firm and fair.",
          es: "Tu casa se vuelve confiable a nivel local, con seguidores fuertes y menos disputas."
        },
        log: {
          en: "The house grew stronger by ruling its own lands well.",
          es: "El gobierno local dio a la casa una autoridad resistente."
        },
        effects: {
          standing: 2,
          giri: 5,
          koku: 4,
          learning: 3,
          people: 5
        },
        scoreBonus: 5,
        badge: {
          id: "steady-steward",
          en: "Steady Steward",
          es: "Administrador firme"
        }
      }
    ]
  },
  {
    id: "onin",
    period: {
      en: "Onin War and Sengoku opening",
      es: "Guerra Onin e inicio Sengoku"
    },
    years: "1467-1477",
    title: {
      en: "Keep the Province Together",
      es: "Un reino fracturado"
    },
    lens: {
      en: "Decentralization and regional power",
      es: "Descentralizacion y poder regional"
    },
    objective: {
      en: "Find what is snapping first in your region, then choose what you will hold together.",
      es: "Mantén unidas tus tierras mientras la autoridad central se debilita y surgen senores regionales."
    },
    scoreLabel: {
      en: "Regional Power Score",
      es: "Puntuacion de poder regional"
    },
    weights: {
      standing: 0.2,
      giri: 0.15,
      koku: 0.25,
      learning: 0.2,
      people: 0.2
    },
    paragraphs: {
      en: [
        "Kyoto burns, but the real danger is what reaches your roads: broken alliances, seized toll gates, and lords building castles.",
        "To hold a region now, your house needs grain, couriers, storehouses, and followers who will not scatter.",
        "What will hold your lands together?"
      ],
      es: [
        "El conflicto en Kioto se extiende hacia afuera. Las casas regionales ahora construyen castillos, compiten por caminos y buscan toda [[alliance|alianza]] util.",
        "Un senor de guerra exitoso necesita mas que combatientes. Necesita comida, registros, mercados y hombres que permanezcan leales.",
        "Que mantendra intacta a tu casa mientras el reino se fractura?"
      ]
    },
    note: {
      en: "As central power weakened, regional houses relied on castles, supply lines, and records to survive.",
      es: "Al debilitarse la autoridad central, las casas militares regionales construyeron poder con castillos, grano, redes y administracion."
    },
    myth: {
      en: "A fractured age did not reward only fighting. Good roads, grain, and information also built power.",
      es: "El liderazgo Sengoku no fue solo habilidad de batalla. El gobierno y la logistica hicieron durable el poder."
    },
    choices: [
      {
        id: "onin-castle",
        text: {
          en: "Fortify a hill castle and pack it with grain, arrows, and loyal retainers.",
          es: "Fortifica un castillo de colina y exige servicio mas estricto a los retenedores."
        },
        result: {
          en: "Your stronghold becomes harder to crack, and rival lords think twice before testing you.",
          es: "Tus defensas mejoran, pero la gente siente la presion de demandas militares constantes."
        },
        log: {
          en: "The castle became the house's iron center.",
          es: "La casa se endurecio detras de murallas de castillo."
        },
        effects: {
          standing: 5,
          giri: 4,
          koku: 3,
          learning: 1,
          people: 0
        },
        scoreBonus: 6,
        badge: {
          id: "fortified-house",
          en: "Fortified House",
          es: "Casa fortificada"
        }
      },
      {
        id: "onin-market",
        text: {
          en: "Protect roads, river crossings, and markets so merchants and rice can keep moving.",
          es: "Construye lazos matrimoniales y mercados seguros para que el grano y el comercio sigan circulando."
        },
        result: {
          en: "Trade survives, granaries stay fuller, and more villages back your house because daily life still works.",
          es: "Mercaderes y aldeas mantienen abastecida tu region, dando a tu casa una influencia que dura mas que las batallas."
        },
        log: {
          en: "The house kept roads and markets alive while others burned.",
          es: "Mercados y alianzas mantuvieron conectada la region."
        },
        effects: {
          standing: 4,
          giri: 3,
          koku: 5,
          learning: 2,
          people: 4
        },
        scoreBonus: 6,
        badge: {
          id: "market-broker",
          en: "Market Broker",
          es: "Intermediario de mercados"
        }
      },
      {
        id: "onin-records",
        text: {
          en: "Build a courier and scribe network to track land, taxes, and troop calls.",
          es: "Forma escribas para registrar derechos de tierra, levas y rutas de mensajeros."
        },
        result: {
          en: "Orders travel faster, disputes shrink, and your house spots trouble before it spreads.",
          es: "Mejores registros te dan impuestos mas claros, decisiones mas rapidas y menos disputas internas."
        },
        log: {
          en: "Couriers and scribes tightened the house's grip.",
          es: "Los registros administrativos se volvieron el arma oculta de la casa."
        },
        effects: {
          standing: 3,
          giri: 2,
          koku: 3,
          learning: 6,
          people: 2
        },
        scoreBonus: 5,
        badge: {
          id: "route-scribes",
          en: "Route Scribes",
          es: "Escribas de ruta"
        }
      }
    ]
  },
  {
    id: "sengoku",
    period: {
      en: "Sengoku age",
      es: "Epoca Sengoku"
    },
    years: "c. 1555",
    title: {
      en: "Build a Daimyo Domain",
      es: "Puede tu casa convertirse en un poder daimyo?"
    },
    lens: {
      en: "Domain building, firearms, and taxation",
      es: "Construccion del dominio, armas de fuego e impuestos"
    },
    objective: {
      en: "Decide what kind of [[daimyo|daimyo]] power your house will build first: army, grain, or followers.",
      es: "Convierte la supervivencia militar en gobierno regional estable y autoridad [[daimyo|daimyo]] creible."
    },
    scoreLabel: {
      en: "Daimyo Development Score",
      es: "Puntuacion de desarrollo daimyo"
    },
    weights: {
      standing: 0.2,
      giri: 0.15,
      koku: 0.3,
      learning: 0.15,
      people: 0.2
    },
    paragraphs: {
      en: [
        "Castle towns are growing, armies are drilling, and every campaign needs rice, powder, and pay.",
        "A strong [[daimyo|daimyo]] does more than win battles. A strong daimyo can tax land, reward followers, and make people obey.",
        "What will make your house rise?"
      ],
      es: [
        "Los senores regionales experimentan con armas de fuego, ciudades-castillo y sistemas de recaudacion mas precisos.",
        "Una casa fuerte necesita arroz, caminos, almacenes y hombres que crean que su gobierno es util, no solo temido.",
        "Que estrategia hara duradera tu autoridad?"
      ]
    },
    note: {
      en: "Many Sengoku daimyo rose through firearms, taxation, castle towns, and tighter rule over land.",
      es: "Muchos daimyo Sengoku ascendieron mediante organizacion, impuestos, planificacion de ciudades-castillo e integracion de nuevas herramientas militares."
    },
    myth: {
      en: "A daimyo was not just a war hero. A daimyo had to govern land and people too.",
      es: "El rango por si solo no creo un daimyo fuerte. La administracion y los recursos importaron tanto como la fuerza."
    },
    choices: [
      {
        id: "sengoku-firearms",
        text: {
          en: "Buy firearms, drill ashigaru, and harden your army.",
          es: "Invierte en armas de fuego y entrena unidades ashigaru para descargas disciplinadas."
        },
        result: {
          en: "Your volleys hit harder, and rival houses begin treating your army as a real threat.",
          es: "Tus ejercitos se vuelven mas peligrosos, aunque armas y polvora exigen recursos constantes."
        },
        log: {
          en: "Gun drill changed the way the house fought.",
          es: "La disciplina con polvora elevo la reputacion militar de la casa."
        },
        effects: {
          standing: 6,
          giri: 5,
          koku: 1,
          learning: 2,
          people: 0
        },
        scoreBonus: 7,
        badge: {
          id: "gunpowder-drill",
          en: "Gunpowder Drill",
          es: "Taladro de polvora"
        }
      },
      {
        id: "sengoku-koku",
        text: {
          en: "Measure fields in [[koku|koku]], protect irrigation, and fill rice storehouses.",
          es: "Estandariza impuestos en koku y protege la irrigacion para fortalecer los ingresos."
        },
        result: {
          en: "Rice stores climb, taxes feel clearer, and your house can stay in the field longer.",
          es: "Los [[revenue|ingresos]] confiables permiten a tu casa alimentar retenedores, reparar caminos y pagar campanas futuras."
        },
        log: {
          en: "Rice, ledgers, and canals gave the house staying power.",
          es: "La contabilidad del arroz se volvio la base del poder daimyo."
        },
        effects: {
          standing: 4,
          giri: 4,
          koku: 6,
          learning: 4,
          people: 3
        },
        scoreBonus: 6,
        badge: {
          id: "rice-assessor",
          en: "Rice Assessor",
          es: "Tasador de arroz"
        }
      },
      {
        id: "sengoku-market-town",
        text: {
          en: "Grow a castle town and reward skilled followers, even low-born ones.",
          es: "Abre un mercado de ciudad-castillo y asciende a funcionarios talentosos de origen bajo."
        },
        result: {
          en: "The town grows busier, talented people join your service, and your rule feels stronger each season.",
          es: "El comercio se expande, seguidores ambiciosos se unen a ti y tu gobierno parece cada vez mas practico."
        },
        log: {
          en: "The castle town pulled new talent behind the house.",
          es: "Una ciudad-castillo activa dio a la casa un apoyo mas amplio."
        },
        effects: {
          standing: 4,
          giri: 3,
          koku: 4,
          learning: 5,
          people: 5
        },
        scoreBonus: 6,
        badge: {
          id: "castle-town-reformer",
          en: "Castle Town Reformer",
          es: "Reformador de ciudad-castillo"
        }
      }
    ]
  },
  {
    id: "edo",
    period: {
      en: "Early Tokugawa peace",
      es: "Paz Tokugawa temprana"
    },
    years: "1635",
    title: {
      en: "Paper, Roads, and Rank",
      es: "La paz cambia el significado del servicio samurai"
    },
    lens: {
      en: "Bureaucracy, ritual, and alternate attendance",
      es: "Burocracia, ritual y residencia alterna"
    },
    objective: {
      en: "Keep your house useful in peace by choosing what matters most now: order, office, or display.",
      es: "Redefine tu casa para una era en la que el papeleo puede importar tanto como las espadas."
    },
    scoreLabel: {
      en: "Tokugawa Governance Score",
      es: "Puntuacion de gobierno Tokugawa"
    },
    weights: {
      standing: 0.2,
      giri: 0.2,
      koku: 0.15,
      learning: 0.25,
      people: 0.2
    },
    paragraphs: {
      en: [
        "Japan is more peaceful now. Samurai still carry status, but daily power sits in offices, schools, courts, and long processions to Edo.",
        "A house can still rise, but now it needs ledgers, magistrates, and careful reports as much as weapons.",
        "How will your house serve in peacetime?"
      ],
      es: [
        "Los shogunes Tokugawa imponen orden en Japon. Los dominios siguen siendo importantes, pero la larga paz cambia el trabajo samurai.",
        "El sistema de [[sankinKotai|sankin-kotai]] ata a los senores a Edo, mientras escribanos, magistrados y maestros se vuelven centrales para la [[administration|administracion]] del dominio.",
        "Como mantendra influencia tu casa en una era de paz?"
      ]
    },
    note: {
      en: "In the Edo period, many samurai worked more as officials, magistrates, teachers, and clerks than as soldiers.",
      es: "En el periodo Edo muchos samurai se convirtieron en administradores, maestros, contables o funcionarios legales mas que en combatientes constantes."
    },
    myth: {
      en: "Peace did not end samurai life. It changed what samurai were expected to do.",
      es: "La paz no borro la identidad samurai. Cambio las formas de servicio que importaban."
    },
    choices: [
      {
        id: "edo-travel",
        text: {
          en: "Master the long processions to Edo with careful travel plans, storehouses, and reports.",
          es: "Acepta el sankin-kotai y construye un sistema eficiente de viaje, almacenaje e informes."
        },
        result: {
          en: "Your processions run smoothly, and your house earns a name for discipline, even as the travel drains money.",
          es: "Tu dominio impresiona a sus superiores con orden y fiabilidad, aunque el proceso es costoso."
        },
        log: {
          en: "The house mastered the burden of road and procession.",
          es: "La casa domino la logistica de la residencia alterna."
        },
        effects: {
          standing: 5,
          giri: 5,
          koku: -1,
          learning: 4,
          people: 2
        },
        scoreBonus: 6,
        badge: {
          id: "procession-planner",
          en: "Procession Planner",
          es: "Planificador de procesiones"
        }
      },
      {
        id: "edo-bureaucrats",
        text: {
          en: "Train retainers as magistrates, teachers, and record keepers.",
          es: "Forma retenedores como magistrados, maestros y contables para el servicio del dominio."
        },
        result: {
          en: "Your house grows stronger in offices and schools, where steady hands now matter most.",
          es: "Tu casa prospera en paz porque convierte alfabetizacion y disciplina en autoridad estable."
        },
        log: {
          en: "Retainers became magistrates, clerks, and teachers.",
          es: "La casa adopto el servicio samurai burocratico."
        },
        effects: {
          standing: 3,
          giri: 4,
          koku: 3,
          learning: 6,
          people: 4
        },
        scoreBonus: 7,
        badge: {
          id: "domain-bureaucrats",
          en: "Domain Bureaucrats",
          es: "Burocratas del dominio"
        }
      },
      {
        id: "edo-display",
        text: {
          en: "Spend heavily on armor, clothing, and display in Edo so other houses see your rank.",
          es: "Gasta mucho en ceremonia y estatus visible en Edo para proyectar prestigio."
        },
        result: {
          en: "Your processions look grand, and people notice, but the bills rise fast.",
          es: "Tu presencia es notada, pero los gastos tensionan tus recursos y te alejan de necesidades locales."
        },
        log: {
          en: "The house chased rank through display in Edo.",
          es: "La exhibicion ceremonial elevo el estatus pero vacio el tesoro."
        },
        effects: {
          standing: 7,
          giri: 2,
          koku: -4,
          learning: 1,
          people: -2
        },
        scoreBonus: 6,
        badge: {
          id: "ceremonial-prestige",
          en: "Ceremonial Prestige",
          es: "Prestigio ceremonial"
        }
      }
    ]
  },
  {
    id: "edo-reform",
    period: {
      en: "Late Edo pressures",
      es: "Presiones del Edo tardio"
    },
    years: "c. 1780-1850s",
    title: {
      en: "Debt, Petitions, and Dutch Books",
      es: "Deuda, hambruna y nuevos conocimientos"
    },
    lens: {
      en: "Domain reform and limited global learning",
      es: "Reforma del dominio y aprendizaje global limitado"
    },
    objective: {
      en: "Find which pressure is breaking the domain first, then choose what your house can afford to solve.",
      es: "Responde a la crisis sin quebrar la autoridad de tu casa."
    },
    scoreLabel: {
      en: "Reform Score",
      es: "Puntuacion de reforma"
    },
    weights: {
      standing: 0.15,
      giri: 0.2,
      koku: 0.15,
      learning: 0.25,
      people: 0.25
    },
    paragraphs: {
      en: [
        "Bad harvests, debt, and angry petitions are shaking many domains.",
        "At the same time, scholars are opening Dutch books and testing strange new instruments from abroad.",
        "Your next move could calm the people, fill the treasury, or prepare your house for a changing world.",
        "What will you do first?"
      ],
      es: [
        "Malas cosechas, deuda e inquietud campesina presionan a muchos dominios. Algunos lideres buscan [[reform|reformas]], mientras otros endurecen viejos sistemas.",
        "Eruditos que estudian [[rangaku|rangaku]] recopilan ciencia y saber militar exterior a traves de fuentes neerlandesas.",
        "Que mantendra respetada a tu casa cuando los recursos escasean?"
      ]
    },
    note: {
      en: "Late Edo domains faced debt, unrest, and reform. Some turned to relief, some to harsher rule, and some to new learning.",
      es: "Los dominios del Edo tardio afrontaron tension fiscal e inquietud. Algunos respondieron con alivio, otros con control mas estricto y otros con nuevo aprendizaje."
    },
    myth: {
      en: "Tokugawa Japan was not sealed shut. New ideas still entered through trade and study.",
      es: "El Japon Tokugawa no estuvo sellado a todo conocimiento exterior. Las ideas siguieron circulando por canales controlados."
    },
    choices: [
      {
        id: "reform-granary",
        text: {
          en: "Open granaries, cut some taxes, and hear village petitions.",
          es: "Reduce algunos impuestos, abre graneros y escucha peticiones de las aldeas."
        },
        result: {
          en: "Granaries open, tax pressure eases, and villages begin trusting your rule again.",
          es: "El tesoro se aprieta, pero la gente empieza a confiar en tu gobierno como protector y no solo extractor."
        },
        log: {
          en: "Granary relief cooled the villages.",
          es: "El alivio con graneros fortalecio la confianza local."
        },
        effects: {
          standing: 2,
          giri: 4,
          koku: -1,
          learning: 3,
          people: 7
        },
        scoreBonus: 7,
        badge: {
          id: "granary-reformer",
          en: "Granary Reformer",
          es: "Reformador de graneros"
        }
      },
      {
        id: "reform-rangaku",
        text: {
          en: "Bring in rangaku scholars and study Dutch books, maps, and tools.",
          es: "Invita a estudiosos de rangaku y examina nuevas herramientas antes de elegir reformas amplias."
        },
        result: {
          en: "New maps and instruments help your house see old problems in new ways.",
          es: "Tu casa gana conocimiento tecnico y perspectiva mas amplia, preparandose para un futuro mas incierto."
        },
        log: {
          en: "Dutch books widened the house's thinking.",
          es: "El conocimiento exterior dio a la casa un horizonte mas amplio."
        },
        effects: {
          standing: 2,
          giri: 2,
          koku: 1,
          learning: 7,
          people: 2
        },
        scoreBonus: 6,
        badge: {
          id: "rangaku-sponsor",
          en: "Rangaku Sponsor",
          es: "Patrocinador de rangaku"
        }
      },
      {
        id: "reform-strict",
        text: {
          en: "Squeeze taxes hard, punish unrest, and refill the storehouses fast.",
          es: "Exige tributos antiguos con mas dureza y castiga la inquietud para restaurar el orden con rapidez."
        },
        result: {
          en: "Rice and silver come in quickly, but anger spreads from village to village.",
          es: "Los ingresos mejoran a corto plazo, pero el resentimiento se extiende y tu casa parece menos legitima."
        },
        log: {
          en: "Harsh collections filled the granaries and soured the villages.",
          es: "La extraccion severa restauro ingresos pero dano la confianza local."
        },
        effects: {
          standing: 6,
          giri: 1,
          koku: 6,
          learning: 0,
          people: -6
        },
        scoreBonus: 7,
        badge: {
          id: "strict-extractor",
          en: "Strict Extractor",
          es: "Extractor severo"
        }
      }
    ]
  },
  {
    id: "meiji",
    period: {
      en: "Bakumatsu to Meiji",
      es: "Bakumatsu a Meiji"
    },
    years: "1853-1876",
    title: {
      en: "When Samurai Status Ends",
      es: "Cuando se rompe el viejo orden"
    },
    lens: {
      en: "Modernization, memory, and adaptation",
      es: "Modernizacion, memoria y adaptacion"
    },
    objective: {
      en: "Decide what your house will save, surrender, or rebuild as samurai status ends.",
      es: "Guia tu casa a traves de la crisis que termina con la clase samurai como orden legal."
    },
    scoreLabel: {
      en: "Meiji Transition Score",
      es: "Puntuacion de transicion Meiji"
    },
    weights: {
      standing: 0.15,
      giri: 0.15,
      koku: 0.1,
      learning: 0.3,
      people: 0.3
    },
    paragraphs: {
      en: [
        "The Tokugawa order collapses. Domains vanish, [[stipend|stipends]] fade, and old rank no longer protects a house.",
        "Some former samurai join the new army or government. Some open schools. Some resist and lose.",
        "What will your house carry into the new Japan?"
      ],
      es: [
        "La presion extranjera, el conflicto interno y la caida del orden Tokugawa transforman Japon. La [[meijiRestoration|Restauracion Meiji]] acelera nuevas instituciones.",
        "Los dominios son reemplazados, los exsamurai pierden privilegio hereditario y muchos [[stipend|estipendios]] son conmutados o abolidos.",
        "Como se [[adapt|adaptara]] tu casa cuando el mundo que la hizo poderosa ya no exista?"
      ]
    },
    note: {
      en: "Meiji reforms ended samurai status as a legal class and pushed many former samurai into new kinds of work.",
      es: "Las reformas Meiji abolieron dominios, terminaron con el estatus samurai como clase legal y empujaron a las elites antiguas hacia nuevos papeles."
    },
    myth: {
      en: "Former samurai did not vanish overnight. Many became soldiers, teachers, officials, police, and writers.",
      es: "Los exsamurai no desaparecieron sin mas. Muchos entraron en escuelas, gobierno, negocios o en el ejercito moderno."
    },
    choices: [
      {
        id: "meiji-state",
        text: {
          en: "Join the new army or government and carry your skills into it.",
          es: "Entra en el nuevo gobierno prefectural o en el ejercito moderno y lleva tus habilidades hacia adelante."
        },
        result: {
          en: "Your house keeps a place in the new Japan by serving the new rules instead of fighting them.",
          es: "Tu casa sobrevive al transferir disciplina y experiencia a un estado moderno."
        },
        log: {
          en: "The house stepped into the new army and government.",
          es: "La casa entro en las instituciones del estado moderno."
        },
        effects: {
          standing: 4,
          giri: 4,
          koku: 1,
          learning: 6,
          people: 3
        },
        scoreBonus: 7,
        badge: {
          id: "modern-state-builder",
          en: "Modern State Builder",
          es: "Constructor del estado moderno"
        }
      },
      {
        id: "meiji-school",
        text: {
          en: "Open a school and guard your maps, records, and family papers.",
          es: "Convierte tu casa en una escuela, archivo y red de asesoria para la nueva era."
        },
        result: {
          en: "Old rank fades, but your house gains a new role as teacher and keeper of memory.",
          es: "Tu autoridad cambia de forma, pero tu conocimiento y memoria moldean a la siguiente generacion."
        },
        log: {
          en: "The house turned its name and records into a school.",
          es: "La casa conservo influencia mediante escuelas y memoria."
        },
        effects: {
          standing: 2,
          giri: 3,
          koku: 0,
          learning: 7,
          people: 5
        },
        scoreBonus: 8,
        badge: {
          id: "keeper-of-memory",
          en: "Keeper of Memory",
          es: "Guardian de la memoria"
        }
      },
      {
        id: "meiji-resist",
        text: {
          en: "Spend your savings defending the old samurai order.",
          es: "Gasta tus reservas defendiendo privilegios antiguos y resiste el nuevo orden politico."
        },
        result: {
          en: "Your house keeps its pride, but money runs low and its place in the new Japan shrinks.",
          es: "Tu casa conserva orgullo, pero pierde recursos e influencia en un mundo que deja atras el estatus hereditario."
        },
        log: {
          en: "The house resisted the new order and paid for it.",
          es: "La resistencia preservo orgullo pero redujo el futuro de la casa."
        },
        effects: {
          standing: 5,
          giri: 6,
          koku: -4,
          learning: 0,
          people: -2
        },
        scoreBonus: 6,
        badge: {
          id: "last-holdout",
          en: "Last Holdout",
          es: "Ultimo resistente"
        }
      }
    ]
  }
];

const sceneFlavor = {
  heian: {
    authority: {
      en: "Estate Alarm",
      es: "Alarma de la hacienda"
    },
    intro: {
      en: "Before sunrise, a mud-splashed courier pounds at your gate. Raiders struck the estate edge, and one bad order could cost both harvest and trust.",
      es: "Antes del amanecer, un jinete embarrado llega a tu puerta. Saqueadores probaron la frontera de la hacienda y la cosecha esta en riesgo."
    }
  },
  genpei: {
    authority: {
      en: "War Camp Summons",
      es: "Llamado del campamento"
    },
    intro: {
      en: "War banners choke the roads. If you do not choose a side and route soon, a greater house will spend your grain for you.",
      es: "Los estandartes de guerra llenan los caminos. Si no eliges pronto, un clan mas fuerte elegira por ti."
    }
  },
  kamakura: {
    authority: {
      en: "Kamakura Seal",
      es: "Llamado de Kamakura"
    },
    intro: {
      en: "A sealed order from Kamakura lands on your mat. It offers backing, but only if your house accepts new duties and new risks.",
      es: "Llega una orden sellada desde Kamakura. El nuevo gobierno militar quiere servicio, nombres y lealtades claras."
    }
  },
  onin: {
    authority: {
      en: "Provincial Dispatch",
      es: "Despacho provincial"
    },
    intro: {
      en: "Smoke rises over Kyoto, but the real test is here: seized toll gates, missing couriers, and neighbors probing your borders.",
      es: "El humo de Kioto se siente lejano, pero el desorden no. Caminos se cierran, mensajeros desaparecen y las pequenas guerras se extienden."
    }
  },
  sengoku: {
    authority: {
      en: "Castle-Town Order",
      es: "Orden de la ciudad-castillo"
    },
    intro: {
      en: "Retainers crowd the hall while gunners drill outside. Every rival is building harder power, and your house cannot stay half-made.",
      es: "Los retenedores llenan la sala mientras los tiradores practican afuera. No es tiempo para una casa debil ni para un dominio a medias."
    }
  },
  edo: {
    authority: {
      en: "Tokugawa Notice",
      es: "Aviso Tokugawa"
    },
    intro: {
      en: "Your swords still mark rank, but clerks, magistrates, and processions now decide who matters. One mistake can drain prestige without drawing a blade.",
      es: "Tus espadas aun marcan rango, pero escribanos y magistrados ahora moldean el poder diario. La paz convirtio el gobierno en papeleo, viajes y ley cuidadosa."
    }
  },
  "edo-reform": {
    authority: {
      en: "Reform Notice",
      es: "Aviso de reforma"
    },
    intro: {
      en: "Granaries run low, debt climbs, and village petitions pile up on your desk. Any order you give will calm one pressure and stir another.",
      es: "Los graneros estan bajos, la deuda es alta y las peticiones de aldea se amontonan. Una sola orden tuya puede calmar el dominio o acercarlo al conflicto."
    }
  },
  meiji: {
    authority: {
      en: "Imperial Notice",
      es: "Aviso imperial"
    },
    intro: {
      en: "The old badges of rank fade month by month. If your house will survive, it must choose what to keep and what to let go.",
      es: "Las viejas marcas de rango valen menos cada temporada. Si tu casa va a sobrevivir, debe elegir que llevar al nuevo Japon."
    }
  }
};

const mapTiles = {
  ".": {
    traversable: true,
    tone: "ground",
    label: {
      en: "Open ground",
      es: "Suelo abierto"
    }
  },
  "=": {
    traversable: true,
    tone: "road",
    label: {
      en: "Road",
      es: "Camino"
    }
  },
  B: {
    traversable: true,
    tone: "road",
    label: {
      en: "Bridge",
      es: "Puente"
    }
  },
  "~": {
    traversable: false,
    tone: "water",
    label: {
      en: "River or sea",
      es: "Rio o mar"
    }
  },
  "#": {
    traversable: false,
    tone: "blocked",
    label: {
      en: "Wall or mountain",
      es: "Muro o montana"
    }
  },
  " ": {
    traversable: false,
    tone: "void",
    label: {
      en: "Open water",
      es: "Agua abierta"
    }
  },
  T: {
    traversable: false,
    tone: "tree",
    label: {
      en: "Trees",
      es: "Arboles"
    }
  },
  ",": {
    traversable: true,
    tone: "ground",
    label: {
      en: "Fields",
      es: "Campos"
    }
  },
  H: {
    traversable: true,
    tone: "house",
    label: {
      en: "House",
      es: "Casa"
    }
  },
  G: {
    traversable: true,
    tone: "gate",
    label: {
      en: "Gate",
      es: "Puerta"
    }
  },
  C: {
    traversable: true,
    tone: "castle",
    label: {
      en: "Castle",
      es: "Castillo"
    }
  },
  M: {
    traversable: true,
    tone: "market",
    label: {
      en: "Market",
      es: "Mercado"
    }
  },
  S: {
    traversable: true,
    tone: "shrine",
    label: {
      en: "Shrine",
      es: "Santuario"
    }
  },
  D: {
    traversable: true,
    tone: "office",
    label: {
      en: "Office",
      es: "Oficina"
    }
  },
  P: {
    traversable: true,
    tone: "port",
    label: {
      en: "Port",
      es: "Puerto"
    }
  },
  F: {
    traversable: true,
    tone: "faction",
    label: {
      en: "Banner post",
      es: "Puesto de bando"
    }
  },
  "?": {
    traversable: true,
    tone: "rumor",
    label: {
      en: "Rumor point",
      es: "Punto de rumor"
    }
  },
  "!": {
    traversable: true,
    tone: "mission",
    label: {
      en: "Mission point",
      es: "Punto de mision"
    }
  },
  O: {
    traversable: true,
    tone: "node",
    label: {
      en: "Important stop",
      es: "Parada importante"
    }
  }
};

const blockedLegendLabels = {
  village: {
    en: "Ridge",
    es: "Linde"
  },
  city: {
    en: "Wall",
    es: "Muro"
  },
  regional: {
    en: "Mountain",
    es: "Montana"
  },
  japan: {
    en: "Sea or range",
    es: "Mar o cordillera"
  }
};

const simpleLegendEntries = {
  player: {
    sample: "[@]",
    label: {
      en: "Your marker",
      es: "Tu marca"
    }
  },
  goal: {
    sample: " ! ",
    label: {
      en: "Key site",
      es: "Sitio clave"
    }
  },
  done: {
    sample: "OK",
    label: {
      en: "Checked site",
      es: "Sitio revisado"
    }
  },
  road: {
    sample: "-+-",
    label: {
      en: "Road",
      es: "Camino"
    }
  },
  bridge: {
    sample: "=+=",
    label: {
      en: "Bridge",
      es: "Puente"
    }
  },
  water: {
    sample: "~~~",
    label: {
      en: "River or sea",
      es: "Rio o mar"
    }
  },
  fields: {
    sample: ",, ",
    label: {
      en: "Fields",
      es: "Campos"
    }
  },
  blocked: {
    sample: "###",
    label: {
      en: "Blocked land",
      es: "Paso cerrado"
    }
  }
};

const mapTemplates = {
  "estate-village": {
    tier: "village",
    rows: [
      "###################",
      "#a,,=....b....c,,#",
      "#,,,=..TT,,..=,,.#",
      "#..d==e==,,f.=...#",
      "#,,,=..TT,,g.=,,.#",
      "#..~B=,,,T..=....#",
      "#..~...h..,,i=...#",
      "#..===,,..,,==...#",
      "#..,,T..j....k,,.#",
      "#..,,,,...T...,,.#",
      "###################"
    ]
  },
  "castle-town": {
    tier: "city",
    rows: [
      "#######################",
      "#a==b===c===d===e.G.##",
      "#..H..M..=..H..H..f..#",
      "#..H..H..=..D..H..M..#",
      "#===G==##=##===G====##",
      "#..g..#h..i#..j..k...#",
      "#..H..#..D.#..H..M...#",
      "#==l==#..m.#==n===o..#",
      "#..M..#....#..H..H...#",
      "#..p..#####q#####....#",
      "#######################"
    ]
  },
  "regional-routes": {
    tier: "regional",
    rows: [
      "#########################",
      "#a==b====c,,..T....d...#",
      "#.=##===#.,,.T..~~~....#",
      "#e.=..,,#..f..~~~..g...#",
      "#..=..h===..~~~....=...#",
      "#..=....T...i....##=...#",
      "#..j....T..===k....=l..#",
      "#..=..~~~....=....m=...#",
      "#n.=~~~....o.=....=....#",
      "#..===..,,T..=..p...q..#",
      "#########################"
    ]
  },
  "japan-archipelago": {
    tier: "japan",
    rows: [
      "~~~~~~~a==b~~~~~~~~~~~~~~",
      "~~~~~~..==..~~~~~~~c~~~~~",
      "~~~~~d===e===f~~~~..~~~~~",
      "~~~~~..~~..==..g===h~~~~~",
      "~~~~i==j===k===l..~~~~~~~",
      "~~~..~~..~~==..m..~~~~~~~",
      "~~n===o===p==q..~~~~~~~~~",
      "~~~..~~....==..~~~~~~~~~~",
      "~~~~r==s~~~~~~t~~~~~~~~~~",
      "~~~~~~~~~~~~~~~~~~~~~~~~~",
      "~~~~~~~~~~~~~~~~~~~~~~~~~"
    ]
  }
};

const sceneMaps = {
  heian: {
    templateId: "estate-village",
    title: {
      en: "Estate Village Patrol",
      es: "Patrulla de la hacienda"
    },
    start: "d",
    required: ["headman", "granary", "eastGate"],
    completeLog: {
      en: "Scouts marked the headman's house, the granary, and the east gate.",
      es: "Tus exploradores marcaron la casa del jefe, el granero y la puerta oriental."
    },
    factions: [
      {
        tone: "gold",
        badge: {
          en: "CT",
          es: "CO"
        },
        text: {
          en: "Court tax rights still matter on paper, but local retainers do the real guarding.",
          es: "Los derechos de la corte siguen contando en papel, pero los jinetes locales hacen la guardia real."
        }
      },
      {
        tone: "cyan",
        badge: {
          en: "LH",
          es: "CL"
        },
        text: {
          en: "Nearby warrior houses watch these roads and want proof your clan can hold them.",
          es: "Las casas guerreras cercanas miran estos caminos y quieren pruebas de que tu clan puede cuidarlos."
        }
      }
    ],
    locations: {
      headman: {
        marker: "a",
        symbol: "H",
        title: {
          en: "Village Head's House",
          es: "Casa del jefe de aldea"
        },
        text: {
          en: "The village head points to the paddies and says people will back retainers who protect fields instead of frightening them, but shared watch duty will still cost grain and labor.",
          es: "El jefe de aldea senala los arrozales y dice que la gente apoyara a los jinetes que protejan los campos sin sembrar miedo."
        }
      },
      shrine: {
        marker: "b",
        symbol: "S",
        title: {
          en: "Village Shrine",
          es: "Santuario de la aldea"
        },
        text: {
          en: "Families leave offerings here and whisper about the roads. The shrine keeper hears who is afraid, who is angry, and whether people still trust the estate.",
          es: "Las familias dejan ofrendas aqui y hablan del camino en voz baja. El cuidador del santuario oye quien tiene miedo, quien esta enojado y si la gente aun confia en la hacienda."
        }
      },
      eastGate: {
        marker: "c",
        symbol: "G",
        title: {
          en: "East Gate",
          es: "Puerta oriental"
        },
        text: {
          en: "The gate guards can hold for a little while, but stronger patrols will need fresh messengers, more horses, and more rice.",
          es: "Los guardias de la puerta pueden resistir un poco, pero necesitan ordenes claras y mensajeros rapidos."
        }
      },
      granary: {
        marker: "h",
        symbol: "D",
        title: {
          en: "Rice Granary",
          es: "Granero de arroz"
        },
        text: {
          en: "Rice bags are stacked behind heavy doors. One raid here would hurt every family on the estate, and every extra patrol also draws from the same stores.",
          es: "Los sacos de arroz estan apilados tras puertas pesadas. Un solo saqueo aqui golpearia a todas las familias de la hacienda."
        }
      },
      rumorPost: {
        marker: "i",
        symbol: "?",
        title: {
          en: "Courier Post",
          es: "Puesto de mensajeros"
        },
        text: {
          en: "Couriers water horses and pass sealed notices here. If warnings slow down at this post, retainers and gate guards reach trouble too late, after rice carts and field workers are already exposed.",
          es: "Los mensajeros dan agua a los caballos y pasan avisos sellados aqui. Si las advertencias se frenan en este puesto, los jinetes y guardias llegan tarde al problema."
        }
      }
    }
  },
  genpei: {
    templateId: "regional-routes",
    title: {
      en: "War Roads of the Province",
      es: "Caminos de guerra"
    },
    start: "h",
    required: ["bannerCamp", "riverCrossing", "supplyDepot"],
    completeLog: {
      en: "Scouts checked the banner camp, the river crossing, and the supply depot.",
      es: "Tus exploradores revisaron el campamento, el cruce del rio y el deposito de suministros."
    },
    factions: [
      {
        tone: "cyan",
        badge: {
          en: "MN",
          es: "MN"
        },
        text: {
          en: "Minamoto retainers gather on the eastern roads and press houses to join them fast.",
          es: "Jinetes Minamoto se juntan en los caminos del este y presionan a las casas para unirse pronto."
        }
      },
      {
        tone: "gold",
        badge: {
          en: "TR",
          es: "TR"
        },
        text: {
          en: "Taira allies still hold court routes, river traffic, and some strong points to the west.",
          es: "Los aliados Taira aun sostienen rutas de corte, trafico fluvial y algunos puntos fuertes al oeste."
        }
      }
    ],
    locations: {
      bannerCamp: {
        marker: "b",
        symbol: "F",
        title: {
          en: "War Banner Camp",
          es: "Campamento de banderas"
        },
        text: {
          en: "Messengers shout clan names over packed horses. Every late answer here looks like doubt.",
          es: "Los mensajeros gritan nombres de clanes sobre caballos cansados. Cualquier respuesta tardia aqui parece duda."
        }
      },
      riverCrossing: {
        marker: "f",
        symbol: "G",
        title: {
          en: "River Crossing",
          es: "Cruce del rio"
        },
        text: {
          en: "Flat boats, rope lines, and muddy banks decide which army eats tomorrow.",
          es: "Botes planos, cuerdas tensas y orillas de lodo deciden que ejercito comerá manana."
        }
      },
      supplyDepot: {
        marker: "k",
        symbol: "D",
        title: {
          en: "Supply Depot",
          es: "Deposito de suministros"
        },
        text: {
          en: "Grain sacks, arrow bundles, and spare sandals tell you this war will be won by movement as much as courage.",
          es: "Sacos de arroz, flechas y sandalias de repuesto te muestran que esta guerra se ganara con movimiento tanto como con valentia."
        }
      },
      borderShrine: {
        marker: "g",
        symbol: "S",
        title: {
          en: "Border Shrine",
          es: "Santuario fronterizo"
        },
        text: {
          en: "Prayers hang beside troop notices. Even sacred places are carrying military news now.",
          es: "Las plegarias cuelgan junto a avisos de tropas. Hasta los lugares sagrados llevan noticias militares."
        }
      },
      portRoad: {
        marker: "q",
        symbol: "P",
        title: {
          en: "River Port Road",
          es: "Camino del puerto fluvial"
        },
        text: {
          en: "Porters and boatmen complain that whichever side claims this road will also control salt, grain, and rumors.",
          es: "Cargadores y barqueros dicen que quien controle este camino tambien controlara sal, arroz y rumores."
        }
      }
    }
  },
  kamakura: {
    templateId: "castle-town",
    title: {
      en: "Kamakura Government Quarter",
      es: "Barrio de gobierno en Kamakura"
    },
    start: "l",
    required: ["recordsOffice", "innerGate", "audienceHall"],
    completeLog: {
      en: "You traced the records office, the inner gate, and the audience hall.",
      es: "Rastreaste la oficina de registros, la puerta interior y la sala de audiencia."
    },
    factions: [
      {
        tone: "cyan",
        badge: {
          en: "BK",
          es: "BK"
        },
        text: {
          en: "Bakufu clerks, seals, and mounted guards turn service into a daily system.",
          es: "Escribanos, sellos y guardias montados del bakufu convierten el servicio en un sistema diario."
        }
      },
      {
        tone: "gold",
        badge: {
          en: "CT",
          es: "CO"
        },
        text: {
          en: "Court rank still carries weight, but it now has to work beside military law.",
          es: "El rango cortesano aun pesa, pero ahora debe convivir con la ley militar."
        }
      }
    ],
    locations: {
      recordsOffice: {
        marker: "h",
        symbol: "D",
        title: {
          en: "Records Office",
          es: "Oficina de registros"
        },
        text: {
          en: "Clerks sort land cases, seals, and names of service houses. Paper now decides who has backing.",
          es: "Los escribanos ordenan casos de tierra, sellos y nombres de casas de servicio. El papel ahora decide quien recibe apoyo."
        }
      },
      innerGate: {
        marker: "c",
        symbol: "G",
        title: {
          en: "Inner Gate",
          es: "Puerta interior"
        },
        text: {
          en: "Guards at the gate care about seals, rank, and who sent you. Status has to be shown here.",
          es: "Los guardias miran sellos, rango y quien te envio. Aqui el estatus debe mostrarse con claridad."
        }
      },
      audienceHall: {
        marker: "q",
        symbol: "C",
        requiresVisited: ["recordsOffice"],
        title: {
          en: "Audience Hall",
          es: "Sala de audiencia"
        },
        lockedText: {
          en: "Without your papers from the records office, the hall guards wave you back.",
          es: "Sin tus papeles de la oficina de registros, los guardias de la sala te hacen retroceder."
        },
        text: {
          en: "The hall is quieter than a battlefield, but every oath made here can move land, law, and warriors.",
          es: "La sala es mas silenciosa que un campo de batalla, pero cada juramento hecho aqui mueve tierras, ley y guerreros."
        }
      },
      shrineQuarter: {
        marker: "f",
        symbol: "S",
        title: {
          en: "Temple Quarter",
          es: "Barrio de templos"
        },
        text: {
          en: "Monks, petitioners, and servants crowd the lanes. Kamakura is busy because power lives here now.",
          es: "Monjes, peticionarios y sirvientes llenan las calles. Kamakura esta llena porque el poder vive aqui ahora."
        }
      },
      samuraiRow: {
        marker: "n",
        symbol: "H",
        title: {
          en: "Samurai Row",
          es: "Barrio samurai"
        },
        text: {
          en: "Retainers compare orders, horses, and gossip about who is rising near the shogunate.",
          es: "Los retenedores comparan ordenes, caballos y rumores sobre quien asciende cerca del shogunato."
        }
      }
    }
  },
  onin: {
    templateId: "regional-routes",
    title: {
      en: "Fractured Province Routes",
      es: "Rutas de una provincia rota"
    },
    start: "j",
    required: ["hillCastle", "marketRoad", "checkpoint"],
    completeLog: {
      en: "You checked the hill castle, the market road, and the checkpoint.",
      es: "Revisaste el castillo de colina, el camino del mercado y el puesto de control."
    },
    factions: [
      {
        tone: "gold",
        badge: {
          en: "RV",
          es: "RV"
        },
        text: {
          en: "Rival houses grab toll gates and valley roads whenever central orders weaken.",
          es: "Las casas rivales toman peajes y caminos de valle cada vez que la autoridad central se debilita."
        }
      },
      {
        tone: "green",
        badge: {
          en: "VL",
          es: "AL"
        },
        text: {
          en: "Villages back the lord who can keep grain moving and stop small wars from reaching their fields.",
          es: "Las aldeas apoyan al senor que puede mover grano y frenar las pequenas guerras antes de que lleguen a sus campos."
        }
      }
    ],
    locations: {
      hillCastle: {
        marker: "h",
        symbol: "C",
        title: {
          en: "Hill Castle",
          es: "Castillo de colina"
        },
        text: {
          en: "Timber walls, arrow slits, and stacked grain make this the safest place in a falling province.",
          es: "Muros de madera, troneras y grano apilado hacen de este lugar el punto mas seguro de una provincia que se cae."
        }
      },
      marketRoad: {
        marker: "l",
        symbol: "M",
        title: {
          en: "Market Road",
          es: "Camino del mercado"
        },
        text: {
          en: "Merchants will still risk this road if someone strong keeps toll takers and raiders in line.",
          es: "Los mercaderes aun se atreven con este camino si alguien fuerte controla a peajeros y saqueadores."
        }
      },
      checkpoint: {
        marker: "o",
        symbol: "G",
        title: {
          en: "Checkpoint",
          es: "Puesto de control"
        },
        text: {
          en: "Messengers and tax carts stop here. Whoever controls this post hears trouble before everyone else.",
          es: "Aqui paran mensajeros y carros de impuestos. Quien controle este puesto oye los problemas antes que los demas."
        }
      },
      shrineDepot: {
        marker: "g",
        symbol: "S",
        title: {
          en: "Shrine Depot",
          es: "Deposito del santuario"
        },
        text: {
          en: "Villagers hide rice and records near the shrine when larger armies pass through.",
          es: "Los aldeanos esconden arroz y registros cerca del santuario cuando pasan ejercitos grandes."
        }
      },
      borderVillage: {
        marker: "q",
        symbol: "H",
        title: {
          en: "Border Village",
          es: "Aldea fronteriza"
        },
        text: {
          en: "Families here care less about court politics than about which lord can keep the road open tomorrow.",
          es: "Las familias de aqui se preocupan menos por la politica de la corte que por que senor dejara el camino abierto manana."
        }
      }
    }
  },
  sengoku: {
    templateId: "castle-town",
    title: {
      en: "Castle Town Expansion",
      es: "Expansion de ciudad-castillo"
    },
    start: "n",
    required: ["armory", "keep", "merchantQuarter"],
    completeLog: {
      en: "You checked the armory, the keep, and the merchant quarter.",
      es: "Revisaste la armeria, la fortaleza y el barrio mercante."
    },
    factions: [
      {
        tone: "green",
        badge: {
          en: "DM",
          es: "DM"
        },
        text: {
          en: "A daimyo needs soldiers, storehouses, and a busy town that pays and obeys.",
          es: "Un daimyo necesita soldados, almacenes y una ciudad activa que pague y obedezca."
        }
      },
      {
        tone: "cyan",
        badge: {
          en: "RT",
          es: "RT"
        },
        text: {
          en: "Talented retainers will serve the house that offers rank, pay, and room to rise.",
          es: "Los retenedores talentosos sirven a la casa que ofrece rango, pago y espacio para ascender."
        }
      }
    ],
    locations: {
      armory: {
        marker: "g",
        symbol: "F",
        title: {
          en: "Armory Yard",
          es: "Patio de armeria"
        },
        text: {
          en: "Spears lean beside powder barrels. Drill and supply are turning this town into a war machine.",
          es: "Lanzas y barriles de polvora llenan el patio. La disciplina y el suministro estan convirtiendo esta ciudad en una maquina de guerra."
        }
      },
      merchantQuarter: {
        marker: "n",
        symbol: "M",
        title: {
          en: "Merchant Quarter",
          es: "Barrio mercante"
        },
        text: {
          en: "Smiths, rice brokers, and packhorse drivers gather where a rising lord can tax trade and reward service.",
          es: "Herreros, corredores de arroz y arrieros se juntan donde un senor en ascenso puede gravar el comercio y premiar el servicio."
        }
      },
      keep: {
        marker: "q",
        symbol: "C",
        requiresVisited: ["armory"],
        title: {
          en: "Castle Keep",
          es: "Torre del castillo"
        },
        lockedText: {
          en: "The keep wants a fresh armory report before the gates open to you.",
          es: "La torre exige un informe reciente de la armeria antes de dejarte pasar."
        },
        text: {
          en: "From the keep, roads, storehouses, and tax fields all fit into one daimyo's plan.",
          es: "Desde la torre, caminos, almacenes y campos de impuesto entran en un solo plan de daimyo."
        }
      },
      templeRow: {
        marker: "f",
        symbol: "S",
        title: {
          en: "Temple Row",
          es: "Calle de templos"
        },
        text: {
          en: "Monks and townspeople quietly judge whether your rule looks harsh, useful, or both.",
          es: "Monjes y vecinos juzgan en silencio si tu gobierno parece duro, util o ambas cosas."
        }
      },
      townGate: {
        marker: "o",
        symbol: "G",
        title: {
          en: "West Gate",
          es: "Puerta occidental"
        },
        text: {
          en: "Caravans line up here with taxes, weapons, and news from rival lands.",
          es: "Las caravanas hacen fila aqui con impuestos, armas y noticias de tierras rivales."
        }
      }
    }
  },
  edo: {
    templateId: "castle-town",
    title: {
      en: "Domain Offices in Peacetime",
      es: "Oficinas del dominio en paz"
    },
    start: "p",
    required: ["magistrateOffice", "edoRoad", "domainSchool"],
    completeLog: {
      en: "You checked the magistrate office, the Edo road, and the domain school.",
      es: "Revisaste la oficina del magistrado, el camino a Edo y la escuela del dominio."
    },
    factions: [
      {
        tone: "gold",
        badge: {
          en: "TK",
          es: "TK"
        },
        text: {
          en: "Tokugawa order runs through roads to Edo, reports, seals, and careful rank display.",
          es: "El orden Tokugawa corre por los caminos a Edo, los informes, los sellos y la exhibicion cuidadosa del rango."
        }
      },
      {
        tone: "cyan",
        badge: {
          en: "DM",
          es: "DM"
        },
        text: {
          en: "Domains still matter, but their power now has to look disciplined and lawful.",
          es: "Los dominios siguen importando, pero su poder ahora debe parecer disciplinado y legal."
        }
      }
    ],
    locations: {
      magistrateOffice: {
        marker: "m",
        symbol: "D",
        title: {
          en: "Magistrate Office",
          es: "Oficina del magistrado"
        },
        text: {
          en: "Clerks hear disputes over roads, taxes, and merchant permits. Quiet desks carry real power here.",
          es: "Los escribanos oyen disputas sobre caminos, impuestos y permisos mercantes. Los escritorios tranquilos guardan el poder real aqui."
        }
      },
      edoRoad: {
        marker: "o",
        symbol: "G",
        title: {
          en: "Road to Edo",
          es: "Camino a Edo"
        },
        text: {
          en: "Packhorses, guards, and travel papers show how much work it takes just to appear in Edo properly.",
          es: "Caballos de carga, guardias y papeles de viaje muestran cuanto trabajo cuesta aparecer bien en Edo."
        }
      },
      domainSchool: {
        marker: "p",
        symbol: "D",
        title: {
          en: "Domain School",
          es: "Escuela del dominio"
        },
        text: {
          en: "Young retainers copy texts, practice writing, and learn the rules that now hold a house together.",
          es: "Los retenedores jovenes copian textos, practican escritura y aprenden las reglas que ahora mantienen unida a una casa."
        }
      },
      merchantRow: {
        marker: "b",
        symbol: "M",
        title: {
          en: "Merchant Row",
          es: "Calle mercante"
        },
        text: {
          en: "Silk, paper, and travel goods fill the shops. Even peaceful status costs money every season.",
          es: "Seda, papel y bienes de viaje llenan las tiendas. Hasta el estatus pacifico cuesta dinero cada temporada."
        }
      },
      shrineLane: {
        marker: "f",
        symbol: "S",
        title: {
          en: "Shrine Lane",
          es: "Camino del santuario"
        },
        text: {
          en: "Pilgrims, officials, and children pass the same lane. Edo peace still feels crowded and controlled.",
          es: "Peregrinos, funcionarios y ninos pasan por la misma calle. La paz de Edo aun se siente llena y controlada."
        }
      }
    }
  },
  "edo-reform": {
    templateId: "regional-routes",
    title: {
      en: "Domain Crisis Routes",
      es: "Rutas de un dominio en crisis"
    },
    start: "n",
    required: ["granary", "petitionPost", "studyHall"],
    completeLog: {
      en: "You checked the granary, the petition post, and the study hall.",
      es: "Revisaste el granero, el puesto de peticiones y la sala de estudio."
    },
    factions: [
      {
        tone: "green",
        badge: {
          en: "VL",
          es: "AL"
        },
        text: {
          en: "Village anger rises where debt, bad harvests, and hard collectors meet.",
          es: "La ira de las aldeas crece donde se juntan deuda, malas cosechas y cobradores duros."
        }
      },
      {
        tone: "cyan",
        badge: {
          en: "RG",
          es: "RG"
        },
        text: {
          en: "Rangaku scholars and reformers want better maps, tools, and new ways to judge old problems.",
          es: "Los estudiosos de rangaku y los reformadores quieren mejores mapas, herramientas y nuevas formas de juzgar problemas viejos."
        }
      }
    ],
    locations: {
      granary: {
        marker: "n",
        symbol: "D",
        title: {
          en: "Granary Yard",
          es: "Patio del granero"
        },
        text: {
          en: "Half-full bins make every choice feel sharp. Relief here could calm the villages for a while.",
          es: "Los graneros a medias vuelven aguda cada decision. El alivio aqui podria calmar a las aldeas por un tiempo."
        }
      },
      petitionPost: {
        marker: "p",
        symbol: "!",
        title: {
          en: "Petition Post",
          es: "Puesto de peticiones"
        },
        text: {
          en: "Bundles of requests pile up beside names of angry farmers and worried village heads.",
          es: "Montones de solicitudes se apilan junto a nombres de campesinos enojados y jefes de aldea preocupados."
        }
      },
      studyHall: {
        marker: "q",
        symbol: "S",
        title: {
          en: "Study Hall",
          es: "Sala de estudio"
        },
        text: {
          en: "Dutch books, measuring tools, and copied maps suggest there may be more than one answer to this crisis.",
          es: "Libros holandeses, instrumentos de medida y mapas copiados sugieren que puede haber mas de una respuesta para esta crisis."
        }
      },
      riverPort: {
        marker: "k",
        symbol: "P",
        title: {
          en: "River Port",
          es: "Puerto fluvial"
        },
        text: {
          en: "Boatmen complain about taxes and low water. Trade can still rescue a domain if it keeps moving.",
          es: "Los barqueros se quejan de impuestos y de la poca agua. El comercio aun puede rescatar a un dominio si sigue fluyendo."
        }
      },
      checkpoint: {
        marker: "o",
        symbol: "G",
        title: {
          en: "Border Checkpoint",
          es: "Control fronterizo"
        },
        text: {
          en: "Officers here count travelers, rice carts, and signs that hunger might turn into unrest.",
          es: "Los oficiales aqui cuentan viajeros, carros de arroz y senales de que el hambre podria volverse revuelta."
        }
      }
    }
  },
  meiji: {
    templateId: "japan-archipelago",
    title: {
      en: "Japan in Transition",
      es: "Japon en transicion"
    },
    start: "o",
    required: ["kyotoNotice", "edoOffice", "portArsenal"],
    completeLog: {
      en: "You traced the Kyoto notice, the Edo offices, and the new port arsenal.",
      es: "Seguiste el aviso de Kioto, las oficinas de Edo y el nuevo arsenal del puerto."
    },
    factions: [
      {
        tone: "gold",
        badge: {
          en: "IM",
          es: "IM"
        },
        text: {
          en: "Imperial rule is expanding from Kyoto and pulling old domain loyalties into a new state.",
          es: "El poder imperial se expande desde Kioto y arrastra las viejas lealtades de dominio hacia un nuevo estado."
        }
      },
      {
        tone: "cyan",
        badge: {
          en: "NW",
          es: "NV"
        },
        text: {
          en: "New roads, ports, and arsenals matter because old samurai rank no longer decides everything.",
          es: "Los nuevos caminos, puertos y arsenales importan porque el viejo rango samurai ya no decide todo."
        }
      }
    ],
    locations: {
      kyotoNotice: {
        marker: "j",
        symbol: "O",
        title: {
          en: "Kyoto Notice Board",
          es: "Tablon de avisos en Kioto"
        },
        text: {
          en: "Imperial notices call for new offices, new armies, and new rules. Old titles are shrinking fast.",
          es: "Los avisos imperiales piden nuevas oficinas, nuevos ejercitos y nuevas reglas. Los viejos titulos se encogen con rapidez."
        }
      },
      edoOffice: {
        marker: "p",
        symbol: "O",
        title: {
          en: "Edo Government Offices",
          es: "Oficinas de gobierno en Edo"
        },
        requiresVisited: ["kyotoNotice"],
        lockedText: {
          en: "The clerks want proof that you understand the new imperial orders before they speak with you.",
          es: "Los escribanos quieren pruebas de que entiendes las nuevas ordenes imperiales antes de hablar contigo."
        },
        text: {
          en: "The city is turning into an administrative capital. Service here now means files, drills, and ministries.",
          es: "La ciudad se esta volviendo capital administrativa. El servicio aqui ahora significa archivos, ejercicios y ministerios."
        }
      },
      portArsenal: {
        marker: "q",
        symbol: "P",
        title: {
          en: "Port Arsenal",
          es: "Arsenal del puerto"
        },
        text: {
          en: "Steam, crates, and new uniforms show how quickly military power is changing shape.",
          es: "Vapor, cajas y uniformes nuevos muestran lo rapido que el poder militar esta cambiando de forma."
        }
      },
      osakaStorehouse: {
        marker: "o",
        symbol: "D",
        title: {
          en: "Osaka Storehouse",
          es: "Almacen de Osaka"
        },
        text: {
          en: "Rice, silver, and paperwork still matter. Even a new state has to feed itself.",
          es: "El arroz, la plata y el papeleo siguen importando. Hasta un nuevo estado tiene que alimentarse."
        }
      },
      kamakuraCoast: {
        marker: "m",
        symbol: "F",
        title: {
          en: "Eastern Coast Barracks",
          es: "Cuartel de la costa oriental"
        },
        text: {
          en: "Former samurai drill beside new recruits. The old warrior class is being folded into something different.",
          es: "Exsamurais hacen ejercicios junto a nuevos reclutas. La vieja clase guerrera se esta doblando hacia algo distinto."
        }
      }
    }
  }
};

const defaultIntelNotesBySymbol = {
  H: { en: "Local witness", es: "Testigo local" },
  G: { en: "Road warning", es: "Aviso del camino" },
  D: { en: "Record note", es: "Nota de registros" },
  C: { en: "Power center", es: "Centro de poder" },
  M: { en: "Market pressure", es: "Presion del mercado" },
  S: { en: "Public mood", es: "Clima publico" },
  F: { en: "Readiness report", es: "Informe de preparacion" },
  P: { en: "Transport concern", es: "Problema de transporte" },
  O: { en: "Official notice", es: "Aviso oficial" },
  "!": { en: "Filed petition", es: "Peticion registrada" },
  "?": { en: "Rumor logged", es: "Rumor registrado" }
};

const defaultIntelWhyLabelsBySymbol = {
  H: { en: "Local concern", es: "Preocupacion local" },
  G: { en: "Gate warning", es: "Advertencia de la puerta" },
  D: { en: "Record concern", es: "Preocupacion de los registros" },
  C: { en: "Power signal", es: "Senal de poder" },
  M: { en: "Market pressure", es: "Presion del mercado" },
  S: { en: "Public mood", es: "Clima publico" },
  F: { en: "Readiness warning", es: "Advertencia de preparacion" },
  P: { en: "Travel concern", es: "Preocupacion del viaje" },
  O: { en: "Official pressure", es: "Presion oficial" },
  "!": { en: "Petition warning", es: "Advertencia de la peticion" },
  "?": { en: "Rumor clue", es: "Pista del rumor" }
};

const investigationIntelByScene = {
  heian: {
    headman: {
      status: "Village Warning",
      finding: "The village head says farmers will back retainers who guard the paddies without shaking them down, but they cannot spare many watchmen unless your house shares grain.",
      whyLabel: {
        en: "Headman's concern",
        es: "Preocupacion del jefe aldeano"
      },
      why: {
        en: "If patrols scare the villages, the estate loses trust. If you ask for extra village watch duty, you also spend grain and labor.",
        es: "Si las patrullas asustan a las aldeas, la hacienda pierde confianza. Si pides mas turnos de guardia, tambien gastas grano y trabajo."
      },
      note: "Village trust concern",
      summary: {
        en: "Farmers want protection, but shared defense will still cost grain.",
        es: "Los campesinos quieren proteccion, pero la defensa compartida tambien costara grano."
      },
      repeat: "The village head still says fear alone will not keep farmers loyal.",
      support: {
        en: "Shared defense with village heads, if your house can spare grain for it.",
        es: "Defensa compartida con jefes de aldea, si tu casa puede ceder grano."
      },
      evidence: {
        trust: 2,
        authority: 1,
        supply: 1
      }
    },
    shrine: {
      status: "Shrine Rumor",
      finding: "The shrine keeper says farmers are more frightened than angry. They want proof that someone is watching the roads, but they also want fair treatment from your retainers.",
      whyLabel: {
        en: "Shrine keeper's warning",
        es: "Advertencia del cuidador del santuario"
      },
      why: {
        en: "If your house leans only on fear, village trust may break before the raiders do. People want fair protection, not just harsher patrols.",
        es: "Si tu casa se apoya solo en el miedo, la confianza puede romperse antes que los saqueadores. La gente quiere proteccion justa, no solo patrullas mas duras."
      },
      note: "Village mood logged",
      summary: "The shrine shows that people want safety and fairness, not just harsher patrols.",
      repeat: "Your shrine notes still show the same mood: fear is spreading faster than trust.",
      support: {
        en: "Alliance-building and fair patrols.",
        es: "Alianzas y patrullas justas."
      },
      evidence: {
        trust: 2,
        authority: 1
      }
    },
    granary: {
      status: "Supply Warning",
      finding: "The granary keeper says one raid here would cut seed rice and winter stores at the same time, and every extra patrol horse will feed from the same sacks.",
      whyLabel: {
        en: "Granary keeper's warning",
        es: "Advertencia del guardian del granero"
      },
      why: {
        en: "The same rice that feeds families also feeds guards, horses, and messengers.",
        es: "El mismo arroz que alimenta a las familias tambien alimenta a guardias, caballos y mensajeros."
      },
      note: "Granary risk logged",
      summary: {
        en: "One raid or one costly patrol push could drain the same rice stores.",
        es: "Un saqueo o una gran oleada de patrullas podria vaciar esas mismas reservas."
      },
      repeat: "The granary keeper still warns that one more raid could empty the rice stores.",
      support: {
        en: "Any plan that protects rice, or avoids burning through it too fast.",
        es: "Cualquier plan que proteja el arroz, o evite gastarlo demasiado rapido."
      },
      evidence: {
        supply: 2,
        records: 1
      }
    },
    eastGate: {
      status: "Gate Report",
      finding: "Gate guards say the east road stays too open after dark and messengers arrive late. They want more patrols, but more horses and guards will need feed.",
      whyLabel: {
        en: "Gate captain's warning",
        es: "Advertencia del capitan de la puerta"
      },
      why: {
        en: "A stronger guard line could stop the next raid before it reaches the fields, but it will cost rice to keep it moving.",
        es: "Una linea de guardia mas fuerte podria frenar el proximo saqueo antes de los campos, pero costara arroz mantenerla en marcha."
      },
      note: "Road security concern",
      summary: "The east road is under-defended after dark.",
      repeat: "The gate captain repeats that the road is too open for weak patrols.",
      support: {
        en: "Fast patrols, if the estate can feed more horses and guards.",
        es: "Patrullas rapidas, si la hacienda puede alimentar mas caballos y guardias."
      },
      evidence: {
        security: 2,
        response: 2,
        supply: 1
      }
    },
    rumorPost: {
      status: "Courier Report",
      finding: "Retainers at the courier post say warnings are arriving too late. By the time help moves, raiders have already passed the fields or turned toward the storehouses, and every late order wastes time, horses, and rice.",
      whyLabel: {
        en: "Couriers' warning",
        es: "Advertencia de los mensajeros"
      },
      why: {
        en: "Slow messages leave patrols guessing, and late notices waste time while making border reports harder to keep straight.",
        es: "Los mensajes lentos dejan a las patrullas adivinando, y los avisos tardios gastan tiempo mientras vuelven mas confusos los informes de frontera."
      },
      note: "Warning delay logged",
      summary: "The estate is hearing about trouble too late to answer quickly.",
      repeat: "The courier post still points to the same problem: warnings are moving too slowly.",
      support: "Faster patrols and clearer reporting.",
      evidence: {
        response: 2,
        security: 1,
        records: 1,
        supply: 1
      }
    }
  },
  genpei: {
    bannerCamp: {
      status: "Banner Pressure",
      finding: "Commanders say houses that answer fast get remembered when rewards are handed out.",
      whyLabel: {
        en: "Commanders' pressure",
        es: "Presion de los comandantes"
      },
      why: "An early pledge can win notice, but it ties your house to one banner.",
      note: "Alliance pressure logged",
      summary: "The war camp rewards bold commitment.",
      repeat: "The camp still treats delay as doubt.",
      support: "A bold early commitment."
    },
    riverCrossing: {
      status: "Route Check",
      finding: "Boatmen say whoever holds this crossing controls tomorrow's meals and retreat routes.",
      whyLabel: {
        en: "Boatmen's warning",
        es: "Advertencia de los barqueros"
      },
      why: "Protecting crossings can matter as much as winning one battle.",
      note: "Crossing control concern",
      summary: "The river crossing decides supply and movement.",
      repeat: "The crossing crews still say food and movement rise or fall here.",
      support: "Guarding routes and supply lines."
    },
    supplyDepot: {
      status: "War Stores",
      finding: "Quartermasters show grain, arrows, and sandals stacked for a long campaign, not a quick raid.",
      whyLabel: {
        en: "Quartermasters' warning",
        es: "Advertencia de los intendentes"
      },
      why: "A house that waits and watches may survive longer than one that spends itself early.",
      note: "Long war warning",
      summary: "This war may last longer than one brave charge.",
      repeat: "The quartermasters still say the side with stores will outlast the side with speeches.",
      support: "Careful timing and long-war planning."
    }
  },
  kamakura: {
    recordsOffice: {
      status: "Seal Check",
      finding: "Clerks show how land cases rise or fall on seals, names, and service papers.",
      whyLabel: {
        en: "Clerks' warning",
        es: "Advertencia de los escribanos"
      },
      why: "Paper backing can protect a house almost as much as armed men.",
      note: "Land case evidence",
      summary: "Records now decide which land claims hold up.",
      repeat: "The scribes still say missing papers can cost a house its land.",
      support: "Close bakufu service through records."
    },
    innerGate: {
      status: "Rank Test",
      finding: "Gate guards judge every visitor by seals, rank, and who sent them.",
      whyLabel: {
        en: "Gate guards' test",
        es: "Prueba de los guardias de la puerta"
      },
      why: "Standing close to Kamakura brings access, but only if your status is clear.",
      note: "Access and rank concern",
      summary: "Status and rank decide who gets through.",
      repeat: "The inner gate still reminds you that service must be seen as well as sworn.",
      support: "Court ties and careful position."
    },
    audienceHall: {
      status: "Power Signal",
      finding: "Inside the hall, quiet oaths move law, land, and military duty across whole districts.",
      whyLabel: {
        en: "What the hall shows",
        es: "Lo que muestra la sala"
      },
      why: "Direct bakufu service could give your house strong backing in the new order.",
      note: "Bakufu backing noted",
      summary: "Real power now flows through the audience hall.",
      repeat: "The hall still makes clear that direct service can move more than local custom.",
      support: "Direct gokenin service."
    }
  },
  onin: {
    hillCastle: {
      status: "Fortification Report",
      finding: "The garrison says the hill castle can hold grain, arrows, and families when valley roads fail.",
      whyLabel: {
        en: "Garrison warning",
        es: "Advertencia de la guarnicion"
      },
      why: "Strong walls buy time when no central army is coming to save you.",
      note: "Castle defense logged",
      summary: "The hill castle can anchor the whole region.",
      repeat: "The garrison still says the castle is the safest place in a breaking province.",
      support: "Fortify and stock the castle."
    },
    marketRoad: {
      status: "Market Warning",
      finding: "Merchants say they will keep coming only if someone protects toll gates and wagon roads.",
      whyLabel: {
        en: "Merchants' concern",
        es: "Preocupacion de los mercaderes"
      },
      why: "If trade collapses, grain, iron, and followers start slipping away too.",
      note: "Trade route concern",
      summary: "Open markets depend on safe roads.",
      repeat: "The merchants still care more about safe roads than bold speeches.",
      support: "Protect roads and markets."
    },
    checkpoint: {
      status: "Courier Report",
      finding: "Checkpoint officers say tax carts and messengers reveal trouble here before it reaches the castle.",
      whyLabel: {
        en: "Checkpoint warning",
        es: "Advertencia del puesto de control"
      },
      why: "A faster message network can stop a local fight from becoming a wider collapse.",
      note: "Messenger network concern",
      summary: "This post hears trouble before the rest of the province.",
      repeat: "The checkpoint still proves that information moves faster than armies.",
      support: "Build scribes and messenger routes."
    }
  },
  sengoku: {
    armory: {
      status: "Army Readiness",
      finding: "Drill masters say powder, spears, and trained ashigaru could change how rivals judge your house.",
      whyLabel: {
        en: "Drill masters' warning",
        es: "Advertencia de los maestros de armas"
      },
      why: "Military modernization can make a daimyo look strong fast.",
      note: "Army drill evidence",
      summary: "Firearms and drill could raise your house fast.",
      repeat: "The armory still shows that better drill can change the balance quickly.",
      support: "Buy firearms and drill soldiers."
    },
    keep: {
      status: "Lordship View",
      finding: "From the keep, officers track roads, storehouses, and tax fields as one linked plan.",
      whyLabel: {
        en: "What the keep shows",
        es: "Lo que muestra la fortaleza"
      },
      why: "A daimyo needs more than fighters. A daimyo needs control over land and revenue.",
      note: "Domain control concern",
      summary: "Real daimyo power means ruling roads, grain, and taxes together.",
      repeat: "The keep still shows that a lord must govern as well as fight.",
      support: "Measure fields and strengthen taxation."
    },
    merchantQuarter: {
      status: "Town Growth",
      finding: "Rice brokers and smiths say a busy castle town brings money, talent, and followers under one roof.",
      whyLabel: {
        en: "Merchants' pitch",
        es: "Propuesta de los mercaderes"
      },
      why: "Town growth can turn your rule into something people depend on every day.",
      note: "Castle-town growth noted",
      summary: "A stronger castle town could widen your support.",
      repeat: "The merchants still say busy streets can be as useful as sharp spears.",
      support: "Grow the castle town and reward talent."
    }
  },
  edo: {
    magistrateOffice: {
      status: "Case File",
      finding: "Clerks say most trouble now starts as disputes over permits, taxes, or road rules, not duels.",
      whyLabel: {
        en: "Clerks' view",
        es: "Punto de vista de los escribanos"
      },
      why: "A house that trains strong officials can hold power in peace.",
      note: "Office power noted",
      summary: "Quiet offices now decide many of the biggest problems.",
      repeat: "The magistrate staff still prove that paperwork can matter as much as swords.",
      support: "Train magistrates and record keepers."
    },
    edoRoad: {
      status: "Procession Burden",
      finding: "Road officers show lists of packhorses, guards, and travel stores needed just to reach Edo correctly.",
      whyLabel: {
        en: "Road officers' warning",
        es: "Advertencia de los oficiales del camino"
      },
      why: "Mastering procession logistics can raise status, but it drains time and money.",
      note: "Edo road burden",
      summary: "The road to Edo rewards discipline but costs a lot.",
      repeat: "The road records still show how expensive proper processions can be.",
      support: "Master the long processions to Edo."
    },
    domainSchool: {
      status: "School Report",
      finding: "Teachers say writing, law, and careful copying now hold young retainers together.",
      whyLabel: {
        en: "Teachers' view",
        es: "Punto de vista de los maestros"
      },
      why: "A domain that teaches well can serve through schools and offices, not only arms.",
      note: "School service note",
      summary: "Education is becoming a real form of samurai service.",
      repeat: "The school still shows that trained minds now hold a house together.",
      support: "Train retainers for schools and offices."
    }
  },
  "edo-reform": {
    granary: {
      status: "Relief Warning",
      finding: "The storehouse master says another bad season will leave some villages with seed rice missing.",
      whyLabel: {
        en: "Storehouse warning",
        es: "Advertencia del almacen"
      },
      why: "Opening granaries could cool unrest, but it will strain the treasury.",
      note: "Granary pressure logged",
      summary: "Food relief could calm the domain, but stores are thin.",
      repeat: "The granary keeper still warns that hunger is one bad harvest away.",
      support: "Open granaries and ease taxes."
    },
    petitionPost: {
      status: "Village Anger",
      finding: "Petitions repeat the same problem: taxes stay hard even when harvests fail.",
      whyLabel: {
        en: "Petitioners' warning",
        es: "Advertencia de los peticionarios"
      },
      why: "Ignoring village anger could turn debt into open unrest.",
      note: "Petitions filed",
      summary: "Village anger is rising over debt and tax pressure.",
      repeat: "The petition bundles still show that anger is spreading from village to village.",
      support: "Hear petitions and adjust policy."
    },
    studyHall: {
      status: "New Knowledge",
      finding: "Scholars compare Dutch books, copied maps, and strange tools that could help the domain reform.",
      whyLabel: {
        en: "Scholars' view",
        es: "Punto de vista de los estudiosos"
      },
      why: "New learning may not solve hunger today, but it can change how leaders judge the crisis.",
      note: "Rangaku clue logged",
      summary: "New tools and books could reshape reform plans.",
      repeat: "The scholars still argue that old problems may need new methods.",
      support: "Study Dutch learning and new tools."
    }
  },
  meiji: {
    kyotoNotice: {
      status: "Imperial Order",
      finding: "The notices say new offices and armies will replace many of the old domain rules.",
      whyLabel: {
        en: "Imperial warning",
        es: "Advertencia imperial"
      },
      why: "The old rank system is ending faster than many houses expected.",
      note: "Imperial orders noted",
      summary: "Kyoto is pushing a new national order.",
      repeat: "The Kyoto notices still make clear that the old order is ending.",
      support: "Join the new state early."
    },
    edoOffice: {
      status: "State Office",
      finding: "Clerks explain that service now means ministries, files, drills, and exams more than birth rank.",
      whyLabel: {
        en: "Clerks' advice",
        es: "Consejo de los escribanos"
      },
      why: "A house that adapts could keep influence inside the new government.",
      note: "Government path logged",
      summary: "The new state rewards service, records, and adaptation.",
      repeat: "The offices still show that the new government wants skill more than old titles.",
      support: "Enter the new army or government."
    },
    portArsenal: {
      status: "Modern Arsenal",
      finding: "New uniforms, crates, and machines show how quickly military power is changing.",
      whyLabel: {
        en: "Arsenal warning",
        es: "Advertencia del arsenal"
      },
      why: "Resisting with only the old order will be costly against a state that is already modernizing.",
      note: "Modern army warning",
      summary: "Military power is shifting toward the new state.",
      repeat: "The arsenal still shows how far the new order has already moved.",
      support: "Adapt rather than defend the old order."
    }
  }
};

const heianEvidenceLabels = {
  security: {
    en: "road defense",
    es: "defensa del camino"
  },
  trust: {
    en: "village trust",
    es: "confianza de la aldea"
  },
  supply: {
    en: "rice stores",
    es: "reservas de arroz"
  },
  records: {
    en: "field order",
    es: "orden de las tierras"
  },
  response: {
    en: "warning speed",
    es: "velocidad de aviso"
  },
  authority: {
    en: "local confidence",
    es: "confianza local"
  }
};

const heianLensProfiles = {
  family: {
    provincial: {
      weights: {
        security: 1,
        response: 1
      },
      read: {
        en: "Border roots make exposed roads and slow warnings stand out first.",
        es: "Las raices de frontera hacen resaltar primero los caminos expuestos y los avisos lentos."
      }
    },
    court: {
      weights: {
        trust: 1,
        authority: 1
      },
      read: {
        en: "Court ties make village confidence and visible authority look more urgent.",
        es: "Los lazos cortesanos hacen que la confianza de la aldea y la autoridad visible parezcan mas urgentes."
      }
    },
    scholar: {
      weights: {
        records: 1,
        supply: 1
      },
      read: {
        en: "Record-minded eyes keep catching broken notices, blurred borders, and storehouse risk.",
        es: "Los ojos de un clan de registros siguen viendo avisos rotos, limites borrosos y riesgo en los almacenes."
      }
    }
  },
  focus: {
    martial: {
      weights: {
        security: 1,
        response: 1
      },
      read: {
        en: "Your commander style reads the estate as a speed-and-force problem.",
        es: "Tu estilo de comandante lee la hacienda como un problema de velocidad y fuerza."
      }
    },
    steward: {
      weights: {
        trust: 1,
        supply: 1,
        records: 1
      },
      read: {
        en: "Your steward style keeps linking roads, grain, and steady order.",
        es: "Tu estilo de administrador sigue uniendo caminos, grano y orden estable."
      }
    },
    scholar: {
      weights: {
        response: 1,
        records: 1,
        authority: 1
      },
      read: {
        en: "Your strategist style notices timing, coordination, and hidden tradeoffs first.",
        es: "Tu estilo de estratega nota primero el tiempo, la coordinacion y los costos ocultos."
      }
    }
  }
};

const missionLensProfiles = {
  family: {
    provincial: {
      en: "Border roots keep pulling your eye toward exposed routes and slow response.",
      es: "Las raices de frontera siguen llevando tu mirada hacia rutas expuestas y respuestas lentas."
    },
    court: {
      en: "Court roots keep highlighting visible authority and who must be reassured.",
      es: "Las raices cortesanas siguen resaltando la autoridad visible y a quien hay que tranquilizar."
    },
    scholar: {
      en: "Record roots keep catching mixed reports, land confusion, and broken counts.",
      es: "Las raices de registros siguen captando informes cruzados, confusion de tierras y cuentas rotas."
    }
  },
  focus: {
    martial: {
      en: "Commander style weighs speed, force, and readiness first.",
      es: "El estilo de comandante pesa primero la velocidad, la fuerza y la preparacion."
    },
    steward: {
      en: "Steward style keeps weighing grain, roads, and steady order.",
      es: "El estilo de administrador sigue pesando el grano, los caminos y el orden firme."
    },
    scholar: {
      en: "Strategist style keeps testing timing, coordination, and hidden tradeoffs.",
      es: "El estilo de estratega sigue probando el tiempo, la coordinacion y los costos ocultos."
    }
  }
};

const heianChoiceGuidance = {
  "heian-alliance": {
    strengths: ["trust", "authority"],
    risks: ["supply", "security"],
    label: {
      en: "Build alliances",
      es: "Construir alianzas"
    },
    best: {
      en: "Builds village trust and shared warning routes.",
      es: "Mejor para la confianza de la aldea y las rutas compartidas de aviso."
    },
    risk: {
      en: "Costs grain, and bold raiders may still test open roads before the watches knit together.",
      es: "Los regalos y puestos de guardia compartidos cuestan arroz, y los saqueadores aun pueden probar caminos abiertos."
    }
  },
  "heian-martial": {
    strengths: ["security", "response"],
    risks: ["trust", "supply"],
    label: {
      en: "Patrol harder",
      es: "Patrullar con mas fuerza"
    },
    best: {
      en: "Secures the roads fastest and answers alarms quickly.",
      es: "Mejor para la defensa rapida del camino y la respuesta veloz."
    },
    risk: {
      en: "Burns stored rice, and frightened villages may start fearing your own patrols.",
      es: "Las patrullas extra gastan arroz almacenado, y las aldeas asustadas pueden confiar menos en ti."
    }
  },
  "heian-survey": {
    strengths: ["records", "supply", "authority"],
    risks: ["security", "response"],
    label: {
      en: "Fix records",
      es: "Arreglar registros"
    },
    best: {
      en: "Restores field order, grain counts, and clear land claims.",
      es: "Mejor para el orden de tierras, el control del grano y los reclamos claros."
    },
    risk: {
      en: "The roads stay exposed until the new ledgers and orders reach the outer fields.",
      es: "Los guardias del camino siguen siendo pocos hasta que los nuevos registros y ordenes llegan a los campos lejanos."
    }
  }
};

const asciiArt = {
  title: [
    "        /\\        ",
    "       /  \\       ",
    "   /\\ /____\\ /\\   ",
    "  /  \\ |  | /  \\  ",
    " /____\\|__|/____\\ ",
    "    |  SAMURAI |  ",
    "    |   PATHS  |  ",
    "    |____||____|  "
  ].join("\n"),
  heian: [
    "     ||  ||     ",
    "  ___||__||___  ",
    " /___    ____\\\\ ",
    " |   |  | [] | |",
    " |___|__|____|_|"
  ].join("\n"),
  genpei: [
    "  |\\        /|  ",
    "  | \\  /\\  / |  ",
    "  |  \\/  \\/  |  ",
    "  |  / /\\ \\  |  ",
    "  |_/ /  \\ \\_|  "
  ].join("\n"),
  kamakura: [
    "    .------.    ",
    "  .'  SEAL  '.  ",
    " /  [====]   \\\\ ",
    "|    ____     | ",
    " \\\\__________/  "
  ].join("\n"),
  onin: [
    "     /\\_/\\\\     ",
    "  __/ ____ \\\\__  ",
    " |  | [] [] | | ",
    " |  |  __   | | ",
    " |__|_|__|__|_| "
  ].join("\n"),
  sengoku: [
    "    ___/\\\\___    ",
    " __/  ____  \\\\__ ",
    "|  _ /____\\\\ _  |",
    "|_/  \\____/  \\_|",
    "   /_/    \\_\\   "
  ].join("\n"),
  edo: [
    "  o--o  o--o   ",
    "   ||____||    ",
    " __||____||__  ",
    "|  PROCESSION |",
    "  ~~|_||_|~~   "
  ].join("\n"),
  "edo-reform": [
    "   ________   ",
    "  /______/|   ",
    "  | LEDGR |/  ",
    "  | O==O |    ",
    "  |______|    "
  ].join("\n"),
  meiji: [
    "     \\ | /     ",
    "   --- O ---   ",
    "     /_|_\\\\    ",
    "   __/___\\\\__  ",
    "  O--O   O--O  "
  ].join("\n"),
  "ending-daimyo": [
    "      /\\\\      ",
    "   __/  \\\\__   ",
    "  |  [] [] |   ",
    "  |   __   |   ",
    "  |__|__|__|   "
  ].join("\n"),
  "ending-scholar": [
    "   _________   ",
    "  /_______ /|  ",
    "  | SCHOOL| |  ",
    "  | RECORD| |  ",
    "  |_______|/   "
  ].join("\n"),
  "ending-broker": [
    "   .------.    ",
    "  /  SEAL  \\\\   ",
    " |  [==]   |   ",
    " |  LINKS  |   ",
    "  \\\\______/    "
  ].join("\n"),
  "ending-steward": [
    "   ________    ",
    "  / ____  /|   ",
    " | |RICE| | |  ",
    " | |____| | |  ",
    " |/______|/    "
  ].join("\n"),
  "ending-fragile": [
    "     .--.      ",
    "    /_.._\\\\     ",
    "    | || |     ",
    "    | || |     ",
    "     \\__/      "
  ].join("\n")
};

function getAsciiArt(key) {
  return asciiArt[key] || "";
}

let typewriterTimer = null;

const state = {
  language: "en",
  glossaryEnabled: true,
  teacherNotesVisible: false,
  familyId: families[0].id,
  focusId: focuses[1].id,
  playerNameDraft: "",
  playerName: "",
  view: "title",
  setupStep: 0,
  sceneIndex: 0,
  choiceLocked: false,
  playPhase: "mission",
  pressureHintsReviewed: false,
  introSceneId: "",
  introLanguage: "en",
  typedIntroArt: "",
  introArtComplete: false,
  typedIntro: "",
  introComplete: false,
  isTyping: false,
  stats: { ...baseStats },
  legacyScore: 0,
  eraScore: 0,
  badges: [],
  log: [],
  eraResults: [],
  pendingOutcome: null,
  navIndex: 0,
  openTermKey: null,
  justOpenedSetup: false,
  mapProgress: {},
  mapMessage: null,
  mapOverlayOpen: false,
  mapIntel: null,
  mapHelpOpen: false,
  mapInspectNotice: null,
  mapInspectAnchor: null
};

const dom = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheDom();
  bindEvents();
  renderApp(true);
}

function cacheDom() {
  dom.html = document.documentElement;
  dom.gameShell = document.querySelector(".game-shell");
  dom.topbar = document.querySelector(".topbar");
  dom.frame = document.querySelector(".frame");
  dom.hud = document.querySelector(".hud");
  dom.stage = document.querySelector(".stage");
  dom.hudEyebrow = document.getElementById("hudEyebrow");
  dom.hudTitle = document.getElementById("hudTitle");
  dom.hudSubtitle = document.getElementById("hudSubtitle");
  dom.languageLabel = document.getElementById("languageLabel");
  dom.hudLanguageButtons = document.getElementById("hudLanguageButtons");
  dom.glossaryToggle = document.getElementById("glossaryToggle");
  dom.teacherToggle = document.getElementById("teacherToggle");
  dom.profileHeading = document.getElementById("profileHeading");
  dom.playerCard = document.getElementById("playerCard");
  dom.legacyScoreLabel = document.getElementById("legacyScoreLabel");
  dom.legacyScoreValue = document.getElementById("legacyScoreValue");
  dom.eraScoreLabel = document.getElementById("eraScoreLabel");
  dom.eraScoreValue = document.getElementById("eraScoreValue");
  dom.statsHeading = document.getElementById("statsHeading");
  dom.statsGrid = document.getElementById("statsGrid");
  dom.traitsHeading = document.getElementById("traitsHeading");
  dom.badgeList = document.getElementById("badgeList");
  dom.statusScores = document.getElementById("statusScores");
  dom.statusLegend = document.getElementById("statusLegend");
  dom.statusLog = document.getElementById("statusLog");
  dom.statusTraits = document.getElementById("statusTraits");
  dom.vocabHeading = document.getElementById("vocabHeading");
  dom.tier2Legend = document.getElementById("tier2Legend");
  dom.tier3Legend = document.getElementById("tier3Legend");
  dom.teacherNotes = document.getElementById("teacherNotes");
  dom.logHeading = document.getElementById("logHeading");
  dom.logList = document.getElementById("logList");
  dom.titleView = document.getElementById("titleView");
  dom.titleEyebrow = document.getElementById("titleEyebrow");
  dom.titleHeading = document.getElementById("titleHeading");
  dom.titleArt = document.getElementById("titleArt");
  dom.titleCopy = document.getElementById("titleCopy");
  dom.titleBrief = document.getElementById("titleBrief");
  dom.titleMenuHelp = document.getElementById("titleMenuHelp");
  dom.titleStart = document.getElementById("titleStart");
  dom.setupView = document.getElementById("setupView");
  dom.setupEyebrow = document.getElementById("setupEyebrow");
  dom.setupHeading = document.getElementById("setupHeading");
  dom.setupStepLabel = document.getElementById("setupStepLabel");
  dom.setupPrompt = document.getElementById("setupPrompt");
  dom.nameLabel = document.getElementById("nameLabel");
  dom.leaderName = document.getElementById("leaderName");
  dom.randomNameBtn = document.getElementById("randomNameBtn");
  dom.nameHelper = document.getElementById("nameHelper");
  dom.familyHeading = document.getElementById("familyHeading");
  dom.familyOptions = document.getElementById("familyOptions");
  dom.focusHeading = document.getElementById("focusHeading");
  dom.focusOptions = document.getElementById("focusOptions");
  dom.setupHint = document.getElementById("setupHint");
  dom.setupSummary = document.getElementById("setupSummary");
  dom.setupBack = document.getElementById("setupBack");
  dom.beginChronicle = document.getElementById("beginChronicle");
  dom.playView = document.getElementById("playView");
  dom.playBriefGrid = dom.playView.querySelector(".play-brief-grid");
  dom.sceneStep = document.getElementById("sceneStep");
  dom.sceneTitle = document.getElementById("sceneTitle");
  dom.sceneYears = document.getElementById("sceneYears");
  dom.sceneAuthority = document.getElementById("sceneAuthority");
  dom.narratorLabel = document.getElementById("narratorLabel");
  dom.sceneArt = document.getElementById("sceneArt");
  dom.sceneIntro = document.getElementById("sceneIntro");
  dom.skipIntro = document.getElementById("skipIntro");
  dom.objectiveLabel = document.getElementById("objectiveLabel");
  dom.sceneObjective = document.getElementById("sceneObjective");
  dom.mapDock = document.getElementById("mapDock");
  dom.mapDockLabel = document.getElementById("mapDockLabel");
  dom.mapDockLead = document.getElementById("mapDockLead");
  dom.mapDockStatus = document.getElementById("mapDockStatus");
  dom.openMapBtn = document.getElementById("openMapBtn");
  dom.minimapSlot = document.getElementById("minimapSlot");
  dom.investigationReviewStage = document.getElementById("investigationReviewStage");
  dom.reviewEyebrow = document.getElementById("reviewEyebrow");
  dom.reviewHeading = document.getElementById("reviewHeading");
  dom.investigationSummary = document.getElementById("investigationSummary");
  dom.reviewBackToMapBtn = document.getElementById("reviewBackToMapBtn");
  dom.reviewHintsBtn = document.getElementById("reviewHintsBtn");
  dom.reviewChooseBtn = document.getElementById("reviewChooseBtn");
  dom.mapOverlay = document.getElementById("mapOverlay");
  dom.mapPanel = document.getElementById("mapPanel");
  dom.mapLabel = document.getElementById("mapLabel");
  dom.mapTitle = document.getElementById("mapTitle");
  dom.mapTierChip = document.getElementById("mapTierChip");
  dom.mapCoords = document.getElementById("mapCoords");
  dom.mapHelpBtn = document.getElementById("mapHelpBtn");
  dom.closeMapBtn = document.getElementById("closeMapBtn");
  dom.mapHelpPanel = document.getElementById("mapHelpPanel");
  dom.mapHelpClose = document.getElementById("mapHelpClose");
  dom.mapCanvas = document.getElementById("mapCanvas");
  dom.mapLocationLabel = document.getElementById("mapLocationLabel");
  dom.mapLocationName = document.getElementById("mapLocationName");
  dom.mapPrompt = document.getElementById("mapPrompt");
  dom.mapObjectivesLabel = document.getElementById("mapObjectivesLabel");
  dom.mapObjectives = document.getElementById("mapObjectives");
  dom.mapFactionLabel = document.getElementById("mapFactionLabel");
  dom.mapFactions = document.getElementById("mapFactions");
  dom.mapLegendLabel = document.getElementById("mapLegendLabel");
  dom.mapLegend = document.getElementById("mapLegend");
  dom.mapControlsLabel = document.getElementById("mapControlsLabel");
  dom.mapControls = document.getElementById("mapControls");
  dom.moveUp = document.getElementById("moveUp");
  dom.moveLeft = document.getElementById("moveLeft");
  dom.moveRight = document.getElementById("moveRight");
  dom.moveDown = document.getElementById("moveDown");
  dom.mapInteract = document.getElementById("mapInteract");
  dom.mapControlsHint = document.getElementById("mapControlsHint");
  dom.mapEventBox = document.getElementById("mapEventBox");
  dom.mapInspectPopup = document.getElementById("mapInspectPopup");
  dom.mapInspectBody = document.getElementById("mapInspectBody");
  dom.mapInspectDismiss = document.getElementById("mapInspectDismiss");
  dom.sceneBody = document.getElementById("sceneBody");
  dom.choiceStage = document.getElementById("choiceStage");
  dom.choiceBackBtn = document.getElementById("choiceBackBtn");
  dom.choiceSection = document.querySelector(".choice-section");
  dom.choiceHeading = document.getElementById("choiceHeading");
  dom.choiceList = document.getElementById("choiceList");
  dom.resultPanel = document.getElementById("resultPanel");
  dom.endView = document.getElementById("endView");
  dom.endEyebrow = document.getElementById("endEyebrow");
  dom.endHeading = document.getElementById("endHeading");
  dom.endArt = document.getElementById("endArt");
  dom.endingSummary = document.getElementById("endingSummary");
  dom.scoreBreakdown = document.getElementById("scoreBreakdown");
  dom.finalReflection = document.getElementById("finalReflection");
  dom.restartBtn = document.getElementById("restartBtn");
  dom.termPopover = document.getElementById("termPopover");
}

function bindEvents() {
  dom.titleStart.addEventListener("click", openSetup);
  dom.setupBack.addEventListener("click", handleSetupBack);
  dom.beginChronicle.addEventListener("click", handleSetupAdvance);
  dom.restartBtn.addEventListener("click", restartChronicle);
  dom.glossaryToggle.addEventListener("click", toggleGlossary);
  dom.teacherToggle.addEventListener("click", () => {
    state.teacherNotesVisible = !state.teacherNotesVisible;
    renderApp(true);
  });
  dom.skipIntro.addEventListener("click", skipTypewriter);
  dom.openMapBtn.addEventListener("click", openMapOverlay);
  dom.reviewBackToMapBtn.addEventListener("click", openMapOverlay);
  dom.reviewHintsBtn.addEventListener("click", reviewPressureHints);
  dom.reviewChooseBtn.addEventListener("click", openChoiceStage);
  dom.choiceBackBtn.addEventListener("click", openReportStage);
  dom.mapHelpBtn.addEventListener("click", toggleMapHelp);
  dom.closeMapBtn.addEventListener("click", () => closeMapOverlay(true));
  dom.mapHelpClose.addEventListener("click", () => closeMapHelp(true));
  dom.mapInspectDismiss.addEventListener("click", () => closeMapInspectPopup(true));
  dom.mapOverlay.addEventListener("click", event => {
    if (event.target === dom.mapOverlay) {
      closeMapOverlay(true);
    }
  });
  bindPressAction(dom.moveUp, () => moveOnMap(0, -1));
  bindPressAction(dom.moveLeft, () => moveOnMap(-1, 0));
  bindPressAction(dom.moveRight, () => moveOnMap(1, 0));
  bindPressAction(dom.moveDown, () => moveOnMap(0, 1));
  bindPressAction(dom.mapInteract, interactWithMapLocation);
  dom.leaderName.addEventListener("input", event => {
    const normalizedName = normalizePlayerNameInput(event.target.value);
    state.playerNameDraft = normalizedName;
    if (event.target.value !== normalizedName) {
      event.target.value = normalizedName;
    }
    if (state.view === "setup") {
      renderHud();
      renderSetupView();
      syncNavigation(false);
    }
  });
  dom.randomNameBtn.addEventListener("click", createRandomClanName);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", closeTermPopover);
}

function bindPressAction(element, handler) {
  let lastTouchPress = -1;

  element.addEventListener("pointerup", event => {
    if (event.pointerType === "mouse") {
      return;
    }

    lastTouchPress = event.timeStamp;
    event.preventDefault();
    handler(event);
  });

  element.addEventListener("click", event => {
    if (event.detail !== 0 && lastTouchPress >= 0 && event.timeStamp - lastTouchPress < 800) {
      event.preventDefault();
      return;
    }

    handler(event);
  });
}

function renderApp(resetNav = false) {
  const locale = getLocale();
  dom.html.lang = state.language;
  dom.gameShell.classList.toggle("is-title-shell", state.view === "title");
  dom.gameShell.classList.toggle("is-play-shell", state.view !== "title");
  dom.gameShell.classList.toggle("is-map-mode", state.mapOverlayOpen);
  dom.leaderName.placeholder = locale.namePlaceholder;
  renderHud();
  renderTitleView();
  renderSetupView();
  renderPlayView();
  renderEndView();
  syncNavigation(resetNav);

  if (state.justOpenedSetup) {
    state.justOpenedSetup = false;
    setTimeout(() => dom.leaderName.focus(), 0);
  }
}

function renderHud() {
  const locale = getLocale();
  const inPlayMode = state.view === "play" || state.view === "end";
  dom.hudEyebrow.textContent = locale.hudEyebrow;
  dom.hudTitle.textContent = locale.hudTitle;
  dom.hudSubtitle.textContent = locale.hudSubtitle;
  dom.languageLabel.textContent = locale.languageLabel;
  dom.profileHeading.textContent = locale.profileHeading;
  dom.legacyScoreLabel.textContent = locale.legacyScoreLabel;
  dom.legacyScoreValue.textContent = state.legacyScore;
  dom.eraScoreLabel.textContent = locale.eraScoreLabel;
  dom.eraScoreValue.textContent = state.eraScore;
  dom.statsHeading.textContent = locale.statsHeading;
  dom.traitsHeading.textContent = locale.traitsHeading;
  dom.vocabHeading.textContent = locale.vocabHeading;
  dom.tier2Legend.textContent = locale.tier2Legend;
  dom.tier3Legend.textContent = locale.tier3Legend;
  dom.logHeading.textContent = locale.logHeading;
  dom.glossaryToggle.textContent = state.glossaryEnabled ? locale.glossaryOn : locale.glossaryOff;
  dom.teacherToggle.textContent = locale.teacherNotesButton;
  renderLanguageButtons(dom.hudLanguageButtons, true);
  dom.statusScores.classList.toggle("hidden", !inPlayMode);
  dom.statusLegend.classList.toggle("hidden", !inPlayMode);
  dom.statusLog.classList.toggle("hidden", !inPlayMode);
  dom.statusTraits.classList.toggle("hidden", state.view === "title");
  renderTeacherNotes();
  renderPlayerCard();
  renderStats();
  renderBadges();
  renderLog();
}

function renderTeacherNotes() {
  const locale = getLocale();
  if (!state.teacherNotesVisible || (state.view !== "play" && state.view !== "end")) {
    dom.teacherNotes.classList.add("hidden");
    dom.teacherNotes.innerHTML = "";
    return;
  }

  dom.teacherNotes.classList.remove("hidden");
  dom.teacherNotes.innerHTML = `
    <h3 class="selector-heading">${locale.teacherNotesTitle}</h3>
    ${locale.teacherNotes.map(paragraph => `<p>${paragraph}</p>`).join("")}
  `;
}

function renderPlayerCard() {
  const locale = getLocale();
  const family = getFamily();
  const focus = getFocus();
  const stats = getDisplayStats();
  const playerName = getPlayerName();
  const rank = getRank(stats);

  dom.playerCard.innerHTML = `
    <div class="player-row">
      <span class="player-label">${locale.houseNameLabel}</span>
      <strong>${escapeHtml(playerName)}</strong>
    </div>
    <div class="player-row">
      <span class="player-label">${locale.originLabel}</span>
      <span class="player-copy">${escapeHtml(family.name[state.language])}</span>
    </div>
    <div class="player-row">
      <span class="player-label">${locale.focusLabel}</span>
      <span class="player-copy">${escapeHtml(focus.name[state.language])}</span>
    </div>
    <div class="player-row">
      <span class="player-label">${locale.statusLabel}</span>
      <span class="player-copy">${escapeHtml(rank)}</span>
    </div>
  `;
}

function renderStats() {
  const locale = getLocale();
  const stats = getDisplayStats();
  dom.statsGrid.innerHTML = "";

  statOrder.forEach(statKey => {
    const value = stats[statKey];
    const card = document.createElement("div");
    card.className = "stat-card";
    const toneClass = value >= 70 ? "fill--high" : value >= 40 ? "fill--mid" : "fill--low";
    card.innerHTML = `
      <div class="stat-top">
        <span class="stat-name">${locale.statLabels[statKey]}</span>
        <strong class="stat-value">${value}</strong>
      </div>
      <div class="bar">
        <div class="fill ${toneClass}" style="width:${value}%"></div>
      </div>
    `;
    dom.statsGrid.appendChild(card);
  });
}

function renderBadges() {
  const locale = getLocale();
  const previewBadges =
    state.badges.length > 0
      ? state.badges
      : [getFamily().badge, getFocus().badge].filter(
          (badge, index, list) => list.findIndex(item => item.id === badge.id) === index
        );
  dom.badgeList.innerHTML = "";

  if (!previewBadges.length) {
    const placeholder = document.createElement("div");
    placeholder.className = "badge";
    placeholder.textContent = locale.noTraits;
    dom.badgeList.appendChild(placeholder);
    return;
  }

  const maxVisibleBadges = state.view === "play" || state.view === "end" ? 4 : 6;
  previewBadges.slice(0, maxVisibleBadges).forEach(badge => {
    const badgeEl = document.createElement("div");
    badgeEl.className = "badge";
    badgeEl.textContent = badge[state.language];
    dom.badgeList.appendChild(badgeEl);
  });

  if (previewBadges.length > maxVisibleBadges) {
    const moreBadge = document.createElement("div");
    moreBadge.className = "badge badge--more";
    moreBadge.textContent = locale.traitsMore(previewBadges.length - maxVisibleBadges);
    dom.badgeList.appendChild(moreBadge);
  }
}

function renderLog() {
  const locale = getLocale();
  dom.logList.innerHTML = "";

  if (!state.log.length) {
    const empty = document.createElement("div");
    empty.className = "log-entry";
    empty.innerHTML = `<strong>${locale.noLogTitle}</strong><span>${locale.noLogCopy}</span>`;
    dom.logList.appendChild(empty);
    return;
  }

  state.log.slice(0, 3).forEach(entry => {
    const item = document.createElement("div");
    item.className = "log-entry";
    item.innerHTML = `
      <strong>${escapeHtml(entry.heading[state.language])}</strong>
      <span>${escapeHtml(entry.text[state.language])}</span>
    `;
    dom.logList.appendChild(item);
  });
}

function renderTitleView() {
  const locale = getLocale();
  toggleView("titleView", state.view === "title");
  dom.titleEyebrow.textContent = locale.titleEyebrow;
  dom.titleHeading.textContent = locale.titleHeading;
  dom.titleArt.textContent = getAsciiArt("title");
  dom.titleCopy.textContent = locale.titleCopy;
  dom.titleStart.textContent = locale.titleStart;
  dom.titleBrief.innerHTML = `
    <h3 class="selector-heading">${locale.titleBriefHeading}</h3>
    ${locale.titleBrief.map(paragraph => `<p>${paragraph}</p>`).join("")}
  `;
  dom.titleMenuHelp.innerHTML = `
    <h3 class="selector-heading">${locale.titleMenuHeading}</h3>
    ${locale.titleMenu.map(paragraph => `<p>${paragraph}</p>`).join("")}
  `;
}

function renderSetupView() {
  const locale = getLocale();
  toggleView("setupView", state.view === "setup");
  dom.setupEyebrow.textContent = locale.setupEyebrow;
  dom.setupHeading.textContent = getSetupHeading(locale);
  dom.setupStepLabel.textContent = locale.setupStepLabel(state.setupStep + 1, 4);
  dom.nameLabel.textContent = locale.nameLabel;
  dom.randomNameBtn.textContent = locale.randomNameButton;
  dom.nameHelper.textContent = locale.nameHelper;
  dom.familyHeading.textContent = locale.familyHeading;
  dom.focusHeading.textContent = locale.focusHeading;
  dom.leaderName.value = state.playerNameDraft;

  renderSelectorOptions(dom.familyOptions, families, state.familyId, item => {
    state.familyId = item.id;
    renderApp(true);
  });

  renderSelectorOptions(dom.focusOptions, focuses, state.focusId, item => {
    state.focusId = item.id;
    renderApp(true);
  });

  const previewStats = getPreviewStats();
  const previewText = statOrder.map(key => `${locale.statLabels[key]} ${previewStats[key]}`).join(" / ");
  dom.setupHint.classList.toggle("hidden", state.setupStep === 3);
  dom.setupHint.innerHTML = `<p>${locale.setupHint}</p>`;

  dom.leaderName.parentElement.classList.toggle("hidden", state.setupStep !== 0);
  dom.familyOptions.parentElement.classList.toggle("hidden", state.setupStep !== 1);
  dom.focusOptions.parentElement.classList.toggle("hidden", state.setupStep !== 2);

  dom.setupSummary.classList.toggle("hidden", state.setupStep !== 3);
  dom.setupPrompt.innerHTML = `<p>${getSetupPrompt(locale)}</p>`;

  if (state.setupStep === 3) {
    dom.setupSummary.innerHTML = `
      <h3 class="selector-heading">${locale.setupHeadings.summary}</h3>
      <p><strong>${locale.houseNameLabel}:</strong> ${escapeHtml(getPlayerName())}</p>
      <p><strong>${locale.originLabel}:</strong> ${escapeHtml(getFamily().name[state.language])}</p>
      <p><strong>${locale.focusLabel}:</strong> ${escapeHtml(getFocus().name[state.language])}</p>
      <p><strong>${locale.previewLabel}:</strong> ${escapeHtml(previewText)}</p>
    `;
  } else {
    dom.setupSummary.innerHTML = "";
  }

  dom.setupBack.textContent = state.setupStep === 0 ? locale.setupBackToStart : locale.setupBackStep;
  dom.beginChronicle.textContent = getSetupPrimaryButtonLabel(locale);
}

function renderPlayView() {
  const locale = getLocale();
  const inPlay = state.view === "play";
  toggleView("playView", inPlay);

  if (!inPlay) {
    clearTypewriter();
    dom.sceneArt.textContent = "";
    resetPlayPhase();
    state.mapOverlayOpen = false;
    state.mapIntel = null;
    state.mapHelpOpen = false;
    state.mapInspectNotice = null;
    dom.playBriefGrid.classList.remove("hidden");
    dom.investigationReviewStage.classList.add("hidden");
    dom.choiceStage.classList.add("hidden");
    dom.mapDock.classList.add("hidden");
    dom.investigationSummary.classList.add("hidden");
    dom.choiceSection.classList.add("hidden");
    dom.mapOverlay.classList.add("hidden");
    dom.stage.classList.remove("is-map-open");
    return;
  }

  if (state.sceneIndex >= scenes.length) {
    state.view = "end";
    renderApp(true);
    return;
  }

  const scene = scenes[state.sceneIndex];
  const flavor = getSceneFlavor(scene.id);
  const sceneMap = getSceneMap(scene.id);
  const playPhase = getResolvedPlayPhase(scene);
  state.playPhase = playPhase;
  dom.sceneStep.textContent = locale.chapterLabel(state.sceneIndex + 1, scenes.length);
  dom.sceneTitle.textContent = scene.title[state.language];
  dom.sceneYears.textContent = scene.years;
  dom.sceneAuthority.textContent = flavor.authority[state.language];
  dom.narratorLabel.textContent = locale.narratorLabel;
  dom.objectiveLabel.textContent = locale.objectiveLabel;
  dom.sceneObjective.innerHTML = renderRichText(scene.objective[state.language]);
  dom.choiceHeading.textContent = locale.choiceHeading;
  dom.reviewEyebrow.textContent = locale.reviewEyebrow;
  dom.reviewHeading.textContent = locale.reviewHeading;
  dom.reviewBackToMapBtn.textContent = locale.reviewBackToMap;
  dom.reviewHintsBtn.textContent = locale.reviewHintsButton;
  dom.reviewChooseBtn.textContent = locale.reviewChooseButton;
  dom.choiceBackBtn.textContent = locale.choiceBackButton;
  dom.skipIntro.textContent = locale.skipIntro;
  dom.mapDockLabel.textContent = locale.mapDockLabel;
  dom.mapDockLead.textContent = locale.mapDockLead;
  dom.openMapBtn.textContent = locale.mapOpenButton;
  dom.minimapSlot.textContent = locale.mapMinimapStub;
  dom.mapLabel.textContent = locale.mapLabel;
  dom.mapHelpBtn.textContent = state.mapHelpOpen ? locale.mapHelpClose : locale.mapHelpOpen;
  dom.mapHelpClose.textContent = locale.mapHelpClose;
  dom.closeMapBtn.textContent = locale.mapCloseButton;
  dom.mapLocationLabel.textContent = locale.mapLocationLabel;
  dom.mapObjectivesLabel.textContent = locale.mapObjectivesLabel;
  dom.mapFactionLabel.textContent = locale.mapFactionLabel;
  dom.mapLegendLabel.textContent = locale.mapLegendLabel;
  dom.mapInspectDismiss.textContent = locale.mapInspectDismiss;
  dom.mapControlsLabel.textContent = locale.mapControlsLabel;
  dom.mapControlsHint.textContent = locale.mapControlsHint;
  dom.mapInteract.setAttribute("aria-label", locale.mapInteract);
  dom.moveUp.setAttribute("aria-label", locale.mapMoveNorth);
  dom.moveLeft.setAttribute("aria-label", locale.mapMoveWest);
  dom.moveRight.setAttribute("aria-label", locale.mapMoveEast);
  dom.moveDown.setAttribute("aria-label", locale.mapMoveSouth);
  dom.mapInteract.innerHTML = `<span class="map-action-glyph" aria-hidden="true">A</span><span class="map-action-text">${escapeHtml(
    locale.mapInteract
  )}</span>`;
  dom.moveUp.innerHTML = `<span class="map-move-glyph" aria-hidden="true">^</span><span class="map-move-text">${escapeHtml(
    locale.mapMoveNorth
  )}</span>`;
  dom.moveLeft.innerHTML = `<span class="map-move-glyph" aria-hidden="true">&lt;</span><span class="map-move-text">${escapeHtml(
    locale.mapMoveWest
  )}</span>`;
  dom.moveRight.innerHTML = `<span class="map-move-glyph" aria-hidden="true">&gt;</span><span class="map-move-text">${escapeHtml(
    locale.mapMoveEast
  )}</span>`;
  dom.moveDown.innerHTML = `<span class="map-move-glyph" aria-hidden="true">v</span><span class="map-move-text">${escapeHtml(
    locale.mapMoveSouth
  )}</span>`;

  if (sceneMap) {
    ensureSceneMapProgress(scene);
  }

  const sceneDetail = getSceneDetail(scene);
  dom.sceneBody.innerHTML = sceneDetail ? `<p>${renderRichText(sceneDetail)}</p>` : "";
  dom.sceneBody.dataset.hasContent = sceneDetail ? "true" : "false";

  if (state.pendingOutcome) {
    clearTypewriter();
    state.introSceneId = scene.id;
    state.introLanguage = state.language;
    state.typedIntroArt = getAsciiArt(scene.id);
    state.introArtComplete = !!state.typedIntroArt;
    state.typedIntro = flavor.intro[state.language];
    state.introComplete = true;
    state.isTyping = false;
  } else if (state.introSceneId !== scene.id || state.introLanguage !== state.language) {
    beginTypewriter(scene);
  }

  updateSceneIntroDisplay(scene, playPhase);
  renderMapDock(scene, playPhase);
  renderInvestigationSummary(scene, {
    visible: playPhase === "report",
    showPressureHints: state.pressureHintsReviewed
  });
  renderMapPanel(scene);
  renderChoices(scene);
  renderResultPanel(scene);

  const hasBody = dom.sceneBody.dataset.hasContent === "true";
  const showMissionStage = playPhase === "mission" && !state.pendingOutcome;
  const showReviewStage = playPhase === "report" && !state.pendingOutcome;
  const showChoiceStage = playPhase === "choices" && !state.pendingOutcome;
  dom.playBriefGrid.classList.toggle("hidden", !showMissionStage);
  dom.sceneBody.classList.toggle("hidden", !showMissionStage || !hasBody);
  dom.investigationReviewStage.classList.toggle("hidden", !showReviewStage);
  dom.reviewBackToMapBtn.classList.toggle("hidden", !sceneMap);
  dom.reviewHintsBtn.classList.toggle("hidden", state.pressureHintsReviewed);
  dom.reviewChooseBtn.classList.toggle("hidden", !state.pressureHintsReviewed);
  dom.choiceStage.classList.toggle("hidden", !showChoiceStage);
  dom.choiceSection.classList.toggle("hidden", !showChoiceStage || state.choiceLocked);
}

function renderChoices(scene) {
  dom.choiceList.innerHTML = "";
  if (state.choiceLocked) {
    return;
  }

  const heianSnapshot =
    scene.id === "heian" && getSceneMap(scene.id) ? getHeianEvidenceSnapshot(getSceneEvidence(scene, getSceneMap(scene.id), ensureSceneMapProgress(scene))) : null;
  const locale = getLocale();

  scene.choices.forEach((choice, index) => {
    const heianBrief = scene.id === "heian" ? getHeianChoiceBrief(choice, heianSnapshot) : null;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.dataset.nav = "true";
    button.innerHTML = `
      <span class="choice-badge">0${index + 1}</span>
      <span class="choice-copy">
        <span class="choice-title">${escapeHtml(choice.text[state.language])}</span>
        ${
          heianBrief
            ? `
              <span class="choice-note">${escapeHtml(heianBrief.best)}</span>
              ${
                heianBrief.evidence
                  ? `<span class="choice-note"><span class="intel-label">${locale.strategyEvidenceLabel}:</span> ${escapeHtml(
                      heianBrief.evidence
                    )}</span>`
                  : ""
              }
              <span class="choice-note"><span class="intel-label">${locale.strategyRiskLabel}:</span> ${escapeHtml(heianBrief.risk)}</span>
            `
            : ""
        }
      </span>
    `;
    button.addEventListener("click", () => chooseOption(choice, scene));
    dom.choiceList.appendChild(button);
  });
}

function renderResultPanel(scene) {
  const locale = getLocale();
  if (!state.pendingOutcome) {
    dom.resultPanel.classList.add("hidden");
    dom.resultPanel.innerHTML = "";
    return;
  }

  const outcome = state.pendingOutcome;
  dom.resultPanel.classList.remove("hidden");
  dom.resultPanel.innerHTML = `
    <div class="result-grid">
      <div class="result-box">
        <p>${renderRichText(outcome.result[state.language])}</p>
      </div>
      <div class="score-pill">
        <span>${locale.latestScore}</span>
        <strong>${escapeHtml(scene.scoreLabel[state.language])}: +${outcome.eraScore}</strong>
      </div>
      <p class="effect-line">${locale.effects}: ${escapeHtml(formatEffects(outcome.effects))}</p>
      <div class="note-box note-box--history">
        <strong>${locale.historyNote}</strong>
        <p>${renderRichText(scene.note[state.language])}</p>
        <p>${renderRichText(scene.myth[state.language])}</p>
      </div>
      <div class="action-row">
        <button id="continueBtn" class="menu-btn menu-btn--primary" type="button" data-nav="true">${locale.continue}</button>
      </div>
    </div>
  `;

  const continueBtn = document.getElementById("continueBtn");
  continueBtn.addEventListener("click", advanceScene);
}

function renderEndView() {
  const locale = getLocale();
  toggleView("endView", state.view === "end");
  if (state.view !== "end") {
    return;
  }

  dom.endEyebrow.textContent = locale.endEyebrow;
  dom.endHeading.textContent = locale.endHeading;
  dom.restartBtn.textContent = locale.restart;

  const ending = getEnding();
  const endingArt = getAsciiArt(ending.artKey);
  dom.endArt.textContent = endingArt;
  dom.endArt.classList.toggle("hidden", !endingArt);
  dom.endingSummary.innerHTML = `
    <h3 class="selector-heading">${escapeHtml(ending.title)}</h3>
    ${ending.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
  `;

  dom.scoreBreakdown.innerHTML = `
    <h3 class="selector-heading">${locale.eraBreakdownHeading}</h3>
    ${state.eraResults
      .map(result => {
        const scene = scenes.find(item => item.id === result.sceneId);
        return `
          <div class="breakdown-row">
            <span>${escapeHtml(scene.title[state.language])}</span>
            <strong class="breakdown-score">+${result.score}</strong>
          </div>
        `;
      })
      .join("")}
  `;

  const topStats = [...statOrder].sort((a, b) => state.stats[b] - state.stats[a]).slice(0, 2);
  dom.finalReflection.innerHTML = `
    <p>${locale.reflectionLead(getDisplayHouseName(), locale.statLabels[topStats[0]], locale.statLabels[topStats[1]])}</p>
    <p>${locale.finalReflection}</p>
  `;
}

function renderSelectorOptions(container, items, selectedId, onSelect) {
  container.innerHTML = "";
  items.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `selector-option${item.id === selectedId ? " is-selected" : ""}`;
    button.dataset.nav = "true";
    button.innerHTML = `
      <span class="selector-title">${escapeHtml(item.name[state.language])}</span>
      <span class="selector-copy">${escapeHtml(item.description[state.language])}</span>
    `;
    button.addEventListener("click", () => onSelect(item));
    container.appendChild(button);
  });
}

function renderLanguageButtons(container, includeHudStyles) {
  const locale = getLocale();
  container.innerHTML = "";
  Object.keys(copy).forEach(languageKey => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lang-btn${state.language === languageKey ? " is-selected" : ""}`;
    button.dataset.nav = "true";
    button.textContent = locale.languageNames[languageKey];
    button.addEventListener("click", () => {
      state.language = languageKey;
      closeTermPopover();
      renderApp(true);
    });
    if (!includeHudStyles) {
      button.classList.add("menu-btn");
      button.classList.remove("lang-btn");
    }
    container.appendChild(button);
  });
}

function getSetupPrompt(locale) {
  if (state.setupStep === 0) {
    return locale.setupPrompts.name;
  }
  if (state.setupStep === 1) {
    return locale.setupPrompts.family;
  }
  if (state.setupStep === 2) {
    return locale.setupPrompts.focus;
  }
  return locale.setupPrompts.summary;
}

function getSetupHeading(locale) {
  if (state.setupStep === 0) {
    return locale.setupHeadings.name;
  }
  if (state.setupStep === 1) {
    return locale.setupHeadings.family;
  }
  if (state.setupStep === 2) {
    return locale.setupHeadings.focus;
  }
  return locale.setupHeadings.summary;
}

function getSetupPrimaryButtonLabel(locale) {
  if (state.setupStep === 2) {
    return locale.setupReview;
  }
  if (state.setupStep === 3) {
    return locale.beginJourney;
  }
  return locale.setupContinue;
}

function resetPlayPhase() {
  state.playPhase = "mission";
  state.pressureHintsReviewed = false;
}

function getResolvedPlayPhase(scene) {
  const sceneMap = scene ? getSceneMap(scene.id) : null;
  if (!sceneMap) {
    return state.introComplete && !state.pendingOutcome ? "choices" : "mission";
  }
  if (!state.introComplete || state.pendingOutcome || !isSceneMapComplete(scene.id)) {
    return "mission";
  }
  if (state.playPhase === "choices" && !state.pressureHintsReviewed) {
    return "report";
  }
  return state.playPhase;
}

function openReportStage(resetNav = true) {
  const scene = getCurrentScene();
  if (!scene || !getSceneMap(scene.id) || !isSceneMapComplete(scene.id)) {
    return;
  }
  state.mapOverlayOpen = false;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  state.playPhase = "report";
  refreshPlayScene(false, resetNav);
}

function reviewPressureHints(resetNav = true) {
  const scene = getCurrentScene();
  if (!scene || !getSceneMap(scene.id) || !isSceneMapComplete(scene.id)) {
    return;
  }
  state.pressureHintsReviewed = true;
  state.playPhase = "report";
  refreshPlayScene(false, resetNav);
}

function openChoiceStage(resetNav = true) {
  const scene = getCurrentScene();
  if (!scene) {
    return;
  }
  const sceneMap = getSceneMap(scene.id);
  if (sceneMap && (!isSceneMapComplete(scene.id) || !state.pressureHintsReviewed)) {
    return;
  }
  state.mapOverlayOpen = false;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  state.playPhase = "choices";
  refreshPlayScene(false, resetNav);
}

function getSceneFlavor(sceneId) {
  return sceneFlavor[sceneId];
}

function getSceneDetail(scene) {
  const detail = scene.paragraphs[state.language][1] || "";
  const sentenceMatch = detail.match(/.*?[.!?](?:\s|$)/);
  return sentenceMatch ? sentenceMatch[0].trim() : detail;
}

function resetSceneIntro() {
  clearTypewriter();
  state.introSceneId = "";
  state.introLanguage = state.language;
  state.typedIntroArt = "";
  state.introArtComplete = false;
  state.typedIntro = "";
  state.introComplete = false;
  state.isTyping = false;
}

function beginTypewriter(scene) {
  const flavor = getSceneFlavor(scene.id);
  if (!flavor) {
    return;
  }

  clearTypewriter();
  state.introSceneId = scene.id;
  state.introLanguage = state.language;
  state.typedIntroArt = "";
  state.introArtComplete = false;
  state.typedIntro = "";
  state.introComplete = false;
  state.isTyping = true;
  updateSceneIntroDisplay(scene);
  const art = getAsciiArt(scene.id);
  if (art) {
    typeSceneArt(scene, art.split("\n"), 0);
    return;
  }

  state.introArtComplete = true;
  updateSceneIntroDisplay(scene);
  typeSceneIntro(scene, flavor.intro[state.language], 0);
}

function typeSceneArt(scene, lines, lineIndex) {
  if (state.view !== "play") {
    return;
  }

  if (state.sceneIndex >= scenes.length || scenes[state.sceneIndex].id !== scene.id) {
    return;
  }

  if (state.pendingOutcome) {
    return;
  }

  if (lineIndex >= lines.length) {
    state.introArtComplete = true;
    updateSceneIntroDisplay(scene);
    typeSceneIntro(scene, getSceneFlavor(scene.id).intro[state.language], 0);
    return;
  }

  state.typedIntroArt = lines.slice(0, lineIndex + 1).join("\n");
  updateSceneIntroDisplay(scene);
  typewriterTimer = window.setTimeout(() => typeSceneArt(scene, lines, lineIndex + 1), 52);
}

function typeSceneIntro(scene, fullText, index) {
  if (state.view !== "play") {
    return;
  }

  if (state.sceneIndex >= scenes.length || scenes[state.sceneIndex].id !== scene.id) {
    return;
  }

  if (state.pendingOutcome) {
    return;
  }

  if (index >= fullText.length) {
    skipTypewriter();
    return;
  }

  state.typedIntro = fullText.slice(0, index + 1);
  updateSceneIntroDisplay(scene);
  typewriterTimer = window.setTimeout(() => typeSceneIntro(scene, fullText, index + 1), 16);
}

function skipTypewriter() {
  if (state.sceneIndex >= scenes.length) {
    return;
  }

  const scene = scenes[state.sceneIndex];
  const flavor = getSceneFlavor(scene.id);
  if (!flavor) {
    return;
  }

  clearTypewriter();
  state.introSceneId = scene.id;
  state.introLanguage = state.language;
  state.typedIntroArt = getAsciiArt(scene.id);
  state.introArtComplete = !!state.typedIntroArt;
  state.typedIntro = flavor.intro[state.language];
  state.introComplete = true;
  state.isTyping = false;
  updateSceneIntroDisplay(scene);
  syncNavigation(true);
}

function clearTypewriter() {
  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }
  state.isTyping = false;
}

function updateSceneIntroDisplay(scene, playPhase = state.playPhase) {
  const art = getAsciiArt(scene.id);
  const sceneMap = getSceneMap(scene.id);
  dom.sceneArt.textContent = state.typedIntroArt;
  dom.sceneArt.classList.toggle("hidden", !art);
  dom.sceneArt.classList.toggle("is-building", state.isTyping && !state.introArtComplete);
  dom.sceneIntro.textContent = state.typedIntro;
  dom.sceneIntro.classList.toggle("is-typing", state.isTyping && state.introArtComplete);
  dom.sceneIntro.classList.toggle("is-ready", state.introComplete && !state.pendingOutcome);
  dom.skipIntro.classList.toggle("hidden", !state.isTyping);
  const mapDockVisible = (state.introComplete || !!state.pendingOutcome) && !state.pendingOutcome && !!sceneMap && playPhase === "mission";
  const mapAvailable = state.introComplete && !state.pendingOutcome && !!sceneMap;
  dom.mapDock.classList.toggle("hidden", !mapDockVisible);
  dom.mapDock.classList.toggle("is-ready", mapDockVisible && isSceneMapComplete(scene.id));
  if (!mapAvailable) {
    state.mapOverlayOpen = false;
    state.mapIntel = null;
    state.mapHelpOpen = false;
    state.mapInspectNotice = null;
    dom.mapOverlay.classList.add("hidden");
    dom.stage.classList.remove("is-map-open");
  }
}

function getCurrentScene() {
  return scenes[state.sceneIndex] || null;
}

function getSceneMap(sceneId) {
  return sceneMaps[sceneId] || null;
}

function localizeForLanguage(entry, language) {
  if (!entry) {
    return "";
  }
  if (typeof entry === "string") {
    return entry;
  }
  return entry[language] || entry.en || "";
}

function localize(entry) {
  return localizeForLanguage(entry, state.language);
}

function isMapMarker(value) {
  return /^[a-z]$/.test(value);
}

function getTemplateDimensions(template) {
  return {
    width: template.rows.reduce((max, row) => Math.max(max, row.length), 0),
    height: template.rows.length
  };
}

function getMarkerPosition(template, marker) {
  template.markerCache ||= {};
  if (template.markerCache[marker]) {
    return template.markerCache[marker];
  }

  for (let y = 0; y < template.rows.length; y += 1) {
    const x = template.rows[y].indexOf(marker);
    if (x !== -1) {
      template.markerCache[marker] = { x, y };
      return template.markerCache[marker];
    }
  }

  return null;
}

function getResolvedSceneLocations(sceneMap) {
  if (sceneMap.resolvedLocations) {
    return sceneMap.resolvedLocations;
  }

  const template = mapTemplates[sceneMap.templateId];
  const resolved = {};
  const byMarker = {};

  Object.entries(sceneMap.locations).forEach(([id, location]) => {
    const position = getMarkerPosition(template, location.marker);
    if (!position) {
      return;
    }

    const resolvedLocation = {
      ...location,
      id,
      x: position.x,
      y: position.y
    };

    resolved[id] = resolvedLocation;
    byMarker[location.marker] = resolvedLocation;
  });

  sceneMap.resolvedLocations = resolved;
  sceneMap.locationsByMarker = byMarker;
  return resolved;
}

function ensureSceneMapProgress(scene) {
  const sceneMap = getSceneMap(scene.id);
  if (!sceneMap) {
    return null;
  }

  if (!state.mapProgress[scene.id]) {
    const template = mapTemplates[sceneMap.templateId];
    const startPos = getMarkerPosition(template, sceneMap.start) || { x: 1, y: 1 };
    state.mapProgress[scene.id] = {
      x: startPos.x,
      y: startPos.y,
      visited: [],
      completeLogged: false
    };
  }

  if (!state.mapMessage) {
    state.mapMessage = getDefaultMapMessage(scene.id);
  }

  return state.mapProgress[scene.id];
}

function getSceneMapProgress(sceneId) {
  return state.mapProgress[sceneId] || null;
}

function getDefaultMapMessage(sceneId) {
  const localeEn = copy.en;
  const localeEs = copy.es;
  const remaining = getRemainingSceneMapGoals(sceneId);
  if (remaining <= 0) {
    return {
      en: localeEn.mapReady,
      es: localeEs.mapReady
    };
  }

  return {
    en: localeEn.mapNeedMore(remaining),
    es: localeEs.mapNeedMore(remaining)
  };
}

function getRemainingSceneMapGoals(sceneId) {
  const sceneMap = getSceneMap(sceneId);
  const progress = getSceneMapProgress(sceneId);
  if (!sceneMap) {
    return 0;
  }
  if (!progress) {
    return sceneMap.required.length;
  }

  return sceneMap.required.filter(locationId => !progress.visited.includes(locationId)).length;
}

function isSceneMapComplete(sceneId) {
  return getRemainingSceneMapGoals(sceneId) === 0;
}

function getBaseTemplateChar(template, x, y) {
  if (y < 0 || y >= template.rows.length || x < 0) {
    return " ";
  }

  return template.rows[y][x] || " ";
}

function getMapSymbolAt(sceneMap, x, y) {
  const template = mapTemplates[sceneMap.templateId];
  const baseChar = getBaseTemplateChar(template, x, y);
  if (isMapMarker(baseChar)) {
    getResolvedSceneLocations(sceneMap);
    const resolvedLocation = sceneMap.locationsByMarker?.[baseChar];
    return resolvedLocation ? resolvedLocation.symbol : ".";
  }
  return baseChar;
}

function getMapToneClass(symbol) {
  if (symbol === "@") {
    return "player";
  }

  return mapTiles[symbol]?.tone || "ground";
}

function isRoadDisplaySymbol(symbol) {
  return symbol === "=" || symbol === "B";
}

function getRoadConnections(sceneMap, x, y) {
  return {
    up: isRoadDisplaySymbol(getMapSymbolAt(sceneMap, x, y - 1)),
    down: isRoadDisplaySymbol(getMapSymbolAt(sceneMap, x, y + 1)),
    left: isRoadDisplaySymbol(getMapSymbolAt(sceneMap, x - 1, y)),
    right: isRoadDisplaySymbol(getMapSymbolAt(sceneMap, x + 1, y))
  };
}

function getRoadPattern(connections) {
  const { up, down, left, right } = connections;
  if ((left || right) && !(up || down)) {
    return ["   ", "---"];
  }

  if ((up || down) && !(left || right)) {
    return [" | ", " | "];
  }

  if (up && down && left && right) {
    return [" | ", "-+-"];
  }

  if (up && down && (left || right)) {
    return [" | ", "-+-"];
  }

  if (left && right && (up || down)) {
    return [" | ", "-+-"];
  }

  if (up && right) {
    return [" | ", " +-"];
  }

  if (up && left) {
    return [" | ", "-+ "];
  }

  if (down && right) {
    return [" +-", " | "];
  }

  if (down && left) {
    return ["-+ ", " | "];
  }

  if (left || right) {
    return ["   ", "---"];
  }

  return [" | ", " | "];
}

function getWaterPattern(sceneMap, x, y) {
  const up = getMapSymbolAt(sceneMap, x, y - 1) === "~";
  const down = getMapSymbolAt(sceneMap, x, y + 1) === "~";
  const left = getMapSymbolAt(sceneMap, x - 1, y) === "~";
  const right = getMapSymbolAt(sceneMap, x + 1, y) === "~";
  if (up && down && left && right) {
    return ["~~~", "~ ~"];
  }

  if (up && down && !(left || right)) {
    return ["~ ~", "~ ~"];
  }

  if (left && right) {
    return ["~~~", "~~~"];
  }

  if ((up || down) && right) {
    return [" ~~", "~ ~"];
  }

  if ((up || down) && left) {
    return ["~~ ", "~ ~"];
  }

  if (up || down) {
    return ["~ ~", "~ ~"];
  }

  if (left) {
    return ["~~ ", "~~ "];
  }

  if (right) {
    return [" ~~", " ~~"];
  }

  return ["~ ~", "~~~"];
}

function getBlockedPattern(tier) {
  if (tier === "city") {
    return ["###", "|#|"];
  }

  if (tier === "japan") {
    return ["^^^", "###"];
  }

  return ["/^^", "^^\\"];
}

function getDisplayCellPattern(sceneMap, template, symbol, x, y) {
  const tier = template.tier;
  if (symbol === " ") {
    return ["   ", "   "];
  }

  if (symbol === "@") {
    return ["[@]", "/|\\"];
  }

  if (symbol === "=") {
    return getRoadPattern(getRoadConnections(sceneMap, x, y));
  }

  if (symbol === "B") {
    const connections = getRoadConnections(sceneMap, x, y);
    const verticalBridge = (connections.up || connections.down) && !(connections.left || connections.right);
    return verticalBridge ? ["~|~", "~|~"] : ["~~~", "=+="];
  }

  if (symbol === "~") {
    return getWaterPattern(sceneMap, x, y);
  }

  if (symbol === "#") {
    return getBlockedPattern(tier);
  }

  if (symbol === "T") {
    return ["/^\\", " | "];
  }

  if (symbol === "H") {
    return [" _ ", "|_|"];
  }

  if (symbol === "S") {
    return ["/T\\", "[_]"];
  }

  if (symbol === "M") {
    return ["|=|", "|_|"];
  }

  if (symbol === "D") {
    return ["[=]", "|_|"];
  }

  if (symbol === "C") {
    return ["/#\\", "|_|"];
  }

  if (symbol === "G") {
    return ["| |", "=+="];
  }

  if (symbol === "P") {
    return ["|~|", "|_|"];
  }

  if (symbol === "F") {
    return ["/\\\\", "||>"];
  }

  if (symbol === "?") {
    return [" ? ", " . "];
  }

  if (symbol === "!") {
    return [" ! ", " | "];
  }

  if (symbol === "O") {
    return ["( )", "/_\\"];
  }

  if (symbol === ",") {
    return [" , ", ",, "];
  }

  if (tier === "village") {
    return [" , ", "   "];
  }

  if (tier === "city") {
    return [" . ", "   "];
  }

  return [" . ", " . "];
}

function isTraversableMapSymbol(symbol) {
  return mapTiles[symbol]?.traversable || false;
}

function getLocationAt(sceneMap, x, y) {
  const resolvedLocations = getResolvedSceneLocations(sceneMap);
  return (
    Object.values(resolvedLocations).find(location => location.x === x && location.y === y) || null
  );
}

function getInteractableLocation(sceneMap, progress) {
  const offsets = [
    [0, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];

  for (const [dx, dy] of offsets) {
    const location = getLocationAt(sceneMap, progress.x + dx, progress.y + dy);
    if (location) {
      return location;
    }
  }

  return null;
}

function isMapLocationUnlocked(progress, location) {
  if (!location.requiresVisited || !location.requiresVisited.length) {
    return true;
  }

  return location.requiresVisited.every(locationId => progress.visited.includes(locationId));
}

function getCurrentMapSpotLabel(sceneMap, progress) {
  const location = getLocationAt(sceneMap, progress.x, progress.y);
  if (location) {
    return localize(location.title);
  }

  const symbol = getMapSymbolAt(sceneMap, progress.x, progress.y);
  return localize(mapTiles[symbol]?.label) || "";
}

function getMapPrompt(sceneId, sceneMap, progress) {
  const locale = getLocale();
  const nearbyLocation = getInteractableLocation(sceneMap, progress);
  if (nearbyLocation) {
    const title = localize(nearbyLocation.title);
    if (!isMapLocationUnlocked(progress, nearbyLocation)) {
      return locale.mapLockedPrompt(title);
    }
    if (progress.visited.includes(nearbyLocation.id)) {
      return locale.mapVisitedPrompt(title);
    }
    return locale.mapInspectPrompt(title);
  }

  if (isSceneMapComplete(sceneId)) {
    return locale.mapReady;
  }

  return locale.mapNothingNearby;
}

function getLocationIntelData(sceneId, location) {
  const sceneIntel = investigationIntelByScene[sceneId] || {};
  const intel = sceneIntel[location.id] || {};
  const evidence = intel.evidence || {};
  return {
    status: intel.status || "Scout Note",
    finding: intel.finding || location.text,
    whyLabel:
      intel.whyLabel || defaultIntelWhyLabelsBySymbol[location.symbol] || {
        en: copy.en.intelWhyLabel,
        es: copy.es.intelWhyLabel
      },
    why: intel.why || {
      en: copy.en.intelGenericWhy,
      es: copy.es.intelGenericWhy
    },
    note: intel.note || defaultIntelNotesBySymbol[location.symbol] || defaultIntelNotesBySymbol["?"],
    summary: intel.summary || intel.finding || location.text,
    repeat: intel.repeat || null,
    support: intel.support || "",
    evidence,
    lens: sceneId === "heian" ? getHeianLensReadForEvidence(evidence) : null
  };
}

function buildMapIntel(sceneId, fields) {
  return {
    sceneId,
    mode: "custom",
    ...fields
  };
}

function getDefaultMapIntel(scene, sceneMap, progress) {
  const locale = getLocale();
  const requiredChecked = sceneMap.required.filter(locationId => progress.visited.includes(locationId)).length;
  const remaining = sceneMap.required.length - requiredChecked;
  return {
    title: sceneMap.title,
    status: locale.intelDefaultStatus,
    finding: progress.visited.length ? getDefaultMapMessage(scene.id) : locale.intelDefaultFinding,
    whyLabel: {
      en: copy.en.intelMissionLabel,
      es: copy.es.intelMissionLabel
    },
    why: scene.objective[state.language],
    note: remaining > 0 ? locale.investigationNeedMore(remaining) : locale.investigationReady,
    support: ""
  };
}

function getLockedMapIntel(scene, sceneMap, location) {
  const locale = getLocale();
  const neededLocations = (location.requiresVisited || [])
    .map(locationId => getResolvedSceneLocations(sceneMap)[locationId])
    .filter(Boolean);
  const neededTitlesEn = neededLocations.map(item => item.title.en || item.title.es || "");
  const neededTitlesEs = neededLocations.map(item => item.title.es || item.title.en || "");
  const whyText = neededTitlesEn.length
    ? {
        en: `Scout ${neededTitlesEn.join(" and ")} first to open this path.`,
        es: `Explora primero ${neededTitlesEs.join(" y ")} para abrir este paso.`
      }
    : {
        en: locale.intelGenericWhy,
        es: copy.es.intelGenericWhy
      };
  return buildMapIntel(scene.id, {
    title: location.title,
    status: {
      en: "Access Blocked",
      es: "Acceso bloqueado"
    },
    finding:
      location.lockedText || {
        en: copy.en.mapLockedPrompt(location.title.en),
        es: copy.es.mapLockedPrompt(location.title.es)
      },
    whyLabel: {
      en: copy.en.intelAccessLabel,
      es: copy.es.intelAccessLabel
    },
    why: whyText,
    note: {
      en: "Need earlier evidence",
      es: "Falta evidencia previa"
    },
    support: ""
  });
}

function getMapIntelPayload(scene, sceneMap, progress) {
  if (!state.mapIntel || state.mapIntel.sceneId !== scene.id) {
    return getDefaultMapIntel(scene, sceneMap, progress);
  }

  if (state.mapIntel.mode === "custom") {
    return state.mapIntel;
  }

  const location = getResolvedSceneLocations(sceneMap)[state.mapIntel.locationId];
  if (!location) {
    return getDefaultMapIntel(scene, sceneMap, progress);
  }

  const locale = getLocale();
  const intel = getLocationIntelData(scene.id, location);
  if (state.mapIntel.mode === "repeat") {
      return {
        title: location.title,
        status: {
        en: "Clue Confirmed",
        es: "Pista confirmada"
        },
        finding: intel.repeat || {
        en: `${locale.intelRepeatPrefix}: ${localizeForLanguage(intel.summary, "en")}`,
        es: `${copy.es.intelRepeatPrefix}: ${localizeForLanguage(intel.summary, "es")}`
      },
      whyLabel: intel.whyLabel,
      why: intel.why,
      note: intel.note,
      support: intel.support,
      lens: intel.lens
    };
  }

  return {
    title: location.title,
    status: intel.status,
    finding: intel.finding,
    whyLabel: intel.whyLabel,
    why: intel.why,
    note: intel.note,
    support: intel.support,
    lens: intel.lens
  };
}

function renderMapEventBox(scene, sceneMap, progress) {
  const locale = getLocale();
  const intel = getMapIntelPayload(scene, sceneMap, progress);
  const finding = localize(intel.finding);
  const whyLabel = intel.whyLabel ? localize(intel.whyLabel) : locale.intelWhyLabel;
  const why = localize(intel.why);
  const note = intel.note ? localize(intel.note) : "";
  const support = intel.support ? localize(intel.support) : "";
  const lens = intel.lens ? localize(intel.lens) : "";
  dom.mapEventBox.innerHTML = `
    <div class="intel-event">
      <div class="intel-event-head">
        <span class="intel-chip">${escapeHtml(localize(intel.status))}</span>
        <strong class="intel-event-title">${escapeHtml(localize(intel.title))}</strong>
      </div>
      <p><span class="intel-label">${locale.intelFindingLabel}:</span> ${renderRichText(finding)}</p>
      <p><span class="intel-label">${escapeHtml(whyLabel)}:</span> ${renderRichText(why)}</p>
      ${note ? `<p class="intel-note-line"><span class="intel-label">${locale.intelNoteLabel}:</span> ${renderRichText(note)}</p>` : ""}
      ${
        support
          ? `<p class="intel-support-line"><span class="intel-label">${locale.intelSupportLabel}:</span> ${renderRichText(
              support
            )}</p>`
          : ""
      }
      ${lens ? `<p class="intel-support-line"><span class="intel-label">${locale.strategyReadLabel}:</span> ${renderRichText(lens)}</p>` : ""}
    </div>
  `;
}

function getSceneEvidence(scene, sceneMap, progress) {
  const resolved = getResolvedSceneLocations(sceneMap);
  return progress.visited
    .map(locationId => {
      const location = resolved[locationId];
      if (!location) {
        return null;
      }
      return {
        location,
        intel: getLocationIntelData(scene.id, location),
        isRequired: sceneMap.required.includes(locationId)
      };
    })
    .filter(Boolean);
}

function createHeianEvidenceTotals() {
  return Object.keys(heianEvidenceLabels).reduce((totals, category) => {
    totals[category] = 0;
    return totals;
  }, {});
}

function getHeianLensWeights() {
  const weights = createHeianEvidenceTotals();
  const familyLens = heianLensProfiles.family[getFamily().id];
  const focusLens = heianLensProfiles.focus[getFocus().id];

  [familyLens, focusLens].forEach(lens => {
    if (!lens) {
      return;
    }
    Object.entries(lens.weights).forEach(([category, value]) => {
      weights[category] += value;
    });
  });

  return weights;
}

function getHeianEvidenceLabel(category, language = state.language) {
  return heianEvidenceLabels[category]?.[language] || category;
}

function getHeianLensReadForEvidence(evidence) {
  const lensWeights = getHeianLensWeights();
  const ranked = Object.entries(evidence || {})
    .filter(([, value]) => value > 0)
    .sort((left, right) => right[1] + lensWeights[right[0]] - (left[1] + lensWeights[left[0]]));

  if (!ranked.length) {
    return null;
  }

  return {
    en: `Your clan reads this first as a ${getHeianEvidenceLabel(ranked[0][0], "en")} problem.`,
    es: `Tu clan lo lee primero como un problema de ${getHeianEvidenceLabel(ranked[0][0], "es")}.`
  };
}

function getHeianEvidenceSnapshot(evidence) {
  const base = createHeianEvidenceTotals();
  const weighted = createHeianEvidenceTotals();
  const locationsByCategory = Object.keys(heianEvidenceLabels).reduce((map, category) => {
    map[category] = [];
    return map;
  }, {});
  const lensWeights = getHeianLensWeights();

  evidence.forEach(entry => {
    Object.entries(entry.intel.evidence || {}).forEach(([category, value]) => {
      if (!(category in base)) {
        return;
      }
      base[category] += value;
      if (!locationsByCategory[category].some(item => item.id === entry.location.id)) {
        locationsByCategory[category].push(entry.location);
      }
    });
  });

  Object.keys(base).forEach(category => {
    weighted[category] = base[category] > 0 ? base[category] + lensWeights[category] : 0;
  });

  const ordered = Object.keys(weighted)
    .filter(category => base[category] > 0)
    .sort((left, right) => weighted[right] - weighted[left] || base[right] - base[left]);

  return {
    base,
    weighted,
    ordered,
    locationsByCategory,
    familyRead: heianLensProfiles.family[getFamily().id]?.read || null,
    focusRead: heianLensProfiles.focus[getFocus().id]?.read || null
  };
}

function getHeianChoiceEvidenceText(snapshot, categories) {
  const seen = new Set();
  const titles = [];

  categories.forEach(category => {
    (snapshot.locationsByCategory[category] || []).forEach(location => {
      if (seen.has(location.id)) {
        return;
      }
      seen.add(location.id);
      titles.push(localize(location.title));
    });
  });

  return titles.slice(0, 3).join(", ");
}

function getHeianChoiceBrief(choice, snapshot) {
  const guidance = heianChoiceGuidance[choice.id];
  if (!guidance || !snapshot) {
    return null;
  }

  return {
    label: localize(guidance.label),
    best: localize(guidance.best),
    risk: localize(guidance.risk),
    evidence: getHeianChoiceEvidenceText(snapshot, guidance.strengths)
  };
}

function getMissionReadText() {
  const familyRead = missionLensProfiles.family[getFamily().id];
  const focusRead = missionLensProfiles.focus[getFocus().id];
  if (!familyRead || !focusRead) {
    return null;
  }
  return {
    en: `${familyRead.en} ${focusRead.en}`,
    es: `${familyRead.es} ${focusRead.es}`
  };
}

function renderGenericPressureHints(evidence) {
  const locale = getLocale();
  if (!evidence.length) {
    return `
      <div class="intel-strategy-box">
        <p class="mission-label">${locale.reviewHintsHeading}</p>
        <p class="intel-summary-meta">${locale.investigationLocked}</p>
      </div>
    `;
  }

  const hintEntries = evidence.slice(-3).reverse();
  return `
    <div class="intel-strategy-box">
      <p class="mission-label">${locale.reviewHintsHeading}</p>
      <p class="intel-summary-meta">${locale.reviewHintsLead}</p>
      <div class="intel-guide-list">
        ${hintEntries
          .map(entry => {
            const support = entry.intel.support ? localize(entry.intel.support) : localize(entry.intel.summary);
            const whyLabel = entry.intel.whyLabel ? localize(entry.intel.whyLabel) : locale.intelWhyLabel;
            const why = localize(entry.intel.why);
            return `
              <div class="intel-guide-item">
                <strong>${escapeHtml(localize(entry.location.title))}</strong>
                <p>${renderRichText(support)}</p>
                <p class="intel-summary-meta"><span class="intel-label">${escapeHtml(whyLabel)}:</span> ${renderRichText(why)}</p>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderHeianPressureHints(scene, heianSnapshot) {
  const locale = getLocale();
  const heianTopPressures = heianSnapshot ? heianSnapshot.ordered.slice(0, 3) : [];
  const heianRemainingRisk = heianSnapshot ? heianSnapshot.ordered.slice(0, 2) : [];

  if (!heianSnapshot) {
    return renderGenericPressureHints([]);
  }

  return `
    <div class="intel-strategy-box">
      <p class="mission-label">${locale.reviewHintsHeading}</p>
      <p class="intel-summary-meta">${locale.reviewHintsLead}</p>
      <p class="mission-label">${locale.strategyPressureLabel}</p>
      <div class="intel-pressure-row">
        ${heianTopPressures
          .map(category => `<span class="intel-pill">${escapeHtml(getHeianEvidenceLabel(category))}</span>`)
          .join("")}
      </div>
      <p class="intel-summary-meta"><span class="intel-label">${locale.strategyReadLabel}:</span> ${renderRichText(
        `${localize(heianSnapshot.familyRead)} ${localize(heianSnapshot.focusRead)}`
      )}</p>
      <p class="intel-summary-meta"><span class="intel-label">${locale.strategyRemainingLabel}:</span> ${escapeHtml(
        heianRemainingRisk.map(category => getHeianEvidenceLabel(category)).join(" / ")
      )}</p>
      <div class="intel-guide-list">
        <p class="mission-label">${locale.strategyGuideLabel}</p>
        ${scene.choices
          .map(choice => {
            const brief = getHeianChoiceBrief(choice, heianSnapshot);
            if (!brief) {
              return "";
            }
            return `
              <div class="intel-guide-item">
                <strong>${escapeHtml(brief.label)}</strong>
                <p>${escapeHtml(brief.best)}</p>
                <p class="intel-summary-meta"><span class="intel-label">${locale.strategyRiskLabel}:</span> ${escapeHtml(
                  brief.risk
                )}</p>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderInvestigationSummary(scene, options = {}) {
  const { visible = false, showPressureHints = false } = options;
  const sceneMap = getSceneMap(scene.id);
  if (!visible || state.view !== "play" || !state.introComplete || state.pendingOutcome || !sceneMap) {
    dom.investigationSummary.classList.add("hidden");
    dom.investigationSummary.innerHTML = "";
    return;
  }

  const locale = getLocale();
  const progress = ensureSceneMapProgress(scene);
  const requiredChecked = sceneMap.required.filter(locationId => progress.visited.includes(locationId)).length;
  const remaining = sceneMap.required.length - requiredChecked;
  const evidence = getSceneEvidence(scene, sceneMap, progress);
  const visibleEvidence = evidence.slice(scene.id === "heian" ? -4 : -3).reverse();
  const heianSnapshot = scene.id === "heian" && evidence.length ? getHeianEvidenceSnapshot(evidence) : null;
  const missionReadText = scene.id === "heian" ? null : getMissionReadText();
  const pressureHintsMarkup = showPressureHints
    ? scene.id === "heian"
      ? renderHeianPressureHints(scene, heianSnapshot)
      : renderGenericPressureHints(evidence)
    : "";

  dom.investigationSummary.classList.remove("hidden");
  dom.investigationSummary.innerHTML = `
    <div class="intel-summary-head">
      <div>
        <h3 class="selector-heading">${locale.investigationHeading}</h3>
        <p class="intel-summary-meta">${locale.investigationLead(requiredChecked, sceneMap.required.length)}</p>
      </div>
      <p class="intel-summary-status">${remaining > 0 ? locale.investigationNeedMore(remaining) : locale.investigationReady}</p>
    </div>
    <div class="intel-summary-body">
      ${
        missionReadText
          ? `<p class="intel-summary-meta"><span class="intel-label">${locale.strategyReadLabel}:</span> ${renderRichText(
              localize(missionReadText)
            )}</p>`
          : ""
      }
      <p class="mission-label">${locale.investigationWhatLearned}</p>
      ${
        evidence.length
          ? `<div class="intel-list">
              ${visibleEvidence
                .map(entry => {
                  const summary = localize(entry.intel.summary);
                  const support = entry.intel.support ? localize(entry.intel.support) : "";
                  const note = entry.intel.note ? localize(entry.intel.note) : "";
                  return `
                    <div class="intel-item${entry.isRequired ? " is-required" : ""}">
                      <div class="intel-item-top">
                        <strong>${escapeHtml(localize(entry.location.title))}</strong>
                        ${note ? `<span class="intel-pill">${escapeHtml(note)}</span>` : ""}
                      </div>
                      <p>${renderRichText(summary)}</p>
                      ${
                        support
                          ? `<p class="intel-support-line"><span class="intel-label">${locale.intelSupportLabel}:</span> ${renderRichText(
                              support
                            )}</p>`
                          : ""
                      }
                    </div>
                  `;
                })
                .join("")}
            </div>`
          : `<p class="mission-copy">${locale.investigationLocked}</p>`
      }
      ${pressureHintsMarkup}
      ${
        evidence.length > visibleEvidence.length
          ? `<p class="intel-summary-meta">${locale.investigationMoreNotes(
              evidence.length - visibleEvidence.length
            )}</p>`
          : ""
      }
    </div>
  `;
}

function renderMapDock(scene, playPhase = state.playPhase) {
  const sceneMap = getSceneMap(scene.id);
  if (!sceneMap || state.view !== "play" || !state.introComplete || state.pendingOutcome || playPhase !== "mission") {
    dom.mapDock.classList.add("hidden");
    return;
  }

  const locale = getLocale();
  const progress = ensureSceneMapProgress(scene);
  const template = mapTemplates[sceneMap.templateId];
  const checked = sceneMap.required.filter(locationId => progress.visited.includes(locationId)).length;
  const ready = isSceneMapComplete(scene.id);
  dom.mapDockLead.textContent = ready ? locale.mapDockReadyLead : locale.mapDockLead;
  dom.mapDockStatus.textContent = `${locale.mapTierNames[template.tier]} • ${locale.mapDockProgress(
    checked,
    sceneMap.required.length
  )}`;
}

function renderMapPanel(scene) {
  const sceneMap = getSceneMap(scene.id);
  const readyToShow =
    state.view === "play" &&
    state.introComplete &&
    !state.pendingOutcome &&
    !!sceneMap &&
    state.mapOverlayOpen;

  if (!readyToShow) {
    dom.mapOverlay.classList.add("hidden");
    dom.mapHelpPanel.classList.add("hidden");
    dom.mapInspectPopup.classList.add("hidden");
    dom.stage.classList.remove("is-map-open");
    return;
  }

  const locale = getLocale();
  const progress = ensureSceneMapProgress(scene);
  const template = mapTemplates[sceneMap.templateId];
  const resolvedLocations = getResolvedSceneLocations(sceneMap);

  dom.mapOverlay.classList.remove("hidden");
  dom.stage.classList.add("is-map-open");
  dom.mapTitle.textContent = localize(sceneMap.title);
  dom.mapTierChip.textContent = locale.mapTierNames[template.tier];
  dom.mapCoords.textContent = locale.mapCoords(progress.x, progress.y);
  dom.mapLocationName.textContent = getCurrentMapSpotLabel(sceneMap, progress);
  dom.mapLocationName.className = "mission-copy map-location-name";
  dom.mapPrompt.textContent = getMapPrompt(scene.id, sceneMap, progress);
  const inspectLocationId =
    state.mapInspectNotice && state.mapInspectNotice.sceneId === scene.id
      ? state.mapInspectNotice.locationId || ""
      : "";
  dom.mapCanvas.innerHTML = renderAsciiMap(
    sceneMap,
    template,
    progress,
    resolvedLocations,
    inspectLocationId
  );
  dom.mapCanvas.setAttribute("aria-label", `${localize(sceneMap.title)} ${locale.mapLabel}`);
  renderMapEventBox(scene, sceneMap, progress);
  renderMapObjectives(scene, sceneMap, progress);
  renderMapLegend(sceneMap, template);
  renderMapFactions(sceneMap);
  renderMapHelpPanel();
  renderMapInspectPopup(scene, sceneMap, progress);
}

function renderMapHelpPanel() {
  dom.mapHelpBtn.classList.toggle("is-selected", state.mapHelpOpen);
  dom.mapHelpPanel.classList.toggle("hidden", !state.mapHelpOpen);
}

function renderMapInspectPopup(scene, sceneMap, progress) {
  const notice = state.mapInspectNotice;
  if (!notice || notice.sceneId !== scene.id) {
    state.mapInspectAnchor = null;
    dom.mapPanel.classList.remove("is-inspecting");
    dom.mapInspectPopup.classList.remove("is-opening");
    dom.mapInspectPopup.style.removeProperty("--inspect-origin-x");
    dom.mapInspectPopup.style.removeProperty("--inspect-origin-y");
    dom.mapInspectPopup.style.removeProperty("--inspect-shift-x");
    dom.mapInspectPopup.style.removeProperty("--inspect-shift-y");
    dom.mapInspectPopup.classList.add("hidden");
    dom.mapInspectBody.innerHTML = "";
    return;
  }

  const intel =
    notice.mode === "custom" ? notice.payload : getMapIntelPayload(scene, sceneMap, progress);
  const locale = getLocale();
  const finding = localize(intel.finding);
  const whyLabel = intel.whyLabel ? localize(intel.whyLabel) : locale.intelWhyLabel;
  const why = localize(intel.why);
  const note = intel.note ? localize(intel.note) : "";
  const support = intel.support ? localize(intel.support) : "";
  const lens = intel.lens ? localize(intel.lens) : "";
  const anchor = getMapInspectAnchor(notice);

  state.mapInspectAnchor = anchor;
  dom.mapPanel.classList.add("is-inspecting");
  if (anchor) {
    dom.mapInspectPopup.style.setProperty("--inspect-origin-x", `${anchor.originX}%`);
    dom.mapInspectPopup.style.setProperty("--inspect-origin-y", `${anchor.originY}%`);
    dom.mapInspectPopup.style.setProperty("--inspect-shift-x", `${anchor.shiftX}px`);
    dom.mapInspectPopup.style.setProperty("--inspect-shift-y", `${anchor.shiftY}px`);
  } else {
    dom.mapInspectPopup.style.setProperty("--inspect-origin-x", "50%");
    dom.mapInspectPopup.style.setProperty("--inspect-origin-y", "50%");
    dom.mapInspectPopup.style.setProperty("--inspect-shift-x", "0px");
    dom.mapInspectPopup.style.setProperty("--inspect-shift-y", "0px");
  }

  dom.mapInspectPopup.classList.remove("hidden");
  dom.mapInspectPopup.classList.remove("is-opening");
  dom.mapInspectBody.innerHTML = `
    <div class="intel-event intel-event--inspect">
      <div class="intel-event-head">
        <span class="intel-chip">${escapeHtml(localize(intel.status))}</span>
        <strong class="intel-event-title">${escapeHtml(localize(intel.title))}</strong>
      </div>
      <div class="intel-event-grid">
        <section class="intel-event-block">
          <p class="intel-label">${locale.intelFindingLabel}</p>
          <p class="intel-event-copy">${renderRichText(finding)}</p>
        </section>
        <section class="intel-event-block">
          <p class="intel-label">${escapeHtml(whyLabel)}</p>
          <p class="intel-event-copy">${renderRichText(why)}</p>
        </section>
        ${
          note
            ? `<section class="intel-event-block">
                <p class="intel-label">${locale.intelNoteLabel}</p>
                <p class="intel-note-line">${renderRichText(note)}</p>
              </section>`
            : ""
        }
      ${
        support
          ? `<section class="intel-event-block">
              <p class="intel-label">${locale.intelSupportLabel}</p>
              <p class="intel-support-line">${renderRichText(support)}</p>
            </section>`
          : ""
      }
      ${
        lens
          ? `<section class="intel-event-block">
              <p class="intel-label">${locale.strategyReadLabel}</p>
              <p class="intel-support-line">${renderRichText(lens)}</p>
            </section>`
          : ""
      }
      </div>
    </div>
  `;
  void dom.mapInspectPopup.offsetWidth;
  dom.mapInspectPopup.classList.add("is-opening");
}

function renderAsciiMap(sceneMap, template, progress, resolvedLocations, inspectLocationId = "") {
  const { width, height } = getTemplateDimensions(template);
  const locationMarkers = sceneMap.locationsByMarker || {};
  const locationByCoord = new Map(
    Object.values(resolvedLocations).map(location => [`${location.x},${location.y}`, location])
  );
  const rows = [];

  for (let y = 0; y < height; y += 1) {
    const topCells = [];
    const bottomCells = [];
    for (let x = 0; x < width; x += 1) {
      let symbol;
      if (progress.x === x && progress.y === y) {
        symbol = "@";
      } else {
        const baseChar = getBaseTemplateChar(template, x, y);
        if (isMapMarker(baseChar)) {
          symbol = locationMarkers[baseChar]?.symbol || ".";
        } else {
          symbol = baseChar;
        }
      }

      const toneClass = getMapToneClass(symbol);
      const location = locationByCoord.get(`${x},${y}`) || null;
      const isRequired = location && sceneMap.required.includes(location.id);
      const isDone = location && progress.visited.includes(location.id);
      const pattern = getDisplayCellPattern(sceneMap, template, symbol, x, y);
      const classes = [`map-cell`, `map-cell--${toneClass}`];

      if (location) {
        classes.push("map-cell--interest");
      }
      if (location && inspectLocationId && location.id === inspectLocationId) {
        classes.push("map-cell--inspect-source");
      }
      if (isRequired && !isDone) {
        classes.push("map-cell--mission");
      }
      if (isDone) {
        classes.push("map-cell--done");
      }
      if (symbol === "@") {
        classes.push("map-cell--player");
      }

      const className = classes.join(" ");
      const dataAttrs = location
        ? ` data-location-id="${escapeHtml(location.id)}" data-map-x="${x}" data-map-y="${y}"`
        : ` data-map-x="${x}" data-map-y="${y}"`;
      topCells.push(`<span class="${className}"${dataAttrs}>${escapeHtml(pattern[0])}</span>`);
      bottomCells.push(`<span class="${className}"${dataAttrs}>${escapeHtml(pattern[1])}</span>`);
    }
    rows.push(`<div class="map-row map-row--top">${topCells.join("")}</div>`);
    rows.push(`<div class="map-row map-row--bottom">${bottomCells.join("")}</div>`);
  }

  return rows.join("");
}

function renderMapObjectives(scene, sceneMap, progress) {
  const locale = getLocale();
  dom.mapObjectives.innerHTML = sceneMap.required
    .map(locationId => {
      const location = getResolvedSceneLocations(sceneMap)[locationId];
      const isDone = progress.visited.includes(locationId);
      return `
        <div class="map-objective${isDone ? " is-done" : ""}">
          <span class="objective-status">${isDone ? locale.mapStatusDone : locale.mapStatusNew}</span>
          <div class="objective-copy">
            <strong>${escapeHtml(localize(location.title))}</strong>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderMapLegend(sceneMap, template) {
  const mapString = template.rows.join("");
  const legendKeys = ["player", "goal", "done"];

  if (/[=B]/.test(mapString)) {
    legendKeys.push("road");
  }
  if (mapString.includes("B")) {
    legendKeys.push("bridge");
  }
  if (mapString.includes("~")) {
    legendKeys.push("water");
  }
  if (mapString.includes(",")) {
    legendKeys.push("fields");
  }
  if (mapString.includes("#")) {
    legendKeys.push("blocked");
  }

  dom.mapLegend.innerHTML = legendKeys
    .map(key => {
      const entry = simpleLegendEntries[key];
      if (!entry) {
        return "";
      }

      const label = key === "blocked" ? blockedLegendLabels[template.tier] || entry.label : entry.label;
      return `
        <div class="map-legend-item">
          <span class="legend-symbol">${escapeHtml(entry.sample)}</span>
          <span class="map-legend-label">${escapeHtml(localize(label))}</span>
        </div>
      `;
    })
    .join("");
}

function renderMapFactions(sceneMap) {
  dom.mapFactions.innerHTML = sceneMap.factions
    .map(faction => {
      return `
        <div class="map-faction-chip map-faction-chip--${escapeHtml(faction.tone)}">
          <span class="faction-badge">${escapeHtml(localize(faction.badge))}</span>
          <span class="map-faction-text">${escapeHtml(localize(faction.text))}</span>
        </div>
      `;
    })
    .join("");
}

function canUseSceneMapControls() {
  const scene = getCurrentScene();
  return (
    state.view === "play" &&
    !state.isTyping &&
    !state.pendingOutcome &&
    state.introComplete &&
    state.mapOverlayOpen &&
    !state.mapHelpOpen &&
    !state.mapInspectNotice &&
    !!scene &&
    !!getSceneMap(scene.id)
  );
}

function toggleMapHelp() {
  if (!state.mapOverlayOpen) {
    return;
  }

  state.mapHelpOpen = !state.mapHelpOpen;
  if (state.mapHelpOpen) {
    state.mapInspectNotice = null;
  }
  refreshPlayScene(false, true);
}

function closeMapHelp(resetNav = false) {
  if (!state.mapHelpOpen) {
    return;
  }

  state.mapHelpOpen = false;
  refreshPlayScene(false, resetNav);
}

function closeMapInspectPopup(resetNav = false) {
  if (!state.mapInspectNotice) {
    return;
  }

  state.mapInspectNotice = null;
  state.mapInspectAnchor = null;
  refreshPlayScene(false, resetNav);
}

function openMapOverlay() {
  const scene = getCurrentScene();
  if (
    state.view !== "play" ||
    state.isTyping ||
    state.pendingOutcome ||
    !state.introComplete ||
    !scene ||
    !getSceneMap(scene.id)
  ) {
    return;
  }

  closeTermPopover();
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  state.mapOverlayOpen = true;
  dom.stage.scrollTop = 0;
  refreshPlayScene(false, true);
}

function closeMapOverlay(resetNav = false) {
  if (!state.mapOverlayOpen && dom.mapOverlay.classList.contains("hidden")) {
    return;
  }

  const scene = getCurrentScene();
  closeTermPopover();
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  state.mapOverlayOpen = false;
  if (state.view === "play") {
    if (scene && getSceneMap(scene.id) && isSceneMapComplete(scene.id)) {
      state.playPhase = "report";
    } else {
      state.playPhase = "mission";
    }
    refreshPlayScene(false, resetNav);
  } else {
    dom.mapOverlay.classList.add("hidden");
    dom.stage.classList.remove("is-map-open");
  }
}

function refreshPlayScene(updateHud = false, resetNav = false) {
  if (updateHud) {
    renderHud();
  }
  renderPlayView();
  syncNavigation(resetNav);
}

function moveOnMap(dx, dy) {
  if (!canUseSceneMapControls()) {
    return;
  }

  const scene = getCurrentScene();
  const sceneMap = getSceneMap(scene.id);
  const progress = ensureSceneMapProgress(scene);
  const nextX = progress.x + dx;
  const nextY = progress.y + dy;
  const nextSymbol = getMapSymbolAt(sceneMap, nextX, nextY);

  if (!isTraversableMapSymbol(nextSymbol)) {
    state.mapInspectNotice = null;
    state.mapMessage = {
      en: copy.en.mapBlocked,
      es: copy.es.mapBlocked
    };
    state.mapIntel = buildMapIntel(scene.id, {
      title: {
        en: "Blocked Route",
        es: "Ruta bloqueada"
      },
      status: {
        en: "Path Closed",
        es: "Paso cerrado"
      },
      finding: {
        en: copy.en.mapBlocked,
        es: copy.es.mapBlocked
      },
      whyLabel: {
        en: copy.en.intelBlockedLabel,
        es: copy.es.intelBlockedLabel
      },
      why: {
        en: "This path will not help your scouts learn anything new.",
        es: "Este camino no ayudara a tus exploradores a aprender nada nuevo."
      },
      note: {
        en: "Try another road",
        es: "Prueba otro camino"
      },
      support: ""
    });
    refreshPlayScene(false, false);
    return;
  }

  progress.x = nextX;
  progress.y = nextY;
  state.mapInspectNotice = null;
  if (!state.mapMessage || isSceneMapComplete(scene.id)) {
    state.mapMessage = getDefaultMapMessage(scene.id);
  }
  refreshPlayScene(false, false);
}

function interactWithMapLocation() {
  if (!canUseSceneMapControls()) {
    return;
  }

  const scene = getCurrentScene();
  const sceneMap = getSceneMap(scene.id);
  const progress = ensureSceneMapProgress(scene);
  const location = getInteractableLocation(sceneMap, progress);

  if (!location) {
    state.mapInspectNotice = null;
    state.mapMessage = {
      en: copy.en.mapNothingNearby,
      es: copy.es.mapNothingNearby
    };
    state.mapIntel = buildMapIntel(scene.id, {
      title: {
        en: "No Marked Site",
        es: "No hay sitio marcado"
      },
      status: {
        en: "No Intel",
        es: "Sin pista"
      },
      finding: {
        en: copy.en.mapNothingNearby,
        es: copy.es.mapNothingNearby
      },
      whyLabel: {
        en: copy.en.intelNextStepLabel,
        es: copy.es.intelNextStepLabel
      },
      why: {
        en: "Move toward a marked building, gate, road post, or clue point.",
        es: "Muevete hacia un edificio, puerta, puesto o pista marcada."
      },
      note: {
        en: "Search another spot",
        es: "Busca otro lugar"
      },
      support: ""
    });
    refreshPlayScene(false, false);
    return;
  }

  if (!isMapLocationUnlocked(progress, location)) {
    state.mapInspectNotice = null;
    state.mapMessage = {
      en: copy.en.mapLockedPrompt(location.title.en),
      es: copy.es.mapLockedPrompt(location.title.es)
    };
    state.mapIntel = getLockedMapIntel(scene, sceneMap, location);
    refreshPlayScene(false, false);
    return;
  }

  if (progress.visited.includes(location.id)) {
    const intel = getLocationIntelData(scene.id, location);
    state.mapMessage = intel.summary;
    state.mapIntel = {
      sceneId: scene.id,
      mode: "repeat",
      locationId: location.id
    };
    state.mapInspectNotice = {
      sceneId: scene.id,
      mode: "repeat",
      locationId: location.id
    };
    refreshPlayScene(false, false);
    return;
  }

  progress.visited.push(location.id);
  const intel = getLocationIntelData(scene.id, location);
  state.mapMessage = intel.summary;
  state.mapIntel = {
    sceneId: scene.id,
    mode: "first",
    locationId: location.id
  };
  state.mapInspectNotice = {
    sceneId: scene.id,
    mode: "first",
    locationId: location.id
  };
  if (isSceneMapComplete(scene.id) && !progress.completeLogged) {
    progress.completeLogged = true;
    addLog(
      {
        en: "Scout Report",
        es: "Informe de exploracion"
      },
      sceneMap.completeLog
    );
    state.mapMessage = {
      en: copy.en.mapReady,
      es: copy.es.mapReady
    };
    refreshPlayScene(true, true);
    return;
  }

  refreshPlayScene(false, false);
}

function getMapInspectAnchor(notice) {
  if (!notice?.locationId || !dom.mapCanvas || !dom.mapPanel) {
    return null;
  }

  const locationCells = Array.from(dom.mapCanvas.querySelectorAll("[data-location-id]")).filter(
    cell => cell.dataset.locationId === notice.locationId
  );
  if (!locationCells.length) {
    return null;
  }

  const panelRect = dom.mapPanel.getBoundingClientRect();
  if (!panelRect.width || !panelRect.height) {
    return null;
  }

  const cellRects = locationCells.map(cell => cell.getBoundingClientRect());
  const left = Math.min(...cellRects.map(rect => rect.left));
  const right = Math.max(...cellRects.map(rect => rect.right));
  const top = Math.min(...cellRects.map(rect => rect.top));
  const bottom = Math.max(...cellRects.map(rect => rect.bottom));
  const centerX = left + (right - left) / 2 - panelRect.left;
  const centerY = top + (bottom - top) / 2 - panelRect.top;
  const originX = clamp((centerX / panelRect.width) * 100, 10, 90);
  const originY = clamp((centerY / panelRect.height) * 100, 12, 88);
  const shiftX = Math.round(centerX - panelRect.width / 2);
  const shiftY = Math.round(centerY - panelRect.height / 2);

  return {
    originX,
    originY,
    shiftX,
    shiftY
  };
}

function chooseOption(choice, scene) {
  if (state.choiceLocked) {
    return;
  }

  clearTypewriter();
  applyEffects(choice.effects);
  addBadge(choice.badge);
  const eraScore = calculateEraScore(scene, choice);
  state.legacyScore += eraScore;
  state.eraScore = eraScore;
  state.eraResults.push({
    sceneId: scene.id,
    score: eraScore
  });
  addLog(
    {
      en: scene.title.en,
      es: scene.title.es
    },
    choice.log
  );
  state.choiceLocked = true;
  state.pendingOutcome = {
    result: choice.result,
    effects: choice.effects,
    eraScore
  };
  state.playPhase = "choices";
  state.mapOverlayOpen = false;
  state.mapIntel = null;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  renderApp(true);
}

function advanceScene() {
  state.sceneIndex += 1;
  state.choiceLocked = false;
  resetPlayPhase();
  state.pendingOutcome = null;
  state.mapMessage = null;
  state.mapOverlayOpen = false;
  state.mapIntel = null;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  resetSceneIntro();
  closeTermPopover();
  if (state.sceneIndex >= scenes.length) {
    state.view = "end";
  }
  renderApp(true);
}

function startChronicle() {
  state.playerName = sanitizePlayerBaseName(state.playerNameDraft) || getLocale().defaultName;
  state.stats = getPreviewStats();
  state.setupStep = 0;
  state.sceneIndex = 0;
  state.choiceLocked = false;
  resetPlayPhase();
  state.legacyScore = 0;
  state.eraScore = 0;
  state.badges = [];
  state.log = [];
  state.eraResults = [];
  state.pendingOutcome = null;
  state.mapProgress = {};
  state.mapMessage = null;
  state.mapOverlayOpen = false;
  state.mapIntel = null;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  resetSceneIntro();
  addBadge(getFamily().badge);
  addBadge(getFocus().badge);
  addLog(
    {
      en: "Start",
      es: "Inicio"
    },
    {
      en: copy.en.startLogOrigin(getDisplayHouseName("en"), getFamily().name.en.toLowerCase()),
      es: copy.es.startLogOrigin(getDisplayHouseName("es"), getFamily().name.es.toLowerCase())
    }
  );
  addLog(
    {
      en: "Start",
      es: "Inicio"
    },
    {
      en: copy.en.startLogFocus(getFocus().name.en.toLowerCase()),
      es: copy.es.startLogFocus(getFocus().name.es.toLowerCase())
    }
  );
  state.view = "play";
  closeTermPopover();
  renderApp(true);
}

function restartChronicle() {
  state.playerName = "";
  state.setupStep = 0;
  state.sceneIndex = 0;
  state.choiceLocked = false;
  resetPlayPhase();
  state.stats = getPreviewStats();
  state.legacyScore = 0;
  state.eraScore = 0;
  state.badges = [];
  state.log = [];
  state.eraResults = [];
  state.pendingOutcome = null;
  state.mapProgress = {};
  state.mapMessage = null;
  state.mapOverlayOpen = false;
  state.mapIntel = null;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  resetSceneIntro();
  state.view = "title";
  closeTermPopover();
  renderApp(true);
}

function openSetup() {
  clearTypewriter();
  resetPlayPhase();
  state.mapOverlayOpen = false;
  state.mapIntel = null;
  state.mapHelpOpen = false;
  state.mapInspectNotice = null;
  state.view = "setup";
  state.setupStep = 0;
  state.justOpenedSetup = true;
  renderApp(true);
}

function createRandomClanName() {
  const randomName = historicalClanNamePool[Math.floor(Math.random() * historicalClanNamePool.length)];
  state.playerNameDraft = randomName;
  if (state.view === "setup") {
    renderHud();
    renderSetupView();
    syncNavigation(false);
    dom.leaderName.focus();
    dom.leaderName.select();
  }
}

function handleSetupBack() {
  if (state.setupStep === 0) {
    state.view = "title";
    renderApp(true);
    return;
  }

  state.setupStep -= 1;
  renderApp(true);
}

function handleSetupAdvance() {
  if (state.setupStep < 3) {
    state.setupStep += 1;
    renderApp(true);
    return;
  }

  startChronicle();
}

function toggleGlossary() {
  state.glossaryEnabled = !state.glossaryEnabled;
  closeTermPopover();
  renderApp(true);
}

function handleDocumentClick(event) {
  const termButton = event.target.closest(".term-btn");
  if (termButton) {
    event.preventDefault();
    toggleTermPopover(termButton);
    return;
  }

  if (!event.target.closest("#termPopover")) {
    closeTermPopover();
  }
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    if (!dom.termPopover.classList.contains("hidden")) {
      closeTermPopover();
      return;
    }

    if (state.mapInspectNotice) {
      closeMapInspectPopup(true);
      return;
    }

    if (state.mapHelpOpen) {
      closeMapHelp(true);
      return;
    }

    if (state.mapOverlayOpen) {
      closeMapOverlay(true);
      return;
    }

    return;
  }

  if (state.isTyping && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    skipTypewriter();
    return;
  }

  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT") {
    return;
  }

  const lowerKey = event.key.toLowerCase();
  if (state.mapInspectNotice && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    closeMapInspectPopup(true);
    return;
  }

  const scene = getCurrentScene();
  if (
    state.view === "play" &&
    !state.isTyping &&
    !state.pendingOutcome &&
    scene &&
    getSceneMap(scene.id) &&
    lowerKey === "m"
  ) {
    event.preventDefault();
    if (state.mapOverlayOpen) {
      closeMapOverlay(true);
    } else if (state.introComplete) {
      openMapOverlay();
    }
    return;
  }

  const buttonOutsideMap =
    activeElement &&
    activeElement.tagName === "BUTTON" &&
    !activeElement.closest("#mapPanel");

  if (canUseSceneMapControls() && !buttonOutsideMap) {
    if (lowerKey === "arrowup" || lowerKey === "w") {
      event.preventDefault();
      moveOnMap(0, -1);
      return;
    }

    if (lowerKey === "arrowdown" || lowerKey === "s") {
      event.preventDefault();
      moveOnMap(0, 1);
      return;
    }

    if (lowerKey === "arrowleft" || lowerKey === "a") {
      event.preventDefault();
      moveOnMap(-1, 0);
      return;
    }

    if (lowerKey === "arrowright" || lowerKey === "d") {
      event.preventDefault();
      moveOnMap(1, 0);
      return;
    }

    if (lowerKey === "e" || event.key === "Enter") {
      event.preventDefault();
      interactWithMapLocation();
      return;
    }
  }

  const navButtons = getNavButtons();
  if (!navButtons.length) {
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    state.navIndex = (state.navIndex + 1) % navButtons.length;
    applyNavState(navButtons);
    return;
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    state.navIndex = (state.navIndex - 1 + navButtons.length) % navButtons.length;
    applyNavState(navButtons);
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    const current = navButtons[state.navIndex];
    if (current) {
      event.preventDefault();
      current.click();
    }
  }
}

function syncNavigation(resetNav) {
  const navButtons = getNavButtons();
  if (!navButtons.length) {
    return;
  }

  if (resetNav || state.navIndex >= navButtons.length) {
    state.navIndex = 0;
  }

  navButtons.forEach((button, index) => {
    button.onmouseenter = () => {
      state.navIndex = index;
      applyNavState(navButtons);
    };
  });

  applyNavState(navButtons);
}

function getNavButtons() {
  if (state.mapOverlayOpen && isVisible(dom.mapOverlay)) {
    if (state.mapInspectNotice && isVisible(dom.mapInspectPopup)) {
      return Array.from(dom.mapInspectPopup.querySelectorAll("[data-nav='true']")).filter(isVisible);
    }
    if (state.mapHelpOpen && isVisible(dom.mapHelpPanel)) {
      return Array.from(dom.mapHelpPanel.querySelectorAll("[data-nav='true']")).filter(isVisible);
    }
    return Array.from(dom.mapOverlay.querySelectorAll("[data-nav='true']")).filter(isVisible);
  }

  const currentView = document.querySelector(".view:not(.hidden)");
  const viewButtons = currentView ? Array.from(currentView.querySelectorAll("[data-nav='true']")) : [];
  const topbarButtons = Array.from(dom.topbar.querySelectorAll("[data-nav='true']"));
  const hudButtons = Array.from(dom.hud.querySelectorAll("[data-nav='true']"));
  return [...viewButtons, ...topbarButtons, ...hudButtons].filter(isVisible);
}

function applyNavState(buttons) {
  buttons.forEach((button, index) => {
    button.classList.toggle("is-active", index === state.navIndex);
  });
}

function renderRichText(text) {
  return text.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (match, key, label) => {
    const entry = glossary[key];
    if (!entry) {
      return escapeHtml(label);
    }

    if (!state.glossaryEnabled) {
      return `<span class="term-plain">${escapeHtml(label)}</span>`;
    }

    const tierClass = entry.tier === 3 ? "term-btn--tier3" : "term-btn--tier2";
    return `<button type="button" class="term-btn ${tierClass}" data-term="${escapeHtml(key)}">${escapeHtml(label)}</button>`;
  });
}

function toggleTermPopover(button) {
  if (!state.glossaryEnabled) {
    return;
  }

  const key = button.dataset.term;
  const entry = glossary[key];
  if (!entry) {
    return;
  }

  if (!dom.termPopover.classList.contains("hidden") && state.openTermKey === key) {
    closeTermPopover();
    return;
  }

  state.openTermKey = key;
  const locale = getLocale();
  const tierLabel = entry.tier === 3 ? locale.termTier3 : locale.termTier2;
  dom.termPopover.innerHTML = `
    <span class="tier-tag">${escapeHtml(tierLabel)}</span>
    <h4>${escapeHtml(button.textContent.trim())}</h4>
    <p>${escapeHtml(entry.definition[state.language])}</p>
  `;
  dom.termPopover.classList.remove("hidden");
  positionPopover(button);
}

function positionPopover(button) {
  const rect = button.getBoundingClientRect();
  const popRect = dom.termPopover.getBoundingClientRect();
  const margin = 12;
  let left = rect.left + rect.width / 2 - popRect.width / 2;
  let top = rect.bottom + 10;

  if (left < margin) {
    left = margin;
  }
  if (left + popRect.width > window.innerWidth - margin) {
    left = window.innerWidth - popRect.width - margin;
  }
  if (top + popRect.height > window.innerHeight - margin) {
    top = rect.top - popRect.height - 10;
  }
  if (top < margin) {
    top = margin;
  }

  dom.termPopover.style.left = `${left}px`;
  dom.termPopover.style.top = `${top}px`;
}

function closeTermPopover() {
  state.openTermKey = null;
  dom.termPopover.classList.add("hidden");
}

function renderLanguageName(languageKey) {
  return getLocale().languageNames[languageKey];
}

function getLocale() {
  return copy[state.language];
}

function getFamily() {
  return families.find(family => family.id === state.familyId) || families[0];
}

function getFocus() {
  return focuses.find(focus => focus.id === state.focusId) || focuses[0];
}

function getPreviewStats() {
  const preview = { ...baseStats };
  applyEffectsToTarget(preview, getFamily().effects);
  applyEffectsToTarget(preview, getFocus().effects);
  return preview;
}

function getDisplayStats() {
  if (state.view === "play" || state.view === "end") {
    return state.stats;
  }
  return getPreviewStats();
}

function normalizePlayerNameInput(value) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  const prefixedName = normalized.match(/^(?:clan|house)\s+(.+)$/i);
  if (prefixedName) {
    return prefixedName[1].trim();
  }
  return normalized;
}

function sanitizePlayerBaseName(value) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  if (!normalized || /^(?:clan|house)$/i.test(normalized)) {
    return "";
  }
  return normalized.replace(/^(?:clan|house)\s+/i, "").trim();
}

function getPlayerName() {
  return sanitizePlayerBaseName(state.playerName || state.playerNameDraft) || getLocale().defaultName;
}

function getDisplayHouseName(language = state.language) {
  const locale = copy[language] || getLocale();
  return `${locale.houseNameLabel} ${getPlayerName()}`;
}

function applyEffects(effects) {
  applyEffectsToTarget(state.stats, effects);
}

function applyEffectsToTarget(target, effects) {
  statOrder.forEach(key => {
    target[key] = clamp((target[key] || 0) + (effects[key] || 0), 0, 100);
  });
}

function calculateEraScore(scene, choice) {
  const weightedValue = Object.entries(scene.weights).reduce((total, [key, weight]) => {
    return total + state.stats[key] * weight;
  }, 0);
  return Math.max(6, Math.round(weightedValue / 5 + choice.scoreBonus));
}

function addBadge(badge) {
  if (state.badges.some(existing => existing.id === badge.id)) {
    return;
  }
  state.badges.push(badge);
}

function addLog(heading, text) {
  state.log.unshift({
    heading,
    text
  });

  if (state.log.length > 12) {
    state.log.length = 12;
  }
}

function formatEffects(effects) {
  const labels = getLocale().statLabels;
  return statOrder
    .filter(key => effects[key])
    .map(key => `${labels[key]} ${effects[key] > 0 ? "+" : ""}${effects[key]}`)
    .join(" / ");
}

function getRank(stats) {
  const locale = getLocale();
  if (stats.standing >= 70 && stats.koku >= 68) {
    return locale.rankDaimyo;
  }
  if (stats.learning >= 72 && stats.people >= 68) {
    return locale.rankScholar;
  }
  if (stats.standing >= 70 && stats.giri >= 68) {
    return locale.rankBroker;
  }
  if (stats.koku >= 68 && stats.people >= 64) {
    return locale.rankSteward;
  }
  if (stats.koku < 40 || stats.people < 40) {
    return locale.rankFragile;
  }
  return locale.rankRising;
}

function getEnding() {
  const locale = getLocale();
  const family = getFamily();
  const name = getDisplayHouseName();
  const familyName = family.name[state.language];

  if (state.legacyScore >= 125 && state.stats.standing >= 70 && state.stats.koku >= 68) {
    return {
      artKey: "ending-daimyo",
      title: locale.rankDaimyo,
      paragraphs: [
        `${escapeHtml(name)} becomes a house other lords have to respect. By the Sengoku and Tokugawa eras, its storehouses are full and its followers stay loyal.`,
        "This path shows how power grew through land, taxes, service, and steady rule, not just famous battles."
      ]
    };
  }

  if (state.legacyScore >= 118 && state.stats.learning >= 72 && state.stats.people >= 68) {
    return {
      artKey: "ending-scholar",
      title: locale.rankScholar,
      paragraphs: [
        `${escapeHtml(name)} makes the clan known for schools, records, and useful leadership.`,
        "This ending fits a clan that stayed strong through learning, planning, and local trust, especially in the Edo and Meiji years."
      ]
    };
  }

  if (state.legacyScore >= 110 && state.stats.standing >= 68 && state.stats.giri >= 68) {
    return {
      artKey: "ending-broker",
      title: locale.rankBroker,
      paragraphs: [
        `${escapeHtml(name)} becomes a house other rulers want on their side. From Kamakura to Meiji, it keeps finding a place in the next system.`,
        "This path shows how duty, loyalty, and useful service could keep a samurai house important across changing governments."
      ]
    };
  }

  if (state.legacyScore < 90 || state.stats.koku < 42 || state.stats.people < 42) {
    return {
      artKey: "ending-fragile",
      title: locale.rankFragile,
      paragraphs: [
        `${escapeHtml(name)} keeps the clan alive, but just barely. Food runs short, support slips, and each political shift hits hard.`,
        "That still teaches something important: rank alone could not save a samurai house without grain, trust, and the ability to change."
      ]
    };
  }

  return {
    artKey: "ending-steward",
    title: locale.rankSteward,
    paragraphs: [
      `${escapeHtml(name)} leaves behind steady rule. The ${escapeHtml(familyName)} background may not rule every era, but the house keeps its lands in order and stays useful to the people around it.`,
      "This is a strong result because many successful samurai families lasted by governing well, not by chasing legend."
    ]
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toggleView(id, visible) {
  const element = document.getElementById(id);
  element.classList.toggle("hidden", !visible);
}

function isVisible(element) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
