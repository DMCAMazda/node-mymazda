declare class KeyEvent {
    time: number;
    idCharCodeSum: number;
    longerThanBefore: boolean;
    constructor(time: number, idCharCodeSum: number, longerThanBefore: boolean);
    toString(): string;
}
export default class KeyEventList {
    keyEvents: KeyEvent[];
    constructor();
    randomize(sensorCollectionStartTimestamp: number): void;
    toString(): string;
    getSum(): number;
}
export {};
