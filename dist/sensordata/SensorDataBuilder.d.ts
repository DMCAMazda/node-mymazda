export default class SensorDataBuilder {
    private sensorCollectionStartTimestamp;
    private deviceInfoTime;
    private systemInfo;
    private touchEventList;
    private keyEventList;
    private backgroundEventList;
    private performanceTestResults;
    private sensorDataEncryptor;
    constructor();
    generateSensorData(): string;
    private generateEditedText;
    private generateOrientationDataAA;
    private generateMotionDataAA;
    private generateOrientationDataAC;
    private generateOrientationDataAB;
    private generateMotionDataAC;
    private generateMotionEvent;
    private generateMiscStat;
    private generateStoredValuesF;
    private generateStoredValuesG;
    private generateStoredStackTraces;
}
