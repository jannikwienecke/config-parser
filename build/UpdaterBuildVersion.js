"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdaterBuildVersion = void 0;
var constants_1 = require("./constants");
var helper_1 = require("./helper");
var PREFIX_VERSION_CODE_BUILD = 'versionCode ';
var PREFIX_VERSION_NAME_BUILD = 'versionName ';
var UpdaterBuildVersion = /** @class */ (function () {
    function UpdaterBuildVersion() {
        this.manipulate = function (fileString, correctVersionArr) {
            var getVersionCode = function (fileString) {
                return fileString.split(PREFIX_VERSION_CODE_BUILD)[1][0];
            };
            var getVersionName = function (fileString) {
                return fileString.split(PREFIX_VERSION_NAME_BUILD)[1].slice(1, 6);
            };
            var validatVersion = function (correctVersionName, currentVersionName) {
                if (correctVersioName <= currentVersionName) {
                    helper_1.logInvalidVersionNumber(currentVersionName, correctVersioName, constants_1.ANDROID_BUILD);
                    return false;
                }
                return true;
            };
            var replaceVersions = function () {
                var replace = function (_a) {
                    var oldVersion = _a.oldVersion, newVersion = _a.newVersion, prefix = _a.prefix;
                    return fileString.replace(prefix + oldVersion, prefix + newVersion);
                };
                fileString = replace({
                    oldVersion: currentVersionCode,
                    newVersion: newVersionCode,
                    prefix: PREFIX_VERSION_CODE_BUILD,
                });
                fileString = replace({
                    oldVersion: "\"" + currentVersionName + "\"",
                    newVersion: "\"" + correctVersioName + "\"",
                    prefix: PREFIX_VERSION_NAME_BUILD,
                });
            };
            var correctVersioName = correctVersionArr[0];
            var currentVersionName = getVersionName(fileString);
            var currentVersionCode = getVersionCode(fileString);
            var newVersionCode = parseInt(currentVersionCode) + 1;
            if (!validatVersion(correctVersioName, currentVersionName)) {
                return fileString;
            }
            helper_1.logVersionChange(currentVersionCode, newVersionCode, constants_1.ANDROID_BUILD);
            helper_1.logVersionChange(currentVersionName, correctVersioName, constants_1.ANDROID_BUILD);
            replaceVersions();
            return fileString;
        };
    }
    return UpdaterBuildVersion;
}());
exports.UpdaterBuildVersion = UpdaterBuildVersion;
