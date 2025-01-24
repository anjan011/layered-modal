import LayeredModalManager from "./layered-modal-manager";
import { Position, Dimension } from "./interfaces/common";
interface CssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}
interface HeaderParams {
    enabled: number;
    content: string;
    title: string;
    titleTag: string;
}
interface BodyParams {
    noPadding: boolean;
    aspectRatio?: number;
}
interface FooterParams {
    enabled: number;
    content?: string;
    mode: string;
    onOk?: any;
}
interface LayeredModalParams {
    id: string;
    zIndex: number;
    content?: string;
    header?: HeaderParams;
    footer?: FooterParams;
    width?: Dimension;
    height?: Dimension;
    position: string;
    shiftDistance?: Position;
    transitionDuration?: number;
    hideXButton?: number;
    cssClass?: CssClassNames;
    onShow?: Function | null;
    onHide?: Function | null;
    secondaryOverlay?: boolean;
    stackIndex: number;
    draggable: boolean;
    dragHandle: string;
    userSelect: boolean;
    body: BodyParams;
}
export declare class LayeredModal {
    #private;
    getManager(): LayeredModalManager;
    setManager(manager: LayeredModalManager): void;
    getParams(): Partial<LayeredModalParams>;
    constructor(params?: Partial<LayeredModalParams>);
    prepareParams(params: Partial<LayeredModalParams>): void;
    getId(): string;
    getOverlayId(): string;
    getModalId(): string;
    getModalHeaderId(): string;
    generateMarginShift(): string;
    generateWidthCss(): string;
    generateHtml(): string;
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
export {};
