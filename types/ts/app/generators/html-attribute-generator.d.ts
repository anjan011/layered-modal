export declare class HtmlAttributeGenerator {
    encodeValue(value: string): string;
    processObject(prefix: string, obj: Record<string, any>): any[];
    generateAttributes(attributes: Record<string, any>, separator?: string): string;
}
