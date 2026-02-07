// content-bridge.js

// 1. Listen for audio data coming from the Background Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "INJECT_AUDIO_DATA") {
        // Pass the data to the Main World (content-main.js)
        window.postMessage({ type: "TTS_PLAY_REQUEST", base64: message.data }, "*");
    }
});