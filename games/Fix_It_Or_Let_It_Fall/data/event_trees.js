// === ROME EXTREME CHAOS EVENT TREES DATA FILE ===
// To trigger an advanced event tree from the main game, call:
//     startRandomEventTree(eventKey);
// For narrative/condition-based triggers, check for badges/loot, then:
//     if (badges.includes("Double Dealer")) startRandomEventTree("the_conspirators_strike_back");
// See triggers at the end of each event block for recommended integration points.
// --- EVENT ENGINE ANCHORS BELOW ---
// (Continue to randomEventTrees object)
//
// === ADVANCED EVENT TRIGGERS ===
// Event Key:        Recommended Trigger:
// "gladiator_riot"                - Random chaos year, unrest > 3
// "midnight_messenger"            - Special intrigue chance, or end of big senate debate
// "the_conspirators_strike_back"  - After midnight_messenger, if "Double Dealer"/"Secret Cache"
// --- Use startRandomEventTree(key) to launch ---
// Edit game.js later to handle these hooks!



// Rome Extreme Chaos Edition - Random Event Trees
// Use this as your source-of-truth for all advanced random events.
// Each event supports multi-step, RNG, loot, and badge reward logic.

const EVENT_TREE_STRINGS = {
  midnightMessenger: {
    friendChill: "Your friend thanks you, but you notice a chill in her voice. Soon after, rumors of a purge circulate in the Senate. -2 politics. 🏅Badge: Naïve.",
    friendConfess: "With trembling hands, she confesses her involvement but begs you to help thwart the plot. Together you may turn the tide. +2 politics. 🏅Badge: Double Dealer.",
    friendBlackmail: "She protests her innocence and reveals a cache of blackmail letters against your rivals. +1 politics. 🗡️Loot: Blackmail Letters.",
    stashSecretCache: "You tuck the vial and scroll into your secret cache, biding your time. +1 intrigue. 🗡️Loot: Secret Cache.",
    labelFriendAdvice: "Take this intrigue and the found items to your friend confront her about these accusations.",
    labelCityGuard: "Hand them over to the city guard.",
    labelDecodeTonight: "Study the coded scroll tonight (try to decode)"
  },
  continueLabels: {
    leaveArchivum: "Leave the Archivum",
    closeBaths: "Close the Baths",
    proceedAccusation: "Proceed to Accusation"
  }
};

window.randomEventTrees = {
// --- EVENT: etruscan_oracle ---
// To trigger: startRandomEventTree("etruscan_oracle")
// Narrative trigger: After omens, or if player seeks supernatural guidance
etruscan_oracle: {
  meta: { tags: ["intrigue","mystery"], weight: 1.2, enabled: true },
  steps: [
    // Step 1: The Oracle’s Chamber
    {
      text: "It is a fair evening as you travel through the misty woods to the Etruscan Oracle. Inside her hovel, the air is thick with incense . The priestess’s eyes roll back as she enters a trance. She utters cryptic warnings of Rome’s fate.",
      cameo: "The Oracle’s breath is cold on your cheek.",
      options: [
        {
          label: "Decode the laurel inscriptions with your cipher (requires Silken Cipher)",
          condition: { loot: "Silken Cipher" },
          fixed: {
            text: "Your cipher fits a hidden substitution. The case names a senator’s fixer. Politics +1. Loot: Anonymous Testimony.",
            effect: () => { politics += 1; },
            loot: "Anonymous Testimony",
            nextStep: null,
            continueLabel: "Seal the Case"
          }
        },
        {
          label: "Ask about Rome’s destiny.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "The Oracle’s voice trembles: 'Blood will soak the Tiber.' You nearly quip, \"What else is new?\" but then shudder. She might be referring to herself! +1 intrigue.",
                effect: () => { /* +1 intrigue */ },
                badge: undefined,
                loot: undefined,
                nextStep: 1
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "She speaks in riddles, but you sense hope: 'A lion rises from the ashes.' +1 politics.",
                effect: () => { politics += 1; },
                badge: undefined,
                loot: undefined,
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Bribe the priestess for a personal prophecy (-50 denarii)",
          fixed: {
            text: "She takes your coin and whispers, 'Beware the Ides.' Her words hang ominous in the smoke-filled air. -50 denarii.",
            effect: () => { treasury -= 50; },
            badge: undefined,
            loot: undefined,
            nextStep: 1
          }
        }
      ]
    },
    // Step 2: The Vision
    {
      text: "In a swirl of smoke, you glimpse a vision: Rome in flames, a masked figure weeping, and a laurel wreath floating down the Tiber. What do you do?",
      options: [
        {
          label: "Slip through the service corridor using the Cistern Sketch (requires Cistern Sketch)",
          condition: { loot: "Cistern Sketch" },
          fixed: {
            text: "You trace the route beneath the peristyle and listen through a grate. You catch a schedule. Loot: Anonymous Testimony.",
            effect: () => {},
            loot: "Anonymous Testimony",
            nextStep: null,
            continueLabel: "Back to the Feast"
          }
        },
        {
          label: "Try to interpret the vision yourself.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You see omens of betrayal. A small child sits alone by the Tiber. You vow to trust no one. +1 intrigue.",
                effect: () => { /* +1 intrigue */ },
                badge: undefined,
                loot: undefined,
                nextStep: 2
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "You glimpse opportunity in the chaos. +1 politics.",
                effect: () => { politics += 1; },
                badge: undefined,
                loot: undefined,
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Beg the Oracle for more detail.",
          fixed: {
            text: "She collapses, exhausted. You gain nothing more, but your desperation is noted. +1 unrest.",
            effect: () => { unrest += 1; },
            badge: undefined,
            loot: undefined,
            nextStep: 2
          }
        }
      ]
    },
    // Step 3: Return to Rome
    {
      text: "You return to Rome, the Oracle’s words haunting your mind. How do you use this knowledge?",
      options: [
        {
          label: "Interrupt the Senate session, dramatically announcing the Oracle’s warning.",
          rng: [
            {
              min: 1, max: 80,
              result: {
                text: "You stride into the Curia, voice echoing off the marble. Senators jeer, and an old rival calls for your ‘augur’s hat’. Your words are noted only as an eccentric outburst. -1 politics.",
                effect: () => { politics -= 1; },
                badge: undefined,
                loot: undefined,
                nextStep: null
              }
            },
            {
              min: 81, max: 100,
              result: {
                text: "You stand in the center of the chamber, recounting the Oracle’s vision with such gravitas that a hush falls over the hall. A few senators approach you afterward, whispering for more details. +2 politics, 🏅Badge: Harbinger.",
                effect: () => { politics += 2; },
                badge: "Harbinger",
                loot: undefined,
                nextStep: null
              }
            }
          ]
        },
        {
          label: "Slither through the forum shadows, leveraging what you’ve gathered (requires Blackmail Letters or Secret Cache).",
          condition: { anyLoot: ["Blackmail Letters", "Secret Cache"] },
          fixed: {
            text: "You corner a rival behind a column, slipping the coded secret into his hand with a sly smile. His face pales. By nightfall, you’ve averted a plot and earned unexpected gratitude. +2 politics, 🏅Badge: Seer’s Agent.",
            effect: () => { politics += 2; },
            badge: "Seer’s Agent",
            loot: undefined,
            nextStep: null
          }
        },
        {
          label: "Ignore the prophecy, focusing on your own agenda. Dine lavishly, throw a party, or visit your mistress—anything to forget those haunted eyes.",
          fixed: {
            text: "You feast with friends, banter with colleagues, and try to lose yourself in earthly pleasures. Still, sometimes at dusk, you hear the Oracle’s words in the wind...",
            effect: () => {/* no effect */},
            badge: undefined,
            loot: undefined,
            nextStep: null
          }
        }
      ]
    }
  ]
},
  gladiator_riot: {
    meta: { tags: ["brawl"], weight: 0.0, enabled: false },
    steps: [
      {
        text: "Gladiator Riot! The streets are chaos after a brutal arena match. Do you...",
        cameo: "A guard shouts, 'They’ve broken loose in the streets!'",
        options: [
          {
            label: "Grab your sword and helmet, and join the fight yourself!",
            rng: [
              {
                min: 1, max: 40,
                result: {
                  text: "You are captured! The gladiators hold you for ransom.",
                  effect: () => { /* no effect */ },
                  badge: undefined,
                  loot: undefined,
                  nextStep: 1
                }
              },
              {
                min: 41, max: 80,
                result: {
                  text: "You lose a hand, but gain respect among the soldiers! -3 unrest. (🏅Badge: 'The One-Handed')",
                  effect: () => { unrest -= 3; },
                  badge: "The One-Handed",
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "The fighters cower and flee when they see the great " + (typeof senatorName !== "undefined" ? senatorName : "the senator") + " approaching. -5 unrest, +300 denarii! (🏅Badge: 'Arena Hero', 🗡️Loot: 'Champion's Sword')",
                  effect: () => { unrest -= 5; treasury += 300; },
                  badge: "Arena Hero",
                  loot: "Champion's Sword",
                  nextStep: null
                }
              }
            ]
          },
          {
            label: "Let the guard handle it (safe, but costly)",
            fixed: {
              text: "The guards restore order, but with a heavy hand. -100 denarii, +1 riot token.",
              effect: () => { treasury -= 100; riotTokens += 1; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          }
        ]
      },
      {
        text: "You are held for ransom by the gladiators. What do you do?",
        cameo: "A brawler sneers, 'Rich senators pay the best ransoms!'",
        options: [
          {
            label: "Beg senators to pay your ransom",
            fixed: {
              text: "The Senate pays your ransom, but mocks your weakness. -1000 denarii, -4 politics.",
              effect: () => { treasury -= 1000; politics -= 4; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          },
          {
            label: "Try to escape yourself!",
            rng: [
              {
                min: 1, max: 70,
                result: {
                  text: "Your escape fails! The guards rough you up. -2 politics.",
                  effect: () => { politics -= 2; },
                  badge: undefined,
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 71, max: 100,
                result: {
                  text: "You slip away under cover of darkness. The people whisper of your cunning. +1 politics, -2 unrest. (🏅Badge: 'Slippery Senator')",
                  effect: () => { politics += 1; unrest -= 2; },
                  badge: "Slippery Senator",
                  loot: undefined,
                  nextStep: null
                }
              }
            ]
          }
        ]
      }
    ]
  },
  bandit_raids: {
    meta: { tags: ["adventure","intrigue","civic","military"], weight: 0.8, enabled: true },
    steps: [
      {
        text: "Bandit raids! Highway robbery is rampant, and merchants are panicked. How do you respond?",
        cameo: "A merchant complains, 'Highway robbery is rampant!'",
        options: [
          {
            label: "Send patrols (cost 100)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Your patrols are ambushed! Treasury -200, Unrest +1.",
                  effect: () => { treasury -= 200; unrest += 1; },
                  nextStep: 1
                }
              },
              {
                min: 61, max: 90,
                result: {
                  text: "Bandits scatter into the hills. Treasury -100. 🏅Badge: Protector of Merchants.",
                  effect: () => { treasury -= 100; },
                  badge: "Protector of Merchants",
                  nextStep: 1
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "You catch the bandit chief! Treasury +150. 🗡️Loot: Bandit's Dagger.",
                  effect: () => { treasury += 150; },
                  loot: "Bandit's Dagger",
                  nextStep: 1
                }
              }
            ]
          },
          {
            label: "Offer reward for captured bandits (-75)",
            fixed: {
              text: "A few locals try their luck—one drags in a bruised rider. Treasury -75, Politics +1.",
              effect: () => { treasury -= 75; politics += 1; },
              nextStep: 1
            }
          },
          {
            label: "Blame the merchants",
            fixed: {
              text: "Merchants seethe; unrest rises. +2 unrest.",
              effect: () => { unrest += 2; },
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "The roads demand a plan. You need a lead before the next convoy rolls.",
        cameo: "A fence you once traded jokes with lingers under the colonnade, eyes weighing you.",
        options: [
          {
            label: "Examine the bandit's dagger for maker's marks (requires Bandit's Dagger)",
            condition: { loot: "Bandit's Dagger" },
            fixed: {
              text: "A riverside smith's notch gives you the hideout trail. 🗡️Loot: Hideout Map.",
              effect: () => {},
              loot: "Hideout Map",
              nextStep: 2
            }
          },
          {
            label: "Trace payments in the Archivum (requires Archivum Key)",
            condition: { loot: "Archivum Key" },
            fixed: {
              text: "A deed points to a waystation with odd ledgers. 🗡️Loot: Wayside Deed.",
              effect: () => {},
              loot: "Wayside Deed",
              nextStep: 2
            }
          },
          {
            label: "Use the Carthaginian Map to predict chokepoints (requires Carthaginian Map)",
            condition: { loot: "Carthaginian Map" },
            fixed: {
              text: "You mark the bends and ravines where carts must slow. 🗡️Loot: Ambush Route.",
              effect: () => {},
              loot: "Ambush Route",
              nextStep: 2
            }
          },
          {
            label: "Hear the fence's offer at dusk",
            rng: [
              {
                min: 1, max: 55,
                result: {
                  text: "You pay for a ledger of names. Treasury -60. 🗡️Loot: Fence Ledger.",
                  effect: () => { treasury -= 60; },
                  loot: "Fence Ledger",
                  nextStep: 2
                }
              },
              {
                min: 56, max: 100,
                result: {
                  text: "The fence takes your coin and vanishes. Treasury -80, Unrest +1.",
                  effect: () => { treasury -= 80; unrest += 1; },
                  nextStep: 2
                }
              }
            ]
          },
          {
            label: "Question teamsters at the East Gate",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "One points to a hollow oak marker. 🗡️Loot: Carters' Gossip.",
                  effect: () => {},
                  loot: "Carters' Gossip",
                  nextStep: 2
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "They clam up; the rumor turns on you. -1 politics, +1 unrest.",
                  effect: () => { politics -= 1; unrest += 1; },
                  nextStep: 2
                }
              }
            ]
          },
          {
            label: "Offer amnesty and work permits (-120)",
            fixed: {
              text: "A handful step forward to trade names for bread. Treasury -120. 🗡️Loot: Amnesty List.",
              effect: () => { treasury -= 120; },
              loot: "Amnesty List",
              nextStep: 2
            }
          }
        ]
      },
      {
        text: "With leads in hand, you choose how to set the net.",
        options: [
          {
            label: "Raid the hideout at dawn (requires Hideout Map or Ambush Route)",
            condition: { anyLoot: ["Hideout Map", "Ambush Route"] },
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "Bandits scatter; you seize one for questioning. 🗡️Loot: Captured Bandit.",
                  effect: () => {},
                  loot: "Captured Bandit",
                  nextStep: 3
                }
              },
              {
                min: 51, max: 85,
                result: {
                  text: "You seize a ledger of bribes. 🗡️Loot: Bandit Ledger.",
                  effect: () => {},
                  loot: "Bandit Ledger",
                  nextStep: 3
                }
              },
              {
                min: 86, max: 100,
                result: {
                  text: "A clean sweep: a ledger and a prisoner. Politics +1. 🗡️Loot: Bandit Ledger.",
                  effect: () => { politics += 1; window.inventory = window.inventory || []; if (!window.inventory.includes("Captured Bandit")) window.inventory.push("Captured Bandit"); },
                  loot: "Bandit Ledger",
                  nextStep: 3
                }
              }
            ]
          },
          {
            label: "Stage a fake convoy (requires Carters' Gossip or Wayside Deed or Fence Ledger)",
            condition: { anyLoot: ["Carters' Gossip", "Wayside Deed", "Fence Ledger"] },
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "The sting works; you capture their scout. Politics +1. 🗡️Loot: Captured Bandit.",
                  effect: () => { politics += 1; },
                  loot: "Captured Bandit",
                  nextStep: 3
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "They smell a trap and vanish. +1 unrest.",
                  effect: () => { unrest += 1; },
                  nextStep: 3
                }
              }
            ]
          },
          {
            label: "Lean on blackmail letters to turn the fence (requires Blackmail Letters)",
            condition: { loot: "Blackmail Letters" },
            fixed: {
              text: "The fence sweats and hands over the ledger. Politics +1. 🗡️Loot: Fence Ledger.",
              effect: () => { politics += 1; },
              loot: "Fence Ledger",
              nextStep: 3
            }
          },
          {
            label: "Turn the amnesty list into a militia (requires Amnesty List)",
            condition: { loot: "Amnesty List" },
            fixed: {
              text: "A small watch forms, eager for pay and pardon. Politics +1. 🏅Badge: Road Marshal.",
              effect: () => { politics += 1; },
              badge: "Road Marshal",
              nextStep: 3
            }
          },
          {
            label: "Raise tolls and let the merchants fend for themselves",
            fixed: {
              text: "Coin flows; resentment does too. Treasury +100, Unrest +2.",
              effect: () => { treasury += 100; unrest += 2; },
              nextStep: 3
            }
          }
        ]
      },
      {
        text: "By the next market day, the roads feel different. How do you frame the result?",
        options: [
          {
            label: "Public trial and warning (requires Captured Bandit or Bandit Ledger)",
            condition: { anyLoot: ["Captured Bandit", "Bandit Ledger"] },
            fixed: {
              text: "The rostra loves a villain. Politics +2, Unrest -1. 🏅Badge: Road Justice.",
              effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); },
              badge: "Road Justice",
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Quiet settlements with the fence (requires Fence Ledger or Wayside Deed)",
            condition: { anyLoot: ["Fence Ledger", "Wayside Deed"] },
            fixed: {
              text: "You trade silence for stability. Treasury +150, Politics +1.",
              effect: () => { treasury += 150; politics += 1; },
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Declare a limited amnesty (requires Amnesty List)",
            condition: { loot: "Amnesty List" },
            fixed: {
              text: "The city grumbles, but the roads reopen. Unrest -2, Politics -1.",
              effect: () => { unrest = Math.max(0, unrest - 2); politics -= 1; },
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Claim victory and move on",
            fixed: {
              text: "You let the rumors do the work.",
              effect: () => {},
              nextStep: null,
              suppressNextRandom: true
            }
          }
        ]
      }
    ]
  },
  bountiful_harvest: {
    meta: { tags: ["slice","economy","civic"], weight: 0.7, enabled: true },
    steps: [
      {
        text: "Bountiful Harvest! Fields overflow; the people rejoice. How will you spread the good fortune?",
        cameo: "A farmer grins, 'Praise Ceres, for she has blessed our fields!'",
        options: [
          {
            label: "Host a public feast (-150)",
            fixed: {
              text: "The plebs feast, unrest drops. Treasury -150, Unrest -3. 🏅Badge: Feaster of Rome.",
              effect: () => { treasury -= 150; unrest = Math.max(0, unrest - 3); },
              badge: "Feaster of Rome",
              loot: "Festival Tokens",
              nextStep: 1
            }
          },
          {
            label: "Store surplus (cost 0)",
            fixed: {
              text: "You prudently store extra grain for hard times. Politics +1. 🗡️Loot: Granary Reserve.",
              effect: () => { politics += 1; },
              loot: "Granary Reserve",
              nextStep: 1
            }
          },
          {
            label: "Distribute to the wealthy (+1 politics)",
            fixed: {
              text: "Patricians sing your praises, but the plebs grumble. Politics +1, Unrest +1. 🗡️Loot: Patrician IOUs.",
              effect: () => { politics += 1; unrest += 1; },
              loot: "Patrician IOUs",
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "With the harvest decided, the city looks to you for policy.",
        options: [
          {
            label: "Turn the feast into a civic festival (requires Festival Tokens)",
            condition: { loot: "Festival Tokens" },
            fixed: {
              text: "Ceres is pleased and the streets sing. Politics +1, Unrest -1. 🏅Badge: Ceres' Host.",
              effect: () => { politics += 1; unrest = Math.max(0, unrest - 1); },
              badge: "Ceres' Host",
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Release the reserve early (requires Granary Reserve)",
            condition: { loot: "Granary Reserve" },
            fixed: {
              text: "The hungry cheer. Treasury -80, Unrest -2.",
              effect: () => { treasury -= 80; unrest = Math.max(0, unrest - 2); },
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Call in patrician IOUs (requires Patrician IOUs)",
            condition: { loot: "Patrician IOUs" },
            fixed: {
              text: "A coalition forms, but the plebs mutter. Politics +2, Unrest +1. 🏅Badge: Harvest Broker.",
              effect: () => { politics += 2; unrest += 1; },
              badge: "Harvest Broker",
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Audit the granaries (requires Archivum Key)",
            condition: { loot: "Archivum Key" },
            fixed: {
              text: "You catch a quiet skim and steady the books. Politics +1, Unrest -1.",
              effect: () => { politics += 1; unrest = Math.max(0, unrest - 1); },
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Bless the stores at Ceres' temple (requires Temple Favor)",
            condition: { loot: "Temple Favor" },
            fixed: {
              text: "Incense and grain calm the city. Politics +1, Unrest -1. 🏅Badge: Ceres' Steward.",
              effect: () => { politics += 1; unrest = Math.max(0, unrest - 1); },
              badge: "Ceres' Steward",
              nextStep: null,
              suppressNextRandom: true
            }
          },
          {
            label: "Let the market run",
            fixed: {
              text: "Prices climb and so does resentment. Treasury +100, Unrest +1.",
              effect: () => { treasury += 100; unrest += 1; },
              nextStep: null,
              suppressNextRandom: true
            }
          }
        ]
      }
    ]
  }
,
  ember_road: {
    meta: { tags: ["adventure","intrigue","city","travel"], weight: 1.2, enabled: true },
    steps: [
      {
        text: "Dawn at the East Gate. A factor offers a contract to escort two grain carts along the Ember Road to Praeneste.",
        cameo: "Mules steam in the chill; wheels creak for luck.",
        options: [
          {
            label: "Take the contract (risk ambush)",
            fixed: { text: "You sign the slate and whistle the mules forward.", effect: () => {}, nextStep: 1 }
          },
          {
            label: "Decline politely (stay clean)",
            fixed: { text: "You pass the burden to another house and keep your day free.", effect: () => {}, nextStep: null, continueLabel: "Head Back", suppressNextRandom: true }
          }
        ]
      },
      {
        text: "Load-out check at the yard. Anything you change now may save you later.",
        options: [
          {
            label: "Hire two extra guards (-100)",
            fixed: { text: "You sign rough hands to the payroll. Treasury -100.", effect: () => { treasury -= 100; }, nextStep: 2 }
          },
          {
            label: "Inspect wheels with Engineer's Plans (requires Engineer's Plans)",
            condition: { loot: "Engineer's Plans" },
            fixed: { text: "A cotter pin is half-cut. You swap it before anyone notices. Loot: Spare Axle Pin. Unrest -1 in the district you leave calm behind you.", effect: () => { unrest = Math.max(0, unrest - 1); }, loot: "Spare Axle Pin", nextStep: 2 }
          },
          {
            label: "Cut costs—no extras",
            fixed: { text: "You keep the purse tight and roll out.", effect: () => {}, nextStep: 2 }
          }
        ]
      },
      {
        text: "Ahead, a rocky pass. Narrow-cut basalt walls squeeze the road. An eerie whistle echoes ahead.",
        options: [
          {
            label: "Set a decoy cart (requires Bandit's Dagger or Champion's Sword)",
            condition: { anyLoot: ["Bandit's Dagger","Champion's Sword"] },
            rng: [
              { min: 1, max: 60, result: { text: "The bluff works; shadows melt back. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } },
              { min: 61, max: 100, result: { text: "A lookout tests you, then waves the crew off. Badge: Road Warden.", effect: () => {}, badge: "Road Warden", nextStep: 3 } }
            ]
          },
          {
            label: "Bribe a roadside scout (-75)",
            fixed: { text: "A coin-laden wink buys a quiet passage—maybe. Treasury -75.", effect: () => { treasury -= 75; }, nextStep: 3 }
          },
          {
            label: "Hold formation and press through",
            rng: [
              { min: 1, max: 55, result: { text: "A slingstone cracks a jar; you rush the gap. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 56, max: 100, result: { text: "Your column doesn't blink; the ambush doesn't spring. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } }
            ]
          }
        ]
      },
      {
        text: "The Torrent Bridge planks rattle; one cart lists.",
        options: [
          {
            label: "Field repair with Spare Axle Pin (requires Spare Axle Pin)",
            condition: { loot: "Spare Axle Pin" },
            fixed: { text: "You wedge the pin, kiss the plank, and cross. The men cheer quietly.", effect: () => {}, nextStep: 4 }
          },
          {
            label: "Call local help (requires Merchant Ledger)",
            condition: { loot: "Merchant Ledger" },
            fixed: { text: "You cite old favors; three teamsters shoulder the weight. Politics +1.", effect: () => { politics += 1; }, nextStep: 4 }
          },
          {
            label: "Force the crossing",
            rng: [
              { min: 1, max: 50, result: { text: "A wheel slips—an axle bites. Treasury -100 to patch.", effect: () => { treasury -= 100; }, nextStep: 4 } },
              { min: 51, max: 100, result: { text: "Boards hold. You breathe again.", effect: () => {}, nextStep: 4 } }
            ]
          }
        ]
      },
      {
        text: "You reach the Praenestine granary. After a short wait, the tally sticks knock in your favor.",
        options: [
          {
            label: "Close the contract",
            rng: [
              { min: 1, max: 70, result: { text: "Clean run. Treasury +200. Loot: Praenestine Contract Seal.", effect: () => { treasury += 370; }, loot: "Praenestine Contract Seal", nextStep: null } },
              { min: 71, max: 100, result: { text: "A rumor trails you: someone paid a scout to stand down. Politics +1, Loot: Rumor of Betrayal.", effect: () => { politics += 1; }, loot: "Rumor of Betrayal", nextStep: null } }
            ]
          }
        ]
      }
    ]
  },

whispering_scriptorium: {
  meta: { tags: ["mystery","intrigue","city","archives"], weight: 1.5, enabled: true },
  steps: [
    // Step 0 — Summons & first hint of the whisper (noir tone)
    {
      text: "It's late after a long day at the Senate. You're halfway to your domus when a messenger catches your name and your sleeve. The aedile needs a quiet hand: a restricted scroll is missing from the archivum. You take the job and the bad light that comes with it.",
      cameo: "Seven iron locks hang open where the sensitive scrolls once sat. Between the stacks, a draft breathes and cobwebs ripple- a thin susurrus that sounds like a whispering voice.",
      options: [
        { label: "Step into the stacks - eyes open, mouth shut.", fixed: { text: "Your sandals glide over marble; the air is colder between the shelves.", effect: () => {}, nextStep: 1 } },
        { label: "Pause and listen before touching anything",
          fixed: { text: "You still your breath. The 'whisper' is a just draft of air from the north wall, right by the chained scrolls. Loot: Whisper Noted.", effect: () => {}, loot: "Whisper Noted", nextStep: 1 }
        },
        { label: "Refuse. Too messy.", fixed: { text: "You send regrets and stay clean—for now.", effect: () => {}, nextStep: null, continueLabel: "Go Home", suppressNextRandom: true } }
      ]
    },

    // Step 1 — Seven Locks & the cast
    {
      text: "Seven locks on a single case, all opened. Keeper Varro glowers. Novice Lentulus chews a nail. Visiting rhetor Cassian views your approach with amusement.",
      options: [
        { label: "Dust-test the latch",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Whisper Noted", add: 6 },
              { loot: "Omen Notes", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "The latch is too clean. Somebody wiped it down. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 2 } },
              { min: 23, max: 78, result: { text: "A left-handed sweep. The smudge arcs left to right. Loot: Dust Footprints (Left-Handed).", effect: () => {}, loot: "Dust Footprints (Left-Handed)", nextStep: 2 } },
              { min: 79, max: 100, result: { text: "A left-handed sandle sweep and a wax fleck caught in the powder. Loot: Dust Footprints (Left-Handed), Latch Wax Flake.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Dust Footprints (Left-Handed)", weight: 1 }, { item: "Latch Wax Flake", weight: 1 } ] }, nextStep: 2 } }
            ]
          } },
        { label: "Decode shelf marks (requires Silken Cipher)", condition: { loot: "Silken Cipher" }, fixed: { text: "Numbers hum like music; a pattern blooms. Loot: Shelf Pattern Sketch.", effect: () => {}, loot: "Shelf Pattern Sketch", nextStep: 2 } },
        { label: "Question Keeper Varro",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Whisper Noted", add: 3 },
              { loot: "Silken Cipher", add: 4 },
              { badge: "Curator of Secrets", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 25, result: { text: "He bristles. 'My house is in order.' Politics -1. Loot: Varro Resentful.", effect: () => { politics -= 1; }, loot: "Varro Resentful", nextStep: 2 } },
              { min: 26, max: 78, result: { text: "He exhales and lowers his voice. 'The north stacks hiss at night.' Politics +1. Loot: Varro Cooperative.", effect: () => { politics += 1; }, loot: "Varro Cooperative", nextStep: 2 } },
              { min: 79, max: 100, result: { text: "He lowers his voice and slides a margin note from the catalog. Politics +1. Loot: Varro Cooperative, Stack Access Note.", effect: () => { politics += 1; }, lootTable: { picks: 2, entries: [ { item: "Varro Cooperative", weight: 1 }, { item: "Stack Access Note", weight: 1 } ] }, nextStep: 2 } }
            ]
          } },
        { label: "Watch Rhetor Cassian prowl the aisles",
          fixed: { text: "He stops at legal treatises he should not need. A myrrh note hangs in the air. Loot: Cassian Scent of Myrrh.", effect: () => {}, loot: "Cassian Scent of Myrrh", nextStep: 2 } },
        { label: "Rummage the returns desk (-10)",
          fixed: { text: "You find a laurel-stamped case meant for the tax rolls. Treasury -10. Loot: Sealed Laurel Case.", effect: () => { treasury -= 10; }, loot: "Sealed Laurel Case", nextStep: 2 } },
        { label: "Have a word with Lentulus the novice",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Whisper Noted", add: 3 },
              { loot: "Sealed Laurel Case", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "He stiffens. 'I lock what I'm told.' Loot: Lentulus Bristles.", effect: () => {}, loot: "Lentulus Bristles", nextStep: 2 } },
              { min: 31, max: 75, result: { text: "Ink stains the left hand; he hides it too late. Loot: Lentulus Ink-Hand.", effect: () => {}, loot: "Lentulus Ink-Hand", nextStep: 2 } },
              { min: 76, max: 100, result: { text: "Ink stains the left hand, and a duty slip falls loose. Loot: Lentulus Ink-Hand, Duty Slip.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Lentulus Ink-Hand", weight: 1 }, { item: "Duty Slip", weight: 1 } ] }, nextStep: 2 } }
            ]
          } }
      ]
    },

    // Step 2 — Track the whisper’s root (ground it in place)
    {
      text: "You follow the hiss from the north wall. It is not a voice. It is air - a draft cutting through old stone.",
      options: [
        { label: "Snuff the lamps and follow the sound",
          fixed: { text: "In the dark, the draft sharpens to a vent behind chained scrolls. Loot: Whisper Direction.", effect: () => {}, loot: "Whisper Direction", nextStep: 3 } },
        { label: "Augury of sound (requires Omen Notes)", condition: { loot: "Omen Notes" }, fixed: { text: "Air sings through a shaft. You mark the loudest point. Loot: Acoustic Trace.", effect: () => {}, loot: "Acoustic Trace", nextStep: 3 } },
        { label: "Trace the air shaft (requires Cistern Sketch)", condition: { loot: "Cistern Sketch" }, fixed: { text: "A crawlspace threads behind the stacks. You sketch its bends. Loot: Air Shaft Route.", effect: () => {}, loot: "Air Shaft Route", nextStep: 3 } },
        { label: "Bribe Lentulus (-50)", fixed: { text: "He hands over the duty roster with shaking fingers. Treasury -50. Loot: Novice Duty Roster.", effect: () => { treasury -= 50; }, loot: "Novice Duty Roster", nextStep: 3 } },
        { label: "Dust the floor (-5)", fixed: { text: "Ash across the tiles blooms footprints that drift left. Treasury -5. Loot: Dust Footprints (Left-Handed).", effect: () => { treasury -= 5; }, loot: "Dust Footprints (Left-Handed)", nextStep: 3 } }
      ]
    },

    // Step 3 — The crawlspace
    {
      text: "A service duct yawns behind a shelf, its stone scored smooth by years of breath and boot soles.",
      options: [
        { label: "Enter yourself",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Whisper Direction", add: 5 },
              { loot: "Air Shaft Route", add: 5 },
              { loot: "Acoustic Trace", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 25, result: { text: "A rat squeaks and skitters, and you shreik with a jolt. You retreat with bruised pride, covered in ancient dust. Politics -1.", effect: () => { politics -= 1; }, nextStep: 4 } },
              { min: 26, max: 78, result: { text: "You wedge through and see an ivory pin on the stone floor. Loot: Ivory Index Pin.", effect: () => {}, loot: "Ivory Index Pin", nextStep: 4 } },
              { min: 79, max: 100, result: { text: "You snag the pin and a wax-threaded slip. Loot: Ivory Index Pin, Wax Thread Slip.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Ivory Index Pin", weight: 1 }, { item: "Wax Thread Slip", weight: 1 } ] }, nextStep: 4 } }
            ]
          } },
        { label: "Send a page (coward's choice)", fixed: { text: "He returns pale with a splinter and gossip. Badge: Paper General.", effect: () => {}, badge: "Paper General", nextStep: 4 } },
        { label: "Circle outside—find where the shaft exhales",
          fixed: { text: "By the service court you find a grate kissed with red wax. Loot: Seal Scrap.", effect: () => {}, loot: "Seal Scrap", nextStep: 4 } }
      ]
    },

    // Step 4 — Confrontations (character beats)
    {
      text: "Three masks, one thief. You choose who to lean on first.",
      options: [
        { label: "Press Lentulus in the scriptorium light",
          condition: { any: [ { loot: "Dust Footprints (Left-Handed)" }, { loot: "Lentulus Ink-Hand" }, { loot: "Novice Duty Roster" } ] },
          fixed: { text: "You place the roster and his stained fingers side by side. The boy folds like wet papyrus. Loot: Lentulus Cracks.", effect: () => {}, loot: "Lentulus Cracks", nextStep: 5, continueLabel: "Call the lictors" } },
        { label: "Corner Rhetor Cassian behind the rhetoric shelf",
          condition: { any: [ { loot: "Shelf Pattern Sketch" }, { loot: "Ivory Index Pin" }, { loot: "Seal Scrap" }, { loot: "Cassian Scent of Myrrh" } ] },
          fixed: { text: "Your voice stays low; his eyes do not. A duplicate seal lands in your palm. Loot: Cassian Cornered.", effect: () => {}, loot: "Cassian Cornered", nextStep: 5, continueLabel: "To the reading hall" } },
        { label: "Level with Keeper Varro in his office (pay for honesty, -50)",
          fixed: { text: "You slide the roster across the desk. He takes a long breath and nods once. Treasury -50. Loot: Varro Admission.", effect: () => { treasury -= 50; }, loot: "Varro Admission", nextStep: 5, continueLabel: "Gather them all" } },
        { label: "Gather everyone in the reading hall",
          fixed: { text: "You call them to the lights, and the hush grows heavy.", effect: () => {}, nextStep: 5, continueLabel: "Name the thief" } }
      ]
    },

    // Step 5 — Name the thief (payoffs; noir summation)
    {
      text: "Ink on skin, wax on iron, air hissing through stone - you stitch the city's breath into a single thread. Who do you accuse?",
      options: [
        { label: "Accuse the novice",
          condition: { any: [ { loot: "Lentulus Cracks" }, { loot: "Lentulus Ink-Hand" }, { loot: "Duty Slip" }, { all: [ { loot: "Novice Duty Roster" }, { loot: "Dust Footprints (Left-Handed)" } ] } ] },
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Lentulus Cracks", add: 10 },
              { loot: "Lentulus Ink-Hand", add: 6 },
              { loot: "Duty Slip", add: 5 },
              { loot: "Novice Duty Roster", add: 5 },
              { loot: "Dust Footprints (Left-Handed)", add: 4 },
              { loot: "Latch Wax Flake", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 25, result: { text: "Lentulus panics and bolts. The scroll is still missing. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 26, max: 80, result: { text: "Lentulus wilts under the lictors' stare. The scroll is found behind a loose base-stone. Badge: Curator of Secrets. Loot: Archivum Key.", effect: () => {}, badge: "Curator of Secrets", loot: "Archivum Key", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 81, max: 100, result: { text: "He folds and names a patron. The scroll returns to its case. Politics +1. Badge: Curator of Secrets. Loot: Archivum Key, Case Stamp.", effect: () => { politics += 1; }, badge: "Curator of Secrets", lootTable: { picks: 2, entries: [ { item: "Archivum Key", weight: 1 }, { item: "Case Stamp", weight: 1 } ] }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } }
            ]
          } },
        { label: "Accuse the visiting rhetor",
          condition: { any: [ { loot: "Cassian Cornered" }, { all: [ { loot: "Shelf Pattern Sketch" }, { loot: "Ivory Index Pin" } ] }, { loot: "Seal Scrap" }, { loot: "Cassian Scent of Myrrh" } ] },
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Cassian Cornered", add: 10 },
              { loot: "Seal Scrap", add: 6 },
              { loot: "Ivory Index Pin", add: 5 },
              { loot: "Shelf Pattern Sketch", add: 4 },
              { loot: "Cassian Scent of Myrrh", add: 3 },
              { loot: "Stack Access Note", add: 2 }
            ],
            outcomes: [
              { min: 1, max: 25, result: { text: "Cassian smiles and the case goes cold. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 26, max: 80, result: { text: "Cassian's satchel yields a duplicate seal and a sermon about civic virtue. Politics +1. Loot: Archivum Key.", effect: () => { politics += 1; }, loot: "Archivum Key", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 81, max: 100, result: { text: "The scroll is in his satchel with a client list. Politics +2. Loot: Archivum Key, Rhetor Ledger.", effect: () => { politics += 2; }, lootTable: { picks: 2, entries: [ { item: "Archivum Key", weight: 1 }, { item: "Rhetor Ledger", weight: 1 } ] }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } }
            ]
          } },
        { label: "Accuse Keeper Varro",
          condition: { any: [ { loot: "Varro Admission" }, { loot: "Stack Access Note" }, { all: [ { loot: "Acoustic Trace" }, { loot: "Air Shaft Route" }, { loot: "Whisper Direction" } ] } ] },
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Varro Admission", add: 10 },
              { loot: "Whisper Direction", add: 6 },
              { loot: "Acoustic Trace", add: 5 },
              { loot: "Air Shaft Route", add: 5 },
              { loot: "Stack Access Note", add: 4 },
              { loot: "Seal Scrap", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 25, result: { text: "Varro denies it, and his staff circles tight. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 26, max: 80, result: { text: "Varro meets your gaze, then the floor. 'The city needed a patron, not a theft.' He steps down quietly. Politics +2.", effect: () => { politics += 2; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } },
              { min: 81, max: 100, result: { text: "He steps down and hands over a patron ledger. Politics +2. Loot: Patron Ledger.", effect: () => { politics += 2; }, loot: "Patron Ledger", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } }
            ]
          } },
        { label: "Insufficient evidence—seal stacks and audit",
          fixed: { text: "You lock the stacks and announce an audit. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.leaveArchivum } }
      ]
    }
  ]
},

