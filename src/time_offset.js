// based on https://www.nict.go.jp/JST/JST5.js

var ServerList = [
    "https://ntp-a1.nict.go.jp/cgi-bin/json",
    "https://ntp-b1.nict.go.jp/cgi-bin/json",
    "https://ntp-a4.nict.go.jp/cgi-bin/json"
];
import getJSON from "get-json-data";

class TimeOffset {
    constructor(offset_5T = 0) {
        this.offset_jst = 0;
        this.set_offset_5T(offset_5T);
        this.get_offset_jst();
    }

    get_time(date = Date.now()) {
        var offset = 0;
        if (this.offset_jst) { offset += this.offset_jst; }
        if (this.offset_5T ) { offset += this.offset_5T ; }
        return new Date(date + offset);
    }
    
    set_offset_5T(offset_5T) {
        this.offset_5T = offset_5T;
    }

    get_offset_jst() {
        this.results = new Array();
        const server_no = Math.floor(Math.random() * 3);
        const server_addr = ServerList[server_no];
        // ランダムで一つのサーバにアクセスすれば十分
        getJSON(server_addr + "?" + ( (new Date()).getTime() / 1000 ), (err, json) => {
            if (err) {
                //console.log(String(err));
                return;
            }
            var now = new Date();	 		// Receive time
            if( json.st && json.it && json.leap && json.next && json.step ) {
                json.rt = now.getTime(); 		// Receive time
                json.it = Number(json.it) * 1000; 	// Initiate time
                json.st = Number(json.st) * 1000; 	// Send time
                json.lb = json.it - 16 - json.st;	// estimated lower bound
                json.ub = json.rt + 16 - json.st;	// estimated upper bound

                // 詰まるところ必要なのは中央の修正値だけ
                this.offset_jst = - ( json.lb + json.ub ) / 2;
            }
        });
    }
}


export default TimeOffset;