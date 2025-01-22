import _ from "./utils/mixins";
import LayeredModalManager from "./layered-modal-manager";
import {Position,Dimension} from "./interfaces/common";

interface CssClassNames {
    modal? : string;
    modalOk? : string;
    modalClose? : string;
}

interface HeaderParams {
    enabled : number;
    content : string;
}

interface FooterParams {
    enabled: number;
    content?: string;
    mode : string;
    onOk? : any;
}

interface LayeredModalParams {
    id: string;
    zIndex: number;
    content?: string;
    header?: HeaderParams;
    footer?: FooterParams;
    width?: Dimension;
    height?: Dimension;
    position: string;
    shiftDistance? : Position;
    transitionDuration? : number;
    hideXButton? : number;
    cssClass? : CssClassNames;
    onShow? : Function | null;
    onHide? : Function | null;
    secondaryOverlay? : boolean;
    stackIndex : number;
}

export class LayeredModal {

    /**
     * The manager instance ...
     *
     * @type LayeredModalManager
     */

    #manager!: LayeredModalManager;

    /**
     * Get modal manager ...
     *
     * @return {LayeredModalManager}
     */

    getManager(): LayeredModalManager {
        return this.#manager;
    }

    /**
     * Sets a manager instance ...
     *
     * @param manager
     */

    setManager(manager: LayeredModalManager) {
        this.#manager = manager;
    }



