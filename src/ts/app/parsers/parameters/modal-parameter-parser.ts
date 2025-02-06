import _ from "../../utils/mixins";
import {
    AjaxParams,
    ButtonParams,
    Dimension,
    ImageParams,
    Position
} from "../../interfaces/common";
import {
    ModalBodyParams,
    ModalCssClassNames,
    ModalFooterParams,
    ModalHeaderParams,
    ModalParams, ModalXButton, BackDropParams
} from "../../interfaces/modal"

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

        ModalParameterParser.parseHeader(params);


        /**
         * footer ...
         */

        ModalParameterParser.parseFooter(params);


        /**
         * Width params ...
         */

        ModalParameterParser.parseWidths(params);

        /**
         * Height params ...
         */

        ModalParameterParser.parseHeights(params);

        /**
         * Secondary Overlay?
         */

        params.secondaryBackDrop = _.objValueAsBool(params, 'secondaryOverlay');

        /**
         * On show and on hide ...
         */

        params.onShow = _.objValue(params, 'onShow', null);
        params.onBeforeShow = _.objValue(params, 'onBeforeShow', null);
        params.onHide = _.objValue(params, 'onHide', null);
        params.onBeforeHide = _.objValue(params, 'onBeforeHide', null);

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

        /**
         * Overlay ...
         */

        if(params.hasOwnProperty('backDrop')) {
            let ol = params.backDrop = _.objValueAsObject(params,'backDrop') as Partial<BackDropParams>;

            ol.bgColor = _.objValueAsString(ol,'bgColor','rgba(0,0,0,0.25)');
            ol.opacity = _.objValueAsFloat(ol,'opacity',1);

            if(ol.opacity < 0) {
                ol.opacity = 0;
            } else if(ol.opacity > 1) {
                ol.opacity = 1;
            }

        }

        /**
         * Disable escape key press?
         */

        if(params.hasOwnProperty('disableEscKey')) {

            params.disableEscKey = _.objValueAsBool(params,'disableEscKey',false);


        } else {
            params.disableEscKey = false;
        }

        /**
         * Close on mouse click outside modal?
         */

        if(!params.hasOwnProperty('closeOnOutsideMouseClick')) {
            params.closeOnOutsideMouseClick = false;
        } else {
            params.closeOnOutsideMouseClick = _.objValueAsBool(params,'closeOnOutsideMouseClick',false);
        }


        return params as ModalParams;
    }

    /**
     * Parses height related params ...
     *
     * @param params
     */

    static parseHeights(params: Partial<ModalParams>) {

        /**
         * Auto height ...
         */

        if (params.hasOwnProperty('autoHeight')) {
            params.autoHeight = _.objValueAsBool(params, 'autoHeight', true);
        } else {
            params.autoHeight = true;
        }

        /**
         * Max height ...
         */

        if (params.hasOwnProperty('maxHeight')) {

            let maxHeight: Partial<Dimension> = _.objValueAsObject(params, 'maxHeight');

            maxHeight.value = _.objValueAsFloat(maxHeight, 'value', 90);
            maxHeight.unit = _.objValueAsString(maxHeight, 'unit', 'vh');

        } else {
            params.maxHeight = {
                value: 90,
                unit: 'vh'
            } as Dimension;
        }

        /**
         * Min height ...
         */

        if (params.hasOwnProperty('minHeight')) {

            let minHeight: Partial<Dimension> = _.objValueAsObject(params, 'minHeight');

            minHeight.value = _.objValueAsFloat(minHeight, 'value', 0);
            minHeight.unit = _.objValueAsString(minHeight, 'unit', 'px');

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

            params.autoHeight = h.value <= 0;

            params.height = h as Dimension;

        }

    }

    /**
     * Parse width related params ....
     *
     * @param params
     */

    static parseWidths(params : Partial<ModalParams>) {

        /**
         * Auto width ...
         */

        if (params.hasOwnProperty('autoWidth')) {
            params.autoWidth = _.objValueAsBool(params, 'autoWidth', true);
        } else {
            params.autoWidth = true;
        }

        /**
         * Max width ...
         */

        if (params.hasOwnProperty('maxWidth')) {

            let maxWidth: Partial<Dimension> = _.objValueAsObject(params, 'maxWidth');

            maxWidth.value = _.objValueAsFloat(maxWidth, 'value', 90);
            maxWidth.unit = _.objValueAsString(maxWidth, 'unit', 'vw');


        } else {
            params.maxWidth = {
                value : 90,
                unit : 'vw'
            } as Dimension;
        }

        /**
         * Min width ...
         */

        if (params.hasOwnProperty('minWidth')) {

            let minWidth: Partial<Dimension> = _.objValueAsObject(params, 'minWidth');

            minWidth.value = _.objValueAsFloat(minWidth, 'value', 0);
            minWidth.unit = _.objValueAsString(minWidth, 'unit', 'px');

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

            params.autoWidth = w.value <= 0;

            params.width = w as Dimension;
        }

    }

    /**
     * Parse header params ...
     *
     * @param params
     */

    static parseHeader(params: Partial<ModalParams>) {

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

    }

    /**
     * Parse footer data ....
     *
     * @param params
     */

    static parseFooter(params: Partial<ModalParams>) {

        let footer: Partial<ModalFooterParams> = _.objValueAsObject(params, 'footer');





        footer.enabled = _.objValueAsBool(footer, 'enabled', false);

        footer.cssClass = _.objValueAsString(footer, 'cssClass');
        footer.inlineStyles = _.objValueAsString(footer, 'inlineStyles');

        footer.mode = _.objValueAsString(footer, 'mode', 'alert');

        if (!['alert', 'confirm', 'custom'].includes(footer.mode)) {
            footer.mode = 'alert';
        }

        if (footer.mode === 'custom') {
            footer.content = _.objValueAsString(footer, 'content', `<div class="ta-center"><button type="button" class="lm-btn lm-btn-error ${params.cssClass?.modalClose}">Close</button></div>`);
        }

        footer.onOk = _.objValue(footer, 'onOk');

        // region [Ok Button]

        let okBtn = footer.okButton = _.objValueAsObject(footer, 'okButton') as Partial<ButtonParams>;

        okBtn.cssClass = _.objValueAsString(okBtn, 'cssClass');

        if (!okBtn.cssClass) {

            okBtn.cssClass = `lm-btn lm-btn-success ${params.cssClass?.modalOk}`;

        } else {
            okBtn.cssClass += ` lm-btn lm-btn-success ${params.cssClass?.modalOk}`;
        }

        okBtn.text = _.objValueAsString(okBtn, 'text', 'Ok');

        if (!okBtn.text) {
            okBtn.text = 'Ok';
        }

        okBtn.inlineStyles = _.objValueAsString(okBtn, 'inlineStyles');
        okBtn.iconClass = _.objValueAsString(okBtn, 'iconClass');
        okBtn.iconPosition = _.objValueAsString(okBtn, 'iconPosition', 'left').toLowerCase();

        if (['left', 'right'].includes(okBtn.iconPosition)) {
            okBtn.iconPosition = 'left';
        }

        // endregion

        // region [Close Button]

        let closeBtn = footer.closeButton = _.objValueAsObject(footer, 'closeButton') as Partial<ButtonParams>;

        closeBtn.cssClass = _.objValueAsString(closeBtn, 'cssClass');

        if (!closeBtn.cssClass) {

            closeBtn.cssClass = `lm-btn lm-btn-error ${params.cssClass?.modalClose}`;

        } else {
            closeBtn.cssClass += ` lm-btn lm-btn-error ${params.cssClass?.modalClose}`;
        }

        closeBtn.text = _.objValueAsString(closeBtn, 'text', 'Close');

        if (!closeBtn.text) {
            closeBtn.text = 'Close';
        }

        closeBtn.inlineStyles = _.objValueAsString(closeBtn, 'inlineStyles');

        closeBtn.iconClass = _.objValueAsString(closeBtn, 'iconClass');

        closeBtn.iconPosition = _.objValueAsString(closeBtn, 'iconPosition', 'left').toLowerCase();

        if (['left', 'right'].includes(closeBtn.iconPosition)) {
            closeBtn.iconPosition = 'left';
        }

        // endregion

        params.footer = footer as ModalFooterParams;

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

        if (!body.hasOwnProperty('cssClass')) {
            body.cssClass = 'ai-start jc-start';
        }

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
         * Css classes ...
         */



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

        if(!body.hasOwnProperty('contentType')) {
            body.contentType = 'html';
        }

        let contentType = _.objValueAsString(body, 'contentType');

        if (ModalParameterParser.isValidBodyContentType(contentType)) {
            body.contentType = contentType;
        }

        if (body.contentType === 'html') {
            body.content = _.objValueAsString(body, 'content');
        } else if (body.contentType === 'function') {
            body.functionName = _.objValue(body, 'functionName');
            body.functionArguments = _.objValue(body, 'functionArguments');
            body.functionThis = _.objValue(body, 'functionThis');
        } else if (body.contentType === 'iframe') {
            body.iframeCode = _.objValueAsString(body, 'iframeCode');

        } else if (body.contentType === 'ajax') {
            let ap = body.ajaxParams = _.objValueAsObject(body, 'ajaxParams') as AjaxParams;

            ap.url = _.objValueAsString(ap, 'url');
            ap.method = _.objValueAsString(ap, 'method', 'GET').toUpperCase();

            let contentDataType = _.objValueAsString(ap, 'contentDataType');

            if (ModalParameterParser.isValidAjaxContentDataType(contentDataType)) {
                ap.contentDataType = contentDataType;
            } else {
                ap.contentDataType = 'html';
            }

            ap.timeoutMs = _.objValueAsInt(ap,'timeoutMs',30000);

            if(ap.timeoutMs < 100) {
                ap.timeoutMs = 100;
            }

            if(ap.hasOwnProperty('decodeParams')) {
                ap.decodeParams = _.objValueAsBool(ap,'decodeParams',false);
            }

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
     * Is valid ajax content type
     * @param type
     */

    static isValidAjaxContentDataType(type: string): type is "html" | "json" {
        return [ "html", "json"].includes(type);
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