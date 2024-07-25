"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class CryptoUtils {
    static md5(data) {
        return crypto_1.default.createHash("md5").update(data).digest("hex");
    }
    static sha256(data) {
        return crypto_1.default.createHash("sha256").update(data).digest("hex");
    }
    static decryptAES128CBCBufferToString(data, key, iv) {
        let decipher = crypto_1.default.createDecipheriv("aes-128-cbc", key, iv);
        let decrypted = decipher.update(data, undefined, "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    static encryptAES128CBCBufferToBase64String(data, key, iv) {
        let cipher = crypto_1.default.createCipheriv("aes-128-cbc", key, iv);
        let encrypted = cipher.update(data);
        let encrypted2 = cipher.final();
        let encryptedFinal = Buffer.concat([encrypted, encrypted2]);
        return encryptedFinal.toString("base64");
    }
    static encryptRSAECBPKCS1Padding(data, publicKey) {
        return crypto_1.default.publicEncrypt({
            key: `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----\n`,
            padding: crypto_1.default.constants.RSA_PKCS1_PADDING
        }, data);
    }
    static generateUuidFromSeed(seed) {
        let hash = this.sha256(seed).toUpperCase();
        return `${hash.substring(0, 8)}-${hash.substring(8, 12)}-${hash.substring(12, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}`;
    }
    static generateUsherDeviceIDFromSeed(seed) {
        let hash = this.sha256(seed).toUpperCase();
        let id = parseInt(hash.substring(0, 8), 16);
        return `ACCT${id}`;
    }
}
exports.default = CryptoUtils;
//# sourceMappingURL=CryptoUtils.js.map