    #params: Partial<LayeredModalParams> = {
        id : _.guid(),
        zIndex : 1,
        position : 'center'
    };

    /**
     * Gets params ...
     */

    getParams(): Partial<LayeredModalParams> {
        return this.#params;
    }

    constructor(params: Partial<LayeredModalParams> = {}) {

        this.prepareParams(params);
    }

    /**
     * Prepare params ...
     */

    prepareParams(params : Partial<LayeredModalParams>) {

        /**
         * Stack index ..
         */


        this.#params.stackIndex = _.objValueAsInt(params,'stackIndex');

        /**
         * Id ...
         */

        this.#params.id = _.objValueAsString(params, 'id');

        if (!this.#params.id) {
            this.#params.id = _.guid();
        }

        /**
         * z-index ...
         */

        this.#params.zIndex = _.objValueAsInt(params, 'zIndex', 1);

        if (this.#params.zIndex < 1) {
            this.#params.zIndex = 1;
        }

        /**
         * Shift distance ...
         */

        let _sd : Partial<Position>  = _.objValueAsObject(params, 'shiftDistance');

        _sd.top = _.objValueAsInt(_sd,'top',0);
        _sd.right = _.objValueAsInt(_sd,'right',0);
        _sd.bottom = _.objValueAsInt(_sd,'bottom',0);
        _sd.left = _.objValueAsInt(_sd,'left',0);

        this.#params.shiftDistance = _sd as Position;

        /**
         * Fade transition duration ...
         */

        this.#params.transitionDuration = _.objValueAsInt(params, 'transitionDuration', 0);

        if (this.#params.transitionDuration < 0) {
            this.#params.transitionDuration = 0;
        }

        /**
         * Hide X button?
         */

        this.#params.hideXButton = _.objValueAsIntFlag(params, 'hideXButton', 0);


        /**
         * Css Class ...
         */

        let cssClass : Partial<CssClassNames> = _.objValueAsObject(params, 'cssClass');

        cssClass.modal = _.objValueAsString(cssClass, 'modal', '');
        cssClass.modalClose = _.objValueAsString(cssClass, 'modalClose', 'modal-close');
        cssClass.modalOk = _.objValueAsString(cssClass, 'modalOk', 'modal-ok');

        this.#params.cssClass = cssClass as CssClassNames;

        /**
         * header ...
         */

        let header: Partial<HeaderParams> = _.objValueAsObject(params, 'header');

        header.enabled = _.objValueAsIntFlag(header, 'enabled', 1);
        header.content = _.objValueAsString(header, 'content', '<h2>Modal Header</h2>');

        this.#params.header = header as HeaderParams;

        /**
         * footer ...
         */

        let footer : Partial<FooterParams> = _.objValueAsObject(params, 'footer');

        footer.enabled = _.objValueAsIntFlag(footer, 'enabled', 1);

        footer.mode = _.objValueAsString(footer, 'mode', 'alert');

        if (!['alert', 'confirm', 'custom'].includes(footer.mode)) {
            footer.mode = 'alert';
        }

        if (footer.mode === 'custom') {
            footer.content = _.objValueAsString(footer, 'content', `<div class="text-center"><button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass.modalClose}">Close</button></div>`);
        }

        footer.onOk = _.objValue(footer,'onOk');

        this.#params.footer = footer as FooterParams;

        /**
         * Content ...
         */

        this.#params.content = _.objValueAsString(params, 'content', 'Modal content');

        /**
         * Width
         */

        let w : Partial<Dimension>  = _.objValueAsObject(params, 'width');

        w.value = _.objValueAsFloat(w, 'value', 600);

        if (w.value < 300) {
            w.value = 300;
        }

        w.unit = _.objValueAsString(w, 'unit', 'px');

        if (!w.unit) {
            w.unit = 'px';
        }

        this.#params.width = w as Dimension;

        /**
         * Secondary Overlay?
         */

        this.#params.secondaryOverlay = _.objValueAsBool(params,'secondaryOverlay');

        /**
         * On show and on hide ...
         */

        this.#params.onShow = _.objValueAsMethod(params,'onShow',null);
        this.#params.onHide = _.objValueAsMethod(params,'onHide',null);
    }

    /**
     * Raw instance id ...
     *
     * @return {string}
     */

    getId() : string {
        return this.#params.id  ? this.#params.id : '';
    }

    /**
     * Overlay DOM element ID
     *
     * @return {string}
     */

    getOverlayId() : string {
        return `overlay-${this.getId()}`;
    }

    /**
     * Modal DOM element ID
     *
     * @return {string}
     */

    getModalId() : string {
        return `modal-${this.getId()}`;
    }

    /**
     * Calculate shift distance and generate css margin value, so that
     * current modal can be shifted slightly to render a visual stacking
     * effect
     *
     * @return {string}
     */

    generateMarginShift() : string {

        let marginCss = '',
            sd = this.#params.shiftDistance;

        if(sd?.top !== undefined && sd?.top > 0) {
            marginCss += `margin-top:${sd?.top}px;`;
        }

        if (sd?.right !== undefined && sd?.right > 0) {
            marginCss += `margin-right:${sd?.right}px;`;
        }

        if (sd?.bottom !== undefined && sd?.bottom > 0) {
            marginCss += `margin-bottom:${sd?.bottom}px;`;
        }

        if (sd?.left !== undefined && sd?.left > 0) {
            marginCss += `margin-left:${sd?.left}px;`;
        }


        return marginCss;

    }

    generateWidthCss() : string {
        return `width:${this.#params.width?.value}${this.#params.width?.unit};`;
    }

    /**
     * Generate markup ...
     *
     * @return {string}
     */

    generateHtml() : string {

        const {zIndex, secondaryOverlay} = this.#params;

        let modalInlineCss =
            this.generateMarginShift() +
            this.generateWidthCss() + `transition-duration: ${this.#params.transitionDuration}ms;`;

        return `
        <div id="${this.getOverlayId()}" class="layered-modal-overlay ${secondaryOverlay ? 'secondary' : ''}" style="z-index: ${zIndex};">
            <div id="${this.getModalId()}" class="layered-modal ${this.#params.cssClass?.modal}" style="${modalInlineCss}">
                
                ${this.#params.hideXButton !== undefined && this.#params.hideXButton <= 0 ? `<span class="x-btn ${this.#params.cssClass?.modalClose}">X</span>` : ''}
            
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

        if (header?.enabled && header?.enabled <= 0) {
            return '';
        }

        return `<div class="layered-modal-header">${header?.content}</div>`;

    }

    /**
     * Footer markup ...
     *
     * @return {string}
     */

    generateFooterMarkup() {

        let footer = this.#params.footer;

        if (footer?.enabled && footer?.enabled <= 0) {
            return '';
        }

        if (footer?.mode === 'custom') {
            return `<div class="layered-modal-footer">${footer.content}</div>`;
        } else if (footer?.mode === 'alert') {

            return `<div class="layered-modal-footer d-flex fd-row jc-center">
    <button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass?.modalClose}">Close</button>
