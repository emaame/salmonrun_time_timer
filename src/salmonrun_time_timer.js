class SalmonrunTimeTimer {
    constructor(time_offset = null) {
        this.time_offset = time_offset;
    }

    // UTC 基準で残り時間を出す
    // テストしやすいように基準の日時を渡せるようにした
    listup_next_STT(date = Date.now(), origin = 2, interval = 8, replace_50_to_52 = false) {
        var list = [];
        var base;
        if (this.time_offset) {
            base = this.time_offset.get_time(date);
        } else {
            base = new Date(date);
        }
        //  period |   0   |            1            | 2  ...  6 |            7            | 8
        // minutes | 00 01 | 02 03 04 05 06 07 08 09 | 10 ... 49 | 50 51 52 53 54 55 56 57 | 58 59
        var last_minutes = base.getUTCMinutes();
        var period = Math.floor((last_minutes - origin) / interval) + 1; // it becomes 0 to 8
        // in this hour (upto 1st(:02),2nd(:10), ... ,7th(:50))
        var hours = base.getUTCHours();

        const use52 = replace_50_to_52 && interval == 8 && origin == 2;
        const maxPeriod = Math.floor(60 / interval);

        const add_new_time_to_list = (list, base, hours, minutes) => {
            var d = new Date(base);
            d.setUTCHours(hours);
            d.setUTCMinutes(minutes);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            list.push(d);
            return d;
        }

        // iterate about hours ... 無限ループしないように上限を入れておく
        for (let times = 1; list.length < 7 && times < 4; ++times) {
            // in this hour
            // i が 8 なら次の時間へ、もしくは 7 件埋まれば終了
            for (var i = period + 1; i <= maxPeriod && list.length < 7; ++i) {
                // 8分間隔の場合、例外的に 50 の次に 52 を追加する
                var minutes = origin + (i - 1) * interval;
                var next_minutes = minutes + interval;
                // 十分な間隔が取れない場合は仮でスキップするようにする
                // 9分間隔の場合（56分 をありにすると 02分 をまたいでしまう）
                // 10分間隔の場合（52分 をありにする）
                if (next_minutes >= 60 && next_minutes % 60 > origin) break;

                // 50を52で置き換える場合は、50の登録を飛ばす
                if (use52 && minutes == 50) break;

                add_new_time_to_list(list, base, hours, minutes);
                last_minutes = minutes;
            }
            // 50を52で置き換える場合は、52の登録
            if (use52 && list.length < 7 && last_minutes < 52) {
                add_new_time_to_list(list, base, hours, 52);
            }
            // for next hour
            period = 0;
            hours += 1;
        }
        return list;
    }
}

export default SalmonrunTimeTimer;
