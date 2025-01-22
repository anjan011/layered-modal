import { LayeredModalManager } from "./layered-modal-manager";
import { Position, Dimension } from "./interfaces/common";
interface CssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}
interface HeaderParams {
    enabled: number;
    content: string;
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
    onShow?: any;
    onHide?: any;
    secondaryOverlay?: number;
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
    generateMarginShift(): string;
    generateWidthCss(): string;
    generateHtml(): string;
    generateHeaderMarkup(): string;
    generateFooterMarkup(): string | undefined;
    show(): void;
    hide(callback?: Function | null): void;
}
export {};
