import { LayeredModal } from './layered-modal';
import { Position } from "./interfaces/common";
interface LayeredModalManagerParams {
    hideXButton: number;
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
export default class LayeredModalManager {
    #private;
    constructor(params?: Partial<LayeredModalManagerParams>);
    prepareParams(params: Partial<LayeredModalManagerParams>): void;
    addModal(params: any): void;
    removeModal(callback?: Function | null): void;
    popStack(): LayeredModal | null | undefined;
    stackSize(): number;
    getStackedModal(index: number): LayeredModal | null;
    bindEvents(): void;
    handleEscapeKey(event: any): void;
    throttle(func: any, limit: any): any;
    adjustStackCssClassForModals(): void;
    bindTriggerClickUsingDataAttributes(): void;
    getContentFromTemplateElement(templateId: string): string;
    getFunctionResult(funcName: string, functionArgs: string): any | null;
}
export {};
