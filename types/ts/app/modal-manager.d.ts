import Modal from './modal';
import { Position } from "./interfaces/common";
import { ModalXButton } from "./interfaces/modal";
interface LayeredModalManagerParams {
    xButton: Partial<ModalXButton>;
    zIndex: number;
    baseShiftDistance?: Partial<Position>;
    cssClass?: Partial<CssClassNames>;
    transitionDuration?: number;
}
interface CssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}
export default class ModalManager {
    #private;
    constructor(params?: Partial<LayeredModalManagerParams>);
    prepareParams(params: Partial<LayeredModalManagerParams>): void;
    addModal(params: any): Modal;
    removeModal(callback?: Function | null): void;
    popStack(): Modal | null | undefined;
    stackSize(): number;
    getStackedModal(index: number): Modal | null;
    bindEvents(): void;
    handleEscapeKey(event: any): void;
    throttle(func: any, limit: any): any;
    adjustStackCssClassForModals(): void;
    bindTriggerClickUsingDataAttributes(): void;
    getContentFromTemplateElement(templateId: string): string;
}
export {};
