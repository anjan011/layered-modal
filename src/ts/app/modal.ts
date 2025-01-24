import _ from "./utils/mixins";
import {ModalManager} from "./modal-manager";
import {Position, Dimension} from "./interfaces/common";
import {
    ModalBodyParams,
    ModalCssClassNames,
    ModalFooterParams,
    ModalHeaderParams,
    ModalParams
} from "./interfaces/modal"
import ModalParameterParser from "./parsers/parameters/modal-parameter-parser";
import {HtmlAttributeGenerator} from "./generators/html-attribute-generator";
import {CssRulesGenerator} from "./generators/css-rules-generator";
import {DomUtils} from "./utils/dom";
import {EmbedCodeGenerator} from "./generators/embed-code-generator";


export class Modal {

    /**
     * Attributes generator ...
     *
     * @private
     */

    #attrGenerator = new HtmlAttributeGenerator();

    /**
     * The manager instance ...
     *
     * @type ModalManager
     */

    #manager!: ModalManager;

    /**
     * Get modal manager ...
     *
     * @return {ModalManager}
     */

    getManager(): ModalManager {
        return this.#manager;
    }

    /**
     * Sets a manager instance ...
     *
     * @param manager
     */

    setManager(manager: ModalManager) {
        this.#manager = manager;
    }


