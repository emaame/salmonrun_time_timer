import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import TimeOffset from "./time_offset";
import Config, {
    KEY_MODE_FRIEND,
    KEY_MODE_FRIQUENCY_UPDATE,
    KEY_MODE_SHOW_MS,
    KEY_USE_SOUND,
} from "./config";
import Sound from "./sound";

const date_formatter = new DateFormatter();

// polyfill など含めてこちらを参照した
// http://yomotsu.net/blog/2013/01/05/fps.html
const now =
    window.performance &&
    (performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow);
function getTime() {
    return (now && now.call(performance)) || new Date().getTime();
}
const requestAnimationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000.0 / 60.0);
        }
    );
})();

class App {
    constructor() {
        this.sound = new Sound();
        this.sound_triggers = [1, 2, 3, 4, 5, 10, 30].map((sec) => sec * 1000);
        this.played_min = false;
        this.least_sound_trigger = this.sound_triggers[
            this.sound_triggers.length - 1
        ];
        this.time_offset = new TimeOffset();

        this.timer = new SalmonrunTimeTimer(this.time_offset);
        this.last_time = getTime();

        this.elmEta = document.getElementById("eta");
        this.elmEtaArea = document.getElementById("eta_area");
        this.elmEtaLabel = document.getElementById("eta_label");
        this.elmOffset = document.getElementById("offset");

        /*
        this.elmModeFriend = document.getElementById(KEY_MODE_FRIEND);
        this.elmModeFriend.addEventListener(
            "click",
            this.on_change_modeFriend.bind(this)
        );
        */

        this.elmModeFrequencyUpdate = document.getElementById(
            KEY_MODE_FRIQUENCY_UPDATE
        );
        this.elmModeFrequencyUpdate.addEventListener(
            "click",
            this.on_change_modeFrequencyUpdate.bind(this)
        );

        this.elmModeShowMS = document.getElementById(KEY_MODE_SHOW_MS);
        this.elmModeShowMS.addEventListener(
            "click",
            this.on_change_modeShowMS.bind(this)
        );

        this.elmUseSound = document.getElementById(KEY_USE_SOUND);
        this.elmUseSound.addEventListener(
            "click",
            this.on_change_useSound.bind(this)
        );
        this.elmLabelUseSound = document.getElementById(
            KEY_USE_SOUND + "_label"
        );
        /* iOS のサウンド再生の制限を解除する無音再生を仕込んでおく */
        let disabled_restriction_callback = (e) => {
            this.sound.playSilent();
            this.elmLabelUseSound.innerHTML = "サウンド再生（制限解除済み）";
            this.elmLabelUseSound.classList.remove(
                "mdl-color-text--deep-orange-900"
            );
        };
        document.addEventListener("click", disabled_restriction_callback);
        document.addEventListener("touchend", disabled_restriction_callback);

        this.on_load();

        this.update(true);
    }
    calc_eta() {
        this.list = this.timer.listup_next_STT(Date.now(), 2, 8, true);
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
            this.played_min = false;
            return;
        }
        if (this.played_min) {
            return;
        }
        const index = this.sound_triggers.findIndex(
            (trigger_ms) => eta_ms < trigger_ms
        );
        this.sound.play(index);
        /* 1 を再生後、巻き戻すが、巻き戻したことを記憶しておかないといけない。 */
        this.played_min = index <= 0;
        /* 次のサウンドに移動する。末尾（this.sound_triggers.length - 1）は通知音なので len-2 */
        const next_trigger_index = this.played_min
            ? this.sound_triggers.length - 2
            : index - 1;
        console.log(next_trigger_index);
        this.least_sound_trigger = this.sound_triggers[next_trigger_index];
    }
    update_eta() {
        // eta
        const modeShowMS = Config[KEY_MODE_SHOW_MS];
        const textEta = date_formatter.getRestTimeTextInUTC(
            this.eta,
            modeShowMS
        );
        this.elmEta.innerHTML = textEta;
        // show label

        let labelText = "ST";
        if (this.time_offset.offset_friend != 0) {
            labelText += "(フレ部屋)";
        }
        labelText += "まで";
        this.elmEtaLabel.innerHTML = labelText;
        // show offset text
        if (this.time_offset.offset_jst) {
            var textOffset = "";
            if (this.time_offset.offset_jst < 0) {
                textOffset +=
                    "-" +
                    date_formatter.getRestTimeTextInUTC(
                        new Date(-this.time_offset.offset_jst)
                    );
            } else {
                textOffset +=
                    "+" +
                    date_formatter.getRestTimeTextInUTC(
                        new Date(this.time_offset.offset_jst)
                    );
            }
            textOffset += " を補正済み";
            if (this.time_offset.offset_friend != 0) {
                textOffset += " (更に2秒遅れ中)";
            }
            this.elmOffset.innerHTML = textOffset;
        } else {
            this.elmOffset.innerHTML = "時刻合わせ中 ...";
        }
    }
    update_list() {
        // TODO: GST 用のクラスを付けたい（2時間ごとのステージ更新後最初の02分時間割）
        // list
        for (let i in this.list) {
            const elmSTT = document.getElementById(
                "stt-item-" + (Number(i) + 1)
            );
            const textSTT = date_formatter.getMonthTextInLocalTime(
                this.list[i]
            );
            elmSTT.innerHTML = textSTT;
        }
    }
    update(loop = false) {
        const time = getTime();
        const pasted = time - this.last_time;
        const modeFrequencyUpdate = Config[KEY_MODE_FRIQUENCY_UPDATE];

        const interval =
            modeFrequencyUpdate || this.eta < 60 * 1000 ? 50 : 1000;
        if (!loop || pasted > interval) {
            this.calc_eta();
            this.update_eta();
            this.update_list();
            if (pasted > interval) {
                this.last_time = time;
            }
        }
        if (loop) {
            requestAnimationFrame(this.update.bind(this, true));
        }
    }
    on_load() {
        // this.elmModeFriend.checked = Config[KEY_MODE_FRIEND];
        this.elmModeFrequencyUpdate.checked = Config[KEY_MODE_FRIQUENCY_UPDATE];
        this.elmUseSound.checked = Config[KEY_USE_SOUND];
        this.on_change_modeFriend();
        this.on_change_useSound();
        this.on_change_modeFrequencyUpdate();
    }
    on_change_modeFriend() {
        const classForNornalModeBack = "mdl-color--grey-800";
        const classForFriendModeBack = "mdl-color--green-900";
        const classForNornalModeFore = "mdl-color-text--grey-600";
        const classForFriendModeFore = "mdl-color-text--yellow-600";

        // const modeFriend = this.elmModeFriend.checked;
        const modeFriend = false;
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

        // Config.save(KEY_MODE_FRIEND, modeFriend);

        this.update(false);
    }
    on_change_modeFrequencyUpdate() {
        const modeFrequencyUpdate = this.elmModeFrequencyUpdate.checked;
        Config.save(KEY_MODE_FRIQUENCY_UPDATE, modeFrequencyUpdate);
        this.update(true);
    }
    on_change_modeShowMS() {
        const modeShowMS = this.elmModeShowMS.checked;
        Config.save(KEY_MODE_SHOW_MS, modeShowMS);
        this.update(true);
    }
    on_change_useSound() {
        this.useSound = this.elmUseSound.checked;
        Config.save(KEY_USE_SOUND, this.useSound);
        this.update(false);
        /* Safari / Chrome などの制限として、初回はイベント経由でならさないといけない */
        if (this.useSound) {
            this.sound.loadAll();
            this.sound.play(7);
            return;
        }
    }
}

window.onload = () => {
    var app = new App();
};
