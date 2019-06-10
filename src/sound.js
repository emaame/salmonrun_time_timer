/*
 * @ref https://github.com/GoogleChromeLabs/airhorn/blob/master/app/scripts/main.min.js
 */

class Sound {
    constructor() {
        this.soundURLs = ['1.wav', '2.wav', '3.wav', '4.wav', '5.wav', '10.wav', 'quite-impressed.mp3'].map(fname => './sounds/' + fname);
        this.sources = new Array(this.soundURLs.length);
        this.buffers = new Array(this.soundURLs.length);
        this.playing = new Array(this.soundURLs.length, false)

        this.audioContext = (window.AudioContext || window.webkitAudioContext);
        this.noAudioContext = false;
        this.fallbackAudio;
    }

    loadAll() {
        return Promise.all(this.soundURLs.map((v, index, a) =>
            this._load(index)
                .then((buffer) => {
                    if (!buffer) { return; }
                    this.buffers[index] = buffer;
                })));
    }

    play(index) {
        this._load(index).then(buffer => {
            if (this.noAudioContext) {
                this.fallbackAudio.currentTime = 0;
                this.fallbackAudio.play();
                return;
            }
            this.audioCtx.resume();
            const source = this.audioCtx.createBufferSource();
            if (!source) { return; }
            source.buffer = buffer;
            source.connect(this.audioCtx.destination);
            source.onended = function () {
                this.stop(index);
            };
            source.start(0);
            this.sources[index] = source;
            this.playing[index] = true;
        });
    }
    stop(index) {
        this.playing[index] = false;
        if (this.sources[index]) {
            this.sources[index].stop(0);
        }
        if (noAudioContext) {
            fallbackAudio.pause();
        }
    }

    _load(index) {
        if (this.audioContext !== undefined) {
            this.audioCtx = new this.audioContext();
        } else {
            this.noAudioContext = true;
            this.fallbackAudio = document.createElement('audio');
        }

        const url = this.soundURLs[index];
        if (this.noAudioContext) {
            this.fallbackAudio.src = url;
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }

        // AudioContext must be resumed after the document received a user gesture to enable audio playback.
        this.audioCtx.resume();

        const buffer = this.buffers[index];
        if (!!buffer == true) {
            // If the buffer is already loaded, use that.
            return new Promise((resolve, reject) => {
                resolve(buffer);
            });
        }

        // @ref https://qiita.com/cortyuming/items/b6e3784d08d7a90b3614
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this.audioCtx.decodeAudioData(xhr.response, function (decodedBuffer) {
                        resolve(decodedBuffer);
                    });
                } else {
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = () => {
                reject(new Error(xhr.statusText));
            };
            xhr.send(null);
        });
    }
}


export default Sound;