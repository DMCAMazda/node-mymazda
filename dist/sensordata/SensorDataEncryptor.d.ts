export default class SensorDataEncryptor {
    private aesKey;
    private aesIV;
    private hmacSHA256Key;
    private encryptedAESKey;
    private encryptedHMACSHA256Key;
    constructor();
    encryptSensorData(sensorData: string): string;
}
