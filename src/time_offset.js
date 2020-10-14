import getJSON from "get-json-data";
import Config, { KEY_TIMEOFFSET, KEY_TIMEOFFSET_UPDATED_AT } from "./config";

// based on https://www.nict.go.jp/JST/JST5.js

var ServerList = [
    "https://ntp-a1.nict.go.jp/cgi-bin/json",
    "https://ntp-b1.nict.go.jp/cgi-bin/json",
    "https://ntp-a4.nict.go.jp/cgi-bin/json",
];

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
        const diff = Date.now() - Config[KEY_TIMEOFFSET_UPDATED_AT];
        if (diff < THRESHOLD_TIME_UPDATE_IN_MS) {
            this.use_cached_data();
            return;
        }

        const server_no = Math.floor(Math.random() * 3);
        const server_addr = ServerList[server_no];
        // ランダムで一つのサーバにアクセスすれば十分
        getJSON(
            server_addr + "?" + new Date().getTime() / 1000,
            (err, json) => {
                if (err) {
                    alert(
                        "時刻の取得ができなかったので、以前の補正値をそのまま使います"
                    );
                    this.use_cached_data();
                    //console.log(String(err));
                    return;
                }
                const now = new Date(); // Receive time
                if (json.st && json.it && json.leap && json.next && json.step) {
                    json.rt = now.getTime(); // Receive time
                    json.it = Number(json.it) * 1000; // Initiate time
                    json.st = Number(json.st) * 1000; // Send time
                    json.lb = json.it - 16 - json.st; // estimated lower bound
                    json.ub = json.rt + 16 - json.st; // estimated upper bound

                    // 詰まるところ必要なのは中央の修正値だけ
                    this.offset_jst = -(json.lb + json.ub) / 2;

                    Config.save(KEY_TIMEOFFSET, this.offset_jst);
                    Config.save(KEY_TIMEOFFSET_UPDATED_AT, Date.now());
                }
            }
        );
    }
}

export default TimeOffset;
