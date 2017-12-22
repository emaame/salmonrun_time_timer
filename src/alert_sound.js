class AlertSound {
    constructor() {
    }

    _createAudioContext() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        return new AudioContext();
    }
    _createOscillator(context) {
        var oscillator = context.createOscillator();

        // for legacy browsers
        oscillator.start = oscillator.start || oscillator.noteOn;
        oscillator.stop = oscillator.stop || oscillator.noteOff;
        context.createGain = context.createGain || context.createGainNode;
        return oscillator;
    }

    _play_oscillator(context, start, note) {
        var oscillator = this._createOscillator(context);

        // set oscillator parameters .. fail back
        if (typeof oscillator.type === "string") {
            oscillator.type = note.type;
        } else {
            switch (note.type) {
            case "sine": oscillator.type = 0; break;
            case "square": oscillator.type = 1; break;
            case "sawtooth": oscillator.type = 2; break;
            case "triangle": oscillator.type = 3; break;
            default: oscillator.type = 0; break;
            }
        }
        oscillator.frequency.value = note.freq;

        // Create the instance of GainNode
        const gain = context.createGain();

        // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
        oscillator.connect(gain);
        gain.connect(context.destination);
        // Start sound
        oscillator.start(start);
        oscillator.stop(start + note.duration);
    }
    play_melody(start, melody) {
        const context = this._createAudioContext();

        for (var i in melody) {
            const note = melody[i];
            this._play_oscillator(context, start, note);
            start += note.duration;
        }
    }

}

export default AlertSound;