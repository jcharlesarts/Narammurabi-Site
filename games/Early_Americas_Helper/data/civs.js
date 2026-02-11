const CIVS = {
  maya: {
    name: "Maya",
    overview: "Skilled astronomers and builders who developed city-states in the rainforests of Mesoamerica.",
    image: {
      gallery: [
        {
          label: "Maya Map (macro)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Mayamap.png",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Mayamap.png",
          alt: "Map showing the extent of the Maya civilization.",
          credit: "Map: Kmusser, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Mayamap.png",
        },
        {
          label: "Maya Region (zoomed)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Maya_civilization_location_map_-_geography.svg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Maya_civilization_location_map_-_geography.svg",
          alt: "Map of the Maya region with major rivers and mountain ranges.",
          credit: "Map: Simon Burchell, CC BY-SA 4.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Maya_civilization_location_map_-_geography.svg",
        },
        {
          label: "Calakmul (Structure I)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Calakmul_-_Structure_I.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Calakmul_-_Structure_I.jpg",
          alt: "Calakmul archaeological site, Structure I.",
          credit: "Photo: PhilippN, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Calakmul_-_Structure_I.jpg",
        },
        {
          label: "Zaculeu (Guatemala)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Zacuelu2.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Zacuelu2.jpg",
          alt: "Zaculeu site in Guatemala with main pyramid.",
          credit: "Photo: HJPD, CC BY 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Zacuelu2.jpg",
        },
        {
          label: "Yaxchilan Lintel (British Museum)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/British_Museum_Mesoamerica_004.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=British_Museum_Mesoamerica_004.jpg",
          alt: "Lintel from Yaxchilan at the British Museum.",
          credit: "Photo: Einsamer Schuetze, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:British_Museum_Mesoamerica_004.jpg",
        },
        {
          label: "Pakal Mask (Palenque)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Palenque_-_Maske_des_Pakal.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Palenque_-_Maske_des_Pakal.jpg",
          alt: "Funerary mask of King Pakal from Palenque.",
          credit: "Photo: Wolfgang Sauber, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Palenque_-_Maske_des_Pakal.jpg",
        },
        {
          label: "Labna Arch",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Labna_arco_W.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Labna_arco_W.jpg",
          alt: "Archway at Labna, Yucatan, Mexico.",
          credit: "Photo: HJPD, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Labna_arco_W.jpg",
        },
        {
          label: "Tikal Reconstruction",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Tikal-Reconstruction4.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Tikal-Reconstruction4.jpg",
          alt: "Reconstruction model of Tikal in the 8th century.",
          credit: "Photo: Louis le Grand, public domain, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Tikal-Reconstruction4.jpg",
        },
        {
          label: "Chichen Itza Ballcourt",
          local: "assets/maya_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Chich%C3%A9n_Itz%C3%A1_-_Juego_de_Pelota.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Chich%C3%A9n_Itz%C3%A1_-_Juego_de_Pelota.jpg",
          alt: "Ballcourt at Chichen Itza.",
          credit: "Photo: Jan Zatko, CC BY-SA 3.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Chich%C3%A9n_Itz%C3%A1_-_Juego_de_Pelota.jpg",
        },
        {
          label: "Chichen Itza (El Castillo)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Chichen_Itza_3.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Chichen_Itza_3.jpg",
          alt: "El Castillo at Chichen Itza.",
          credit: "Photo: Daniel Schwen, CC BY-SA 4.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Chichen_Itza_3.jpg",
        },
        {
          label: "Codex (Paris, pages 4-5)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Paris_Codex,_pages_4-5.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Paris_Codex,_pages_4-5.jpg",
          alt: "Pages 4-5 of the Paris Codex.",
          credit: "Public domain, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Paris_Codex,_pages_4-5.jpg",
        },
        {
          label: "Codex-Style Vessel",
          local: "assets/maya_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Maya_Codex-Style_Vessel_with_two_scenes_3_Kimbell.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Maya_Codex-Style_Vessel_with_two_scenes_3_Kimbell.jpg",
          alt: "Maya codex-style ceramic vessel.",
          credit: "Photo: FA2010, public domain, via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Maya_Codex-Style_Vessel_with_two_scenes_3_Kimbell.jpg",
        },
        {
          label: "Hieroglyphs (Dresden Codex)",
          local: "assets/maya_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Maya_Hieroglyphs_Plate_32.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Maya_Hieroglyphs_Plate_32.jpg",
          alt: "Page 62 of the Dresden Codex with Maya hieroglyphs.",
          credit: "Public domain (1915), via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Maya_Hieroglyphs_Plate_32.jpg",
        },
        {
          label: "Indigenous Farming (shared)",
          local: "assets/maya_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
          alt: "Indigenous farming celebration event (Ecuador).",
          credit: "Photo: Cancilleria Ecuador, CC BY-SA 2.0, via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
        },
      ],
    },
    teachIntro: {
      title: "The Maya",
      prompts: [
        {
          q: "Who were they?",
          a: "The Maya were skilled astronomers and builders who developed city-states in the jungles of Mesoamerica.",
        },
        {
          q: "Where did they live?",
          a: "They lived in Mesoamerica, which includes parts of Mexico and Central America.",
        },
        {
          q: "What are they famous for?",
          a: "They are famous for calendars, astronomy, and writing (codices) that recorded important information.",
        },
      ],
    },
    checks: {
      intro: {
        section: "mini",
        title: "Test Your Knowledge!",
        prompt: "Complete the sentence about the Maya.",
        sentence:
          "The Maya were skilled __1__ and __2__ who developed __3__ in the __4__ of Mesoamerica.",
        blanks: [
          { answer: "astronomers", options: ["astronomers", "farmers", "traders"] },
          { answer: "builders", options: ["builders", "warriors", "sailors"] },
          { answer: "city-states", options: ["villages", "city-states", "colonies"] },
          { answer: "jungles", options: ["deserts", "plains", "jungles"] },
        ],
      },
    },
    miniLesson: {
      hook: "You’re walking through a hot, green jungle. You hear animals, you feel the sticky air… and then you step into a huge stone city. Towers rise above the trees. People are watching the sky like it’s a schedule. To the Maya, the stars helped them track time, plan farming, and run their city-states. Let’s learn the three big ideas — then you’ll practice them.",
      keyIdeas: [
        "The Maya lived in Mesoamerica (warm, tropical regions).",
        "They built city-states (cities that act like their own countries) with temples and pyramids.",
        "They studied astronomy and used writing to record information.",
      ],
      quickCheck: [
        "Where did the Maya live?",
        "What is a city-state (in your own words)?",
        "Name one thing the Maya are famous for.",
      ],
    },
    testTargets: [
      "Year-round water source: sinkholes.",
      "Priests sometimes performed human sacrifices: True.",
      "Women formed alliances through marriage, increasing trade.",
      "Agriculture match: Maya = slash-and-burn.",
      "The king was considered all-powerful because he was seen as a descendant of the sun god.",
    ],
    achievementStarters: [
      "One Maya achievement was...",
      "The Maya are known for...",
      "A major Maya innovation was...",
    ],
    testCheckChunks: [
      {
        chunk: "Chunk 1",
        question: "What was the Maya year-round water source?",
        stem: "The Maya had year-round water from ________.",
        answer: "sinkholes",
      },
      {
        chunk: "Chunk 2",
        question: "Priests sometimes performed human sacrifices. True or False?",
        stem: "Maya priests sometimes performed human sacrifices, so the statement is ________.",
        answer: "True",
      },
      {
        chunk: "Chunk 3",
        question: "How did women help increase trade?",
        stem: "Women helped increase trade by forming alliances through ________.",
        answer: "through marriage alliances",
      },
    ],
    testQuickCheck: [
      {
        prompt: "The Maya year-round water source was __________.",
        answer: "sinkholes",
      },
      {
        prompt: "Maya priests sometimes performed human sacrifices. (True/False)",
        answer: "True",
      },
      {
        prompt: "Women formed alliances through __________, increasing trade.",
        answer: "marriage",
      },
      {
        prompt: "Maya agriculture method: __________.",
        answer: "slash-and-burn",
      },
      {
        prompt: "Why were Maya kings seen as all-powerful?",
        answer: "They were seen as descendants of the sun god.",
      },
    ],
    vocabLinks: ["Mesoamerica", "city-state", "astronomy", "codex", "terrain"],
    responsibilities: [
      "Geography & location",
      "Agriculture & food",
      "Government & leadership",
      "Religion & beliefs",
      "Society & daily life",
      "Innovations & achievements",
      "Decline & legacy",
    ],
    infoSources: [
      "Video: Maya city-states and pyramids (placeholder)",
      "Article: Maya writing and calendars (placeholder)",
    ],
    activity: {
      title: "Calendar Match",
      prompt: "Match Maya innovations to how they helped people.",
      cards: [
        "Calendar → Plan farming",
        "Writing → Record history",
        "Observatories → Track seasons",
        "Pyramids → Ceremonies",
      ],
    },
    organizer: {
      stems: [
        "The Maya lived in...",
        "A key crop for the Maya was...",
        "Maya leaders were called...",
      ],
      wordBank: ["city-state", "glyphs", "maize", "astronomy", "temples"],
    },
  },
  aztec: {
    name: "Aztec",
    overview: "Powerful empire centered on Tenochtitlan with floating gardens and tribute systems.",
    image: {
      gallery: [
        {
          label: "Templo Mayor",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Aztec_Great_Temple_(9779369954).jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Aztec_Great_Temple_(9779369954).jpg",
          alt: "Templo Mayor ruins in Mexico City.",
          credit: "Photo: Gary Todd, CC0 1.0, via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Aztec_Great_Temple_(9779369954).jpg",
        },
        {
          label: "Indigenous Farming (shared)",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
          alt: "Indigenous farming celebration event (Ecuador).",
          credit: "Photo: Cancilleria Ecuador, CC BY-SA 2.0, via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:D%C3%ADa_Internacional_de_los_Pueblos_Ind%C3%ADgenas_%287852553230%29.jpg",
        },
        {
          label: "Aztec Empire 1519 (FR map)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Aztec_Empire_1519_map-fr.svg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Aztec_Empire_1519_map-fr.svg",
          alt: "Map of the Aztec Empire in 1519 (French).",
          credit: "Map: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Aztec_Empire_1519_map-fr.svg",
        },
        {
          label: "Aztec Empire (map)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Aztec_Empire.png",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Aztec_Empire.png",
          alt: "Map showing the Aztec Empire.",
          credit: "Map: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Aztec_Empire.png",
        },
        {
          label: "Basin of Mexico (1519 map)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Basin_of_Mexico_1519_map-en.svg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Basin_of_Mexico_1519_map-en.svg",
          alt: "Map of the Basin of Mexico in 1519.",
          credit: "Map: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Basin_of_Mexico_1519_map-en.svg",
        },
        {
          label: "Ahuitzotl",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Ahuitzotl.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Ahuitzotl.jpg",
          alt: "Portrait of the Aztec ruler Ahuitzotl.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Ahuitzotl.jpg",
        },
        {
          label: "Cortés and La Malinche",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Cortez_%26_La_Malinche.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Cortez_%26_La_Malinche.jpg",
          alt: "Illustration of Hernán Cortés and La Malinche.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Cortez_%26_La_Malinche.jpg",
        },
        {
          label: "Capture of Cuauhtémoc (painting)",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/The_capture_of_Cuauht%C3%A9moc_(Conquest_of_Mexico)_Painting.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=The_capture_of_Cuauht%C3%A9moc_(Conquest_of_Mexico)_Painting.jpg",
          alt: "Painting of the capture of Cuauhtémoc.",
          credit: "Image: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:The_capture_of_Cuauht%C3%A9moc_(Conquest_of_Mexico)_Painting.jpg",
        },
        {
          label: "Aztec high lords",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Aztec_high_lords_bottom.png",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Aztec_high_lords_bottom.png",
          alt: "Illustration of Aztec high lords.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Aztec_high_lords_bottom.png",
        },
        {
          label: "Codex Mendoza (folio 64r)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Codex_Mendoza_folio_64r.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Codex_Mendoza_folio_64r.jpg",
          alt: "Codex Mendoza folio 64r.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Codex_Mendoza_folio_64r.jpg",
        },
        {
          label: "Codex (Bodl. Arch. Selden A.1)",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Bodl_Arch.Selden.A.1_roll283.6_frame8.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Bodl_Arch.Selden.A.1_roll283.6_frame8.jpg",
          alt: "Detail from Codex Bodley (Selden A.1).",
          credit: "Image: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Bodl_Arch.Selden.A.1_roll283.6_frame8.jpg",
        },
        {
          label: "Codex Mendoza (folio 60r)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Codex_Mendoza_folio_60r.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Codex_Mendoza_folio_60r.jpg",
          alt: "Codex Mendoza folio 60r.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Codex_Mendoza_folio_60r.jpg",
        },
        {
          label: "Tlatelolco Marketplace",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Tlatelolco_Marketplace.JPG",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Tlatelolco_Marketplace.JPG",
          alt: "Tlatelolco marketplace illustration.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Tlatelolco_Marketplace.JPG",
        },
        {
          label: "Tenochtitlan (illustration)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Tenochtitlan.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Tenochtitlan.jpg",
          alt: "Illustration of Tenochtitlan.",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Tenochtitlan.jpg",
        },
        {
          label: "Templo Mayor (detail)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Templo_Mayor_50.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Templo_Mayor_50.jpg",
          alt: "Templo Mayor structure detail.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Templo_Mayor_50.jpg",
        },
        {
          label: "Aztec Calendar Stone (1479)",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/1479_Stein_der_f%C3%BCnften_Sonne,_sog._Aztekenkalender,_Ollin_Tonatiuh_anagoria.JPG",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=1479_Stein_der_f%C3%BCnften_Sonne,_sog._Aztekenkalender,_Ollin_Tonatiuh_anagoria.JPG",
          alt: "Aztec calendar stone (Piedra del Sol).",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:1479_Stein_der_f%C3%BCnften_Sonne,_sog._Aztekenkalender,_Ollin_Tonatiuh_anagoria.JPG",
        },
        {
          label: "Double-headed turquoise serpent",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Double_headed_turquoise_serpentAztecbritish_museum.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Double_headed_turquoise_serpentAztecbritish_museum.jpg",
          alt: "Double-headed turquoise serpent mosaic (British Museum).",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Double_headed_turquoise_serpentAztecbritish_museum.jpg",
        },
        {
          label: "Piedra del Sol",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Piedra_del_sol_Porfirio_Diaz.png",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Piedra_del_sol_Porfirio_Diaz.png",
          alt: "Piedra del Sol (Aztec calendar stone).",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Piedra_del_sol_Porfirio_Diaz.png",
        },
        {
          label: "Chinampas (Xochimilco)",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Chinampas.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Chinampas.jpg",
          alt: "Chinampas (floating gardens) in Xochimilco.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Chinampas.jpg",
        },
        {
          label: "Chinampa fields",
          local: "assets/aztec_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Chinampa.JPG",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Chinampa.JPG",
          alt: "Chinampa fields used for farming.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Chinampa.JPG",
        },
        {
          label: "Chinampas structure diagram",
          local: "assets/aztec_placeholder.svg",
          remote:
            "https://greenbeanconnection.wordpress.com/wp-content/uploads/2023/03/mexico-citys-chinampas-structural-diagram.jpg",
          thumb:
            "https://greenbeanconnection.wordpress.com/wp-content/uploads/2023/03/mexico-citys-chinampas-structural-diagram.jpg",
          alt: "Diagram showing the structure of chinampas.",
          credit: "Image: Green Bean Connection (source site).",
          source:
            "https://greenbeanconnection.wordpress.com/wp-content/uploads/2023/03/mexico-citys-chinampas-structural-diagram.jpg",
        },
      ],
    },
    teachIntro: {
      title: "The Aztec",
      prompts: [
        {
          q: "Who were they?",
          a: "The Aztec built a powerful empire with a capital city called Tenochtitlan that sat on a lake.",
        },
        {
          q: "How did they grow so much food?",
          a: "They built chinampas (floating gardens) to farm on the lake.",
        },
        {
          q: "How did they get resources?",
          a: "They collected tribute (payments in goods or work) from conquered groups.",
        },
      ],
    },
    knowledgeChecks: {
      intro: {
        id: "intro",
        title: "Test Your Knowledge!",
        directions: "Complete the sentence about the Aztec.",
        template: [
          "The Aztec built a powerful ",
          { blankId: "b1" },
          " with a capital called ",
          { blankId: "b2" },
          " that sat on a ",
          { blankId: "b3" },
          ".",
        ],
        blanks: {
          b1: { answer: "empire", options: ["empire", "city-state", "trade route", "calendar"] },
          b2: {
            answer: "Tenochtitlan",
            options: ["Tenochtitlan", "Cusco", "Chichen Itza", "Machu Picchu"],
          },
          b3: { answer: "lake", options: ["lake", "mountain", "desert", "ocean"] },
        },
        successMessage: "Nice work! You got it.",
        retryMessage: "Almost — double check your choices and try again.",
      },
    },
    checks: {
      intro: {
        section: "mini",
        title: "Test Your Knowledge!",
        prompt: "Complete the sentence about the Aztec.",
        sentence:
          "The Aztec built a powerful __1__ with a capital called __2__ that sat on a __3__.",
        blanks: [
          { answer: "empire", options: ["empire", "village", "road"] },
          { answer: "Tenochtitlan", options: ["Tenochtitlan", "Cusco", "Palenque"] },
          { answer: "lake", options: ["mountain", "lake", "desert"] },
        ],
      },
    },
    miniLesson: {
      hook: "You’re standing on a causeway — a road over water — walking straight into a giant city on a lake. Canoes zip past you like traffic. Gardens float on the water, growing food right in the middle of the city. And everywhere you look, there are markets, temples, and people bringing tribute to the rulers. Let’s lock in the 3 big ideas — then you’ll practice them.",
      keyIdeas: [
        "The Aztec lived in Mesoamerica and built their capital, Tenochtitlan, on a lake.",
        "They used chinampas (floating gardens made from mud and plants) to grow lots of food.",
        "They built an empire and collected tribute (payments in goods or work) from conquered groups.",
      ],
      quickCheck: [
        "What was the Aztec capital called?",
        "What is a chinampa?",
        "What does tribute mean?",
      ],
    },
    testTargets: [
      "Promised home: swampy island (Lake Texcoco).",
      "Emperor descendant of gods: True.",
      "Boys trained as warriors; girls trained to work in the home.",
      "Decline: conquered by Spanish; capture of Tenochtitlan in 1521 (Cortes).",
      "Agriculture match: Aztec = chinampa.",
      "The king was considered all-powerful because he was seen as a descendant of the sun god.",
    ],
    testCheckChunks: [
      {
        chunk: "Chunk 1",
        question: "What was the Aztec promised home location?",
        stem: "The Aztec promised home was a ________ on Lake Texcoco.",
        answer: "swampy island (Lake Texcoco)",
      },
      {
        chunk: "Chunk 2",
        question: "The emperor was seen as a descendant of gods. True or False?",
        stem: "The Aztec emperor was seen as a descendant of gods, so this is ________.",
        answer: "True",
      },
      {
        chunk: "Chunk 3",
        question: "What event marked Aztec decline?",
        stem: "Aztec decline is linked to the capture of ________ in ________.",
        answer: "capture of Tenochtitlan in 1521 by Cortes and the Spanish",
      },
    ],
    testQuickCheck: [
      {
        prompt: "The Aztec promised home was a __________ on Lake Texcoco.",
        answer: "swampy island",
      },
      {
        prompt: "Aztec emperors were viewed as descendants of gods. (True/False)",
        answer: "True",
      },
      {
        prompt: "Aztec boys were trained as __________.",
        answer: "warriors",
      },
      {
        prompt: "Aztec girls were trained to work in the __________.",
        answer: "home",
      },
      {
        prompt: "Aztec decline included the capture of __________ in 1521.",
        answer: "Tenochtitlan",
      },
      {
        prompt: "Aztec agriculture method: __________.",
        answer: "chinampa",
      },
      {
        prompt: "Why were Aztec kings considered all-powerful?",
        answer: "They were seen as descendants of the sun god.",
      },
    ],
    vocabLinks: ["chinampa", "causeway", "Mesoamerica", "tribute", "codex"],
    responsibilities: [
      "Geography & location",
      "Agriculture & food",
      "Government & leadership",
      "Religion & beliefs",
      "Society & daily life",
      "Innovations & achievements",
      "Decline & legacy",
    ],
    infoSources: [
      "Video: Aztec capital and chinampas (placeholder)",
      "Article: Aztec warriors and tribute (placeholder)",
    ],
    activity: {
      title: "Chinampa Design",
      prompt: "Sketch or list what you would grow on a chinampa garden.",
      cards: [
        "Corn",
        "Beans",
        "Squash",
        "Tomatoes",
      ],
    },
    organizer: {
      stems: [
        "The Aztec built their capital on...",
        "Aztec farmers used...",
        "Aztec leaders collected...",
      ],
      wordBank: ["chinampas", "tribute", "Tenochtitlan", "causeways", "market"],
    },
  },
  inca: {
    name: "Inca",
    overview: "Andean empire known for road systems, terrace farming, and strong central rule.",
    image: {
      gallery: [
        {
          label: "Inca Expansion (map)",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Inca_Expansion.svg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Inca_Expansion.svg",
          alt: "Map showing Inca expansion.",
          credit: "Map: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Inca_Expansion.svg",
        },
        {
          label: "Viracocha head (museum)",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Cabeza_de_Viracocha,_Museo_de_Am%C3%A9rica.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Cabeza_de_Viracocha,_Museo_de_Am%C3%A9rica.jpg",
          alt: "Head of Viracocha at Museo de América.",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Cabeza_de_Viracocha,_Museo_de_Am%C3%A9rica.jpg",
        },
        {
          label: "Pisac terraces (farming)",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Pisac,_Cuzco,_Per%C3%BA,_2015-07-31,_DD_99.JPG",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Pisac,_Cuzco,_Per%C3%BA,_2015-07-31,_DD_99.JPG",
          alt: "Inca terraces at Pisac, Peru.",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Pisac,_Cuzco,_Per%C3%BA,_2015-07-31,_DD_99.JPG",
        },
        {
          label: "Llama",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Lama3.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Lama3.jpg",
          alt: "Llama used in the Andes.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Lama3.jpg",
        },
        {
          label: "Inca tunic",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Tupa-inca-tunic.png",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Tupa-inca-tunic.png",
          alt: "Inca tunic (tunic of Tupa Inca).",
          credit: "Image: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Tupa-inca-tunic.png",
        },
        {
          label: "Quipu",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Inca._Quipu.jpg",
          thumb: "https://commons.wikimedia.org/w/thumb.php?width=220&f=Inca._Quipu.jpg",
          alt: "Inca quipu (knotted cords).",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Inca._Quipu.jpg",
        },
        {
          label: "Sacsayhuaman",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Sacsayhuaman_-_51188929520.jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Sacsayhuaman_-_51188929520.jpg",
          alt: "Sacsayhuaman fortress walls.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Sacsayhuaman_-_51188929520.jpg",
        },
        {
          label: "Machu Picchu (2023)",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Machu_Picchu,_2023_(012).jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Machu_Picchu,_2023_(012).jpg",
          alt: "Machu Picchu in 2023.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_2023_(012).jpg",
        },
        {
          label: "Machu Picchu (2015)",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Machu_Picchu,_Per%C3%BA,_2015-07-30,_DD_47.JPG",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Machu_Picchu,_Per%C3%BA,_2015-07-30,_DD_47.JPG",
          alt: "Machu Picchu in 2015.",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_Per%C3%BA,_2015-07-30,_DD_47.JPG",
        },
        {
          label: "Intihuatana",
          local: "assets/inca_placeholder.svg",
          remote: "https://commons.wikimedia.org/wiki/Special:FilePath/Machupicchu_intihuatana.JPG",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=Machupicchu_intihuatana.JPG",
          alt: "Intihuatana stone at Machu Picchu.",
          credit: "Photo: via Wikimedia Commons.",
          source: "https://commons.wikimedia.org/wiki/File:Machupicchu_intihuatana.JPG",
        },
        {
          label: "Machu Picchu residences",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/MachuPicchu_Residential_(pixinn.net).jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=MachuPicchu_Residential_(pixinn.net).jpg",
          alt: "Residential area at Machu Picchu.",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:MachuPicchu_Residential_(pixinn.net).jpg",
        },
        {
          label: "Sun Gate view",
          local: "assets/inca_placeholder.svg",
          remote:
            "https://commons.wikimedia.org/wiki/Special:FilePath/218_View_from_Inca_Trail_to_Sun_Gate_Machu_Picchu_Peru_2486_(14977553069).jpg",
          thumb:
            "https://commons.wikimedia.org/w/thumb.php?width=220&f=218_View_from_Inca_Trail_to_Sun_Gate_Machu_Picchu_Peru_2486_(14977553069).jpg",
          alt: "View from the Inca Trail to the Sun Gate at Machu Picchu.",
          credit: "Photo: via Wikimedia Commons.",
          source:
            "https://commons.wikimedia.org/wiki/File:218_View_from_Inca_Trail_to_Sun_Gate_Machu_Picchu_Peru_2486_(14977553069).jpg",
        },
      ],
    },
    teachIntro: {
      title: "The Inca",
      prompts: [
        {
          q: "Who were they?",
          a: "The Inca built a powerful empire in the Andes Mountains and managed it with roads, messengers, and record-keeping.",
        },
        {
          q: "How did they farm in the mountains?",
          a: "They used terrace farming to create flat steps for crops like quinoa.",
        },
        {
          q: "How did they keep records?",
          a: "They used quipu (knotted cords) to record numbers and information.",
        },
      ],
    },
    checks: {
      intro: {
        section: "mini",
        title: "Test Your Knowledge!",
        prompt: "Complete the sentence about the Inca.",
        sentence:
          "The Inca built a powerful __1__ in the __2__ Mountains and managed it with __3__.",
        blanks: [
          { answer: "empire", options: ["empire", "market", "river"] },
          { answer: "Andes", options: ["Andes", "Alps", "Rockies"] },
          { answer: "roads", options: ["roads", "ships", "bridges"] },
        ],
      },
    },
    miniLesson: {
      hook: "How do you run an empire when your world is basically mountains? Roads and smart planning.",
      keyIdeas: [
        "The Inca lived in the Andes Mountains (South America).",
        "They built terraces (flat steps cut into hillsides) for farming and grew crops like quinoa.",
        "They used roads, runners, and quipu (knotted cords used to record information) to manage the empire.",
      ],
      quickCheck: [
        "What kind of terrain did the Inca live in?",
        "What is terrace farming?",
        "What is a quipu?",
      ],
    },
    testTargets: [
      "Geography: mountains and valleys.",
      "They built roads to overcome barriers.",
      "Leaders included priests and leading commanders of the army.",
      "The empire was built on war (conquest).",
      "All boys were required to serve in the military.",
      "Agriculture match: Inca = terrace farming.",
      "The king was considered all-powerful because he was seen as a descendant of the sun god.",
    ],
    testCheckChunks: [
      {
        chunk: "Chunk 1",
        question: "What geography shaped the Inca world?",
        stem: "Inca geography was mainly ________ and ________.",
        answer: "mountains and valleys",
      },
      {
        chunk: "Chunk 2",
        question: "How did the Inca overcome geographic barriers?",
        stem: "The Inca overcame barriers by building ________.",
        answer: "they built roads",
      },
      {
        chunk: "Chunk 3",
        question: "How was the Inca empire built?",
        stem: "The Inca empire expanded through ________ and ________.",
        answer: "through war and conquest",
      },
    ],
    testQuickCheck: [
      {
        prompt: "Inca geography was mostly __________ and valleys.",
        answer: "mountains",
      },
      {
        prompt: "The Inca built __________ to overcome barriers.",
        answer: "roads",
      },
      {
        prompt: "Inca leadership included priests and army __________.",
        answer: "commanders",
      },
      {
        prompt: "The Inca empire was built on __________.",
        answer: "war (conquest)",
      },
      {
        prompt: "All Inca boys were required to serve in the __________.",
        answer: "military",
      },
      {
        prompt: "Inca agriculture method: __________ farming.",
        answer: "terrace",
      },
      {
        prompt: "Why were Inca kings considered all-powerful?",
        answer: "They were seen as descendants of the sun god.",
      },
    ],
    vocabLinks: ["terrain", "quinoa", "Quechua", "mitima", "quipu"],
    responsibilities: [
      "Geography & location",
      "Agriculture & food",
      "Government & leadership",
      "Religion & beliefs",
      "Society & daily life",
      "Innovations & achievements",
      "Decline & legacy",
    ],
    infoSources: [
      "Video: Inca roads and messengers (placeholder)",
      "Article: Machu Picchu and terracing (placeholder)",
    ],
    activity: {
      title: "Road Relay",
      prompt: "Create a short message and pass it along using a relay chain.",
      cards: [
        "Runner 1",
        "Runner 2",
        "Runner 3",
        "Runner 4",
      ],
    },
    organizer: {
      stems: [
        "The Inca lived in...",
        "Inca farmers built...",
        "Inca rulers were called...",
      ],
      wordBank: ["Andes", "terraces", "Sapa Inca", "quipu", "roads"],
    },
  },
};
