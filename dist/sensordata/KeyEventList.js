"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SensorDataUtil_1 = require("./SensorDataUtil");
class KeyEvent {
    constructor(time, idCharCodeSum, longerThanBefore) {
        this.time = time;
        this.idCharCodeSum = idCharCodeSum;
        this.longerThanBefore = longerThanBefore;
    }
    toString() {
        return `2,${this.time},${this.idCharCodeSum}${this.longerThanBefore ? ",1" : ""};`;
    }
}
class KeyEventList {
    constructor() {
        this.keyEvents = [];
    }
    randomize(sensorCollectionStartTimestamp) {
        this.keyEvents = [];
        if (Math.random() > 0.05)
            return;
        let timeSinceSensorCollectionStart = Date.now() - sensorCollectionStartTimestamp;
        if (timeSinceSensorCollectionStart < 10000)
            return;
        let eventCount = SensorDataUtil_1.randBetween(2, 5);
        let idCharCodeSum = SensorDataUtil_1.randBetween(517, 519);
        for (let i = 0; i < eventCount; i++) {
            let time = (i === 0 ? SensorDataUtil_1.randBetween(5000, 8000) : SensorDataUtil_1.randBetween(10, 50));
            this.keyEvents.push(new KeyEvent(time, idCharCodeSum, (Math.random() > 0.5)));
        }
    }
    /*
    examples:
    2,29555,517;2,152,517,1;2,13,518,1;
    2,20016,517;2,366,518,1;2,27,517,1;
    2,13840,517,1;2,19,518,1;

    structure:
    1. seems to always be 2
    2. time between this event and last event
    3. sumCharCodes of ID of text edit field
    4. (only present if text field length is longer than before the event) 1
    */
    toString() {
        return this.keyEvents.map(event => event.toString()).join("");
    }
    getSum() {
        let sum = 0;
        for (let keyEvent of this.keyEvents) {
            sum += keyEvent.idCharCodeSum;
            sum += keyEvent.time;
            sum += 2;
        }
        return sum;
    }
}
exports.default = KeyEventList;
//# sourceMappingURL=KeyEventList.js.map