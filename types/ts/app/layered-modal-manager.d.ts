import { LayeredModal } from './layered-modal';
import { Position } from "./interfaces/common";
interface LayeredModalManagerParams {
    hideXButton: number;
    zIndex: number;
    baseShiftDistance?: Partial<Position>;
    cssClass?: Partial<CssClassNames>;
}
interface CssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}
export declare class LayeredModalManager {
    #private;
    constructor(params?: Partial<LayeredModalManagerParams>);
    prepareParams(params: Partial<LayeredModalManagerParams>): void;
    addModal(params: any): void;
    removeModal(callback?: Function | null): void;
    popStack(): LayeredModal | null | undefined;
    stackSize(): number;
    bindEvents(): void;
    handleEscapeKey(event: any): void;
    throttle(func: any, limit: any): any;
}
export {};
