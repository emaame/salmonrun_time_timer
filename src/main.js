import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import TimeOffset from "./time_offset";
import Config from "./config";
import Sound from "./sound";

const date_formatter = new DateFormatter();

const KEY_MODE_FRIEND = "mode_friend";
const KEY_MODE_FRIQUENCY_UPDATE = "mode_frequency_update";
const KEY_USE_SOUND = "use_sound";

class App {
    constructor() {
        this.sound = new Sound();
        this.sound_triggers = [1, 2, 3, 4, 5, 10].map((sec) => sec * 1000);
        this.least_sound_trigger = this.sound_triggers[this.sound_triggers.length - 1];
        this.time_offset = new TimeOffset();
        this.timer = new SalmonrunTimeTimer(this.time_offset);
        this.config = new Config({
            KEY_MODE_FRIEND: { "type": Boolean, "default": false },
            KEY_MODE_FRIQUENCY_UPDATE: { "type": Boolean, "default": false },
            KEY_USE_SOUND: { "type": Boolean, "default": true },
        });

        this.elmEta = document.getElementById("eta");
        this.elmEtaArea = document.getElementById("eta_area");
        this.elmEtaLabel = document.getElementById("eta_label");
        this.elmOffset = document.getElementById("offset");

        this.elmModeFriend = document.getElementById(KEY_MODE_FRIEND);
        this.elmModeFriend.onclick = this.on_change_modeFriend.bind(this);

        this.elmModeFrequencyUpdate = document.getElementById(KEY_MODE_FRIQUENCY_UPDATE);
        this.elmModeFrequencyUpdate.onclick = this.on_change_modeFrequencyUpdate.bind(this);

        this.elmUseSound = document.getElementById(KEY_USE_SOUND);
        this.elmUseSound.onclick = this.on_change_useSound.bind(this);

        this.config.load();
        this.on_load();

        this.update(true);

    }
    calc_eta() {
        this.list = this.timer.listup_next_STT();
        const now = this.time_offset.get_time();
        const eta_ms = this.list[0] - now;
        this.notify_sound(eta_ms);
        this.eta = new Date(eta_ms);
    }

    notify_sound(eta_ms) {
        if (!this.useSound) {
            return;
        }
        if (eta_ms > this.least_sound_trigger) {
            return;
        }
        this.sound_triggers.forEach((value, index, array) => {
            if (eta_ms < value) {
                this.sound.play(index);
                /* 次回の再生タイミングを予約 */
                const next_trigger_index = (index <= 0) ? this.sound_triggers.length : index - 1;
                this.least_sound_trigger = this.sound_triggers[next_trigger_index];
                return;
            }
        })
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
            var textOffset = '';
            if (this.time_offset.offset_jst < 0) {
                textOffset += "-" + date_formatter.getMinText(new Date(-this.time_offset.offset_jst));
            } else {
                textOffset += "+" + date_formatter.getMinText(new Date(this.time_offset.offset_jst));
            }
            textOffset += ' を補正済み';
            if (this.time_offset.offset_friend != 0) {
                textOffset += " (更に2秒遅れ中)";
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

        const modeFrequencyUpdate = this.config[KEY_MODE_FRIQUENCY_UPDATE];

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
    on_load() {
        this.elmModeFriend.checked = this.config[KEY_MODE_FRIEND];
        this.elmModeFrequencyUpdate.checked = this.config[KEY_MODE_FRIQUENCY_UPDATE];
        this.elmUseSound.checked = this.config[KEY_USE_SOUND];
        this.on_change_modeFriend();
        this.on_change_useSound();
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

        this.config.save({ KEY_MODE_FRIEND: modeFriend });

        this.update(false);
    }
    on_change_modeFrequencyUpdate() {
        const modeFrequencyUpdate = this.elmModeFrequencyUpdate.checked;
        this.config.save({ KEY_MODE_FRIQUENCY_UPDATE: modeFrequencyUpdate });
        this.update(true);
    }
    on_change_useSound() {
        this.useSound = this.elmUseSound.checked;
        this.config.save({ KEY_USE_SOUND: this.useSound });
        this.update(false);
    }
}

window.onload = () => {
    var app = new App();
};