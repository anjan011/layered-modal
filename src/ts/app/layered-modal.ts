// src/app/layered-modal.ts
export class LayeredModal {
    id: string;
    element: HTMLDivElement;

    constructor({id}: { id: string }) {
        this.id = id;
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.classList.add('modal');
    }

    show(): void {
        document.body.appendChild(this.element);
        this.element.style.display = 'block';
    }

    hide(): void {
        document.body.removeChild(this.element);
        this.element.style.display = 'none';
    }
}
