import { ModalHeaderParams } from "./../../interfaces/modal";
export default class ModalParam2DataAttrs {
    #private;
    getAttrs(): Record<string, any>;
    constructor(params?: Record<any, any>);
    generateString(): string;
    generateOtherParams(): void;
    generateModalCssClass(): void;
    generateHeights(): void;
    generateWidths(): void;
    generateCallbacks(): void;
    generateBackDrop(): void;
    generateObject(): Record<string, string>;
    generateHeaderAttrs(header: Partial<ModalHeaderParams>, attrs: Record<any, any>): void;
    generateFooterAttrs(): void;
    generateBodyAttrs(): void;
    generateXButton(): void;
    generateAttrIfExists(sourceObj: Record<any, any>, key: string, attrName: string): void;
}
