import Modal from './modal';
import {AjaxParams, ButtonParams, Dimension, Position} from "./interfaces/common";
import {DomUtils} from "./utils/dom";
import _ from "./utils/mixins";
import {ModalBodyParams, ModalFooterParams, ModalHeaderParams, ModalParams, ModalXButton} from "./interfaces/modal";
import ModalParameterParser from "./parsers/parameters/modal-parameter-parser";
import DataAttrs2ModalParam from "./parsers/converters/data-attrs-2-modal-param";


interface ModalManagerParams {

    xButton: Partial<ModalXButton>
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

    static instance: ModalManager;

    #params: Partial<ModalManagerParams> = {
        zIndex: 1
    };

    #stack: Array<Modal> = [];

    constructor(params: Partial<ModalManagerParams> = {}) {

        /**
         * Pares and prepare params ...
         */

        this.prepareParams(params);

        /**
         * Bind events ...
         */

        this.bindEvents();

    }

    setParameters(params: Partial<ModalManagerParams>) {

        this.#params = _.deepMerge(this.#params, params) as Partial<ModalManagerParams>;

    }

    /**
     * Prepare parameters for the class object to use ...
     *
     * @param params
     */

    prepareParams(params: Partial<ModalManagerParams>) {

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

        if (params.hasOwnProperty('xButton')) {
            this.#params.xButton = _.objValueAsObject(params, 'xButton');
        }
    }

    checkCallbacks(params: Partial<ModalParams>): Modal | null {

        let callbacks = [
            {
                name: 'onShow',
                callback: params.onShow
            },
            {
                name: 'onBeforeShow',
                callback: params.onBeforeShow
            },
            {
                name: 'onHide',
                callback: params.onHide
            },
            {
                name: 'onBeforeHide',
                callback: params.onBeforeHide
            },
            {
                name: 'footer.onOk',
                callback: params.footer?.onOk
            },
        ];

        for (let i = 0; i < callbacks.length; i++) {

            let item = callbacks[i];

            if (item["callback"]) {
                if (!_.ifGlobalFunctionExists(item["callback"])) {

                    return this.errorModal({
                        body: {
                            content: `<div class="text-center">${item.name} callback function not found. ${typeof item["callback"] === 'string' ? `<br>Is the callback function name <kbd>${item["callback"]}</kbd> correct?` : ''}</div>`
                        }
                    });

                }
            }

        }


        return null;
    }

    /**
     * Display an error modal ...
     *
     * @param params
     */

    errorModal(params: Partial<ModalParams>): Modal {

        if (!params.header) {
            params.header = {
                enabled: true,
                title: 'Error',
                cssClass: 'color-red'
            } as ModalHeaderParams;
        } else {

            if (!params.header.cssClass) {
                params.header.cssClass = 'color-red';
            }

        }

        if (!params.footer) {
            params.footer = {
                enabled: true,
                mode: 'alert'
            } as ModalFooterParams;
        }

        if (!params.body) {
            params.body = {
                contentType: 'html',
                cssClass: 'color-red ai-center jc-center'
            } as ModalBodyParams;
        } else {

            if (!params.body.cssClass) {
                params.body.cssClass = 'color-red ai-center jc-center';
            }

        }

        if (!params.minHeight) {
            params.minHeight = {
                value: 200,
                unit: 'px'
            } as Dimension;
        }

        if (!params.minWidth) {
            params.minWidth = {
                value: 600,
                unit: 'px'
            } as Dimension;
        }

        return this.addModal(params);

    }

    /**
     * Add a modal to layer ...
     *
     * @param params
     */

    addModal(params: any): Modal {

        if (!_.isPlainObject(params)) {
            params = {};
        }

        // region [Filter stack for same ID check ...]

        if (params.hasOwnProperty('id')) {

            let filtered = this.#stack.filter((modal) => {

                return modal.getId() === params.id;

            });

            if (filtered.length) {

                return this.addModal({
                    header: {
                        enabled: true,
                        title: 'Error',
                        cssClass: 'color-red'
                    },
                    body: {
                        contentType: 'html',
                        cssClass: 'color-red',
                        content: `<div class="text-center">Cannot add multiple modals with same ID.<br>There is already a modal with ID <kbd>${params.id}</kbd> in stack!</div>`
                    },
                    footer: {
                        enabled: true,
                        mode: 'alert'
                    }
                });

            }

        }


        // endregion

        // region [Check callbacks ...]

        let callBackCheck = this.checkCallbacks(params as Partial<ModalParams>);

        if (callBackCheck instanceof Modal) {
            return callBackCheck;
        }

        // endregion

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

        if (!params.hasOwnProperty('xButton')) {

            if (this.#params.hasOwnProperty('xButton')) {
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
                ['modal', 'modalOk', 'modalClose'],
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

        if (params.delayInMilliSeconds !== undefined && params.delayInMilliSeconds > 0) {

            let ts = setTimeout(() => {
                clearTimeout(ts);
                newModal.show();
            }, params.delayInMilliSeconds);

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

    /**
     * Handle escape key press ...
     *
     * @param event
     */

    handleEscapeKey(event: any) {

        let _this = this;

        if (event.key === 'Escape' || event.keyCode === 27) {

            if (!_this.getLatestModal()?.isEscKeyDisabled()) {
                _this.removeModal();
            }


        }


    }

    /**
     * Throttle events, specially keyboard key up/down events ...
     *
     * @param func
     * @param limit
     */

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

    /**
     * Adjust css classes for stacked modals. So that other than topmost
     * one, rest of the modals will get a stacked css class.
     */

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

        document.addEventListener("click", (event) => {


            event.preventDefault();

            if (!event.target) {
                return;
            }

            let t = null;

            const target = event.target as Element;

            if ((t = target.closest("[data-lms-trigger]"))) {

                /**
                 * if a button element or input element with button type
                 * has disabled attr set, we skip click action.
                 */

                if (t instanceof HTMLButtonElement || t instanceof HTMLInputElement) {
                    if (t.disabled) {
                        return;
                    }
                }

                /**
                 * Additionally, if the element has a disabled class, we
                 * skip as well.
                 */

                if (t.classList.contains('disabled')) {
                    return;
                }

                let attrs = DomUtils.getDataAttributes(t as HTMLElement);

                if (_.objValueAsIntFlag(attrs, 'lms-trigger', 0) !== 1) {
                    return;
                }

                let attr2param = new DataAttrs2ModalParam();

                this.addModal(attr2param.generate(attrs) as ModalParams);

            }
        });

    }


    /**
     * Gets latest modal that is displayed
     */

    getLatestModal(): Modal | null {

        if (this.#stack.length) {
            return this.#stack[this.#stack.length - 1];
        }

        return null;

    }

    /**
     * Static version of add modal ...
     * @param params
     */

    static addModal(params: Partial<ModalParams>): Modal {
        return ModalManager.instance.addModal(params);
    }

    /**
     * Static version of remove modal
     * @param callback
     */

    static removeModal(callback: Function | null) {
        ModalManager.instance.removeModal(callback);
    }
}