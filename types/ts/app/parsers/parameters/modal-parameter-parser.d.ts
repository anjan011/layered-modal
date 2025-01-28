import { ModalBodyParams, ModalParams, ModalXButton } from "../../interfaces/modal";
export default class ModalParameterParser {
    static parse(params: Partial<ModalParams>): ModalParams;
    static parseHeights(params: Partial<ModalParams>): void;
    static parseWidths(params: Partial<ModalParams>): void;
    static parseHeader(params: Partial<ModalParams>): void;
    static parseFooter(params: Partial<ModalParams>): void;
    static parseXButton(obj: ModalXButton): void;
    static parseBody(body: ModalBodyParams): void;
    static isValidAjaxContentDataType(type: string): type is "html" | "json";
    static isValidBodyContentType(type: string): type is "function" | "html" | "iframe" | "image" | "ajax" | "youtube-video" | "template";
    static isValidPosition(position: string): position is "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
}
