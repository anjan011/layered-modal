import _ from "../../utils/mixins";
import {AjaxParams, Dimension, ImageParams, Position} from "../../interfaces/common";
import {
    ModalBodyParams,
    ModalCssClassNames,
    ModalFooterParams,
    ModalHeaderParams,
    ModalParams, ModalXButton
} from "../../interfaces/modal"
import {DomUtils} from "../../utils/dom";

export default class ModalParameterParser {

    /**
     * Prepare and parse modal params ...
     */

    static parse(params: Partial<ModalParams>): ModalParams {


        /**
         * Stack index ..
         */


        params.stackIndex = _.objValueAsInt(params, 'stackIndex');

        /**
         * Id ...
         */

        params.id = _.objValueAsString(params, 'id');

        if (!params.id) {
            params.id = _.guid();
        }

        /**
         * z-index ...
         */

        params.zIndex = _.objValueAsInt(params, 'zIndex', 1);

        if (params.zIndex < 1) {
            params.zIndex = 1;
        }

        /**
         * Shift distance ...
         */

        let _sd: Partial<Position> = _.objValueAsObject(params, 'shiftDistance');

        _sd.top = _.objValueAsInt(_sd, 'top', 0);
        _sd.right = _.objValueAsInt(_sd, 'right', 0);
        _sd.bottom = _.objValueAsInt(_sd, 'bottom', 0);
        _sd.left = _.objValueAsInt(_sd, 'left', 0);

        params.shiftDistance = _sd as Position;

        /**
         * Fade transition duration ...
         */

        params.transitionDuration = _.objValueAsInt(params, 'transitionDuration', 0);

        if (params.transitionDuration < 0) {
            params.transitionDuration = 0;
        }


        /**
         * Css Class ...
         */

        let cssClass: Partial<ModalCssClassNames> = _.objValueAsObject(params, 'cssClass');

        cssClass.modal = _.objValueAsString(cssClass, 'modal', '');
        cssClass.modalClose = _.objValueAsString(cssClass, 'modalClose', 'modal-close');
        cssClass.modalOk = _.objValueAsString(cssClass, 'modalOk', 'modal-ok');

        params.cssClass = cssClass as ModalCssClassNames;

        /**
         * header ...
         */

        let header: Partial<ModalHeaderParams> = _.objValueAsObject(params, 'header');

        header.enabled = _.objValueAsBool(header, 'enabled', false);
        header.content = _.objValueAsString(header, 'content', '');
        header.title = _.objValueAsString(header, 'title', 'Modal Header');
        header.titleTag = _.objValueAsString(header, 'titleTag', 'h2');

        header.cssClass = _.objValueAsString(header, 'cssClass');
        header.inlineStyles = _.objValueAsString(header, 'inlineStyles');

        if (!header.titleTag) {
            header.titleTag = 'h2';
        }

        if (!header.content) {
            if (!header.title) {
                header.title = 'Modal Header';
            }

            header.content = `<${header.titleTag}>${header.title}</${header.titleTag}>`;
        }

        params.header = header as ModalHeaderParams;

        /**
         * footer ...
         */

        let footer: Partial<ModalFooterParams> = _.objValueAsObject(params, 'footer');

        footer.enabled = _.objValueAsBool(footer, 'enabled', false);

        footer.cssClass = _.objValueAsString(footer, 'cssClass');
        footer.inlineStyles = _.objValueAsString(footer, 'inlineStyles');

        footer.mode = _.objValueAsString(footer, 'mode', 'alert');

        if (!['alert', 'confirm', 'custom'].includes(footer.mode)) {
            footer.mode = 'alert';
        }

        if (footer.mode === 'custom') {
            footer.content = _.objValueAsString(footer, 'content', `<div class="text-center"><button type="button" class="lm-btn lm-btn-error ${params.cssClass.modalClose}">Close</button></div>`);
        }

        footer.onOk = _.objValue(footer, 'onOk');

        params.footer = footer as ModalFooterParams;

        /**
         * Auto width ...
         */

        if(params.hasOwnProperty('autoWidth')) {
            params.autoWidth = _.objValueAsBool(params,'autoWidth',false);
        }

        /**
         * Max width ...
         */

        if(params.hasOwnProperty('maxWidth')) {

            let maxWidth : Partial<Dimension> = _.objValueAsObject(params,'maxWidth');

            maxWidth.value = _.objValueAsFloat(maxWidth,'value',100);
            maxWidth.unit = _.objValueAsString(maxWidth,'unit','%');

        }

        /**
         * Width
         */

        if (params.hasOwnProperty('width')) {
            let w: Partial<Dimension> = _.objValueAsObject(params, 'width');

            w.unit = _.objValueAsString(w, 'unit', 'px');

            if (!w.unit) {
                w.unit = 'px';
            }

            w.value = _.objValueAsFloat(w, 'value', 0);

            if(w.unit === 'px') {

                if(w.value <= 0) {
                    w.value = 800;
                }

            } else if (w.unit === 'vw') {

                if (w.value <= 0) {
                    w.value = 90;
                }

            } else {

                if (w.value <= 0) {
                    w.value = 50;
                }

            }


            params.width = w as Dimension;
        }

        /**
         * Auto height ...
         */

        if (params.hasOwnProperty('autoHeight')) {
            params.autoHeight = _.objValueAsBool(params, 'autoHeight', false);
        }

        /**
         * Max height ...
         */

        if (params.hasOwnProperty('maxHeight')) {

            let maxHeight: Partial<Dimension> = _.objValueAsObject(params, 'maxHeight');

            maxHeight.value = _.objValueAsFloat(maxHeight, 'value', 100);
            maxHeight.unit = _.objValueAsString(maxHeight, 'unit', '%');

        }


        /**
         * Height
         */

        if (params.hasOwnProperty('height')) {

            let h: Partial<Dimension> = _.objValueAsObject(params, 'height');

            h.unit = _.objValueAsString(h, 'unit', 'px');

            if (!h.unit) {
                h.unit = 'px';
            }

            h.value = _.objValueAsFloat(h, 'value', 0);

            if(h.unit === 'px') {

                if(h.value <= 0) {
                    h.value = 100;
                }

            } else if (h.unit === 'vh') {

                if (h.value <= 0) {
                    h.value = 80;
                }

            } else {
                if (h.value <= 0) {
                    h.value = 50;
                }
            }

            params.height = h as Dimension;

        }


        /**
         * Secondary Overlay?
         */

        params.secondaryOverlay = _.objValueAsBool(params, 'secondaryOverlay');

        /**
         * On show and on hide ...
         */

        params.onShow = _.objValue(params, 'onShow', null);
        params.onHide = _.objValue(params, 'onHide', null);

        /**
         * Drag ...
         */

        params.draggable = _.objValueAsBool(params, 'draggable', false);
        params.dragHandle = _.objValueAsString(params, 'dragHandle', '');

        /**
         * User select ...
         */

        params.userSelect = _.objValueAsBool(params, 'userSelect', false);

        /**
         * Body params ..
         */

        params.body = _.objValueAsObject(params, 'body') as ModalBodyParams;

        ModalParameterParser.parseBody(params.body);

        /**
         * X Button params ...
         */

        params.xButton = _.objValueAsObject(params, 'xButton') as ModalXButton;

        ModalParameterParser.parseXButton(params.xButton);

        /**
         * Position ...
         */

        let position = _.objValueAsString(params, 'position');

        if (ModalParameterParser.isValidPosition(position)) {
            params.position = position;
        } else {
            params.position = 'middle-center';
        }

        /**
         * Delay in milli seconds ...
         */

        if (params.hasOwnProperty('delayInMilliSeconds')) {
            params.delayInMilliSeconds = _.objValueAsInt(params, 'delayInMilliSeconds', 0);

            if (params.delayInMilliSeconds < 0) {
                params.delayInMilliSeconds = 0;
            }
        }


        return params as ModalParams;
    }

