"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectBuilder_1 = require("./ObjectBuilder");
var AttributeManipulation = /** @class */ (function () {
    function AttributeManipulation() {
        this.manipulate = function (objToManipulate, attributes) {
            var build = function (attribute) {
                var objBuilder = new ObjectBuilder_1.ObjectBuilder(objToManipulate, attribute);
                objBuilder.build();
            };
            var loopAttributes = function () {
                attributes.forEach(function (attribute) {
                    build(attribute);
                });
            };
            loopAttributes();
            return objToManipulate;
        };
    }
    return AttributeManipulation;
}());
exports.AttributeManipulation = AttributeManipulation;
