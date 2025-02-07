import {ModalParams} from "../../interfaces/modal";
import _ from "../../utils/mixins";
import ModalParameterParser from "../parameters/modal-parameter-parser";
import {AjaxParams, ButtonParams, Dimension} from "../../interfaces/common";
import {DomUtils} from "../../utils/dom";

/**
 * This class converts data attributes object to Modal params
 */

export default class DataAttrs2ModalParam {

    generate(attrs : Record<any, any>) : ModalParams {

        let contentType = _.objValueAsString(attrs, 'lm-b-content-type');

        if (!ModalParameterParser.isValidBodyContentType(contentType)) {
            contentType = 'html';
        }


        let modalParams: Partial<ModalParams> = {
            id: _.objValueAsString(attrs, 'lm-id'),
            zIndex: _.objValueAsInt(attrs, 'lm-z-index', 1),
            transitionDuration: _.objValueAsInt(attrs, 'lm-transition-duration'),
            header: {
                enabled: _.objValueAsIntFlag(attrs, 'lm-h-enabled', 0) > 0,
                title: _.objValueAsString(attrs, 'lm-h-title', 'Modal Title'),
                titleTag: _.objValueAsString(attrs, 'lm-h-title-tag', 'h2'),
                cssClass: _.objValueAsString(attrs, 'lm-h-css-class', ''),
                inlineStyles: _.objValueAsString(attrs, 'lm-h-inline-styles', ''),
            },
            cssClass: {
                modal: _.objValueAsString(attrs, 'lm-css-class'),
            },
            body: {
                contentType: contentType as any,
                content: _.objValueAsString(attrs, 'lm-b-content'),
                functionName: _.objValueAsString(attrs, 'lm-b-function-name'),
                functionArguments: _.objValueAsString(attrs, 'lm-b-function-args'),
                templateId: _.objValueAsString(attrs, 'lm-b-template-id'),
                videoUrl: _.objValueAsString(attrs, 'lm-b-video-url'),
                imageParams: {
                    url: _.objValueAsString(attrs, 'lm-b-image-url'),
                    title: _.objValueAsString(attrs, 'lm-b-image-title'),
                    alt: _.objValueAsString(attrs, 'lm-b-image-alt'),
                    cssClass: _.objValueAsString(attrs, 'lm-b-image-css-class'),
                    inlineStyles: _.objValueAsString(attrs, 'lm-b-image-inline-styles'),
                    caption: _.objValueAsString(attrs, 'lm-b-image-caption'),
                    captionTemplate: _.objValueAsString(attrs, 'lm-b-image-caption-template'),
                    captionCssClass: _.objValueAsString(attrs, 'lm-b-image-caption-css-class'),
                },
                cssClass: _.objValueAsString(attrs, 'lm-b-css-class'),

                transformer: _.objValueAsString(attrs, 'lm-b-transformer'),
            },
            aspectRatio: _.objValueAsFloat(attrs, 'lm-aspect-ratio'),
        };

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

        // region [Footer]

        let footer: any = {
            enabled: _.objValueAsIntFlag(attrs, 'lm-f-enabled', 0),
            mode: _.objValueAsString(attrs, 'lm-f-mode', 'alert'),
        };

        if (footer.mode === 'custom') {

            let templateId = _.objValueAsString(attrs, 'lm-f-template-id');

            if (templateId !== '') {
                footer.content = DomUtils.getContentFromTemplateElement(templateId);
            } else {
                footer.content = _.objValueAsString(attrs, 'lm-f-content');
            }


        } else if (footer.mode === 'confirm') {

            footer.onOk = _.objValueAsString(attrs, 'lm-f-on-ok');

        }

        footer.cssClass = _.objValueAsString(attrs, 'lm-f-css-class');
        footer.inlineStyles = _.objValueAsString(attrs, 'lm-f-inline-styles');
        footer.templateId = _.objValueAsString(attrs, 'lm-f-template-id');

        // region [Ok Button ...]

        if (!footer.okButton) {
            footer.okButton = {
                text: 'Ok'
            } as Partial<ButtonParams>;
        }

        let okBtn = footer.okButton;

        if (attrs.hasOwnProperty('lm-f-ok-btn-text')) {
            okBtn.text = _.objValueAsString(attrs, 'lm-f-ok-btn-text');
        }

        if (attrs.hasOwnProperty('lm-f-ok-btn-css-class')) {
            okBtn.cssClass = _.objValueAsString(attrs, 'lm-f-ok-btn-css-class');
        }

        if (attrs.hasOwnProperty('lm-f-ok-btn-inline-styles')) {
            okBtn.inlineStyles = _.objValueAsString(attrs, 'lm-f-ok-btn-inline-styles');
        }

        if (attrs.hasOwnProperty('lm-f-ok-btn-icon-class')) {
            okBtn.iconClass = _.objValueAsString(attrs, 'lm-f-ok-btn-icon-class');
        }

        if (attrs.hasOwnProperty('lm-f-ok-btn-icon-position')) {
            okBtn.iconPosition = _.objValueAsString(attrs, 'lm-f-ok-btn-icon-position', 'left');
        }

        // endregion

        // region [Close Button ...]

        if (!footer.closeButton) {
            footer.closeButton = {
                text: 'Close'
            } as Partial<ButtonParams>;
        }

        let closeBtn = footer.closeButton;

        if (attrs.hasOwnProperty('lm-f-close-btn-text')) {
            closeBtn.text = _.objValueAsString(attrs, 'lm-f-close-btn-text');
        }

        if (attrs.hasOwnProperty('lm-f-close-btn-css-class')) {
            closeBtn.cssClass = _.objValueAsString(attrs, 'lm-f-close-btn-css-class');
        }

        if (attrs.hasOwnProperty('lm-f-close-btn-inline-styles')) {
            closeBtn.inlineStyles = _.objValueAsString(attrs, 'lm-f-close-btn-inline-styles');
        }

        if (attrs.hasOwnProperty('lm-f-close-btn-icon-class')) {
            closeBtn.iconClass = _.objValueAsString(attrs, 'lm-f-close-btn-icon-class');
        }

        if (attrs.hasOwnProperty('lm-f-close-btn-icon-position')) {
            closeBtn.iconPosition = _.objValueAsString(attrs, 'lm-f-close-btn-icon-position', 'left');
        }

        // endregion


        modalParams.footer = footer;

        // endregion

        // region [On Show and on hide ...]

        if (attrs.hasOwnProperty('lm-on-before-show')) {
            let lmOnBeforeShow = _.objValueAsString(attrs, 'lm-on-before-show');


            if (lmOnBeforeShow) {
                modalParams.onBeforeShow = lmOnBeforeShow;
            }
        }

        if (attrs.hasOwnProperty('lm-on-show')) {
            let lmOnShow = _.objValueAsString(attrs, 'lm-on-show');


            if (lmOnShow) {
                modalParams.onShow = lmOnShow;
            }
        }

        if (attrs.hasOwnProperty('lm-on-before-hide')) {
            let lmOnBeforeHide = _.objValueAsString(attrs, 'lm-on-before-hide');


            if (lmOnBeforeHide) {
                modalParams.onBeforeHide = lmOnBeforeHide;
            }
        }

        if (attrs.hasOwnProperty('lm-on-hide')) {
            let lmOnHide = _.objValueAsString(attrs, 'lm-on-hide');

            if (lmOnHide) {
                modalParams.onHide = lmOnHide;
            }
        }

        if (attrs.hasOwnProperty('lm-auto-width')) {
            modalParams.autoWidth = _.objValueAsIntFlag(attrs, 'lm-auto-width', 0) > 0;
        }

        if (attrs.hasOwnProperty('lm-auto-height')) {
            modalParams.autoHeight = _.objValueAsIntFlag(attrs, 'lm-auto-height', 0) > 0;
        }

        // endregion

        // region [Ajax ...]

        let ajax: Partial<AjaxParams> = {
            url: _.objValueAsString(attrs, 'lm-b-ajax-url'),
            method: _.objValueAsString(attrs, 'lm-b-ajax-method'),
            timeoutMs: _.objValueAsInt(attrs, 'lm-b-ajax-timeout', 30000)
        };

        if (!ajax.timeoutMs || ajax.timeoutMs < 1000) {
            ajax.timeoutMs = 1000;
        }

        let contentDataType = _.objValueAsString(attrs, 'lm-b-ajax-content-data-type', 'html');

        if (ModalParameterParser.isValidAjaxContentDataType(contentDataType)) {
            ajax.contentDataType = contentDataType;
        } else {
            ajax.contentDataType = 'html';
        }

        if(attrs.hasOwnProperty('lm-b-ajax-data')) {

            let dataStr = _.objValueAsString(attrs, 'lm-b-ajax-data')

            if(dataStr) {
                ajax.data = JSON.parse(
                    _.unicodeB64Decode(
                        dataStr
                    )
                );
            }


        }

        if (attrs.hasOwnProperty('lm-b-ajax-headers')) {

            let headerStr = _.objValueAsString(attrs, 'lm-b-ajax-headers')

            if (headerStr) {
                ajax.headers = JSON.parse(
                    _.unicodeB64Decode(
                        headerStr
                    )
                );
            }


        }

        if (attrs.hasOwnProperty('lm-b-ajax-transform-json')) {

            let functionName: any = _.objValueAsString(attrs, 'lm-b-ajax-transform-json');

            if (typeof window !== "undefined" && typeof window[functionName] === 'function') {
                ajax.transformJson = window[functionName] as Function;
            }

        }

        if (attrs.hasOwnProperty('lm-b-ajax-transform-html')) {

            let functionName: any = _.objValueAsString(attrs, 'lm-b-ajax-transform-html');

            if (typeof window !== "undefined" && typeof window[functionName] === 'function') {
                ajax.transformHtml = window[functionName] as Function;
            }

        }

        if (modalParams.body) {
            modalParams.body.ajaxParams = ajax as AjaxParams;
        }

        // endregion

        return modalParams as ModalParams;

    }

}