grain_ghost: {
  meta: { tags: ["intrigue","economy","city","mystery"], weight: 1.5, enabled: true },
  steps: [
    {
      text: "Bread lines stretch, but the granary books say the sacks are full. The aedile wants a quiet audit. The clerks call it a grain ghost.",
      cameo: "Dust hangs in the air. A single kernel crunches under your boot like a confession.",
      options: [
        { label: "Audit the tally room",
          fixed: { text: "You open the main ledger and find numbers that do not belong. Loot: Granary Ledger.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Granary Ledger", weight: 1 }, { item: "Grain Ghost: Tally Room", weight: 1 } ] }, nextStep: 1 } },
        { label: "Lean on the foreman",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Archivum Key", add: 6 },
              { badge: "Curator of Secrets", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "He bristles and calls it superstition. Politics -1.", effect: () => { politics -= 1; }, loot: "Grain Ghost: Foreman", nextStep: 1 } },
              { min: 23, max: 78, result: { text: "He sweats and hands over a scrap of tallies. Loot: Tally Shavings.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Tally Shavings", weight: 1 }, { item: "Grain Ghost: Foreman", weight: 1 } ] }, nextStep: 1 } },
              { min: 79, max: 100, result: { text: "He folds and slides a shift list with names and hours. Loot: Shift List.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Shift List", weight: 1 }, { item: "Grain Ghost: Foreman", weight: 1 } ] }, nextStep: 1 } }
            ]
          } },
        { label: "Question the bread line",
          fixed: { text: "A vendor talks about a night cart and a priest's stamp. Loot: Breadline Gossip.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Breadline Gossip", weight: 1 }, { item: "Grain Ghost: Breadline", weight: 1 } ] }, nextStep: 1 } },
        { label: "Pull shipping writs (requires Archivum Key)",
          condition: { loot: "Archivum Key" },
          fixed: { text: "Two deliveries never reached the granary. Loot: Shipping Writ.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Shipping Writ", weight: 1 }, { item: "Grain Ghost: Writs", weight: 1 } ] }, nextStep: 1 } }
      ]
    },
    {
      text: "You can keep digging while the clerks pretend not to watch. Which lead do you want to chase next?",
      options: [
        { label: "Audit the tally room",
          condition: { notLoot: "Grain Ghost: Tally Room" },
          fixed: { text: "You open the main ledger and find numbers that do not belong. Loot: Granary Ledger.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Granary Ledger", weight: 1 }, { item: "Grain Ghost: Tally Room", weight: 1 } ] }, nextStep: 1 } },
        { label: "Lean on the foreman",
          condition: { notLoot: "Grain Ghost: Foreman" },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Archivum Key", add: 6 },
              { badge: "Curator of Secrets", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "He bristles and calls it superstition. Politics -1.", effect: () => { politics -= 1; }, loot: "Grain Ghost: Foreman", nextStep: 1 } },
              { min: 23, max: 78, result: { text: "He sweats and hands over a scrap of tallies. Loot: Tally Shavings.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Tally Shavings", weight: 1 }, { item: "Grain Ghost: Foreman", weight: 1 } ] }, nextStep: 1 } },
              { min: 79, max: 100, result: { text: "He folds and slides a shift list with names and hours. Loot: Shift List.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Shift List", weight: 1 }, { item: "Grain Ghost: Foreman", weight: 1 } ] }, nextStep: 1 } }
            ]
          } },
        { label: "Question the bread line",
          condition: { notLoot: "Grain Ghost: Breadline" },
          fixed: { text: "A vendor talks about a night cart and a priest's stamp. Loot: Breadline Gossip.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Breadline Gossip", weight: 1 }, { item: "Grain Ghost: Breadline", weight: 1 } ] }, nextStep: 1 } },
        { label: "Pull shipping writs (requires Archivum Key)",
          condition: { all: [ { loot: "Archivum Key" }, { notLoot: "Grain Ghost: Writs" } ] },
          fixed: { text: "Two deliveries never reached the granary. Loot: Shipping Writ.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Shipping Writ", weight: 1 }, { item: "Grain Ghost: Writs", weight: 1 } ] }, nextStep: 1 } },
        { label: "Proceed to the ledgers",
          fixed: { text: "You gather your notes and move on to the ledgers.", effect: () => {}, nextStep: 2 } }
      ]
    },
    {
      text: "The ledgers hum with double entries. A draft slides under a back wall. The ghost is a chute.",
      options: [
        { label: "Compare seals to the dock manifest",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Granary Ledger", add: 5 },
              { loot: "Tally Shavings", add: 4 },
              { loot: "Shift List", add: 6 },
              { loot: "Breadline Gossip", add: 3 },
              { loot: "Shipping Writ", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "The seals match. Someone bought new wax. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 23, max: 78, result: { text: "You find a mismatched seal and a fresh wax blend. Loot: Dockside Manifest.", effect: () => {}, loot: "Dockside Manifest", nextStep: 3 } },
              { min: 79, max: 100, result: { text: "You find a mismatched seal and a waxer's note. Loot: Dockside Manifest, Wax Blend Note.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Dockside Manifest", weight: 1 }, { item: "Wax Blend Note", weight: 1 } ] }, nextStep: 3 } }
            ]
          } },
        { label: "Check the chute after dark",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Granary Ledger", add: 4 },
              { loot: "Tally Shavings", add: 3 },
              { loot: "Shift List", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "Only rats and dust. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 23, max: 78, result: { text: "You find a grease smear and a hidden wheel track. Loot: Chute Map.", effect: () => {}, loot: "Chute Map", nextStep: 3 } },
              { min: 79, max: 100, result: { text: "You find the track and a sample log. Loot: Chute Map, Grease Sample Log.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Chute Map", weight: 1 }, { item: "Grease Sample Log", weight: 1 } ] }, nextStep: 3 } }
            ]
          } },
        { label: "Pay a clerk to talk (-40)",
          fixed: { text: "He whispers names and dates. Treasury -40. Loot: Clerk Confession.", effect: () => { treasury -= 40; }, loot: "Clerk Confession", nextStep: 3 } },
        { label: "Decode the ledger (requires Silken Cipher)",
          condition: { loot: "Silken Cipher" },
          fixed: { text: "The math is a mask; the pattern is a route. Loot: Ledger Pattern.", effect: () => {}, loot: "Ledger Pattern", nextStep: 3 } }
      ]
    },
    {
      text: "Three leads, one theft: a dock factor with clean hands, a temple agent with a quiet smile, a private mill that runs too late.",
      options: [
        { label: "Confront the dock factor with papers",
          condition: { any: [ { loot: "Dockside Manifest" }, { loot: "Shipping Writ" } ] },
          fixed: { text: "He cracks and points to a night cart bound for a private mill. Politics +1. Loot: Mill Route.", effect: () => { politics += 1; }, loot: "Mill Route", nextStep: 4 } },
        { label: "Press the dock factor without papers",
          fixed: { text: "He laughs and sends you back to the dust. Politics -1.", effect: () => { politics -= 1; }, nextStep: 4 } },
        { label: "Audit the temple tithe record (requires Temple Favor)",
          condition: { loot: "Temple Favor" },
          fixed: { text: "The record shows grain diverted for 'offerings'. Unrest -1. Loot: Ceres Tithe Record.", effect: () => { unrest = Math.max(0, unrest - 1); }, loot: "Ceres Tithe Record", nextStep: 4 } },
        { label: "Question the temple agent in public",
          fixed: { text: "He blanches and gives a grudging statement. Politics -1. Loot: Ceres Tithe Record.", effect: () => { politics -= 1; }, loot: "Ceres Tithe Record", nextStep: 4 } },
        { label: "Raid the private mill",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Chute Map", add: 4 },
              { loot: "Dockside Manifest", add: 4 },
              { loot: "Clerk Confession", add: 6 },
              { loot: "Shift List", add: 3 },
              { loot: "Ledger Pattern", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "Guards rough you up and toss you out. Treasury -80.", effect: () => { treasury -= 80; }, nextStep: 4 } },
              { min: 23, max: 78, result: { text: "You find a false tally sheet and a hidden scale. Loot: False Tally Sheet.", effect: () => {}, loot: "False Tally Sheet", nextStep: 4 } },
              { min: 79, max: 100, result: { text: "You find the false tally sheet and a mill key. Loot: False Tally Sheet, Mill Key.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "False Tally Sheet", weight: 1 }, { item: "Mill Key", weight: 1 } ] }, nextStep: 4 } }
            ]
          } }
      ]
    },
    {
      text: "The ghost has a name. The choice is yours.",
      options: [
        { label: "Expose the ring at the rostra",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Granary Ledger", add: 6 },
              { loot: "Dockside Manifest", add: 5 },
              { loot: "Clerk Confession", add: 4 },
              { loot: "Ceres Tithe Record", add: 4 },
              { loot: "False Tally Sheet", add: 3 },
              { loot: "Mill Route", add: 3 },
              { loot: "Ledger Pattern", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "Hecklers drown you out and the ring lies low. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true } },
              { min: 23, max: 78, result: { text: "You read the numbers aloud. Bread lines shorten, and enemies take notes. Politics +2, Unrest -1. Badge: Auditor of Ceres. Loot: Audit Docket.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Auditor of Ceres", loot: "Audit Docket", nextStep: null, suppressNextRandom: true } },
              { min: 79, max: 100, result: { text: "The rostra erupts. Politics +3, Unrest -2. Badge: Auditor of Ceres. Loot: Audit Docket, Rostra Seal.", effect: () => { politics += 3; unrest = Math.max(0, unrest - 2); }, badge: "Auditor of Ceres", lootTable: { picks: 2, entries: [ { item: "Audit Docket", weight: 1 }, { item: "Rostra Seal", weight: 1 } ] }, nextStep: null, suppressNextRandom: true } }
            ]
          } },
        { label: "Cut a quiet deal for steady bread",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Mill Route", add: 5 },
              { loot: "Clerk Confession", add: 4 },
              { loot: "Chute Map", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 45, result: { text: "The mill shortchanges you and spreads the cost. Treasury +80, Politics -1.", effect: () => { treasury += 80; politics -= 1; }, nextStep: null, suppressNextRandom: true } },
              { min: 46, max: 80, result: { text: "You trade silence for full sacks. Treasury +250, Politics -1. Loot: Miller IOU.", effect: () => { treasury += 250; politics -= 1; }, loot: "Miller IOU", nextStep: null, suppressNextRandom: true } },
              { min: 81, max: 100, result: { text: "The mill pays heavy to keep you quiet. Treasury +420, Politics -2. Loot: Miller IOU.", effect: () => { treasury += 420; politics -= 2; }, loot: "Miller IOU", nextStep: null, suppressNextRandom: true } }
            ]
          } },
        { label: "Rewrite the ledger and bury the story",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Granary Ledger", add: 5 },
              { loot: "Ledger Pattern", add: 4 },
              { loot: "Shift List", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 22, result: { text: "Your edits leak. Politics -2, Unrest +2.", effect: () => { politics -= 2; unrest += 2; }, nextStep: null, suppressNextRandom: true } },
              { min: 23, max: 78, result: { text: "You fix the books and keep the peace. Unrest +1. Loot: Shadow Ledger.", effect: () => { unrest += 1; }, loot: "Shadow Ledger", nextStep: null, suppressNextRandom: true } },
              { min: 79, max: 100, result: { text: "You rewrite the trail and keep leverage. Politics +1. Loot: Shadow Ledger.", effect: () => { politics += 1; }, loot: "Shadow Ledger", nextStep: null, suppressNextRandom: true } }
            ]
          } }
      ]
    }
  ]
},

