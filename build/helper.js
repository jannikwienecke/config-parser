"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = function (val) {
    return typeof val === 'string';
};
exports.isNumber = function (val) {
    return typeof val === 'number';
};
exports.logInvalidVersionNumber = function (oldVersion, newVersion, path) {
    console.log("\u2757\uFE0F Version Invalid: " + newVersion + " is not higher than " + oldVersion);
    console.log('❗️ New Version must be higher than old version: Not updating Versions in ', path);
};
exports.logVersionChange = function (oldVersion, newVersion, path) {
    console.log("\u2705 [" + path + "]: Changing Version:'" + oldVersion + " >> " + newVersion + "'");
};
exports.logStartFileProcessing = function (path) {
    console.log('');
    console.log("\uD83D\uDC63 [" + path + "]:Starting File Processing");
};
exports.logWriteToFile = function (path) {
    console.log("\uD83D\uDCC1 [" + path + "]:Writing to File...");
    console.log('');
};
