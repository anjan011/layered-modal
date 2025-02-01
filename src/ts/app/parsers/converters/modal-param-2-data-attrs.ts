import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams} from "./../../interfaces/modal";
import _ from './../../utils/mixins';
import {HtmlAttributeGenerator} from "../../generators/html-attribute-generator";

export default class ModalParam2DataAttrs {

    /**
     * Attributes holder ...
     *
     * @private
     */

    #attrs : Record<string, any> = {
        'data-lms-trigger' : '1'
    };

    /**
     * Source modal params ...
     *
     * @private
     */

    #modalParams : Partial<ModalParams> = {};

    /**
     * Gets attributes ...
     */

    getAttrs() : Record<string, any> {
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
                _.objValueAsObject(params,'attrs') as Record<string, any>,
            ...{
                'data-lms-trigger' : 1
            }};

        this.#modalParams = _.objValueAsObject(params,'modalParams') as Partial<ModalParams>;

    }

    /**
     * Generates the HTML attribute string from the generated object ...
     *
     */

    generateString(): string {

        let attrGen = new HtmlAttributeGenerator();

        return attrGen.generateAttributes(this.generateObject(),'\n');

    }

    /**
     * Generate an object containing from modal params.
     *
     */

    generateObject(): Record<string, string> {

        let params = this.#modalParams;

        let attrs = this.#attrs;

        /**
         * ID
         */

        if(!_.isValidGUID(params.id as string) && params.id) {
            this.#attrs['data-lm-id'] = params.id;
        }

        /**
         * Transition Duration ...
         */

        if (params.transitionDuration) {
            this.generateAttrIfExists(params, 'transitionDuration', 'data-lm-transition-duration');
        }

        /**
         * Modal css class ...
         */

        if (params.cssClass) {
            this.generateAttrIfExists(params, 'cssClass', 'data-lm-css-class');
        }

        /**
         * Widths ...
         */

        if (params.hasOwnProperty('autoWidth')) {
            attrs['data-lm-auto-width'] = params.autoWidth ? 1 : 0;
        }

        if (params.hasOwnProperty('width')) {

            attrs['data-lm-width-value'] = params.width?.value;
            attrs['data-lm-width-unit'] = params.width?.unit;

        }

        if (params.hasOwnProperty('minWidth')) {

            attrs['data-lm-min-width-value'] = params.minWidth?.value;
            attrs['data-lm-min-width-unit'] = params.minWidth?.unit;

        }

        if (params.hasOwnProperty('maxWidth')) {

            attrs['data-lm-max-width-value'] = params.maxWidth?.value;
            attrs['data-lm-max-width-unit'] = params.maxWidth?.unit;

        }

        /**
         * Heights ...
         */

        if (params.hasOwnProperty('autoHeight')) {
            attrs['data-lm-auto-height'] = params.autoHeight ? 1 : 0;
        }


        if (params.hasOwnProperty('height')) {

            attrs['data-lm-height-value'] = params.height?.value;
            attrs['data-lm-height-unit'] = params.height?.unit;

        }

        if (params.hasOwnProperty('minHeight')) {

            attrs['data-lm-min-height-value'] = params.minHeight?.value;
            attrs['data-lm-min-height-unit'] = params.minHeight?.unit;

        }

        if (params.hasOwnProperty('maxHeight')) {

            attrs['data-lm-max-height-value'] = params.maxHeight?.value;
            attrs['data-lm-max-height-unit'] = params.maxHeight?.unit;

        }

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

        /**
         * Header ...
         */

        if (params.hasOwnProperty('header')) {

            this.generateHeaderAttrs(params.header as Partial<ModalHeaderParams>, attrs);

        }

        /**
         * Footer ...
         */

        if (params.hasOwnProperty('footer')) {

            this.generateFooterAttrs();

        }

        /**
         * Body ...
         */

        if (params.hasOwnProperty('body')) {

            this.generateBodyAttrs();
        }

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

        this.generateAttrIfExists(header,'title','data-lm-h-title');
        this.generateAttrIfExists(header,'titleTag','data-lm-h-title-tag');
        this.generateAttrIfExists(header,'content','data-lm-h-content');
        this.generateAttrIfExists(header,'cssClass','data-lm-h-css-class');
        this.generateAttrIfExists(header,'inlineStyles','data-lm-h-inline-styles');

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

        if(!this.#modalParams.hasOwnProperty('footer')) {

            this.#attrs['data-lm-f-enabled'] = 0;

            return;
        }

        let footer = this.#modalParams.footer as Partial<ModalFooterParams>;

        /**
         * Was footer manually disabled by passing false to enabled property?
         */

        this.#attrs['data-lm-f-enabled'] = footer.enabled ? 1 : 0;

        /**
         * If footer is disabled, skip entire process.
         */

        if (!footer.enabled) {
            return;
        }

        this.generateAttrIfExists(footer,'mode','data-lm-f-mode');
        this.generateAttrIfExists(footer,'content','data-lm-f-content');
        this.generateAttrIfExists(footer,'cssClass','data-lm-f-css-class');
        this.generateAttrIfExists(footer,'inlineStyles','data-lm-f-inline-styles');


        if (footer.hasOwnProperty('onOk')) {
            if (typeof footer.onOk === 'string') {
                this.generateAttrIfExists(footer,'onOk','data-lm-f-on-ok');
            }
        }

        if (footer.templateId) {
            this.generateAttrIfExists(footer,'templateId','data-lm-f-template-id');
        }

        // region [Ok Button]

        if (footer.okButton) {

            let okBtn = footer.okButton;

            this.generateAttrIfExists(okBtn,'text','data-lm-f-ok-btn-text');
            this.generateAttrIfExists(okBtn,'cssClass','data-lm-f-ok-btn-css-class');
            this.generateAttrIfExists(okBtn,'inlineStyles','data-lm-f-ok-btn-inline-styles');
            this.generateAttrIfExists(okBtn,'iconClass','data-lm-f-ok-btn-icon-class');
            this.generateAttrIfExists(okBtn,'iconPosition','data-lm-f-ok-btn-icon-position');

        }

        // endregion

        // region [Close Button ...]

        if (footer.closeButton) {

            let closeBtn = footer.closeButton;

            this.generateAttrIfExists(closeBtn, 'text', 'data-lm-f-close-btn-text');
            this.generateAttrIfExists(closeBtn, 'cssClass', 'data-lm-f-close-btn-css-class');
            this.generateAttrIfExists(closeBtn, 'inlineStyles', 'data-lm-f-close-btn-inline-styles');
            this.generateAttrIfExists(closeBtn, 'iconClass', 'data-lm-f-close-btn-icon-class');
            this.generateAttrIfExists(closeBtn, 'iconPosition', 'data-lm-f-close-btn-icon-position');

        }

        // endregion

    }

    /**
     * Generate body attribute ...
     *
     */

    generateBodyAttrs() {

        let body = this.#modalParams.body as Partial<ModalBodyParams>;

        this.generateAttrIfExists(body,'contentType','data-lm-b-content-type');
        this.generateAttrIfExists(body,'cssClass','data-lm-b-css-class');

        if (body.contentType === 'html') {

            this.generateAttrIfExists(body,'content','data-lm-b-content');

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

        } else if(body.contentType === 'ajax') {

            if(body.ajaxParams) {

                let ajax = body.ajaxParams;

                let url = ajax.url.trim();

                if(url !== '') {

                    this.generateAttrIfExists(ajax,'url','data-lm-b-ajax-url');

                    this.generateAttrIfExists(ajax, 'contentDataType', 'data-lm-b-ajax-content-data-type');
                    this.generateAttrIfExists(ajax, 'method', 'data-lm-b-ajax-method');

                    if(typeof ajax.data !== "undefined" && ajax.data !== null) {
                        this.#attrs['data-lm-b-ajax-data'] = _.unicodeB64Encode(JSON.stringify(ajax.data));
                    }

                    this.generateAttrIfExists(ajax, 'decodeParams', 'data-lm-b-decode-params');

                    if (typeof ajax.headers !== "undefined" && ajax.headers !== null) {
                        this.#attrs['data-lm-b-ajax-headers'] = _.unicodeB64Encode(JSON.stringify(ajax.headers));
                    }

                    this.generateAttrIfExists(ajax, 'timeoutMs', 'data-lm-b-ajax-timeout-ms');

                    if(ajax.contentDataType === 'json') {
                        if (typeof ajax.transformJson === 'string') {
                            this.generateAttrIfExists(ajax, 'transformJson', 'data-lm-b-ajax-transform-json');
                        }
                    }

                    if(ajax.contentDataType === 'html') {
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

        this.#attrs[attrName] = _.objValueAsString(sourceObj, key);

    }

}