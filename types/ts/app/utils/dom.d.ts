export declare class DomUtils {
    static getDataAttributes(element: HTMLElement): Record<string, string>;
    static getFunctionResult(funcName: string, functionArgs: string, context?: any): any | null;
    static executeFunction(funcName: string, functionArgs: string, context?: any): void;
    static isValidIframe(html: string): boolean;
    static getContentFromTemplateElement(templateId: string): string;
}