    #params: Partial<ModalParams> = {
        id: _.guid(),
        zIndex: 1,
        position: 'middle-center'
    };

    /**
     * Gets params ...
     */

    getParams(): Partial<ModalParams> {
        return this.#params;
    }

    constructor(params: Partial<ModalParams> = {}) {

        this.#params = ModalParameterParser.parse(params);
    }


    /**
     * Raw instance id ...
     *
     * @return {string}
     */

    getId(): string {
        return this.#params.id ? this.#params.id : '';
    }

    /**
     * Overlay DOM element ID
     *
     * @return {string}
     */

    getOverlayId(): string {
        return `overlay-${this.getId()}`;
    }

    /**
     * Modal DOM element ID
     *
     * @return {string}
     */

    getModalId(): string {
        return `modal-${this.getId()}`;
    }

    getModalHeaderId(): string {
        return `modal-header-${this.getId()}`;
    }

    /**
     * Calculate shift distance and generate css margin value, so that
     * current modal can be shifted slightly to render a visual stacking
     * effect
     *
     * @return {string}
     */

    generateMarginShift(): string {

        let marginCss = '',
            sd = this.#params.shiftDistance;

        if (sd?.top !== undefined && sd?.top > 0) {
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


    /**
     * Generate markup ...
     *
     * @return {string}
     */

    generateHtml(): string {

        const {zIndex, secondaryOverlay} = this.#params;

        let cssClassList = [
            'layered-modal-overlay'
        ];

        if (this.#params.position !== undefined) {
            cssClassList.push(this.#params.position);
        }

        if(secondaryOverlay !== undefined && secondaryOverlay) {
            cssClassList.push('secondary');
        }

        return `
        <div id="${this.getOverlayId()}" class="${cssClassList.join(' ')}" style="z-index: ${zIndex};">
            ${this.generateModalMarkup()}
        </div>
    `;
    }

    /**
     * Modal markup ...
     */

    generateModalMarkup(): string {

        // region [Inline CSS Styles ...]

        let modalInlineCss = [
            this.generateMarginShift(),
            CssRulesGenerator.generateDimensionCss(this.#params.width, 'width'),
            CssRulesGenerator.generateDimensionCss(this.#params.height, 'height'),
            `transition-duration: ${this.#params.transitionDuration}ms;`,
        ];

        // endregion

        // region [Css class list ...]

        let modalCssClassList = [
            'layered-modal',
            this.#params.cssClass?.modal,
        ];

        if (this.#params.draggable) {
            modalCssClassList.push('lm-draggable');
        }

        if (this.#params.userSelect !== undefined && !this.#params.userSelect) {
            modalCssClassList.push('no-user-select');
        }

        // endregion

        return `<div id="${this.getModalId()}" class="${modalCssClassList.join(' ')}" style="${modalInlineCss.join('')}">
                
                ${this.generateXButtonMarkup()}
            
                ${this.generateHeaderMarkup()}
                ${this.generateBodyMarkup()}
                ${this.generateFooterMarkup()}
            </div>`;
    }

    /**
     * Close button markup at the top right corner ...
     */

    generateXButtonMarkup(): string {

        if(this.#params.xButton === undefined) {
            return '';
        }

        let btn = this.#params.xButton;

        console.log(btn);

        if(!btn.enabled) {
            return '';
        }

        return `<span class="x-btn ${btn.cssClass} ${this.#params.cssClass?.modalClose}" ${btn.inlineStyles ? `style="${btn.inlineStyles}"`:''}>${btn.content}</span>`;
    }

    /**
     * Generates markup for body ...
     */

    generateBodyMarkup(): string {

        let body = this.#params.body;

        if (typeof body === "undefined") {
            throw new Error('Modal body content not defined');
        }

        // region [Css Classes ...]

        let classList = [
            body.cssClass
        ];

        if (body.noPadding) {
            classList.push('no-padding');
        }

        // endregion

        // region [Inline styles ...]

        let styles = [

        ];

        if(body.inlineStyles !== undefined) {
            styles.push(_.ensureSemicolon(body.inlineStyles as string));
        }

        if (body.aspectRatio !== undefined) {
            if (body.aspectRatio > 0) {
                styles.push(`aspect-ratio: ${body.aspectRatio};`);
            }
        }

        if(body.maxHeight !== undefined) {
            let maxHeight = CssRulesGenerator.generateDimensionCss(body.maxHeight,'max-height');

            if(maxHeight) {
                styles.push(maxHeight);
            }
        }

        // endregion

        let bodyAttrs = this.#attrGenerator.generateAttributes({
            class: classList,
            style: styles
        });

        let content = '';

        if (body.contentType === 'html') {
            content = body.content as string;
        } else if (body.contentType === 'iframe') {
            content = body.iframeCode as string;

            if (!DomUtils.isValidIframe(content)) {
                content = 'Invalid iframe code';
            }

        } else if (body.contentType === 'function') {

            let returnValue = null;

            if (typeof body.functionName === 'string') {
                returnValue = DomUtils.getFunctionResult(body.functionName, body.functionArguments);
            } else if (typeof body.functionName === 'function') {

                returnValue = body.functionName.apply(null, [body.functionArguments]);

            }

            if (typeof returnValue !== 'string') {
                throw new Error(`${body.functionName} return value must be a string data type`);
            }

            content = returnValue;

        } else if (body.contentType === 'template') {

            let templateId = _.objValueAsString(body,'templateId');

            if(templateId === '') {
                content = 'Template element id is required';
            } else {

                let templateElement = document.getElementById(templateId);

                if(templateElement === null || !(templateElement instanceof HTMLTemplateElement)) {

                    content = `Template element not found by ID: ${templateId}`;

                } else {
                    content = templateElement.innerHTML;
                }

            }

        } else if (body.contentType === 'image') {

            content = 'Image type ...';

        } else if (body.contentType === 'ajax') {
            content = 'Ajax type ...';
        } else if (body.contentType === 'youtube-video') {

            let embedCode = EmbedCodeGenerator.fromYouTubeVideo(body.videoUrl ?? '');

            if (!embedCode) {
                content = "Invalid youtube video url";
            } else {
                content = embedCode;
            }
        }

        if (content === '') {
            content = 'Modal content not found';
        }

        return `<div ${bodyAttrs}>${content}</div>`;

    }

    /**
     * header markup ...
     *
     * @return {string}
     */

    generateHeaderMarkup() {

        let header = this.#params.header;

        if(header === undefined) {
            return '';
        }

        if (header?.enabled !== undefined && !header?.enabled) {
            return '';
        }

        let classList = [];

        if (this.#params.draggable && this.#params.dragHandle === '') {
            classList.push('lm-drag-handle');
        }

        if(header.cssClass) {
            classList.push(header.cssClass);
        }

        return `<div id="${this.getModalHeaderId()}" class="layered-modal-header ${classList.join(' ')}" style="${header.inlineStyles}">${header?.content}</div>`;

    }

    /**
     * Footer markup ...
     *
     * @return {string}
     */

    generateFooterMarkup() {

        let footer = this.#params.footer;

        if(footer === undefined) {
            return '';
        }

        if (footer?.enabled !== undefined && !footer?.enabled) {
            return '';
        }

        if (footer?.mode === 'custom') {
            return `<div class="layered-modal-footer ${footer.cssClass}" style="${footer.inlineStyles}">${footer.content}</div>`;
        } else if (footer?.mode === 'alert') {

            return `<div class="layered-modal-footer d-flex fd-row jc-center  ${footer.cssClass}" style="${footer.inlineStyles}">
    <button type="button" class="lm-btn lm-btn-error ${this.#params.cssClass?.modalClose}">Close</button>
</div>`;

        } else if (footer?.mode === 'confirm') {

            return `<div class="layered-modal-footer d-flex fd-row jc-between  ${footer.cssClass}" style="${footer.inlineStyles}">
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

        if (!modal) {
            return;
        }

        modal.style.display = 'flex'; // Make the modal visible

        setTimeout(() => {
            modal.style.opacity = '1'; // Fade in after the modal is displayed

            this.getManager().adjustStackCssClassForModals();

            this.#bindEvents();

        }, this.#params.transitionDuration); // Small delay to trigger the opacity transition


    }

    #timerHiding: any = null;

    /**
     * Hide the modal ...
     */

    hide(callback: Function | null = null) {

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

        }, this.#params.transitionDuration);


    }

    /**
     * After the modal is displayed, bind events ...
     */

    #bindEvents() {

        let _this = this;

        let overlay = document.getElementById(this.getOverlayId());

        if (!overlay) {
            return;
        }

        /**
         * Modal close trigger click handlers ...
         */

        if (this.#params.cssClass?.modalClose) {

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

            let okCssClass: string = '.' + this.#params.cssClass?.modalOk;

            overlay
                .querySelectorAll(okCssClass)
                .forEach(function (item) {
                    item.addEventListener('click', function () {
                        _this.getParams().footer?.onOk.apply(_this);
                    });
                });
        } else if (_.isString(this.#params.footer?.onOk)) {

            let functionName = this.#params.footer?.onOk;

            let okCssClass: string = '.' + this.#params.cssClass?.modalOk;

            overlay
                .querySelectorAll(okCssClass)
                .forEach(function (item) {
                    item.addEventListener('click',  () => {

                        DomUtils.executeFunction(functionName,'',_this);
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

        /**
         * Handle dragging ...
         */


        this.handleDragEvents();


    }

    handleDragEvents() {

        if (!this.#params.draggable) {
            return;
        }

        const modal = document.getElementById(this.getModalId()) as HTMLElement;

        let dragHandle = null;

        if (this.#params.dragHandle !== '') {
            dragHandle = document.getElementById(this.#params.dragHandle as string);
        } else {
            if (this.#params.header !== undefined && this.#params.header?.enabled) {
                dragHandle = document.getElementById(this.getModalHeaderId());
            }

        }

        if (!dragHandle) {
            dragHandle = modal;
        }

        if (!dragHandle.classList.contains('lm-drag-handle')) {
            dragHandle.classList.add('lm-drag-handle');
        }


        let isDragging: boolean = false;
        let startX: number, startY: number;
        let marginLeft: number = 0;
        let marginTop: number = 0;

        dragHandle.addEventListener("mousedown", function (event: MouseEvent) {
            isDragging = true;

            // Get initial mouse position
            startX = event.clientX;
            startY = event.clientY;

            // Get current margin values (parse as number)
            marginLeft = parseInt(window.getComputedStyle(modal).marginLeft, 10) || 0;
            marginTop = parseInt(window.getComputedStyle(modal).marginTop, 10) || 0;

            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", stopDrag);
        });

        function drag(event: MouseEvent) {
            if (!isDragging) return;

            // Calculate new position
            const deltaX: number = event.clientX - startX;
            const deltaY: number = event.clientY - startY;

            modal.style.marginLeft = `${marginLeft + deltaX}px`;
            modal.style.marginTop = `${marginTop + deltaY}px`;
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDrag);
        }
    }

    toggleModalClass(className: string) {

        let modalElement = document.getElementById(this.getModalId());

        if (modalElement) {
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

    adjustMargin(position: Position) {

        let element = document.getElementById(this.getModalId());

        if (!element) {
            return;
        }

        if (position.top !== undefined) {
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

    setShiftingDistance(distance: Position, adjustMargins: boolean = true) {

        this.#params.shiftDistance = distance;

        if (adjustMargins) {
            this.adjustMargin(distance);
        }

    }

}
