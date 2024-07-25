"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SensorDataUtil_1 = require("./SensorDataUtil");
class BackgroundEvent {
    constructor(type, timestamp) {
        this.type = type;
        this.timestamp = timestamp;
    }
    toString() {
        return `${this.type},${this.timestamp};`;
    }
}
class BackgroundEventList {
    constructor() {
        this.backgroundEvents = [];
    }
    randomize(sensorCollectionStartTimestamp) {
        this.backgroundEvents = [];
        if (Math.random() > 0.1)
            return;
        let timeSinceSensorCollectionStart = Date.now() - sensorCollectionStartTimestamp;
        if (timeSinceSensorCollectionStart < 10000)
            return;
        let pausedTimestamp = sensorCollectionStartTimestamp + SensorDataUtil_1.randBetween(800, 4500);
        let resumedTimestamp = pausedTimestamp + SensorDataUtil_1.randBetween(2000, 5000);
        this.backgroundEvents.push(new BackgroundEvent(2, pausedTimestamp));
        this.backgroundEvents.push(new BackgroundEvent(3, resumedTimestamp));
    }
    /*
    Examples:
    3,1623902135865;2,1623902135939;3,1623902136483;2,1623902137580;3,1623902137791;2,1623902208571;3,1623902850180;2,1623902999435;3,1623903002740;"
    3,1624051994772;2,1624051994832;3,1624051995132;2,1624051995660;3,1624051995859;2,1624052022374;3,1624052025476;
    */
    toString() {
        return this.backgroundEvents.map(event => event.toString()).join("");
    }
}
exports.default = BackgroundEventList;
//# sourceMappingURL=BackgroundEventList.js.map