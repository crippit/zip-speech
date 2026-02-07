// content-main.js

(function () {
    console.log("Meet Voice: Audio Engine Ready (v2)");

    const audioCtx = new AudioContext();
    const virtualDest = audioCtx.createMediaStreamDestination();
    const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

    // --- 1. Microphone Hijack ---
    navigator.mediaDevices.getUserMedia = async function (constraints) {
        const realStream = await originalGetUserMedia(constraints);
        if (constraints.audio) {
            const micSource = audioCtx.createMediaStreamSource(realStream);
            micSource.connect(virtualDest);
            const mixedStream = new MediaStream([
                ...virtualDest.stream.getAudioTracks(),
                ...realStream.getVideoTracks()
            ]);
            return mixedStream;
        }
        return realStream;
    };

    // --- 2. Message Listener ---
    window.addEventListener("message", async (event) => {
        if (event.source !== window) return;

        if (event.data.type === "TTS_PLAY_REQUEST") {
            const audioData = base64ToArrayBuffer(event.data.base64);
            playAudio(audioData);
        }
    });

    // --- 3. Audio Player ---
    async function playAudio(arrayBuffer) {
        if (audioCtx.state === 'suspended') await audioCtx.resume();

        try {
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;

            // Connect to Meet (Virtual Mic)
            source.connect(virtualDest);
            // Connect to Speakers (Local feedback)
            source.connect(audioCtx.destination);

            source.start();
        } catch (e) {
            console.error("Playback error:", e);
        }
    }

    // --- Helper: Convert Base64 to ArrayBuffer ---
    function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64.split(',')[1]);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
})();