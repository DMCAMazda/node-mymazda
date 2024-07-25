"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyMazdaAPIConnection_1 = __importDefault(require("./MyMazdaAPIConnection"));
const CryptoUtils_1 = __importDefault(require("./CryptoUtils"));
class MyMazdaAPIController {
    constructor(email, password, region) {
        this.connection = new MyMazdaAPIConnection_1.default(email, password, region);
    }
    async getTac() {
        return await this.connection.apiRequest(true, false, {
            url: "content/getTac/v4"
        });
    }
    async getLanguagePkg() {
        return await this.connection.apiRequest(true, false, {
            url: "junction/getLanguagePkg/v4",
            method: "POST",
            json: {
                "platformType": "ANDROID",
                "region": "MNAO",
                "version": "2.0.4"
            }
        });
    }
    async getVecBaseInfos() {
        return await this.connection.apiRequest(true, true, {
            url: "remoteServices/getVecBaseInfos/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__"
            }
        });
    }
    async getVehicleCodeWithTrims() {
        return await this.connection.apiRequest(true, true, {
            url: "vehicle/getVehicleCodeWithTrims/v4"
        });
    }
    async gasStationSearch(lat, lon) {
        return await this.connection.apiRequest(true, true, {
            url: "poi/gasStationSearch/v4",
            searchParams: {
                "proximity": `${lon},${lat}`,
                "query": "",
                "location": `${lat},${lon}`,
                "language": "en"
            }
        });
    }
    // This request only works for Europe region
    async getCountryNscMapping() {
        return await this.connection.apiRequest(true, false, {
            url: "miox/getCountryNscMapping/v4"
        });
    }
    async getBaseContent(trim, year, vin, model, mdlCode) {
        return await this.connection.apiRequest(true, true, {
            url: "content/getBaseContent/v4",
            searchParams: {
                "trim": trim,
                "year": year,
                "vin": vin,
                "model": model,
                "mdlCode": mdlCode
            }
        });
    }
    async getVehicleStatus(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/getVehicleStatus/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin,
                "limit": 1,
                "offset": 0,
                "vecinfotype": "0"
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to get vehicle status");
        return response;
    }
    async getEVVehicleStatus(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/getEVVehicleStatus/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin,
                "limit": 1,
                "offset": 0,
                "vecinfotype": "0"
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to get EV vehicle status");
        return response;
    }
    async getHealthReport(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/getHealthReport/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin,
                "limit": 1,
                "offset": 0
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to get vehicle health report");
        return response;
    }
    async doorUnlock(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/doorUnlock/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async doorLock(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/doorLock/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async lightOn(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/lightOn/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async lightOff(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/lightOff/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async engineStart(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/engineStart/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async engineStop(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/engineStop/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error(response.message);
    }
    async getNickName(vin) {
        if (vin.length !== 17)
            throw new Error("Invalid VIN");
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/getNickName/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "vin": vin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to get vehicle nickname");
        return response.carlineDesc;
    }
    async updateNickName(vin, nickName) {
        if (vin.length !== 17)
            throw new Error("Invalid VIN");
        if (nickName.length > 20)
            throw new Error("Nickname is too long");
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/updateNickName/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "vin": vin,
                "vtitle": nickName
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to update vehicle nickname");
    }
    async sendPOI(internalVin, latitude, longitude, name) {
        // Calculate a POI ID that is unique to the name and location
        let poiId = CryptoUtils_1.default.sha256(name + latitude + longitude).substring(0, 10);
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/sendPOI/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin,
                "placemarkinfos": [
                    {
                        "Altitude": 0,
                        "Latitude": Math.abs(latitude),
                        "LatitudeFlag": latitude >= 0 ? 0 : 1,
                        "Longitude": Math.abs(longitude),
                        "LongitudeFlag": longitude < 0 ? 0 : 1,
                        "Name": name,
                        "OtherInformation": "{}",
                        "PoiId": poiId,
                        "source": "google"
                    }
                ]
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to send POI");
    }
    async chargeStart(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/chargeStart/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to start charging");
    }
    async chargeStop(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/chargeStop/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to stop charging");
    }
    async getHVACSetting(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/getHVACSetting/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to get HVAC setting");
        return response;
    }
    async setHVACSetting(internalVin, temperature, temperatureUnit, frontDefroster, rearDefroster) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/updateHVACSetting/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin,
                "hvacsettings": {
                    "FrontDefroster": frontDefroster ? 1 : 0,
                    "RearDefogger": rearDefroster ? 1 : 0,
                    "Temperature": temperature,
                    "TemperatureType": temperatureUnit.toLowerCase() === "c" ? 1 : 2
                }
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to set HVAC setting");
    }
    async hvacOn(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/hvacOn/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to turn HVAC on");
    }
    async hvacOff(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/hvacOff/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to turn HVAC off");
    }
    async refreshVehicleStatus(internalVin) {
        let response = await this.connection.apiRequest(true, true, {
            url: "remoteServices/activeRealTimeVehicleStatus/v4",
            method: "POST",
            json: {
                "internaluserid": "__INTERNAL_ID__",
                "internalvin": internalVin
            }
        });
        if (response.resultCode !== "200S00")
            throw new Error("Failed to refresh vehicle status");
    }
}
exports.default = MyMazdaAPIController;
//# sourceMappingURL=MyMazdaAPIController.js.map