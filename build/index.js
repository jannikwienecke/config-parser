"use strict";
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var plist = __importStar(require("plist"));
var xml2js = __importStar(require("xml2js"));
var inquirer = __importStar(require("inquirer"));
var AttributeManipulation_1 = require("./AttributeManipulation");
var AttributeManipulationBuildFile_1 = require("./AttributeManipulationBuildFile");
var android_build_1 = __importDefault(require("./config/android-build"));
var android_manifest_1 = __importDefault(require("./config/android-manifest"));
var android_strings_1 = __importDefault(require("./config/android-strings"));
var ios_plist_1 = __importDefault(require("./config/ios-plist"));
var ConfigParser_1 = require("./ConfigParser");
var constants_1 = require("./constants");
var helper_1 = require("./helper");
var UpdaterBuildVersion_1 = require("./UpdaterBuildVersion");
var getValidationPrompt = function (_a) {
    var message = _a.message;
    return __awaiter(void 0, void 0, void 0, function () {
        var isValid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            name: 'isValid',
                            message: message,
                        },
                    ])];
                case 1:
                    isValid = (_b.sent()).isValid;
                    switch (isValid) {
                        case 'yes':
                            return [2 /*return*/, true];
                        case '':
                            return [2 /*return*/, true];
                        default:
                            return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var getPackageJsonVersion = function (path) {
    var fileString = fs.readFileSync(path, 'utf8');
    try {
        return JSON.parse(fileString).version;
    }
    catch (error) {
        throw new Error("Version not found in Package.json " + constants_1.PACKAGE_JSON);
    }
};
function parseFilesWithValidParser(packageJsonVersion) {
    return __asyncGenerator(this, arguments, function parseFilesWithValidParser_1() {
        function parse(toParse) {
            return __awaiter(this, void 0, void 0, function () {
                var path;
                return __generator(this, function (_a) {
                    path = relPath + toParse.path;
                    helper_1.logStartFileProcessing(path);
                    runConfigParser(new ConfigParser_1.ConfigParser(path, toParse.parseFunc, toParse.buildFunc, new AttributeManipulation_1.AttributeManipulation()), toParse.attributes);
                    return [2 /*return*/];
                });
            });
        }
        var buildXml, parseXml, addVersionAttributesToPlist, getFilesToParse, filesToParse, index;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildXml = function (obj) {
                        var builder = new xml2js.Builder();
                        return builder.buildObject(obj);
                    };
                    parseXml = function (string) { return __awaiter(_this, void 0, void 0, function () {
                        var xmlParser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    xmlParser = new xml2js.Parser();
                                    return [4 /*yield*/, xmlParser.parseStringPromise(string)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    addVersionAttributesToPlist = function () {
                        var versionKeys = ['CFBundleShortVersionString', 'CFBundleVersion'];
                        versionKeys.forEach(function (key) {
                            var iosVersionAttribute = {
                                path: [],
                                key: key,
                                value: packageJsonVersion,
                                validationFunc: function (oldValue, newValue) {
                                    if (newValue <= oldValue) {
                                        helper_1.logInvalidVersionNumber(oldValue, newValue, constants_1.IOS_INFO_FILE);
                                        return false;
                                    }
                                    else {
                                        helper_1.logVersionChange(oldValue, newValue, constants_1.IOS_INFO_FILE);
                                        return true;
                                    }
                                },
                            };
                            ios_plist_1.default.push(iosVersionAttribute);
                        });
                    };
                    getFilesToParse = function () {
                        return [
                            {
                                path: constants_1.FULL_PATH_IOS_INFO,
                                parseFunc: plist.parse,
                                buildFunc: plist.build,
                                attributes: ios_plist_1.default,
                            },
                            {
                                path: constants_1.FULL_PATH_ANDROID_MANIFEST,
                                parseFunc: parseXml,
                                buildFunc: buildXml,
                                attributes: android_manifest_1.default,
                            },
                            {
                                path: constants_1.FULL_PATH_ANDROID_STRINGS,
                                parseFunc: parseXml,
                                buildFunc: buildXml,
                                attributes: android_strings_1.default,
                            },
                        ];
                    };
                    addVersionAttributesToPlist();
                    filesToParse = getFilesToParse();
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < filesToParse.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(parse(filesToParse[index]))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, __await(void 0)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    index++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// NO PARSER CAN READ AND WRITE .gradle files
// correctly into json
var parseGradleFileManually = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = relPath + constants_1.FULL_PATH_ANDROID_BUILD;
                helper_1.logStartFileProcessing(path);
                return [4 /*yield*/, runConfigParser(new ConfigParser_1.ConfigParser(path, undefined, undefined, new AttributeManipulationBuildFile_1.AttributeManipulationBuldFile()), android_build_1.default)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateVersionsBuildFile = function (packageJsonVersion) { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = relPath + constants_1.FULL_PATH_ANDROID_BUILD;
                helper_1.logStartFileProcessing(path);
                return [4 /*yield*/, runConfigParser(new ConfigParser_1.ConfigParser(path, undefined, undefined, new UpdaterBuildVersion_1.UpdaterBuildVersion()), [packageJsonVersion])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
function runPostSyncHook() {
    return __awaiter(this, void 0, void 0, function () {
        var packageJsonVersion, iterator, iteratorResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packageJsonVersion = getPackageJsonVersion(relPath + constants_1.PACKAGE_JSON);
                    iterator = parseFilesWithValidParser(packageJsonVersion);
                    _a.label = 1;
                case 1:
                    if (!(!(iteratorResult === null || iteratorResult === void 0 ? void 0 : iteratorResult.done) || iteratorResult === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, iterator.next()];
                case 2:
                    iteratorResult = _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [4 /*yield*/, parseGradleFileManually()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, updateVersionsBuildFile(packageJsonVersion)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var relPath = __dirname.split(constants_1.RELATIVE_PATH_PROJECT)[0];
var validate = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getValidationPrompt({
                    message: '✔️ RUN POST SYNC HOOK (yes/no) [yes]',
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var runConfigParser = function (configParser, attributes) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, configParser.start(attributes)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('[Config Parser]: ', error_1);
                errorFiles.push(configParser.plattformPath);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var errorFiles = [];
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var shouldRunValidation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validate()];
            case 1:
                shouldRunValidation = _a.sent();
                if (!shouldRunValidation) return [3 /*break*/, 3];
                return [4 /*yield*/, runPostSyncHook()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (errorFiles.length > 0) {
                    console.log("\n 🚨 WARNING: SOME ERRORS OCCURED. The following files couln't be parsed! Please check the logs above for more information. \n", errorFiles.join('\n '));
                }
                return [2 /*return*/];
        }
    });
}); };
run();
