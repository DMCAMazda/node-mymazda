import type { RegionCode } from "./MyMazdaAPIConnection";
interface Vehicle {
    vin: string;
    id: number;
    nickname: string;
    carlineCode: string;
    carlineName: string;
    modelYear: string;
    modelCode: string;
    modelName: string;
    automaticTransmission: boolean;
    interiorColorCode: string;
    interiorColorName: string;
    exteriorColorCode: string;
    exteriorColorName: string;
    isElectric: boolean;
}
interface VehicleStatus {
    lastUpdatedTimestamp: string;
    latitude: number;
    longitude: number;
    positionTimestamp: string;
    fuelRemainingPercent: number;
    fuelDistanceRemainingKm: number;
    odometerKm: number;
    doors: {
        driverDoorOpen: boolean;
        passengerDoorOpen: boolean;
        rearLeftDoorOpen: boolean;
        rearRightDoorOpen: boolean;
        trunkOpen: boolean;
        hoodOpen: boolean;
        fuelLidOpen: boolean;
    };
    doorLocks: {
        driverDoorUnlocked: boolean;
        passengerDoorUnlocked: boolean;
        rearLeftDoorUnlocked: boolean;
        rearRightDoorUnlocked: boolean;
    };
    windows: {
        driverWindowOpen: boolean;
        passengerWindowOpen: boolean;
        rearLeftWindowOpen: boolean;
        rearRightWindowOpen: boolean;
    };
    hazardLightsOn: boolean;
    tirePressure: {
        frontLeftTirePressurePsi: number;
        frontRightTirePressurePsi: number;
        rearLeftTirePressurePsi: number;
        rearRightTirePressurePsi: number;
    };
}
interface EVVehicleStatus {
    chargeInfo: {
        lastUpdatedTimestamp: string;
        batteryLevelPercentage: number;
        drivingRangeKm: number;
        pluggedIn: boolean;
        charging: boolean;
        basicChargeTimeMinutes: number;
        quickChargeTimeMinutes: number;
        batteryHeaterAuto: boolean;
        batteryHeaterOn: boolean;
    };
    hvacInfo: {
        hvacOn: boolean;
        frontDefroster: boolean;
        rearDefroster: boolean;
        interiorTemperatureCelsius: number;
    };
}
export default class MyMazdaAPIClient {
    private controller;
    constructor(email: string, password: string, region: RegionCode);
    getVehicles(): Promise<Vehicle[]>;
    getVehicleStatus(vehicleId: number): Promise<VehicleStatus>;
    getEVVehicleStatus(vehicleId: number): Promise<EVVehicleStatus>;
    turnHazardLightsOn(vehicleId: number): Promise<void>;
    turnHazardLightsOff(vehicleId: number): Promise<void>;
    unlockDoors(vehicleId: number): Promise<void>;
    lockDoors(vehicleId: number): Promise<void>;
    startEngine(vehicleId: number): Promise<void>;
    stopEngine(vehicleId: number): Promise<void>;
    sendPOI(vehicleId: number, latitude: number, longitude: number, name: string): Promise<void>;
    startCharging(vehicleId: number): Promise<void>;
    stopCharging(vehicleId: number): Promise<void>;
    getHVACSetting(vehicleId: number): Promise<{
        temperature: number;
        temperatureUnit: string;
        frontDefroster: boolean;
        rearDefroster: boolean;
    }>;
    setHVACSetting(vehicleId: number, temperature: number, temperatureUnit: "C" | "F", frontDefroster: boolean, rearDefroster: boolean): Promise<void>;
    turnOnHVAC(vehicleId: number): Promise<void>;
    turnOffHVAC(vehicleId: number): Promise<void>;
    refreshVehicleStatus(vehicleId: number): Promise<void>;
}
export {};
