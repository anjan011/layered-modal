import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams} from "./../../interfaces/modal";
import _ from './../../utils/mixins';
import {HtmlAttributeGenerator} from "../../generators/html-attribute-generator";
import HtmlEncoder from "./../../utils/html-encoder";

export default class ModalParam2DataAttrs {

    /**
     * Generates the HTML attribute string from the generated object ...
     *
     * @param params
     */

    generateString(params: Partial<ModalParams>): string {

        let attrGen = new HtmlAttributeGenerator();

        return attrGen.generateAttributes(this.generateObject(params));

    }

    /**
     * Generate an object containing from modal params.
     *
     * @param params
     */

    generateObject(params: Partial<ModalParams>): Record<string, string> {

        let attrs: Record<any, any> = {
            'data-lms-trigger': 1,
        };

        /**
         * Transition Duration ...
         */

        if (params.transitionDuration) {
            this.generateAttrIfExists(attrs, params, 'transitionDuration', 'data-lm-transition-duration');
        }

        /**
         * Modal css class ...
         */

        if (params.cssClass) {
            this.generateAttrIfExists(attrs, params, 'cssClass', 'data-lm-css-class');
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

            this.generateFooterAttrs(params.footer as Partial<ModalFooterParams>, attrs);

        }

        /**
         * Body ...
         */

        if (params.hasOwnProperty('body')) {

            this.generateBodyAttrs(params.body as Partial<ModalBodyParams>, attrs);
        }

        console.log(attrs);

        return attrs;

    }

    /**
     * Header attrs ...
     *
     * @param header
     * @param attrs
     */

    generateHeaderAttrs(header: Partial<ModalHeaderParams>, attrs: Record<any, any>) {

        attrs['data-lm-h-enabled'] = header.enabled ? 1 : 0;

        if (!header.enabled) {
            return;
        }

        attrs['data-lm-h-title'] = header.title;
        attrs['data-lm-h-title-tag'] = header.titleTag;
        attrs['data-lm-h-content'] = header.content;
        attrs['data-lm-h-css-class'] = header.cssClass;
        attrs['data-lm-h-inline-styles'] = header.inlineStyles;

    }

    /**
     * Footer attrs ...
     *
     * @param footer
     * @param attrs
     */

    generateFooterAttrs(footer: Partial<ModalFooterParams>, attrs: Record<any, any>) {

        attrs['data-lm-f-enabled'] = footer.enabled ? 1 : 0;

        if (!footer.enabled) {
            return;
        }

        attrs['data-lm-f-mode'] = footer.mode;
        attrs['data-lm-f-content'] = footer.content;
        attrs['data-lm-f-css-class'] = footer.cssClass;
        attrs['data-lm-f-inline-styles'] = footer.inlineStyles;


        if (footer.hasOwnProperty('onOk')) {
            if (typeof footer.onOk === 'string') {
                attrs['data-lm-f-on-ok'] = footer.onOk;
            }
        }

        if (footer.templateId) {
            attrs['data-lm-f-template-id'] = footer.templateId;
        }

        // region [Ok Button]

        if (footer.okButton) {

            let okBtn = footer.okButton;

            if (okBtn.text) {
                attrs['data-lm-f-ok-btn-text'] = footer.okButton.text;
            }

            if (okBtn.cssClass) {
                attrs['data-lm-f-ok-btn-css-class'] = footer.okButton.cssClass;
            }

            if (okBtn.inlineStyles) {
                attrs['data-lm-f-ok-btn-inline-styles'] = footer.okButton.inlineStyles;
            }

            if (okBtn.iconClass) {
                attrs['data-lm-f-ok-btn-icon-class'] = footer.okButton.iconClass;
            }

            if (okBtn.iconPosition) {
                attrs['data-lm-f-ok-btn-icon-position'] = footer.okButton.iconPosition;
            }

        }

        // endregion

        // region [Close Button ...]

        if (footer.closeButton) {

            let closeBtn = footer.closeButton;

            if (closeBtn.text) {
                attrs['data-lm-f-close-btn-text'] = closeBtn.text;
            }

            if (closeBtn.cssClass) {
                attrs['data-lm-f-close-btn-css-class'] = closeBtn.cssClass;
            }

            if (closeBtn.inlineStyles) {
                attrs['data-lm-f-close-btn-inline-styles'] = closeBtn.inlineStyles;
            }

            if (closeBtn.iconClass) {
                attrs['data-lm-f-close-btn-icon-class'] = closeBtn.iconClass;
            }

            if (closeBtn.iconPosition) {
                attrs['data-lm-f-close-btn-icon-position'] = closeBtn.iconPosition;
            }

        }

        // endregion

    }

