// injector.js - v5.1 (OpenMoji Integration)
(function () {
    console.log("Zip Speech: Injector Loaded 🎨");

    // 1. Language Definitions
    const LANGUAGES = [
        { code: "en-US", name: "🇺🇸 English (US)" },
        { code: "en-GB", name: "🇬🇧 English (UK)" },
        { code: "fr-FR", name: "🇫🇷 French (France)" },
        { code: "fr-CA", name: "🇨🇦 French (Canada)" },
        { code: "es-ES", name: "🇪🇸 Spanish (Spain)" },
        { code: "es-MX", name: "🇲🇽 Spanish (Mexico)" },
        { code: "de-DE", name: "🇩🇪 German" },
        { code: "it-IT", name: "🇮🇹 Italian" },
        { code: "pt-BR", name: "🇧🇷 Portuguese (Brazil)" },
        { code: "nl-NL", name: "🇳🇱 Dutch" },
        { code: "ja-JP", name: "🇯🇵 Japanese" },
        { code: "ko-KR", name: "🇰🇷 Korean" },
        { code: "zh-CN", name: "🇨🇳 Chinese (Mandarin)" },
        { code: "ru-RU", name: "🇷🇺 Russian" },
        { code: "hi-IN", name: "🇮🇳 Hindi" },
        { code: "ar-XA", name: "🇸🇦 Arabic" }
    ];

    // 2. Full Translations (Starter Pack)
    const TILE_TRANSLATIONS = {
        "en": [
            { id: "hello", label: "👋 Hello", text: "Hello everyone", color: "#E3F2FD" },
            { id: "yes", label: "✅ Yes", text: "Yes, I agree", color: "#C8E6C9" },
            { id: "no", label: "❌ No", text: "No, I don't think so", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Thanks", text: "Thank you", color: "#FFF9C4" },
            { id: "wait", label: "✋ Wait", text: "Please wait a moment", color: "#FFE0B2" },
            { id: "question", label: "❓ Question", text: "I have a question", color: "#E1BEE7" }
        ],
        "fr": [
            { id: "hello", label: "👋 Bonjour", text: "Bonjour tout le monde", color: "#E3F2FD" },
            { id: "yes", label: "✅ Oui", text: "Oui, je suis d'accord", color: "#C8E6C9" },
            { id: "no", label: "❌ Non", text: "Non, je ne pense pas", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Merci", text: "Merci beaucoup", color: "#FFF9C4" },
            { id: "wait", label: "✋ Attends", text: "Attendez un instant s'il vous plaît", color: "#FFE0B2" },
            { id: "question", label: "❓ Question", text: "J'ai une question", color: "#E1BEE7" }
        ],
        "es": [
            { id: "hello", label: "👋 Hola", text: "Hola a todos", color: "#E3F2FD" },
            { id: "yes", label: "✅ Sí", text: "Sí, estoy de acuerdo", color: "#C8E6C9" },
            { id: "no", label: "❌ No", text: "No, no me parece", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Gracias", text: "Muchas gracias", color: "#FFF9C4" },
            { id: "wait", label: "✋ Espera", text: "Un momento por favor", color: "#FFE0B2" },
            { id: "question", label: "❓ Pregunta", text: "Tengo una pregunta", color: "#E1BEE7" }
        ],
        "de": [
            { id: "hello", label: "👋 Hallo", text: "Hallo zusammen", color: "#E3F2FD" },
            { id: "yes", label: "✅ Ja", text: "Ja, ich stimme zu", color: "#C8E6C9" },
            { id: "no", label: "❌ Nein", text: "Nein, das glaube ich nicht", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Danke", text: "Vielen Dank", color: "#FFF9C4" },
            { id: "wait", label: "✋ Warte", text: "Einen Moment bitte", color: "#FFE0B2" },
            { id: "question", label: "❓ Frage", text: "Ich habe eine Frage", color: "#E1BEE7" }
        ],
        "it": [
            { id: "hello", label: "👋 Ciao", text: "Ciao a tutti", color: "#E3F2FD" },
            { id: "yes", label: "✅ Sì", text: "Sì, sono d'accordo", color: "#C8E6C9" },
            { id: "no", label: "❌ No", text: "No, non credo", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Grazie", text: "Grazie mille", color: "#FFF9C4" },
            { id: "wait", label: "✋ Aspetta", text: "Un momento per favore", color: "#FFE0B2" },
            { id: "question", label: "❓ Domanda", text: "Ho una domanda", color: "#E1BEE7" }
        ],
        "pt": [
            { id: "hello", label: "👋 Olá", text: "Olá a todos", color: "#E3F2FD" },
            { id: "yes", label: "✅ Sim", text: "Sim, eu concordo", color: "#C8E6C9" },
            { id: "no", label: "❌ Não", text: "Não, acho que não", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Obrigado", text: "Muito obrigado", color: "#FFF9C4" },
            { id: "wait", label: "✋ Espere", text: "Um momento, por favor", color: "#FFE0B2" },
            { id: "question", label: "❓ Pergunta", text: "Eu tenho uma pergunta", color: "#E1BEE7" }
        ],
        "nl": [
            { id: "hello", label: "👋 Hallo", text: "Hallo iedereen", color: "#E3F2FD" },
            { id: "yes", label: "✅ Ja", text: "Ja, ik ben het ermee eens", color: "#C8E6C9" },
            { id: "no", label: "❌ Nee", text: "Nee, dat denk ik niet", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Bedankt", text: "Dank je wel", color: "#FFF9C4" },
            { id: "wait", label: "✋ Wacht", text: "Een ogenblik alsjeblieft", color: "#FFE0B2" },
            { id: "question", label: "❓ Vraag", text: "Ik heb een vraag", color: "#E1BEE7" }
        ],
        "ja": [
            { id: "hello", label: "👋 こんにちは", text: "こんにちは、皆さん", color: "#E3F2FD" },
            { id: "yes", label: "✅ はい", text: "はい、そうです", color: "#C8E6C9" },
            { id: "no", label: "❌ いいえ", text: "いいえ、違います", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 ありがとう", text: "ありがとうございます", color: "#FFF9C4" },
            { id: "wait", label: "✋ 待って", text: "少々お待ちください", color: "#FFE0B2" },
            { id: "question", label: "❓ 質問", text: "質問があります", color: "#E1BEE7" }
        ],
        "ko": [
            { id: "hello", label: "👋 안녕하세요", text: "안녕하세요 여러분", color: "#E3F2FD" },
            { id: "yes", label: "✅ 네", text: "네, 맞습니다", color: "#C8E6C9" },
            { id: "no", label: "❌ 아니요", text: "아니요, 그렇지 않습니다", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 감사합니다", text: "감사합니다", color: "#FFF9C4" },
            { id: "wait", label: "✋ 잠시만요", text: "잠시만 기다려 주세요", color: "#FFE0B2" },
            { id: "question", label: "❓ 질문", text: "질문이 있습니다", color: "#E1BEE7" }
        ],
        "zh": [
            { id: "hello", label: "👋 你好", text: "大家好", color: "#E3F2FD" },
            { id: "yes", label: "✅ 是的", text: "是的，我同意", color: "#C8E6C9" },
            { id: "no", label: "❌ 不", text: "不，我不这么认为", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 谢谢", text: "谢谢大家", color: "#FFF9C4" },
            { id: "wait", label: "✋ 等一下", text: "请稍等一下", color: "#FFE0B2" },
            { id: "question", label: "❓ 问题", text: "我有一个问题", color: "#E1BEE7" }
        ],
        "ru": [
            { id: "hello", label: "👋 Привет", text: "Всем привет", color: "#E3F2FD" },
            { id: "yes", label: "✅ Да", text: "Да, я согласен", color: "#C8E6C9" },
            { id: "no", label: "❌ Нет", text: "Нет, я так не думаю", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 Спасибо", text: "Спасибо большое", color: "#FFF9C4" },
            { id: "wait", label: "✋ Подождите", text: "Подождите минуту, пожалуйста", color: "#FFE0B2" },
            { id: "question", label: "❓ Вопрос", text: "У меня есть вопрос", color: "#E1BEE7" }
        ],
        "hi": [
            { id: "hello", label: "👋 नमस्ते", text: "नमस्ते सबको", color: "#E3F2FD" },
            { id: "yes", label: "✅ हाँ", text: "हाँ, मैं सहमत हूँ", color: "#C8E6C9" },
            { id: "no", label: "❌ नहीं", text: "नहीं, मुझे ऐसा नहीं लगता", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 धन्यवाद", text: "धन्यवाद", color: "#FFF9C4" },
            { id: "wait", label: "✋ रुकिए", text: "कृपया एक पल रुकिए", color: "#FFE0B2" },
            { id: "question", label: "❓ सवाल", text: "मेरा एक सवाल है", color: "#E1BEE7" }
        ],
        "ar": [
            { id: "hello", label: "👋 مرحبًا", text: "مرحبًا بالجميع", color: "#E3F2FD" },
            { id: "yes", label: "✅ نعم", text: "نعم، أنا أوافق", color: "#C8E6C9" },
            { id: "no", label: "❌ لا", text: "لا، لا أعتقد ذلك", color: "#FFCDD2" },
            { id: "thanks", label: "🙏 شكرًا", text: "شكرًا جزيلاً", color: "#FFF9C4" },
            { id: "wait", label: "✋ انتظر", text: "انتظر لحظة من فضلك", color: "#FFE0B2" },
            { id: "question", label: "❓ سؤال", text: "لدي سؤال", color: "#E1BEE7" }
        ]
    };

    const getDefaultsFor = (langCode) => {
        const short = langCode ? langCode.split('-')[0] : 'en';
        return JSON.parse(JSON.stringify(TILE_TRANSLATIONS[short] || TILE_TRANSLATIONS['en']));
    };

    let activeTiles = [];
    let deletedDefaultIds = [];
    let selectedColor = '#E0E0E0';

    const createInterface = () => {
        if (document.getElementById('zip-speech-container')) return;

        const container = document.createElement('div');
        container.id = 'zip-speech-container';
        container.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; width: 320px;
            background: #ffffff; border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25); z-index: 999999;
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            overflow: hidden; display: flex; flex-direction: column;
            transition: width 0.3s ease;
        `;

        const optionsHTML = LANGUAGES.map(lang =>
            `<option value="${lang.code}">${lang.name}</option>`
        ).join('');

        container.innerHTML = `
            <div style="background: #0056D2; padding: 12px; color: white; display: flex; align-items: center; justify-content: space-between; cursor: grab; user-select: none;" id="zip-header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 700;">Zip Speech</span>
                    <div style="background: rgba(255,255,255,0.2); padding: 2px; border-radius: 12px; display: flex;" id="mode-toggle-wrapper">
                        <button id="mode-type" style="background: white; color: #0056D2; border: none; padding: 4px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; cursor: pointer;">ABC</button>
                        <button id="mode-aac" style="background: transparent; color: white; border: none; padding: 4px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; cursor: pointer;">AAC</button>
                    </div>
                </div>
                <div style="cursor: pointer; opacity: 0.8; font-size: 18px; width: 24px; text-align: center;" id="zip-minimize">−</div>
            </div>

            <div id="zip-content" style="padding: 16px; background: #F8F9FA; flex-grow: 1; overflow-y: auto; max-height: 60vh;">
                <div id="view-keyboard">
                    <textarea id="zip-input" placeholder="Type to speak..." style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: none; margin-bottom: 12px;"></textarea>
                    <div style="display: flex; gap: 8px;">
                        <select id="zip-voice" style="flex: 1; padding: 8px; border-radius: 20px; border: 1px solid #ddd;">
                            ${optionsHTML}
                        </select>
                        <button id="zip-speak-btn" style="background: #0056D2; color: white; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: 600;">Speak</button>
                    </div>
                </div>

                <div id="view-aac" style="display: none;">
                    <div id="aac-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;"></div>
                    <button id="add-tile-btn" style="width: 100%; padding: 8px; border: 1px dashed #ccc; border-radius: 8px; background: white; color: #666; cursor: pointer;">+ Add Tile</button>
                    
                    <div id="add-tile-form" style="display: none; margin-top: 10px; padding: 10px; background: #fff; border-radius: 8px; border: 1px solid #eee;">
                        <input id="new-tile-label" placeholder="Label (e.g. Pizza)" style="width: 100%; margin-bottom: 8px; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                        <input id="new-tile-text" placeholder="Text to Speak" style="width: 100%; margin-bottom: 8px; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                        
                        <div style="display: flex; gap: 5px; margin-bottom: 12px;">
                            <input id="new-tile-image" placeholder="Image URL (Right-click image > Copy Address)" style="flex: 1; padding: 6px; border: 1px solid #ddd; border-radius: 4px;">
                            <a id="openmoji-link" href="https://openmoji.org/library" target="_blank" style="display: flex; align-items: center; justify-content: center; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; padding: 0 10px; text-decoration: none; color: #333; font-size: 12px; font-weight: bold; min-width: 80px;">🔍 Find Icon</a>
                        </div>
                        
                        <div style="font-size: 11px; color: #666; margin-bottom: 5px;">Tile Color:</div>
                        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                            <div class="color-swatch" data-color="#E0E0E0" style="width: 20px; height: 20px; background: #E0E0E0; border-radius: 50%; cursor: pointer; border: 2px solid #999;"></div>
                            <div class="color-swatch" data-color="#FFCDD2" style="width: 20px; height: 20px; background: #FFCDD2; border-radius: 50%; cursor: pointer; border: 1px solid #ddd;"></div>
                            <div class="color-swatch" data-color="#C8E6C9" style="width: 20px; height: 20px; background: #C8E6C9; border-radius: 50%; cursor: pointer; border: 1px solid #ddd;"></div>
                            <div class="color-swatch" data-color="#BBDEFB" style="width: 20px; height: 20px; background: #BBDEFB; border-radius: 50%; cursor: pointer; border: 1px solid #ddd;"></div>
                            <div class="color-swatch" data-color="#FFF9C4" style="width: 20px; height: 20px; background: #FFF9C4; border-radius: 50%; cursor: pointer; border: 1px solid #ddd;"></div>
                            <div class="color-swatch" data-color="#E1BEE7" style="width: 20px; height: 20px; background: #E1BEE7; border-radius: 50%; cursor: pointer; border: 1px solid #ddd;"></div>
                        </div>

                        <div style="display: flex; gap: 5px;">
                            <button id="save-tile" style="flex: 1; background: #4CAF50; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer;">Save</button>
                            <button id="cancel-tile" style="flex: 1; background: #f44336; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer;">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        const aacGrid = container.querySelector('#aac-grid');
        const voiceSelect = container.querySelector('#zip-voice');
        const textarea = container.querySelector('#zip-input');

        // REBUILD TILES
        const rebuildTiles = (langCode, savedTiles = [], deletedIds = []) => {
            const defaults = getDefaultsFor(langCode).filter(t => !deletedIds.includes(t.id));
            const customTiles = savedTiles.filter(t => {
                if (t.isCustom) return true;
                if (!t.id) {
                    const isKnownDefault = ["👋 Hello", "✅ Yes", "❌ No", "🙏 Thanks", "✋ Wait", "❓ Question"].includes(t.label);
                    return !isKnownDefault;
                }
                return false;
            });
            activeTiles = [...defaults, ...customTiles];
            renderTiles(aacGrid);
        };

        // STORAGE LOAD
        if (chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['zipTiles', 'lastLang', 'deletedDefaultIds'], (result) => {
                const lang = result.lastLang || 'en-US';
                deletedDefaultIds = result.deletedDefaultIds || [];
                voiceSelect.value = lang;
                rebuildTiles(lang, result.zipTiles || [], deletedDefaultIds);
            });
        } else {
            rebuildTiles('en-US');
        }

        // EVENTS
        voiceSelect.addEventListener('change', () => {
            const newLang = voiceSelect.value;
            if (chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ lastLang: newLang });
                chrome.storage.local.get(['zipTiles'], (result) => {
                    rebuildTiles(newLang, result.zipTiles || [], deletedDefaultIds);
                });
            } else {
                rebuildTiles(newLang, []);
            }
        });

        const speak = (text) => {
            if (!text) return;
            const lang = voiceSelect.value || 'en-US';
            console.log(`Zip Speech: Speaking (${lang}) ->`, text);
            try {
                chrome.runtime.sendMessage({ action: "SPEAK", text: text, lang: lang });
            } catch (e) { console.error("Zip Speech: Message failed", e); }
        };

        const renderTiles = (gridElement) => {
            if (!gridElement) return;
            gridElement.innerHTML = '';
            activeTiles.forEach((tile, index) => {
                const btn = document.createElement('button');
                btn.style.cssText = `
                    background: ${tile.color}; border: none; padding: 10px 5px;
                    border-radius: 8px; font-weight: 600; color: #333;
                    cursor: pointer; box-shadow: 0 2px 0 rgba(0,0,0,0.1); 
                    min-height: 60px; display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; gap: 5px;
                    word-break: break-word; overflow: hidden;
                `;

                if (tile.image) {
                    const img = document.createElement('img');
                    img.src = tile.image;
                    img.style.cssText = "width: 40px; height: 40px; object-fit: contain; display: block;";
                    img.onerror = () => { img.style.display = 'none'; };
                    btn.appendChild(img);
                }

                const span = document.createElement('span');
                span.innerText = tile.label;
                btn.appendChild(span);

                btn.onmousedown = () => btn.style.transform = "scale(0.95)";
                btn.onmouseup = () => btn.style.transform = "scale(1)";
                btn.onclick = () => speak(tile.text);

                btn.oncontextmenu = (e) => {
                    e.preventDefault();
                    if (confirm(`Delete "${tile.label}"?`)) {
                        if (tile.id) {
                            deletedDefaultIds.push(tile.id);
                            if (chrome.storage && chrome.storage.local) chrome.storage.local.set({ deletedDefaultIds: deletedDefaultIds });
                        }
                        activeTiles.splice(index, 1);
                        if (chrome.storage && chrome.storage.local) chrome.storage.local.set({ zipTiles: activeTiles });
                        renderTiles(gridElement);
                    }
                };
                gridElement.appendChild(btn);
            });
        };

        // --- OPENMOJI & COLOR UI ---
        const swatches = container.querySelectorAll('.color-swatch');
        swatches.forEach(s => {
            s.onclick = () => {
                swatches.forEach(sw => sw.style.border = '1px solid #ddd');
                s.style.border = '2px solid #0056D2';
                selectedColor = s.getAttribute('data-color');
            };
        });

        // Smart Search Link Logic
        const labelInput = container.querySelector('#new-tile-label');
        const openMojiLink = container.querySelector('#openmoji-link');

        labelInput.addEventListener('input', () => {
            const val = labelInput.value.trim();
            if (val.length > 0) {
                openMojiLink.href = `https://openmoji.org/library/#search=${encodeURIComponent(val)}`;
                openMojiLink.innerHTML = `🔍 Find '${val}'`;
            } else {
                openMojiLink.href = `https://openmoji.org/library`;
                openMojiLink.innerHTML = `🔍 Find Icon`;
            }
        });

        // Standard UI Toggles
        const minimizeBtn = container.querySelector('#zip-minimize');
        const contentArea = container.querySelector('#zip-content');
        const modeWrapper = container.querySelector('#mode-toggle-wrapper');

        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (contentArea.style.display !== 'none') {
                contentArea.style.display = 'none';
                minimizeBtn.innerText = '+';
                container.style.width = '200px';
                modeWrapper.style.display = 'none';
            } else {
                contentArea.style.display = 'block';
                minimizeBtn.innerText = '−';
                container.style.width = '320px';
                modeWrapper.style.display = 'flex';
            }
        });

        const btnType = container.querySelector('#mode-type');
        const btnAAC = container.querySelector('#mode-aac');
        const viewKeyboard = container.querySelector('#view-keyboard');
        const viewAAC = container.querySelector('#view-aac');

        btnType.onclick = () => {
            viewKeyboard.style.display = 'block';
            viewAAC.style.display = 'none';
            btnType.style.background = 'white'; btnType.style.color = '#0056D2';
            btnAAC.style.background = 'transparent'; btnAAC.style.color = 'white';
        };

        btnAAC.onclick = () => {
            viewKeyboard.style.display = 'none';
            viewAAC.style.display = 'block';
            renderTiles(aacGrid);
            btnAAC.style.background = 'white'; btnAAC.style.color = '#0056D2';
            btnType.style.background = 'transparent'; btnType.style.color = 'white';
        };

        container.querySelector('#zip-speak-btn').onclick = () => {
            speak(textarea.value.trim());
            textarea.value = '';
        };
        textarea.onkeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); speak(textarea.value.trim()); textarea.value = ''; }
        };

        const addBtn = container.querySelector('#add-tile-btn');
        const addForm = container.querySelector('#add-tile-form');
        addBtn.onclick = () => { addForm.style.display = 'block'; addBtn.style.display = 'none'; };
        container.querySelector('#cancel-tile').onclick = () => { addForm.style.display = 'none'; addBtn.style.display = 'block'; };

        container.querySelector('#save-tile').onclick = () => {
            const label = container.querySelector('#new-tile-label').value;
            const text = container.querySelector('#new-tile-text').value;
            const image = container.querySelector('#new-tile-image').value;

            if (label && text) {
                activeTiles.push({
                    label,
                    text,
                    color: selectedColor,
                    image: image || null,
                    isCustom: true
                });

                if (chrome.storage && chrome.storage.local) chrome.storage.local.set({ zipTiles: activeTiles });
                renderTiles(aacGrid);

                container.querySelector('#new-tile-label').value = '';
                container.querySelector('#new-tile-text').value = '';
                container.querySelector('#new-tile-image').value = '';
                addForm.style.display = 'none';
                addBtn.style.display = 'block';
            }
        };

        renderTiles(aacGrid);

        // DRAG
        let isDragging = false;
        let startX, startY, initialX = 0, initialY = 0;
        const header = container.querySelector('#zip-header');
        header.addEventListener('mousedown', (e) => {
            if (e.target === minimizeBtn || e.target.tagName === 'BUTTON') return;
            isDragging = true;
            startX = e.clientX - initialX;
            startY = e.clientY - initialY;
        });
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            initialX = e.clientX - startX;
            initialY = e.clientY - startY;
            container.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
        });
    };

    if (document.body) {
        createInterface();
    } else {
        window.addEventListener('DOMContentLoaded', createInterface);
    }
})();