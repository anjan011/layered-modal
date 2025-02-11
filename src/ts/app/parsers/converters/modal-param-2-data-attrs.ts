import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams} from "./../../interfaces/modal";
import _ from './../../utils/mixins';
import {HtmlAttributeGenerator} from "../../generators/html-attribute-generator";
import ModalParameterParser from "../parameters/modal-parameter-parser";

export default class ModalParam2DataAttrs {

    /**
     * Attributes holder ...
     *
     * @private
     */

    #attrs: Record<string, any> = {
        'data-lms-trigger': '1'
    };

    /**
     * Source modal params ...
     *
     * @private
     */

    #modalParams: Partial<ModalParams> = {};

    /**
     * Gets attributes ...
     */

    getAttrs(): Record<string, any> {
        return this.#attrs;
    }

    /**
     * Constructor ..
     *
     * @param params
     */

    constructor(params: Record<any, any> = {}) {

        this.#attrs = {
            ...
                _.objValueAsObject(params, 'attrs') as Record<string, any>,
            ...{
                'data-lms-trigger': 1
            }
        };

        this.#modalParams = _.objValueAsObject(params, 'modalParams') as Partial<ModalParams>;

    }

    /**
     * Generates the HTML attribute string from the generated object ...
     *
     */

    generateString(): string {

        let attrGen = new HtmlAttributeGenerator();

        return attrGen.generateAttributes(this.generateObject(), '\n');

    }

    /**
     * Convert misc. params to data attributes ...
     */

    generateOtherParams() {


        /**
         * ID
         */

        if (!_.isValidGUID(this.#modalParams.id as string) && this.#modalParams.id) {
            this.#attrs['data-lm-id'] = _.sanitizeString(this.#modalParams.id);
        }

        /**
         * Transition Duration ...
         */

        if (this.#modalParams.transitionDuration && this.#modalParams.transitionDuration > 0) {
            this.generateAttrIfExists(
                this.#modalParams,
                'transitionDuration',
                'data-lm-transition-duration'
            );
        }
        /**
         * Delay in MS ...
         */

        if (this.#modalParams.delayInMilliSeconds && this.#modalParams.delayInMilliSeconds > 0) {
            this.generateAttrIfExists(
                this.#modalParams,
                'delayInMilliSeconds',
                'data-lm-delay-ms'
            );
        }

        if (this.#modalParams.position && this.#modalParams.position !== 'middle-center') {
            this.generateAttrIfExists(
                this.#modalParams,
                'position',
                'data-lm-position'
            );
        }

        if (this.#modalParams.disableEscKey) {
            this.generateAttrIfExists(
                this.#modalParams,
                'disableEscKey',
                'data-lm-disable-esc'
            );
        }

        if (this.#modalParams.closeOnOutsideMouseClick) {
            this.generateAttrIfExists(
                this.#modalParams,
                'closeOnOutsideMouseClick',
                'data-lm-close-on-outside-click'
            );
        }

        if (this.#modalParams.userSelect) {
            this.generateAttrIfExists(
                this.#modalParams,
                'userSelect',
                'data-lm-user-select'
            );
        }

    }

    /**
     * Modal css classes to attribute ...
     */

    generateModalCssClass() {

        if (this.#modalParams.cssClass) {

            this.generateAttrIfExists(this.#modalParams.cssClass, 'modal', 'data-lm-modal-css-class');

            this.generateAttrIfExists(this.#modalParams.cssClass, 'modalOk', 'data-lm-modal-ok-css-class');

            this.generateAttrIfExists(this.#modalParams.cssClass, 'modalClose', 'data-lm-modal-close-css-class');
        }
    }

    /**
     * Convert height related params to data attributes ...
     */

    generateHeights() {

        let params = this.#modalParams;

        let attrs = this.#attrs;

        if (params.hasOwnProperty('autoHeight') && !params.autoHeight) {
            attrs['data-lm-auto-height'] = '0';
        }


        if (params.height && params.height.value > 0) {

            attrs['data-lm-height'] = params.height?.value + params.height.unit;

        }

        if (params.minHeight) {

            attrs['data-lm-min-height'] = params.minHeight?.value + params.minHeight.unit;

        }

        if (params.maxHeight) {

            attrs['data-lm-max-height'] = params.maxHeight?.value + params.maxHeight.unit;

        }

    }

    /**
     * Convert width related params to data attributes ...
     */

    generateWidths() {

        let params = this.#modalParams;

        let attrs = this.#attrs;

        if (params.hasOwnProperty('autoWidth') && !params.autoWidth) {
            attrs['data-lm-auto-width'] = '0';
        }

        if (params.width && params.width?.value > 0) {


            attrs['data-lm-width'] = params.width?.value + params.width?.unit;

        }

        if (params.minWidth) {

            attrs['data-lm-min-width'] = params.minWidth?.value + params.minWidth?.unit;

        }

        if (params.maxWidth) {

            attrs['data-lm-max-width'] = params.maxWidth?.value + params.maxWidth?.unit;

        }

    }

    /**
     * if callbacks are function names, convert them to data attributes. ..
     */

    generateCallbacks() {

        let params = this.#modalParams;

        let attrs = this.#attrs;

        /**
         * On show ...
         */

        if (params.hasOwnProperty('onShow')) {
            if (typeof params.onShow === 'string') {
                attrs['data-lm-on-show'] = params.onShow;
            }
        }

        /**
         * On before show ...
         */

        if (params.hasOwnProperty('onBeforeShow')) {
            if (typeof params.onBeforeShow === 'string') {
                attrs['data-lm-on-before-show'] = params.onBeforeShow;
            }
        }

        /**
         * On hide ...
         */

        if (params.hasOwnProperty('onHide')) {
            if (typeof params.onHide === 'string') {
                attrs['data-lm-on-hide'] = params.onHide;
            }
        }

        /**
         * On before hide ...
         */

        if (params.hasOwnProperty('onBeforeHide')) {
            if (typeof params.onBeforeHide === 'string') {
                attrs['data-lm-on-before-hide'] = params.onBeforeHide;
            }
        }

    }

    /**
     * generate for backdrop ...
     */

    generateBackDrop() {
        let params = this.#modalParams;

        if (params.backDrop) {

            if (params.backDrop.bgColor) {
                this.#attrs['data-lm-backdrop-bg-color'] = params.backDrop.bgColor;
            }

            if (params.backDrop.opacity) {
                this.#attrs['data-lm-backdrop-opacity'] = params.backDrop.opacity;
            }

        }
    }

    /**
     * Generate an object containing from modal params.
     *
     */

    generateObject(): Record<string, string> {

        let params = this.#modalParams;

        let attrs = this.#attrs;

        /**
         * Modal direct params, not sub params ...
         */

        this.generateOtherParams();

        /**
         * Modal css class ...
         */

        this.generateModalCssClass();

        /**
         * Widths ...
         */

        this.generateWidths();

        /**
         * Heights ...
         */

        this.generateHeights();

        /**
         * Callbacks ...
         */

        this.generateCallbacks();

        /**
         * Header ...
         */

        if (params.hasOwnProperty('header')) {

            this.generateHeaderAttrs(params.header as Partial<ModalHeaderParams>, attrs);

        }

        /**
         * Footer ...
         */

        this.generateFooterAttrs();

        /**
         * Body ...
         */

        this.generateBodyAttrs();

        /**
         * Backdrop ...
         */

        this.generateBackDrop();

        return attrs;

    }

    /**
     * Header attrs ...
     *
     * @param header
     * @param attrs
     */

    generateHeaderAttrs(header: Partial<ModalHeaderParams>, attrs: Record<any, any>) {

        this.#attrs['data-lm-h-enabled'] = header.enabled ? 1 : 0;

        if (!header.enabled) {
            return;
        }

        this.generateAttrIfExists(header, 'title', 'data-lm-h-title');
        this.generateAttrIfExists(header, 'titleTag', 'data-lm-h-title-tag');
        this.generateAttrIfExists(header, 'content', 'data-lm-h-content');
        this.generateAttrIfExists(header, 'cssClass', 'data-lm-h-css-class');
        this.generateAttrIfExists(header, 'inlineStyles', 'data-lm-h-inline-styles');

    }

    /**
     * Footer attrs ...
     *
     */

    generateFooterAttrs() {

        /**
         * If footer param is not set, we will assume that footer
         * is disabled.
         */

        if (!this.#modalParams.hasOwnProperty('footer')) {

            return;
        }

        let footer = this.#modalParams.footer as Partial<ModalFooterParams>;

        if (!footer.hasOwnProperty('enabled') || !footer.enabled) {
            return;
        }

        /**
         * Was footer manually disabled by passing false to enabled property?
         */

        this.#attrs['data-lm-f-enabled'] = 1;

        // region [Mode]

        if (footer.hasOwnProperty('mode') && footer.mode !== 'alert') {
            this.#attrs['data-lm-f-mode'] = footer.mode;
        }

        // endregion

        // region [Content, in custom mode ...]

        if (footer.mode === 'custom') {
            if (footer.hasOwnProperty('content')) {
                this.#attrs['data-lm-f-content'] = footer.content;
            }
        }

        // endregion

        // region [Css Class]

        if (footer.hasOwnProperty('cssClass')) {
            this.generateAttrIfExists(footer, 'cssClass', 'data-lm-f-css-class');
        }

        // endregion

        // region [Inline Styles ...]

        if (footer.hasOwnProperty('inlineStyles')) {
            this.generateAttrIfExists(footer, 'inlineStyles', 'data-lm-f-inline-styles');
        }

        // endregion

        // region [CallBack: onOk]

        if (footer.hasOwnProperty('onOk')) {
            if (typeof footer.onOk === 'string') {
                this.generateAttrIfExists(footer, 'onOk', 'data-lm-f-on-ok');
            }
        }

        // endregion

        // region [Template ID]

        if (footer.hasOwnProperty('templateId')) {
            this.generateAttrIfExists(footer, 'templateId', 'data-lm-f-template-id');
        }

        // endregion

        // region [Ok Button]

        if (footer.hasOwnProperty('okButton')) {

            let okBtn = _.objValueAsObject(footer,'okButton');

            let text = _.objValueAsString(okBtn,'text');

            if(text !== 'Ok') {
                this.#attrs['data-lm-f-ok-btn-text'] = text;
            }


            this.generateAttrIfExists(okBtn, 'cssClass', 'data-lm-f-ok-btn-css-class');
            this.generateAttrIfExists(okBtn, 'inlineStyles', 'data-lm-f-ok-btn-inline-styles');
            this.generateAttrIfExists(okBtn, 'iconClass', 'data-lm-f-ok-btn-icon-class');

            let iconPosition = _.objValueAsString(okBtn,'iconPosition');

            if(iconPosition && iconPosition !== 'left') {
                this.#attrs['data-lm-f-ok-btn-icon-position'] = iconPosition;
            }



        }

        // endregion

        // region [Close Button ...]

        if (footer.hasOwnProperty('closeButton')) {

            let closeBtn = footer.closeButton;

            let text = _.objValueAsString(closeBtn, 'text');

            if (text !== 'Close') {
                this.#attrs['data-lm-f-close-btn-text'] = text;
            }

            this.generateAttrIfExists(closeBtn as any, 'text', 'data-lm-f-close-btn-text');
            this.generateAttrIfExists(closeBtn as any, 'cssClass', 'data-lm-f-close-btn-css-class');
            this.generateAttrIfExists(closeBtn as any, 'inlineStyles', 'data-lm-f-close-btn-inline-styles');
            this.generateAttrIfExists(closeBtn as any, 'iconClass', 'data-lm-f-close-btn-icon-class');

            let iconPosition = _.objValueAsString(closeBtn, 'iconPosition');

            if (iconPosition && iconPosition !== 'left') {
                this.#attrs['data-lm-f-close-btn-icon-position'] = iconPosition;
            }

        }

        // endregion

    }

    /**
     * Generate body attribute ...
     *
     */

    generateBodyAttrs() {

        if (!this.#modalParams.body) {

            this.#attrs['data-lm-b-content-type'] = 'html';
            this.#attrs['data-lm-b-content'] = 'Please provide modal body content!';


            return;

        }

        let body = this.#modalParams.body as Partial<ModalBodyParams>;

        // region [No Padding]

        if(this.#modalParams.body.noPadding) {
            this.#attrs['data-lm-b-no-padding'] = 1;
        }

        // endregion

        // region [Css Class]

        this.generateAttrIfExists(body, 'cssClass', 'data-lm-b-css-class');

        // endregion

        // region [Content Type: Validate and enforce a valid value ...]

        if (!body.hasOwnProperty('contentType')) {
            body.contentType = 'html';
        } else if (!ModalParameterParser.isValidBodyContentType(body.contentType as string)) {
            body.contentType = 'html';
        }

        this.generateAttrIfExists(body, 'contentType', 'data-lm-b-content-type');

        // endregion


        if (body.contentType === 'html') {

            /**
             * If content text or html is empty, set a wraning message ...
             */

            let content = _.objValueAsString(body, 'content');

            if (!content) {
                body.content = 'Please provide modal body content';
            }

            this.generateAttrIfExists(body, 'content', 'data-lm-b-content');

        } else if (body.contentType === 'function') {

            if(typeof body.functionName === "string") {

                this.generateAttrIfExists(body, 'functionName', 'data-lm-b-function-name');

            }

            if(body.functionArguments) {
                this.#attrs['data-lm-b-function-args'] = JSON.stringify(body.functionArguments);
            }


        } else if (body.contentType === 'iframe') {

            this.generateAttrIfExists(body, 'iframeCode', 'data-lm-b-iframe-code');

        } else if (body.contentType === 'template') {

            this.generateAttrIfExists(body, 'templateId', 'data-lm-b-template-id');

        } else if (body.contentType === 'image') {

            if (body.imageParams) {

                let ip = body.imageParams;

                this.generateAttrIfExists(ip, 'url', 'data-lm-b-image-url');
                this.generateAttrIfExists(ip, 'title', 'data-lm-b-image-title');
                this.generateAttrIfExists(ip, 'alt', 'data-lm-b-image-alt');
                this.generateAttrIfExists(ip, 'cssClass', 'data-lm-b-image-css-class');
                this.generateAttrIfExists(ip, 'inlineStyles', 'data-lm-b-image-inline-styles');
                this.generateAttrIfExists(ip, 'caption', 'data-lm-b-image-caption');
                this.generateAttrIfExists(ip, 'captionTemplate', 'data-lm-b-image-caption-template');
                this.generateAttrIfExists(ip, 'captionCssClass', 'data-lm-b-image-caption-css-class');

            }

        } else if (body.contentType === 'youtube-video') {

            this.generateAttrIfExists(body, 'videoUrl', 'data-lm-b-video-url');

        } else if (body.contentType === 'ajax') {

            if (body.ajaxParams) {

                let ajax = body.ajaxParams;

                let url = ajax.url.trim();

                if (url !== '') {

                    this.generateAttrIfExists(ajax, 'url', 'data-lm-b-ajax-url');

                    this.generateAttrIfExists(ajax, 'contentDataType', 'data-lm-b-ajax-content-data-type');
                    this.generateAttrIfExists(ajax, 'method', 'data-lm-b-ajax-method');

                    if (typeof ajax.data !== "undefined" && ajax.data !== null) {
                        this.#attrs['data-lm-b-ajax-data'] = _.unicodeB64Encode(JSON.stringify(ajax.data));
                    }

                    this.generateAttrIfExists(ajax, 'decodeParams', 'data-lm-b-decode-params');

                    if (typeof ajax.headers !== "undefined" && ajax.headers !== null) {
                        this.#attrs['data-lm-b-ajax-headers'] = _.unicodeB64Encode(JSON.stringify(ajax.headers));
                    }

                    this.generateAttrIfExists(ajax, 'timeoutMs', 'data-lm-b-ajax-timeout-ms');

                    if (ajax.contentDataType === 'json') {
                        if (typeof ajax.transformJson === 'string') {
                            this.generateAttrIfExists(ajax, 'transformJson', 'data-lm-b-ajax-transform-json');
                        }
                    }

                    if (ajax.contentDataType === 'html') {
                        if (typeof ajax.transformHtml === 'string') {
                            this.generateAttrIfExists(ajax, 'transformHtml', 'data-lm-b-ajax-transform-html');
                        }
                    }


                }


            }


        }

        /**
         * Aspect ration ...
         */

        this.generateAttrIfExists(body, 'aspectRatio', 'data-lm-b-aspect-ratio');

        /**
         * Transformer ...
         */

        if (typeof body.transformer === 'string') {
            this.generateAttrIfExists(body, 'transformer', 'data-lm-b-transformer');
        }

    }

    generateAttrIfExists(sourceObj: Record<any, any>, key: string, attrName: string) {

        if (!sourceObj.hasOwnProperty(key)) {
            return;
        }

        if (typeof sourceObj[key] === "boolean") {
            this.#attrs[attrName] = sourceObj[key] ? 1 : 0;
        } else {
            this.#attrs[attrName] = _.objValueAsString(sourceObj, key);
        }


    }

}