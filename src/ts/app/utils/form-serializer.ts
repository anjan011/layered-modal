export default class FormSerializer {
    private form: HTMLFormElement;
    private skipEmptyString : boolean;

    constructor(formId: string, skipEmptyString : boolean = true) {
        const el = document.getElementById(formId);
        if (!el || !(el instanceof HTMLFormElement)) {
            throw new Error(`Form with id "${formId}" not found or is not a form element.`);
        }
        this.form = el;

        this.skipEmptyString = skipEmptyString;
    }

    public serialize(): any {
        const result: any = {};
        const elements = Array.from(this.form.elements) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
        for (const el of elements) {
            // Ignore controls without a name or that are disabled.
            if (!el.name || el.disabled) continue;
            // For checkboxes and radio buttons, only process if checked.
            if ((el instanceof HTMLInputElement) && (el.type === "checkbox" || el.type === "radio") && !el.checked) continue;

            const keys = this.parseName(el.name);
            const dataType = el.getAttribute("data-sdt") || "string";
            const dataDefault = el.getAttribute("data-sdv");
            let valueStr = el.value;
            // Use default value if provided and the control's value is empty.
            if (valueStr === "" && dataDefault !== null) {
                valueStr = dataDefault;
            }

            if(this.skipEmptyString) {

                if(!valueStr?.trim()) {
                    continue;
                }

            }

            const parsedValue = this.parseValue(valueStr, dataType);
            this.setDeepValue(result, keys, parsedValue);
        }
        return result;
    }

    // Parses a form control name into keys.
    // e.g. "profile[enabled]" -> ["profile", "enabled"]
    // If the name ends with "[]", an empty string is appended to mark an array.
    private parseName(name: string): string[] {
        const keys = (name.match(/[^\[\]]+/g) || []) as any;
        if (/\[\]$/.test(name)) {
            keys.push("");
        }
        return keys;
    }

    // Converts a string value to the specified data type.
    private parseValue(value: string, type: string): any {
        switch (type.toLowerCase()) {
            case "number":
                return Number(value);
            case "boolean":
                // Simple conversion: "1" becomes true, "0" becomes false; otherwise use truthiness.
                if (value === "1") return true;
                if (value === "0") return false;
                return !!value;
            case "string":
            default:
                return value;
        }
    }

    // Recursively sets a deep value into an object based on the keys array.
    // If the control name does NOT have a "[]" suffix, the value is overwritten (PHP behavior).
    // If the name ends with "[]", the value is pushed into an array.
    private setDeepValue(obj: any, keys: string[], value: any): void {
        if (keys.length === 0) return;

        const key = keys[0];
        if (keys.length === 1) {
            if (key === "") {
                // Should be an array; push the value.
                if (!Array.isArray(obj)) {
                    // In proper usage, this branch is only reached when the control name ends with [].
                    throw new Error("Expected an array container for key ''");
                }
                obj.push(value);
            } else {
                // For names without "[]", override any existing value (PHP behavior).
                obj[key] = value;
            }
        } else {
            if (key === "") {
                // When key is empty, we expect the current container to be an array.
                if (!Array.isArray(obj)) {
                    throw new Error("Expected an array container for key ''");
                }
                // Use the last object in the array if it exists and is an object; otherwise, push a new one.
                let lastItem = obj[obj.length - 1];
                if (typeof lastItem !== "object" || lastItem === null) {
                    lastItem = {};
                    obj.push(lastItem);
                }
                this.setDeepValue(lastItem, keys.slice(1), value);
            } else {
                if (obj[key] === undefined) {
                    // If the next key is "" then we need an array; otherwise, create an object.
                    obj[key] = keys[1] === "" ? [] : {};
                }
                this.setDeepValue(obj[key], keys.slice(1), value);
            }
        }
    }
}
