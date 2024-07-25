declare class TouchEvent {
    type: number;
    time: number;
    pointerCount: number;
    toolType: number;
    constructor(type: number, time: number, pointerCount: number, toolType: number);
    toString(): string;
}
export default class TouchEventList {
    touchEvents: TouchEvent[];
    constructor();
    randomize(sensorCollectionStartTimestamp: number): void;
    toString(): string;
    getSum(): number;
}
export {};
