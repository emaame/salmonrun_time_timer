/*
 * @ref https://github.com/GoogleChromeLabs/airhorn/blob/master/app/scripts/main.min.js
 */

class Sound {
    constructor() {
        this.soundURLs = ['/sounds/1.wav', '/sounds/2.wav', '/sounds/3.wav', '/sounds/4.wav', '/sounds/5.wav', '/sounds/10.wav', '/sounds/quite-impressed.mp3'];
        this.sources = new Array(this.soundURLs.length);
        this.buffers = new Array(this.soundURLs.length);
        this.playing = new Array(this.soundURLs.length, false)

        this.audioCtx = (window.AudioContext || window.webkitAudioContext);
        this.noAudioContext = false;
        this.fallbackAudio;
        if (this.audioCtx !== undefined) {
            this.audioCtx = new this.audioCtx();
        } else {
            this.noAudioContext = true;
            this.fallbackAudio = document.createElement('audio');
        }
        this.loadAll();
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