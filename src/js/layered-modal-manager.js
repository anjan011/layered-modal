import LayeredModal from './layered-modal.js';
import TypeChecker from "./utils/type-checker";
import _ from "./utils/mixins";

export default class LayeredModalManager {

    /**
     *
     * @type {{hideXButton : number, cssClass : {modalClose : string},zIndex : number, baseShiftDistance : {top: number,left : number,right: number,bottom: number}}}
     */

    #params = {};

    #stack = [];

    constructor(params = {}) {

        if (typeof params !== 'object' || params === null || Array.isArray(params)) {
            throw new Error("LayeredModalManager constructor parameter must be a plain object.");
        }

        this.#params = params;

        /**
         * Pares and prepare params ...
         */

        this.prepareParams();

        /**
         * Bind events ...
         */

        this.bindEvents();


    }

    prepareParams() {

        /**
         * z-index ...
         */

        this.#params.zIndex = _.objValueAsInt(this.#params, 'zIndex', 1);

        if (this.#params.zIndex < 1) {
            this.#params.zIndex = 1;
        }

        /**
         * Base shift distance ...
         */

        let bsd = this.#params.baseShiftDistance = _.objValueAsObject(this.#params, 'baseShiftDistance');

        ['top', 'right', 'bottom', 'left'].forEach(function (key, index, itemList) {

            bsd[key] = _.objValueAsInt(bsd, key, 0);


        });

        /**
         * Hide X Button ...
         */

        this.#params.hideXButton = _.objValueAsInt(this.#params, 'hideXButton') > 0 ? 1 : 0;


        /**
         * Css Class ...
         */

        let cssClass = this.#params.cssClass = _.objValueAsObject(this.#params, 'cssClass');

        cssClass.modalClose = _.objValueAsString(cssClass, 'modalClose', 'modal-close');

    }

    /**
     * Add a modal to layer ...
     *
     * @param params
     */

    addModal(params) {

        if (typeof params !== 'object' || params === null || Array.isArray(params)) {
            throw new Error("AddModal parameters must be a plain object.");
        }

        // Set zIndex based on stack
        const topModal = this.#stack.length > 0 ? this.#stack[this.#stack.length - 1] : null;
        params.zIndex = this.#params.zIndex + this.#stack.length;

        // secondary overlay?

        params.secondaryOverlay = this.#stack.length > 0;

        // shift distance ...

        params.shiftDistance = this.#params.baseShiftDistance;

        if (this.#stack.length) {
            let prevModal = this.#stack[this.#stack.length - 1];

            let shiftDistance = prevModal.getParams().shiftDistance;

            shiftDistance.top += this.#params.baseShiftDistance.top;
            shiftDistance.right += this.#params.baseShiftDistance.right;
            shiftDistance.bottom += this.#params.baseShiftDistance.bottom;
            shiftDistance.left += this.#params.baseShiftDistance.left;

            params.shiftDistance = shiftDistance;
        }

        /**
         * Hide X button?
         */

        params.hideXButton = this.#params.hideXButton;

        /**
         * Css Class ....
         */

        params.cssClass = this.#params.cssClass;

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

    removeModal() {

        if (this.#stack.length === 0) return;


        const topModal = this.#stack[this.#stack.length - 1];

        if (topModal instanceof LayeredModal) {
            topModal.hide();
        }

    }

    popStack() {

        if (this.#stack.length === 0) {
            return null;
        }

        return this.#stack.pop();
    }

    /**
     * Bind events common to all models ...
     */

    bindEvents() {

        let _this = this;

        const throttledEscHandler = this.throttle(this.handleEscapeKey, 300);

        document.addEventListener('keydown', throttledEscHandler);

    }

    handleEscapeKey(event) {

        let _this = this;

        if (event.key === 'Escape' || event.keyCode === 27) {

            _this.removeModal();

        }



    }

    throttle(func, limit) {

        let _this = this;

        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func.apply(_this, args);
            }
        };
    }
}

/**
 * Make LayeredModalManager available for browsers ...
 */

if (typeof window !== "undefined") {
    window.LayeredModalManager = LayeredModalManager;
}