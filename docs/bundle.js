!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){var i;i=function(e,t,n){var i;if(XMLHttpRequest)i=new XMLHttpRequest;else if(ActiveXObject)try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}if(!i)return t.call(this,"Giving up :( Cannot create an XMLHTTP instance",null),!1;i.onreadystatechange=function(){if(4===i.readyState)if(i.status>=200&&i.status<400){var e=i.responseText;if(!(n&&n.hasOwnProperty("raw")&&n.raw))try{e=JSON.parse(e)}catch(e){return void t.call(this,e,null)}t.call(this,null,e)}else t.call(this,new Error("There was a problem with the request"),null)};var o=n&&n.method?n.method:"GET";if("GET"==o){var s=[];if(n&&n.params&&"object"==typeof n.params)for(var a in n.params)s.push(a+"="+encodeURIComponent(n.params[a]));e=s.length>0?e+"?"+s.join("&"):e,i.open("GET",e),i.send()}else if("POST"==o){var r=n&&n.data?n.data:n.params?n.params:{};i.open("POST",e),i.send(JSON.stringify(r))}return i},e.exports&&(e.exports=i),"undefined"!=typeof window&&(window.getJSONData=i)},function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}n.r(t);var o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.time_offset=t}var t,n,o;return t=e,(n=[{key:"listup_next_STT",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),n=[];e=this.time_offset?this.time_offset.get_time(t):new Date(t);for(var i=Math.floor((e.getMinutes()-2)/8)+1,o=e.getHours();n.length<7;){for(var s=i+1;s<=7&&n.length<7;++s){var a=2+8*(s-1),r=new Date(e);r.setHours(o),r.setMinutes(a),r.setSeconds(0),r.setMilliseconds(0),n.push(r)}i=0,o+=1}return n}}])&&i(t.prototype,n),o&&i(t,o),e}();function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,(n=[{key:"getMonthText",value:function(e){var t=e.getMonth()+1,n=e.getDate();t<10&&(t="0"+t),n<10&&(n="0"+n);var i=e.getHours(),o=e.getMinutes(),s=e.getSeconds();return i<10&&(i="0"+i),o<10&&(o="0"+o),s<10&&(s="0"+s),t+"/"+n+" "+i+":"+o+":"+s}},{key:"getMinText",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e.getMinutes(),i=e.getSeconds(),o=e.getMilliseconds();return t?(n<10&&(n="0"+n),i<10&&(i="0"+i),o<10?o="00"+o:o<100&&(o="0"+o),n+":"+i+"."+o):(o>0&&(i+=1)>=60&&(i-=60,n+=1),n<10&&(n="0"+n),i<10&&(i="0"+i),n+":"+i)}}])&&s(t.prototype,n),i&&s(t,i),e}(),r=n(0),u=n.n(r);function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var f=["https://ntp-a1.nict.go.jp/cgi-bin/json","https://ntp-b1.nict.go.jp/cgi-bin/json","https://ntp-a4.nict.go.jp/cgi-bin/json"],c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.offset_jst=0,this.set_offset_friend(t),this.get_offset_jst()}var t,n,i;return t=e,(n=[{key:"get_time",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=0;return this.offset_jst&&(t+=this.offset_jst),this.offset_friend&&(t+=this.offset_friend),new Date(e+t)}},{key:"set_offset_friend",value:function(e){this.offset_friend=e}},{key:"get_offset_jst",value:function(){var e=this;this.results=new Array;var t=Math.floor(3*Math.random()),n=f[t];u()(n+"?"+(new Date).getTime()/1e3,(function(t,n){if(!t){var i=new Date;n.st&&n.it&&n.leap&&n.next&&n.step&&(n.rt=i.getTime(),n.it=1e3*Number(n.it),n.st=1e3*Number(n.st),n.lb=n.it-16-n.st,n.ub=n.rt+16-n.st,e.offset_jst=-(n.lb+n.ub)/2)}}))}}])&&l(t.prototype,n),i&&l(t,i),e}();function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scheme=t}var t,n,i;return t=e,(n=[{key:"load",value:function(){var e=this;this.scheme,Object.keys(this.scheme).forEach((function(t){var n=e.scheme[t],i=n.type,o=localStorage[t];null==o&&(o=n.default),i===Boolean?e[t]="true"==o||1==o:e[t]=i===Number?Number(o):i===String?String(o):o}),this)}},{key:"save",value:function(e,t){localStorage[e]=t,this[e]=t}}])&&d(t.prototype,n),i&&d(t,i),e}();function m(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var v=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.soundURLs=["1.wav","2.wav","3.wav","4.wav","5.wav","10.wav","30.wav","quite-impressed.mp3"].map((function(e){return"./sounds/"+e})),this.sources=new Array(this.soundURLs.length),this.buffers=new Array(this.soundURLs.length),this.playing=new Array(this.soundURLs.length,!1),this.audioContext=window.AudioContext||window.webkitAudioContext,this.noAudioContext=!1,this.fallbackAudio,void 0!==this.audioContext?this.audioCtx=new this.audioContext:(this.noAudioContext=!0,this.fallbackAudio=document.createElement("audio"))}var t,n,i;return t=e,(n=[{key:"loadAll",value:function(){var e=this;return Promise.all(this.soundURLs.map((function(t,n,i){return e._load(n).then((function(t){t&&(e.buffers[n]=t)}))})))}},{key:"playSilent",value:function(){this.audioCtx.resume();var e=this.audioCtx.createBuffer(1,1,22050),t=this.audioCtx.createBufferSource();t.buffer=e,t.connect(this.audioCtx.destination),t.start(0)}},{key:"play",value:function(e){var t=this;return this._load(e).then((function(n){if(t.noAudioContext)return t.fallbackAudio.currentTime=0,void t.fallbackAudio.play();t.audioCtx.resume();var i=t.audioCtx.createBufferSource();i&&(i.buffer=n,i.connect(t.audioCtx.destination),i.onended=function(){this.stop(e)},i.start(0),t.sources[e]=i,t.playing[e]=!0)}))}},{key:"stop",value:function(e){this.playing[e]=!1,this.sources[e]&&this.sources[e].stop(0),noAudioContext&&fallbackAudio.pause()}},{key:"_load",value:function(e){var t=this,n=this.soundURLs[e];if(this.noAudioContext)return this.fallbackAudio.src=n,new Promise((function(e,t){e(null)}));this.audioCtx.resume();var i=this.buffers[e];return new Promise(1==!!i?function(e,t){e(i)}:function(e,i){var o=new XMLHttpRequest;o.open("GET",n,!0),o.responseType="arraybuffer",o.onload=function(){4===o.readyState&&200===o.status?t.audioCtx.decodeAudioData(o.response,(function(t){e(t)})):i(new Error(o.statusText))},o.onerror=function(){i(new Error(o.statusText))},o.send(null)})}}])&&m(t.prototype,n),i&&m(t,i),e}();function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var g=new a,y="mode_friend",_="mode_frequency_update",w="mode_show_ms",b="use_sound",k={};k[y]={type:Boolean,default:!1},k[_]={type:Boolean,default:!1},k[w]={type:Boolean,default:!1},k[b]={type:Boolean,default:!1};var x=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);function M(){return x&&x.call(performance)||(new Date).getTime()}var S=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},T=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sound=new v,this.sound_triggers=[1,2,3,4,5,10,30].map((function(e){return 1e3*e})),this.played_min=!1,this.least_sound_trigger=this.sound_triggers[this.sound_triggers.length-1],this.time_offset=new c,this.timer=new o(this.time_offset),this.config=new h(k),this.last_time=M(),this.elmEta=document.getElementById("eta"),this.elmEtaArea=document.getElementById("eta_area"),this.elmEtaLabel=document.getElementById("eta_label"),this.elmOffset=document.getElementById("offset"),this.elmModeFriend=document.getElementById(y),this.elmModeFriend.addEventListener("click",this.on_change_modeFriend.bind(this)),this.elmModeFrequencyUpdate=document.getElementById(_),this.elmModeFrequencyUpdate.addEventListener("click",this.on_change_modeFrequencyUpdate.bind(this)),this.elmModeShowMS=document.getElementById(w),this.elmModeShowMS.addEventListener("click",this.on_change_modeShowMS.bind(this)),this.elmUseSound=document.getElementById(b),this.elmUseSound.addEventListener("click",this.on_change_useSound.bind(this)),this.elmLabelUseSound=document.getElementById(b+"_label");var n=function(e){t.sound.playSilent(),t.elmLabelUseSound.innerHTML="サウンド再生（制限解除済み）",t.elmLabelUseSound.classList.remove("mdl-color-text--deep-orange-900")};document.addEventListener("click",n),document.addEventListener("touchend",n),this.config.load(),this.on_load(),this.update(!0)}var t,n,i;return t=e,(n=[{key:"calc_eta",value:function(){this.list=this.timer.listup_next_STT();var e=this.time_offset.get_time(),t=this.list[0]-e;this.notify_sound(t),this.eta=new Date(t)}},{key:"notify_sound",value:function(e){if(this.useSound)if(e>this.least_sound_trigger)this.played_min=!1;else if(!this.played_min){var t=this.sound_triggers.findIndex((function(t){return e<t}));this.sound.play(t),this.played_min=t<=0;var n=this.played_min?this.sound_triggers.length-2:t-1;console.log(n),this.least_sound_trigger=this.sound_triggers[n]}}},{key:"update_eta",value:function(){var e=this.config[w],t=g.getMinText(this.eta,e);this.elmEta.innerHTML=t;var n="ST";if(0!=this.time_offset.offset_friend&&(n+="(フレ部屋)"),n+="まで",this.elmEtaLabel.innerHTML=n,this.time_offset.offset_jst){var i="";this.time_offset.offset_jst<0?i+="-"+g.getMinText(new Date(-this.time_offset.offset_jst)):i+="+"+g.getMinText(new Date(this.time_offset.offset_jst)),i+=" を補正済み",0!=this.time_offset.offset_friend&&(i+=" (更に2秒遅れ中)"),this.elmOffset.innerHTML=i}else this.elmOffset.innerHTML="時刻合わせ中 ..."}},{key:"update_list",value:function(){for(var e in this.list){var t=document.getElementById("stt-item-"+(Number(e)+1)),n=g.getMonthText(this.list[e]);t.innerHTML=n}}},{key:"update",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=M(),n=t-this.last_time,i=this.config[_],o=i||this.eta<6e4?50:1e3;(!e||n>o)&&(this.calc_eta(),this.update_eta(),this.update_list(),n>o&&(this.last_time=t)),e&&S(this.update.bind(this,!0))}},{key:"on_load",value:function(){this.elmModeFriend.checked=this.config[y],this.elmModeFrequencyUpdate.checked=this.config[_],this.elmUseSound.checked=this.config[b],this.on_change_modeFriend(),this.on_change_useSound(),this.on_change_modeFrequencyUpdate()}},{key:"on_change_modeFriend",value:function(){var e=this.elmModeFriend.checked;this.elmEtaArea.classList.remove("mdl-color--grey-800"),this.elmEtaArea.classList.remove("mdl-color--green-900"),this.elmEtaLabel.classList.remove("mdl-color-text--grey-600"),this.elmEtaLabel.classList.remove("mdl-color-text--yellow-600"),this.elmOffset.classList.remove("mdl-color-text--grey-600"),this.elmOffset.classList.remove("mdl-color-text--yellow-600"),e?(this.time_offset.set_offset_friend(-2e3),this.elmEtaArea.classList.add("mdl-color--green-900"),this.elmEtaLabel.classList.add("mdl-color-text--yellow-600"),this.elmOffset.classList.add("mdl-color-text--yellow-600")):(this.time_offset.set_offset_friend(0),this.elmEtaArea.classList.add("mdl-color--grey-800"),this.elmEtaLabel.classList.add("mdl-color-text--grey-600"),this.elmOffset.classList.add("mdl-color-text--grey-600")),this.config.save(y,e),this.update(!1)}},{key:"on_change_modeFrequencyUpdate",value:function(){var e=this.elmModeFrequencyUpdate.checked;this.config.save(_,e),this.update(!0)}},{key:"on_change_modeShowMS",value:function(){var e=this.elmModeShowMS.checked;this.config.save(w,e),this.update(!0)}},{key:"on_change_useSound",value:function(){if(this.useSound=this.elmUseSound.checked,this.config.save(b,this.useSound),this.update(!1),this.useSound)return this.sound.loadAll(),void this.sound.play(7)}}])&&p(t.prototype,n),i&&p(t,i),e}();window.onload=function(){new T}}]);