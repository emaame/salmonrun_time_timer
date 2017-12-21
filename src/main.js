import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import AlertSound from "./alert_sound";

const date_formatter = new DateFormatter();


class App {
    constructor() {
        this.timer = new SalmonrunTimeTimer();
        this.alert_functions = {};
        this.alert = new AlertSound();
        this.alert_functions[15] = (eta) => {
            const start = eta / 1000 - 20;
            const E5 = 329.63;
            const F5 = 349.23;
            const quaver_seconds = 60 / (124 * 2); // 124 [BPM]
        
            const melody = [
                { freq: E5, duration: quaver_seconds * 2 },
                { freq: E5, duration: quaver_seconds * 2 },
                { freq: F5, duration: quaver_seconds * 2 },
                { freq: E5, duration: quaver_seconds * 1 },
                { freq: F5, duration: quaver_seconds * 1 },
            ];
            this.alert.play_melody(start, melody);
        };
        this.alert_functions[3] = (eta) => { this.alert._play_oscillator(440, eta / 1000 - 3, 0.1); };
        this.alert_functions[2] = (eta) => { this.alert._play_oscillator(440, eta / 1000 - 2, 0.1); };
        this.alert_functions[1] = (eta) => { this.alert._play_oscillator(440, eta / 1000 - 1, 0.1); };
        this.alert_functions[0] = (eta) => { this.alert._play_oscillator(880, eta / 1000 - 0, 1.0); };
        
    }

    calc_eta() {
        const base = new Date(Date.now());
        this.list = this.timer.listup_next_STT();
        this.eta = new Date(this.list[0] - base);
    }
    update_eta() {
        // eta
        const elmEta = document.getElementById("eta");
        const textEta = date_formatter.getMinText(this.eta);
        elmEta.innerHTML = textEta;
    }
    update_list() {
        // list
        for (var i = 0; i < this.list.length; ++i) {
            const elmSTT = document.getElementById("stt-item-" + (i + 1));
            const textSTT = date_formatter.getMonthText(this.list[i]);
            elmSTT.innerHTML = textSTT;
        }
    }
    update_sound() {
        const eta_sec = Math.floor(this.eta / 1000);
        if (!this.alert_functions[eta_sec]) { return; }
        this.alert_functions[eta_sec](this.eta);
    }

    update() {
        this.calc_eta();
        this.update_eta();
        this.update_list();
        this.update_sound();

        var interval = 1000;
        if (this.eta < 60 * 1000) {
            interval = 50;
        }
        setTimeout(this.update.bind(this), interval);
    }
}

window.onload = () => {
    const app = new App();
    app.update();
};