import deepClone from "./utils/deep-clone";
import TypeChecker from "./utils/type-checker";
import guid from "./utils/guid-generator";
import _ from "./utils/mixins";
import LayeredModalManager from "./layered-modal-manager";

export default class LayeredModal {

    /**
     *
     * @type LayeredModalManager
     */

    #manager = null;

    /**
     * Get modal manager ...
     *
     * @return {LayeredModalManager}
     */

    getManager() {
        return this.#manager;
    }

    setManager(manager) {
        if (manager instanceof LayeredModalManager) {
            this.#manager = manager;
        } else {
            throw new Error('Manager must be an instance of LayeredModalManager');
        }
    }

    /**
     * Class parameters object ..
     *
     * @type {{zIndex : number,id : string, shiftDistance : {top: number, left: number,right: number, bottom: number}, transitionDuration : number, hideXButton : number, cssClass : {modalClose : string, modal : string}, header : object, content: string, footer: object}}
     */

    #params = {};

    /**
     * Get params ...
     *
     * @return {{zIndex: number, id: string, shiftDistance: {top: number, left: number, right: number, bottom: number}, transitionDuration: number, hideXButton : number}}
     */

    getParams() {
        return this.#params;
    }

    constructor(params = {}) {

        if (!TypeChecker.isPlainObject(params)) {
            throw new Error("Invalid parameters: Must be a plain object.");
        }

        this.#params = deepClone(params);


        this.prepareParams();
    }

    /**
     * Prepare params ...
     */

    prepareParams() {

        /**
         * Id ...
         */

        this.#params.id = _.objValueAsString(this.#params, 'id');

        if (!this.#params.id) {
            this.#params.id = guid();
        }

        /**
         * z-index ...
         */

        this.#params.zIndex = _.objValueAsInt(this.#params, 'zIndex', 1);

        if (this.#params.zIndex < 1) {
            this.#params.zIndex = 1;
        }

        /**
         * Shift distance ...
         */

        let sd = this.#params.shiftDistance = _.objValueAsObject(this.#params, 'shiftDistance');

        ['top', 'right', 'bottom', 'left'].forEach(function (key, index, itemList) {

            sd[key] = _.objValueAsInt(sd, key, 0);


        });

        /**
         * Fade transition duration ...
         */

        this.#params.transitionDuration = _.objValueAsInt(this.#params, 'transitionDuration', 300);

        if (this.#params.transitionDuration < 0) {
            this.#params.transitionDuration = 300;
        }

        /**
         * Hide X button?
         */

        this.#params.hideXButton = _.objValueAsIntFlag(this.#params, 'hideXButton', 0);


        /**
         * Css Class ...
         */

        let cssClass = this.#params.cssClass = _.objValueAsObject(this.#params, 'cssClass');

        cssClass.modal = _.objValueAsString(cssClass, 'modal', '');
        cssClass.modalClose = _.objValueAsString(cssClass, 'modalClose', 'modal-close');

        /**
         * header ...
         */

        let header = this.#params.header = _.objValueAsObject(this.#params,'header');

        header.enabled = _.objValueAsIntFlag(header,'enabled',1);
        header.content = _.objValueAsString(header,'content','<h2>Modal Header</h2>');

        /**
         * footer ...
         */

        let footer = this.#params.footer = _.objValueAsObject(this.#params, 'footer');

        footer.enabled = _.objValueAsIntFlag(footer, 'enabled', 1);
        footer.content = _.objValueAsString(footer, 'content', `<div class="text-center"><button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass.modalClose}">Close</button></div>`);

        /**
         * Content ...
         */

        this.#params.content = _.objValueAsString(this.#params,'content','Modal content');
    }

    /**
     * Raw instance id ...
     *
     * @return {string}
     */

    getId() {
        return this.#params.id;
    }

    /**
     * Overlay DOM element ID
     *
     * @return {string}
     */

    getOverlayId() {
        return `overlay-${this.getId()}`;
    }

    /**
     * Modal DOM element ID
     *
     * @return {string}
     */

    getModalId() {
        return `modal-${this.getId()}`;
    }

    /**
     * Calculate shift distance and generate css margin value, so that
     * current modal can be shifted slightly to render a visual stacking
     * effect
     *
     * @return {string}
     */

    generateMarginShift() {

        let marginCss = '', shiftDistance = this.#params.shiftDistance;

        ['top', 'right', 'bottom', 'left'].forEach(function (key, index, itemList) {

            if (shiftDistance[key] > 0) {
                marginCss += `margin-${key}: ${shiftDistance[key]}px;`;
            }

        });

        return marginCss;

    }

    /**
     * Generate markup ...
     *
     * @return {string}
     */

    generateHtml() {

        const {zIndex, content, header, footer, secondaryOverlay} = this.#params;


        let marginCss = this.generateMarginShift();


        return `
        <div id="${this.getOverlayId()}" class="layered-modal-overlay ${secondaryOverlay ? 'secondary' : ''}" style="z-index: ${zIndex};">
            <div id="${this.getModalId()}" class="layered-modal ${this.#params.cssClass.modal}" style="${marginCss}">
                
                ${this.#params.hideXButton <= 0 ? `<span class="x-btn ${this.#params.cssClass.modalClose}">X</span>` : ''}
            
                ${this.generateHeaderMarkup()}
                <div class="layered-modal-content">${this.#params.content}</div>
                ${this.generateFooterMarkup()}
            </div>
        </div>
    `;
    }

    /**
     * header markup ...
     *
     * @return {string}
     */

    generateHeaderMarkup() {

        let header = this.#params.header;

        if(header.enabled <= 0) {
            return '';
        }

        return `<div class="layered-modal-header">${header.content}</div>`;

    }

    /**
     * Footer markup ...
     *
     * @return {string}
     */

    generateFooterMarkup() {

        let footer = this.#params.footer;

        if (footer.enabled <= 0) {
            return '';
        }

        return `<div class="layered-modal-footer">${footer.content}</div>`;

    }


    /**
     * Show modal ...
     */

    show() {
        document.body.insertAdjacentHTML('beforeend', this.generateHtml());

        let modal = document.getElementById(this.getModalId());

        modal.style.display = 'block'; // Make the modal visible

        setTimeout(() => {
            modal.style.opacity = '1'; // Fade in after the modal is displayed
        }, 10); // Small delay to trigger the opacity transition

        this.#bindEvents();
    }

    #timerHiding = null;

    hide() {

        if (this.#timerHiding) {
            return;
        }

        let modal = document.getElementById(this.getModalId());

        if (!modal) {
            return;
        }

        modal.style.opacity = '0'; // Fade out the modal

        this.#timerHiding = setTimeout(() => {

            modal.style.display = 'none'; // Hide the modal completely after fade-out

            const overlay = document.getElementById(this.getOverlayId());

            if (overlay) {
                overlay.remove();
            }

            this.getManager().popStack();

            clearTimeout(this.#timerHiding);

        }, this.#params.transitionDuration);


    }

    /**
     * After the modal is displayed, bind events ...
     */

    #bindEvents() {

        let _this = this;

        let overlay = document.getElementById(this.getOverlayId());

        overlay
            .querySelectorAll(`.${this.#params.cssClass.modalClose}`)
            .forEach(function (item) {
                item.addEventListener('click', function () {
                    _this.getManager().removeModal();
                });
            });


    }


}
