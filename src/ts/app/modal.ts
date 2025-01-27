import _ from "./utils/mixins";
import ModalManager from "./modal-manager";
import {ButtonParams, Position} from "./interfaces/common";
import {ModalBodyParams, ModalParams, BackDropParams} from "./interfaces/modal"
import ModalParameterParser from "./parsers/parameters/modal-parameter-parser";
import {HtmlAttributeGenerator} from "./generators/html-attribute-generator";
import {CssRulesGenerator} from "./generators/css-rules-generator";
import {DomUtils} from "./utils/dom";
import {EmbedCodeGenerator} from "./generators/embed-code-generator";

export default class Modal {

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

        console.log(this.#params);
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
     * BackDrop DOM element ID
     *
     * @return {string}
     */

    geBackDropId(): string {
        return `backdrop-${this.getId()}`;
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

    isAjaxContentType(): boolean {
        return this.#params.body?.contentType === 'ajax';
    }

    generateAjaxLoaderMarkup(): string {
        return `<div class="loader"></div>`;
    }

    /**
     * Generate markup ...
     *
     * @return {string}
     */

    generateHtml(): string {

        const {zIndex, secondaryBackDrop} = this.#params;

        let cssClassList = [
            'layered-modal-backdrop'
        ];

        if (this.#params.position !== undefined) {
            cssClassList.push(this.#params.position);
        }

        if (secondaryBackDrop !== undefined && secondaryBackDrop) {
            cssClassList.push('secondary');
        }

        // region [Inline Styles ...]

        let inlineStyles = [
            `z-index: ${zIndex};`,
            this.generateBackDropInlineStyles(this.#params.backDrop)
        ];

        // endregion

        return `
        <div id="${this.geBackDropId()}" class="${cssClassList.join(' ')}" style="${inlineStyles.join('')}">
            ${this.isAjaxContentType() ? this.generateAjaxLoaderMarkup() : this.generateModalMarkup()}
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
            `transition-duration: ${this.#params.transitionDuration}ms;`,
        ];

        if (this.#params.width) {

            if (!this.#params.autoWidth) {
                modalInlineCss.push(
                    CssRulesGenerator.generateDimensionCss(this.#params.width, 'width')
                );
            }

        }

        if (this.#params.maxWidth) {
            modalInlineCss.push(
                CssRulesGenerator.generateDimensionCss(this.#params.maxWidth, 'max-width')
            );
        }

        if (this.#params.minWidth) {
            modalInlineCss.push(
                CssRulesGenerator.generateDimensionCss(this.#params.minWidth, 'min-width')
            );
        }

        if (this.#params.height) {

            if (!this.#params.autoHeight) {
                modalInlineCss.push(
                    CssRulesGenerator.generateDimensionCss(this.#params.height, 'height')
                );
            }

        }

        if (this.#params.maxHeight) {
            modalInlineCss.push(
                CssRulesGenerator.generateDimensionCss(this.#params.maxHeight, 'max-height')
            );
        }

        if (this.#params.minHeight) {
            modalInlineCss.push(
                CssRulesGenerator.generateDimensionCss(this.#params.minHeight, 'min-height')
            );
        }

        /*console.log('Generated inline css ....');
        console.log(modalInlineCss.join(''));*/

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

        if (this.#params.xButton === undefined) {
            return '';
        }

        let btn = this.#params.xButton;

        if (!btn.enabled) {
            return '';
        }

        return `<span class="x-btn ${btn.cssClass} ${this.#params.cssClass?.modalClose}" ${btn.inlineStyles ? `style="${btn.inlineStyles}"` : ''}>${btn.content}</span>`;
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

        let styles = [];

        if (body.inlineStyles !== undefined) {
            styles.push(_.ensureSemicolon(body.inlineStyles as string));
        }

        if (body.aspectRatio !== undefined) {
            if (body.aspectRatio > 0) {
                styles.push(`aspect-ratio: ${body.aspectRatio};`);
            }
        }

        if (body.maxHeight !== undefined) {
            let maxHeight = CssRulesGenerator.generateDimensionCss(body.maxHeight, 'max-height');

            if (maxHeight) {
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

            let templateId = _.objValueAsString(body, 'templateId');

            if (templateId === '') {
                content = 'Template element id is required';
            } else {

                let templateElement = document.getElementById(templateId);

                if (templateElement === null || !(templateElement instanceof HTMLTemplateElement)) {

                    content = `Template element not found by ID: ${templateId}`;

                } else {
                    content = templateElement.innerHTML;
                }

            }

        } else if (body.contentType === 'image') {

            if (body.imageParams !== undefined) {

                let imgParams = body.imageParams;

                let imageUrl = imgParams.url.trim();

                if (!imageUrl) {
                    content = 'Image url cannot be empty';
                } else {

                    let imgAttrs: any = {
                        class: 'lm-single-image',
                        src: imageUrl,
                    };

                    if (imgParams.title) {
                        imgAttrs.title = imgParams.title;
                    }

                    if (imgParams.alt) {
                        imgAttrs.alt = imgParams.alt;
                    }

                    if (imgParams.cssClass) {
                        imgAttrs.class += ` ${imgParams.cssClass}`;
                    }

                    if (imgParams.inlineStyles) {
                        imgAttrs.style = imgParams.inlineStyles;
                    }

                    let captionText = '';
                    let captionMarkup = '';


                    if (imgParams.captionTemplate) {

                        let captionTemplate = document.getElementById(imgParams.captionTemplate);

                        if (captionTemplate) {
                            captionText = captionTemplate.innerHTML;
                        } else {
                            captionText = `Caption template not found with id: ${captionTemplate}`;
                        }

                    } else if (imgParams.caption) {
                        captionText = imgParams.caption;
                    }

                    if (captionText) {
                        captionMarkup = `<div class="lm-image-caption ${imgParams.captionCssClass}">${captionText}</div>`;
                    }


                    content = `<img ${this.#attrGenerator.generateAttributes(imgAttrs)} />${captionMarkup}`;

                }

            } else {
                content = 'Image url not provided';
            }


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

        if (header === undefined) {
            return '';
        }

        if (header?.enabled !== undefined && !header?.enabled) {
            return '';
        }

        let classList = [];

        if (this.#params.draggable && this.#params.dragHandle === '') {
            classList.push('lm-drag-handle');
        }

        if (header.cssClass) {
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

        if (footer === undefined) {
            return '';
        }

        if (footer?.enabled !== undefined && !footer?.enabled) {
            return '';
        }

        if (footer?.mode === 'custom') {
            return `<div class="layered-modal-footer ${footer.cssClass}" style="${footer.inlineStyles}">${footer.content}</div>`;
        } else if (footer?.mode === 'alert') {

            return `<div class="layered-modal-footer d-flex fd-row jc-center  ${footer.cssClass}" style="${footer.inlineStyles}">
    ${this.generateFooterButtonMarkup(footer.closeButton)}
</div>`;

        } else if (footer?.mode === 'confirm') {

            return `<div class="layered-modal-footer d-flex fd-row jc-between  ${footer.cssClass}" style="${footer.inlineStyles}">
    ${this.generateFooterButtonMarkup(footer.closeButton)}
    ${this.generateFooterButtonMarkup(footer.okButton)}
</div>`;

        }


    }


    show() {

        if (this.isAjaxContentType()) {
            this.showAjax();
        } else {
            this.showOther();
        }

    }

    /**
     * Set body content and type ...
     *
     * @param contentType
     * @param content
     */

    setBodyContent(contentType: string = 'html', content: string) {

        if (!this.#params.body) {
            this.#params.body = {} as Partial<ModalBodyParams>;
        }

        if (!ModalParameterParser.isValidBodyContentType(contentType)) {
            this.#params.body.contentType = 'html';
        } else {
            this.#params.body.contentType = contentType;
        }


        this.#params.body.content = content;
    }

    async loadHtmlInModalViaFetch() {

        if (!this.#params.body) {
            return;
        }

        let ap = this.#params.body?.ajaxParams;

        let url: string = _.objValueAsString(ap, 'url');

        let timeout = ap?.timeoutMs;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {

            if (url === '') {

                this.setBodyContent('html', `AJAX url not defined or empty`);

            } else {

                let fetchParams = {
                    method: _.objValueAsString(ap, 'method', 'GET'),
                    headers: _.objValueAsObject(ap, 'headers'),
                    signal: controller.signal
                } as RequestInit;

                /**
                 * Prepare ajax data ...
                 */

                if (fetchParams.method === 'GET') {

                    if (ap?.data) {

                        if (_.isPlainObject(ap.data)) {
                            url = _.appendQueryParams(url, ap.data);
                        } else if (ap.data instanceof FormData) {

                            const urlObject = new URL(url);

                            url = urlObject.search ?
                                `${url}&${new URLSearchParams(ap.data as any).toString()}` :
                                `${url}?${urlObject.toString()}`;

                        }

                    }

                } else if (fetchParams.method === 'POST') {

                    let headers = fetchParams.headers as Record<string, string>;

                    if (ap?.data) {

                        if (_.isPlainObject(ap.data)) {

                            headers['Content-Type'] = 'application/x-www-form-urlencoded';

                            fetchParams.body = _.buildQueryParams(ap.data, '');

                        } else if (ap.data instanceof FormData) {

                            headers['Content-Type'] = 'application/x-www-form-urlencoded';

                            fetchParams.body = new URLSearchParams(ap.data as any).toString();

                        }

                    }

                }

                if (ap?.decodeParams !== undefined && ap.decodeParams) {
                    url = decodeURIComponent(url);
                }


                const response = await fetch(url, fetchParams);

                if (!response.ok) {

                    if (this.#params.body) {

                        this.setBodyContent('html', `HTTP error! Status: ${response.status}`);
                    }

                } else {

                    let html: string = await response.text();

                    if (ap?.contentDataType === 'html') {

                        html = this.ajaxScriptsAndStylesParsers(html);

                        if (typeof ap?.transformHtml === 'function') {
                            html = ap.transformHtml.apply(this, [html]);
                        }

                    } else if (ap?.contentDataType === 'json') {

                        if (typeof ap?.transformJson === 'function') {

                            try {

                                let jsonData = JSON.parse(html);

                                html = ap.transformJson.apply(this, [jsonData]);

                            } catch (error: any) {

                                html = `Could not parse JSON text.<hr>Error: ${_.encodeHTML(error.message)}`;

                            }


                        } else {
                            html = 'transformJson callback is required to transform JSON data into html code as modal body content.';
                        }
                    }

                    this.setBodyContent('html', html);
                }

            }


        } catch (error: any) {


            if (this.#params.body) {


                if ((error as DOMException).name === "AbortError") {
                    this.setBodyContent('html', `Request timed out after ${timeout}ms`);
                } else {
                    this.setBodyContent('html', `Error fetching ajax content.<hr>Error: ` + error.message)
                }


            }


        } finally {
            clearTimeout(timeoutId);
        }

        let elem = document.getElementById(this.geBackDropId());

        if (elem) {

            elem.innerHTML = this.generateModalMarkup();

            let modal = document.getElementById(this.getModalId());

            this.handleModalDisplay(modal);


        }
    }

    #ajaxScripts: Array<HTMLScriptElement> = [];

    /**
     * Parse script tags from AJAX html ...
     *
     * @param html
     */

    ajaxScriptsAndStylesParsers(html : string) : string {

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        let nodes = doc.querySelectorAll('link,script,style');

        if(nodes.length) {

            nodes.forEach( (item : Element, index, itemList) => {

                let newNode = item.cloneNode(true) as Element;

                newNode.setAttribute('data-modal',this.getId());

                if(newNode.tagName.toLowerCase() === 'script') {

                    /**
                     * We have to do attributes cloning, because
                     * a cloned script if used as it is, will not execute
                     * again
                     */

                    let newScript = document.createElement('script');

                    [...newNode.attributes].forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });


                    if (newNode.textContent) {
                        newScript.textContent = newNode.textContent;
                    }

                    this.#ajaxScripts.push(newScript);
                } else {
                    document.head.appendChild(newNode);
                }


                item.remove();

            });

        }


        return doc.body.innerHTML;

    }

    /**
     * On modal remove, remove all script, style and link tanks that was inserted as
     * part of modal content ...
     */

    cleanUpAjaxScriptsAndStyles() {

        let scriptsList = document.querySelectorAll(`[data-modal="${this.getId()}"]`);

        if(scriptsList.length > 0) {

            scriptsList.forEach(function (item, index, itemList) {

                item.remove();

            });

        }

        this.#ajaxScripts = [];

    }

    /**
     * Generates footer button markup ...
     *
     * @param button
     */

    generateFooterButtonMarkup(button: Partial<ButtonParams>) : string {

        if(!button) {
            return '';
        }

        return `<button type="button" class="${button.cssClass ?? ''}" style="${button.inlineStyles}">
    ${(button.iconClass && button.iconPosition === 'left') ? `<i class="${button.iconClass}"></i> `:''}
    ${button.text}
    ${(button.iconClass && button.iconPosition === 'right') ? ` <i class="${button.iconClass}"></i>` : ''}
</button>`;

    }

    /**
     * Handle modal display logic.
     *
     * @param modal
     */

    handleModalDisplay(modal: HTMLElement | null) {

        if (!modal) {
            return;
        }

        modal.style.display = 'flex'; // Make the modal visible

        setTimeout(() => {
            modal.style.opacity = '1'; // Fade in after the modal is displayed

            this.getManager().adjustStackCssClassForModals();

            /**
             * Bind events and other things after modal is displayed ...
             */

            this.#bindEvents();

            /**
             * We add overflow hidden to body with a css class,
             * preventing body from scrolling
             */

            this.addNoOverflowToBody();

        }, this.#params.transitionDuration); // Small delay to trigger the opacity transition
    }

    /**
     * Adds a css class to body, to make overflow hidden,
     * this is to make the body non scollable.
     */

    addNoOverflowToBody() {

        document.body.classList.add('no-overflow');

    }

    /**
     * Handle the logic of showing modal using AJAX operation.
     * This first loads the backdrop with loader animation. Then
     * when ajax call finishes it loads the content either directly
     * or via transformation. Else, it displays error message, as long
     * as the http status code is not 200
     */

    showAjax() {

        if (!this.isAjaxContentType()) {
            return;
        }

        document.body.insertAdjacentHTML('beforeend', this.generateHtml());

        let backDrop = document.getElementById(this.geBackDropId());

        if (!backDrop) {
            return;
        }

        this.addNoOverflowToBody();

        this.loadHtmlInModalViaFetch();

    }

    /**
     * Show modal for any other content types other than ajax.
     */

    showOther() {

        if (this.isAjaxContentType()) {
            return;
        }

        document.body.insertAdjacentHTML('beforeend', this.generateHtml());

        let modal = document.getElementById(this.getModalId());

        this.handleModalDisplay(modal);

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

            const backDrop = document.getElementById(this.geBackDropId());

            if (backDrop) {
                backDrop.remove();
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

            /**
             * Remove overflow hidden from body ...
             */


            if (this.getManager().stackSize() === 0) {
                document.body.classList.remove('no-overflow');
            }

            /**
             * Clean up ajax scripts ...
             */

            this.cleanUpAjaxScriptsAndStyles();

            /**
             * If there is any on hide callback, execute it ...
             */

            if (this.#params.onHide) {

                if (_.isFunction(this.#params.onHide)) {
                    this.#params.onHide.apply(this);
                } else if (_.isString(this.#params.onHide)) {
                    DomUtils.executeFunction(this.#params.onHide, '', this);
                }


            }

        }, this.#params.transitionDuration);


    }

    /**
     * After the modal is displayed, bind events ...
     */

    #bindEvents() {

        let backDrop = document.getElementById(this.geBackDropId());

        if (!backDrop) {
            return;
        }

        /**
         * If we have any scripts loaded through ajax, append them to DOM here.
         */

        if(this.#params.body) {

            if(this.#ajaxScripts.length) {

                this.#ajaxScripts.forEach(function (item : HTMLScriptElement, index, itemList) {

                        document.body.appendChild(item);

                });
            }

        }

        /**
         * Modal close trigger click handlers ...
         */

        this.handleModalClose(backDrop);

        /**
         * Modal ok  trigger click handlers ...
         */


        this.handleFooterOnOk(backDrop);

        /**
         * Handle onShow ...
         */

        this.handleOnShow();


        /**
         * Handle dragging ...
         */


        this.handleDragEvents();


    }

    /**
     * Handle modal close event clicks ...
     *
     * @param backDrop
     */

    handleModalClose(backDrop?: HTMLElement) {

        if (!backDrop) {
            return;
        }

        let _this = this;

        if (_this.#params.cssClass?.modalClose) {

            let closeClass = _this.#params.cssClass?.modalClose;

            backDrop
                .querySelectorAll(`.${closeClass}`)
                .forEach(function (item) {
                    item.addEventListener('click', function () {
                        _this.getManager().removeModal();
                    });
                });

        }

    }

    /**
     * In confirm mode, the footer has an ok button, this function handles
     * the click event for this button.
     */

    handleFooterOnOk(backDrop?: HTMLElement) {

        if (!backDrop) {
            return;
        }

        let _this = this;

        if (_.isFunction(this.#params.footer?.onOk)) {

            let okCssClass: string = '.' + _this.#params.cssClass?.modalOk;

            backDrop
                .querySelectorAll(okCssClass)
                .forEach((item) => {
                    item.addEventListener('click', () => {
                        _this.getParams().footer?.onOk.apply(_this);
                    });
                });
        } else if (_.isString(_this.#params.footer?.onOk)) {

            let functionName = _this.#params.footer?.onOk;

            let okCssClass: string = '.' + _this.#params.cssClass?.modalOk;

            backDrop
                .querySelectorAll(okCssClass)
                .forEach(function (item) {
                    item.addEventListener('click', () => {

                        DomUtils.executeFunction(functionName, '', _this);
                    });
                });
        }

    }

    /**
     * Do we have a onShow callback? if so, apply this here.
     * This will ensure that the callback is called when the modal
     * is added to DOm and fully visible.
     */

    handleOnShow() {
        if (this.#params.onShow) {

            if (_.isFunction(this.#params.onShow)) {
                this.#params.onShow.apply(this);
            } else if (_.isString(this.#params.onShow)) {
                DomUtils.executeFunction(this.#params.onShow, '', this);
            }

        }
    }

    /**
     * Handle drag events ...
     */

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

    generateBackDropInlineStyles(backDrop?: Partial<BackDropParams>) : string {

        if(!backDrop) {
            return '';
        }

        let styles = [];

        let bgColor = _.objValueAsString(backDrop,'bgColor');

        if(bgColor) {
            styles.push(`background-color: ${bgColor};`);
        }

        let opacity = _.objValueAsFloat(backDrop,'opacity',1);

        styles.push(`opacity: ${opacity};`);

        return styles.join('');

    }

}