</div>`;

        } else if (footer?.mode === 'confirm') {

            return `<div class="layered-modal-footer d-flex fd-row jc-between">
    <button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass?.modalClose}">Close</button>
    
    <button type="button" class="lm-btn lm-btn-success ${this.#params.cssClass?.modalOk}">Ok</button>
</div>`;

        }


    }


    /**
     * Show modal ...
     */

    show() {
        document.body.insertAdjacentHTML('beforeend', this.generateHtml());

        let modal = document.getElementById(this.getModalId());

        if(!modal) {
            return;
        }

        modal.style.display = 'block'; // Make the modal visible

        setTimeout(() => {
            modal.style.opacity = '1'; // Fade in after the modal is displayed

            this.getManager().adjustStackCssClassForModals();

            this.#bindEvents();

            this.getManager().adjustModalMarginsForLatestCenteredMode();

        }, this.#params.transitionDuration); // Small delay to trigger the opacity transition


    }

    #timerHiding : any = null;

    /**
     * Hide the modal ...
     */

    hide(callback : Function | null = null) {

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

            if (callback !== null && _.isFunction(callback)) {
                callback.apply(this);
            } else {
                this.getManager().popStack();
            }

            /**
             * Adjust stacked css class for all modals in stack ...
             */

            this.getManager().adjustStackCssClassForModals();



            if (this.#params.onHide) {
                this.#params.onHide.apply(this);
            }

            this.getManager().adjustModalMarginsForLatestCenteredMode();

        }, this.#params.transitionDuration);


    }

    /**
     * After the modal is displayed, bind events ...
     */

    #bindEvents() {

        let _this = this;

        let overlay = document.getElementById(this.getOverlayId());

        if(!overlay) {
            return;
        }

        /**
         * Modal close trigger click handlers ...
         */

        if(this.#params.cssClass?.modalClose) {

            let closeClass = this.#params.cssClass?.modalClose;

            overlay
                .querySelectorAll(`.${closeClass}`)
                .forEach(function (item) {
                    item.addEventListener('click', function () {
                        _this.getManager().removeModal();
                    });
                });

        }


        /**
         * Modal ok  trigger click handlers ...
         */

        if (_.isFunction(this.#params.footer?.onOk)) {

            let okCssClass : string = '.' + this.#params.cssClass?.modalOk;

            overlay
                .querySelectorAll(okCssClass)
                .forEach(function (item) {
                    item.addEventListener('click', function () {
                        _this.getParams().footer?.onOk.apply(_this);
                    });
                });
        }



        /**
         * Do we have a onShow callback? if so, apply this here.
         * This will ensure that the callback is called when the modal
         * is added to DOm and fully visible.
         */

        if (_this.#params.onShow) {
            _this.#params.onShow.apply(this);
        }



    }

    toggleModalClass(className : string) {

        let modalElement = document.getElementById(this.getModalId());

        if(modalElement) {
            modalElement.classList.toggle(className);
        }


    }

    addModalClass(className: string) {

        let modalElement = document.getElementById(this.getModalId());

        if (modalElement) {
            modalElement.classList.add(className);
        }


    }

    removeModalClass(className: string) {

        let modalElement = document.getElementById(this.getModalId());

        if (modalElement) {
            modalElement.classList.remove(className);
        }


    }

    adjustMargin(position : Position) {

        let element = document.getElementById(this.getModalId());

        if(!element) {
            return;
        }

        if(position.top !== undefined) {
            element.style.marginTop = `${position.top}px`;
        }

        if (position.right !== undefined) {
            element.style.marginRight = `${position.right}px`;
        }

        if (position.bottom !== undefined) {
            element.style.marginBottom = `${position.bottom}px`;
        }

        if (position.left !== undefined) {
            element.style.marginLeft = `${position.left}px`;
        }

    }

    setShiftingDistance(distance : Position,adjustMargins : boolean = true) {

        this.#params.shiftDistance = distance;

        if(adjustMargins) {
            this.adjustMargin(distance);
        }

    }

}
