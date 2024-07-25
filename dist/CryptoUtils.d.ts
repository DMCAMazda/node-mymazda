/// <reference types="node" />
export default class CryptoUtils {
    static md5(data: string): string;
    static sha256(data: string): string;
    static decryptAES128CBCBufferToString(data: Buffer, key: string, iv: string): string;
    static encryptAES128CBCBufferToBase64String(data: Buffer, key: string, iv: string): string;
    static encryptRSAECBPKCS1Padding(data: Buffer, publicKey: string): Buffer;
    static generateUuidFromSeed(seed: string): string;
    static generateUsherDeviceIDFromSeed(seed: string): string;
}
