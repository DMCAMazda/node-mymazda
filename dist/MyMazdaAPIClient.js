"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyMazdaAPIController_1 = __importDefault(require("./MyMazdaAPIController"));
class MyMazdaAPIClient {
    constructor(email, password, region) {
        this.controller = new MyMazdaAPIController_1.default(email, password, region);
    }
    async getVehicles() {
        let vecBaseInfosResponse = await this.controller.getVecBaseInfos();
        let vehicles = [];
        for (let i = 0; i < vecBaseInfosResponse.vecBaseInfos.length; i++) {
            let currentVecBaseInfo = vecBaseInfosResponse.vecBaseInfos[i];
            let currentVehicleFlags = vecBaseInfosResponse.vehicleFlags[i];
            // Ignore vehicles which are not enrolled in Mazda Connected Services
            if (currentVehicleFlags.vinRegistStatus !== 3)
                continue;
            let otherVehInfo = JSON.parse(currentVecBaseInfo.Vehicle.vehicleInformation);
            let nickname = await this.controller.getNickName(currentVecBaseInfo.vin);
            let vehicle = {
                vin: currentVecBaseInfo.vin,
                id: currentVecBaseInfo.Vehicle.CvInformation.internalVin,
                nickname: nickname,
                carlineCode: otherVehInfo.OtherInformation.carlineCode,
                carlineName: otherVehInfo.OtherInformation.carlineName,
                modelYear: otherVehInfo.OtherInformation.modelYear,
                modelCode: otherVehInfo.OtherInformation.modelCode,
                modelName: otherVehInfo.OtherInformation.modelName,
                automaticTransmission: otherVehInfo.OtherInformation.transmissionType === "A",
                interiorColorCode: otherVehInfo.OtherInformation.interiorColorCode,
                interiorColorName: otherVehInfo.OtherInformation.interiorColorName,
                exteriorColorCode: otherVehInfo.OtherInformation.exteriorColorCode,
                exteriorColorName: otherVehInfo.OtherInformation.exteriorColorName,
                isElectric: currentVecBaseInfo.econnectType === 1
            };
            vehicles.push(vehicle);
        }
        return vehicles;
    }
    async getVehicleStatus(vehicleId) {
        let vehicleStatusResponse = await this.controller.getVehicleStatus(vehicleId);
        let alertInfo = vehicleStatusResponse.alertInfos[0];
        let remoteInfo = vehicleStatusResponse.remoteInfos[0];
        let vehicleStatus = {
            lastUpdatedTimestamp: alertInfo.OccurrenceDate,
            latitude: remoteInfo.PositionInfo.Latitude * (remoteInfo.PositionInfo.LatitudeFlag === 1 ? -1 : 1),
            longitude: remoteInfo.PositionInfo.Longitude * (remoteInfo.PositionInfo.LongitudeFlag === 0 ? -1 : 1),
            positionTimestamp: remoteInfo.PositionInfo.AcquisitionDatetime,
            fuelRemainingPercent: remoteInfo.ResidualFuel.FuelSegementDActl,
            fuelDistanceRemainingKm: remoteInfo.ResidualFuel.RemDrvDistDActlKm,
            odometerKm: remoteInfo.DriveInformation.OdoDispValue,
            doors: {
                driverDoorOpen: alertInfo.Door.DrStatDrv === 1,
                passengerDoorOpen: alertInfo.Door.DrStatPsngr === 1,
                rearLeftDoorOpen: alertInfo.Door.DrStatRl === 1,
                rearRightDoorOpen: alertInfo.Door.DrStatRr === 1,
                trunkOpen: alertInfo.Door.DrStatTrnkLg === 1,
                hoodOpen: alertInfo.Door.DrStatHood === 1,
                fuelLidOpen: alertInfo.Door.FuelLidOpenStatus === 1
            },
            doorLocks: {
                driverDoorUnlocked: alertInfo.Door.LockLinkSwDrv === 1,
                passengerDoorUnlocked: alertInfo.Door.LockLinkSwPsngr === 1,
                rearLeftDoorUnlocked: alertInfo.Door.LockLinkSwRl === 1,
                rearRightDoorUnlocked: alertInfo.Door.LockLinkSwRr === 1,
            },
            windows: {
                driverWindowOpen: alertInfo.Pw.PwPosDrv === 1,
                passengerWindowOpen: alertInfo.Pw.PwPosPsngr === 1,
                rearLeftWindowOpen: alertInfo.Pw.PwPosRl === 1,
                rearRightWindowOpen: alertInfo.Pw.PwPosRr === 1
            },
            hazardLightsOn: alertInfo.HazardLamp.HazardSw === 1,
            tirePressure: {
                frontLeftTirePressurePsi: remoteInfo.TPMSInformation.FLTPrsDispPsi,
                frontRightTirePressurePsi: remoteInfo.TPMSInformation.FRTPrsDispPsi,
                rearLeftTirePressurePsi: remoteInfo.TPMSInformation.RLTPrsDispPsi,
                rearRightTirePressurePsi: remoteInfo.TPMSInformation.RRTPrsDispPsi
            }
        };
        return vehicleStatus;
    }
    async getEVVehicleStatus(vehicleId) {
        let evVehicleStatusResponse = await this.controller.getEVVehicleStatus(vehicleId);
        let resultData = evVehicleStatusResponse.resultData[0];
        let vehicleInfo = resultData.PlusBInformation.VehicleInfo;
        let chargeInfo = vehicleInfo.ChargeInfo;
        let hvacInfo = vehicleInfo.RemoteHvacInfo;
        let evVehicleStatus = {
            chargeInfo: {
                lastUpdatedTimestamp: resultData.OccurrenceDate,
                batteryLevelPercentage: chargeInfo.SmaphSOC,
                drivingRangeKm: chargeInfo.SmaphRemDrvDistKm,
                pluggedIn: chargeInfo.ChargerConnectorFitting === 1,
                charging: chargeInfo.ChargeStatusSub === 6,
                basicChargeTimeMinutes: chargeInfo.MaxChargeMinuteAC,
                quickChargeTimeMinutes: chargeInfo.MaxChargeMinuteQBC,
                batteryHeaterAuto: chargeInfo.CstmzStatBatHeatAutoSW === 1,
                batteryHeaterOn: chargeInfo.BatteryHeaterON === 1
            },
            hvacInfo: {
                hvacOn: hvacInfo.HVAC === 1,
                frontDefroster: hvacInfo.FrontDefroster === 1,
                rearDefroster: hvacInfo.RearDefogger === 1,
                interiorTemperatureCelsius: hvacInfo.InCarTeDC
            }
        };
        return evVehicleStatus;
    }
    async turnHazardLightsOn(vehicleId) {
        await this.controller.lightOn(vehicleId);
    }
    async turnHazardLightsOff(vehicleId) {
        await this.controller.lightOff(vehicleId);
    }
    async unlockDoors(vehicleId) {
        await this.controller.doorUnlock(vehicleId);
    }
    async lockDoors(vehicleId) {
        await this.controller.doorLock(vehicleId);
    }
    async startEngine(vehicleId) {
        await this.controller.engineStart(vehicleId);
    }
    async stopEngine(vehicleId) {
        await this.controller.engineStop(vehicleId);
    }
    async sendPOI(vehicleId, latitude, longitude, name) {
        await this.controller.sendPOI(vehicleId, latitude, longitude, name);
    }
    async startCharging(vehicleId) {
        await this.controller.chargeStart(vehicleId);
    }
    async stopCharging(vehicleId) {
        await this.controller.chargeStop(vehicleId);
    }
    async getHVACSetting(vehicleId) {
        let response = await this.controller.getHVACSetting(vehicleId);
        let hvacSettings = response.hvacSettings;
        return {
            temperature: hvacSettings.Temperature,
            temperatureUnit: hvacSettings.TemperatureType === 1 ? "C" : "F",
            frontDefroster: hvacSettings.FrontDefroster === 1,
            rearDefroster: hvacSettings.RearDefogger === 1
        };
    }
    async setHVACSetting(vehicleId, temperature, temperatureUnit, frontDefroster, rearDefroster) {
        await this.controller.setHVACSetting(vehicleId, temperature, temperatureUnit, frontDefroster, rearDefroster);
    }
    async turnOnHVAC(vehicleId) {
        await this.controller.hvacOn(vehicleId);
    }
    async turnOffHVAC(vehicleId) {
        await this.controller.hvacOff(vehicleId);
    }
    async refreshVehicleStatus(vehicleId) {
        await this.controller.refreshVehicleStatus(vehicleId);
    }
}
exports.default = MyMazdaAPIClient;
//# sourceMappingURL=MyMazdaAPIClient.js.map