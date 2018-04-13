import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import TimeOffset from "./time_offset";

const date_formatter = new DateFormatter();

class App {
    constructor() {
        this.time_offset = new TimeOffset();
        this.timer = new SalmonrunTimeTimer(this.time_offset);

        this.elmEta = document.getElementById("eta");
        this.elmMode5T = document.getElementById("mode_5T");
        this.elmEtaArea = document.getElementById("eta_area");
        this.elmEtaLabel = document.getElementById("eta_label");
        this.elmOffset = document.getElementById("offset");

        this.load_mode5T();
        this.elmMode5T.onclick = this.on_change_mode5T.bind(this);
    }
    calc_eta() {
        this.list = this.timer.listup_next_STT();
        const now = this.time_offset.get_time();
        var eta = this.list[0] - now;
        this.eta = new Date(eta);
    }
    update_eta() {
        // eta
        const textEta = date_formatter.getMinText(this.eta);
        this.elmEta.innerHTML = textEta;
        // show label

        let labelText = 'サーモンランタイム';
        if (this.time_offset.offset_5T != 0) {
            labelText += '(5T)';
        }
        labelText += 'まで';
        this.elmEtaLabel.innerHTML = labelText;
        // show offset text
        if (this.time_offset.offset_jst) {
            var textOffset;
            if (this.time_offset.offset_jst < 0) {
                textOffset = "-" + date_formatter.getMinText(new Date(-this.time_offset.offset_jst));
            } else {
                textOffset = "+" + date_formatter.getMinText(new Date(this.time_offset.offset_jst));
            }
            if (this.time_offset.offset_5T != 0) {
                textOffset += "-2sec";
            }
            this.elmOffset.innerHTML = textOffset + " を補正済";
        } else {
            this.elmOffset.innerHTML = "時刻合わせ中 ...";
        }
    }
    update_list() {
        // list
        for (let i in this.list) {
            const elmSTT = document.getElementById("stt-item-" + (Number(i) + 1));
            const textSTT = date_formatter.getMonthText(this.list[i]);
            elmSTT.innerHTML = textSTT;
        }
    }
    update(loop = false) {
        this.calc_eta();
        this.update_eta();
        this.update_list();

        if (loop) {
            var interval = 1000;
            if (this.eta < 60 * 1000) {
                interval = 50;
            }
            setTimeout(this.update.bind(this, true), interval);
        }
    }
    load_mode5T() {
        const mode5T = localStorage["mode_5T"];
        // localStorage には文字列で格納されている
        this.elmMode5T.checked = (mode5T == 'true' || mode5T == true) ? true : false;
        this.on_change_mode5T();

    }
    on_change_mode5T() {
        const classForNornalModeBack = 'mdl-color--grey-800';
        const classFor5TModeBack = 'mdl-color--green-900';
        const classForNornalModeFore = 'mdl-color-text--grey-600';
        const classFor5TModeFore = 'mdl-color-text--yellow-600';

        const mode5T = this.elmMode5T.checked;
        this.elmEtaArea.classList.remove(classForNornalModeBack);
        this.elmEtaArea.classList.remove(classFor5TModeBack);

        this.elmEtaLabel.classList.remove(classForNornalModeFore);
        this.elmEtaLabel.classList.remove(classFor5TModeFore);
        this.elmOffset.classList.remove(classForNornalModeFore);
        this.elmOffset.classList.remove(classFor5TModeFore);
        if (mode5T) {
            this.time_offset.set_offset_5T(-2 * 1000);
            this.elmEtaArea.classList.add(classFor5TModeBack);
            this.elmEtaLabel.classList.add(classFor5TModeFore);
            this.elmOffset.classList.add(classFor5TModeFore);
            
        } else {
            this.time_offset.set_offset_5T(0);
            this.elmEtaArea.classList.add(classForNornalModeBack);
            this.elmEtaLabel.classList.add(classForNornalModeFore);
            this.elmOffset.classList.add(classForNornalModeFore);
        }
        localStorage["mode_5T"] = mode5T;
        this.update(false);
    }
}

window.onload = () => {
    var app = new App();
    app.update(true);
};