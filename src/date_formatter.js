class DateFormatter {
    constructor() {}

    // use local-time for up-nexts
    getMonthTextInLocalTime(d) {
        var MM = d.getMonth() + 1;
        var DD = d.getDate();
        if (MM < 10) MM = "0" + MM;
        if (DD < 10) DD = "0" + DD;

        var hh = d.getHours();
        var mm = d.getMinutes();
        var ss = d.getSeconds();

        if (hh < 10) hh = "0" + hh;
        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;

        return MM + "/" + DD + " " + hh + ":" + mm + ":" + ss;
    }

    getRestTimeTextInUTC(d, showMS = true) {
        // use UTC for 30-minutes / 45-minutes Timezones
        // ST is based on JST (+9:00), so that there is no problem to calculate with UTC (+0:00).
        var mm = d.getUTCMinutes();
        var ss = d.getUTCSeconds();
        var SSS = d.getUTCMilliseconds();

        if (showMS) {
            if (mm < 10) mm = "0" + mm;
            if (ss < 10) ss = "0" + ss;
            if (SSS < 10) {
                SSS = "00" + SSS;
            } else if (SSS < 100) {
                SSS = "0" + SSS;
            }

            return mm + ":" + ss + "." + SSS;
        } else {
            if (SSS > 0) {
                ss += 1;
                if (ss >= 60) {
                    ss -= 60;
                    mm += 1;
                }
            }
            if (mm < 10) mm = "0" + mm;
            if (ss < 10) ss = "0" + ss;
            return mm + ":" + ss;
        }
    }
}

export default DateFormatter;
