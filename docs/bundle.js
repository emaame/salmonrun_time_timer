/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _salmonrun_time_timer = __webpack_require__(1);

var _salmonrun_time_timer2 = _interopRequireDefault(_salmonrun_time_timer);

var _date_formatter = __webpack_require__(2);

var _date_formatter2 = _interopRequireDefault(_date_formatter);

var _alert_sound = __webpack_require__(3);

var _alert_sound2 = _interopRequireDefault(_alert_sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var date_formatter = new _date_formatter2.default();

var App = function () {
    function App() {
        var _this = this;

        _classCallCheck(this, App);

        this.timer = new _salmonrun_time_timer2.default();

        this.alert = new _alert_sound2.default();
        this.alert_functions = {};
        this.alert_functions[15] = function (eta) {
            var start = eta / 1000 - 15;
            var E5 = 329.63;
            var F5 = 349.23;
            var quaver_seconds = 60 / (124 * 2); // 124 [BPM]
            var melody = [{ type: "triangle", freq: E5, duration: quaver_seconds * 2 }, { type: "triangle", freq: E5, duration: quaver_seconds * 2 }, { type: "triangle", freq: F5, duration: quaver_seconds * 2 }, { type: "triangle", freq: E5, duration: quaver_seconds * 1 }, { type: "triangle", freq: F5, duration: quaver_seconds * 1 }];
            _this.alert.play_melody(start, melody);
        };
        this.alert_functions[3] = function (eta) {
            _this.alert._play_oscillator(440, eta / 1000 - 3, 0.1);
        };
        this.alert_functions[2] = function (eta) {
            _this.alert._play_oscillator(440, eta / 1000 - 2, 0.1);
        };
        this.alert_functions[1] = function (eta) {
            _this.alert._play_oscillator(440, eta / 1000 - 1, 0.1);
        };
        this.alert_functions[0] = function (eta) {
            _this.alert._play_oscillator(880, eta / 1000 - 0, 1.0);
        };
    }

    _createClass(App, [{
        key: "calc_eta",
        value: function calc_eta() {
            var base = new Date(Date.now());
            this.list = this.timer.listup_next_STT();
            this.eta = new Date(this.list[0] - base);
        }
    }, {
        key: "update_eta",
        value: function update_eta() {
            // eta
            var elmEta = document.getElementById("eta");
            var textEta = date_formatter.getMinText(this.eta);
            elmEta.innerHTML = textEta;
        }
    }, {
        key: "update_list",
        value: function update_list() {
            // list
            for (var i = 0; i < this.list.length; ++i) {
                var elmSTT = document.getElementById("stt-item-" + (i + 1));
                var textSTT = date_formatter.getMonthText(this.list[i]);
                elmSTT.innerHTML = textSTT;
            }
        }
    }, {
        key: "update_sound",
        value: function update_sound() {
            var eta_sec = Math.floor(this.eta / 1000);
            if (!this.alert_functions[eta_sec]) {
                return;
            }
            this.alert_functions[eta_sec](this.eta);
        }
    }, {
        key: "update",
        value: function update() {
            this.calc_eta();
            this.update_eta();
            this.update_list();
            this.update_sound();

            var interval = 1000;
            if (this.eta < 60 * 1000) {
                interval = 50;
            }
            setTimeout(this.update.bind(this), interval);
        }
    }]);

    return App;
}();

window.onload = function () {
    var app = new App();
    app.update();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SalmonrunTimeTimer = function () {
    function SalmonrunTimeTimer() {
        _classCallCheck(this, SalmonrunTimeTimer);
    }

    // テストしやすいように基準の日時を渡せるようにした


    _createClass(SalmonrunTimeTimer, [{
        key: "listup_next_STT",
        value: function listup_next_STT() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

            var list = [];
            var base = new Date(date);

            //  period |   0   |            1            | 2  ...  6 |            7            | 8
            // minutes | 00 01 | 02 03 04 05 06 07 08 09 | 10 ... 49 | 50 51 52 53 54 55 56 57 | 58 59
            var period = Math.floor((base.getMinutes() - 2) / 8) + 1; // it becomes 0 to 8

            // in this hour (upto 1st(:02),2nd(:10), ... ,7th(:50))
            var hours = base.getHours();

            // iterate about hours
            for (; list.length < 7;) {
                // in this hour
                // i が 8 なら次の時間へ、もしくは 7 件埋まれば終了
                for (var i = period + 1; i <= 7 && list.length < 7; ++i) {
                    var minutes = 2 + (i - 1) * 8;
                    var d = new Date(base);
                    d.setHours(hours);
                    d.setMinutes(minutes);
                    d.setSeconds(0);
                    d.setMilliseconds(0);
                    list.push(d);
                }
                // for next hour
                period = 0;
                hours += 1;
            }
            return list;
        }
    }]);

    return SalmonrunTimeTimer;
}();

exports.default = SalmonrunTimeTimer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateFormatter = function () {
        function DateFormatter() {
                _classCallCheck(this, DateFormatter);
        }

        _createClass(DateFormatter, [{
                key: "getMonthText",
                value: function getMonthText(d) {
                        var MM = d.getMonth() + 1;
                        var DD = d.getDate();
                        if (MM < 10) MM = "0" + MM;
                        if (DD < 10) DD = "0" + DD;

                        var hh = d.getHours();
                        var mm = d.getMinutes();
                        var ss = d.getSeconds();

                        if (hh < 10) hh = "0" + hh;
                        if (mm < 10) mm = "0" + mm;
                        if (ss < 10) ss = "0" + ss;

                        return MM + "/" + DD + " " + hh + ":" + mm + ":" + ss;
                }
        }, {
                key: "getMinText",
                value: function getMinText(d) {
                        var mm = d.getMinutes();
                        var ss = d.getSeconds();
                        var SSS = d.getMilliseconds();

                        if (mm < 10) mm = "0" + mm;
                        if (ss < 10) ss = "0" + ss;
                        if (SSS < 10) {
                                SSS = "00" + SSS;
                        } else if (SSS < 100) {
                                SSS = "0" + SSS;
                        }

                        return mm + ":" + ss + "." + SSS;
                }
        }]);

        return DateFormatter;
}();

exports.default = DateFormatter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertSound = function () {
    function AlertSound() {
        _classCallCheck(this, AlertSound);
    }

    _createClass(AlertSound, [{
        key: "_createAudioContext",
        value: function _createAudioContext() {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            return new AudioContext();
        }
    }, {
        key: "_createOscillator",
        value: function _createOscillator(context) {
            var oscillator = context.createOscillator();

            // for legacy browsers
            oscillator.start = oscillator.start || oscillator.noteOn;
            oscillator.stop = oscillator.stop || oscillator.noteOff;
            context.createGain = context.createGain || context.createGainNode;
            return oscillator;
        }
    }, {
        key: "_play_oscillator",
        value: function _play_oscillator(context, start, note) {
            var oscillator = this._createOscillator(context);

            // set oscillator parameters .. fail back
            if (typeof oscillator.type === "string") {
                oscillator.type = note.type;
            } else {
                switch (note.type) {
                    case "sine":
                        oscillator.type = 0;break;
                    case "square":
                        oscillator.type = 1;break;
                    case "sawtooth":
                        oscillator.type = 2;break;
                    case "triangle":
                        oscillator.type = 3;break;
                    default:
                        oscillator.type = 0;break;
                }
            }
            oscillator.frequency.value = note.freq;

            // Create the instance of GainNode
            var gain = context.createGain();

            // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
            oscillator.connect(gain);
            gain.connect(context.destination);
            // Start sound
            oscillator.start(start);
            oscillator.stop(start + note.duration);
        }
    }, {
        key: "play_melody",
        value: function play_melody(start, melody) {
            var context = this._createAudioContext();

            for (var i in melody) {
                var note = melody[i];
                this._play_oscillator(context, start, note);
                start += note.duration;
            }
        }
    }]);

    return AlertSound;
}();

exports.default = AlertSound;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map