"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeManipulationBuldFile = void 0;
var AttributeManipulationBuldFile = /** @class */ (function () {
    function AttributeManipulationBuldFile() {
        this.manipulate = function (fileString, attributes) {
            var build = function (attribute) {
                var newLineInFile = fileString.includes(attribute.newLine);
                if (newLineInFile)
                    return;
                var _a = fileString.split(attribute.snippet), firstPart = _a[0], secondPart = _a[1];
                fileString = firstPart + " " + attribute.snippet + " \n " + attribute.newLine + " \n " + secondPart;
            };
            var loopAttributes = function () {
                attributes.forEach(function (attribute) {
                    build(attribute);
                });
            };
            loopAttributes();
            return fileString;
        };
    }
    return AttributeManipulationBuldFile;
}());
exports.AttributeManipulationBuldFile = AttributeManipulationBuldFile;