night_parade: {
  meta: { tags: ["intrigue","city","stealth","religion"], weight: 1.4, enabled: true },
  steps: [
    {
      text: "A night parade slides through the Subura. Torches, drums, and a jeweled idol that should be in a temple vault.",
      cameo: "Masks grin, coins clink, and the smell of pitch rides the air.",
      options: [
        { label: "Borrow a mask and blend in (-10)",
          fixed: {
            text: "You disappear into the line of faces. Treasury -10. Loot: Parade Mask.",
            effect: () => { treasury -= 10; },
            loot: "Parade Mask",
            nextStep: 1
          }
        },
        { label: "Shadow the parade from the rooftops",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Omen Notes", add: 6 },
              { loot: "Cistern Sketch", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "Loose tiles betray you as they shatter on the cobblestones below. Politics -1. Loot: Rooftops Spotted.", effect: () => { politics -= 1; }, loot: "Rooftops Spotted", nextStep: 1 } },
              { min: 31, max: 70, result: { text: "You catch a torch signal sequence. Loot: Torch Signal Code.", effect: () => {}, loot: "Torch Signal Code", nextStep: 1 } },
              { min: 71, max: 100, result: { text: "You catch the signal and mark a back gate. Loot: Torch Signal Code, Back Gate Map.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Torch Signal Code", weight: 1 }, { item: "Back Gate Map", weight: 1 } ] }, nextStep: 1 } }
            ]
          }
        },
        { label: "Question the priests at the staging lane",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Temple Favor", add: 8 },
              { badge: "Curator of Secrets", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "They brush you off with incense and silence. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 1 } },
              { min: 31, max: 70, result: { text: "A junior acolyte slips you a route scrap. Loot: Procession Route Map.", effect: () => {}, loot: "Procession Route Map", nextStep: 1 } },
              { min: 71, max: 100, result: { text: "You get the route scrap and the carrier list. Loot: Procession Route Map, Procession Roster.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Procession Route Map", weight: 1 }, { item: "Procession Roster", weight: 1 } ] }, nextStep: 1 } }
            ]
          }
        },
        { label: "Invoke Temple Favor for the roster (requires Temple Favor)",
          condition: { loot: "Temple Favor" },
          fixed: { text: "The priests hand you the list of carriers. Loot: Procession Roster.", effect: () => {}, loot: "Procession Roster", nextStep: 1 }
        }
      ]
    },

    {
      text: "Halfway through, the drums change. The line splits. One cart drifts toward a service alley.",
      options: [
        { label: "Follow the offering cart",
          fixed: { text: "You tail the cart at a distance and mark the service alley turn. Loot: Service Alley Mark.", effect: () => {}, loot: "Service Alley Mark", nextStep: 2 }
        },
        { label: "Use Back Gate Map to intercept (requires Back Gate Map)",
          condition: { loot: "Back Gate Map" },
          fixed: { text: "You cut ahead and take position by the back gate before the cart arrives. Politics +1. Loot: Intercept Position.", effect: () => { politics += 1; }, loot: "Intercept Position", nextStep: 2 }
        },
        { label: "Read the drum pattern (requires Omen Notes)",
          condition: { loot: "Omen Notes" },
          fixed: { text: "The rhythm says 'switch' and 'count'. Loot: Drum Signal Notes.", effect: () => {}, loot: "Drum Signal Notes", nextStep: 2 }
        },
        { label: "Check the crowd for cutpurses",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Parade Mask", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "They lift your purse in the crush. Treasury -30.", effect: () => { treasury -= 30; }, nextStep: 2 } },
              { min: 36, max: 75, result: { text: "You corner a pickpocket and he drops a pilfered ring. Treasury +40.", effect: () => { treasury += 40; }, nextStep: 2 } },
              { min: 76, max: 100, result: { text: "You recover a pouch and a signal note. Treasury +90. Loot: Crowd Signal Note.", effect: () => { treasury += 90; }, loot: "Crowd Signal Note", nextStep: 2 } }
            ]
          }
        }
      ]
    },

    {
      text: "The cart slips into a courtyard behind a temple storehouse. A side door waits — and so does a man with a torch who looks like he's counting heads.",
      options: [
        { label: "Slip in with a mask",
          condition: { any: [ { loot: "Parade Mask" }, { loot: "Procession Roster" } ] },
          fixed: { text: "You vanish through the storehouse door as the drums cover your steps. Something glints on the floor. A key...  Loot: Sacred Key.", effect: () => {}, loot: "Sacred Key", nextStep: 3 }
        },
        { label: "Cut through the service tunnel (requires Cistern Sketch)",
          condition: { loot: "Cistern Sketch" },
          fixed: { text: "You take the low road and beat them to the latch. Loot: Tunnel Route.", effect: () => {}, loot: "Tunnel Route", nextStep: 3 }
        },
        { label: "Set a trap at the crossroads",
          fixed: { text: "You plant watchers where the alley forks and mark an exit. Politics +1. Loot: Trap Docket.", effect: () => { politics += 1; }, loot: "Trap Docket", nextStep: 3 }
        },
        { label: "Charge in loud",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Torch Signal Code", add: 4 },
              { loot: "Procession Roster", add: 4 },
              { loot: "Intercept Position", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "Stones fly and the crowd turns. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 31, max: 70, result: { text: "The cloaked figures scatter and one drops a heavy pouch. Treasury +80.", effect: () => { treasury += 80; }, nextStep: 3 } },
              { min: 71, max: 100, result: { text: "The cloaked figures scatter and you seize the alley's take. Treasury +220, Politics +1.", effect: () => { treasury += 220; politics += 1; }, nextStep: 3 } }
            ]
          }
        }
      ]
    },

    {
      text: "Inside the storehouse, lantern light rests on stacked grain sacks. The jeweled idol sits on a crate — and someone in an acolyte hood is already reaching for the latch.",
      cameo: "A second door creaks somewhere deeper in the building. This was never meant to be a one-cart job.",
      options: [
        { label: "Lock the door and corner them (requires Sacred Key)",
          condition: { loot: "Sacred Key" },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Procession Roster", add: 4 },
              { loot: "Drum Signal Notes", add: 3 },
              { loot: "Torch Signal Code", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "The hooded acolyte spits a curse and slips through a rear exit. You keep the idol, but the name escapes. Politics +1. Loot: Recovered Idol.", effect: () => { politics += 1; }, loot: "Recovered Idol", nextStep: 4 } },
              { min: 31, max: 75, result: { text: "You trap them in the lantern light. The idol is safe — and you get a whispered sponsor name. Politics +2. Loot: Recovered Idol, Sponsor Name.", effect: () => { politics += 2; }, lootTable: { picks: 2, entries: [ { item: "Recovered Idol", weight: 1 }, { item: "Sponsor Name", weight: 1 } ] }, nextStep: 4 } },
              { min: 76, max: 100, result: { text: "You trap them and force the hood down. The crowd outside starts chanting. Politics +2, Unrest -1. Loot: Recovered Idol, Sponsor Name, Temple Scandal Notes.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, lootTable: { picks: 3, entries: [ { item: "Recovered Idol", weight: 1 }, { item: "Sponsor Name", weight: 1 }, { item: "Temple Scandal Notes", weight: 1 } ] }, nextStep: 4 } }
            ]
          }
        },
        { label: "Ambush at the exit (requires Trap Docket)",
          condition: { loot: "Trap Docket" },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Intercept Position", add: 3 },
              { loot: "Service Alley Mark", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "Your trap springs late — they slip past in the crush. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 4 } },
              { min: 36, max: 80, result: { text: "You grab the idol carrier and the crate topples. Loot: Recovered Idol.", effect: () => {}, loot: "Recovered Idol", nextStep: 4 } },
              { min: 81, max: 100, result: { text: "You snag the carrier and a wax-stamped token falls free. Loot: Recovered Idol, Parade Docket.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Recovered Idol", weight: 1 }, { item: "Parade Docket", weight: 1 } ] }, nextStep: 4 } }
            ]
          }
        },
        { label: "Slip out the rear and tail the sponsor (requires Tunnel Route)",
          condition: { loot: "Tunnel Route" },
          fixed: { text: "You let the carrier go and follow the money instead. Politics +1. Loot: Sponsor Trail.", effect: () => { politics += 1; }, loot: "Sponsor Trail", nextStep: 4 }
        },
        { label: "Call the acolyte by name (requires Procession Roster)",
          condition: { loot: "Procession Roster" },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Rooftops Spotted", add: -4 },
              { loot: "Torch Signal Code", add: 2 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "He freezes for a heartbeat — then bolts. You keep the idol but lose the face. Loot: Recovered Idol.", effect: () => {}, loot: "Recovered Idol", nextStep: 4 } },
              { min: 36, max: 85, result: { text: "He hesitates, and you get a confession between drumbeats. Politics +1. Loot: Recovered Idol, Temple Scandal Notes.", effect: () => { politics += 1; }, lootTable: { picks: 2, entries: [ { item: "Recovered Idol", weight: 1 }, { item: "Temple Scandal Notes", weight: 1 } ] }, nextStep: 4 } },
              { min: 86, max: 100, result: { text: "He breaks and names the buyer before dawn. Politics +2, Unrest -1. Loot: Recovered Idol, Sponsor Name, Temple Scandal Notes.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, lootTable: { picks: 3, entries: [ { item: "Recovered Idol", weight: 1 }, { item: "Sponsor Name", weight: 1 }, { item: "Temple Scandal Notes", weight: 1 } ] }, nextStep: 4 } }
            ]
          }
        }
      ]
    },

    {
      text: "You have the culprits — or at least the idol — and the crowd's attention. Choose your ending.",
      options: [
        { label: "Expose the thieves in daylight",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Torch Signal Code", add: 4 },
              { loot: "Procession Route Map", add: 4 },
              { loot: "Procession Roster", add: 4 },
              { loot: "Drum Signal Notes", add: 3 },
              { loot: "Trap Docket", add: 3 },
              { loot: "Recovered Idol", add: 6 },
              { loot: "Sponsor Name", add: 4 },
              { loot: "Temple Scandal Notes", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "The crowd turns and the thieves vanish into alleys. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true } },
              { min: 31, max: 70, result: { text: "You turn the parade into a warning. Politics +2, Unrest -1. Badge: Watcher of the Night. Loot: Parade Docket.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Watcher of the Night", loot: "Parade Docket", nextStep: null, suppressNextRandom: true } },
              { min: 71, max: 100, result: { text: "The Subura cheers your name. Politics +3, Unrest -2. Badge: Watcher of the Night. Loot: Parade Docket, Civic Plaque.", effect: () => { politics += 3; unrest = Math.max(0, unrest - 2); }, badge: "Watcher of the Night", lootTable: { picks: 2, entries: [ { item: "Parade Docket", weight: 1 }, { item: "Civic Plaque", weight: 1 } ] }, nextStep: null, suppressNextRandom: true } }
            ]
          }
        },
        { label: "Let them pay restitution quietly",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Parade Mask", add: 3 },
              { loot: "Recovered Idol", add: 4 },
              { loot: "Trap Docket", add: 3 },
              { loot: "Sponsor Name", add: 2 }
            ],
            outcomes: [
              { min: 1, max: 40, result: { text: "The coins are light and the story spreads anyway. Treasury +60, Unrest +1.", effect: () => { treasury += 60; unrest += 1; }, nextStep: null, suppressNextRandom: true } },
              { min: 41, max: 75, result: { text: "Coins change hands and the city sleeps. Treasury +150. Loot: Parade Restitution Token.", effect: () => { treasury += 150; }, loot: "Parade Restitution Token", nextStep: null, suppressNextRandom: true } },
              { min: 76, max: 100, result: { text: "They pay heavy to keep your silence. Treasury +260, Politics -1. Loot: Parade Restitution Token.", effect: () => { treasury += 260; politics -= 1; }, loot: "Parade Restitution Token", nextStep: null, suppressNextRandom: true } }
            ]
          }
        },
        { label: "Recruit them as informants",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Procession Roster", add: 5 },
              { loot: "Recovered Idol", add: 4 },
              { loot: "Tunnel Route", add: 3 },
              { loot: "Sponsor Trail", add: 4 },
              { loot: "Temple Scandal Notes", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 30, result: { text: "They vanish into the alleys. Unrest +1.", effect: () => { unrest += 1; }, nextStep: null, suppressNextRandom: true } },
              { min: 31, max: 70, result: { text: "They keep their masks and start talking to you. Politics +1, Unrest -1. Loot: Informant Roster.", effect: () => { politics += 1; unrest = Math.max(0, unrest - 1); }, loot: "Informant Roster", nextStep: null, suppressNextRandom: true } },
              { min: 71, max: 100, result: { text: "They deliver names and routes by dawn. Politics +2, Unrest -1. Loot: Informant Roster, Informant Ledger.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, lootTable: { picks: 2, entries: [ { item: "Informant Roster", weight: 1 }, { item: "Informant Ledger", weight: 1 } ] }, nextStep: null, suppressNextRandom: true } }
            ]
          }
        }
      ]
    }
  ]
},

harbor_argosy: {
  meta: { tags: ["trade","intrigue","city","smuggling"], weight: 1.5, enabled: true },
  steps: [
    {
      text: "The sun warms morning marble when a sprightly messenger, reeking of sea brine, enters your office. At dawn, an argosy heavy with tonnage nosed into Ostia's port. The manifest is too clean, and the harbor master seeks a discrete investigation.",
      cameo: "The only witnesses are the gulls screaming from the harbor.",
      options: [
        { label: "Inspect the seals and manifest",
          fixed: { text: "The wax is new, but on old paper. Loot: Sealed Manifest.", effect: () => {}, loot: "Sealed Manifest", nextStep: 1 } },
        { label: "Question the captain",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Carthaginian Signet Ring", add: 6 },
              { loot: "Carthaginian Map", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "He smiles toothlessand says nothing. Politics -1.", effect: () => { politics -= 1; }, nextStep: 1 } },
              { min: 36, max: 75, result: { text: "He offers his log to save time. Loot: Captain Log.", effect: () => {}, loot: "Captain Log", nextStep: 1 } },
              { min: 76, max: 100, result: { text: "He offers you the ship's log and a smudged note. Loot: Captain Log, Captain's Note.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Captain Log", weight: 1 }, { item: "Captain's Note", weight: 1 } ] }, nextStep: 1 } }
            ]
          } },
        { label: "Bribe the dockmaster (-60)",
          fixed: { text: "He takes the coin and a warning. Treasury -60. Loot: Harbor Bribe Token.", effect: () => { treasury -= 60; }, loot: "Harbor Bribe Token", nextStep: 1 } },
        { label: "Head to the archivum and check the crew roster.  (requires Archivum Key)",
          condition: { loot: "Archivum Key" },
          fixed: { text: "Their names do not match the docket. Loot: Crew Roster.", effect: () => {}, loot: "Crew Roster", nextStep: 1 } }
      ]
    },
    {
      text: "The cargo says wine, but the barrels reek of resin and iron. Something strange rides this ship.",
      options: [
        { label: "Crack a false amphora",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Sealed Manifest", add: 4 },
              { loot: "Crew Roster", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "A vial shatters, and a gull drops dead. Clear the docks. Unrest +1. Loot: Poisoned Amphora.", effect: () => { unrest += 1; }, loot: "Poisoned Amphora", nextStep: 2 } },
              { min: 36, max: 75, result: { text: "You find a stashed invoice wrapped in wax. Loot: Contraband Invoice.", effect: () => {}, loot: "Contraband Invoice", nextStep: 2 } },
              { min: 76, max: 100, result: { text: "You find a stashed invoice and a forged warehouse seal. Treasury +80. Loot: Contraband Invoice, Forged Warehouse Seal.", effect: () => { treasury += 80; }, lootTable: { picks: 2, entries: [ { item: "Contraband Invoice", weight: 1 }, { item: "Forged Warehouse Seal", weight: 1 } ] }, nextStep: 2 } }
            ]
          } },
        { label: "A night watchman saw a cart slip from the docks. Follow it.",
          fixed: { text: "You trail it to a warehouse on the edge of the city. Loot: Cart Route.", effect: () => {}, loot: "Cart Route", nextStep: 2 } },
        { label: "Match ship marks to foreign records (requires Carthaginian Map or Carthaginian Signet Ring)",
          condition: { any: [ { loot: "Carthaginian Map" }, { loot: "Carthaginian Signet Ring" } ] },
          fixed: { text: "The marks point to the home of a local merchant. Politics +1. Loot: Carthaginian Shipping Record.", effect: () => { politics += 1; }, loot: "Carthaginian Shipping Record", nextStep: 2 } },
        { label: "Signal the harbor watch",
          fixed: { text: "You assign some muscle to the pier. Politics +1.", effect: () => { politics += 1; }, nextStep: 2 } }
      ]
    },
    {
      text: "The cargo trundles into a warehouse, but the door closes too fast to glimpse who waits inside.",
      options: [
        { label: "Intercept the buyers",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Cart Route", add: 4 },
              { loot: "Crew Roster", add: 4 },
              { loot: "Sealed Manifest", add: 4 },
              { loot: "Contraband Invoice", add: 4 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "Smugglers bolt and a crate breaks. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 36, max: 75, result: { text: "You grab a smuggler token who gives name. Politics +1. Loot: Smuggler Token.", effect: () => { politics += 1; }, loot: "Smuggler Token", nextStep: 3 } },
              { min: 76, max: 100, result: { text: "The smugglers bolt but you manage to snag a token and a buyer's ledger. Politics +2. Loot: Smuggler Token, Buyer Ledger.", effect: () => { politics += 2; }, lootTable: { picks: 2, entries: [ { item: "Smuggler Token", weight: 1 }, { item: "Buyer Ledger", weight: 1 } ] }, nextStep: 3 } }
            ]
          } },
        { label: "Flip the night steward (-80)",
          fixed: { text: "He folds and hands you a key. Treasury -80. Loot: Harbor Warehouse Key.", effect: () => { treasury -= 80; }, loot: "Harbor Warehouse Key", nextStep: 3 } },
        { label: "Mark the cargo and let it move",
          fixed: { text: "You follow the money instead of the boat. Politics -1. Loot: Hidden Cargo Invoice.", effect: () => { politics -= 1; }, loot: "Hidden Cargo Invoice", nextStep: 3 } },
        { label: "Use Blackmail Letters to pressure the buyer (requires Blackmail Letters)",
          condition: { loot: "Blackmail Letters" },
          fixed: { text: "A quiet threat opens the ledger. Loot: Harbor Ledger.", effect: () => {}, loot: "Harbor Ledger", nextStep: 3 } }
      ]
    },
    {
      text: "The harbor denizens wait for your verdict.",
      options: [
        { label: "Seize and parade the haul",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Sealed Manifest", add: 4 },
              { loot: "Contraband Invoice", add: 4 },
              { loot: "Harbor Ledger", add: 4 },
              { loot: "Smuggler Token", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "Guilds grumble and the wharf snarls. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true } },
                { cameo: "A merchant's son, a former gladiator, and a noble's daughter all look on with interest." },
              { min: 36, max: 75, result: { text: "You make an example on the wharf. Politics +2, Unrest -1. Badge: Harbor Hawk. Loot: Seized Manifest.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Harbor Hawk", loot: "Seized Manifest", nextStep: null, suppressNextRandom: true } },
              { min: 76, max: 100, result: { text: "Dockworkers cheer as the haul is seized. Politics +3, Unrest -2. Badge: Harbor Hawk. Loot: Seized Manifest, Port Authority Seal.", effect: () => { politics += 3; unrest = Math.max(0, unrest - 2); }, badge: "Harbor Hawk", lootTable: { picks: 2, entries: [ { item: "Seized Manifest", weight: 1 }, { item: "Port Authority Seal", weight: 1 } ] }, nextStep: null, suppressNextRandom: true } }
            ]
          } },
        { label: "Cut a deal and take your cut",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Smuggler Token", add: 4 },
              { loot: "Harbor Bribe Token", add: 4 },
              { loot: "Hidden Cargo Invoice", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 45, result: { text: "The cut is light and someone skims you. Oh well. You'll get them next time. Treasury +80, Politics -2.", effect: () => { treasury += 80; politics -= 2; }, nextStep: null, suppressNextRandom: true } },
              { min: 46, max: 80, result: { text: "The ship sails back to open sea and your purse grows. Treasury +300, Politics -1. Loot: Smuggler IOU.", effect: () => { treasury += 300; politics -= 1; }, loot: "Smuggler IOU", nextStep: null, suppressNextRandom: true } },
                {cameo: "The gulls are quiet now, watching from the masts."},
              { min: 81, max: 100, result: { text: "You take a heavy cut and rumors follow. Treasury +520, Politics -2, Unrest +1. Loot: Smuggler IOU.", effect: () => { treasury += 520; politics -= 2; unrest += 1; }, loot: "Smuggler IOU", nextStep: null, suppressNextRandom: true } }
            ]
          } },
        { label: "Let it pass for a favor owed",
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Harbor Bribe Token", add: 3 },
              { loot: "Harbor Ledger", add: 4 },
              { loot: "Carthaginian Shipping Record", add: 3 }
            ],
            outcomes: [
              { min: 1, max: 35, result: { text: "The rumor bites you. Politics -2, Unrest +2.", effect: () => { politics -= 2; unrest += 2; }, nextStep: null, suppressNextRandom: true } },
              { min: 36, max: 75, result: { text: "You look away and the dock looks back. Politics -1, Unrest +1. Loot: Harbor Favor.", effect: () => { politics -= 1; unrest += 1; }, loot: "Harbor Favor", nextStep: null, suppressNextRandom: true } },
              { min: 76, max: 100, result: { text: "You trade a quiet favor and gain leverage. Politics +1. Loot: Harbor Favor.", effect: () => { politics += 1; }, loot: "Harbor Favor", nextStep: null, suppressNextRandom: true } }
            ]
          } }
      ]
    }
  ]
},

