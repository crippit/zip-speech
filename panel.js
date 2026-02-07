// panel.js (Formerly popup.js)
document.addEventListener('DOMContentLoaded', () => {
    const speakBtn = document.getElementById('speakBtn');
    const textInput = document.getElementById('textInput');

    textInput.focus();

    speakBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) return;

        // Send message to BACKGROUND script
        // We don't need tabs.query because the background script knows which tab sent the message
        chrome.runtime.sendMessage({
            action: "FETCH_AUDIO",
            text: text
            // Note: We'll let background.js figure out the tabID from the 'sender' property
        });
    });

    textInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') speakBtn.click();
    });
});