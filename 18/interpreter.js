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
var Interpreter = /** @class */ (function (_super) {
    __extends(Interpreter, _super);
    function Interpreter() {
        var _this = _super.call(this) || this;
        _this.registers = new Map();
        _this.pos = 0;
        _this.operations = {
            'snd': function (c) { _this.play(c.data1); },
            'set': function (c) { _this.set(c.data1, c.data2); },
            'add': function (c) { _this.add(c.data1, c.data2); },
            'mul': function (c) { _this.multiply(c.data1, c.data2); },
            'mod': function (c) { _this.modulo(c.data1, c.data2); },
            'rcv': function (c) { _this.recover(c.data1); },
            'jgz': function (c) { _this.jump(c.data1, c.data2); }
        };
        _this.process = function () {
            do {
                var c = _this.commands[_this.pos];
                _this.processCommand(c);
                if (_this.isEnd()) {
                    break;
                }
                _this.pos++;
            } while (_this.pos < _this.commands.length);
        };
        _this.isEnd = function () {
            return true;
        };
        _this.play = function (register) {
        };
        _this.recover = function (register) {
        };
        _this.jump = function (register, value) {
            var valX = _this.get(register);
            if (valX > 0) {
                var valY = +value;
                if (isNaN(valY)) {
                    valY = _this.get(value);
                }
                _this.pos += valY - 1;
            }
        };
        _this.get = function (register) {
            var val = _this.registers[register];
            if (val !== undefined) {
                return +val;
            }
            _this.registers[register] = 0;
            return 0;
        };
        _this.set = function (register, value) {
            if (isNaN(+value)) {
                _this.registers[register] = _this.get(value);
            }
            else {
                _this.registers[register] = value;
            }
        };
        _this.add = function (register, value) {
            var val = _this.get(register);
            var tmp = +value;
            if (isNaN(tmp)) {
                tmp = _this.get(value);
            }
            _this.set(register, val + tmp);
        };
        _this.multiply = function (register, value) {
            var val = _this.get(register);
            var tmp = +value;
            if (isNaN(tmp)) {
                tmp = _this.get(value);
            }
            _this.set(register, val * tmp);
        };
        _this.modulo = function (register, value) {
            var val = _this.get(register);
            var tmp = +value;
            if (isNaN(tmp)) {
                tmp = _this.get(value);
            }
            _this.set(register, val % tmp);
        };
        _this.processCommand = function (c) {
            _this.operations[c.cmd](c);
        };
        _this.parse = function (fdata) {
            _this.commands = fdata.split('\n').map(function (l) {
                var data = l.split(' ');
                if (data.length === 3) {
                    return { cmd: data[0], data1: data[1], data2: data[2] };
                }
                else {
                    return { cmd: data[0], data1: data[1] };
                }
            });
        };
        _this.readData('input.data')
            .then(function (fdata) {
            _this.parse(fdata);
            _this.process();
        })["catch"](function (e) { return console.log('error: ', e); });
        return _this;
    }
    return Interpreter;
}(common_1.FileReader));
exports.Interpreter = Interpreter;
