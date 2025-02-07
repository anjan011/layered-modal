import { AjaxParams, ButtonParams, Dimension, ImageParams, Position } from "./common";
export interface ModalCssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}
export interface ModalHeaderParams {
    enabled: boolean;
    content?: string;
    title?: string;
    titleTag?: string;
    cssClass?: string;
    inlineStyles?: string;
}
export interface ModalBodyParams {
    noPadding?: boolean;
    contentType?: string;
    content?: string;
    iframeCode?: string;
    functionName?: Function | string;
    functionArguments?: any;
    functionThis?: any;
    ajaxParams?: AjaxParams;
    imageParams?: ImageParams;
    cssClass?: string;
    inlineStyles?: string;
    videoUrl?: string;
    maxHeight?: Dimension;
    templateId?: string;
    transformer?: Function | string | null;
}
export interface ModalFooterParams {
    enabled: boolean;
    content?: string;
    mode: string;
    onOk?: Function | string | null;
    cssClass: string;
    inlineStyles: string;
    okButton: Partial<ButtonParams>;
    closeButton: Partial<ButtonParams>;
    templateId?: string;
}
export interface ModalXButton {
    enabled: boolean;
    content: string;
    cssClass: string;
    inlineStyles?: string;
}
export interface ModalParams {
    id: string;
    zIndex: number;
    header?: ModalHeaderParams;
    footer?: ModalFooterParams;
    autoWidth?: boolean;
    maxWidth?: Dimension;
    minWidth?: Dimension;
    width?: Dimension;
    autoHeight?: boolean;
    maxHeight?: Dimension;
    minHeight?: Dimension;
    height?: Dimension;
    position: "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
    shiftDistance?: Position;
    transitionDuration?: number;
    cssClass?: ModalCssClassNames;
    onShow?: Function | string | null;
    onBeforeShow?: Function | string | null;
    onHide?: Function | string | null;
    onBeforeHide?: Function | string | null;
    secondaryBackDrop?: boolean;
    stackIndex: number;
    draggable: boolean;
    dragHandle: string;
    userSelect: boolean;
    body: ModalBodyParams;
    xButton?: ModalXButton;
    delayInMilliSeconds?: number;
    backDrop?: BackDropParams;
    disableEscKey?: boolean;
    closeOnOutsideMouseClick?: boolean;
    aspectRatio?: number;
}
export interface BackDropParams {
    bgColor?: string;
    opacity?: number;
}
