"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var interpreter_1 = require("./interpreter");
var Sound = /** @class */ (function (_super) {
    __extends(Sound, _super);
    function Sound() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recovered = false;
        _this.lastPlayed = 0;
        _this.isEnd = function () {
            return _this.recovered;
        };
        _this.play = function (register) {
            var value = _this.get(register);
            _this.lastPlayed = value;
            console.log('play', _this.lastPlayed);
        };
        _this.recover = function (register) {
            if (_this.lastPlayed > 0) {
                console.log('recover', _this.lastPlayed);
                _this.recovered = true;
            }
        };
        return _this;
    }
    return Sound;
}(interpreter_1.Interpreter));
exports.Sound = Sound;
