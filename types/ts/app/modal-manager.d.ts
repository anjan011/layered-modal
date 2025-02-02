import Modal from './modal';
import { Position } from "./interfaces/common";
import { ModalParams, ModalXButton } from "./interfaces/modal";
interface ModalManagerParams {
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
    static instance: ModalManager;
    constructor(params?: Partial<ModalManagerParams>);
    setParameters(params: Partial<ModalManagerParams>): void;
    prepareParams(params: Partial<ModalManagerParams>): void;
    checkCallbacks(params: Partial<ModalParams>): Modal | null;
    errorModal(params: Partial<ModalParams>): Modal;
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
    getLatestModal(): Modal | null;
    static addModal(params: Partial<ModalParams>): Modal;
    static removeModal(callback: Function | null): void;
}
export {};
