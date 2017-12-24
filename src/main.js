import SalmonrunTimeTimer from "./salmonrun_time_timer";
import DateFormatter from "./date_formatter";
import TimeOffset from "./time_offset";

const date_formatter = new DateFormatter();

class App {
    constructor() {
        this.time_offset = new TimeOffset();
        this.timer = new SalmonrunTimeTimer(this.time_offset);

        document.getElementById("toggle_time_offset_information").addEventListener( "click", this.toggle_jst_detail.bind(this) );
    }
    calc_eta() {
        const base = new Date(Date.now());
        this.list = this.timer.listup_next_STT();
        var eta = this.list[0] - base;
        if (this.time_offset.offset) { eta -= this.time_offset.offset; }
        this.eta = new Date(eta);
    }
    update_eta() {
        // eta
        const elmEta = document.getElementById("eta");
        const textEta = date_formatter.getMinText(this.eta);
        elmEta.innerHTML = textEta;
        // offset
        const elmOffset = document.getElementById("offset");
        if (this.time_offset.offset) {
            var textOffset;
            if (this.time_offset.offset < 0) {
                textOffset = "- " + date_formatter.getMinText(new Date(-this.time_offset.offset));
            } else {
                textOffset = "+ " + date_formatter.getMinText(new Date( this.time_offset.offset));
            }
            elmOffset.innerHTML = textOffset + " を補正済み";
        } else {
            elmOffset.innerHTML = "時刻合わせ中 ...";
        }
    }
    update_list() {
        // list
        for(let i in this.list) {
            const elmSTT = document.getElementById("stt-item-" + (Number(i) + 1));
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
    toggle_jst_detail() {
        var msgbox = document.getElementById("jst_detail");
        if ( msgbox == null ) return;
        if( msgbox.style.display == "block" ) msgbox.style.display = "none"
        else msgbox.style.display = "block";
    }
}

window.onload = () => {
    var app = new App();
    app.update();
};