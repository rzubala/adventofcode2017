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
var common_1 = require("../common");
var HashCalc = /** @class */ (function (_super) {
    __extends(HashCalc, _super);
    function HashCalc() {
        var _this = _super.call(this) || this;
        _this.size = 256;
        _this.index = 0;
        _this.skipSize = 0;
        _this.suffix = [17, 31, 73, 47, 23];
        _this.rounds = 64;
        _this.handleSubList = function (len) {
            var _a, _b;
            _this.index %= _this.size;
            var end = _this.index + len;
            var ringEnd = -1;
            var toInsert = len;
            if (end > _this.size) {
                ringEnd = end - _this.size;
                end = _this.size;
                toInsert = end - _this.index;
            }
            var list = _this.buffer.slice(_this.index, end);
            if (ringEnd > 0) {
                list.push.apply(list, _this.buffer.slice(0, ringEnd));
            }
            list.reverse();
            (_a = _this.buffer).splice.apply(_a, [_this.index, toInsert].concat(list.slice(0, toInsert)));
            if (ringEnd > 0) {
                (_b = _this.buffer).splice.apply(_b, [0, ringEnd].concat(list.slice(toInsert)));
            }
            _this.index += len + _this.skipSize;
            _this.skipSize += 1;
        };
        _this.toHash = function (data) {
            var result = [];
            for (var h = 0; h < data.length / 16; h++) {
                result.push(data.slice(h * 16, (h + 1) * 16).reduce(function (acc, curr) { return acc ^ curr; }));
            }
            return result;
        };
        _this.toHex = function (data) {
            return data.map(function (d) { return d.toString(16); }).reduce(function (acc, curr) { return (+acc <= 9 ? '0' : '') + acc + (+curr <= 9 ? '0' : '') + curr; });
        };
        _this.toASCII = function (value) {
            return value.split('').map(function (c) { return c.charCodeAt(0); });
        };
        _this.toKnotHash = function (input) {
            var lengths = _this.toASCII(input).concat(_this.suffix);
            _this.buffer = _this.data.slice();
            _this.index = 0;
            _this.skipSize = 0;
            for (var r = 0; r < _this.rounds; r++) {
                lengths.forEach(function (l) {
                    _this.handleSubList(l);
                });
            }
            return _this.toHex(_this.toHash(_this.buffer));
        };
        _this.data = Array.from(Array(_this.size), function (x, index) { return index; });
        return _this;
    }
    HashCalc.prototype.start = function () {
        var _this = this;
        this.readData('input.data')
            .then(function (fdata) {
            //part 1
            var lengths = fdata.split(',').map(function (e) { return +e; });
            _this.buffer = _this.data.slice();
            lengths.forEach(function (l) {
                _this.handleSubList(l);
            });
            console.log('check: ', _this.buffer[0] * _this.buffer[1]);
            //part 2
            console.log(_this.toKnotHash(fdata));
        })["catch"](function (e) { return console.log('error: ', e); });
    };
    return HashCalc;
}(common_1.FileReader));
exports.HashCalc = HashCalc;
