"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var ObjectBuilder = /** @class */ (function () {
    function ObjectBuilder(obj, attribute, index) {
        if (index === void 0) { index = -1; }
        this.obj = obj;
        this.attribute = attribute;
        this.index = index;
        this.keyPath = this.attribute.path[0];
    }
    ObjectBuilder.prototype.build = function () {
        this.walkThroughPath();
        if (this.attribute.key) {
            this.updateValue(this.attribute.key, this.attribute.value);
        }
    };
    ObjectBuilder.prototype.walkThroughPath = function () {
        var _this = this;
        this.attribute.path.forEach(function (keyPath) {
            _this.increaseIndex();
            if (_this.keyPathExists()) {
                _this.handleExistingKeyPath();
            }
            else {
                _this.handleNonExistingKeyPath();
            }
        });
    };
    ObjectBuilder.prototype.updateValue = function (key, value) {
        var updateValue = true;
        var oldValue = this.obj[key];
        if (this.attribute.validationFunc) {
            updateValue = this.attribute.validationFunc(oldValue, value);
        }
        if (updateValue) {
            this.obj[key] = this.attribute.value;
        }
    };
    ObjectBuilder.prototype.handleExistingKeyPath = function () {
        var nextKey = this.getNextKey();
        var lastKeyAndNumber = helper_1.isNumber(this.keyPath) && !nextKey;
        if (lastKeyAndNumber) {
            this.handleCaseNumberAndLastKeyPath();
        }
        else {
            this.followPath();
        }
    };
    ObjectBuilder.prototype.handleNonExistingKeyPath = function () {
        this.setNewKey();
    };
    ObjectBuilder.prototype.getNextKey = function () {
        return this.attribute.path[this.index + 1];
    };
    ObjectBuilder.prototype.getNextValue = function () {
        var nextKey = this.getNextKey();
        var isKey = nextKey !== undefined;
        return helper_1.isString(nextKey) || !isKey ? {} : [];
    };
    ObjectBuilder.prototype.keyPathExists = function () {
        return ((helper_1.isString(this.keyPath) && this.keyPath in this.obj) ||
            (helper_1.isNumber(this.keyPath) && this.obj[this.keyPath]));
    };
    ObjectBuilder.prototype.followPath = function () {
        this.obj = this.obj[this.keyPath];
    };
    ObjectBuilder.prototype.increaseIndex = function () {
        this.index++;
        this.keyPath = this.attribute.path[this.index];
    };
    ObjectBuilder.prototype.setNewKey = function () {
        var nextValue = this.getNextValue();
        this.obj[this.keyPath] = nextValue;
        this.obj = this.obj[this.keyPath];
    };
    ObjectBuilder.prototype.handleCaseNumberAndLastKeyPath = function () {
        var _this = this;
        var hasObj = false;
        this.obj.forEach(function (obj) {
            if (JSON.stringify(obj) === JSON.stringify(_this.attribute.value)) {
                hasObj = true;
            }
        });
        if (!hasObj) {
            this.obj.push(this.attribute.value);
        }
    };
    return ObjectBuilder;
}());
exports.ObjectBuilder = ObjectBuilder;
