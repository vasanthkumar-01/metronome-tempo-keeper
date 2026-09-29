let bpm = 120;

let isPlaying = false;

let intervalId = null;

let beatIndex = 0;

let audioContext = null;

let tapTimes = [];

const bpmDisplay = document.getElementById("bpm");

const tempoSlider = document.getElementById("tempoSlider");

const decreaseButton = document.getElementById("decrease");

const increaseButton = document.getElementById("increase");

const startStopButton = document.getElementById("startStop");

const tapTempoButton = document.getElementById("tapTempo");

const status = document.getElementById("status");

const beats = document.querySelectorAll(".beat");


function updateBPM() {

    bpmDisplay.textContent = bpm;

    tempoSlider.value = bpm;

}


function playBeat() {

    if (!audioContext) {

        audioContext =
            new (window.AudioContext ||
                window.webkitAudioContext)();

    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.frequency.value =
        beatIndex === 0 ? 1000 : 700;

    gain.gain.setValueAtTime(
        0.5,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    );

    oscillator.connect(gain);

    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.1
    );

    beats.forEach(function (beat) {

        beat.classList.remove("active");

    });

    beats[beatIndex].classList.add("active");

    beatIndex++;

    if (beatIndex >= beats.length) {

        beatIndex = 0;

    }

}


function startMetronome() {

    if (isPlaying) {
        return;
    }

    isPlaying = true;

    status.textContent = "Playing";

    startStopButton.textContent = "STOP";

    beatIndex = 0;

    playBeat();

    const interval =
        60000 / bpm;

    intervalId =
        setInterval(playBeat, interval);

}


function stopMetronome() {

    isPlaying = false;

    status.textContent = "Stopped";

    startStopButton.textContent = "START";

    clearInterval(intervalId);

    intervalId = null;

    beats.forEach(function (beat) {

        beat.classList.remove("active");

    });

}


function restartMetronome() {

    if (isPlaying) {

        stopMetronome();

        startMetronome();

    }

}


decreaseButton.addEventListener(
    "click",
    function () {

        if (bpm > 40) {

            bpm--;

            updateBPM();

            restartMetronome();

        }

    }
);


increaseButton.addEventListener(
    "click",
    function () {

        if (bpm < 240) {

            bpm++;

            updateBPM();

            restartMetronome();

        }

    }
);


tempoSlider.addEventListener(
    "input",
    function () {

        bpm =
            Number(tempoSlider.value);

        updateBPM();

        restartMetronome();

    }
);


startStopButton.addEventListener(
    "click",
    function () {

        if (isPlaying) {

            stopMetronome();

        } else {

            startMetronome();

        }

    }
);


tapTempoButton.addEventListener(
    "click",
    function () {

        const currentTime =
            Date.now();

        tapTimes.push(currentTime);

        if (tapTimes.length > 4) {

            tapTimes.shift();

        }

        if (tapTimes.length >= 2) {

            let totalInterval = 0;

            for (
                let i = 1;
                i < tapTimes.length;
                i++
            ) {

                totalInterval +=
                    tapTimes[i] -
                    tapTimes[i - 1];

            }

            const averageInterval =
                totalInterval /
                (tapTimes.length - 1);

            bpm =
                Math.round(
                    60000 /
                    averageInterval
                );

            if (bpm < 40) {
                bpm = 40;
            }

            if (bpm > 240) {
                bpm = 240;
            }

            updateBPM();

            restartMetronome();

        }

    }
);


updateBPM();