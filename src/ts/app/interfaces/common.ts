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
    url: string,
    method : string,
}

export interface ImageParams {
    url: string,
    alt?: string,
    title?: string,
    caption?: string,
    cssClass? : string,
}

