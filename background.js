// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "FETCH_AUDIO") {
        const targetTabId = request.tabId || sender.tab.id;
        // Default to 'en' if nothing is sent
        handleAudioFetch(request.text, request.lang || 'en', targetTabId);
    }
});

async function handleAudioFetch(text, lang, tabId) {
    try {
        console.log(`Background: Fetching audio for: "${text}" in language: ${lang}`);

        // We use the Google Translate 'unofficial' API which is free and Keyless.
        // 'client=tw-ob' is the magic parameter that provides the MP3.
        // 'tl' (Target Language) controls the accent (e.g., en-au = Australian).
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

        const response = await fetch(url);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;

            chrome.tabs.sendMessage(tabId, {
                action: "INJECT_AUDIO_DATA",
                data: base64data
            });
        };
    } catch (err) {
        console.error("Background Fetch Error:", err);
    }
}