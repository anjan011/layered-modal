export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
export interface Dimension {
    value: number;
    unit: string;
}
export interface AjaxParams {
    url: string;
    method: string;
    headers?: object;
    transformHtml?: Function | null;
    transformJson?: Function | null;
    contentDataType?: "html" | "json";
    timeoutMs: number;
    data: FormData | object | null;
    decodeParams?: boolean;
}
export interface ImageParams {
    url: string;
    alt?: string;
    title?: string;
    caption?: string;
    cssClass?: string;
    inlineStyles?: string;
    captionTemplate?: string;
    captionCssClass?: string;
}
export interface ButtonParams {
    cssClass?: string;
    text?: string;
    iconClass?: string;
    iconPosition?: string;
    inlineStyles?: string;
}
