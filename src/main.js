import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";

const date_formatter = new DateFormatter();

class View {
    constructor() {
        this.timer = new SalmonrunTimeTimer();
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
    update() {
        this.calc_eta();
        this.update_eta();
        this.update_list();

        var interval = 1000;
        if (this.eta < 60*1000) {
            interval = 50;
        }
        setTimeout(this.update.bind(this), interval);
    }
}

window.onload = () => {
    var view = new View();
    view.update();
};