export declare function randBetween(min: number, max: number): number;
export declare function parseSensorDataStr(data: string): Record<string, string | object>;
export declare function selectRandomFromArray<T>(arr: Array<T>): T;
export declare function percentEncode(inputStr: string | undefined): string;
export declare function sumCharCodes(str: string): number;
export declare function feistelCipher(upper32Bits: number, lower32Bits: number, key: number): bigint;