aventine_baths_whodunnit: {
    meta: { tags: ["whodunnit","mystery","intrigue","city"], weight: 1.7, enabled: true },
    steps: [
  {
    text: "Steam rolls across the Aventine baths. A magistrate floats face‑down in the caldarium; a marble sign nearby insists NO RUNNING.",
    cameo: "Attendants wring their hands; a chorus of patrons pretends not to stare. Somewhere, a strigil clatters… twice.",
    options: [
      { label: "Seal the bath",
        fixed: { text: "Doors barred. You control the scene. Loot: Sealed Bath Notice.", effect: () => {}, loot: "Sealed Bath Notice", nextStep: 1 } },
      { label: "Let the attendants work (discreet)",
        fixed: { text: "Business continues in whispers. Loot: Quiet Bath Access.", effect: () => {}, loot: "Quiet Bath Access", nextStep: 1 } }
    ]
  },

  {
    text: "Three suspects stand dripping (and slipping): a debtor rival clutching excuses, a jilted acolyte smelling of temple mint, and a foreign courier guarding a very dignified towel.",
    cameo: "Each claims to have been 'nowhere near the caldarium'—which is odd, because you found them here.",
    options: [
      { label: "Question the debtor about money",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Debt Writ", add: 6 },
            { loot: "Debt Chit (Soggy)", add: 4 }
          ],
          outcomes: [
            { min: 1, max: 35, result: { text: "He bristles and talks in circles. Politics -1.", effect: () => { politics -= 1; }, nextStep: 2 } },
            { min: 36, max: 80, result: { text: "He flashes a fresh debt chit and swears it wasn't his. Loot: Debtor Motive Note.", effect: () => {}, loot: "Debtor Motive Note", nextStep: 2 } },
            { min: 81, max: 100, result: { text: "He slips: the magistrate threatened to seize his villa 'tomorrow'. Loot: Debtor Motive Note, Tomorrow Seizure Threat.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Debtor Motive Note", weight: 1 }, { item: "Tomorrow Seizure Threat", weight: 1 } ] }, nextStep: 2 } }
          ]
        }
      },
      { label: "Probe the acolyte's pride",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Temple Favor", add: 4 },
            { loot: "Temple Mint Oil Residue", add: 4 }
          ],
          outcomes: [
            { min: 1, max: 35, result: { text: "He smiles too politely. 'The temple teaches forgiveness.'", effect: () => {}, nextStep: 2 } },
            { min: 36, max: 80, result: { text: "He snaps at the magistrate's name. Loot: Acolyte Grudge.", effect: () => {}, loot: "Acolyte Grudge", nextStep: 2 } },
            { min: 81, max: 100, result: { text: "He mutters about a public insult 'by the baths' and clutches his oil ampulla. Loot: Acolyte Grudge, Mint Ampulla (Tiny).", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Acolyte Grudge", weight: 1 }, { item: "Mint Ampulla (Tiny)", weight: 1 } ] }, nextStep: 2 } }
          ]
        }
      },
      { label: "Press the courier's route",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Gaulish Spy List", add: 6 },
            { loot: "Foreign Weave Fiber", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 35, result: { text: "He offers only a bow and a sealed mouth. Politics -1.", effect: () => { politics -= 1; }, nextStep: 2 } },
            { min: 36, max: 80, result: { text: "He admits he came 'from the docks'—but the accent says otherwise. Loot: Courier Route Slip.", effect: () => {}, loot: "Courier Route Slip", nextStep: 2 } },
            { min: 81, max: 100, result: { text: "You spot his coffer latch—scratched like it hit a stone edge. Loot: Courier Route Slip, Coffer Latch Scratch.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Courier Route Slip", weight: 1 }, { item: "Coffer Latch Scratch", weight: 1 } ] }, nextStep: 2 } }
          ]
        }
      },
      { label: "Hand out standard‑issue towels (no fashion statements)",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Omen Notes", add: 4 },
            { badge: "Curator of Secrets", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "The towels are damp and dull. Nothing sticks.", effect: () => {}, nextStep: 2 } },
            { min: 26, max: 75, result: { text: "In the scramble, a bright thread snags on your ring. Loot: Foreign Weave Fiber.", effect: () => {}, loot: "Foreign Weave Fiber", nextStep: 2 } },
            { min: 76, max: 100, result: { text: "You catch a bright thread and a mint note. Loot: Foreign Weave Fiber, Temple Mint Oil Residue.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Foreign Weave Fiber", weight: 1 }, { item: "Temple Mint Oil Residue", weight: 1 } ] }, nextStep: 2 } }
          ]
        }
      },
      { label: "Confiscate all oils and soaps into a bucket (-10)",
        fixed: { text: "A frothy mountain of evidence. The top note is temple mint. Treasury -10. Loot: Temple Mint Oil Residue.", effect: () => { treasury -= 10; }, loot: "Temple Mint Oil Residue", nextStep: 2 } }
    ]
  },

  {
    text: "Evidence hunt.",
    cameo: "You need three things: motive, access, and a link to the water—steam hides footprints, but not patterns.",
    options: [
      { label: "Drain the caldarium (-50)",
        fixed: { text: "Scratches scar a tile: a signet dragged toward the steps. Treasury -50. Loot: Signet Scratch.", effect: () => { treasury -= 50; }, loot: "Signet Scratch", nextStep: 3 } },
      { label: "Decode locker tag (requires Silken Cipher)",
        condition: { loot: "Silken Cipher" },
        fixed: { text: "Numbers map to names—and one tag was swapped. Loot: Locker Tallies.", effect: () => {}, loot: "Locker Tallies", nextStep: 3 } },
      { label: "Charcoal rubbing of locker tags (-20)",
        fixed: { text: "Soot and wax give up the numbers, but some are smeared. Loot: Locker Tallies (Partial). Treasury -20.", effect: () => { treasury -= 20; }, loot: "Locker Tallies (Partial)", nextStep: 3 } },
      { label: "Bird-omen timing (requires Omen Notes)",
        condition: { loot: "Omen Notes" },
        fixed: { text: "Birds cried just past dusk—the window narrows. Loot: Dusk Window.", effect: () => {}, loot: "Dusk Window", nextStep: 3 } },
      { label: "Ask the masseur",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Foreign Weave Fiber", add: 4 },
            { loot: "Temple Mint Oil Residue", add: 4 },
            { loot: "Sealed Bath Notice", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "He shrugs and points nowhere. Politics -1.", effect: () => { politics -= 1; }, nextStep: 3 } },
            { min: 26, max: 70, result: { text: "He swears the debtor left early—wet footprints stopped at the frigidarium. Loot: Debtor Alibi.", effect: () => {}, loot: "Debtor Alibi", nextStep: 3 } },
            { min: 71, max: 100, result: { text: "He points at the courier's coffer with a wink. 'Heavy for letters.' Loot: Courier Suspicion, Masseur Note.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Courier Suspicion", weight: 1 }, { item: "Masseur Note", weight: 1 } ] }, nextStep: 3 } }
          ]
        }
      },
      { label: "Check the lost‑and‑found (-10)",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Foreign Weave Fiber", add: 3 },
            { loot: "Temple Mint Oil Residue", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 35, result: { text: "A soggy debt chit stamped with the magistrate’s seal—fresh ink, bad luck. Loot: Debt Chit (Soggy). Treasury -10.", effect: () => { treasury -= 10; }, loot: "Debt Chit (Soggy)", nextStep: 3 } },
            { min: 36, max: 70, result: { text: "An exotic towel fringe stuck to an iron peg—foreign weave, not Roman. Loot: Foreign Weave Fiber. Treasury -10.", effect: () => { treasury -= 10; }, loot: "Foreign Weave Fiber", nextStep: 3 } },
            { min: 71, max: 100, result: { text: "A tiny clay ampulla smelling of temple mint—someone dropped it in a hurry. Loot: Temple Mint Oil Residue. Treasury -10.", effect: () => { treasury -= 10; }, loot: "Temple Mint Oil Residue", nextStep: 3 } }
          ]
        }
      },
      { label: "Follow the drip trail with a broom",
        fixed: { text: "You map a comic zigzag of wet footprints. They detour by the lockers, then cut back toward the caldarium. Loot: Slip Pattern Map.", effect: () => {}, loot: "Slip Pattern Map", nextStep: 3 } },
      { label: "Sniff the mint closer (requires Temple Mint Oil Residue)",
        condition: { loot: "Temple Mint Oil Residue" },
        fixed: { text: "The mint is cut with incense resin—temple blend, not street oil. Loot: Temple Blend (Mint+Incense).", effect: () => {}, loot: "Temple Blend (Mint+Incense)", nextStep: 3 } }
    ]
  },

  {
    text: "Press the alibis.",
    cameo: "Now the fun part: make the clues collide until something breaks.",
    options: [
      { label: "Cross-check with Gaulish Spy List (requires Gaulish Spy List)",
        condition: { loot: "Gaulish Spy List" },
        fixed: { text: "The courier’s name appears—spelled wrong on purpose. That means it’s real. Loot: Courier Cover Name.", effect: () => {}, loot: "Courier Cover Name", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation }
      },
      { label: "Pull the magistrate's writ (requires Archivum Key)",
        condition: { loot: "Archivum Key" },
        fixed: { text: "Debt tallies scream motive. The debtor was due to lose everything at dawn. Loot: Debt Writ.", effect: () => {}, loot: "Debt Writ", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation }
      },
      { label: "Flash Blackmail Letters (requires Blackmail Letters)",
        condition: { loot: "Blackmail Letters" },
        fixed: { text: "The acolyte's pride cracks; he shakes. Loot: Acolyte Confession.", effect: () => {}, loot: "Acolyte Confession", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation }
      },
      { label: "Reconstruct timeline with attendants",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Slip Pattern Map", add: 4 },
            { loot: "Locker Tallies", add: 4 },
            { loot: "Locker Tallies (Partial)", add: 3 },
            { loot: "Signet Scratch", add: 3 },
            { loot: "Dusk Window", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "The attendants contradict each other; you salvage warm sand from the hourglass. Loot: Hourglass Sand (Warm).", effect: () => {}, loot: "Hourglass Sand (Warm)", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } },
            { min: 26, max: 75, result: { text: "Incense ash clings to a towel hook by the apodyterium—someone leaned there after the steam. Loot: Incense Ash on Towel.", effect: () => {}, loot: "Incense Ash on Towel", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } },
            { min: 76, max: 100, result: { text: "A ledger page near the bath edge is warped and wet at the corner—pulled from a coffer in a rush. Loot: Wet Ledger Corner, Attendant Statement.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Wet Ledger Corner", weight: 1 }, { item: "Attendant Statement", weight: 1 } ] }, nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } }
          ]
        }
      },
      { label: "Stage a reenactment—“exactly as you were!”",
        roll: {
          sides: 100,
          modifiers: [
            { stat: "politics", scale: 1 },
            { loot: "Slip Pattern Map", add: 3 },
            { loot: "Foreign Weave Fiber", add: 3 },
            { loot: "Temple Mint Oil Residue", add: 3 },
            { loot: "Coffer Latch Scratch", add: 3 }
          ],
          outcomes: [
            { min: 1, max: 30, result: { text: "A pratfall montage later, you’ve learned very little—except morale is up. Politics +1.", effect: () => { politics += 1; }, nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } },
            { min: 31, max: 75, result: { text: "You produce a steam‑timing board with chalk marks between rooms. Loot: Steam‑Timing Board.", effect: () => {}, loot: "Steam‑Timing Board", nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } },
            { min: 76, max: 100, result: { text: "You produce the board and a mop-mark diagram—someone tried to erase a detour by the lockers. Loot: Steam‑Timing Board, Mop-Mark Diagram.", effect: () => {}, lootTable: { picks: 2, entries: [ { item: "Steam‑Timing Board", weight: 1 }, { item: "Mop-Mark Diagram", weight: 1 } ] }, nextStep: 4, continueLabel: EVENT_TREE_STRINGS.continueLabels.proceedAccusation } }
          ]
        }
      },
      { label: "Detain all; reconvene at dawn",
        fixed: { text: "You seal the doors and post guards. Whispers ripple through Rome. Politics -1, Unrest +1. Loot: Whispered Scandal.", effect: () => { politics -= 1; unrest += 1; }, loot: "Whispered Scandal", nextStep: null, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths, suppressNextRandom: true }
      }
    ]
  },

  {
    text: "Name the killer.",
    cameo: "Pick a suspect—and let the evidence do the stabbing.",
    options: [
      { label: "Accuse the debtor",
        condition: { all: [
          { any: [ { loot: "Debt Writ" }, { loot: "Debt Chit (Soggy)" }, { loot: "Debtor Motive Note" }, { loot: "Tomorrow Seizure Threat" } ] },
          { any: [ { loot: "Signet Scratch" }, { loot: "Locker Tallies" }, { loot: "Locker Tallies (Partial)" }, { loot: "Slip Pattern Map" }, { loot: "Wet Ledger Corner" }, { loot: "Attendant Statement" } ] },
          { not: { loot: "Debtor Alibi" } }
        ] },
        roll: {
          sides: 100,
          modifiers: [
            { loot: "Debt Writ", add: 8 },
            { loot: "Debtor Motive Note", add: 6 },
            { loot: "Tomorrow Seizure Threat", add: 5 },
            { loot: "Debt Chit (Soggy)", add: 4 },
            { loot: "Signet Scratch", add: 5 },
            { loot: "Locker Tallies", add: 3 },
            { loot: "Locker Tallies (Partial)", add: 2 },
            { loot: "Slip Pattern Map", add: 3 },
            { loot: "Wet Ledger Corner", add: 3 },
            { loot: "Attendant Statement", add: 3 },
            { badge: "Curator of Secrets", add: 2 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "He laughs it off and the baths whisper. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 26, max: 80, result: { text: "He breaks. Politics +2, Unrest -1. Badge: Eyes of Minerva. Loot: Bath Seal Token.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Eyes of Minerva", loot: "Bath Seal Token", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 81, max: 100, result: { text: "He breaks and pays restitution. Politics +2, Unrest -2. Badge: Eyes of Minerva. Loot: Bath Seal Token, Debt Scrip.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 2); }, badge: "Eyes of Minerva", lootTable: { picks: 2, entries: [ { item: "Bath Seal Token", weight: 1 }, { item: "Debt Scrip", weight: 1 } ] }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } }
          ]
        }
      },

      { label: "Accuse the acolyte",
        condition: { all: [
          { any: [ { loot: "Acolyte Confession" }, { loot: "Acolyte Grudge" }, { loot: "Temple Blend (Mint+Incense)" }, { loot: "Incense Ash on Towel" } ] },
          { any: [ { loot: "Temple Mint Oil Residue" }, { loot: "Mint Ampulla (Tiny)" }, { loot: "Temple Favor" } ] }
        ] },
        roll: {
          sides: 100,
          modifiers: [
            { loot: "Acolyte Confession", add: 8 },
            { loot: "Acolyte Grudge", add: 6 },
            { loot: "Temple Blend (Mint+Incense)", add: 6 },
            { loot: "Incense Ash on Towel", add: 5 },
            { loot: "Temple Mint Oil Residue", add: 4 },
            { loot: "Mint Ampulla (Tiny)", add: 3 },
            { loot: "Steam‑Timing Board", add: 2 },
            { loot: "Mop-Mark Diagram", add: 2 },
            { loot: "Dusk Window", add: 2 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "He denies and the temple closes ranks. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 26, max: 80, result: { text: "He confesses between sobs. Politics +1.", effect: () => { politics += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 81, max: 100, result: { text: "He confesses and names a sponsor. Politics +2. Loot: Temple Favor.", effect: () => { politics += 2; }, loot: "Temple Favor", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } }
          ]
        }
      },

      { label: "Accuse the courier",
        condition: { all: [
          { any: [ { loot: "Courier Suspicion" }, { loot: "Masseur Note" }, { loot: "Courier Cover Name" }, { loot: "Gaulish Spy List" } ] },
          { any: [ { loot: "Foreign Weave Fiber" }, { loot: "Coffer Latch Scratch" }, { loot: "Wet Ledger Corner" }, { loot: "Courier Route Slip" } ] }
        ] },
        roll: {
          sides: 100,
          modifiers: [
            { loot: "Courier Cover Name", add: 7 },
            { loot: "Courier Suspicion", add: 6 },
            { loot: "Masseur Note", add: 4 },
            { loot: "Gaulish Spy List", add: 6 },
            { loot: "Foreign Weave Fiber", add: 4 },
            { loot: "Coffer Latch Scratch", add: 5 },
            { loot: "Courier Route Slip", add: 3 },
            { loot: "Wet Ledger Corner", add: 3 },
            { loot: "Slip Pattern Map", add: 2 },
            { loot: "Steam‑Timing Board", add: 2 }
          ],
          outcomes: [
            { min: 1, max: 25, result: { text: "He slips away in the steam. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 26, max: 80, result: { text: "He bolts; lictors catch him. Politics +2. Loot: Whispered Scandal.", effect: () => { politics += 2; }, loot: "Whispered Scandal", nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } },
            { min: 81, max: 100, result: { text: "You seize the coffer; names spill out. Politics +2, Unrest -1. Loot: Whispered Scandal, Courier Coffer Seal.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, lootTable: { picks: 2, entries: [ { item: "Whispered Scandal", weight: 1 }, { item: "Courier Coffer Seal", weight: 1 } ] }, nextStep: null, suppressNextRandom: true, continueLabel: EVENT_TREE_STRINGS.continueLabels.closeBaths } }
          ]
        }
      },

      { label: "Insufficient evidence—dismiss the case for now",
        fixed: { text: "With proof thin and tempers high, you dismiss the assembly—this time. Politics -2, Unrest +1.", effect: () => { politics -= 2; unrest += 1; }, nextStep: null, continueLabel: "Leave the Baths", suppressNextRandom: true } }
    ]
  }
]
  },

  censors_chain: {
    meta: { tags: ["intrigue","errands","politics","city"], weight: 1.6, enabled: true },
    steps: [
      {
        text: "You have a day off from Senatorial duties and are headed to your favorite peristyle for a leisurely picnic. You've barely stepped onto the street, basket in hand and attendants in tow, when a lictor bows. 'The Censor requests your service today.'",
        cameo: "The wax on his rod is still warm.",
        options: [
          { label: "Accept the summons with a sigh. ", fixed: { text: "With a whistful look at your meal, you  signal your clerk and follow. The wine will have to wait.", effect: () => {}, nextStep: 1 } },
          { label: "Decline - You've got... urgent Senate business, and all that...", fixed: { text: "The lictor leaves with a thin smile.", effect: () => {}, nextStep: null, continueLabel: "Close the Door", suppressNextRandom: true } }
        ]
      },
      {
        text: "Task 1: Head to the Temple of Saturn. Review some collections in the aerarium and seal the tax roll.",
        options: [
          { label: "Use Sealed Laurel Case (requires Sealed Laurel Case)", condition: { loot: "Sealed Laurel Case" }, fixed: { text: "Clerks part like water. Politics +1.", effect: () => { politics += 1; }, nextStep: 2 } },
          { label: "Bribe some novice scribes (-100)", fixed: { text: "Ink flows faster when oiled. Treasury -100.", effect: () => { treasury -= 100; }, nextStep: 2 } },
          { label: "Argue the merits until the quaestor offers to do the job.",
            roll: {
              sides: 100,
              modifiers: [
                { stat: "politics", scale: 1 },
                { loot: "Sealed Laurel Case", add: 6 },
                { badge: "Curator of Secrets", add: 6 }
              ],
              outcomes: [
                { min: 1, max: 45, result: { text: "A lecture about process gets you out quick. Politics -1.", effect: () => { politics -= 1; }, nextStep: 2 } },
                { min: 46, max: 85, result: { text: "Your logic sticks. Politics +1.", effect: () => { politics += 1; }, nextStep: 2 } },
                { min: 86, max: 100, result: { text: "Your logic sticks; you pocket a stamped chit for later. Politics +1.", effect: () => { politics += 1; }, lootTable: { silent: true, entries: [ { item: "Worksite Pass", weight: 3 }, { item: "Foreman Token", weight: 2 } ] }, nextStep: 2 } }
              ]
            }
          }
        ]
      },
      {
        text: "Task 2: Quiet a noisy street orator.",
        options: [
          { label: "Counter-speech (bonus if Jester Diplomat or Pater Ridiculus)",
            roll: {
              sides: 100,
              modifiers: [
                { stat: "politics", scale: 1 },
                { badge: "Jester Diplomat", add: 8 },
                { badge: "Pater Ridiculus", add: 8 }
              ],
              outcomes: [
                { min: 1, max: 45, result: { text: "Your words stumble. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
                { min: 46, max: 85, result: { text: "Laughter breaks the tension. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } },
                { min: 86, max: 100, result: { text: "The crowd turns; the orator climbs down. Politics +2.", effect: () => { politics += 2; }, nextStep: 3 } }
              ]
            }
          },
          { label: "Show him an Official Summons (requires Official Summons)", condition: { loot: "Official Summons" }, fixed: { text: "The orator bows and scurries off the crate.", effect: () => {}, nextStep: 3 } },
          { label: "Hire some urchins to cheer madly(-30)", fixed: { text: "Chanting drowns rhetoric. Treasury -30.", effect: () => { treasury -= 30; }, nextStep: 3 } }
        ]
      },
      {
        text: "Task 3: Inspect an aqueduct crew reported to have become unruly.",
        options: [
          { label: "Produce Engineer's Plans (requires Engineer's Plans)", condition: { loot: "Engineer's Plans" }, fixed: { text: "A sham repair unmasked. Unrest -1.", effect: () => { unrest = Math.max(0, unrest - 1); }, nextStep: 4 } },
          { label: "Skim some savings (risky)",
            roll: {
              sides: 100,
              modifiers: [
                { stat: "politics", scale: 1 },
                { anyLoot: ["Worksite Pass", "Foreman Token"], add: 8 },
                { badge: "Master Builder", add: 6 }
              ],
              outcomes: [
                { min: 1, max: 50, result: { text: "Word spreads. Politics -2.", effect: () => { politics -= 2; }, nextStep: 4 } },
                { min: 51, max: 85, result: { text: "You skim a few denarii. Treasury +120.", effect: () => { treasury += 120; }, nextStep: 4 } },
                { min: 86, max: 100, result: { text: "The purse grows heavier. Treasury +320.", effect: () => { treasury += 320; }, nextStep: 4 } }
              ]
            }
          },
          { label: "Offer dove sacrifice to the completion of the arches (-25)", fixed: { text: "Piety soothes tempers. Treasury -25, Politics +1.", effect: () => { treasury -= 25; politics += 1; }, nextStep: 4 } }
        ]
      },
      {
        text: "Task 4: Deliver a sealed letter.",
        options: [
          { label: "Take the service tunnels (requires Cistern Sketch)", condition: { loot: "Cistern Sketch" }, fixed: { text: "Musty in there, but shortcuts save the day.", effect: () => {}, nextStep: 5 } },
          { label: "Send via banquet (requires Silken Cipher)", condition: { loot: "Silken Cipher" }, fixed: { text: "A coded aside reveals a favor owed. Loot: Censor's Favor.", effect: () => {}, loot: "Censor's Favor", nextStep: 5 } },
          { label: "Order a clerk to hoof it (slow)",
            roll: {
              sides: 100,
              modifiers: [
                { stat: "politics", scale: 1 },
                { anyLoot: ["Worksite Pass", "Foreman Token"], add: 4 }
              ],
              outcomes: [
                { min: 1, max: 50, result: { text: "The Censor waits. Politics -1.", effect: () => { politics -= 1; }, nextStep: 5 } },
                { min: 51, max: 100, result: { text: "Arrived—barely in time.", effect: () => {}, nextStep: 5 } }
              ]
            }
          }
        ]
      },
      {
        text: "Evening audit at the Censor's table.",
        options: [
          { label: "Report your day's activities, with some embellishments", fixed: { text: "He nods, marking a short line in his ledger.", effect: () => {}, nextStep: null } }
        ],
        // Step-level wrap scoring
        condition: undefined
      }
    ]
  }
,  consular_campaign: {
    meta: { tags: ["politics","intrigue","city","election"], weight: 1.9, enabled: true },
    steps: [
      {
        text: "An empty rostra at dawn. Elections are afoot.By dusk, the lectern will carry your name—or someone else's. How will you declare?",
        cameo: "Criers warm their voices; clients watch your eyes.",
        options: [
          {
            label: "Announce in the Forum with bread and speeches (-150)",
            fixed: { text: "Loaves break, cheers rise. Treasury -150, Politics +1. Loot: Campaign Momentum.", effect: () => { treasury -= 150; politics += 1; }, loot: "Campaign Momentum", nextStep: 1 }
          },
          {
            label: "Quiet filing through the censors (requires Censor's Favor)",
            condition: { loot: "Censor's Favor" },
            fixed: { text: "Wax seals, nods, a curt smile. Politics +1. Loot: Censor Endorsement.", effect: () => { politics += 1; }, loot: "Censor Endorsement", nextStep: 1 }
          },
          {
            label: "Populist march with guild banners (-100, Unrest -1)",
            fixed: { text: "Guild drums answer your step. Treasury -100, Unrest -1.", effect: () => { treasury -= 100; unrest = Math.max(0, unrest - 1); }, nextStep: 1 }
          }
        ]
      },
      {
        text: "Rivals emerge: Aemilia (patrician favorite), Vibius (populist tribune), Sabinus (pious reformer). Who do you engage first?",
        options: [
          {
            label: "Offer Aemilia a respectable alliance (stronger if you hold Praenestine Contract Seal or Bath Seal Token)",
            condition: { anyLoot: ["Praenestine Contract Seal","Bath Seal Token"] },
            fixed: { text: "Old favors open old doors. Loot: Alliance - Aemilia.", effect: () => {}, loot: "Alliance - Aemilia", nextStep: 2 }
          },
          {
            label: "Outflank Vibius with a dole plan (stronger if Breadbringer or Grain IOU)",
            condition: { any: [ { badge: "Breadbringer" }, { loot: "Grain IOU" } ] },
            fixed: { text: "You turn the bread lines into a pledge. Politics +1. Loot: Populist Outreach.", effect: () => { politics += 1; }, loot: "Populist Outreach", nextStep: 2 }
          },
          {
            label: "Match Sabinus's piety with a public vow (-50)",
            fixed: { text: "Oil on the altar, eyes on you. Treasury -50. Loot: Temple Favor.", effect: () => { treasury -= 50; }, loot: "Temple Favor", nextStep: 2 }
          }
        ]
      },
      {
        text: "Fund the machine—or starve it. Your war chest?",
        options: [
          {
            label: "Patrician banquet (-200, Politics +1)",
            fixed: { text: "Crystal clinks; pledges follow. Treasury -200, Politics +1.", effect: () => { treasury -= 200; politics += 1; }, nextStep: 3 }
          },
          {
            label: "Small-donor drive (better if Neighborly or Bread Hero)",
            condition: { any: [ { badge: "Neighborly" }, { badge: "Bread Hero" } ] },
            fixed: { text: "Street tables, warm smiles. Politics +2, Treasury +50.", effect: () => { politics += 2; treasury += 50; }, nextStep: 3 }
          },
          {
            label: "Accept shadow money (+300, Politics -1)",
            fixed: { text: "A sealed chest appears at midnight. Treasury +300, Politics -1. Loot: Shady Donor IOU.", effect: () => { treasury += 300; politics -= 1; }, loot: "Shady Donor IOU", nextStep: 3 }
          }
        ]
      },
      {
        text: "First debates in the basilica. What's your line of attack?",
        options: [
          {
            label: "Aboveboard: argue policy and calm tempers",
            rng: [
              { min: 1, max: 65, result: { text: "Steady, credible, a touch dull—voters nod. Politics +1.", effect: () => { politics += 1; }, nextStep: 4 } },
              { min: 66, max: 100, result: { text: "You land a clean blow; Sabinus wobbles. Politics +2. Loot: Sabinus Stumbles.", effect: () => { politics += 2; }, loot: "Sabinus Stumbles", nextStep: 4 } }
            ]
          },
          {
            label: "Cunning: leak a ledger via Archivum (requires Archivum Key or Silken Cipher)",
            condition: { anyLoot: ["Archivum Key","Silken Cipher"] },
            fixed: { text: "Figures whisper louder than words. Aemilia falters. Politics +1. Loot: Aemilia Undercut.", effect: () => { politics += 1; }, loot: "Aemilia Undercut", nextStep: 4 }
          },
          {
            label: "Stage a cheering section (-30)",
            fixed: { text: "Chants swell; Vibius scowls. Treasury -30. Loot: Ward Choir.", effect: () => { treasury -= 30; }, loot: "Ward Choir", nextStep: 4 }
          }
        ]
      },
      {
        text: "A smear pamphlet hits the streets: you, a spendthrift and a schemer. Response?",
        options: [
          {
            label: "Refute with receipts (requires Archivum Key or Silken Cipher)",
            condition: { anyLoot: ["Archivum Key","Silken Cipher"] },
            fixed: { text: "You publish the books. The crowd shrugs at the smear. Politics +1.", effect: () => { politics += 1; }, nextStep: 5 }
          },
          {
            label: "Counter-slander Vibius (requires Blackmail Letters)",
            condition: { loot: "Blackmail Letters" },
            fixed: { text: "Whispers find their mark. Vibius loses ground. Politics -1, Unrest +1. Loot: Burned Bridges.", effect: () => { politics -= 1; unrest += 1; }, loot: "Burned Bridges", nextStep: 5 }
          },
          {
            label: "Ignore it; keep knocking doors",
            rng: [
              { min: 1, max: 60, result: { text: "Mud slides off; work wins hearts. Politics +1.", effect: () => { politics += 1; }, nextStep: 5 } },
              { min: 61, max: 100, result: { text: "The rumor sticks a little. Politics -1.", effect: () => { politics -= 1; }, nextStep: 5 } }
            ]
          }
        ]
      },
      {
        text: "Eve of election. Get-out-the-vote plan?",
        options: [
          {
            label: "Hire carts to ferry elders (-120, Unrest -1)",
            fixed: { text: "Wheels turn; elders wave. Treasury -120, Unrest -1.", effect: () => { treasury -= 120; unrest = Math.max(0, unrest - 1); }, nextStep: 6 }
          },
          {
            label: "Temple procession with Sabinus's choir (requires Temple Favor)",
            condition: { loot: "Temple Favor" },
            fixed: { text: "Hymns lift the streets. Politics +1.", effect: () => { politics += 1; }, nextStep: 6 }
          },
          {
            label: "Ward bosses handle turnout (-200)",
            fixed: { text: "Knocks, nods, and narrow alleys. Treasury -200. Loot: Ward Markers.", effect: () => { treasury -= 200; }, loot: "Ward Markers", nextStep: 6 }
          }
        ]
      },
      {
        text: "Tally sticks clack. You win. Now—what kind of victory is it?",
        options: [
          {
            label: "Unity mandate (requires Alliance - Aemilia or Populist Outreach)",
            condition: { anyLoot: ["Alliance - Aemilia","Populist Outreach"] },
            fixed: { text: "You seat rivals at your table. Politics +2, Unrest -1. Badge: Consul Elect. Loot: Broad Mandate.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Consul Elect", loot: "Broad Mandate", nextStep: null }
          },
          {
            label: "Govern through favors (requires Shady Donor IOU)",
            condition: { loot: "Shady Donor IOU" },
            fixed: { text: "Ledgers of promises weigh your desk. Politics +3, Unrest +1. Badge: Consul Elect. Loot: Owed Favor Marker.", effect: () => { politics += 3; unrest += 1; }, badge: "Consul Elect", loot: "Owed Favor Marker", nextStep: null }
          },
          {
            label: "Hardline victory (requires Burned Bridges or Ward Markers)",
            condition: { anyLoot: ["Burned Bridges","Ward Markers"] },
            fixed: { text: "You rule with a tight grip. Politics +2, Unrest +2. Badge: Consul Elect.", effect: () => { politics += 2; unrest += 2; }, badge: "Consul Elect", nextStep: null }
          },
          {
            label: "Clean hands, clean start (no special conditions)",
            fixed: { text: "You bow on the rostra; the city exhales. Politics +2, Unrest -1. Badge: Consul Elect.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Consul Elect", nextStep: null }
          }
        ]
      }
    ]
  }
,
shady_donor_iou_collect: {
  meta: {
    tags: ["politics","intrigue","city","blackmail"],
    weight: 1.3,
    enabled: true,
    requires: { loot: "Shady Donor IOU" }
  },
  steps: [
    // Step 0 — The collector arrives
    {
      text: "You’re leaving the Forum when a man in a plain cloak steps into your path like he’s been waiting all day. He doesn’t bow. He doesn’t threaten. He just holds up a waxed tablet with your name scratched into the corner.\n\n“The donor sends greetings,” he says. “And a reminder.”",
      cameo: "His ring is not gold—iron, stamped with a laurel that looks *almost* official. Behind him, two “porters” stand too still.",
      options: [
        {
          label: "Take the tablet and read it",
          fixed: {
            text: "The wax seal is intact. The IOU is simple: one favor, tonight. A vote, a contract, a silence—he doesn’t care which, as long as it *hurts someone else.* Loot: Collector's Wax Seal.",
            effect: () => {},
            loot: "Collector's Wax Seal",
            nextStep: 1
          }
        },
        {
          label: "Pretend you don’t recognize the debt (stall)",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Blackmail Letters", add: 6 },
              { loot: "Secret Cache", add: 5 }
            ],
            outcomes: [
              {
                min: 1, max: 35,
                result: {
                  text: "He smiles like a knife. “Then we’ll explain it louder.” The porters step closer. Politics -1, Unrest +1.",
                  effect: () => { politics -= 1; unrest += 1; },
                  nextStep: 1
                }
              },
              {
                min: 36, max: 80,
                result: {
                  text: "He buys the stall. “Fine. Midnight. Temple steps.” Loot: Midnight Rendezvous.",
                  effect: () => {},
                  loot: "Midnight Rendezvous",
                  nextStep: 1
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "You trap him in his own politeness. He slips and names the donor’s steward. Loot: Steward Name.",
                  effect: () => {},
                  loot: "Steward Name",
                  nextStep: 1
                }
              }
            ]
          }
        },
        {
          label: "Pay coin to clear it now (-200)",
          fixed: {
            text: "You count out the silver and watch his eyes measure you. He pockets it without gratitude. The debt is cleared—but your name will still be on someone’s lips. Treasury -200. Politics +1.",
            effect: () => {
              treasury -= 200;
              politics += 1;
              window.inventory = window.inventory || [];
              window.inventory = window.inventory.filter(i => i !== "Shady Donor IOU");
            },
            nextStep: null,
            suppressNextRandom: true,
            continueLabel: "Walk Away"
          }
        },
        {
          label: "Refuse outright (dangerous)",
          rng: [
            {
              min: 1, max: 55,
              result: {
                text: "He nods once. The next day, a whisper campaign blooms: you’re “unreliable.” Politics -2, Unrest +1.",
                effect: () => { politics -= 2; unrest += 1; },
                nextStep: 1
              }
            },
            {
              min: 56, max: 100,
              result: {
                text: "He misjudges you. You misjudge him back. A bystander recognizes the ring and mutters a name. Loot: Donor Rumor.",
                effect: () => {},
                loot: "Donor Rumor",
                nextStep: 1
              }
            }
          ]
        }
      ]
    },

    // Step 1 — What does the donor want?
    {
      text: "The collector finally states the ask: tonight you must either (1) push a minor contract vote, (2) bury a complaint in the Archivum, or (3) publicly “misplace” blame onto a rival.\n\nHe doesn’t care which. He only cares that you *choose*.",
      cameo: "He watches your hands, not your face—like he expects you to reach for a knife or a stylus.",
      options: [
        {
          label: "Play along: take the contract vote (safe, dirty)",
          fixed: {
            text: "You nod once. He hands you a slate with three names to support and one to crush. Loot: Rigged Vote Slate.",
            effect: () => {},
            loot: "Rigged Vote Slate",
            nextStep: 2
          }
        },
        {
          label: "Play along: bury the complaint (requires Archivum Key)",
          condition: { loot: "Archivum Key" },
          fixed: {
            text: "You agree to make paper disappear. He looks relieved—too relieved. Loot: Complaint Docket.",
            effect: () => {},
            loot: "Complaint Docket",
            nextStep: 2
          }
        },
        {
          label: "Turn it into a sting (requires Informant Ledger or Informant Roster)",
          condition: { anyLoot: ["Informant Ledger","Informant Roster"] },
          fixed: {
            text: "You smile and ask where to meet—like you’re obedient. Then you send two shadows ahead. Loot: Sting Plan.",
            effect: () => {},
            loot: "Sting Plan",
            nextStep: 2
          }
        },
        {
          label: "Threaten him with your own leverage (requires Blackmail Letters or Secret Cache)",
          condition: { anyLoot: ["Blackmail Letters","Secret Cache"] },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Blackmail Letters", add: 8 },
              { loot: "Secret Cache", add: 6 },
              { loot: "Collector's Wax Seal", add: 3 }
            ],
            outcomes: [
              {
                min: 1, max: 35,
                result: {
                  text: "He laughs softly. “You think you’re the first senator with dirt?” The porters shift. Politics -1.",
                  effect: () => { politics -= 1; },
                  nextStep: 2
                }
              },
              {
                min: 36, max: 80,
                result: {
                  text: "His throat tightens. “Fine.” He offers a compromise: half the favor, twice the silence. Treasury +80 (hush money). Loot: Hush Coins.",
                  effect: () => { treasury += 80; },
                  loot: "Hush Coins",
                  nextStep: 2
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "He breaks. “It’s not him—it’s the steward. The donor doesn’t even know what’s signed.” Loot: Steward Confession.",
                  effect: () => {},
                  loot: "Steward Confession",
                  nextStep: 2
                }
              }
            ]
          }
        }
      ]
    },

    // Step 2 — Night move (thrill + clue)
    {
      text: "Night comes. The city’s lamps turn Rome into a maze of gold and shadow. The “favor” is a corridor with teeth: whichever path you chose, someone is watching to make sure you do it.",
      cameo: "A footstep behind you… then none. A smell of myrrh, then cold stone.",
      options: [
        {
          label: "Do the dirty work fast (minimize damage)",
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Rigged Vote Slate", add: 4 },
              { loot: "Complaint Docket", add: 4 }
            ],
            outcomes: [
              {
                min: 1, max: 35,
                result: {
                  text: "You rush it and slip. The wrong clerk sees. Politics -1, Unrest +1.",
                  effect: () => { politics -= 1; unrest += 1; },
                  nextStep: 3
                }
              },
              {
                min: 36, max: 80,
                result: {
                  text: "You do it clean. The donor’s pressure eases—for now. Treasury +60 (a “thank you”).",
                  effect: () => { treasury += 60; },
                  nextStep: 3
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "You do it clean and notice the watcher’s ring: laurel iron with a nicked edge. Loot: Ring Sketch.",
                  effect: () => {},
                  loot: "Ring Sketch",
                  nextStep: 3
                }
              }
            ]
          }
        },
        {
          label: "Shadow the watcher instead (requires Midnight Rendezvous or Donor Rumor or Steward Name)",
          condition: { anyLoot: ["Midnight Rendezvous","Donor Rumor","Steward Name"] },
          roll: {
            sides: 100,
            modifiers: [
              { stat: "politics", scale: 1 },
              { loot: "Midnight Rendezvous", add: 5 },
              { loot: "Steward Name", add: 6 },
              { loot: "Donor Rumor", add: 3 }
            ],
            outcomes: [
              {
                min: 1, max: 35,
                result: {
                  text: "You lose him in a knot of alleys. A stone hits your shoulder. Unrest +1.",
                  effect: () => { unrest += 1; },
                  nextStep: 3
                }
              },
              {
                min: 36, max: 80,
                result: {
                  text: "He leads you to a courtyard where a steward swaps wax seals like dice. Loot: Steward Seal Swap.",
                  effect: () => {},
                  loot: "Steward Seal Swap",
                  nextStep: 3
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "You catch the handoff—and the buyer’s name. Loot: Donor’s Steward Ledger.",
                  effect: () => {},
                  loot: "Donor’s Steward Ledger",
                  nextStep: 3
                }
              }
            ]
          }
        },
        {
          label: "Spring your sting (requires Sting Plan)",
          condition: { loot: "Sting Plan" },
          rng: [
            {
              min: 1, max: 40,
              result: {
                text: "Your men arrive late. The collector slips away—but drops a wax token. Loot: Donor Wax Token.",
                effect: () => {},
                loot: "Donor Wax Token",
                nextStep: 3
              }
            },
            {
              min: 41, max: 85,
              result: {
                text: "You catch one porter and he sings fast. Politics +1. Loot: Porter Testimony.",
                effect: () => { politics += 1; },
                loot: "Porter Testimony",
                nextStep: 3
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "You catch the collector *and* the steward’s runner. Politics +2. Loot: Porter Testimony, Steward Seal Swap.",
                effect: () => { politics += 2; },
                lootTable: {
                  picks: 2,
                  entries: [
                    { item: "Porter Testimony", weight: 1 },
                    { item: "Steward Seal Swap", weight: 1 }
                  ]
                },
                nextStep: 3
              }
            }
          ]
        }
      ]
    },

    // Step 3 — Payoff: clear the IOU, flip it, or become owned by it
    {
      text: "Dawn. You stand at the edge of the city’s noise with one question: do you end the debt, weaponize it, or let it own you?",
      options: [
        {
          label: "Burn the IOU publicly (requires Donor’s Steward Ledger or Porter Testimony)",
          condition: { anyLoot: ["Donor’s Steward Ledger","Porter Testimony"] },
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Donor’s Steward Ledger", add: 8 },
              { loot: "Porter Testimony", add: 6 },
              { loot: "Collector's Wax Seal", add: 3 },
              { stat: "politics", scale: 1 }
            ],
            outcomes: [
              {
                min: 1, max: 30,
                result: {
                  text: "The donor’s allies howl and muddy the story. Politics -1, Unrest +1. The IOU vanishes… but so does your peace.",
                  effect: () => { politics -= 1; unrest += 1; window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
                  nextStep: null,
                  suppressNextRandom: true
                }
              },
              {
                min: 31, max: 80,
                result: {
                  text: "You read names aloud. The steward folds. Politics +2, Unrest -1. Badge: Debts Repaid. Loot: Archivum Key.",
                  effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
                  badge: "Debts Repaid",
                  loot: "Archivum Key",
                  nextStep: null,
                  suppressNextRandom: true
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "You shatter the whole machine. Politics +3, Unrest -2. Badge: Debts Repaid. Loot: Patron Ledger.",
                  effect: () => { politics += 3; unrest = Math.max(0, unrest - 2); window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
                  badge: "Debts Repaid",
                  loot: "Patron Ledger",
                  nextStep: null,
                  suppressNextRandom: true
                }
              }
            ]
          }
        },
        {
          label: "Flip the debt back onto the donor (requires Blackmail Letters or Secret Cache)",
          condition: { anyLoot: ["Blackmail Letters","Secret Cache"] },
          roll: {
            sides: 100,
            modifiers: [
              { loot: "Blackmail Letters", add: 7 },
              { loot: "Secret Cache", add: 6 },
              { loot: "Steward Confession", add: 4 },
              { loot: "Ring Sketch", add: 3 },
              { stat: "politics", scale: 1 }
            ],
            outcomes: [
              {
                min: 1, max: 35,
                result: {
                  text: "He calls your bluff. The pressure doubles. Politics -2, Unrest +1.",
                  effect: () => { politics -= 2; unrest += 1; },
                  nextStep: null,
                  suppressNextRandom: true
                }
              },
              {
                min: 36, max: 80,
                result: {
                  text: "He pays to make it stop. Treasury +220, Politics -1. Loot: Donor Leverage Token.",
                  effect: () => { treasury += 220; politics -= 1; window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
                  loot: "Donor Leverage Token",
                  nextStep: null,
                  suppressNextRandom: true
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "He flinches. You gain a standing “favor” in reverse—he owes *you.* Treasury +300. Badge: Debt Collector. Loot: Donor Leverage Token.",
                  effect: () => { treasury += 300; window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
                  badge: "Debt Collector",
                  loot: "Donor Leverage Token",
                  nextStep: null,
                  suppressNextRandom: true
                }
              }
            ]
          }
        },
        {
          label: "Pay quietly and make it vanish (cleaner than war) (-120)",
          fixed: {
            text: "A smaller sum changes hands. The collector nods. The debt dissolves like smoke—leaving only the smell. Treasury -120. Politics +1.",
            effect: () => {
              treasury -= 120;
              politics += 1;
              window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU");
            },
            nextStep: null,
            suppressNextRandom: true
          }
        },
        {
          label: "Become owned by it (accept ongoing patronage)",
          fixed: {
            text: "You don’t fight it. You sign the invisible contract Rome runs on. Treasury +150 now… and your name becomes a handle. Politics +2, Unrest +1. Loot: Patron’s Chain.",
            effect: () => { treasury += 150; politics += 2; unrest += 1; window.inventory = (window.inventory||[]).filter(i => i !== "Shady Donor IOU"); },
            loot: "Patron’s Chain",
            badge: "Bought and Sold",
            nextStep: null,
            suppressNextRandom: true
          }
        }
      ]
    }
  ]
}
,
  grain_dole_crisis: {
    meta: { tags: ["adventure","economy"], weight: 1.0, enabled: true },
    steps: [
      {
        text: "Hungry citizens languish in the bread lines. Rome grows restless as grain ships are delayed by bad weather and worse trade negotiations. The dole of yesteryear now strains the treasury.",
        cameo: "A crier shouts, 'Bread for the people!'",
        options: [
          {
            label: "Cut the dole by a third (+300 denarii, +2 unrest)",
            fixed: {
              text: "You trim the dole. Riots nearly spark, but the teasuries start to replenish. Treasury +300, Unrest +2.",
              effect: () => { treasury += 300; unrest += 2; },
              nextStep: 1
            }
          },
          {
            label: "Maintain the dole to avoid angering the mob (cost 150)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "You keep the dole steady. The anxiety of the mob is alleviated, for now. Treasury -150, Politics +1, Unrest -1.",
                  effect: () => { treasury -= 150; politics += 1; unrest = Math.max(0, unrest - 1); },
                  nextStep: 1
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "You are cheered in the forum. Treasury -150, Politics +2, Unrest -2. Badge: Breadbringer.",
                  effect: () => { treasury -= 150; politics += 2; unrest = Math.max(0, unrest - 2); },
                  badge: "Breadbringer",
                  nextStep: 1
                }
              }
            ]
          },
          {
            label: "You call in some favors owed to you by senators whose reputations you spared during a recent public investigation. Together, pool from your personal stores to increase the the dole - if ever so slightly.  (cost 500)",
            fixed: {
              text: "You increase distributions. The priestesses of Vesta make offerings to your name for a week. Treasury -500, Unrest -4, Politics +2. Loot: Grain IOU.",
              effect: () => { treasury -= 500; unrest = Math.max(0, unrest - 4); politics += 2; },
              loot: "Grain IOU",
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "A week passes and breard lines still stretch across Rome. A cousin visiting from Ostia tells you merchants are whispering rumors of hoarding grain shipments and price-fixing.",
        options: [
          {
            label: "Crack down on the culprits with a small army of lictors (cost 250)",
            rng: [
              {
                min: 1, max: 55,
                result: {
                  text: "Your plan backfires as your hired goons raid the wrong storehouse. The black market merchants scatter. Unrest +1, Politics -2, Treasury -250.",
                  effect: () => { unrest += 1; politics -= 1; treasury -= 250; },
                  nextStep: null,
                  continueLabel: "Return to Rome."
                }
              },
              {
                min: 56, max: 100,
                result: {
                  text: "Your hired goons seize seeral hidden grain caches. Unrest -2, Treasury -200. Badge: A Firm Hand.",
                  effect: () => { unrest = Math.max(0, unrest - 2); treasury -= 50; },
                  badge: "A Firm Hand",
                  nextStep: null,
                  continueLabel: "Back to business..."
                }
              }
            ]
          },
          {
            label: "Quietly buy off key merchants to plot against the others (cost 400)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Your 'consortium' of muscle flips control of two warehouses. Grain prices dip and tempers cool to a simmer. After costs, you clear a tidy margin—and a ridiculous nickname sticks when your goons accidentally corner the chickpea stalls. Treasury +620 net, Politics +1, Unrest -1. Loot: Merchant Ledger. (🏅Badge: Hummus Maximus)",
                  effect: () => { treasury -= 400; treasury += 620; politics += 1; unrest -= 1; },
                  badge: "Hummus Maximus",
                  loot: "Merchant Ledger",
                  nextStep: null,
                  continueLabel: "Count the Profits"
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "The scheme leaks. Bakers are spooked and shout sabotage while bread riots tear through the Subura. Stalls burn, grain litters the stones, and your allies vanish. Treasury -600, Politics -2, Unrest +3. (🏅Badge: Riot Scapegoat)",
                  effect: () => { treasury -= 600; politics -= 2; unrest += 3; },
                  badge: "Riot Scapegoat",
                  nextStep: null,
                  continueLabel: "Flee the Forum and Lay Low for a While"
                }
              }
            ]
          },
          {
            label: "Ignore it",
            fixed: {
              text: "You look away. This is Rome, afterall. Hunger is an important pasttime. The plebians in the forum grumble and their bellies rumble. Unrest +2, Politics -1.",
              effect: () => { unrest += 2; politics -= 1; },
              nextStep: null,
              continueLabel: "Let it Pass"
            }
          }
        ]
      }
    ]
  },

  augur_omens: {
    meta: { tags: ["mystery","intrigue"], weight: 1.1, enabled: true },
    steps: [
      {
        text: "Auspices at Dawn: Vultures wheel above the Capitoline. Business in the forum halts as people look up and watch for signs.",
        cameo: "A young augur mutters, 'Left is ill, right is fortune. Left is ill, right is fortune...'",
        options: [
          {
            label: "Head toward your favorite augur. He's busy working a crowd of slackjawed plebs. You push to the the front of the line and consult him. (-75 denarii)",
            rng: [
              {
                min: 1, max: 55,
                result: {
                  text: "The augur frowns. 'These omens are muddled. The gods are discontent.' Treasury -75, Politics -1.",
                  effect: () => { treasury -= 75; politics -= 1; },
                  nextStep: 1
                }
              },
              {
                min: 56, max: 100,
                result: {
                  text: "The augur smiles: 'Fortune favors Rome's favorite young senator' Treasury -75, Politics +1. Badge: Favored by the Birds.",
                  effect: () => { treasury -= 75; politics += 1; },
                  badge: "Favored by the Birds",
                  nextStep: 1
                }
              }
            ]
          },
          {
            label: "Bribe a street seer (-25 denarii)",
            fixed: {
              text: "He rattles a wooden bowl of of-are those cat bones?- and hisses some nonsense. You get what you pay for. Treasury -25. Loot: Fake Augury Bones.",
              effect: () => { treasury -= 25; },
              loot: "Fake Augury Bones",
              nextStep: 1
            }
          },
          {
            label: "Interpret the birds' flight yourself and make a speech to the crowd.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "You miscount the number of carrion and a bystander shouts out the mistake. The oration is unconvincing. Rumors swirl about your abilities. Unrest +2.",
                  effect: () => { unrest += 2; },
                  nextStep: 1
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "Your speech convinces. A thoughtful hush descends on the forum as citizens consider your insights. You receive an invitation to join the Augur's guild for wine afterward. Politics +1, Unrest -1.",
                  effect: () => { politics += 1; unrest -= 1; },
                  nextStep: 1
                }
              }
            ]
          }
        ]
      },
      {
        text: "The weight of the morning prognostications hang on your shoulders as you walk to the Senate. What will you do with these portents?",
        options: [
          {
            label: "Announce the favorable omens to the Senate",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Skeptics scoff and your claims fall flat. You're laughed back to your seat. Politics -1.",
                  effect: () => { politics -= 1; },
                  nextStep: null,
                  continueLabel: "Leave the Curia"
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "The chamber hushes and your words carry. Politics +2. Badge: Expert Auspician.",
                  effect: () => { politics += 2; },
                  badge: "Expert Auspician ",
                  nextStep: null,
                  continueLabel: "Accept the cheers and leave the Curia"
                }
              }
            ]
          },
          {
            label: "Keep the omens to yourself and bide your time",
          fixed: {
            text: "You note the vultures' patterns for later leverage. (Intrigue +1). Loot: Omen Notes.",
            effect: () => { /* +1 intrigue if tracked */ },
            loot: "Omen Notes",
            nextStep: null,
            continueLabel: "Tuck Away Notes",
            suppressNextRandom: true
          }
          },
          {
            label: "Sell the secret omen to a rival (+200 denarii, -1 politics)",
            fixed: {
              text: "A quiet exchange by the rostra nets you coin. Treasury +200, Politics -1. Badge: Feathered Capitalist.",
              effect: () => { treasury += 200; politics -= 1; },
              badge: "Feathered Capitalist",
              nextStep: null,
              continueLabel: "Pocket the Coin"
            }
          }
        ]
      }
    ]
  },

  aqueduct_collapse: {
    meta: { tags: ["adventure","city"], weight: 1.0, enabled: true },
    steps: [
      {
        text: "Aqueduct Collapse: A great arch buckles and water spills into the streets.",
        cameo: "An aedile pleads, 'We need funds now for the city thirsts!'",
        options: [
          {
            label: "Fund emergency repairs (-350 denarii)",
            fixed: {
              text: "Crews swarm the arches. Treasury -350, Unrest -2. Loot: Engineer's Plans.",
              effect: () => { treasury -= 300; unrest = Math.max(0, unrest - 2); },
              loot: "Engineer's Plans",
              nextStep: 1
            }
          },
          {
            label: "Blame the aedile for negligence",
            fixed: {
              text: "You roar about negligence. Politics +1, Unrest +1.",
              effect: () => { politics += 1; unrest += 1; },
              nextStep: 1
            }
          },
          {
            label: "Offer prayers instead (-25 denarii)",
            fixed: {
              text: "The crowd watches you sacrifice a white dove and intone about the will of the gods. Treasury -25.",
              effect: () => { treasury -= 25; },
              nextStep: 1
            }
          },
          {
            label: "Commission a cistern survey (-80 denarii)",
            fixed: {
              text: "Surveyors scratch a map of lower conduits and cisterns. Treasury -80. Loot: Cistern Sketch.",
              effect: () => { treasury -= 80; },
              loot: "Cistern Sketch",
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "Water Rationing: How do you stabilize the city?",
        options: [
          {
            label: "Ration strictly. Also, it's bring your own amphora, limit one per sandal, to the fountains from now on.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "Queues surge and tempers flare. Unrest +2, Politics -1.",
                  effect: () => { unrest += 2; politics -= 1; },
                  nextStep: null,
                  continueLabel: "Hold the Line"
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "Order holds. Inexplicably, seeing as this is Rome. Unrest -1, Politics +1.",
                  effect: () => { unrest = Math.max(0, unrest - 1); politics += 1; },
                  nextStep: null,
                  continueLabel: "Open the Conduits"
                }
              }
            ]
          },
          {
            label: "Hire water carts (-230 denarii)",
            fixed: {
              text: "Your teams deliver water to the poorer districts. Treasury -230, Unrest -2.",
              effect: () => { treasury -= 150; unrest = Math.max(0, unrest - 1); },
              nextStep: null,
              continueLabel: "Dismiss the Crews"
            }
          },
          {
            label: "Throw a public ceremony to inspire hope. (-50 denarii)",
            fixed: {
              text: "Priests bless the broken arches; people are parched, but their spirits lift a little. Treasury -50, Politics +1.",
              effect: () => { treasury -= 50; politics += 1; },
              nextStep: null,
              continueLabel: "Back to Work"
            }
          }
        ]
      }
    ]
  }
  , bakers_dawn: {
    meta: { tags: ["slice","adventure"], weight: 0.9, enabled: true },
    steps: [
      {
        text: "Baker’s Dawn: You wake early for market, eager to buy the city’s freshest bread before a day at Senate. The bakery is swamped, the line is long, and the smell of warm loaves drives the crowd wild. Suddenly, a burly legionary cuts to the front, barking that he’s owed the first loaf for defending Rome. What do you do?",
        cameo: "The baker shrugs helplessly, 'First come, first served…unless you have a sword?'",
        options: [
          {
            label: "Step in and challenge the legionary’s rudeness—no one’s above the law.",
            rng: [
              {
                min: 1, max: 40,
                result: {
                  text: "He shoves you aside, the crowd snickers, and you pay for a dropped loaf. -75 denarii, -1 politics.",
                  effect: () => { treasury -= 75; politics -= 1; },
                  nextStep: 1
                }
              },
              {
                min: 41, max: 90,
                result: {
                  text: "With the crowd’s rousing support, the legionary stands down. The baker winks at you. +1 politics. 🏅Badge: Protector of the Queue.",
                  effect: () => { politics += 1; },
                  badge: "Protector of the Queue",
                  nextStep: 2
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "The legionary takes a swing at you. The crowd roars as you slam the soldier’s fist down—he laughs and buys you breakfast. +2 politics. 🗡️Loot: Champion’s Crust.",
                  effect: () => { politics += 2; },
                  loot: "Champion’s Crust",
                  nextStep: 3
                }
              }
            ]
          },
          {
            label: "Quietly let him cut, then slip a coin to the baker for an extra loaf.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "The baker smuggles you a crusty end piece. Not fancy, but it’s yours. -10 denarii. 🗡️Loot: Burnt Loaf.",
                  effect: () => { treasury -= 10; },
                  loot: "Burnt Loaf",
                  nextStep: 4
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "The baker gives you an extra honey cake, and a friendly nod. 🗡️Loot: Honey Cake, 🏅Badge: Neighborly.",
                  effect: () => {},
                  loot: "Honey Cake",
                  badge: "Neighborly",
                  nextStep: 5
                }
              }
            ]
          },
          {
            label: "Rally the crowd to start singing an old ballad about bread riots.",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "It works until someone bumps your purse, and a little unrest brews in the forum. +1 unrest, -20 denarii.",
                  effect: () => { unrest += 1; treasury -= 20; },
                  nextStep: 6
                }
              },
              {
                min: 61, max: 90,
                result: {
                  text: "The people cheer and order is restored, just in time for sunrise. +1 politics, -1 unrest.",
                  effect: () => { politics += 1; unrest -= 1; },
                  nextStep: 7
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "Children chant your name as you leave with a signature bun. 🏅Badge: Bread Hero, 🗡️Loot: Senatorial Bun.",
                  effect: () => {},
                  badge: "Bread Hero",
                  loot: "Senatorial Bun",
                  nextStep: 7
                }
              }
            ]
          }
        ]
      },
      // Senate arrival branches:
      {
        text: "A senator sniffs, 'You smell like flour and chaos.' You shrink in your seat and dream of better breakfasts.",
        options: [{ label: "Continue", fixed: { text: "You resolve to eat earlier tomorrow.", effect: () => {} } }]
      },
      {
        text: "A senator whispers, 'Well done! Someone has to keep order.' The baker’s son at the Senate winks at you.",
        options: [{ label: "Continue", fixed: { text: "Your bread is warm and your spirits high.", effect: () => {} } }]
      },
      {
        text: "A senator booms, 'A champion among us!' Your ‘Champion’s Crust’ becomes the talk of the Curia.",
        options: [{ label: "Continue", fixed: { text: "You share crumbs and win favor with the plebs.", effect: () => { politics += 1; } } }]
      },
      {
        text: "You eat your burnt loaf in the Senate’s back row. A friendly baker’s son sneaks you a fresh roll.",
        options: [{ label: "Continue", fixed: { text: "Sometimes patience pays off after all.", effect: () => { unrest -= 1; } } }]
      },
      {
        text: "The senator next to you gives you a honey cake salute. Sweetness makes the debates tolerable.",
        options: [{ label: "Continue", fixed: { text: "You feel camaraderie and a sugar rush.", effect: () => {} } }]
      },
      {
        text: "You count your coins, but everyone is smiling. Even the legionary gives you a nod.",
        options: [{ label: "Continue", fixed: { text: "For one morning, Rome is at peace.", effect: () => { politics += 1; } } }]
      },
      {
        text: "Kids keep peeking in the Senate gallery, calling your name. The baker promises your bun will be famous for years.",
        options: [{ label: "Continue", fixed: { text: "A senator asks for your secret: 'Yeast—and a bit of luck.'", effect: () => { politics += 2; } } }]
      }
    ]
  }
