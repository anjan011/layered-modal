import {LayeredModal} from './layered-modal';
import {Dimension, Position} from "./interfaces/common";
import {DomUtils} from "./utils/dom";
import _ from "./utils/mixins";


interface LayeredModalManagerParams {

    hideXButton: number;
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


export default class LayeredModalManager {

    #params: Partial<LayeredModalManagerParams> = {
        hideXButton: 0,
        zIndex: 1
    };

    #stack: Array<LayeredModal> = [];

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
         * Hide X button ...
         */

        this.#params.hideXButton = _.objValueAsIntFlag(params, 'hideXButton', 0);

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
    }

    /**
     * Add a modal to layer ...
     *
     * @param params
     */

    addModal(params: any) {

        if (!_.isPlainObject(params)) {
            params = {};
        }

        // Set zIndex based on stack
        params.zIndex = (this.#params.zIndex ? this.#params.zIndex : 1)
            + this.#stack.length;

        // secondary overlay?

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

        params.hideXButton = this.#params.hideXButton;

        /**
         * Css Class ....
         */

        if (!params.hasOwnProperty('cssClass')) {
            params.cssClass = this.#params.cssClass;
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
         * @type {LayeredModal}
         */

        const newModal = new LayeredModal(params);

        newModal.setManager(this);

        newModal.show();

        this.#stack.push(newModal);
    }

    /**
     * Remove modal instance from DOM and stack ...
     */

    removeModal(callback: Function | null = null) {

        if (this.#stack.length === 0) {
            return
        }

        const latestModal: LayeredModal = this.#stack[this.#stack.length - 1];

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

    getStackedModal(index: number): LayeredModal | null {

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

            let modal = this.#stack[0] as LayeredModal;

            if (modal) {
                modal.removeModalClass('stacked');
            }

            return;
        }

        for (let i = 0; i < this.#stack.length - 1; i += 1) {

            let modal = this.#stack[i] as LayeredModal;

            if (modal) {
                modal.addModalClass('stacked');
            }

        }

        let modal = this.#stack[this.#stack.length - 1] as LayeredModal;

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

            if ((t = target.closest("[data-layered-modal-trigger]"))) {

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

                if(_.objValueAsIntFlag(attrs,'layered-modal-trigger',0) !== 1) {
                    return;
                }

                let modalParams : any = {
                    id : _.objValueAsString(attrs,'lm-id'),
                    zIndex : _.objValueAsString(attrs,'lm-z-index'),
                    header : {
                        enabled : _.objValueAsIntFlag(attrs,'lm-header-enabled',1),
                        title : _.objValueAsString(attrs, 'lm-header-title', 'Modal Title'),
                        titleTag : _.objValueAsString(attrs, 'lm-header-title-tag', 'h2'),
                    },
                    cssClass : {
                        modal : _.objValueAsString(attrs,'lm-css-class'),
                    }
                };

                // region [Content]





                let contentType = _.objValueAsString(attrs,'lm-content-type','html');

                if(contentType === 'html') {
                    modalParams.content = _.objValueAsString(attrs, 'lm-content-html', 'Enter content string ...');
                } else if(contentType === 'function') {

                    let functionName =_.objValueAsString(attrs, 'lm-content-function');
                    let functionArgs =_.objValueAsString(attrs, 'lm-content-function-args');

                    modalParams.content = this.getFunctionResult(functionName,functionArgs);


                } else if(contentType === 'template') {

                    let templateId = _.objValueAsString(attrs,'lm-content-template-id');

                    modalParams.content = this.getContentFromTemplateElement(templateId);

                } else {
                    modalParams.content = 'Unable to determine content from any possible sources ...';
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

                }

                modalParams.footer = footer;

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

    getFunctionResult(funcName: string, functionArgs : string): any | null {

        if (typeof (window as any)[funcName] === "function") {
            let val =  (window as any)[funcName].apply(null,[functionArgs]);

            if(typeof val === 'string') {
                return val;
            } else {
                return `Function ${funcName} does not return string data type.`;
            }

        } else {
           return `Function ${funcName} not found.`;
        }
    }
}

/*
interface LayeredModalParams {
    id: string;
    zIndex: number;
    content?: string;
    header?: HeaderParams;
    footer?: FooterParams;
    width?: Dimension;
    height?: Dimension;
    position: string;
    shiftDistance?: Position;
    transitionDuration?: number;
    hideXButton?: number;
    cssClass?: CssClassNames;
    onShow?: Function | null;
    onHide?: Function | null;
    secondaryOverlay?: boolean;
    stackIndex: number;
    draggable: boolean;
    dragHandle: string;
    userSelect: boolean;
    body: BodyParams
}
*/
