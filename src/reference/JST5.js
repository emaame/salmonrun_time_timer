// Copyright (C) 1998 - 2013 NICT, Hiroshi Toriyama, All Rights Reserved. 

// Global variables
var LEAP;	// Accumulation of leap seconds (until next leap event)
var NEXT;	// Next leap event in UNIX Time
var SL;		// Accumulation of leap seconds when this script starts

var LoopTimer;	// Interval timer for refreshing the clock display
var FetchTimer;	// Fetch timeout timer
var Offset;	// Estimated offset (ms)
var Xhr;	// XMLHttpRequest or XDomainRequest(IE)

var Interval = 100;		// Refresh clock display every 100ms
var TimeOut  = 3000;		// http timeout is 3 seconds
var Status   = 0;		// 1: 1 server only, 2: accurate
var Results  = new Array();

function startclock() {
	LoopTimer = setInterval("showtime()", Interval);
	fetch();
}

function stopclock() {
	if ( LoopTimer ) clearInterval(LoopTimer);
}

function fetch() {  // Asynchronous server access

	if ( Status >= 2 ) return;	// Already completed
	if ( ServerList.length < 1) {	// Server exhausted
		if( Status == 0 ) errmsg("error");
		return;
	}

	// use XDomainRequest for IE8 and 9, otherwise XMLHttpRequest

	if ( typeof window.XMLHttpRequest !== 'undefined' ) {
		Xhr = new window.XMLHttpRequest();
		if ( typeof Xhr.withCredentials === 'undefined' &&
		     typeof window.XDomainRequest !== 'undefined' ) {
			Xhr = new window.XDomainRequest();
		}
	} else {	// old browsers are not supported.
		errmsg("incompat");
		exit();	
	}

	var url = ServerList.shift();			// get next url

	Xhr.onload = checkresponse;
	Xhr.open("GET", url + "?" + ( (new Date()).getTime() / 1000 ), true);
	Xhr.send(null);						// send request
	FetchTimer = setInterval("fetchtimeout()", TimeOut);	// set timer
}

function checkresponse() {				// interrupt handler
	clearInterval(FetchTimer);
	if (Xhr.responseText) {				// responseText defined?
		var now = new Date();	 		// Receive time
		var json = JSON.parse(Xhr.responseText);
		if( json.st && json.it && json.leap && json.next && json.step ) {
			json.it *= 1000; 			// Initiate time
			json.st *= 1000; 			// Send time
			json.rt = now.getTime(); 		// Receive time
			json.rtt = json.rt - json.it;		// Round Trip Time
			json.dif = json.st - (json.it+json.rt)/2;	// estimated clock difference
			json.lb = json.it - 16 - json.st;	// estimated lower bound
			json.ub = json.rt + 16 - json.st;	// estimated upper bound
			Results.unshift( json );		// json -> Result[0]
		}
	}
	calculate();				// calculate offset values
	fetch();				// next server
}

function fetchtimeout() {
	clearInterval(FetchTimer);
	Xhr.abort();
	calculate();				// calculate offset values
	fetch();				// next server
}

function errmsg(msgnum) {
	var msgbox = document.getElementById( "ServerStat" );
	if ( msgbox )  msgbox.innerHTML = Text[msgnum];
}

function toggle(id) {
	var msgbox = document.getElementById(id);
	if ( msgbox == null ) return;
	if( msgbox.style.display == "block" ) msgbox.style.display = "none"
	else msgbox.style.display = "block";
}

function calculate() {

	var maxlb, minub;

	if ( Results.length == 0 ) return;

	if ( Results.length >= 2 ) {	// Error should be less than 500ms
		for (var i = 1; i < Results.length; i++) {
			maxlb = Math.max( Results[0].lb, Results[i].lb );
			minub = Math.min( Results[0].ub, Results[i].ub );
			if( (maxlb < minub) && ((minub - maxlb) < 500)) {
				Status = 2;
				errmsg("normal");
				break;
			}
		}
	}
	if (Status != 2 ){	// Otherwise set status = 1 and try next server
		maxlb = Results[0].lb;
		minub = Results[0].ub;
		Status = 1;
		errmsg("warning");
	}

	Offset = - ( maxlb + minub ) / 2;
	LEAP = Results[0].leap;  // Total leap seconds before NEXT Leap
	NEXT = Results[0].next;  // Next Leap (UNIX TIME)

	var start = Math.floor( ( Offset + (new Date()).getTime() ) / 1000 );

	if ( start >= NEXT ) SL = LEAP + 1;	// TAI - UTC at startup
	else SL = LEAP;

// detail status
	var msg  = "";
	for (var i = Results.length - 1; i >= 0; i--) {
		msg += Results[i].id + ": RTT = " + Math.round( Results[i].rtt ) + " ms , (PC Clock - JST) = " +
		        Math.round( ( Results[i].lb + Results[i].ub ) / 2 ) + " ms<br>";
	}

	msg += "Estimated clock difference (PC Clock - JST) = " + Math.round( - Offset ) + " &plusmn; " + Math.ceil( ( minub - maxlb ) / 2 ) + "ms<br>"

	var msgbox = document.getElementById( "Details" );
	if ( null != msgbox ) msgbox.innerHTML = msg;
}

function showtime()
{
	// This function uses Global Variables below:
	// Offset, Interval, SL, Text[]

	var now, tzoffset, leapflag, temp, sec, utcms, utcsec;
	var JST, UTC, TAI, LOC, CMP, CL;

	now = new Date();

	tzoffset = now.getTimezoneOffset() * 60000;	// in ms
	if (tzoffset > 12 * 3600000) tzoffset -= ( 24 * 3600000 );

	CMP = new Date( now.getTime() - tzoffset );
	document.clock.LOCAL.value = ToDateStr(CMP, 0);

	if ( Results.length == 0 ) return;	// not ready

	utcms = now.getTime() + Offset + Interval / 2;
	utcsec = Math.floor( utcms / 1000 );

	CL = LEAP;
	if ( utcsec >= NEXT ) CL = CL + 1;	// Current TAI - UTC

	leapflag = 0;
	if ( utcsec == NEXT ) leapflag = 1;	// during leap second

	utcms = utcms - ( CL - SL ) * 1000;

	JST = new Date( utcms + 9 * 3600000 );	// JST = UTC + 9H
	document.clock.JST.value = ToDateStr(JST, leapflag);

	UTC = new Date( utcms );
	document.clock.UTC.value = ToDateStr(UTC, leapflag);

	TAI = new Date( utcms + CL * 1000 );
	document.clock.TAI.value = ToDateStr(TAI, 0);

	LOC = new Date( utcms - tzoffset );
	document.clock.LOC.value = ToDateStr(LOC, leapflag);

	sec = Math.round( ( Offset / 1000 - ( CL - SL ) ) * 10 ) / 10;
	if( sec == 0 ) {
		document.clock.offset.value = Text.correct;
	} else {
		document.clock.offset.value = Math.abs(sec) +
			((sec < 0) ? Text.fast : Text.slow);
	}
}

function ToDateStr(t, flg)
{
	var h, m, s, YY, MM, DD;

	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();
	if ( flg != 0 ) s = 60;

	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	if (s < 10) s = "0" + s;

	YY = t.getUTCFullYear();
	MM = t.getUTCMonth() + 1;
	DD = t.getUTCDate();
	if (MM < 10) MM = "0" + MM;
	if (DD < 10) DD = "0" + DD;

	return (YY + "/" + MM + "/" + DD + " " + h + ":" + m + ":" + s);
}