,
// --- EVENT: diplomatic_crisis_carthage ---
// To trigger: startRandomEventTree("diplomatic_crisis_carthage")
// Narrative trigger: mid- or late-game, or after unrest spike/major loss
// --- EVENT: diplomatic_crisis_carthage ---
diplomatic_crisis_carthage: {
  meta: { tags: ["adventure","intrigue","diplomacy"], weight: 1.3, enabled: true },
  steps: [
    // Step 1: The Mission Begins
    {
      text: "Rome’s northern front trembles as Carthaginian war elephants appear on the horizon. The Senate selects you as part of an urgent delegation to negotiate—or stall for time. You arrive at the enemy camp, where the Carthaginian general, veiled in blue, greets you with a sly grin. How do you open the talks?",
      cameo: "The scent of foreign spices mixes with the putrid Roman fear.",
      options: [
        {
          label: "Open with a bold offer of Roman grain and gold for peace.",
          rng: [
            {
              min: 1, max: 40,
              result: {
                text: "The general scoffs. 'Rome’s gold? Is it as soft as your senators?' +2 unrest, -1 politics.",
                effect: () => { unrest += 2; politics -= 1; },
                nextStep: 1
              }
            },
            {
              min: 41, max: 85,
              result: {
                text: "The general ponders your pliability and counters with an 'exchange of hostages.' Will you accept, refuse, or propose a contest of riddles?",
                effect: () => {},
                nextStep: 2
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "The general is impressed and offers a banquet in your honor. 🏅Badge: Silver-Tongued.",
                effect: () => {},
                badge: "Silver-Tongued",
                nextStep: 3
              }
            }
          ]
        },
        {
          label: "Try to read the general’s intentions by observing the camp.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You notice mercenary Gauls lurking at the edge of camp—Carthage plans a surprise attack. 🗡️Loot: Gaulish Spy List.",
                effect: () => {},
                loot: "Gaulish Spy List",
                nextStep: 3
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You spot a hidden Roman prisoner among the Carthaginian tents. It's the lost general of the northern armies! You may choose to try a rescue or leverage for the negotiation.",
                effect: () => {},
                nextStep: 4
              }
            }
          ]
        },
        {
          label: "Make a sly joke about Carthaginian elephants to break the ice.",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "The general’s face darkens. 'Rome sends fools.' -2 politics, +1 unrest.",
                effect: () => { politics -= 2; unrest += 1; },
                nextStep: 5
              }
            },
            {
              min: 51, max: 100,
              result: {
                text: "He laughs heartily, calling for wine. 'You may have more sense than your consul!' +1 politics, 🏅Badge: Jester Diplomat.",
                effect: () => { politics += 1; },
                badge: "Jester Diplomat",
                nextStep: 6
              }
            }
          ]
        }
      ]
    },
    // Step 2: Hostage exchange
    {
      text: "The general has suggested an exchange of hostages. Do you:",
      options: [
        {
          label: "Accept the exchange (risk Roman lives, but buy time)",
          fixed: {
            text: "The Carthaginians take your junior envoy. Rome hesitates, but you gain a week of peace. +1 intrigue.",
            effect: () => { /* +1 intrigue */ },
            nextStep: 7
          }
        },
        {
          label: "Refuse the exchange (anger the general)",
          fixed: {
            text: "The general scowls, and the elephants trumpet ominously. +2 unrest.",
            effect: () => { unrest += 2; },
            nextStep: 8
          }
        },
        {
          label: "Propose a contest of riddles instead.",
          fixed: {
            text: "The general grins—he loves riddles! The camp gathers for a battle of wits.",
            effect: () => {},
            nextStep: 9
          }
        }
      ]
    },
    // Step 3: Banquet
    {
      text: "At the banquet, the general grows tipsy. You didn't take him for a lush. Will you:",
      options: [
        {
          label: "Toast to eternal peace—try to charm the Carthaginians further.",
          fixed: {
            text: "You dazzle the camp with Roman wit. 🏅Badge: Cunning Fox, +2 politics.",
            effect: () => { politics += 2; },
            badge: "Cunning Fox"
          }
        },
        {
          label: "Get the general drunk, then sneak away to spy.",
          fixed: {
            text: "You trip into a tent and discover a map of their planned attack route. While it's still dark you steal away to the city and prepare Rome's defenses.  🗡️Loot: Carthaginian Map.",
            effect: () => {},
            loot: "Carthaginian Map"
          }
        }
      ]
    },
    // Step 4: Gaulish spy list
    {
      text: "You have the list of Gaulish spies. Will you:",
      options: [
        {
          label: "Secretly warn Rome.",
          fixed: {
            text: "Your warning saves Roman outposts, but breaks the truce. +2 unrest.",
            effect: () => { unrest += 2; }
          }
        },
        {
          label: "Use it to blackmail the general.",
          fixed: {
            text: "The general caves to your demands. The great enemies of Rome slink away across the alps, guaranteed to return someday. But that day is not today. 🏅Badge: Negotiator.",
            effect: () => {politics += 2; unrest -= 1; },
            badge: "Negotiator"
          }
        }
      ]
    },
    // Step 5: Hidden prisoner
    {
      text: "Do you attempt a daring rescue at night, or use the knowledge as a bargaining chip?",
      options: [
        {
          label: "Daring rescue to go with your dashing looks.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You are nearly caught! You barely escape, empty-handed. +2 unrest, -200 denarii.",
                effect: () => { unrest += 2; treasury -= 200; }
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You free the Roman general. He later saves you in the Senate. 🗡️Loot: Carthaginian Signet Ring, +1 politics.",
                effect: () => { politics += 1; },
                loot: "Carthaginian Signet Ring"
              }
            }
          ]
        },
        {
          label: "Leverage for negotiation.",
          fixed: {
            text: "You gain a minor concession at the peace table. +1 politics.",
            effect: () => { politics += 1; }
          }
        }
      ]
    },
    // Step 6: Offended general
    {
      text: "The Carthaginian general has been insulted by your weak show of wartime mettle. The talks collapse.",
      options: [
        {
          label: "Return to Rome in disgrace.",
          fixed: {
            text: "You are mocked in the Senate for your failed diplomacy. -2 politics.",
            effect: () => { politics -= 2; }
          }
        }
      ]
    },
    // Step 7: Jester general
    {
      text: "At the festival, the general insists you perform more jokes. Will you:",
      options: [
        {
          label: "Play along and keep spirits high.",
          fixed: {
            text: "Your antics become schticks of legend—Carthage delays their invasion for a festival. 🏅Badge: Festival Fool.",
            effect: () => {},
            badge: "Festival Fool"
          }
        },
        {
          label: "Push your luck and insult the general again.",
          fixed: {
            text: "It appears to have worked; he general laugh! He then orders your execution. You escape by the skin of your teeth. 🏅Badge: Deadpan Survivor.",
            effect: () => {},
            badge: "Deadpan Survivor"
          }
        }
      ]
    },
    // Step 8: Hostage peace
    {
      text: "Rome gains a week to prepare. The city braces for whatever comes next.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You are quietly thanked for your sacrifice.",
            effect: () => {}
          }
        }
      ]
    },
    // Step 9: Angered general
    {
      text: "The Carthaginians march! You bring word in time to defend the city, but unrest soars in Rome.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "Your warnings are not enough. +2 unrest.",
            effect: () => { unrest += 2; }
          }
        }
      ]
    },
    // Step 10: Riddle/Joke Contest (Latin Dad Jokes!)
    {
      text: "You face the general in a battle of wits. 'Let us see if Roman wit matches Roman steel. Tell me a joke—if I laugh, Rome wins a year of peace. If not, we attack at dawn.'",
      options: [
        {
          label: '“Why did the Roman chicken cross the Via Appia?”',
          fixed: {
            text: 'The general blinks. You explain: “You see, our roads are so good, even chickens travel first class!” He laughs, shaking his head. +1 intrigue. 🏅Badge: Pater Ridiculus.',
            effect: () => { /* +1 intrigue */ },
            badge: "Pater Ridiculus"
          }
        },
        {
          label: '“Quid est melius quam aurum?” (“What is better than gold?”)',
          fixed: {
            text: 'The general rolls his eyes. You add: “It’s wordplay, you see—aurum means gold, but amicum means friend!” He snorts. +1 politics. 🏅Badge: Golden Tongue.',
            effect: () => { politics += 1; },
            badge: "Golden Tongue"
          }
        },
        {
          label: '“Did you hear about the Roman senator who brought a sword to a peace talk?”',
          fixed: {
            text: '“He left with a salad—because he was caesar’d!” The general looks confused. You over-explain: “Julius Caesar, you know—the guy with the knives? It’s a pun!” The Carthaginians groan, but the general is impressed by your shameless delivery. 🏅Badge: Knife Jester, 🗡️Loot: Table Knife.',
            effect: () => { },
            badge: "Knife Jester",
            loot: "Table Knife"
          }
        }
      ]
    }
  ]
},
street_urchins: {
  meta: { tags: ["city","adventure"], weight: 0.8, enabled: true },
  steps: [
    {
      text: "You've put on your finest robe and are walking to the senate for a debate on grain policy. Suddenly, you're surrounded by a throng of street urchins asking you for money. What do you do?",
      cameo: "A bold urchin tugs your sleeve: 'Senator, spare a coin?'",
      options: [
        {
          label: "Take out your coin purse and shower them with sesterces. 'Non nobis solum nati sumus.'",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "The urchins scatter, coins in hand, and your name is sung at dinner tables across the city. -100 denarii, +1 politics. 🏅Badge: Benevolent Senator.",
                effect: () => { treasury -= 100; politics += 1; },
                badge: "Benevolent Senator",
                nextStep: 1
              }
            },
            {
              min: 51, max: 85,
              result: {
                text: "One clever child relieves you of your purse, but you win the crowd’s admiration for your humor about it. -200 denarii, -1 unrest. 🗡️Loot: Stolen Purse.",
                effect: () => { treasury -= 200; unrest = Math.max(0, unrest-1); },
                loot: "Stolen Purse",
                nextStep: 2
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "You agree to sponsor an orphanage; the street children call you ‘Papa Senator’ for weeks. -500 denarii, +2 politics. 🏅Badge: Patron of the Poor.",
                effect: () => { treasury -= 500; politics += 2; },
                badge: "Patron of the Poor",
                nextStep: 3
              }
            }
          ]
        },
        {
          label: "Shoo the filthy things away. You're an important person with a busy schedule.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Their hurt looks trail you to the Senate. By sundown, the city’s rumor mill has churned out new stories of your cruelty. +1 unrest, -1 politics.",
                effect: () => { unrest += 1; politics -= 1; },
                nextStep: 4
              }
            },
            {
              min: 61, max: 85,
              result: {
                text: "A brave child throws a rotten fig at you. -1 politics. 🏅Badge: Fig-Target.",
                effect: () => { politics -= 1; },
                badge: "Fig-Target",
                nextStep: 5
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "You trip over an urchin and tear your fine robe. -100 denarii, -1 politics. 🗡️Loot: Torn Robe.",
                effect: () => { treasury -= 100; politics -= 1; },
                loot: "Torn Robe",
                nextStep: 6
              }
            }
          ]
        }
      ]
    },
    // Next steps based on result:
    // Step 1: Generous giving
    {
      text: "At the Senate, a grizzled senator laughs, “Throwing coins to the plebs again, eh? Careful, or they’ll want you on the ballot!” (+1 politics)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You nod graciously and take your seat.",
            effect: () => { politics += 1; }
          }
        }
      ]
    },
    // Step 2: Pickpocketed
    {
      text: "The Senate erupts in laughter as you recount your morning. But one old patrician slips you a gold coin, 'For luck.' (+100 denarii, -1 politics, 🗡️Loot: Lucky Coin)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You pocket the coin and try to regain your dignity.",
            effect: () => { treasury += 100; politics -= 1; },
            loot: "Lucky Coin"
          }
        }
      ]
    },
    // Step 3: Papa Senator
    {
      text: "You are greeted as ‘Papa Senator’ and gain favor with the Pleb Faction.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "A young senator says, 'Your popularity grows by the day.'",
            effect: () => { /* could add favor token here */ }
          }
        }
      ]
    },
    // Step 4: Shooed them away (negative gossip)
    {
      text: "A corpulent senator claps you on the back. 'Good! The city needs a firm hand.' The patricians nod—though you feel the plebs’ eyes on your back. (+2 politics, -1 unrest)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You straighten your toga and carry on.",
            effect: () => { politics += 2; unrest -= 1; }
          }
        }
      ]
    },
    // Step 5: Hit with fig (extra mockery)
    {
      text: "A child’s fig stain is still on your toga. 'Wear it with pride!' another senator jokes, pointing down at his own fig-stained threads. You share a hearty laugh and your coinpurse remains heavy.  (-1 politics, 🏅Badge: Fig-Club Initiate)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You smile thinly, plotting revenge against fruit everywhere.",
            effect: () => { politics -= 1; },
            badge: "Fig-Club Initiate"
          }
        }
      ]
    },
    // Step 6: Tripped/torn robe
    {
      text: "You limp into the Senate, toga in tatters. Some laugh, some feign concern. 'Fashion-forward, I see!' (-1 politics, -1 denarii)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You vow to invest in sturdier sandals.",
            effect: () => { politics -= 1; treasury -= 1; }
          }
        }
      ]
    }
  ]
},
// --- EVENT: midnight_messenger ---
// To trigger this event: startRandomEventTree("midnight_messenger")
// Typical narrative trigger: after conspiracy clue, or as a rare intrigue event
midnight_messenger: {
  meta: { tags: ["intrigue","mystery"], weight: 1.4, enabled: true },
  steps: [
    // Step 0: The stumble-in (short opener)
    {
      text: "You’re tuning your lute in the lamplight when a cloaked and frantic figure stumbles into your atrium—crazed, out of breath, bleeding all over your new mosaic.",
      options: [
        {
          label: "Brandish your lute like a club.",
          fixed: { text: "He freezes, eyes wide. You lower the lute, now completely out of tune, and wave him in. (Lute: emotionally distressed.)", effect: () => {}, nextStep: 1 }
        },
        {
          label: "Rush to his aid (and your mosaic).",
          fixed: { text: "You catch him before he faceplants. Your evening tunic is now a limited edition, but the man can finally breathe.", effect: () => {}, nextStep: 1 }
        },
        {
          label: "Call for servants and shout for water.",
          fixed: { text: "You shout for help. Somewhere, a servant drops a tray. The messenger insists on speaking only to you.", effect: () => {}, nextStep: 1 }
        }
      ]
    },
    // Step 1: The inciting incident (full reveal)
    {
      text: "He gasps: “Three senators—your rivals, and... a trusted friend... plan to seize the legions. The Republic is at stake!” You reach out as he collapses, staining your evening tunic with cruor. A glass vial falls from his cloak and rolls across the floor.",
      cameo: "The messenger’s last words are a warning... and a plea for help!",
      options: [
        {
          label: "Rush him to a doctor, but risk questions, witnesses and rumors.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You pay the medic well, but rumors begin to swirl. +1 unrest, -100 denarii.",
                effect: () => { unrest += 1; treasury -= 100; },
                loot: "Coded Scroll",
                nextStep: 2
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "His last word is a name, scratched onto a wax tablet. 🏅Badge: Snoop.",
                effect: () => {},
                badge: "Snoop",
                loot: "Coded Scroll",
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Quietly bury him in the garden yourself.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You dig by moonlight. Rome sleeps… but for how long? -1 unrest, +1 intrigue.",
                effect: () => { unrest -= 1; /* increase intrigue stat if tracked */ },
                loot: "Coded Scroll",
                nextStep: 3
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "It seems someone saw you! Now the neighbors whisper of your midnight gardening. +2 unrest, -1 politics. 🗡️Loot: Haunted Reputation.",
                effect: () => { unrest += 2; politics -= 1; window.inventory = window.inventory || []; if (!window.inventory.includes("Coded Scroll")) { window.inventory.push("Coded Scroll"); if (typeof delayedLog === "function") delayedLog("🎒 Loot acquired: Coded Scroll", "log-positive"); } },
                loot: "Haunted Reputation",
                nextStep: 3
              }
            }
          ]
        },
        {
          label: "Search his belongings for clues before anything else.",
          fixed: {
            text: "You pocket the vial and the scroll. The messenger’s breath is fading fast… 🗡️Loot: Poison Vial, Coded Scroll.",
            effect: () => { window.inventory = window.inventory || []; if (!window.inventory.includes("Poison Vial")) window.inventory.push("Poison Vial"); },
            loot: "Coded Scroll",
            nextStep: 4
          }
        }
      ]
    },
    // Step 2: Doctor or "Snoop" badge outcome
    {
      text: "With the messenger's secret revealed, you ponder your next move. What do you do with the vial and the clue?",
      options: [
        {
          label: "Take the items to your friend and confront her. There is no time to lose. But first, stash the body in the garden...",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendChill,
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 5
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: "With trembling hands, she confesses her involvement but begs you to help thwart the plot. Together you may turn the tide! +2 politics. 🏅Badge: Double Dealer.",
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 6
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendBlackmail,
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 7
              }
            }
          ]
        },
        {
          label: EVENT_TREE_STRINGS.midnightMessenger.labelCityGuard,
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence down a latrine. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 8
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto their scheme. Best to sleep with one eye open... +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 9
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: EVENT_TREE_STRINGS.midnightMessenger.stashSecretCache,
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 10
          }
        }
        ,        {
                 label: EVENT_TREE_STRINGS.midnightMessenger.labelDecodeTonight,
                 condition: { loot: "Coded Scroll" },
                 fixed: { text: "You light a brazier and work through the night, scratching ciphers in the wax.", effect: () => {}, nextStep: 11 }
               },
               {
                 label: "Visit Scriptor Marcus at dawn for help (-50)",
                 condition: { loot: "Coded Scroll" },
                 fixed: { text: "Marcus pulls a dusty index of substitutions and nods gravely.", effect: () => { treasury -= 50; }, nextStep: 12 }
               }
      ]
    },
    // Step 3: Buried in garden path
    {
      text: "You return inside, haunted by the night’s events. What will you do with the fallen messenger’s secrets?",
      options: [
        {
          label: EVENT_TREE_STRINGS.midnightMessenger.labelFriendAdvice,
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendChill,
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 5
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendConfess,
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 6
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendBlackmail,
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 7
              }
            }
          ]
        },
        {
          label: EVENT_TREE_STRINGS.midnightMessenger.labelCityGuard,
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 8
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto them. +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 9
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: EVENT_TREE_STRINGS.midnightMessenger.stashSecretCache,
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 10
          }
        }
        ,        {
                 label: EVENT_TREE_STRINGS.midnightMessenger.labelDecodeTonight,
                 condition: { loot: "Coded Scroll" },
                 fixed: { text: "By lamplight, the symbols begin to yield—perhaps.", effect: () => {}, nextStep: 11 }
               }
      ]
    },
    // Step 4: You searched belongings before deciding
    {
      text: "With the vial and coded scroll in hand, you must act quickly. What do you do?",
      options: [
        {
          label: EVENT_TREE_STRINGS.midnightMessenger.labelFriendAdvice,
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendChill,
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 5
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendConfess,
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 6
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: EVENT_TREE_STRINGS.midnightMessenger.friendBlackmail,
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 7
              }
            }
          ]
        },
        {
          label: EVENT_TREE_STRINGS.midnightMessenger.labelCityGuard,
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence in a latrine. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 8
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto them. You sleep better with one eye open, anyway. +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 9
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: EVENT_TREE_STRINGS.midnightMessenger.stashSecretCache,
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 10
          }
        }
        ,        {
                 label: "Study the coded scroll right now (try to decode)",
                 condition: { loot: "Coded Scroll" },
                 fixed: { text: "You spread sand across the table and trace the cipher.", effect: () => {}, nextStep: 11 }
               },
               {
                 label: "Seek Scriptor Marcus (-50)",
                 condition: { loot: "Coded Scroll" },
                 fixed: { text: "You find Marcus asleep on his wax tablets; he grumbles but agrees to help.", effect: () => { treasury -= 50; }, nextStep: 12 }
               }
      ]
    },
    // Step 5: Terminus — Naïve (betrayal)
    {
      text: "Soon after, your political allies grow distant. The Senate whispers of loyalty—and betrayal. You find yourself increasingly isolated. (Terminus: Intrigue arc closes, for now.)",
      options: [
        { label: "Continue", fixed: { text: "You retire early, wondering who you can truly trust.", effect: () => {} } }
      ]
    },
    // Step 6: Double Dealer (not a terminus—future event hook)
    {
      text: "You and your friend now work in secret against the conspiracy. A deadly game of alliances has begun. (Plot hook: Expect future intrigue!)",
      options: [
        { label: "Continue", fixed: { text: "Your code phrase: 'The grapes are sour this year.'", effect: () => {}, nextStep: 17, continueLabel: "Slip into the night" } }
      ]
    },
    // Step 7: Blackmail Letters — Terminus
    {
      text: "Armed with blackmail, you force the plotters to back down—at least for now. Rome is safe, but you know enemies never sleep. (Terminus: The crisis is averted.)",
      options: [
        { label: "Continue", fixed: { text: "You burn the letters, but keep copies—just in case.", effect: () => {}, badge: "Shadow Architect" } }
      ]
    },
    // Step 8: Official Summons — Terminus
    {
      text: "The bureaucracy swallows your testimony. Days pass, and the conspiracy moves forward in the shadows. You are powerless to intervene. (Terminus: The story ends—for now.)",
      options: [
        { label: "Continue", fixed: { text: "You make a note to never trust the Praetor’s men.", effect: () => {} } }
      ]
    },
    // Step 9: Civic Hero — Terminus
    {
      text: "Lauded by the city, you find yourself watched from the shadows. You are now a hero—and a target. (Terminus: You’ve made enemies at the highest levels.)",
      options: [
        { label: "Continue", fixed: { text: "You vow to keep your guard up.", effect: () => {}, badge: "Public Sentinel" } }
      ]
    },
    // Step 10: Secret Cache — Terminus (future hook)
    {
      text: "You wait and watch as Rome continues around you, knowing the conspiracy is still out there. (Terminus: Your knowledge may yet be decisive—in a future event.)",
      options: [
        { label: "Continue", fixed: { text: "You polish your lute and wait for the next knock.", effect: () => {}, loot: "Intrigue Hook" } }
      ]
    }
    ,
    // Step 11: Attempt to decode the Coded Scroll (solo)
    {
      text: "You work the cipher alone: acrostics, letter wheels, and wine stains shaped like moons.",
      options: [
        { label: "Keep at it till dawn",
          rng: [
            { min:1,max:45, result: { text: "A false trail! The text reads like a shopping list… for daggers. Loot: False Lead Pamphlet.", effect: () => {}, loot: "False Lead Pamphlet", nextStep: 13, continueLabel: "Follow the ‘shopping list’" } },
            { min:46,max:85, result: { text: "Fragments align. You tease out names and a meeting place. Loot: Cipher Fragments.", effect: () => {}, loot: "Cipher Fragments", nextStep: 13, continueLabel: "Pursue the lead" } },
            { min:86,max:100, result: { text: "Click—the key fits. You grasp the system behind the symbols. Loot: Silken Cipher.", effect: () => {}, loot: "Silken Cipher", nextStep: 13, continueLabel: "Act on the message" } }
          ] }
      ]
    },

    // Step 12: Scriptor Marcus (assisted decode)
    {
      text: "Marcus the scriptor peers at the scroll through smoke and candle soot.",
      options: [
        { label: "Let him cross-map the symbols",
          rng: [
            { min:1,max:30, result: { text: "A sleepy mistake sends you on a tangent. Politics -1.", effect: () => { politics -= 1; }, nextStep: 13 } },
            { min:31,max:80, result: { text: "Between yawns, he extracts a meeting place and a pass-phrase. Loot: Whispered Password.", effect: () => {}, loot: "Whispered Password", nextStep: 13 } },
            { min:81,max:100, result: { text: "He chuckles: ‘A classic switch-key.’ He copies the schema. Loot: Silken Cipher.", effect: () => {}, loot: "Silken Cipher", nextStep: 13 } }
          ] }
      ]
    },

    // Step 13: Tailing the lead
    {
      text: "At dusk, a cloaked courier matches the scroll’s meet-point near the Tiber.",
      options: [
        { label: "Shadow him across the rooftops",
          rng: [
            { min:1,max:55, result: { text: "Tiles skid; you bruise a knee but keep pace. Treasury -25. Loot: Safehouse Map.", effect: () => { treasury -= 25; }, loot: "Safehouse Map", nextStep: 14 } },
            { min:56,max:90, result: { text: "You flit from shadow to shadow. Loot: Safehouse Map.", effect: () => {}, loot: "Safehouse Map", nextStep: 14 } },
            { min:91,max:100, result: { text: "He spots you; a knife flashes. You escape rattled. +1 unrest.", effect: () => { unrest += 1; }, nextStep: 14 } }
          ] },
        { label: "Blend with dockworkers and listen",
          fixed: { text: "A foreman mentions ‘the ash door by the mill.’ Loot: Dockside Rumor.", effect: () => {}, loot: "Dockside Rumor", nextStep: 14 } }
      ]
    },

    // Step 14: The Safehouse
    {
      text: "A hidden door marked with ash opens onto a cramped room of ledgers and masks.",
      options: [
        { label: "Sneak in through the back with the Safehouse Map (requires Safehouse Map)", condition: { loot: "Safehouse Map" },
          rng: [
            { min:1,max:60, result: { text: "You slip past a guard dog with a scrap of bread. Loot: Names Tablet.", effect: () => {}, loot: "Names Tablet", nextStep: 15 } },
            { min:61,max:100, result: { text: "A floorboard creaks, but no one stirs. Loot: Names Tablet, Conspirator Seal.", effect: () => { window.inventory = window.inventory || []; if (!window.inventory.includes("Conspirator Seal")) window.inventory.push("Conspirator Seal"); }, loot: "Names Tablet", nextStep: 15 } }
          ] },
        { label: "Bribe the watchman (-80)", fixed: { text: "Coins vanish; the watchman does too. Loot: Conspirator Seal.", effect: () => { treasury -= 80; }, loot: "Conspirator Seal", nextStep: 15 } },
        { label: "Kick the door in",
          rng: [
            { min:1,max:50, result: { text: "The room is cleared—someone was warned. Politics -1.", effect: () => { politics -= 1; }, nextStep: 15 } },
            { min:51,max:100, result: { text: "A startled scribe bolts, dropping a slate. Loot: Names Tablet.", effect: () => {}, loot: "Names Tablet", nextStep: 15 } }
          ] }
      ]
    },

    // Step 15: Aboveboard or cunning preparation
    {
      text: "Armed with hints and tokens, how will you proceed?",
      options: [
        { label: "Swear an oath at the Temple of Vesta (-25)", fixed: { text: "You vow to expose the plot without blood. Treasury -25. Loot: Vesta Token.", effect: () => { treasury -= 25; }, loot: "Vesta Token", nextStep: 16 } },
        { label: "Draft a lictor sting plan",
          fixed: { text: "You map arrests for dawn across three alleys. Loot: Lictor Sting Plan.", effect: () => {}, loot: "Lictor Sting Plan", nextStep: 16 } }
      ]
    },

    // Step 16: The Move
    {
      text: "Night deepens—oil lamps gutter; a dog barks twice in a far alley. The city holds its breath.",
      options: [
        { label: "Confront your friend with the Names Tablet", condition: { loot: "Names Tablet" },
          rng: [
            { min:1,max:60, result: { text: "She tries tears, and you show her steel. She agrees to help you turn the circle against itself. 🏅Badge: Double Dealer.", effect: () => {}, badge: "Double Dealer", nextStep: 6 } },
            { min:61,max:100, result: { text: "She denies it and vanishes into the night, leaving a warning etched in your gate. Loot: Anonymous Testimony.", effect: () => {}, loot: "Anonymous Testimony", nextStep: 8 } }
          ] },
        { label: "Hand the Names Tablet to the Praetor (requires Vesta Token or Lictor Sting Plan)", condition: { all: [ { loot: "Names Tablet" }, { any: [ { loot: "Vesta Token" }, { loot: "Lictor Sting Plan" } ] } ] },
          fixed: { text: "You make it official—clean, but slow. Politics +1. Loot: Official Dossier.", effect: () => { politics += 1; }, loot: "Official Dossier", nextStep: 8 } }
      ]
    },

    // Step 17: Epilogue hook
    {
      text: "As dawn breaks, Rome stirs to rumors of arrests and missing senators.",
      options: [
        { label: "Continue", fixed: { text: "The city watches; the game has only begun.", effect: () => {}, nextStep: null, suppressNextRandom: true } }
      ]
    }
  ]
},
// --- [DATA END] ---
// When integrating into game.js, connect the "continue" handler of the last step to either:
//   - resume main gameplay
//   - trigger follow-up event(s) based on result badges/loot
// For example, if (badge == "Double Dealer") trigger another random event in future years

