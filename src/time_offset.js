import getJSON from "get-json-data";
import Config, { KEY_TIMEOFFSET, KEY_TIMEOFFSET_UPDATED_AT } from "./config";

// cache を使う時間
const THRESHOLD_TIME_UPDATE_IN_MS = 2 * 60 * 1000 * 1000;

class TimeOffset {
    constructor(offset_friend = 0) {
        this.offset_jst = 0;
        this.set_offset_friend(offset_friend);
        this.get_offset_jst();
    }

    get_time(date = Date.now()) {
        var offset = 0;
        if (this.offset_jst) {
            offset += this.offset_jst;
        }
        if (this.offset_friend) {
            offset += this.offset_friend;
        }
        return new Date(date + offset);
    }

    set_offset_friend(offset_friend) {
        this.offset_friend = offset_friend;
    }

    use_cached_data() {
        this.offset_jst = Config[KEY_TIMEOFFSET];
    }

    get_offset_jst() {
        // XTimer でとれたらそれで採用、だめなら従来方式を残しておく
        new OffsetGetterXTimer()
            .get_offset()
            .then((offsetXTimer) => {
                if (offsetXTimer) {
                    this.set_offset_jst(offsetXTimer);
                    return;
                }
                this.use_cached_data();
            })
            .catch((e) => {
                this.use_cached_data();
            });
    }

    set_offset_jst(offset_jst) {
        this.offset_jst = offset_jst;
        Config.save(KEY_TIMEOFFSET, this.offset_jst);
        Config.save(KEY_TIMEOFFSET_UPDATED_AT, Date.now());
    }
}

export class OffsetGetterXTimer {
    constructor() { }

    parse(xtimer) {
        // see https://docs.fastly.com/en/guides/understanding-the-xtimer-header
        // see https://qiita.com/AtsushiFukuda/items/fb20f8a410b47396d83a
        // VE の値は RTT に含まれるだろうから補正は要らないはず
        const matches = xtimer.match(/S(\d+\.\d+),VS\d+,VE\d+/);
        if (!matches || matches.length < 2) return null;
        const raw = parseFloat(matches[1]);
        // 小数部分が0.5以上のとき整数部分が1大きくなる仕様があるので修正する
        return raw - Math.floor(raw) >= 0.5 ? raw - 1 : raw;
    }

    get_offset() {
        try {
            const uri = location.href + "?" + Math.random().toString();
            const opts = {
                method: "HEAD",
                cache: "no-cache",
                referrerPolicy: "no-referrer",
            };
            const beforeTime = Date.now();
            return fetch(uri, opts)
                .then((response) => {
                    const afterTime = Date.now(); // 通信の往復時間を計測しておく

                    // see https://docs.fastly.com/en/guides/understanding-the-xtimer-header
                    // see https://qiita.com/AtsushiFukuda/items/fb20f8a410b47396d83a
                    // VE の値は RTT に含まれるだろうから補正は要らないはず
                    const time = this.parse(response.headers.get("x-timer"));
                    // ミリ秒に直して補正値を決定する
                    const offset = (1000 * time) - 0.5 * (beforeTime + afterTime);
                    // console.log(new Date(Date.now() + offset)); // webpack-server が返す x-timer: 1605950354.922070 との比較用
                    return offset;
                })
                .catch((e) => {
                    return null;
                });
        } catch (e) {
            return null;
        }
    }
}

export default TimeOffset;
