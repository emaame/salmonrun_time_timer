import SalmonrunTimeTimer from "./salmonrun_time_timer";
import moment from "moment";

class View {
    constructor() {
        this.timer = new SalmonrunTimeTimer();
    }
    
    update() {
        var base = new Date(Date.now());
        var list = this.timer.listup_next_STT();
        var eta = new Date( list[0] - base );

        // eta
        var elmEta = document.getElementById("eta");
        var textEta = moment(eta).format("mm:ss.SSS");
        elmEta.innerHTML = textEta;

        // list
        for(var i = 0; i < list.length; ++i) {
            var elmSTT = document.getElementById("stt-item-" + (i+1));
            var textSTT = moment(list[i]).format("MM/DD HH:mm:ss");
            elmSTT.innerHTML = textSTT;
        }

        var interval = 1000;
        if (eta < 60*1000) {
            interval = 50;
        }
        setTimeout(this.update.bind(this), interval);
    }
}

window.onload = () => {
    var view = new View();
    view.update();
};