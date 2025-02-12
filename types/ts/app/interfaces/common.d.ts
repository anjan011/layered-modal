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
    headers?: object | string;
    transformHtml?: Function | string | null;
    transformJson?: Function | string | null;
    contentDataType?: "html" | "json";
    timeoutMs: number;
    data: FormData | object | string | null;
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
    captionInlineStyles?: string;
}
export interface ButtonParams {
    cssClass?: string;
    text?: string;
    iconClass?: string;
    iconPosition?: string;
    inlineStyles?: string;
}
