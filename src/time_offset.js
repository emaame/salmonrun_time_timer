// based on https://www.nict.go.jp/JST/JST5.js

var ServerList = [
    "https://ntp-a1.nict.go.jp/cgi-bin/json",
    "https://ntp-b1.nict.go.jp/cgi-bin/json",
    "https://ntp-a4.nict.go.jp/cgi-bin/json"
];
import getJSON from "get-json-data";

class TimeOffset {
    constructor() {
        this.offset = 0;
        this.get_offset();
    }

    get_time(date = Date.now()) {
        if (this.offset) {
            return new Date(date + this.offset);
        } else {
            return new Date(date);
        }
    }
    
    get_offset() {
        this.results = new Array();
        const server_no = Math.floor(Math.random() * 3);
        const server_addr = ServerList[server_no];
        // ランダムで一つのサーバにアクセスすれば十分
        getJSON(server_addr + "?" + ( (new Date()).getTime() / 1000 ), (err, json) => {
            if (err) {
                console.log(String(err));
                return;
            }
            var now = new Date();	 		// Receive time
            if( json.st && json.it && json.leap && json.next && json.step ) {
                json.rt = now.getTime(); 		// Receive time
                json.it = Number(json.it) * 1000; 			// Initiate time
                json.st = Number(json.st) * 1000; 			// Send time
                json.lb = json.it - 16 - json.st;	// estimated lower bound
                json.ub = json.rt + 16 - json.st;	// estimated upper bound

                // 詰まるところ必要なのは中央の修正値だけ
                this.offset = - ( json.lb + json.ub ) / 2;
            }
        });
    }
}


export default TimeOffset;