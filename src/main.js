import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import TimeOffset from "./time_offset";
import Config from "./config";

const date_formatter = new DateFormatter();

class App {
    constructor() {
        this.time_offset = new TimeOffset();
        this.timer = new SalmonrunTimeTimer(this.time_offset);
        this.config = new Config(this.on_load.bind(this), {
            "mode_friend": {"type": Boolean, "default": false},
            "mode_frequency_update": {"type": Boolean, "default": false},
        });

        this.elmEta = document.getElementById("eta");
        this.elmEtaArea = document.getElementById("eta_area");
        this.elmEtaLabel = document.getElementById("eta_label");
        this.elmOffset = document.getElementById("offset");

        this.elmModeFriend = document.getElementById("mode_friend");
        this.elmModeFriend.onclick = this.on_change_modeFriend.bind(this);

        this.elmModeFrequencyUpdate= document.getElementById("mode_frequency_update");
        this.elmModeFrequencyUpdate.onclick = this.on_change_modeFrequencyUpdate.bind(this);

        this.config.load();
        this.update(true);

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

        let labelText = 'ST';
        if (this.time_offset.offset_friend != 0) {
            labelText += '(フレ部屋)';
        }
        labelText += 'まで';
        this.elmEtaLabel.innerHTML = labelText;
        // show offset text
        if (this.time_offset.offset_jst) {
            var textOffset = '補正: ';
            if (this.time_offset.offset_jst < 0) {
                textOffset += "-" + date_formatter.getMinText(new Date(-this.time_offset.offset_jst));
            } else {
                textOffset += "+" + date_formatter.getMinText(new Date(this.time_offset.offset_jst));
            }
            if (this.time_offset.offset_friend != 0) {
                textOffset += " (2秒遅れ)";
            }
            this.elmOffset.innerHTML = textOffset;
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

        const modeFrequencyUpdate = this.config["mode_frequency_update"];

        if (loop) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            var interval = 1000;
            if (modeFrequencyUpdate || this.eta < 60 * 1000) {
                interval = 50;
            }
            this.timeout = setTimeout(this.update.bind(this, true), interval);
        }
    }
    on_load(config) {
        this.elmModeFriend.checked = config["mode_friend"];
        this.elmModeFrequencyUpdate.checked = config["mode_frequency_update"];
        this.on_change_modeFriend();
        this.on_change_modeFrequencyUpdate();

    }
    on_change_modeFriend() {
        const classForNornalModeBack = 'mdl-color--grey-800';
        const classForFriendModeBack = 'mdl-color--green-900';
        const classForNornalModeFore = 'mdl-color-text--grey-600';
        const classForFriendModeFore = 'mdl-color-text--yellow-600';

        const modeFriend = this.elmModeFriend.checked;
        this.elmEtaArea.classList.remove(classForNornalModeBack);
        this.elmEtaArea.classList.remove(classForFriendModeBack);

        this.elmEtaLabel.classList.remove(classForNornalModeFore);
        this.elmEtaLabel.classList.remove(classForFriendModeFore);
        this.elmOffset.classList.remove(classForNornalModeFore);
        this.elmOffset.classList.remove(classForFriendModeFore);
        if (modeFriend) {
            this.time_offset.set_offset_friend(-2 * 1000);
            this.elmEtaArea.classList.add(classForFriendModeBack);
            this.elmEtaLabel.classList.add(classForFriendModeFore);
            this.elmOffset.classList.add(classForFriendModeFore);
            
        } else {
            this.time_offset.set_offset_friend(0);
            this.elmEtaArea.classList.add(classForNornalModeBack);
            this.elmEtaLabel.classList.add(classForNornalModeFore);
            this.elmOffset.classList.add(classForNornalModeFore);
        }
        
        this.config.save({"mode_friend": modeFriend});
        
        this.update(false);
    }
    on_change_modeFrequencyUpdate() {
        const modeFrequencyUpdate = this.elmModeFrequencyUpdate.checked;
        this.config.save({"mode_frequency_update": modeFrequencyUpdate});
        this.update(true);
    }
}

window.onload = () => {
    var app = new App();
};