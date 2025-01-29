import Modal from './modal';
import {Dimension, Position} from "./interfaces/common";
import {DomUtils} from "./utils/dom";
import _ from "./utils/mixins";
import {ModalParams, ModalXButton} from "./interfaces/modal";
import ModalParameterParser from "./parsers/parameters/modal-parameter-parser";


interface LayeredModalManagerParams {

    xButton : Partial<ModalXButton>
    zIndex: number;
    baseShiftDistance?: Partial<Position>;
    cssClass?: Partial<CssClassNames>;
    transitionDuration?: number;

}

interface CssClassNames {
    modal?: string;
    modalOk?: string;
    modalClose?: string;
}

export default class ModalManager {

    #params: Partial<LayeredModalManagerParams> = {
        zIndex: 1
    };

    #stack: Array<Modal> = [];

    constructor(params: Partial<LayeredModalManagerParams> = {}) {


        /**
         * Pares and prepare params ...
         */

        this.prepareParams(params);

        /**
         * Bind events ...
         */

        this.bindEvents();


    }

    /**
     * Prepare parameters for the class object to use ...
     *
     * @param params
     */

    prepareParams(params: Partial<LayeredModalManagerParams>) {

        /**
         * z-index ...
         */

        this.#params.zIndex = _.objValueAsInt(params, 'zIndex', 1);

        if (this.#params.zIndex < 1) {
            this.#params.zIndex = 1;
        }

        /**
         * Base shift distance ...
         */

        let bsd: Partial<Position> = _.objValueAsObject(params, 'baseShiftDistance');

        bsd.top = _.objValueAsInt(bsd, 'top', 0);
        bsd.right = _.objValueAsInt(bsd, 'right', 0);
        bsd.bottom = _.objValueAsInt(bsd, 'bottom', 0);
        bsd.left = _.objValueAsInt(bsd, 'left', 0);

        this.#params.baseShiftDistance = bsd as Position;

        /**
         * Css Class ...
         */

        let cssClass: Partial<CssClassNames> = _.objValueAsObject(params, 'cssClass');

        cssClass.modal = _.objValueAsString(cssClass, 'modal', '');
        cssClass.modalOk = _.objValueAsString(cssClass, 'modalOk', 'modal-ok');
        cssClass.modalClose = _.objValueAsString(cssClass, 'modalClose', 'modal-close');

        this.#params.cssClass = cssClass;

        /**
         * Transition duration ...
         */

        this.#params.transitionDuration = _.objValueAsInt(params, 'transitionDuration', 0);

        if (this.#params.transitionDuration < 0) {
            this.#params.transitionDuration = 0;
        }

        /**
         * X Button ...
         */

        if(params.hasOwnProperty('xButton')) {
            this.#params.xButton = _.objValueAsObject(params,'xButton');
        }
    }

    /**
     * Add a modal to layer ...
     *
     * @param params
     */

    addModal(params: any) : Modal {

        if (!_.isPlainObject(params)) {
            params = {};
        }

        // Set zIndex based on stack
        params.zIndex = (this.#params.zIndex ? this.#params.zIndex : 1)
            + this.#stack.length;

        // secondary backDrop?

        params.secondaryOverlay = this.#stack.length > 0;

        // set base shift distance from manager ...


        /**
         * Then if the stack is not empty, add last modal's
         * distance values to base shift distance ...
         */

        if (this.#stack.length > 0) {

            params.shiftDistance = {...this.#params.baseShiftDistance};

            let prevModal = this.#stack[this.#stack.length - 1];

            let shiftDistance = prevModal.getParams().shiftDistance;

            params.shiftDistance.top += shiftDistance?.top;
            params.shiftDistance.right += shiftDistance?.right;
            params.shiftDistance.bottom += shiftDistance?.bottom;
            params.shiftDistance.left += shiftDistance?.left;

        } else {
            params.shiftDistance = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,

            };
        }


        /**
         * Hide X button?
         */

        if(!params.hasOwnProperty('xButton')) {

            if(this.#params.hasOwnProperty('xButton')) {
                params.xButton = _.objValueAsObject(this.#params, 'xButton');
            }

        }

        /**
         * Css Class ....
         */

        if (!params.hasOwnProperty('cssClass')) {
            params.cssClass = this.#params.cssClass as CssClassNames;

        } else {

            params.cssClass = _.joinObjectPropertiesAsString(
                params.cssClass as Record<string, any>,
                this.#params.cssClass as Record<string, any>,
                ['modal','modalOk','modalClose'],
                ' ',
                true
            );

        }

        /**
         * Transition duration ...
         */

        if (!params.hasOwnProperty('transitionDuration')) {
            params.transitionDuration = this.#params.transitionDuration;
        }

        /**
         * Stack index ...
         */

        params.stackIndex = this.#stack.length;

        /**
         * Instantiate the model and display it, then add to stack ...
         *
         * @type {Modal}
         */

        const newModal = new Modal(params);

        newModal.setManager(this);

        if(params.delayInMilliSeconds !== undefined && params.delayInMilliSeconds > 0) {

            let ts = setTimeout(() => {
                newModal.show();
            },params.delayInMilliSeconds);

        } else {
            newModal.show();
        }



        this.#stack.push(newModal);

        return newModal;
    }

    /**
     * Remove modal instance from DOM and stack ...
     */

    removeModal(callback: Function | null = null) {

        if (this.#stack.length === 0) {
            return
        }

        const latestModal: Modal = this.#stack[this.#stack.length - 1];

        if (latestModal) {

            latestModal.hide(() => {
                this.popStack();

                if (callback !== null && _.isFunction(callback)) {
                    callback.apply(this);
                }

            });

        }

    }

    popStack() {

        if (this.#stack.length === 0) {
            return null;
        }

        return this.#stack.pop();
    }

    stackSize() {

        return this.#stack.length;
    }

    /**
     * Gets a modal object from stack using array index
     *
     * @param index
     */

    getStackedModal(index: number): Modal | null {

        if (index < 0 || index >= this.#stack.length) {
            return null;
        }

        return this.#stack[index];
    }


    /**
     * Bind events common to all models ...
     */

    bindEvents() {

        let _this = this;

        const throttledEscHandler = this.throttle(this.handleEscapeKey, 300);

        document.addEventListener('keydown', throttledEscHandler);

        /**
         * Make modal open possible using data attributes ...
         */

        this.bindTriggerClickUsingDataAttributes();

    }

    handleEscapeKey(event: any) {

        let _this = this;

        if (event.key === 'Escape' || event.keyCode === 27) {

            _this.removeModal();

        }


    }

    throttle(func: any, limit: any): any {

        let _this = this;

        let lastCall = 0;
        return function (...args: any[]) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func.apply(_this, args);
            }
        };
    }

    adjustStackCssClassForModals() {

        if (this.#stack.length === 0) {
            return;
        }

        if (this.#stack.length === 1) {

            let modal = this.#stack[0] as Modal;

            if (modal) {
                modal.removeModalClass('stacked');
            }

            return;
        }

        for (let i = 0; i < this.#stack.length - 1; i += 1) {

            let modal = this.#stack[i] as Modal;

            if (modal) {
                modal.addModalClass('stacked');
            }

        }

        let modal = this.#stack[this.#stack.length - 1] as Modal;

        if (modal) {
            modal.removeModalClass('stacked');
        }
    }

    /**
     * This method allows opening a modal using data attributes ...
     */


    bindTriggerClickUsingDataAttributes() {

        document.addEventListener("click",  (event) => {



            if(!event.target) {
                return;
            }

            let t = null;

            const target = event.target as Element;

            if ((t = target.closest("[data-lms-trigger]"))) {

                /**
                 * if a button element or input element with button type
                 * has disabled attr set, we skip click action ...
                 *
                 * Additionally, if the element has a disabled class, we
                 * skip as well ..
                 */

                if(t instanceof HTMLButtonElement || t instanceof HTMLInputElement) {
                    if(t.disabled) {
                        return;
                    }
                } else if(t.classList.contains('disabled')) {
                    return;
                }

                let attrs = DomUtils.getDataAttributes(t as HTMLElement);

                if(_.objValueAsIntFlag(attrs,'lms-trigger',0) !== 1) {
                    return;
                }

                let contentType = _.objValueAsString(attrs, 'lm-b-content-type');

                if(!ModalParameterParser.isValidBodyContentType(contentType)) {
                    contentType = 'html';
                }




                let modalParams : Partial<ModalParams> = {
                    id : _.objValueAsString(attrs,'lm-id'),
                    zIndex : _.objValueAsInt(attrs,'lm-z-index',1),

                    header : {
                        enabled : _.objValueAsIntFlag(attrs,'lm-h-enabled',1) > 0,
                        title : _.objValueAsString(attrs, 'lm-h-title', 'Modal Title'),
                        titleTag : _.objValueAsString(attrs, 'lm-h-title-tag', 'h2'),
                    },
                    cssClass : {
                        modal : _.objValueAsString(attrs,'lm-css-class'),
                    },
                    body : {
                        contentType : contentType as any,
                        content : _.objValueAsString(attrs, 'lm-b-content'),
                        functionName : _.objValueAsString(attrs, 'lm-b-function-name'),
                        functionArguments : _.objValueAsString(attrs, 'lm-b-function-args'),
                        templateId : _.objValueAsString(attrs, 'lm-b-template-id'),
                        videoUrl : _.objValueAsString(attrs,'lm-b-video-url'),
                        imageParams : {
                            url: _.objValueAsString(attrs, 'lm-b-image-url'),
                            title: _.objValueAsString(attrs, 'lm-b-image-title'),
                            alt: _.objValueAsString(attrs, 'lm-b-image-alt'),
                            cssClass: _.objValueAsString(attrs, 'lm-b-image-css-class'),
                            inlineStyles: _.objValueAsString(attrs, 'lm-b-image-inline-styles'),
                            caption : _.objValueAsString(attrs,'lm-b-image-caption'),
                            captionTemplate : _.objValueAsString(attrs,'lm-b-image-caption-template'),
                            captionCssClass : _.objValueAsString(attrs,'lm-b-image-caption-css-class'),
                        },
                        cssClass : _.objValueAsString(attrs,'lm-b-css-class'),
                        aspectRatio : _.objValueAsFloat(attrs,'lm-b-aspect-ratio'),
                    }
                };

                // region [Modal width and height]

                let width: Partial<Dimension> = {};

                if (attrs.hasOwnProperty('lm-width-value')) {
                    width.value = _.objValueAsFloat(attrs, 'lm-width-value');
                    width.unit = _.objValueAsString(attrs, 'lm-width-unit', 'px');

                    modalParams.width = width as Dimension;

                }

                let maxWidth: Partial<Dimension> = {};

                if (attrs.hasOwnProperty('lm-max-width-value')) {
                    maxWidth.value = _.objValueAsFloat(attrs, 'lm-max-width-value',100);
                    maxWidth.unit = _.objValueAsString(attrs, 'lm-max-width-unit', '%');

                    modalParams.maxWidth = maxWidth as Dimension;

                }

                let height: Partial<Dimension> = {};

                if (attrs.hasOwnProperty('lm-height-value')) {
                    height.value = _.objValueAsFloat(attrs, 'lm-height-value');
                    height.unit = _.objValueAsString(attrs, 'lm-height-unit', 'px');

                    modalParams.height = height as Dimension;
                }

                let maxHeight: Partial<Dimension> = {};

                if (attrs.hasOwnProperty('lm-max-height-value')) {
                    maxHeight.value = _.objValueAsFloat(attrs, 'lm-max-height-value',100);
                    maxHeight.unit = _.objValueAsString(attrs, 'lm-max-height-unit', '%');

                    modalParams.maxHeight = maxHeight as Dimension;
                }

                // endregion

                // region [Footer]

                let footer : any = {
                    enabled: _.objValueAsIntFlag(attrs, 'lm-footer-enabled', 1),
                    mode: _.objValueAsString(attrs, 'lm-footer-mode', 'confirm'),
                };

                if(footer.mode === 'custom') {

                    let templateId = _.objValueAsString(attrs, 'lm-footer-template-id');

                    footer.content = this.getContentFromTemplateElement(templateId);

                } else if(footer.mode === 'confirm') {

                    footer.onOk = _.objValueAsString(attrs, 'lm-footer-on-ok');

                }

                modalParams.footer = footer;

                // endregion

                // region [On Show and on hide ...]

                if(attrs.hasOwnProperty('lm-on-show')) {
                    let lmOnShow = _.objValueAsString(attrs,'lm-on-show');



                    if(lmOnShow) {
                        modalParams.onShow = lmOnShow;
                    }
                }

                if (attrs.hasOwnProperty('lm-on-hide')) {
                    let lmOnHide = _.objValueAsString(attrs, 'lm-on-hide');

                    if (lmOnHide) {
                        modalParams.onHide = lmOnHide;
                    }
                }

                if(attrs.hasOwnProperty('lm-auto-width')) {
                    modalParams.autoWidth = _.objValueAsIntFlag(attrs,'lm-auto-width',0) > 0;
                }

                if (attrs.hasOwnProperty('lm-auto-height')) {
                    modalParams.autoHeight = _.objValueAsIntFlag(attrs, 'lm-auto-height', 0) > 0;
                }

                // endregion

                this.addModal(modalParams);

            }
        });

    }

    getContentFromTemplateElement(templateId : string) : string {

        if (!templateId) {
            return 'Template element id is required';
        } else {

            let elem = document.getElementById(templateId);

            if (!elem) {
                return `No template tag found with id: ${templateId}`;
            } else if (!(elem instanceof HTMLTemplateElement)) {

                return `Element found with id ${templateId} is not a <template> element`;

            } else {
                return elem.innerHTML;
            }

        }

    }

    /**
     * Gets latest modal that is displayed
     */

    getLatestModal() : Modal | null {

        if(this.#stack.length) {
            return this.#stack[this.#stack.length - 1];
        }

        return null;

    }
}