    /**
     * X button data parsing ...
     * @param obj
     */

    static parseXButton(obj: ModalXButton) {

        obj.enabled = _.objValueAsBool(obj, 'enabled', true);

        obj.content = _.objValueAsString(obj, 'content', 'X');

        if (!obj.content) {
            obj.content = 'X';
        }

        obj.cssClass = _.objValueAsString(obj, 'cssClass');

        if (obj.hasOwnProperty('inlineStyles')) {
            obj.inlineStyles = _.objValueAsString(obj, 'inlineStyles');
        }

    }

    /**
     * Parse body params ...
     *
     * @param body
     */

    static parseBody(body: ModalBodyParams) {


        /**
         * Css class ...
         */

        body.cssClass = _.objValueAsString(body, 'cssClass');

        if (body.cssClass.indexOf('layered-modal-body') === -1) {
            body.cssClass += ' layered-modal-body';
        }

        body.cssClass = body.cssClass.trim();

        /**
         * Inline styles ...
         */

        body.inlineStyles = _.objValueAsString(body, 'inlineStyles');

        /**
         * Max Height ...
         */

        if (body.hasOwnProperty('maxHeight')) {

            let maxHeight = _.objValueAsObject(body, 'maxHeight') as Dimension;

            maxHeight.value = _.objValueAsFloat(maxHeight, 'value');
            maxHeight.unit = _.objValueAsString(maxHeight, 'unit', 'px');

            body.maxHeight = maxHeight;

        }


        /**
         * Should remove all padding form body container?
         */

        body.noPadding = _.objValueAsBool(body, 'noPadding', false);

        /**
         * Aspect ratio, you can set this to maintain a specific
         * width and height ratio. Normally it may not be useful,
         * but when loading a video or image, it may be helpful
         */

        if (body.hasOwnProperty('aspectRatio')) {

            body.aspectRatio = _.objValueAsFloat(body, 'aspectRatio', 0);
        }

        /**
         * Content type and content data ...
         */

        let contentType = _.objValueAsString(body, 'contentType');

        if (ModalParameterParser.isValidBodyContentType(contentType)) {
            body.contentType = contentType;
        } else {
            body.contentType = 'html';
        }

        if (body.contentType === 'html') {
            body.content = _.objValueAsString(body, 'content');
        } else if (body.contentType === 'function') {
            body.functionName = _.objValue(body, 'functionName');
            body.functionArguments = _.objValue(body, 'functionArguments');
        } else if (body.contentType === 'iframe') {
            body.iframeCode = _.objValueAsString(body, 'iframeCode');

        } else if (body.contentType === 'ajax') {
            let ap = body.ajaxParams = _.objValueAsObject(body, 'ajaxParams') as AjaxParams;

            ap.url = _.objValueAsString(ap, 'url');
            ap.method = _.objValueAsString(ap, 'method', 'GET').toUpperCase();

        } else if (body.contentType === 'image') {
            let ip = body.imageParams = _.objValueAsObject(body, 'imageParams') as ImageParams;

            ip.url = _.objValueAsString(ip, 'url');
            ip.alt = _.objValueAsString(ip, 'alt');
            ip.title = _.objValueAsString(ip, 'title');
            ip.caption = _.objValueAsString(ip, 'caption');
            ip.captionTemplate = _.objValueAsString(ip, 'captionTemplate');
            ip.captionCssClass = _.objValueAsString(ip, 'captionCssClass');
            ip.inlineStyles = _.objValueAsString(ip, 'inlineStyles');

        } else if (body.contentType === 'youtube-video') {

            body.videoUrl = _.objValueAsString(body, 'videoUrl');

        } else if (body.contentType === 'template') {

            body.templateId = _.objValueAsString(body, 'templateId');

        } else if (body.contentType === 'image') {

            body.imageParams = _.objValueAsObject(body, 'imageParams') as ImageParams;

        }

    }

    /**
     * Is valid body content type?
     *
     * @param type
     */

    static isValidBodyContentType(type: string): type is "function" | "html" | "iframe" | "image" |
        "ajax" | "youtube-video" | "template" {
        return ["function", "html", "iframe", "image", "ajax", "youtube-video", "template"].includes(type);
    }

    /**
     * Is valid position value?
     *
     * @param position
     */

    static isValidPosition(position: string): position is "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right" {
        return ["top-left", "top-center", "top-right", "middle-left", "middle-center", "middle-right", "bottom-left", "bottom-center", "bottom-right"].includes(position);
    }

}