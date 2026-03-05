// LoreForge - Advanced Stat Block Engine (2024 Style)
(function () {
    const MONSTER_DATA = {
        types: [
            {
                name: 'Aberration', traits: ['Antimagic Field', 'Telepathy', 'Amorphous', 'Magic Resistance'],
                actions: ['Psychic Blast', 'Tentacle Lash', 'Mind Crush'],
                bonusActions: ['Ethereal Shift', 'Psychic Mirror'],
                reactions: ['Gaze of Confusion'],
                lore: "Born from the far realms beyond space and time, these entities defy natural laws."
            },
            {
                name: 'Beast', traits: ['Pack Tactics', 'Keen Senses', 'Pounce', 'Relentless'],
                actions: ['Bite', 'Claw', 'Gore'],
                bonusActions: ['Aggressive Burst', 'Dash'],
                reactions: ['Vengeful Snap'],
                lore: "Apex predators of the natural world, driven by instinct and primal savagery."
            },
            {
                name: 'Construct', traits: ['Immutable Form', 'Magic Resistance', 'Siege Monster'],
                actions: ['Slam', 'Force Beam', 'Multiattack'],
                bonusActions: ['Overdrive', 'Self-Repair'],
                reactions: ['Reactive Armor'],
                lore: "Artificially animated through ancient rituals or forgotten engineering."
            },
            {
                name: 'Dragon', traits: ['Legendary Resistance', 'Frightful Presence', 'Amphibious'],
                actions: ['Breathe Fire', 'Multiattack', 'Tail Swipe'],
                bonusActions: ['Draconic Roar', 'Wing Attack'],
                reactions: ['Tail Snub'],
                lore: "The undisputed masters of the skies, hoarding power and wealth for eons."
            },
            {
                name: 'Elemental', traits: ['Elemental Form', 'Illumination', 'Magic Resistance'],
                actions: ['Slam', 'Elemental Ray', 'Whirlwind'],
                bonusActions: ['Burst of Speed', 'Elemental Absorption'],
                reactions: ['Reactive Bloom'],
                lore: "Incarnations of the core forces of nature, bound to this plane by raw will."
            },
            {
                name: 'Fey', traits: ['Magic Resistance', 'Fey Ancestry', 'Innate Spellcasting'],
                actions: ['Charm', 'Sylvan Dagger', 'Glimmer Step'],
                bonusActions: ['Misty Step', 'Mirror Image'],
                reactions: ['Trickster\'s Flash'],
                lore: "Denizens of the Feywild, as beautiful as they are capricious and deadly."
            },
            {
                name: 'Fiend', traits: ['Magic Resistance', 'Devil\'s Sight', 'Magic Weapons'],
                actions: ['Hellfire Orb', 'Spiked Chain', 'Multiattack'],
                bonusActions: ['Infernal Step', 'Summon Minor Fiend'],
                reactions: ['Hellish Rebuke'],
                lore: "Corrupted souls from the lower planes, existing only to spread misery."
            },
            {
                name: 'Giant', traits: ['Aggressive', 'Siege Monster', 'Keen Senses'],
                actions: ['Rock Throw', 'Greatclub', 'Stomp'],
                bonusActions: ['Roar of Submission'],
                reactions: ['Boulder Guard'],
                lore: "Titans of old, whose footsteps once shaped the very mountains they inhabit."
            },
            {
                name: 'Monstrosity', traits: ['Magic Resistance', 'Keen Senses', 'Amphibious'],
                actions: ['Multiattack', 'Bite', 'Leap'],
                bonusActions: ['Savage Hunger'],
                reactions: ['Thick Hide'],
                lore: "Abominations created through dark magic or twisted evolutionary paths."
            },
            {
                name: 'Ooze', traits: ['Amorphous', 'Corrosive Form', 'Spider Climb'],
                actions: ['Pseudopod', 'Engulf', 'Acid Spit'],
                bonusActions: ['Split (Small Piece)'],
                reactions: ['Sticky Trap'],
                lore: "Mindless predators that dissolve everything in their path with relentless hunger."
            },
            {
                name: 'Plant', traits: ['False Appearance', 'Thorn Body', 'Regeneration'],
                actions: ['Vine Lash', 'Spore Burst', 'Entangle'],
                bonusActions: ['Photosynthesis Bloom'],
                reactions: ['Reactive Spores'],
                lore: "Sentient flora that have claimed the deep wilds as their own."
            },
            {
                name: 'Undead', traits: ['Undead Fortitude', 'Incorporeal Movement', 'Ethereal Sight'],
                actions: ['Life Drain', 'Wither', 'Spectral Touch'],
                bonusActions: ['Frightful Presence', 'Phase Out'],
                reactions: ['Death Throes'],
                lore: "The restless spirits and reanimated remains of those who refused to pass on."
            }
        ],
        loreThemes: [
            "Ancient records speak of a time when the {{name}} was worshipped as a god by local tribes.",
            "Tavern tales warn that to see a {{name}} is to see one's own end reflected in its eyes.",
            "Scholars believe the {{name}} is the result of a catastrophic magical spill in the high mountains.",
            "The {{name}} is known to be extremely territorial, guarding its lair with lethal precision.",
            "Hunters have noted that the {{name}} possesses an eerie, almost human-like intelligence."
        ],
        mythos: [
            "Legend says that {{name}} was the first of its kind, born from the shadow of a dying star.",
            "Legends claim that those who serve the {{name}} are granted longevity at the cost of their sanity.",
            "It is whispered that the {{name}} can sense the fear of its prey from miles away.",
            "Ancient grimoires describe the {{name}} as a 'herald of the dark', appearing before great calamities."
        ],
        environments: {
            arctic: ['Blue Dragon', 'Remorhaz', 'Yeti', 'Frost Giant'],
            coastal: ['Bronze Dragon', 'Marid', 'Sahuagin'],
            desert: ['Brass Dragon', 'Mummy', 'Blue Dragon'],
            forest: ['Green Dragon', 'Treant', 'Owlbear'],
            grassland: ['Centaur', 'Gold Dragon', 'Ankheg'],
            mountain: ['Silver Dragon', 'Red Dragon', 'Goliath'],
            swamp: ['Black Dragon', 'Hydra', 'Bullywug'],
            underdark: ['Beholder', 'Mind Flayer', 'Drow'],
            underwater: ['Aboleth', 'Kraken', 'Merrow'],
            urban: ['Rakshasa', 'Doppelganger', 'Vampire']
        },
        names: {
            prefixes: ['Gloom', 'Shadow', 'Frost', 'Iron', 'Bone', 'Blood', 'Soul', 'Storm', 'Void', 'Hell'],
            suffixes: ['stalker', 'weaver', 'crusher', 'drinker', 'breaker', 'shaper', 'bane', 'reaper', 'fang', 'wing']
        },
        alignments: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],
        sizes: [
            { name: 'Tiny', hd: 'd4' },
            { name: 'Small', hd: 'd6' },
            { name: 'Medium', hd: 'd8' },
            { name: 'Large', hd: 'd10' },
            { name: 'Huge', hd: 'd12' },
            { name: 'Gargantuan', hd: 'd20' }
        ]
    };

    class MonsterGenerator {
        constructor() {
            this.data = MONSTER_DATA;
        }

        generate(params = {}) {
            const typeObj = this._getType(params.type);
            const name = this._generateName(typeObj.name);
            const sizeObj = this._getSize();
            const cr = params.cr || Math.floor(Math.random() * 30);
            const pb = this._calculatePB(cr);
            const alignment = this._getAlignment();
            const stats = this._generateStats(cr);
            const traits = this._getAbilities(typeObj.traits, 2);
            const actions = this._getAbilities(typeObj.actions, 2);
            const bonusActions = this._getAbilities(typeObj.bonusActions, 1);
            const reactions = this._getAbilities(typeObj.reactions, 1);

            const hpData = this._generateHP(sizeObj, stats.con, cr);
            const saves = this._generateSaves(stats, pb, typeObj.name);
            const initiative = { mod: Math.floor((stats.dex - 10) / 2), score: 10 + Math.floor((stats.dex - 10) / 2) };

            // Generate Lore
            const loreText = this._generateLore(name, typeObj.lore);
            const mythosText = this._generateMythos(name);

            return {
                name,
                type: typeObj.name,
                size: sizeObj.name,
                alignment,
                cr,
                pb,
                ac: 10 + Math.floor(cr / 2) + Math.floor((stats.dex - 10) / 4),
                hp: hpData,
                initiative,
                stats,
                saves,
                traits,
                actions,
                bonusActions,
                reactions,
                lore: loreText,
                mythos: mythosText,
                description: `A ${sizeObj.name.toLowerCase()} ${typeObj.name.toLowerCase()}, known for its ${traits[0].toLowerCase()} and its devastating ${actions[0].toLowerCase()}.`
            };
        }

        _calculatePB(cr) {
            return 2 + Math.floor((cr - 1) / 4);
        }

        _generateHP(sizeObj, con, cr) {
            const diceCount = Math.max(1, cr + 1);
            const dieValue = parseInt(sizeObj.hd.replace('d', ''));
            const conMod = Math.floor((con - 10) / 2);
            const total = Math.max(1, Math.floor(diceCount * (dieValue / 2 + 0.5)) + (diceCount * conMod));
            return {
                total,
                formula: `${diceCount}${sizeObj.hd} ${conMod >= 0 ? '+' : '-'} ${Math.abs(diceCount * conMod)}`
            };
        }

        _generateSaves(stats, pb, type) {
            const saves = {};
            const proficient = this._getSavingThrowProficiencies(type);
            ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
                const mod = Math.floor((stats[stat] - 10) / 2);
                saves[stat] = proficient.includes(stat) ? mod + pb : mod;
            });
            return saves;
        }

        _getSavingThrowProficiencies(type) {
            const map = {
                'Aberration': ['int', 'wis', 'cha'],
                'Beast': ['str', 'dex'],
                'Construct': ['con', 'str'],
                'Dragon': ['dex', 'con', 'wis', 'cha'],
                'Elemental': ['con', 'wis'],
                'Fey': ['dex', 'cha'],
                'Fiend': ['con', 'wis', 'cha'],
                'Giant': ['str', 'con'],
                'Monstrosity': ['str', 'con'],
                'Ooze': ['con'],
                'Plant': ['con', 'wis'],
                'Undead': ['con', 'wis']
            };
            return map[type] || ['str', 'con'];
        }

        _generateLore(name, typeLore) {
            const template = this.data.loreThemes[Math.floor(Math.random() * this.data.loreThemes.length)];
            return `${typeLore} ${template.replace('{{name}}', name)}`;
        }

        _generateMythos(name) {
            const template = this.data.mythos[Math.floor(Math.random() * this.data.mythos.length)];
            return template.replace('{{name}}', name);
        }

        _getType(typeName) {
            if (!typeName || typeName === 'random') {
                return this.data.types[Math.floor(Math.random() * this.data.types.length)];
            }
            return this.data.types.find(t => t.name.toLowerCase() === typeName.toLowerCase()) || this.data.types[0];
        }

        _generateName(typeName) {
            const pre = this.data.names.prefixes[Math.floor(Math.random() * this.data.names.prefixes.length)];
            const suf = this.data.names.suffixes[Math.floor(Math.random() * this.data.names.suffixes.length)];
            return `${pre}${suf} ${typeName}`;
        }

        _getSize() {
            return this.data.sizes[Math.floor(Math.random() * this.data.sizes.length)];
        }

        _getAlignment() {
            return this.data.alignments[Math.floor(Math.random() * this.data.alignments.length)];
        }

        _getAbilities(list, count) {
            if (!list) return [];
            const shuffled = [...list].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        _generateStats(cr) {
            const base = 10 + Math.floor(cr / 2);
            return {
                str: base + this._roll(1, 6),
                dex: base + this._roll(1, 4),
                con: base + this._roll(1, 6),
                int: base - 2 + this._roll(1, 4),
                wis: base + this._roll(1, 4),
                cha: base - 4 + this._roll(1, 6)
            };
        }

        _roll(n, d) {
            let total = 0;
            for (let i = 0; i < n; i++) {
                total += Math.floor(Math.random() * d) + 1;
            }
            return total;
        }
    }

    // App Initialization
    document.addEventListener('DOMContentLoaded', () => {
        const generator = new MonsterGenerator();

        const crInput = document.getElementById('challenge-rating');
        const crDisplay = document.getElementById('cr-display');
        const typeSelect = document.getElementById('monster-type');
        const envSelect = document.getElementById('environment');
        const generateBtn = document.getElementById('generate-btn');
        const randomBtn = document.getElementById('random-btn');
        const exportPdfBtn = document.getElementById('export-pdf-btn');

        const monsterCard = document.getElementById('monster-card');
        const cardActions = document.getElementById('card-actions');

        let currentMonster = null;

        crInput.addEventListener('input', (e) => {
            crDisplay.textContent = e.target.value;
        });

        const handleGenerate = (isPureRandom = false) => {
            const params = isPureRandom ? {} : {
                type: typeSelect.value,
                cr: parseInt(crInput.value),
                environment: envSelect.value
            };

            currentMonster = generator.generate(params);
            renderMonster(currentMonster);
        };

        generateBtn.addEventListener('click', () => handleGenerate(false));
        randomBtn.addEventListener('click', () => handleGenerate(true));

        exportPdfBtn.addEventListener('click', () => {
            if (!currentMonster) return;
            const element = document.getElementById('monster-card');
            const opt = {
                margin: 0.5,
                filename: `${currentMonster.name}_2024_Bestiary.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        });

        const renderMonster = (monster) => {
            monsterCard.classList.remove('empty-state');
            cardActions.classList.remove('hidden');

            const getMod = (val) => {
                const mod = Math.floor((val - 10) / 2);
                return mod >= 0 ? `+${mod}` : mod;
            };

            const formatSave = (val) => val >= 0 ? `+${val}` : val;

            const highlightTags = (text) => {
                return text
                    .replace(/(Poisoned|Frightened|Incapacitated|Prone|Grappled|Restrained|Stunned|Paralyzed|Unconscious)/g, '<span class="keyword-condition">$1</span>')
                    .replace(/(Multiattack|Dash|Disengage|Hide|Bite|Claw|Slam|Rock Throw|Greatclub)/g, '<span class="keyword-action">$1</span>')
                    .replace(/(Armor|Shield|Sword|Dagger|Mace|Crossbow|Bow)/g, '<span class="keyword-gear">$1</span>');
            };

            monsterCard.innerHTML = `
                <div class="monster-handbook-container">
                    <div class="monster-header">
                        <h1>${monster.name}</h1>
                        <p class="monster-meta">${monster.size} ${monster.type}, ${monster.alignment}</p>
                    </div>

                    <div class="monster-intro">
                        <p class="lore-text">${monster.lore}</p>
                        <p class="mythos-text">"${monster.mythos}"</p>
                    </div>

                    <div class="stat-block-2024">
                        <div class="top-row-stats">
                            <div class="stat-unit"><strong>Armor Class</strong> <span>${monster.ac}</span></div>
                            <div class="stat-unit"><strong>Initiative</strong> <span>${monster.initiative.mod >= 0 ? '+' : ''}${monster.initiative.mod} (${monster.initiative.score})</span></div>
                            <div class="stat-unit"><strong>Hit Points</strong> <span>${monster.hp.total} (${monster.hp.formula})</span></div>
                            <div class="stat-unit"><strong>Speed</strong> <span>30 ft., fly 60 ft.</span></div>
                        </div>

                        <div class="ability-scores-2024">
                            <div class="score-grid-container">
                                <div class="score-header">SCORE</div>
                                <div class="score-header">MOD</div>
                                <div class="score-header">SAVE</div>
                                
                                <strong>STR</strong> <div class="score-box">${monster.stats.str}</div> <div class="mod-box">${getMod(monster.stats.str)}</div> <div class="save-box">${formatSave(monster.saves.str)}</div>
                                <strong>DEX</strong> <div class="score-box">${monster.stats.dex}</div> <div class="mod-box">${getMod(monster.stats.dex)}</div> <div class="save-box">${formatSave(monster.saves.dex)}</div>
                                <strong>CON</strong> <div class="score-box">${monster.stats.con}</div> <div class="mod-box">${getMod(monster.stats.con)}</div> <div class="save-box">${formatSave(monster.saves.con)}</div>
                                <strong>INT</strong> <div class="score-box">${monster.stats.int}</div> <div class="mod-box">${getMod(monster.stats.int)}</div> <div class="save-box">${formatSave(monster.saves.int)}</div>
                                <strong>WIS</strong> <div class="score-box">${monster.stats.wis}</div> <div class="mod-box">${getMod(monster.stats.wis)}</div> <div class="save-box">${formatSave(monster.saves.wis)}</div>
                                <strong>CHA</strong> <div class="score-box">${monster.stats.cha}</div> <div class="mod-box">${getMod(monster.stats.cha)}</div> <div class="save-box">${formatSave(monster.saves.cha)}</div>
                            </div>
                        </div>

                        <div class="secondary-stats">
                            <p><strong>Skills</strong> Perception +${monster.saves.wis + 2}, Stealth +${monster.saves.dex + 2}</p>
                            <p><strong>Damage Immunities</strong> ${highlightTags('Poison, Psychic')}</p>
                            <p><strong>Condition Immunities</strong> ${highlightTags('Poisoned, Frightened')}</p>
                            <p><strong>Senses</strong> Darkvision 60 ft., Passive Perception ${10 + monster.saves.wis + 2}</p>
                            <p><strong>Languages</strong> Common, Deep Speech</p>
                            <p><strong>Challenge</strong> ${monster.cr} (XP ${monster.cr * 100}) <strong>Proficiency Bonus (PB)</strong> +${monster.pb}</p>
                        </div>

                        <div class="abilities-section">
                            <h3 class="section-title">Traits</h3>
                            ${monster.traits.map(t => `<p class="ability-entry"><strong>${t}.</strong> ${highlightTags('Key passive trait identifying this creature\'s unique nature.')}</p>`).join('')}

                            <h3 class="section-title">Actions</h3>
                            ${monster.actions.map(a => `<p class="ability-entry"><strong>${a}.</strong> ${highlightTags(`Melee Attack Rolls: +${monster.pb + Math.floor((monster.stats.str - 10) / 2)} to hit, reach 5 ft. Hit: ${7 + Math.floor((monster.stats.str - 10) / 2)} damage.`)}</p>`).join('')}

                            ${monster.bonusActions.length ? `
                            <h3 class="section-title">Bonus Actions</h3>
                            ${monster.bonusActions.map(ba => `<p class="ability-entry"><strong>${ba}.</strong> ${highlightTags('A quick maneuver used to gain the upper hand in combat.')}</p>`).join('')}
                            ` : ''}

                            ${monster.reactions.length ? `
                            <h3 class="section-title">Reactions</h3>
                            ${monster.reactions.map(r => `<p class="ability-entry"><strong>${r}.</strong> ${highlightTags('A quick response to an enemy\'s movement or attack.')}</p>`).join('')}
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        };
    });
})();
