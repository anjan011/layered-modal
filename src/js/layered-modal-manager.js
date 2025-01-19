import LayeredModal from './layered-modal.js';

export default class LayeredModalManager {

    #params = {};

    #stack = [];

    constructor(params = {}) {

        if (typeof params !== 'object' || params === null || Array.isArray(params)) {
            throw new Error("LayeredModalManager constructor parameter must be a plain object.");
        }

        this.#params = params;

        this.#params.zIndex = this.#params.zIndex || 1;

    }

    addModal(params) {
        if (typeof params !== 'object' || params === null || Array.isArray(params)) {
            throw new Error("AddModal parameters must be a plain object.");
        }

        // Set zIndex based on stack
        const topModal = this.#stack.length > 0 ? this.#stack[this.#stack.length - 1] : null;
        params.zIndex = this.#params.zIndex + (topModal ? topModal.getParams().zIndex : 1);

        // secondary overlay?

        params.secondaryOverlay = this.#stack.length > 0;

        const newModal = new LayeredModal(params);
        newModal.show();

        this.#stack.push(newModal);
    }

    removeModal() {

        if (this.#stack.length === 0) return;

        const topModal = this.#stack.pop();
        topModal.hide();
    }
}

/**
 * Make LayeredModalManager available for browsers ...
 */

if (typeof window !== "undefined") {
    window.LayeredModalManager = LayeredModalManager;
}