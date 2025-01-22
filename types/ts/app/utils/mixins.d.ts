import _ from "underscore";
declare module 'underscore' {
    interface UnderscoreStatic {
        isPlainObject(o: any): boolean;
        asObject<T extends object>(v: any, d?: T): T;
        asString(v: any, d?: string): string;
        asInt(v: any, d?: number): number;
        asFloat(v: any, d?: number): number;
        asArray<T>(v: any, d?: T[]): T[];
        objOwnValue<T>(o: any, k: string, d?: T): T;
        objValue<T>(o: any, k: string, d?: T): T;
        objValueAsString(o: unknown, k: string, d?: string): string;
        objValueAsObject(o: any, k: string, d?: object): object;
        objValueAsInt(o: any, k: string, d?: number): number;
        objValueAsIntFlag(o: any, k: string, d?: number): 0 | 1;
        objValueAsFloat(o: any, k: string, d?: number): number;
        objValueAsBool(o: any, k: string, d?: boolean): boolean;
        objValueAsArray<T>(o: any, k: string, d?: T[]): T[];
        hasMethod(o: object, m: string): boolean;
        hasProperty(o: object, k: string): boolean;
        guid(): string;
        objValueAsMethod(o: any, k: string, d?: any): any;
        isAlphanumeric(value: any): boolean;
    }
}
export default _;
