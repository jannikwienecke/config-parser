"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWriteToFile = exports.logStartFileProcessing = exports.logVersionChange = exports.logInvalidVersionNumber = exports.isNumber = exports.isString = void 0;
var isString = function (val) {
    return typeof val === 'string';
};
exports.isString = isString;
var isNumber = function (val) {
    return typeof val === 'number';
};
exports.isNumber = isNumber;
var logInvalidVersionNumber = function (oldVersion, newVersion, path) {
    console.log("\u2757\uFE0F Version Invalid: " + newVersion + " is not higher than " + oldVersion);
    console.log('❗️ New Version must be higher than old version: Not updating Versions in ', path);
};
exports.logInvalidVersionNumber = logInvalidVersionNumber;
var logVersionChange = function (oldVersion, newVersion, path) {
    console.log("\u2705 [" + path + "]: Changing Version:'" + oldVersion + " >> " + newVersion + "'");
};
exports.logVersionChange = logVersionChange;
var logStartFileProcessing = function (path) {
    console.log('');
    console.log("\uD83D\uDC63 [" + path + "]:Starting File Processing");
};
exports.logStartFileProcessing = logStartFileProcessing;
var logWriteToFile = function (path) {
    console.log("\uD83D\uDCC1 [" + path + "]:Writing to File...");
    console.log('');
};
exports.logWriteToFile = logWriteToFile;
