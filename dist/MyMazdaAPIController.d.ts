import type { RegionCode } from "./MyMazdaAPIConnection";
interface APIBaseResponse {
    resultCode: string;
    visitNo: string;
}
interface GetVecBaseInfoAPIResponse extends APIBaseResponse {
    vecBaseInfos: {
        Vehicle: {
            handlePosition: string;
            primaryUserRegistrationDateTime: string;
            vehicleInformation: string;
            retailDate: string;
            cvCautionsPerm: {} | PermAPIObject;
            cvTermsAndConditionsPerm: {} | PermAPIObject;
            freeData: string;
            onetimePassAuthenticationDateTime: string;
            cvHelpnetPerm: {} | PermAPIObject;
            startDateTime: string;
            cvPrivacyPerm: {} | PermAPIObject;
            CvInformation: {
                iccId: string;
                tcuDestination: number;
                tcuVersion: string;
                internalVin: number;
                modelSpecificationCode: string;
                imei: string;
                cmuVersion: string;
                tcuModelYear: number;
            };
            countryCode: string;
            startCompletionDateTime: string;
        };
        econnectType: number;
        vin: string;
        vehicleType: number;
    }[];
    vehicleFlags: {
        vinRegistStatus: number;
        primaryFlag: number;
    }[];
}
interface PermAPIObject {
    time: string;
    locale: string;
    version: string;
}
interface TPMSInformation {
    FLTPrsDispBar: number;
    MntTyreAtFlg: number;
    FLTPrsDispKP: number;
    RLTPrsDispKgfPcm2: number;
    FLTPrsDispPsi: number;
    FRTPrsDispPsi: number;
    FRTPrsDispKgfPcm2: number;
    RRTPrsDispBar: number;
    TPrsDispMinute: number;
    TPrsDispYear: number;
    RRTPrsDispPsi: number;
    TPrsDispMonth: number;
    RLTPrsDispKP: number;
    RRTyrePressWarn: number;
    TPMSSystemFlt: number;
    RLTyrePressWarn: number;
    RLTPrsDispBar: number;
    FRTyrePressWarn: number;
    FLTPrsDispKgfPcm2: number;
    RRTPrsDispKgfPcm2: number;
    TPrsDispDate: number;
    RRTPrsDispKP: number;
    TPMSStatus: number;
    FRTPrsDispKP: number;
    RLTPrsDispPsi: number;
    FLTyrePressWarn: number;
    FRTPrsDispBar: number;
    TPrsDispHour: number;
}
interface VehicleStatusAPIResponse extends APIBaseResponse {
    alertInfos: {
        TnsLight: {
            LightSwState: number;
            LightCombiSWMode: number;
            TnsLamp: number;
        };
        HazardLamp: {
            HazardSw: number;
        };
        UsbPositionAccuracy: number;
        Pw: {
            PwPosRr: 0 | 1;
            PwPosDrv: 0 | 1;
            PwPosPsngr: 0 | 1;
            PwPosRl: 0 | 1;
        };
        PositionInfo: {
            AcquisitionDatetime: string;
            Latitude: number;
            LatitudeFlag: number;
            Longitude: number;
            LongitudeFlag: number;
        };
        OccurrenceDate: string;
        PositionInfoCategory: number;
        Door: {
            SrTiltSignal: number;
            FuelLidOpenStatus: number;
            DrStatHood: number;
            LockLinkSwRr: number;
            DrStatRr: number;
            LockLinkSwRl: number;
            DrStatPsngr: number;
            DrStatDrv: number;
            SrSlideSignal: number;
            AllDrSwSignal: number;
            DrStatRl: number;
            DrOpnWrn: number;
            LockLinkSwDrv: number;
            DrStatTrnkLg: number;
            LockLinkSwPsngr: number;
        };
        DcmPositionAccuracyEntity: object;
    }[];
    remoteInfos: {
        ResidualFuel: {
            RemDrvDistDActlMile: number;
            RemDrvDistDActlKm: number;
            FuelSegementDActl: number;
        };
        RegularMntInformation: {
            MntSetDistKm: number;
            MntSetDistMile: number;
        };
        DriveInformation: {
            Drv1AvlFuelG: number;
            Drv1AvlFuelE: number;
            Drv1AmntFuel: number;
            OdoDispValue: number;
            Drv1Distnc: number;
            OdoDispValueMile: number;
            Drv1DrvTm: number;
        };
        TPMSInformation: TPMSInformation;
        SeatBeltInformation: {
            FirstRowBuckleDriver: number;
            RLOCSStatDACtl: number;
            OCSStatus: number;
            RROCSStatDActl: number;
            SeatBeltWrnDRq: number;
            RCOCSStatDActl: number;
            SeatBeltStatDActl: string;
            FirstRowBucklePsngr: number;
        };
        ElectricalInformation: {
            PowerControlStatus: number;
            EngineState: number;
        };
        BatteryStatus: {
            SocEcmAEst: number;
        };
        UsbPositionAccuracy: number;
        MntSCRInformation: {
            UreaTankLevel: number;
            RemainingMileage: number;
            MntSCRAtFlg: number;
        };
        OccurrenceDate: string;
        PositionInfo: {
            AcquisitionDatetime: string;
            Latitude: number;
            LatitudeFlag: number;
            Longitude: number;
            LongitudeFlag: number;
        };
        PositionInfoCategory: number;
        OilMntInformation: {
            RemOilDistMile: number;
            DROilDeteriorateLevel: number;
            MntOilAtFlg: number;
            OilDtrInitTime: number;
            OilDeteriorateWarning: number;
            OilDtrInitDistMile: number;
            OilLevelWarning: number;
            RemOilDistK: number;
            MntOilLvlAtFlg: number;
            OilDtrInitDistKm: number;
            OilLevelSensWarnBRq: number;
            OilLevelStatusMonitor: number;
        };
        WguidStatus: object;
        DcmPositionAccuracyEntity: object;
    }[];
}
interface EVVehicleStatusAPIResponse extends APIBaseResponse {
    resultData: {
        NId: string;
        InformationDatetime: string;
        PlusBInformation: {
            VehicleInfo: {
                ChargeInfo: {
                    SmaphRemDrvDistKm: number;
                    SmaphSOC: number;
                    CstmzStatBatHeatAutoSW: number;
                    SmaphRemDrvDistMile: number;
                    ACChargeStatus: number;
                    ChargeStatusSub: number;
                    ChargerConnectorFitting: number;
                    MaxChargeMinuteAC: number;
                    BatteryHeaterON: number;
                    DCChargeStatus: number;
                    MaxChargeMinuteQBC: number;
                };
                RemoteHvacInfo: {
                    HVAC: number;
                    RearDefogger: number;
                    InCarTeDC: number;
                    InCarTeDF: number;
                    FrontDefroster: number;
                };
            };
        };
        NotificationCategory: number;
        SId: string;
        OccurrenceTime: string;
        DcmNumber: string;
        BsId: string;
        DcmDormantDatetime: string;
        IgInformation: {
            VehicleInfo: {
                ChargeInfo: {
                    ChargeScheduleStatus: number;
                    LastUpdatedTimeForScheduledChargeTime: string;
                };
            };
        };
        OccurrenceDate: string;
        PositionInfo: {
            AcquisitionDatetime: string;
            Latitude: number;
            Longitude: number;
            DcmPositionAccuracy: {
                Gradient: number;
                MinorAxisError: number;
                AcquisitionState: number;
                MajorAxisError: number;
            };
        };
        PositionInfoCategory: number;
        TransmissionFactor: string;
    }[];
}
interface HealthReportAPIResponse extends APIBaseResponse {
    remoteInfos: {
        WngRearFogLamp: number;
        WngOilShortage: number;
        RegularMntInformation: {
            RemRegDistMile: number;
            MntSetDistMile: number;
            MntSetDistKm: number;
        };
        WngTurnLamp: 0;
        WngOilAmountExceed: number;
        TPMSInformation: TPMSInformation;
        WngTyrePressureLow: number;
        OdoDispValue: number;
        WngTailLamp: 0;
        WngTpmsStatus: 0;
        WngHeadLamp: 0;
        WngSmallLamp: 0;
        WngBreakLamp: 0;
        OccurrenceDate: string;
        OilMntInformation: {
            RemOilDistK: number;
        };
        OdoDispValueMile: number;
        WngBackLamp: number;
    }[];
}
interface GetHVACSettingAPIResponse extends APIBaseResponse {
    hvacSettings: {
        TemperatureType: number;
        Temperature: number;
        RearDefogger: number;
        FrontDefroster: number;
    };
}
export default class MyMazdaAPIController {
    private connection;
    constructor(email: string, password: string, region: RegionCode);
    getTac(): Promise<unknown>;
    getLanguagePkg(): Promise<unknown>;
    getVecBaseInfos(): Promise<GetVecBaseInfoAPIResponse>;
    getVehicleCodeWithTrims(): Promise<unknown>;
    gasStationSearch(lat: string, lon: string): Promise<unknown>;
    getCountryNscMapping(): Promise<unknown>;
    getBaseContent(trim: string, year: string | number, vin: string, model: string, mdlCode: string): Promise<object>;
    getVehicleStatus(internalVin: number): Promise<VehicleStatusAPIResponse>;
    getEVVehicleStatus(internalVin: number): Promise<EVVehicleStatusAPIResponse>;
    getHealthReport(internalVin: number): Promise<HealthReportAPIResponse>;
    doorUnlock(internalVin: number): Promise<void>;
    doorLock(internalVin: number): Promise<void>;
    lightOn(internalVin: number): Promise<void>;
    lightOff(internalVin: number): Promise<void>;
    engineStart(internalVin: number): Promise<void>;
    engineStop(internalVin: number): Promise<void>;
    getNickName(vin: string): Promise<string>;
    updateNickName(vin: string, nickName: string): Promise<void>;
    sendPOI(internalVin: number, latitude: number, longitude: number, name: string): Promise<void>;
    chargeStart(internalVin: number): Promise<void>;
    chargeStop(internalVin: number): Promise<void>;
    getHVACSetting(internalVin: number): Promise<GetHVACSettingAPIResponse>;
    setHVACSetting(internalVin: number, temperature: number, temperatureUnit: "C" | "F", frontDefroster: boolean, rearDefroster: boolean): Promise<void>;
    hvacOn(internalVin: number): Promise<void>;
    hvacOff(internalVin: number): Promise<void>;
    refreshVehicleStatus(internalVin: number): Promise<void>;
}
export {};
