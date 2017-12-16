class SalmonrunTimeTimer {
    constructor() {
    }
    listup_next_STT() {
        var list = [];
        var base = new Date(Date.now());

        //  period |   0   |            1            | 2  ...  6 |            7            | 8
        // minutes | 00 01 | 02 03 04 05 06 07 08 09 | 10 ... 49 | 50 51 52 53 54 55 56 57 | 58 59
        var period = Math.floor( (base.getMinutes() - 2) / 8) + 1 // it becomes 0 to 8
        var makeDate = (hours, minutes) => {
            var date = new Date(base);
            date.setHours(hours);
            date.setMinutes(minutes)
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };

        // in this hour (upto 1st(:02),2nd(:10), ... ,7th(:50))
        var count = 0;
        for(var i = period+1; i <= 7; ++i, ++count) {
            var minutes = 2 + (i-1) * 8;
            var date = makeDate( base.getHours(), minutes );
            list.push( date );
        }
        // in next hour
        for(var i = 1; count<7; ++i, ++count) {
            var minutes = 2 + (i-1) * 8;
            var date = makeDate( base.getHours()+1, minutes );
            list.push( date );
        }

        return list;
    }
}

export default SalmonrunTimeTimer;