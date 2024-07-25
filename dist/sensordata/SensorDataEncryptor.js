"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const SensorDataUtil_1 = require("./SensorDataUtil");
const RSA_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4sA7vA7N/t1SRBS8tugM2X4bByl0jaCZLqxPOql+qZ3sP4UFayqJTvXjd7eTjMwg1T70PnmPWyh1hfQr4s12oSVphTKAjPiWmEBvcpnPPMjr5fGgv0w6+KM9DLTxcktThPZAGoVcoyM/cTO/YsAMIxlmTzpXBaxddHRwi8S2NvwIDAQAB";
class SensorDataEncryptor {
    constructor() {
        this.aesKey = crypto_1.default.randomBytes(16);
        this.aesIV = crypto_1.default.randomBytes(16);
        this.hmacSHA256Key = crypto_1.default.randomBytes(32);
        this.encryptedAESKey = crypto_1.default.publicEncrypt({
            key: `-----BEGIN PUBLIC KEY-----\n${RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----\n`,
            padding: crypto_1.default.constants.RSA_PKCS1_PADDING
        }, this.aesKey);
        this.encryptedHMACSHA256Key = crypto_1.default.publicEncrypt({
            key: `-----BEGIN PUBLIC KEY-----\n${RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----\n`,
            padding: crypto_1.default.constants.RSA_PKCS1_PADDING
        }, this.hmacSHA256Key);
    }
    encryptSensorData(sensorData) {
        let cipher = crypto_1.default.createCipheriv("aes-128-cbc", this.aesKey, this.aesIV);
        let encryptedSensorData1 = cipher.update(sensorData);
        let encryptedSensorData2 = cipher.final();
        let encryptedSensorData = Buffer.concat([encryptedSensorData1, encryptedSensorData2]);
        let ivAndEncryptedSensorData = Buffer.concat([this.aesIV, encryptedSensorData]);
        let hmac = crypto_1.default.createHmac("sha256", this.hmacSHA256Key);
        let hmacResult = hmac.update(ivAndEncryptedSensorData).digest();
        let result = Buffer.concat([ivAndEncryptedSensorData, hmacResult]);
        let aesTimestamp = SensorDataUtil_1.randBetween(0, 3) * 1000;
        let hmacTimestamp = SensorDataUtil_1.randBetween(0, 3) * 1000;
        let base64Timestamp = SensorDataUtil_1.randBetween(0, 3) * 1000;
        return `1,a,${this.encryptedAESKey.toString("base64")},${this.encryptedHMACSHA256Key.toString("base64")}$${result.toString("base64")}$${aesTimestamp},${hmacTimestamp},${base64Timestamp}`;
    }
}
exports.default = SensorDataEncryptor;
//# sourceMappingURL=SensorDataEncryptor.js.map