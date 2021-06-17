"use strict";
// const replace = require("replace-in-file");
// const fs = require("fs");
// const inquirer = require("inquirer");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var replace_in_file_1 = require("replace-in-file");
var fs = __importStar(require("fs"));
var ANDROID_BUILD = 'build.gradle';
var PATH_BUILD = 'android/app/';
var FULL_PATH_ANDROID_BUILD = PATH_BUILD + ANDROID_BUILD;
var RELATIVE_PATH_PROJECT = 'scripts/config-parser';
var relPath = __dirname.split(RELATIVE_PATH_PROJECT)[0];
var PACKAGE_JSON = 'package.json';
var replaceVersionsInFile = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, replace_in_file_1.replaceInFile({
                        files: options.filePath,
                        from: options.fromString,
                        to: options.toString,
                    })];
            case 1:
                results = _a.sent();
                console.log('Replacement results:', results);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error occurred:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateVersions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileString, fileObj, correctVersionNumber, fileStringBuildFile, currentVersionName, currentVersionCode, nextVersionCode, fileToChange;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileString = fs.readFileSync(PACKAGE_JSON, 'utf8');
                fileObj = JSON.parse(fileString);
                correctVersionNumber = fileObj.version;
                fileStringBuildFile = fs.readFileSync(relPath + FULL_PATH_ANDROID_BUILD, 'utf8');
                currentVersionName = fileStringBuildFile
                    .split('versionName ')[1]
                    .slice(1, 6);
                if (correctVersionNumber === currentVersionName) {
                    console.log('VERSIONS ARE THE SAME');
                    return [2 /*return*/];
                }
                currentVersionCode = fileStringBuildFile.split('versionCode ')[1][0];
                nextVersionCode = parseInt(currentVersionCode) + 1;
                console.log("Changing Version Code: '" + currentVersionCode + " >> " + nextVersionCode + "'");
                console.log("Changing Version Name: '" + currentVersionName + " >> " + correctVersionNumber + "'");
                fileToChange = {
                    filePath: relPath + FULL_PATH_ANDROID_BUILD,
                    fromString: [
                        new RegExp(/versionCode [0-9]/, 'i'),
                        new RegExp(/versionName "[0-9].[0-9].[0-9]"/, 'i'),
                    ],
                    toString: [
                        "versionCode " + nextVersionCode,
                        "versionName \"" + correctVersionNumber + "\"",
                    ],
                };
                return [4 /*yield*/, replaceVersionsInFile(fileToChange)];
            case 1:
                _a.sent();
                console.log('FILE CHANGED>>>');
                return [2 /*return*/];
        }
    });
}); };
exports.updateVersions = updateVersions;
