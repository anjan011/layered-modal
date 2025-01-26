import ModalManager from "./modal-manager";
import { Position } from "./interfaces/common";
import { ModalParams } from "./interfaces/modal";
export default class Modal {
    #private;
    getManager(): ModalManager;
    setManager(manager: ModalManager): void;
    getParams(): Partial<ModalParams>;
    constructor(params?: Partial<ModalParams>);
    getId(): string;
    getOverlayId(): string;
    getModalId(): string;
    getModalHeaderId(): string;
    generateMarginShift(): string;
    generateHtml(): string;
    generateModalMarkup(): string;
    generateXButtonMarkup(): string;
    generateBodyMarkup(): string;
    generateHeaderMarkup(): string;
    generateFooterMarkup(): string | undefined;
    show(): void;
    hide(callback?: Function | null): void;
    handleDragEvents(): void;
    toggleModalClass(className: string): void;
    addModalClass(className: string): void;
    removeModalClass(className: string): void;
    adjustMargin(position: Position): void;
    setShiftingDistance(distance: Position, adjustMargins?: boolean): void;
}
