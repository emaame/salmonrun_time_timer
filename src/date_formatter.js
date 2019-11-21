class DateFormatter {
    constructor() {
    }

    getMonthText(d) {
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

        return (MM + "/" + DD + " " + hh + ":" + mm + ":" + ss);
    }
    getMinText(d, showMS = true) {
        var mm = d.getMinutes();
        var ss = d.getSeconds();

        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;
        if (showMS) {
            var SSS = d.getMilliseconds();
            if (SSS < 10) { SSS = "00" + SSS; }
            else if (SSS < 100) { SSS = "0" + SSS; }

            return (mm + ":" + ss + "." + SSS);
        } else {
            return (mm + ":" + ss);
        }
    }
}

export default DateFormatter;
