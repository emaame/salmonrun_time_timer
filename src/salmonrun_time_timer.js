class SalmonrunTimeTimer {
    constructor(time_offset = null) {
        this.time_offset = time_offset;
    }

    // テストしやすいように基準の日時を渡せるようにした
    listup_next_STT(date = Date.now()) {
        var list = [];
        var base;
        if (this.time_offset) {
            base = this.time_offset.get_time(date);
        } else {
            base = new Date(date);
        }

        //  period |   0   |            1            | 2  ...  6 |            7            | 8
        // minutes | 00 01 | 02 03 04 05 06 07 08 09 | 10 ... 49 | 50 51 52 53 54 55 56 57 | 58 59
        var period = Math.floor( (base.getMinutes() - 2) / 8) + 1; // it becomes 0 to 8
        
        // in this hour (upto 1st(:02),2nd(:10), ... ,7th(:50))
        var hours = base.getHours();

        // iterate about hours
        for(; list.length < 7; ) {
            // in this hour
            // i が 8 なら次の時間へ、もしくは 7 件埋まれば終了
            for(var i = period+1; i <= 7 && list.length < 7; ++i) {
                var minutes = 2 + (i-1) * 8;
                var d = new Date(base);
                d.setHours(hours);
                d.setMinutes(minutes);
                d.setSeconds(0);
                d.setMilliseconds(0);
                list.push( d );
            }
            // for next hour
            period = 0;
            hours += 1;
        }
        return list;
    }
}

export default SalmonrunTimeTimer;