// content-main.js - v5.0 (Persistent Connection)
(function () {
    console.log("Zip Speech: Audio Engine v5.0 Loaded 🚀");

    let audioContext = null;

    // We use a Set to store every stream Meet has ever asked for.
    // We NEVER delete from this list, ensuring we hit the right one eventually.
    const activeDestinations = new Set();

    // 1. Singleton Audio Context
    const getAudioContext = () => {
        if (!audioContext) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContextClass();
        }
        return audioContext;
    };

    // 2. The Hook Logic
    const patchStream = async (realStream) => {
        console.log("Zip Speech: Patching Microphone Stream...");
        const ctx = getAudioContext();

        if (ctx.state === 'suspended') await ctx.resume();

        // Create a dedicated mixer for this request
        const destination = ctx.createMediaStreamDestination();
        const micSource = ctx.createMediaStreamSource(realStream);
        micSource.connect(destination);

        // SAVE IT FOREVER
        activeDestinations.add(destination);
        console.log(`Zip Speech: Mixer Added. Total Active Mixers: ${activeDestinations.size}`);

        // Spoofing Logic (Trick Meet into accepting it)
        const mixedStream = destination.stream;
        const realTrack = realStream.getAudioTracks()[0];
        const mixedTrack = mixedStream.getAudioTracks()[0];

        if (realTrack && mixedTrack) {
            mixedTrack.getSettings = () => realTrack.getSettings();
            mixedTrack.getCapabilities = () => (realTrack.getCapabilities ? realTrack.getCapabilities() : {});
            mixedTrack.applyConstraints = (c) => realTrack.applyConstraints(c);

            Object.defineProperty(mixedTrack, 'enabled', {
                get: () => realTrack.enabled,
                set: (v) => { realTrack.enabled = v; }
            });

            // CRITICAL CHANGE: We do NOT remove the mixer when the track ends.
            // realTrack.onended = () => activeDestinations.delete(destination); <--- DELETED THIS LINE
        }

        console.log("Zip Speech: Stream Patch Successful ✅");
        return mixedStream;
    };

    // 3. The Proxy Override
    const nativeGetUserMedia = navigator.mediaDevices.getUserMedia;

    navigator.mediaDevices.getUserMedia = async function (constraints) {
        const stream = await nativeGetUserMedia.call(navigator.mediaDevices, constraints);
        if (constraints && constraints.audio) {
            try {
                return await patchStream(stream);
            } catch (err) {
                console.error("Zip Speech: Hook Failed", err);
                return stream;
            }
        }
        return stream;
    };

    // 4. TTS Player (Broadcasts to ALL Mixers)
    window.addEventListener("message", async (event) => {
        if (!event.data || event.data.type !== "ZIP_SPEECH_AUDIO_DATA") return;

        console.log("Zip Speech: Received Audio Data...");
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') await ctx.resume();

        const base64Audio = event.data.data;
        if (!base64Audio) return;

        try {
            const audioString = atob(base64Audio.split(',')[1]);
            const bytes = new Uint8Array(audioString.length);
            for (let i = 0; i < audioString.length; i++) {
                bytes[i] = audioString.charCodeAt(i);
            }

            const audioBuffer = await ctx.decodeAudioData(bytes.buffer);

            // ============================================================
            // Broadcast to ALL historical mixers
            // ============================================================
            if (activeDestinations.size > 0) {
                let count = 0;
                activeDestinations.forEach((dest) => {
                    try {
                        const source = ctx.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(dest);
                        source.start(0);
                        count++;
                    } catch (e) {
                        // Ignore dead streams
                    }
                });
                console.log(`Zip Speech: Successfully sent audio to ${count} streams ✅`);
            } else {
                console.warn("Zip Speech: ⚠️ No active mixers found. (Did the patch fail?)");
            }

            // Also play to local speakers (Monitor)
            const localSource = ctx.createBufferSource();
            localSource.buffer = audioBuffer;
            localSource.connect(ctx.destination);
            localSource.start(0);

        } catch (err) {
            console.error("Zip Speech: Playback Error", err);
        }
    });

})();