// --- EVENT: the_conspirators_strike_back ---
// To trigger this event: startRandomEventTree("the_conspirators_strike_back")
// Suggested: Trigger if badges/loot from midnight_messenger include "Double Dealer" or "Secret Cache"
the_conspirators_strike_back: {
  meta: {
    tags: ["intrigue"],
    weight: 5,
    enabled: true,
    requires: {
      any: [
        { badge: "Double Dealer" },
        { loot: "Secret Cache" }
      ]
    }
  },
  steps: [
    // Step 0: The threat returns
    {
      text: "It’s a moonless night. You hear footsteps in the courtyard—your villa is being watched. Suddenly, there’s a scratch at your door and a sealed note is slipped beneath: 'Silence is survival. Rome has no place for busybodies.' What do you do?",
      cameo: "A chill runs down your spine as you weigh your next move.",
      options: [
        {
          label: "Gather your loyal clients and increase your security.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "Your men repel an intruder. A bloodied dagger is left behind. 🗡️Loot: Bloodied Dagger.",
                effect: () => { /* +1 intrigue */ },
                loot: "Bloodied Dagger",
                nextStep: 1
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "The guards betray you! Your study is ransacked and secrets may be lost. -200 denarii, +2 unrest.",
                effect: () => { treasury -= 200; unrest += 2; },
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Try to secretly meet your double agent friend for intel.",
          condition: { badge: "Double Dealer" },
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Thanks to your friend, you save a fellow senator and earn powerful new allies. +2 politics. 🏅Badge: Savior in the Shadows.",
                effect: () => { politics += 2; },
                badge: "Savior in the Shadows",
                nextStep: 1
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You narrowly escape an ambush. Your friend slips you a hidden blade for protection. +1 unrest. 🗡️Loot: Hidden Blade.",
                effect: () => { unrest += 1; },
                loot: "Hidden Blade",
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Burn the evidence / Attempt to blackmail the plotters.",
          condition: { anyLoot: ["Secret Cache", "Blackmail Letters"] },
          fixed: {
            text: "You take bold action in the darkness. Only time will tell if you’ve silenced your enemies or made new ones. -1 intrigue. 🏅Badge: Shadow Player.",
            effect: () => { /* -1 intrigue */ },
            badge: "Shadow Player",
            nextStep: 1
          }
        },
        {
          label: "Ignore the threat. You're above suspicion.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "The shadows withdraw, but you sense eyes watching your every move.",
                effect: () => {},
                nextStep: 1
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "Whispers grow in the Curia—your rivals twist your silence into weakness. -2 politics.",
                effect: () => { politics -= 2; },
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Accept the shadowy figure’s help (pay for protection).",
          condition: { badge: "Naïve" },
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Your would-be savior disappears with your coin and your secrets. -150 denarii, -1 intrigue.",
                effect: () => { treasury -= 150; /* -1 intrigue */ },
                nextStep: 1
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "The stranger slips you a coded message: a powerful clue for a future plot. +1 intrigue. 🗡️Loot: Anonymous Testimony.",
                effect: () => { /* +1 intrigue */ },
                loot: "Anonymous Testimony",
                nextStep: 1
              }
            }
          ]
        }
      ]
    },
    // Step 1: The seal and the scrawl
    {
      text: "You hold the note up to the lamplight. The wax is fresh, the cut precise. The threat is blunt, but the hand is practiced. How do you read it?",
      cameo: "The seal smells faintly of cedar and lamp oil.",
      options: [
        {
          label: "Press the seal into your own wax to capture the mark.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You lift a clean impression. Loot: Wax Impression.",
                effect: () => {},
                loot: "Wax Impression",
                nextStep: 2
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "The wax crumbles in your palm. -10 denarii.",
                effect: () => { treasury -= 10; },
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Order a quiet sweep of your household.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "A stableboy bolts; you find a payment chit. Loot: Servants Ledger.",
                effect: () => {},
                loot: "Servants Ledger",
                nextStep: 2
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "No one talks. Resentment simmers. +1 unrest.",
                effect: () => { unrest += 1; },
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Trail the messenger's path into the alley yourself.",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "You find a blue thread snagged on a nail. Loot: Blue Thread.",
                effect: () => {},
                loot: "Blue Thread",
                nextStep: 2
              }
            },
            {
              min: 51, max: 100,
              result: {
                text: "A cutpurse jostles you in the dark. -50 denarii.",
                effect: () => { treasury -= 50; },
                nextStep: 2
              }
            }
          ]
        }
      ]
    },
    // Step 2: Countermove
    {
      text: "Dawn is not far. You need a countermove before the city wakes.",
      options: [
        {
          label: "Plant a false appointment to test the leak.",
          fixed: {
            text: "A quiet invitation goes out under a false seal. Loot: False Summons.",
            effect: () => {},
            loot: "False Summons",
            nextStep: 3
          }
        },
        {
          label: "Alert the city guard discreetly.",
          fixed: {
            text: "A lieutenant owes you a favor and takes notes. Politics +1. Loot: Guard Writ.",
            effect: () => { politics += 1; },
            loot: "Guard Writ",
            nextStep: 3
          }
        },
        {
          label: "Seed decoy rumors from your secret cache.",
          condition: { loot: "Secret Cache" },
          fixed: {
            text: "Your whispers spread with uncanny speed. Loot: Decoy Scrolls.",
            effect: () => {},
            loot: "Decoy Scrolls",
            nextStep: 3
          }
        },
        {
          label: "Lean on your blackmail letters to quiet a gossip.",
          condition: { loot: "Blackmail Letters" },
          fixed: {
            text: "The gossip goes pale and suddenly forgets your name. Politics +1, Unrest -1.",
            effect: () => { politics += 1; unrest = Math.max(0, unrest - 1); },
            nextStep: 3
          }
        }
      ]
    },
    // Step 3: A familiar contact
    {
      text: "A familiar figure arrives under your portico, cloak up, smile half remembered. The air says more than the words do.",
      cameo: "They say your name as if it were a joke only you both know.",
      options: [
        {
          label: "Trade news for a favor.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "They give you a phrase that opens doors. Loot: Whispered Password.",
                effect: () => {},
                loot: "Whispered Password",
                nextStep: 4
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You spend coin and attention, and get neither back. -50 denarii, +1 unrest.",
                effect: () => { treasury -= 50; unrest += 1; },
                nextStep: 4
              }
            }
          ]
        },
        {
          label: "Have them carry your decoy message.",
          condition: { anyLoot: ["False Summons", "Decoy Scrolls"] },
          fixed: {
            text: "They vanish into the alleys with your bait. Loot: Courier Token.",
            effect: () => {},
            loot: "Courier Token",
            nextStep: 4
          }
        },
        {
          label: "Keep it professional and send them away.",
          fixed: {
            text: "You deny the past and focus on the present. Politics +1.",
            effect: () => { politics += 1; },
            nextStep: 4
          }
        }
      ]
    },
    // Step 4: Night watch
    {
      text: "The city settles. You decide how sharp your net should be.",
      options: [
        {
          label: "Forge a reply using the wax impression.",
          condition: { loot: "Wax Impression" },
          fixed: {
            text: "A clean counterfeit goes out. Loot: Forged Reply.",
            effect: () => {},
            loot: "Forged Reply",
            nextStep: 5
          }
        },
        {
          label: "Use the guard writ to raid a suspected safehouse.",
          condition: { loot: "Guard Writ" },
          fixed: {
            text: "You seize a scrap of names and a sliver of alibi. Loot: Partial Dossier.",
            effect: () => {},
            loot: "Partial Dossier",
            nextStep: 5
          }
        },
        {
          label: "Confront the watcher in the alley.",
          rng: [
            {
              min: 1, max: 55,
              result: {
                text: "You catch a courier with a wet satchel. Loot: Courier Docket.",
                effect: () => {},
                loot: "Courier Docket",
                nextStep: 5
              }
            },
            {
              min: 56, max: 100,
              result: {
                text: "A blade flashes; you take a nick and lose the trail. -1 politics, +1 unrest.",
                effect: () => { politics -= 1; unrest += 1; },
                nextStep: 5
              }
            }
          ]
        },
        {
          label: "Do nothing and keep your powder dry.",
          fixed: {
            text: "You let the night pass without new edges. +1 intrigue.",
            effect: () => { /* +1 intrigue */ },
            nextStep: 5
          }
        }
      ]
    },
    // Step 5: Dawn posture
    {
      text: "Dawn finds you at the steps of the Curia. How do you carry the story?",
      options: [
        {
          label: "Bring a dossier and a calm face.",
          condition: { anyLoot: ["Servants Ledger", "Blue Thread", "Courier Token", "Courier Docket", "Partial Dossier", "Forged Reply", "Anonymous Testimony", "Official Dossier"] },
          fixed: {
            text: "You speak in careful outlines and let the hints do their work. Politics +1.",
            effect: () => { politics += 1; },
            nextStep: 6
          }
        },
        {
          label: "Hint at shadows without proof.",
          fixed: {
            text: "You warn the chamber with just enough vagueness to keep everyone guessing. +1 intrigue.",
            effect: () => { /* +1 intrigue */ },
            nextStep: 6
          }
        },
        {
          label: "Arrive as if nothing happened.",
          fixed: {
            text: "The steadier you look, the less they smell blood.",
            effect: () => {},
            nextStep: 6
          }
        }
      ]
    },
    // Step 6: Senate wrap-up (universal)
    {
      text: "In the morning, the Senate floor buzzes with rumor. You’re still standing—but for how long?",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "The day is young, and the game continues.",
            effect: () => {},
            nextStep: 7
          }
        }
      ]
    },
    // Step 7: Final branches — silly or dire
    {
      text: "Still uneasy after the night's intrigue, you seek distraction (or information). What do you do next?",
      options: [
        {
          label: "Go to the baths and gossip.",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "You and three senators are chased naked from the baths by an angry chef. The city laughs for weeks. +1 unrest.",
                effect: () => { unrest += 1; }
              }
            },
            {
              min: 51, max: 100,
              result: {
                text: "Hidden in the mist, you catch whispers of conspiracy. 🗡️Loot: Bathhouse Intel.",
                effect: () => {},
                loot: "Bathhouse Intel"
              }
            }
          ]
        },
        {
          label: "Throw a lavish party.",
          rng: [
            {
              min: 1, max: 30,
              result: {
                text: "Your party is the talk of the town—for all the wrong reasons. -100 denarii, -1 politics.",
                effect: () => { treasury -= 100; politics -= 1; }
              }
            },
            {
              min: 31, max: 100,
              result: {
                text: "You outwit a spy among your guests, earning quiet respect. +1 intrigue. 🏅Badge: Host with the Most.",
                effect: () => { /* +1 intrigue */ },
                badge: "Host with the Most"
              }
            }
          ]
        },
        {
          label: "Attend the Senate vote.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You barely avoid arrest as your rivals conspire. -2 politics, +2 unrest.",
                effect: () => { politics -= 2; unrest += 2; }
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "You survive a poisoning attempt—barely! 🏅Badge: Liver of Iron.",
                effect: () => {},
                badge: "Liver of Iron"
              }
            }
          ]
        }
        ,
        { label: "Set a trap at the Tiber ferry",
          fixed: { text: "You bait the hook with forged letters and a whisper to the right ears.", effect: () => {}, nextStep: 8 } }
      ]
    }
    ,
    // Step 8: Preparation — pick your bait
    {
      text: "Your trap needs bait. What do you dangle?",
      options: [
        { label: "Wave copies of Blackmail Letters (requires Blackmail Letters)", condition: { loot: "Blackmail Letters" }, fixed: { text: "A rumor slithers through the Curia: fresh ink for sale.", effect: () => {}, nextStep: 9 } },
        { label: "Plant Anonymous Testimony (requires Anonymous Testimony)", condition: { loot: "Anonymous Testimony" }, fixed: { text: "A whisper passes from porter to porter.", effect: () => {}, nextStep: 9 } },
        { label: "Use Whispered Password as the lure (requires Whispered Password)", condition: { loot: "Whispered Password" }, fixed: { text: "A single phrase changes hands and sets feet moving.", effect: () => {}, nextStep: 9 } },
        { label: "Craft fake augury bones as a signal (-25)", fixed: { text: "You scratch runes into chicken bones and pass them to a street seer. Treasury -25. Loot: Fake Augury Bones.", effect: () => { treasury -= 25; }, loot: "Fake Augury Bones", nextStep: 9 } },
        { label: "No special bait—trust the whisper network",
          fixed: { text: "You scatter hints with coin and nods.", effect: () => {}, nextStep: 9 } }
      ]
    },

    // Step 9: Ambush at the ferry
    {
      text: "Fog hugs the Tiber. Footsteps approach the moored skiff.",
      options: [
        { label: "Spring the trap",
          rng: [
            { min:1,max:50, result: { text: "Chaos—your quarry escapes into the fog. You take a poisoned cut. Loot: Poisoned Cut.", effect: () => {}, loot: "Poisoned Cut", nextStep: 10 } },
            { min:51,max:85, result: { text: "A scuffle, a splash, and a ledger saved from the water—ink bleeding like bruises. Loot: Conspiracy Ledger.", effect: () => {}, loot: "Conspiracy Ledger", nextStep: 10 } },
            { min:86,max:100, result: { text: "Perfect timing. You take two conspirators alive. Politics +1. Loot: Conspiracy Ledger, Captive Conspirator.", effect: () => { politics += 1; window.inventory = window.inventory || []; if (!window.inventory.includes("Conspiracy Ledger")) { window.inventory.push("Conspiracy Ledger"); if (typeof delayedLog === "function") delayedLog("🎒 Loot acquired: Conspiracy Ledger", "log-positive"); } }, loot: "Captive Conspirator", nextStep: 10 } }
          ] }
      ]
    },

    // Step 10: Senate showdown
    {
      text: "With fresh leverage, how do you close the vice?",
      options: [
        { label: "Publish the ledger on the rostra (aboveboard)", condition: { loot: "Conspiracy Ledger" }, fixed: { text: "Gasps roll through the Forum. Unrest -1, Politics +2. Badge: Tribune of Daylight.", effect: () => { unrest = Math.max(0, unrest - 1); politics += 2; }, badge: "Tribune of Daylight", nextStep: 11 } },
        { label: "Cut private deals using the ledger (cunning)", condition: { loot: "Conspiracy Ledger" }, fixed: { text: "Names become favors overnight. Politics +3, Unrest +1. Badge: Broker of Shadows.", effect: () => { politics += 3; unrest += 1; }, badge: "Broker of Shadows", nextStep: 11 } },
        { label: "Parade the captive through the Curia (requires Captive Conspirator)", condition: { loot: "Captive Conspirator" }, fixed: { text: "Fear does the talking. Politics +2.", effect: () => { politics += 2; }, nextStep: 11 } },
        { label: "Limp home and tend your wound (requires Poisoned Cut)", condition: { loot: "Poisoned Cut" }, fixed: { text: "The city spins as you bind the gash. Politics -1.", effect: () => { politics -= 1; }, nextStep: 11 } }
      ]
    },

    // Step 11: Epilogue
    {
      text: "Rome mutters your name—for praise or for fear.",
      options: [ { label: "Continue", fixed: { text: "The river carries secrets away; others will wash ashore.", effect: () => {}, nextStep: null, suppressNextRandom: true } } ]
    }
  ]
  }
};/* --- stripped inline engine (moved to runner) ---
// --- [HOOK] ---
// When integrating into game.js, connect the "continue" handler of the last step to either:
//   - resume main gameplay
//   - trigger follow-up event(s) based on result badges/loot
// For example, if (badge == "Double Dealer") trigger another random event in future years
if (typeof module !== "undefined") module.exports = randomEventTrees;

// --- Event Trees Engine using the Random Event modal ---
(function () {
  function awardTitleFromEvents(name) {
    try {
      window.honoraryTitles = window.honoraryTitles || [];
      if (!window.honoraryTitles.includes(name)) {
        window.honoraryTitles.push(name);
        if (typeof delayedLog === "function") {
          delayedLog(`🏅 Honorary Title Earned: <span class="honorary-title-badge">${name}</span>`, "log-positive");
        }
      }
      if (typeof updateScoreboard === "function") updateScoreboard();
    } catch (e) {
      console.warn("awardTitleFromEvents error:", e);
    }
  }

  // --- Condition helpers (global) ---
  if (typeof window.hasBadge !== "function") {
    window.hasBadge = function(name) {
      try { return Array.isArray(window.honoraryTitles) && window.honoraryTitles.includes(name); }
      catch (_) { return false; }
    };
  }
  if (typeof window.hasLoot !== "function") {
    window.hasLoot = function(name) {
      try { return Array.isArray(window.inventory) && window.inventory.includes(name); }
      catch (_) { return false; }
    };
  }

  try {
    window.randomEventTrees = (typeof randomEventTrees !== "undefined") ? randomEventTrees : window.randomEventTrees;
  } catch (e) {
    console.error("Failed to export randomEventTrees:", e);
  }

  let modalActive = false;
  let resumeCb = null;

  function startRandomEventTree(key, onResume) {
    try {
      resumeCb = (typeof onResume === 'function') ? onResume : null;
      const tree = (window.randomEventTrees || {})[key];
      if (!tree) { console.warn("startRandomEventTree: event key not found:", key); return; }

      const modal    = document.getElementById("random-event-modal");
      const descEl   = document.getElementById("random-event-desc");
      const cameoEl  = document.getElementById("random-event-cameo");
      const closeBtn = document.getElementById("random-event-close-btn");

      if (!modal || !descEl || !closeBtn) {
        const first = tree.steps && tree.steps[0];
        if (first && typeof delayedLog === "function") delayedLog(first.text, "log-event");
        if (resumeCb) { const cb = resumeCb; resumeCb = null; setTimeout(cb, 0); }
        return;
      }

      function clearOptions() {
        const prior = modal.querySelector(".event-options");
        if (prior) prior.remove();
      }

      function applyResult(result) {
        try {
          if (result && typeof result.effect === "function") result.effect();
          if (result && result.badge) awardTitleFromEvents(result.badge);
          if (result && result.loot) {
            window.inventory = window.inventory || [];
            if (!window.inventory.includes(result.loot)) window.inventory.push(result.loot);
            if (typeof delayedLog === "function") delayedLog(`🎒 Loot acquired: ${result.loot}`, "log-positive");
          }
          if (typeof updateScoreboard === "function") updateScoreboard();
        } catch (e) { console.warn("applyResult error:", e); }
      }

      function finishAndClose() {
        modal.classList.add("hidden");
        modalActive = false;
        const cb = resumeCb; resumeCb = null;
        if (cb) setTimeout(cb, 0);
      }

      function renderStep(i) {
        const step = (tree.steps || [])[i];
        if (!step) { finishAndClose(); return; }

        descEl.innerHTML = step.text || "";
        if (cameoEl) cameoEl.textContent = step.cameo || "";

        // Options (filter by condition)
        clearOptions();
        const allOptions = Array.isArray(step.options) ? step.options : [];
        const filtered = allOptions.filter(opt => {
          try {
            if (typeof opt.condition === "function") return !!opt.condition();
            if (opt.condition == null) return true;
            if (typeof opt.condition === "object") {
              if (opt.condition.badge) return window.hasBadge && window.hasBadge(opt.condition.badge);
              if (opt.condition.loot)  return window.hasLoot  && window.hasLoot(opt.condition.loot);
            }
            return !!opt.condition; // truthy treated as allowed
          } catch (_) { return false; }
        });

        const hasOptions = filtered.length > 0;
        const wrap = document.createElement("div");
        wrap.className = "event-options";

        filtered.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "problem-option-btn";
          btn.type = "button";
          btn.textContent = opt.label || "Option";
          btn.addEventListener("click", () => {
            let result = null;
            if (opt.fixed) {
              result = opt.fixed;
            } else if (opt.rng && Array.isArray(opt.rng) && opt.rng.length) {
              const roll = Math.floor(Math.random() * 100) + 1;
              for (const r of opt.rng) {
                if (roll >= (r.min ?? 1) && roll <= (r.max ?? 100)) { result = r.result || r; break; }
              }
            }

            if (result) {
              applyResult(result);
              descEl.innerHTML = result.text || "";
              clearOptions();
              closeBtn.onclick = () => {
                if (typeof result.nextStep === "number") renderStep(result.nextStep);
                else finishAndClose();
              };
            } else {
              renderStep(i + 1);
            }
          }, { once: true });
          wrap.appendChild(btn);
        });

        if (hasOptions) closeBtn.insertAdjacentElement("beforebegin", wrap);

        closeBtn.onclick = () => {
          if (!step.options || step.options.length === 0) renderStep(i + 1);
        };

        modal.classList.remove("hidden");
        modalActive = true;
        closeBtn.focus();
      }

      renderStep(0);
    } catch (e) {
      console.error("startRandomEventTree failed:", e);
      if (resumeCb) { const cb = resumeCb; resumeCb = null; setTimeout(cb, 0); }
    }
  }

  try { window.startRandomEventTree = startRandomEventTree; }
  catch (e) { console.error("Failed to export startRandomEventTree:", e); }

  window.EventTrees = {
    data: window.randomEventTrees || {}
  };
})();
// --- END OF EVENT TREES ---
*/
