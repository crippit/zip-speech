// injector.js
(function () {
    const HOST_ID = 'meet-voice-host';
    if (document.getElementById(HOST_ID)) return;

    // 1. Create Host
    const host = document.createElement('div');
    host.id = HOST_ID;
    host.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 99999;
    `;
    document.body.appendChild(host);

    // 2. Attach Shadow DOM
    const shadow = host.attachShadow({ mode: 'open' });

    // 3. Define HTML & CSS
    const htmlContent = `
    <style>
        :host { 
            all: initial; 
            font-family: 'Google Sans', 'Segoe UI', Roboto, sans-serif; 
        }

        .theme-wrapper {
            --zip-primary: #0056D2; 
            --zip-primary-dark: #0041a3; 
            --zip-bg: #FFFFFF;
            --zip-text-dark: #202124;
            --zip-text-light: #FFFFFF;
            --zip-border: #dadce0;
        }

        .container {
            width: 320px;
            background: var(--zip-bg);
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.18);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 1px solid var(--zip-border);
        }

        .header {
            background: var(--zip-primary);
            color: var(--zip-text-light);
            padding: 14px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: grab;
            user-select: none;
            height: 24px;
        }

        .header-title { 
            font-size: 15px; 
            font-weight: 600; 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            letter-spacing: 0.3px;
        }
        
        /* The Logo SVG Styling */
        .logo-svg {
            width: 20px;
            height: 20px;
            fill: white;
        }

        .header-actions { display: flex; gap: 12px; align-items: center; }
        .icon-btn { cursor: pointer; opacity: 0.8; font-size: 16px; transition: opacity 0.2s; }
        .icon-btn:hover { opacity: 1; }

        .view {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        #view-settings { display: none; background: #f8f9fa; }

        textarea {
            width: 100%;
            height: 90px;
            border: 1.5px solid var(--zip-border);
            border-radius: 8px;
            padding: 12px;
            font-family: inherit;
            font-size: 14px;
            color: var(--zip-text-dark);
            resize: none;
            box-sizing: border-box;
            outline: none;
        }
        textarea:focus { border-color: var(--zip-primary); }

        label { font-size: 12px; font-weight: 600; color: #5f6368; margin-bottom: -8px; }

        select {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--zip-border);
            border-radius: 6px;
            margin-bottom: 8px;
            background: white;
            font-size: 13px;
        }

        button {
            width: 100%;
            background: var(--zip-primary);
            color: var(--zip-text-light);
            border: none;
            padding: 10px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 500;
        }
        button:hover { background-color: var(--zip-primary-dark); }
        
        .hint { font-size: 11px; color: #5f6368; text-align: center; }
    </style>

    <div class="theme-wrapper">
        <div class="container">
            <div class="header">
                <div class="header-title">
                    <svg class="logo-svg" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 11l-1-3.5L6.5 8.5H10l1-3.5 3.5 6H11z"/>
                    </svg>
                    Zip Speech
                </div>
                <div class="header-actions">
                    <span id="settings-btn" class="icon-btn" title="Settings">⚙️</span>
                    <span id="close-btn" class="icon-btn" title="Close">✕</span>
                </div>
            </div>

            <div id="view-main" class="view">
                <textarea id="text-input" placeholder="Type here..."></textarea>
                <button id="speak-btn">Speak</button>
                <div class="hint">Press <strong>Ctrl+Enter</strong> to send</div>
            </div>

            <div id="view-settings" class="view">
                <label>Voice / Accent (Google)</label>
                <select id="lang-select">
                    <optgroup label="English Accents">
                        <option value="en-US" selected>🇺🇸 American English</option>
                        <option value="en-GB">🇬🇧 British English</option>
                        <option value="en-AU">🇦🇺 Australian English</option>
                        <option value="en-IN">🇮🇳 Indian English</option>
                    </optgroup>
                    <optgroup label="European Languages">
                        <option value="fr-FR">🇫🇷 French</option>
                        <option value="es-ES">🇪🇸 Spanish</option>
                        <option value="de-DE">🇩🇪 German</option>
                        <option value="it-IT">🇮🇹 Italian</option>
                        <option value="pt-BR">🇧🇷 Portuguese</option>
                    </optgroup>
                    <optgroup label="Asian Languages">
                        <option value="ja-JP">🇯🇵 Japanese</option>
                        <option value="zh-CN">🇨🇳 Chinese</option>
                    </optgroup>
                </select>
                <button id="back-btn" style="background: #5f6368; margin-top: 8px;">Back</button>
            </div>
        </div>
    </div>
    `;

    shadow.innerHTML = htmlContent;

    // 4. Get Elements
    const hostEl = host;
    const header = shadow.querySelector('.header');
    const closeBtn = shadow.querySelector('#close-btn');
    const settingsBtn = shadow.querySelector('#settings-btn');
    const backBtn = shadow.querySelector('#back-btn');

    const viewMain = shadow.querySelector('#view-main');
    const viewSettings = shadow.querySelector('#view-settings');

    const textInput = shadow.querySelector('#text-input');
    const speakBtn = shadow.querySelector('#speak-btn');
    const langSelect = shadow.querySelector('#lang-select');

    // 5. Toggle Views
    settingsBtn.addEventListener('click', () => {
        viewMain.style.display = 'none';
        viewSettings.style.display = 'flex';
    });

    backBtn.addEventListener('click', () => {
        viewSettings.style.display = 'none';
        viewMain.style.display = 'flex';
        textInput.focus();
    });

    closeBtn.addEventListener('click', () => hostEl.remove());

    textInput.focus();

    // 6. Speak Logic
    const handleSpeak = () => {
        const text = textInput.value.trim();
        const lang = langSelect.value;
        if (!text) return;

        chrome.runtime.sendMessage({
            action: "FETCH_AUDIO",
            text: text,
            lang: lang
        });

        textInput.value = '';
        textInput.focus();
    };

    speakBtn.addEventListener('click', handleSpeak);

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSpeak();
        }
    });

    // 7. Dragging Logic
    let isDragging = false;
    let startX, startY, initialRight, initialBottom;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('icon-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = host.getBoundingClientRect();
        initialRight = window.innerWidth - rect.right;
        initialBottom = window.innerHeight - rect.bottom;
        header.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = startX - e.clientX;
        const dy = startY - e.clientY;
        host.style.right = `${initialRight + dx}px`;
        host.style.bottom = `${initialBottom + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        header.style.cursor = 'grab';
    });
})();