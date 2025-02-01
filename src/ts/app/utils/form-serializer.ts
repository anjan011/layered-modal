export default class FormSerializer {
    private form: HTMLFormElement;

    constructor(formId: string) {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) {
            throw new Error(`Form with ID "${formId}" not found.`);
        }
        this.form = form;
    }

    private parseName(name: string, value: any, obj: any): void {
        const keys = name.replace(/\]/g, '').split('[');
        let current = obj;

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                if (Array.isArray(current[key])) {
                    current[key].push(value);
                } else if (current[key] !== undefined) {
                    current[key] = [current[key], value];
                } else {
                    current[key] = value;
                }
            } else {
                current[key] = current[key] || (isNaN(Number(keys[index + 1])) ? {} : []);
                current = current[key];
            }
        });
    }

    serialize(): Record<string, any> {
        const obj: Record<string, any> = {};
        const elements = this.form.elements as HTMLFormControlsCollection;

        for (const element of Array.from(elements)) {
            if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
                if (element.disabled || !element.name) continue;
                if ((element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) && !element.checked) continue;

                let value = element.value as any;

                if(element.type === 'number') {
                    value = parseFloat(value);

                    if(isNaN(value)) {
                        value = 0.0;
                    }
                }

                this.parseName(element.name, value, obj);
            }
        }
        return obj;
    }

    serializeArray(): Array<{ name: string; value: string }> {
        const arr: Array<{ name: string; value: string }> = [];
        const elements = this.form.elements as HTMLFormControlsCollection;

        for (const element of Array.from(elements)) {
            if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
                if (element.disabled || !element.name) continue;
                if ((element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) && !element.checked) continue;
                arr.push({name: element.name, value: element.value});
            }
        }
        return arr;
    }
}
