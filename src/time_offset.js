// based on https://www.nict.go.jp/JST/JST5.js

var ServerList = [
    "https://ntp-a1.nict.go.jp/cgi-bin/json",
    "https://ntp-b1.nict.go.jp/cgi-bin/json",
    "https://ntp-a4.nict.go.jp/cgi-bin/json"
];
import getJSON from "get-json-data";

class TimeOffset {
    constructor() {
        this.error = "";
        this.status = 0;	// 1: 1 server only, 2: accurate
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
        this.responsed_count = 0;
        for (let server of ServerList) {
            getJSON(server + "?" + ( (new Date()).getTime() / 1000 ), (err, json) => {
                ++this.responsed_count;
                if (err) {
                    this.error += String(err) + "\n";
                    this.errmsg(this.error);
                    return;
                }
                var now = new Date();	 		// Receive time
                if( json.st && json.it && json.leap && json.next && json.step ) {
                    json.rt = now.getTime(); 		// Receive time
                    json.it = Number(json.it) * 1000; 			// Initiate time
                    json.st = Number(json.st) * 1000; 			// Send time
                    json.leap = Number(json.leap);
                    json.next = Number(json.next);
                    json.step = Number(json.step);
                    json.rtt = json.rt - json.it;		// Round Trip Time
                    json.dif = json.st - (json.it+json.rt)/2;	// estimated clock difference
                    json.lb = json.it - 16 - json.st;	// estimated lower bound
                    json.ub = json.rt + 16 - json.st;	// estimated upper bound
                    this.results.unshift( json );		// json -> Result[0]
                }
                if (this.responsed_count >= 2) {
                    this.calculate();
                }
            });
        }
    }
    errmsg(msgnum) {
        var elm = document.getElementById("jst_error");
        if (elm) { elm.innerHTML = msgnum; }
    }
    calculate() {
        var maxlb, minub;
        var results = this.results;
    
        if ( results.length == 0 ) return -1;
    
        if ( results.length >= 2 ) {	// Error should be less than 500ms
            for (var i = 1; i < results.length; i++) {
                maxlb = Math.max( results[0].lb, results[i].lb );
                minub = Math.min( results[0].ub, results[i].ub );
                if( (maxlb < minub) && ((minub - maxlb) < 500)) {
                    this.status = 2;
                    this.errmsg("normal");
                    break;
                }
            }
        }
        if (this.status != 2 ){	// Otherwise set status = 1 and try next server
            maxlb = results[0].lb;
            minub = results[0].ub;
            this.status = 1;
            this.errmsg("warning");
        }
    
        this.offset = - ( maxlb + minub ) / 2;
        this.leap = results[0].leap;  // Total leap seconds before NEXT Leap
        this.next = results[0].next;  // Next Leap (UNIX TIME)
    
        var start = Math.floor( ( this.offset + (new Date()).getTime() ) / 1000 );
    
        if ( start >= this.next ) { this.sl = this.leap + 1; }	// TAI - UTC at startup
        else                      { this.sl = this.leap; }
    
        // detail status
        var msg  = "";
        for (let i = results.length - 1; i >= 0; i--) {
            msg += results[i].id + ": RTT = " + Math.round( results[i].rtt ) + " ms , (PC Clock - JST) = " +
                    Math.round( ( results[i].lb + results[i].ub ) / 2 ) + " ms<br>";
        }
    
        msg += "Estimated clock difference (PC Clock - JST) = " + Math.round( - this.offset ) + " &plusmn; " + Math.ceil( ( minub - maxlb ) / 2 ) + "ms<br>"
    
        var jst_status = document.getElementById( "jst_status" );
        if ( jst_status ) { jst_status.innerHTML = msg; }
    }
    


}


export default TimeOffset;