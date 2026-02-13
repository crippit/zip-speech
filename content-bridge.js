// content-bridge.js
(function () {
    console.log("Zip Speech: Bridge Loaded 🌉");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // We only care about audio data
        if (request.action === "INJECT_AUDIO_DATA") {
            console.log("Zip Speech Bridge: Transferring Audio to Page...");

            // Pass it to the Main World (content-main.js)
            window.postMessage({
                type: "ZIP_SPEECH_AUDIO_DATA",
                data: request.data
            }, "*");
        }
    });
})();