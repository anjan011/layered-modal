import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams} from "../../interfaces/modal";
import _ from "../../utils/mixins";
import ModalParameterParser from "../parameters/modal-parameter-parser";
import {AjaxParams, ButtonParams, Dimension, ImageParams} from "../../interfaces/common";
import {DomUtils} from "../../utils/dom";

/**
 * This class converts data attributes object to Modal params
 */

export default class DataAttrs2ModalParam {

    #attrs: Record<any, any> = {};

    #modalParams: Partial<ModalParams> = {};

    constructor(attrs: Record<any, any> = {}) {
        this.#attrs = attrs;

        this.#modalParams = {
            body: {
                contentType: 'html',
                content: 'Please provide modal content'
            }
        };
    }

    /**
     * Main function to initialize the parsing and returning the
     * final modal params object ...
     */

    generate(): ModalParams {

        /**
         * Generate top level non object params ...
         */

        this.generateOtherParams();

        /**
         * Generate callbacks, that are direct properties
         * of modal params object ...
         */

        this.generateCallbacks();

        /**
         * Header params ...
         */

        this.generateHeader();

        /**
         * Footer params ...
         */

        this.generateFooter();

        /**
         * Body params ...
         */

        this.generateBody();

        let attrs = this.#attrs;


        let modalParams: Partial<ModalParams> = {};

        // region [Modal widths]

        let autoWidth = true;

        if (attrs.hasOwnProperty('lm-auto-width')) {
            autoWidth = _.objValueAsIntFlag(attrs, 'lm-auto-width', 1) > 0;
        }

        modalParams.autoWidth = autoWidth;

        let width: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-width-value')) {
            width.value = _.objValueAsFloat(attrs, 'lm-width-value');
            width.unit = _.objValueAsString(attrs, 'lm-width-unit', 'px');

            modalParams.width = width as Dimension;

        }

        let maxWidth: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-max-width-value')) {
            maxWidth.value = _.objValueAsFloat(attrs, 'lm-max-width-value', 100);
            maxWidth.unit = _.objValueAsString(attrs, 'lm-max-width-unit', '%');

            modalParams.maxWidth = maxWidth as Dimension;

        }

        let minWidth: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-min-width-value')) {
            minWidth.value = _.objValueAsFloat(attrs, 'lm-min-width-value', 0);
            minWidth.unit = _.objValueAsString(attrs, 'lm-min-width-unit', 'px');

            modalParams.minWidth = minWidth as Dimension;

        }

        // endregion

        // region [Modal heights]

        let autoHeight = true;

        if (attrs.hasOwnProperty('lm-auto-height')) {
            autoHeight = _.objValueAsIntFlag(attrs, 'lm-auto-height', 1) > 0;
        }

        modalParams.autoHeight = autoHeight;


        let height: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-height-value')) {
            height.value = _.objValueAsFloat(attrs, 'lm-height-value');
            height.unit = _.objValueAsString(attrs, 'lm-height-unit', 'px');

            modalParams.height = height as Dimension;
        }

        let maxHeight: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-max-height-value')) {
            maxHeight.value = _.objValueAsFloat(attrs, 'lm-max-height-value', 100);
            maxHeight.unit = _.objValueAsString(attrs, 'lm-max-height-unit', '%');

            modalParams.maxHeight = maxHeight as Dimension;
        }

        let minHeight: Partial<Dimension> = {};

        if (attrs.hasOwnProperty('lm-min-height-value')) {
            minHeight.value = _.objValueAsFloat(attrs, 'lm-min-height-value', 0);
            minHeight.unit = _.objValueAsString(attrs, 'lm-min-height-unit', 'px');

            modalParams.minHeight = minHeight as Dimension;

        }

        // endregion

        return this.#modalParams as ModalParams;

    }

    /**
     * Direct non object params for the modal ...
     */

    generateOtherParams() {

        /**
         * Instance ID ...
         */

        if (this.#attrs.hasOwnProperty('lm-id')) {

            let id = _.objValueAsString(this.#attrs, 'lm-id');

            if (id) {
                this.#modalParams.id = id;
            }


        }

        /**
         * Modal position ...
         */

        if (this.#attrs.hasOwnProperty('lm-position')) {

            let position = _.objValueAsString(this.#attrs, 'lm-position');

            if (ModalParameterParser.isValidPosition(position)) {
                this.#modalParams.position = position;
            } else {
                this.#modalParams.position = 'middle-center';
            }


        }

        /**
         * Css class object ...
         */

        let cssClassAttrs = [
            'lm-modal-css-class',
            'lm-modal-ok-css-class',
            'lm-modal-close-css-class',
        ];

        if (_.hasAnyProperty(this.#attrs, cssClassAttrs)) {

            if (!this.#modalParams.hasOwnProperty('cssClass')) {
                this.#modalParams.cssClass = {};
            } else {
                this.#modalParams.cssClass = _.objValueAsObject(this.#modalParams, 'cssClass');
            }

            let cssClass = this.#modalParams.cssClass as {
                modal?: string,
                modalOk?: string,
                modalClose?: string
            };

            if (this.#attrs.hasOwnProperty('lm-modal-css-class')) {

                let modalCssClass = _.objValueAsString(this.#attrs, 'lm-modal-css-class');

                if (modalCssClass) {
                    cssClass.modal = modalCssClass;
                }


            }

            if (this.#attrs.hasOwnProperty('lm-modal-ok-css-class')) {

                let modalOkCssClass = _.objValueAsString(this.#attrs, 'lm-modal-ok-css-class');

                if (modalOkCssClass) {
                    cssClass.modalOk = modalOkCssClass;
                }


            }

            if (this.#attrs.hasOwnProperty('lm-modal-close-css-class')) {

                let modalCloseCssClass = _.objValueAsString(this.#attrs, 'lm-modal-close-css-class');

                if (modalCloseCssClass) {
                    cssClass.modalClose = modalCloseCssClass;
                }


            }

        }


        /**
         * Disable escape key ..
         */

        if (this.#attrs.hasOwnProperty('lm-disable-esc')) {

            let disableEsc = _.objValueAsInt(this.#attrs, 'lm-disable-esc', 0);

            if (disableEsc > 0) {
                this.#modalParams.disableEscKey = true;
            }

        }

        /**
         * Close on outside click ..
         */

        if (this.#attrs.hasOwnProperty('lm-close-on-outside-click')) {

            let closeOnOutsideClick = _.objValueAsInt(this.#attrs,
                'lm-close-on-outside-click', 0);

            if (closeOnOutsideClick > 0) {
                this.#modalParams.closeOnOutsideMouseClick = true;
            }

        }

        /**
         * Aspect ratio ...
         */

        if (this.#attrs.hasOwnProperty('lm-aspect-ratio')) {

            let aspectRatio = _.objValueAsFloat(this.#attrs, 'lm-aspect-ratio');

            if (aspectRatio > 0) {
                this.#modalParams.aspectRatio = aspectRatio;
            }

        }


        /**
         * user select ..
         */

        if (this.#attrs.hasOwnProperty('lm-user-select')) {

            let userSelect = _.objValueAsInt(this.#attrs,
                'lm-user-select', 0);

            if (userSelect > 0) {
                this.#modalParams.userSelect = true;
            }

        }

    }

    /**
     * generate modal callbacks ...
     */

    generateCallbacks() {

        /**
         * On Show ...
         */

        if (this.#attrs.hasOwnProperty('lm-on-show')) {

            let fn = _.objValueAsString(this.#attrs, 'lm-on-show');

            if (fn) {
                this.#modalParams.onShow = fn;
            }

        }

        /**
         * On Before Show ...
         */

        if (this.#attrs.hasOwnProperty('lm-on-before-show')) {

            let fn = _.objValueAsString(this.#attrs, 'lm-on-before-show');

            if (fn) {
                this.#modalParams.onBeforeShow = fn;
            }

        }

        /**
         * On Hide ...
         */

        if (this.#attrs.hasOwnProperty('lm-on-hide')) {

            let fn = _.objValueAsString(this.#attrs, 'lm-on-hide');

            if (fn) {
                this.#modalParams.onHide = fn;
            }

        }

        /**
         * On before Hide ...
         */

        if (this.#attrs.hasOwnProperty('lm-on-before-hide')) {

            let fn = _.objValueAsString(this.#attrs, 'lm-on-before-hide');

            if (fn) {
                this.#modalParams.onBeforeHide = fn;
            }

        }

    }

    /**
     * Header params ...
     */

    generateHeader() {

        /**
         * If the enabled field is not present or value is set to 0,
         * ignore everything else
         */

        // region [Enabled]

        if (!this.#attrs.hasOwnProperty('lm-h-enabled')) {
            delete this.#modalParams.header;
            return;
        }

        let enabled = _.objValueAsInt(this.#attrs, 'lm-h-enabled', 0) > 0;

        if (!enabled) {
            delete this.#modalParams.header;
            return;
        }

        if (!this.#modalParams.hasOwnProperty('header')) {
            this.#modalParams.header = {} as ModalHeaderParams;
        } else {
            this.#modalParams.header = _.objValueAsObject(this.#modalParams, 'header') as ModalHeaderParams;
        }

        let header = this.#modalParams.header;

        header.enabled = true;

        // endregion

        // region [Title]

        if (this.#attrs.hasOwnProperty('lm-h-title')) {

            let title = _.objValueAsString(this.#attrs, 'lm-h-title');

            if (!title) {
                title = 'Modal title not specified';
            }

            header.title = title;

        }

        // endregion

        // region [Title tag]

        if (this.#attrs.hasOwnProperty('lm-h-title-tag')) {

            let titleTag = _.objValueAsString(this.#attrs, 'lm-h-title-tag');

            if (titleTag && titleTag !== 'h2') {
                header.title = titleTag;
            }

        }

        // endregion

        // region [Css Class]

        if (this.#attrs.hasOwnProperty('lm-h-css-class')) {

            let cssClass = _.objValueAsString(this.#attrs, 'lm-h-css-class');

            if (cssClass) {
                header.cssClass = cssClass;
            }

        }

        // endregion

        // region [Inline Styles]

        if (this.#attrs.hasOwnProperty('lm-h-inline-styles')) {

            let inlineStyles = _.objValueAsString(this.#attrs, 'lm-h-inline-styles');

            if (inlineStyles) {
                header.inlineStyles = inlineStyles;
            }

        }

        // endregion

    }

    /**
     * Generate footer params ...
     */

    generateFooter() {

        // region [Enabled]

        if (!this.#attrs.hasOwnProperty('lm-f-enabled')) {
            delete this.#modalParams.footer;
            return;
        }

        let enabled = _.objValueAsInt(this.#attrs, 'lm-f-enabled', 0) > 0;

        if (!enabled) {
            delete this.#modalParams.footer;
            return;
        }

        if (!this.#modalParams.hasOwnProperty('footer')) {
            this.#modalParams.footer = {} as ModalFooterParams;
        } else {
            this.#modalParams.footer = _.objValueAsObject(this.#modalParams, 'footer') as ModalFooterParams;
        }

        let footer = this.#modalParams.footer;

        footer.enabled = true;

        // endregion

        // region [Mode]

        if (this.#attrs.hasOwnProperty('lm-f-mode')) {

            let mode = _.objValueAsString(this.#attrs, 'lm-f-mode');

            if (!mode) {
                mode = 'alert';
            }

            if (!['alert', 'confirm', 'custom'].includes(mode)) {
                mode = 'alert';
            }

            footer.mode = mode;

        }

        // endregion

        // region [Css Class]

        if (this.#attrs.hasOwnProperty('lm-f-css-class')) {

            let cssClass = _.objValueAsString(this.#attrs, 'lm-f-css-class');

            if (cssClass) {
                footer.cssClass = cssClass;
            }

        }

        // endregion

        // region [Inline Styles]

        if (this.#attrs.hasOwnProperty('lm-f-inline-styles')) {

            let inlineStyles = _.objValueAsString(this.#attrs, 'lm-f-inline-styles');

            if (inlineStyles) {
                footer.inlineStyles = inlineStyles;
            }

        }

        // endregion

        // region [Content]

        if (footer.mode === 'custom') {
            footer.content = _.objValueAsString(this.#attrs, 'lm-f-content');

            if (!footer.content) {
                footer.content = `<span class="text-danger">Custom footer content is empty!</span>`;
            }
        }

        // endregion

        // region [OnOk Callback ...]

        if (this.#attrs.hasOwnProperty('lm-f-on-ok')) {

            let onOk = _.objValueAsString(this.#attrs, 'lm-f-on-ok');

            if (onOk) {
                footer.onOk = onOk;
            }

        }

        // endregion

        this.#generateFooterOkButton(footer);

        this.#generateFooterCloseButton(footer);

    }

    #generateFooterOkButton(footer: ModalFooterParams) {

        if (!footer.hasOwnProperty('okButton')) {
            footer.okButton = {};
        } else {
            footer.okButton = _.objValueAsObject(footer, 'okButton');
        }

        let text = _.objValueAsString(this.#attrs, 'lm-f-ok-btn-text');

        if (text.toLowerCase() !== 'Ok') {
            footer.okButton.text = text;
        }

        footer.okButton.cssClass = _.objValueAsString(
            this.#attrs,
            'lm-f-ok-btn-css-class'
        );

        footer.okButton.inlineStyles = _.objValueAsString(
            this.#attrs,
            'lm-f-ok-btn-inline-styles'
        );

        footer.okButton.iconClass = _.objValueAsString(
            this.#attrs,
            'lm-f-ok-btn-icon-class'
        );

        let iconPosition = _.objValueAsString(this.#attrs, 'lm-f-ok-btn-icon-position');

        if (iconPosition && iconPosition !== 'left') {
            footer.okButton.iconPosition = iconPosition;
        }

    }

    #generateFooterCloseButton(footer: ModalFooterParams) {

        if (!footer.hasOwnProperty('closeButton')) {
            footer.closeButton = {};
        } else {
            footer.closeButton = _.objValueAsObject(footer, 'closeButton');
        }

        let text = _.objValueAsString(this.#attrs, 'lm-f-close-btn-text');

        if (text !== 'Close') {
            footer.closeButton.text = text;
        }

        footer.closeButton.cssClass = _.objValueAsString(
            this.#attrs,
            'lm-f-close-btn-css-class'
        );

        footer.closeButton.inlineStyles = _.objValueAsString(
            this.#attrs,
            'lm-f-close-btn-inline-styles'
        );

        footer.closeButton.iconClass = _.objValueAsString(
            this.#attrs,
            'lm-f-close-btn-icon-class'
        );

        let iconPosition = _.objValueAsString(this.#attrs, 'lm-f-close-btn-icon-position');

        if (iconPosition && iconPosition !== 'left') {
            footer.closeButton.iconPosition = iconPosition;
        }
    }

    /**
     * Generate body params ...
     */

    generateBody() {

        if (!this.#modalParams.hasOwnProperty('body')) {
            this.#modalParams.body = {} as ModalBodyParams;
        } else {
            this.#modalParams.body = _.objValueAsObject(this.#modalParams, 'body') as ModalBodyParams;
        }

        // region [No Padding]

        if(this.#attrs.hasOwnProperty('lm-b-no-padding')) {
            this.#modalParams.body.noPadding = _.objValueAsInt(this.#attrs,'lm-b-no-padding',0) > 0;
        }

        // endregion

        // region [Content type ...]

        let contentType = _.objValueAsString(this.#attrs, 'lm-b-content-type');

        if (contentType && !ModalParameterParser.isValidBodyContentType(contentType)) {
            contentType = 'html';
        }

        if (contentType && contentType !== '') {
            this.#modalParams.body.contentType = contentType;
        }

        // endregion

        // region [Content]

        if (contentType === 'html') {

            let content = _.objValueAsString(this.#attrs, 'lm-b-content');

            if (!content) {
                content = `Please provide modal content`;
            }

            this.#modalParams.body.content = content;

        }

        // endregion

        // region [Function content]

        if (contentType === 'function') {
            let functionName = _.objValueAsString(this.#attrs, 'lm-b-function-name');
            let functionArguments = _.objValueAsString(this.#attrs, 'lm-b-function-args');
            let functionThis = _.objValueAsString(this.#attrs, 'lm-b-function-this');

            if(functionName) {
                this.#modalParams.body.functionName = functionName;
            }

            if (functionArguments) {
                this.#modalParams.body.functionArguments = functionArguments;
            }

            if (functionThis) {
                this.#modalParams.body.functionThis = functionThis;
            }
        }

        // endregion

        // region [Template content ...]

        if(contentType === 'template') {

            let templateId = _.objValueAsString(this.#attrs, 'lm-b-template-id');

            if(templateId) {
                this.#modalParams.body.templateId = templateId;
            }

        }

        // endregion

        // region [Youtube video content]

        if(contentType === 'youtube-video') {
            let videoUrl = _.objValueAsString(this.#attrs, 'lm-b-video-url');

            if(videoUrl) {
                this.#modalParams.body.videoUrl = videoUrl;
            }
        }

        // endregion

        // region [Image content]

        if(contentType === 'image') {

            let ip = this.#modalParams.body.imageParams = _.objValueAsObject(
                this.#modalParams.body,
                'imageParams'
            ) as ImageParams;

            ip.url = _.objValueAsString(this.#attrs,'lm-b-image-url');
            ip.title = _.objValueAsString(this.#attrs,'lm-b-image-time');
            ip.alt = _.objValueAsString(this.#attrs,'lm-b-image-alt');
            ip.cssClass = _.objValueAsString(this.#attrs,'lm-b-image-css-class');
            ip.inlineStyles = _.objValueAsString(this.#attrs,'lm-b-image-inline-styles');
            ip.caption = _.objValueAsString(this.#attrs,'lm-b-image-caption');
            ip.captionCssClass = _.objValueAsString(this.#attrs,'lm-b-image-caption-css-class');
            ip.captionTemplate = _.objValueAsString(this.#attrs,'lm-b-image-caption-template');

        }

        // endregion

        // region [Css Class]

        if(this.#attrs.hasOwnProperty('lm-b-css-class')) {
            this.#modalParams.body.cssClass = _.objValueAsString(
                this.#attrs,
                'lm-b-css-class'
            );
        }

        // endregion

        // region [Iframe content]

        if(contentType === 'iframe') {

            if(this.#attrs.hasOwnProperty('lm-b-iframe-code')) {

                this.#modalParams.body.iframeCode = _.objValueAsString(
                    this.#attrs,
                    'lm-b-iframe-code'
                );

                this.#modalParams.body.iframeCode = this.#modalParams.body.iframeCode.replaceAll('&quot;','"');

            }

        }

        // endregion

        // region [Ajax Content ...]

        if(contentType === 'ajax') {
            this.#generateAjaxParams();
        }

        // endregion

        // region [Transformer ...]

        if (this.#attrs.hasOwnProperty('lm-b-transformer')) {
            this.#modalParams.body.transformer = _.objValueAsString(
                this.#attrs,
                'lm-b-transformer'
            );
        }

        // endregion

    }

    #generateAjaxParams() {

        // region [Ajax ...]

        let ajax: Partial<AjaxParams> = {
            url: _.objValueAsString(this.#attrs, 'lm-b-ajax-url'),
            method: _.objValueAsString(this.#attrs, 'lm-b-ajax-method'),
            timeoutMs: _.objValueAsInt(this.#attrs, 'lm-b-ajax-timeout', 30000)
        };

        if (!ajax.timeoutMs || ajax.timeoutMs < 1000) {
            ajax.timeoutMs = 1000;
        }

        let contentDataType = _.objValueAsString(this.#attrs, 'lm-b-ajax-content-data-type', 'html');

        if (ModalParameterParser.isValidAjaxContentDataType(contentDataType)) {
            ajax.contentDataType = contentDataType;
        } else {
            ajax.contentDataType = 'html';
        }

        if (this.#attrs.hasOwnProperty('lm-b-ajax-data')) {

            let dataStr = _.objValueAsString(this.#attrs, 'lm-b-ajax-data')

            if (dataStr) {
                ajax.data = JSON.parse(
                    _.unicodeB64Decode(
                        dataStr
                    )
                );
            }


        }

        if (this.#attrs.hasOwnProperty('lm-b-ajax-headers')) {

            let headerStr = _.objValueAsString(this.#attrs, 'lm-b-ajax-headers')

            if (headerStr) {
                ajax.headers = JSON.parse(
                    _.unicodeB64Decode(
                        headerStr
                    )
                );
            }


        }

        if (this.#attrs.hasOwnProperty('lm-b-ajax-transform-json')) {

            let functionName: any = _.objValueAsString(this.#attrs, 'lm-b-ajax-transform-json');

            if (typeof window !== "undefined" && typeof window[functionName] === 'function') {
                ajax.transformJson = window[functionName] as Function;
            }

        }

        if (this.#attrs.hasOwnProperty('lm-b-ajax-transform-html')) {

            let functionName: any = _.objValueAsString(this.#attrs, 'lm-b-ajax-transform-html');

            if (typeof window !== "undefined" && typeof window[functionName] === 'function') {
                ajax.transformHtml = window[functionName] as Function;
            }

        }

        if (this.#modalParams.body) {
            this.#modalParams.body.ajaxParams = ajax as AjaxParams;
        }

        // endregion

    }

}