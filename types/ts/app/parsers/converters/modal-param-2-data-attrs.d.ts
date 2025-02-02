import { ModalHeaderParams } from "./../../interfaces/modal";
export default class ModalParam2DataAttrs {
    #private;
    getAttrs(): Record<string, any>;
    constructor(params?: Record<any, any>);
    generateString(): string;
    generateObject(): Record<string, string>;
    generateHeaderAttrs(header: Partial<ModalHeaderParams>, attrs: Record<any, any>): void;
    generateFooterAttrs(): void;
    generateBodyAttrs(): void;
    generateAttrIfExists(sourceObj: Record<any, any>, key: string, attrName: string): void;
}
