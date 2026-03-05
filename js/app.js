// LoreForge - Combined Logic & Data
(function () {
    const MONSTER_DATA = {
        types: [
            {
                name: 'Aberration', traits: ['Antimagic Field', 'Telepathy', 'Amorphous'], actions: ['Psychic Blast', 'Tentacle Lash'],
                lore: "Born from the far realms beyond space and time, these entities defy natural laws."
            },
            {
                name: 'Beast', traits: ['Pack Tactics', 'Keen Senses', 'Pounce'], actions: ['Bite', 'Claw', 'Gore'],
                lore: "Apex predators of the natural world, driven by instinct and primal savagery."
            },
            {
                name: 'Construct', traits: ['Antimagic Susceptibility', 'Magic Resistance', 'Immutable Form'], actions: ['Slam', 'Force Beam'],
                lore: "Artificially animated through ancient rituals or forgotten engineering."
            },
            {
                name: 'Dragon', traits: ['Legendary Resistance', 'Frightful Presence'], actions: ['Breathe Fire', 'Multiattack', 'Tail Swipe'],
                lore: "The undisputed masters of the skies, hoarding power and wealth for eons."
            },
            {
                name: 'Elemental', traits: ['Elemental Form', 'Illumination'], actions: ['slab', 'Elemental Ray'],
                lore: "Incarnations of the core forces of nature, bound to this plane by raw will."
            },
            {
                name: 'Fey', traits: ['Magic Resistance', 'Fey Ancestry'], actions: ['Charm', 'Sylvan Dagger'],
                lore: "Denizens of the Feywild, as beautiful as they are capricious and deadly."
            },
            {
                name: 'Fiend', traits: ['Magic Resistance', 'Devil\'s Sight'], actions: ['Hellfire Orb', 'Spiked Chain'],
                lore: "Corrupted souls from the lower planes, existing only to spread misery."
            },
            {
                name: 'Giant', traits: ['Aggressive', 'Siege Monster'], actions: ['Rock Throw', 'Greatclub'],
                lore: "Titans of old, whose footsteps once shaped the very mountains they inhabit."
            },
            {
                name: 'Monstrosity', traits: ['Magic Resistance', 'Keen Senses'], actions: ['Multiattack', 'Bite'],
                lore: "Abominations created through dark magic or twisted evolutionary paths."
            },
            {
                name: 'Ooze', traits: ['Amorphous', 'Corrosive Form'], actions: ['Pseudopod', 'Engulf'],
                lore: "Mindless predators that dissolve everything in their path with relentless hunger."
            },
            {
                name: 'Plant', traits: ['False Appearance', 'Thorn Body'], actions: ['Vine Lash', 'Spore Burst'],
                lore: "Sentient flora that have claimed the deep wilds as their own."
            },
            {
                name: 'Undead', traits: ['Undead Fortitude', 'Incorporeal Movement'], actions: ['Life Drain', 'Wither'],
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
        sizes: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']
    };

    class MonsterGenerator {
        constructor() {
            this.data = MONSTER_DATA;
        }

        generate(params = {}) {
            const typeObj = this._getType(params.type);
            const name = this._generateName(typeObj.name);
            const size = this._getSize();
            const cr = params.cr || Math.floor(Math.random() * 30);
            const alignment = this._getAlignment();
            const stats = this._generateStats(cr);
            const traits = this._getAbilities(typeObj.traits, 2);
            const actions = this._getAbilities(typeObj.actions, 2);

            // Generate Lore
            const loreText = this._generateLore(name, typeObj.lore);
            const mythosText = this._generateMythos(name);

            return {
                name,
                type: typeObj.name,
                size,
                alignment,
                cr,
                ac: 10 + Math.floor(cr / 2) + Math.floor(stats.dex / 4),
                hp: (cr + 1) * 10 + Math.floor(Math.random() * 20),
                stats,
                traits,
                actions,
                lore: loreText,
                mythos: mythosText,
                description: `A ${size.toLowerCase()} ${typeObj.name.toLowerCase()}, feared for its ${traits[0].toLowerCase()} and ${actions[0].toLowerCase()}.`
            };
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
        const generateImageBtn = document.getElementById('generate-image-btn');
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
                filename: `${currentMonster.name}_bestiary.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        });

        const renderMonster = (monster) => {
            monsterCard.classList.remove('empty-state');
            cardActions.classList.remove('hidden');
            generateImageBtn.classList.remove('hidden');

            monsterCard.innerHTML = `
                <div class="monster-header-layout">
                    <div id="monster-image" class="monster-image-container">
                        <div class="ritual-placeholder" style="height: 100%;">
                            <div class="rune-circle" style="width: 100px; height: 100px;"></div>
                            <p style="font-size: 0.8rem; color: #8b0000;">Ritual for Image Manifestation</p>
                        </div>
                    </div>
                    <div class="monster-lore-column">
                        <h2>The ${monster.name}</h2>
                        <p>${monster.lore}</p>
                        <hr class="red-rule">
                        <p style="font-style: italic;">"${monster.mythos}"</p>
                    </div>
                </div>

                <div class="stat-block-container">
                    <div class="stat-block-column">
                        <h3>${monster.name}</h3>
                        <p style="font-style: italic; color: #444;">${monster.size} ${monster.type}, ${monster.alignment}</p>
                        <hr>
                        <div class="stat-group"><strong>Armor Class</strong> ${monster.ac}</div>
                        <div class="stat-group"><strong>Hit Points</strong> ${monster.hp}</div>
                        <div class="stat-group"><strong>Speed</strong> 30 ft.</div>
                        <hr>
                        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(6, 1fr); text-align: center; margin: 1rem 0;">
                            <div><strong>STR</strong><br>${monster.stats.str}</div>
                            <div><strong>DEX</strong><br>${monster.stats.dex}</div>
                            <div><strong>CON</strong><br>${monster.stats.con}</div>
                            <div><strong>INT</strong><br>${monster.stats.int}</div>
                            <div><strong>WIS</strong><br>${monster.stats.wis}</div>
                            <div><strong>CHA</strong><br>${monster.stats.cha}</div>
                        </div>
                        <hr>
                        <div class="stat-group"><strong>Challenge</strong> ${monster.cr}</div>
                        <hr>
                    </div>
                    
                    <div class="stat-block-column">
                        <h4 style="color: #8b0000; font-family: 'Cinzel', serif; border-bottom: 2px solid #8b0000;">Traits</h4>
                        ${monster.traits.map(t => `<p><strong>${t}.</strong> Key trait identifying this creature type.</p>`).join('')}
                        
                        <h4 style="color: #8b0000; font-family: 'Cinzel', serif; border-bottom: 2px solid #8b0000; margin-top: 1rem;">Actions</h4>
                        ${monster.actions.map(a => `<p><strong>${a}.</strong> <em>Melee:</em> +${Math.floor(monster.stats.str / 3)} to hit. <em>Hit:</em> 12 damage.</p>`).join('')}
                    </div>
                </div>
            `;
        };

        generateImageBtn.addEventListener('click', () => {
            if (!currentMonster) return;

            const imageContainer = document.getElementById('monster-image');
            generateImageBtn.disabled = true;
            generateImageBtn.innerHTML = '✨ Manifesting...';

            imageContainer.innerHTML = `
                <div class="manifesting-wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #8b0000;">
                    <div class="spinner" style="width: 40px; height: 40px; border: 3px solid rgba(139, 0, 0, 0.1); border-top-color: #8b0000; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <span style="font-family: var(--font-heading); font-size: 0.8rem; margin-top: 1rem;">Accessing Archives...</span>
                </div>
            `;

            // Detect if running on a live server vs local file
            const isLocalFile = window.location.protocol === 'file:';
            const seed = Math.floor(Math.random() * 10000);
            const promptValue = `high fidelity fantasy painting, detailed monster art, ${currentMonster.size} ${currentMonster.type} called ${currentMonster.name}, ${currentMonster.description}, cinematic lighting, dark fantasy, artstation style, 8k resolution`;

            // In a live environment, we use our serverless API proxy to bypass CORS/security issues
            // Locally, we still try the direct URL but expect possible blocks
            const imageUrl = isLocalFile
                ? `https://pollinations.ai/p/${encodeURIComponent(promptValue)}?width=800&height=1000&seed=${seed}&nologo=true`
                : `/api/generate-image?prompt=${encodeURIComponent(promptValue)}&seed=${seed}`;

            // Fallback strategy
            const getFallbackImage = (type) => {
                const lowerType = type.toLowerCase();
                if (lowerType === 'dragon') return 'assets/dragon.png';
                if (['undead', 'fiend', 'aberration', 'ooze'].includes(lowerType)) return 'assets/undead.png';
                return 'assets/beast.png';
            };

            const fallbackUrl = getFallbackImage(currentMonster.type);

            const img = new Image();
            img.onload = () => {
                imageContainer.innerHTML = `<img src="${imageUrl}" alt="${currentMonster.name}" class="fade-in" style="width: 100%; height: 100%; object-fit: cover;">`;
                generateImageBtn.disabled = false;
                generateImageBtn.innerHTML = '✨ Remanifest Portrait';
            };
            img.onerror = () => {
                console.warn('Real-time manifestation blocked or failed. Using archival fallback.');
                imageContainer.innerHTML = `<img src="${fallbackUrl}" alt="${currentMonster.name}" class="fade-in" style="width: 100%; height: 100%; object-fit: cover;">`;
                generateImageBtn.disabled = false;
                generateImageBtn.innerHTML = '✨ Manifest from Archives';

                const hint = document.createElement('div');
                hint.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0,0,0,0.6); font-size: 0.5rem; color: #fff; text-align: center; padding: 2px;';
                hint.textContent = 'Archival Mode (CORS Restricted)';
                imageContainer.appendChild(hint);
            };
            img.src = imageUrl;
        });

        if (!document.getElementById('forge-animations')) {
            const style = document.createElement('style');
            style.id = 'forge-animations';
            style.innerHTML = `
                @keyframes spin { to { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }
    });
})();
