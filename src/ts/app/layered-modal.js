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
     * @type {{width : {value : number,unit: string},zIndex : number,id : string, shiftDistance : {top: number, left: number,right: number, bottom: number}, transitionDuration : number, hideXButton : number, cssClass : {modalClose : string, modal : string, modalOk : string}, header : object, content: string, footer: object, onShow : null, onHide : null}}
     */

    #params = {};

    /**
     * Get parameters object ...
     *
     * @return {{width: {value: number, unit: string}, zIndex: number, id: string, shiftDistance: {top: number, left: number, right: number, bottom: number}, transitionDuration: number, hideXButton: number, cssClass: {modalClose: string, modal: string, modalOk : string}, header: Object, content: string, footer: Object}}
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

        this.#params.transitionDuration = _.objValueAsInt(this.#params, 'transitionDuration', 100);

        if (this.#params.transitionDuration < 0) {
            this.#params.transitionDuration = 0;
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
        cssClass.modalOk = _.objValueAsString(cssClass, 'modalOk', 'modal-ok');

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

        footer.mode = _.objValueAsString(footer,'mode','alert');

        if(!['alert','confirm','custom'].includes(footer.mode)) {
            footer.mode = 'alert';
        }

        if(footer.mode === 'custom') {
            footer.content = _.objValueAsString(footer, 'content', `<div class="text-center"><button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass.modalClose}">Close</button></div>`);
        }


        /**
         * Content ...
         */

        this.#params.content = _.objValueAsString(this.#params,'content','Modal content');

        /**
         * Width
         */

        let w = this.#params.width = _.objValueAsObject(this.#params,'width');

        w.value = _.objValueAsFloat(w,'v',600);

        if(w.value < 300) {
            w.value = 300;
        }

        w.unit = _.objValueAsString(w,'u','px');

        if(!w.unit) {
            w.unit = 'px';
        }
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

    generateWidthCss() {
        return `width:${this.#params.width.value}${this.#params.width.unit};`;
    }

    /**
     * Generate markup ...
     *
     * @return {string}
     */

    generateHtml() {

        const {zIndex, secondaryOverlay} = this.#params;


        let modalInlineCss =
            this.generateMarginShift() +
            this.generateWidthCss();


        return `
        <div id="${this.getOverlayId()}" class="layered-modal-overlay ${secondaryOverlay ? 'secondary' : ''}" style="z-index: ${zIndex};">
            <div id="${this.getModalId()}" class="layered-modal ${this.#params.cssClass.modal}" style="${modalInlineCss}">
                
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

        if(footer.mode === 'custom') {
            return `<div class="layered-modal-footer">${footer.content}</div>`;
        } else if(footer.mode === 'alert') {

            return `<div class="layered-modal-footer d-flex fd-row jc-center">
    <button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass.modalClose}">Close</button>
</div>`;

        } else if (footer.mode === 'confirm') {

            return `<div class="layered-modal-footer d-flex fd-row jc-between">
    <button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass.modalClose}">Close</button>
    
    <button type="button" class="lm-btn lm-btn-success ${this.#params.cssClass.modalOk}">Ok</button>
</div>`;

        }



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

            this.#bindEvents();

        }, 10); // Small delay to trigger the opacity transition


    }

    #timerHiding = null;

    /**
     * Hide the modal ...
     */

    hide(callback = null) {

        /**
         * While an animation or transition is going on,
         * we wont allow this function call. This is to throttle
         * the hide function calls via escape key or fast mouse clicks
         */

        if (this.#timerHiding !== null) {
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

            clearTimeout(this.#timerHiding);

            this.#timerHiding = null;

            /**
             * The logic here, if we close the modal via manager, the manager
             * will call the hide() method with a callback. The callback will
             * then pop the latest modal, which is this one from the stack.
             *
             * But, if we close this via the modal's own hide() method, we then
             * need to pop from the stack in manager instance.
             */

            if(_.isFunction(callback)) {
                callback.apply(this);
            } else {
                this.getManager().popStack();
            }

            if (this.#params.hasOwnProperty('onHide') && _.isFunction(this.#params.onHide)) {
                this.#params.onHide.apply(this);
            }

        }, this.#params.transitionDuration);


    }

    /**
     * After the modal is displayed, bind events ...
     */

    #bindEvents() {

        let _this = this;

        let overlay = document.getElementById(this.getOverlayId());

        /**
         * Modal close trigger click handlers ...
         */

        overlay
            .querySelectorAll(`.${this.#params.cssClass.modalClose}`)
            .forEach(function (item) {
                item.addEventListener('click', function () {
                    _this.getManager().removeModal();
                });
            });

        /**
         * Modal ok  trigger click handlers ...
         */

        if(this.#params.footer.hasOwnProperty('onOk') && _.isFunction(this.#params.footer.onOk)) {
            overlay
                .querySelectorAll(`.${this.#params.cssClass.modalOk}`)
                .forEach(function (item) {
                    item.addEventListener('click', function () {
                        _this.getParams().footer.onOk.apply(_this);
                    });
                });
        }



        /**
         * Do we have a onShow callback? if so, apply this here.
         * This will ensure that the callback is called when the modal
         * is added to DOm and fully visible.
         */

        if(_this.#params.hasOwnProperty('onShow') && _.isFunction(this.#params.onShow)) {
            _this.#params.onShow.apply(this);
        }

    }


}