    /**
     * Generate body attribute ...
     *
     * @param body
     * @param attrs
     */

    generateBodyAttrs(body: Partial<ModalBodyParams>, attrs: Record<any, any>) {

        attrs['data-lm-b-content-type'] = _.objValueAsString(body, 'contentType', 'html');
        attrs['data-lm-b-css-class'] = _.objValueAsString(body, 'cssClass');

        if (body.contentType === 'html') {

            attrs['data-lm-b-content'] = _.objValueAsString(body, 'content');

        } else if (body.contentType === 'template') {

            this.generateAttrIfExists(attrs, body, 'templateId', 'data-lm-b-template-id');

        } else if (body.contentType === 'image') {

            if (body.imageParams) {

                let ip = body.imageParams;

                this.generateAttrIfExists(attrs, ip, 'url', 'data-lm-b-image-url');
                this.generateAttrIfExists(attrs, ip, 'title', 'data-lm-b-image-title');
                this.generateAttrIfExists(attrs, ip, 'alt', 'data-lm-b-image-alt');
                this.generateAttrIfExists(attrs, ip, 'cssClass', 'data-lm-b-image-css-class');
                this.generateAttrIfExists(attrs, ip, 'inlineStyles', 'data-lm-b-image-inline-styles');
                this.generateAttrIfExists(attrs, ip, 'caption', 'data-lm-b-image-caption');
                this.generateAttrIfExists(attrs, ip, 'captionTemplate', 'data-lm-b-image-caption-template');
                this.generateAttrIfExists(attrs, ip, 'captionCssClass', 'data-lm-b-image-caption-css-class');

            }

        } else if (body.contentType === 'youtube-video') {

            this.generateAttrIfExists(attrs, body, 'videoUrl', 'data-lm-b-video-url');

        } else if(body.contentType === 'ajax') {

            if(body.ajaxParams) {

                let ajax = body.ajaxParams;

                let url = ajax.url.trim();

                if(url !== '') {

                    attrs['data-lm-b-ajax-url'] = url;

                    this.generateAttrIfExists(attrs, ajax, 'contentDataType', 'data-lm-b-ajax-content-data-type');
                    this.generateAttrIfExists(attrs, ajax, 'method', 'data-lm-b-ajax-method');

                    if(typeof ajax.data !== "undefined" && ajax.data !== null) {
                        attrs['data-lm-b-ajax-data'] = _.unicodeB64Encode(JSON.stringify(ajax.data));
                    }

                    this.generateAttrIfExists(attrs, ajax, 'decodeParams', 'data-lm-b-decode-params');

                    if (typeof ajax.headers !== "undefined" && ajax.headers !== null) {
                        attrs['data-lm-b-ajax-headers'] = _.unicodeB64Encode(JSON.stringify(ajax.headers));
                    }

                    this.generateAttrIfExists(attrs, ajax, 'timeoutMs', 'data-lm-b-ajax-timeout-ms');

                    if(typeof ajax.transformJson === 'string') {
                        this.generateAttrIfExists(attrs, ajax, 'transformJson', 'data-lm-b-ajax-transform-json');
                    }

                    if (typeof ajax.transformHtml === 'string') {
                        this.generateAttrIfExists(attrs, ajax, 'transformHtml', 'data-lm-b-ajax-transform-html');
                    }
                }



            }


        }

        /**
         * Aspect ration ...
         */

        this.generateAttrIfExists(attrs, body, 'aspectRatio', 'data-lm-b-aspect-ratio');

        /**
         * Transformer ...
         */

        if (typeof body.transformer === 'string') {
            this.generateAttrIfExists(attrs, body, 'transformer', 'data-lm-b-transformer');
        }

        console.log('%c%s', 'color: red;background-color: yellow;font-size: 1.2em;', 'generateBodyAttrs() called ...');

    }

    generateAttrIfExists(attrs: Record<any, any>, sourceObj: Record<any, any>, key: string, attrName: string) {

        if (!sourceObj.hasOwnProperty(key)) {
            return;
        }

        attrs[attrName] = _.objValueAsString(sourceObj, key);

    }

}