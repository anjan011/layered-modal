import deepClone from "./utils/deep-clone";
import TypeChecker from "./utils/type-checker";
import guid from "./utils/guid-generator";

export default class LayeredModal {
    #params;

    getParams() {
        return this.#params;
    }

    constructor(params = {}) {

        if (!TypeChecker.isPlainObject(params)) {
            throw new Error("Invalid parameters: Must be a plain object.");
        }

        this.#params = deepClone(params);

        this.#params.id = this.#params.id || `modal-${guid()}`;

        this.#params.zIndex = this.#params.zIndex || 1;
    }

    getId() {
        return this.#params.id;
    }

    getOverlayId() {
        return `overlay-${this.getId()}`;
    }

    getModalId() {
        return `modal-${this.getId()}`;
    }

    generateHtml() {
        const {id, zIndex, content, header, footer, secondaryOverlay} = this.#params;

        return `
        <div id="${this.getOverlayId()}" class="layered-modal-overlay ${secondaryOverlay ? 'secondary' : ''}" style="z-index: ${zIndex};">
            <div id="${this.getModalId()}" class="layered-modal">
                ${header ? `<div class="layered-modal-header">${header}</div>` : ''}
                <div class="layered-modal-content">${content || ''}</div>
                ${footer ? `<div class="layered-modal-footer">${footer}</div>` : ''}
            </div>
        </div>
    `;
    }

    show() {
        document.body.insertAdjacentHTML('beforeend',this.generateHtml());

        let modal = document.getElementById(this.getModalId());

        modal.style.display = 'block'; // Make the modal visible
        setTimeout(() => {
            modal.style.opacity = '1'; // Fade in after the modal is displayed
        }, 10); // Small delay to trigger the opacity transition

        this.bindEvents();
    }

    hide() {

        let modal = document.getElementById(this.getModalId());

        modal.style.opacity = '0'; // Fade out the modal

        setTimeout(() => {
            modal.style.display = 'none'; // Hide the modal completely after fade-out

            const overlay = document.getElementById(this.getOverlayId());

            if (overlay) {
                overlay.remove();
            }

        }, 300); // Match the fade-out duration (same as CSS transition duration)


    }

    bindEvents() {

        let _this = this;

        let overlay = document.getElementById(this.getOverlayId());

        console.log(overlay);

        console.log(overlay.querySelectorAll('.close-modal'));

        overlay.querySelectorAll('.close-modal').forEach(function(item) {
            item.addEventListener('click',function() {
                console.log('%c%s', 'color: red;background-color: red;color: #fff;font-size: 1.2em;', 'Close clicked');
                _this.hide();
            });
        });


    }
}
