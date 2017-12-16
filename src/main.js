import SalmonrunTimeTimer from "./salmonrun_time_timer";
var moment = require('moment-timezone');

class View {
    constructor() {
        this.timer = new SalmonrunTimeTimer();
    }
    
    update() {
        var base = new Date(Date.now());
        var list = this.timer.listup_next_STT();
        var eta = new Date( list[0] - base );

        {   // eta
            var element = document.getElementById("eta");
            var text = moment(eta).tz("Asia/Tokyo").format("mm:ss.SSS");
            element.innerHTML = text;
        }

        // list
        for(var i = 0; i < list.length; ++i) {
            var element = document.getElementById("stt-item-" + (i+1));
            var text = moment(list[i]).tz("Asia/Tokyo").format("MM/DD HH:mm:ss");
            element.innerHTML = text;
        }

        var interval = 1000;
        if (eta < 60*1000) {
            interval = 50;
        }
        setTimeout(this.update.bind(this), interval);
    }
}

window.onload = (ev) => {
    var view = new View();
    view.update()
};