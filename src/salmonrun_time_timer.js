class SalmonrunTimeTimer {
    constructor() {
    }
    listup_next_STT(date = Date.now()) {
        var list = [];
        var base = new Date(date);

        //  period |   0   |            1            | 2  ...  6 |            7            | 8
        // minutes | 00 01 | 02 03 04 05 06 07 08 09 | 10 ... 49 | 50 51 52 53 54 55 56 57 | 58 59
        var period = Math.floor( (base.getMinutes() - 2) / 8) + 1; // it becomes 0 to 8
        var makeDate = (hours, minutes) => {
            var d = new Date(base);
            d.setHours(hours);
            d.setMinutes(minutes);
            d.setSeconds(0);
            d.setMilliseconds(0);
            return d;
        };

        // in this hour (upto 1st(:02),2nd(:10), ... ,7th(:50))
        var count = 0;
        var hours = base.getHours();
        var i, minutes, d;
        for(i = period+1; i <= 7; ++i, ++count) {
            minutes = 2 + (i-1) * 8;
            d = makeDate( hours, minutes );
            list.push( d );
        }
        // in next hour
        for(i = 1; count<7; ++i, ++count) {
            minutes = 2 + (i-1) * 8;
            d = makeDate( hours+1, minutes );
            list.push( d );
        }

        return list;
    }
}

export default SalmonrunTimeTimer;