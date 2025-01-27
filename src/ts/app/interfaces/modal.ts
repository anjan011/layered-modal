import {AjaxParams, ButtonParams, Dimension, ImageParams, Position} from "./common";

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
    aspectRatio?: number;
    contentType?: "html" | "iframe" | "function" | "ajax" | "image" | "youtube-video" | "template",
    content?: string,
    iframeCode?: string,
    functionName?: Function | string,
    functionArguments?: any,
    ajaxParams?: AjaxParams,
    imageParams?: ImageParams,
    cssClass?: string,
    inlineStyles?: string,
    videoUrl?: string,
    maxHeight?: Dimension,
    templateId?: string;
}

export interface ModalFooterParams {
    enabled: boolean;
    content?: string;
    mode: string;
    onOk?: any;
    cssClass: string;
    inlineStyles: string;
    okButton: Partial<ButtonParams>;
    closeButton : Partial<ButtonParams>;
}

export interface ModalXButton {
    enabled: boolean,
    content: string,
    cssClass: string,
    inlineStyles?: string,
}

export interface ModalParams {
    id: string;
    zIndex: number;
    content?: string;
    header?: ModalHeaderParams;
    footer?: ModalFooterParams;
    autoWidth? : boolean,
    maxWidth? : Dimension,
    minWidth? : Dimension,
    width?: Dimension;
    autoHeight? : boolean;
    maxHeight?: Dimension,
    minHeight?: Dimension,
    height?: Dimension;
    position: "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
    shiftDistance?: Position;
    transitionDuration?: number;
    cssClass?: ModalCssClassNames;
    onShow?: Function | string | null;
    onHide?: Function | string | null;
    secondaryOverlay?: boolean;
    stackIndex: number;
    draggable: boolean;
    dragHandle: string;
    userSelect: boolean;
    body: ModalBodyParams,
    xButton?: ModalXButton,
    delayInMilliSeconds?: number,
    overlay?: OverlayParams;
}

export interface OverlayParams {
    bgColor? : string;
    opacity? : number;
}