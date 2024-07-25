"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SensorDataUtil_1 = require("./SensorDataUtil");
const AndroidBuilds_1 = __importDefault(require("./AndroidBuilds"));
const crypto_1 = __importDefault(require("crypto"));
const SCREEN_SIZES = [[1280, 720], [1920, 1080], [2560, 1440]];
const ANDROID_VERSION_TO_SDK_VERSION = {
    "11": 30,
    "10": 29,
    "9": 28,
    "8.1.0": 27,
    "8.0.0": 26,
    "7.1": 25,
    "7.0": 24
};
// example:
// -1,uaend,-1,2167,1080,1,59,1,en,11,1,Pixel%205,r3-0.3-7051238,redfin,-1,com.interrait.mymazda,-1,-1,42c221bac94bbac6,-1,0,1,REL,7255357,30,Google,redfin,release-keys,user,android-build,RQ2A.210505.003,redfin,google,redfin,google/redfin/redfin:11/RQ2A.210505.003/7255357:user/release-keys,abfarm-01371,RQ2A.210505.003
class SystemInfo {
    randomize() {
        let deviceModel = SensorDataUtil_1.selectRandomFromArray(Object.keys(AndroidBuilds_1.default));
        let device = AndroidBuilds_1.default[deviceModel];
        let codename = device.codename;
        let build = SensorDataUtil_1.selectRandomFromArray(device.builds);
        let buildVersionIncremental = String(SensorDataUtil_1.randBetween(1000000, 9999999));
        [this.screenHeight, this.screenWidth] = SensorDataUtil_1.selectRandomFromArray(SCREEN_SIZES);
        this.batteryCharging = (Math.random() < 0.2);
        this.batteryLevel = SensorDataUtil_1.randBetween(10, 90);
        this.orientation = 1;
        this.language = "en";
        this.androidVersion = build.version;
        this.rotationLock = Math.random() > 0.2 ? "1" : "0";
        this.buildModel = deviceModel;
        this.buildBootloader = String(SensorDataUtil_1.randBetween(1000000, 9999999));
        this.buildHardware = codename;
        this.packageName = "com.interrait.mymazda";
        this.androidId = crypto_1.default.randomBytes(8).toString("hex");
        this.keyboard = 0;
        this.adbEnabled = false;
        this.buildVersionCodename = "REL";
        this.buildVersionIncremental = buildVersionIncremental;
        this.buildVersionSDK = ANDROID_VERSION_TO_SDK_VERSION[build.version];
        this.buildManufacturer = "Google";
        this.buildProduct = codename;
        this.buildTags = "release-keys";
        this.buildType = "user";
        this.buildUser = "android-build";
        this.buildDisplay = build.buildId;
        this.buildBoard = codename;
        this.buildBrand = "google";
        this.buildDevice = codename;
        this.buildFingerprint = `google/${codename}/${codename}:${build.version}/${build.buildId}/${buildVersionIncremental}:user/release-keys`;
        this.buildHost = `abfarm-${SensorDataUtil_1.randBetween(10000, 99999)}`;
        this.buildID = build.buildId;
    }
    toString() {
        return [
            -1,
            "uaend",
            -1,
            this.screenHeight,
            this.screenWidth,
            this.batteryCharging ? 1 : 0,
            this.batteryLevel,
            this.orientation,
            SensorDataUtil_1.percentEncode(this.language),
            SensorDataUtil_1.percentEncode(this.androidVersion),
            this.rotationLock,
            SensorDataUtil_1.percentEncode(this.buildModel),
            SensorDataUtil_1.percentEncode(this.buildBootloader),
            SensorDataUtil_1.percentEncode(this.buildHardware),
            -1,
            this.packageName,
            -1,
            -1,
            this.androidId,
            -1,
            this.keyboard,
            this.adbEnabled ? 1 : 0,
            SensorDataUtil_1.percentEncode(this.buildVersionCodename),
            SensorDataUtil_1.percentEncode(this.buildVersionIncremental),
            this.buildVersionSDK,
            SensorDataUtil_1.percentEncode(this.buildManufacturer),
            SensorDataUtil_1.percentEncode(this.buildProduct),
            SensorDataUtil_1.percentEncode(this.buildTags),
            SensorDataUtil_1.percentEncode(this.buildType),
            SensorDataUtil_1.percentEncode(this.buildUser),
            SensorDataUtil_1.percentEncode(this.buildDisplay),
            SensorDataUtil_1.percentEncode(this.buildBoard),
            SensorDataUtil_1.percentEncode(this.buildBrand),
            SensorDataUtil_1.percentEncode(this.buildDevice),
            SensorDataUtil_1.percentEncode(this.buildFingerprint),
            SensorDataUtil_1.percentEncode(this.buildHost),
            SensorDataUtil_1.percentEncode(this.buildID)
        ].join(",");
    }
    getCharCodeSum() {
        return SensorDataUtil_1.sumCharCodes(this.toString());
    }
}
exports.default = SystemInfo;
//# sourceMappingURL=SystemInfo.js.map