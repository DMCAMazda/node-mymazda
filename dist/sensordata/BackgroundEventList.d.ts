declare class BackgroundEvent {
    type: number;
    timestamp: number;
    constructor(type: number, timestamp: number);
    toString(): string;
}
export default class BackgroundEventList {
    backgroundEvents: BackgroundEvent[];
    constructor();
    randomize(sensorCollectionStartTimestamp: number): void;
    toString(): string;
}
export {};
