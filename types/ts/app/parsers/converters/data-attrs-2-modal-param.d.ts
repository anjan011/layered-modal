import { ModalParams } from "../../interfaces/modal";
export default class DataAttrs2ModalParam {
    #private;
    constructor(attrs?: Record<any, any>);
    generate(): ModalParams;
    generateOtherParams(): void;
    generateCallbacks(): void;
    generateHeader(): void;
    generateFooter(): void;
    generateBody(): void;
}
