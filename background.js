// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SPEAK") {
        console.log("Zip Speech: Fetching TTS...", request.text);

        // 1. Send immediate receipt to prevent "Channel Closed" error
        sendResponse({ status: "processing" });

        // 2. Perform the fetch
        fetchTTS(request.text, request.lang, sender.tab.id);
    }
    return true; // Keep channel open just in case
});

async function fetchTTS(text, lang, tabId) {
    try {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang || 'en'}&client=tw-ob`;
        const response = await fetch(url);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
            // Send audio data back to tab
            chrome.tabs.sendMessage(tabId, {
                action: "INJECT_AUDIO_DATA",
                data: reader.result
            });
        };
        reader.readAsDataURL(blob);

    } catch (error) {
        console.error("Zip Speech: Fetch Error", error);
    }
}