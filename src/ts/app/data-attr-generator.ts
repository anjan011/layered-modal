import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams} from "./interfaces/modal";
import _ from './utils/mixins';
import {HtmlAttributeGenerator} from "./generators/html-attribute-generator";

export default class DataAttrGenerator {

    static generateString(params: Partial<ModalParams>): string {

        let attrGen = new HtmlAttributeGenerator();

        return attrGen.generateAttributes(DataAttrGenerator.generateObject(params));

    }

    static generateObject(params: Partial<ModalParams>): object {

        let attrs: Record<any, any> = {
            'data-lms-trigger': 1,
        };

        /**
         * Transition Duration ...
         */

        if (params.transitionDuration) {
            attrs['data-lm-transition-duration'] = params.transitionDuration;
        }

        /**
         * Modal css class ...
         */

        if (params.cssClass) {
            attrs['data-lm-css-class'] = params.cssClass;
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

            DataAttrGenerator.generateBodyAttrs(params.header as Partial<ModalHeaderParams>, attrs);

        }

        /**
         * Footer ...
         */

        if (params.hasOwnProperty('footer')) {

            DataAttrGenerator.generateBodyAttrs(params.footer as Partial<ModalFooterParams>,attrs);

        }

        /**
         * Body ...
         */

        if (params.hasOwnProperty('body')) {

            DataAttrGenerator.generateBodyAttrs(params.body as Partial<ModalBodyParams>, attrs);
        }

        return attrs;

    }

    static generateHeaderAttrs(header: Partial<ModalHeaderParams>, attrs: Record<any, any>) {

        attrs['data-lm-h-enabled'] = header.enabled ? 1 : 0;

        if(!header.enabled) {
            return;
        }

        attrs['data-lm-h-title'] = header.title;
        attrs['data-lm-h-title-tag'] = header.titleTag;
        attrs['data-lm-h-content'] = header.content;
        attrs['data-lm-h-css-class'] = header.cssClass;
        attrs['data-lm-h-inline-styles'] = header.inlineStyles;

    }

    static generateFooterAttrs(footer: Partial<ModalFooterParams>, attrs: Record<any, any>) {

        attrs['data-lm-f-enabled'] = footer.enabled ? 1 : 0;

        if(!footer.enabled) {
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

    static generateBodyAttrs(body : Partial<ModalBodyParams>, attrs : Record<any, any>) {

        attrs['data-lm-b-content-type'] = _.objValueAsString(body,'contentType','html');
        attrs['data-lm-b-css-class'] = _.objValueAsString(body,'cssClass');

        if(body.contentType === 'html') {
            attrs['data-lm-b-content'] = _.objValueAsString(body, 'content');
        } else if (body.contentType === 'template') {

            attrs['data-lm-b-template-id'] = _.objValueAsString(body, 'templateId');
        } else if(body.contentType === 'image') {

            if(body.imageParams) {

                let ip = body.imageParams;

                DataAttrGenerator.generateAttrIfExists(attrs,ip,'url','data-lm-b-image-url');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'title','data-lm-b-image-title');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'alt','data-lm-b-image-alt');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'cssClass','data-lm-b-image-css-class');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'inlineStyles','data-lm-b-image-inline-styles');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'caption','data-lm-b-image-caption');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'captionTemplate','data-lm-b-image-caption-template');
                DataAttrGenerator.generateAttrIfExists(attrs,ip,'captionCssClass','data-lm-b-image-caption-css-class');

            }

        } else if (body.contentType === 'youtube-video') {

            DataAttrGenerator.generateAttrIfExists(attrs, body, 'videoUrl', 'data-lm-b-video-url');

        }

        /**
         * Aspect ration ...
         */

        DataAttrGenerator.generateAttrIfExists(attrs, body, 'aspectRatio', 'data-lm-b-aspect-ratio');

        /**
         * Transformer ...
         */

        if(typeof body.transformer === 'string') {
            DataAttrGenerator.generateAttrIfExists(attrs, body, 'transformer', 'data-lm-b-transformer');
        }



    }

    static generateAttrIfExists(attrs : Record<any, any>,sourceObj : Record<any, any>,key: string,attrName : string) {

        if(!sourceObj.hasOwnProperty(key)) {
            return;
        }

        attrs[attrName] = _.objValueAsString(sourceObj,key);

    }

}