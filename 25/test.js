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
var Solve = /** @class */ (function (_super) {
    __extends(Solve, _super);
    function Solve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tape = new Map();
        _this.step = 0;
        _this.limit = 6;
        _this.state = '';
        _this.cursor = 0;
        _this.states = {
            'A': function (cursor) { _this.stateA(cursor); },
            'B': function (cursor) { _this.stateB(cursor); }
        };
        _this.start = function () {
            _this.nextState('A', 0);
            while (true) {
                if (_this.step++ === _this.limit) {
                    console.log('END');
                    return;
                }
                _this.states[_this.state](_this.cursor);
            }
        };
        _this.stateA = function (cursor) {
            if (!_this.get(cursor)) {
                _this.set(cursor, true);
                _this.nextState('B', cursor + 1);
            }
            else {
                _this.set(cursor, false);
                _this.nextState('B', cursor - 1);
            }
        };
        _this.stateB = function (cursor) {
            if (!_this.get(cursor)) {
                _this.set(cursor, true);
                _this.nextState('A', cursor - 1);
            }
            else {
                _this.set(cursor, true);
                _this.nextState('A', cursor + 1);
            }
        };
        _this.nextState = function (state, cursor) {
            _this.state = state;
            _this.cursor = cursor;
            console.log(_this.state, _this.cursor, state, cursor);
        };
        _this.get = function (cursor) {
            var value = _this.tape.get(cursor);
            if (value === undefined) {
                return false;
            }
            return value;
        };
        _this.set = function (cursor, value) {
            if (value) {
                _this.tape.set(cursor, true);
            }
            else {
                _this.tape["delete"](cursor);
            }
        };
        _this.sum = function () {
            console.log('sum: ', _this.tape.size);
        };
        return _this;
    }
    return Solve;
}(common_1.FileReader));
var solve = new Solve();
solve.start();
solve.sum();
