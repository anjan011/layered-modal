export class DomUtils {

    /**
     * Parse an element attributes and gets all data- attributes as an object
     *
     * @param element
     */

    static getDataAttributes(element: HTMLElement): Record<string, string> {
        const dataAttrs: Record<string, string> = {};

        [...element.attributes].forEach((attr) => {
            if (attr.name.startsWith("data-")) {
                const key: string = attr.name.slice(5); // Remove "data-" prefix
                dataAttrs[key] = attr.value;
            }
        });

        return dataAttrs;
    }

    static getFunctionResult(funcName: string, functionArgs: string, context: any = null): any | null {

        if (typeof (window as any)[funcName] === "function") {
            let val = (window as any)[funcName].apply(context, [functionArgs]);

            if (typeof val === 'string') {
                return val;
            } else {
                return `Function ${funcName} does not return string data type.`;
            }

        } else {
            return `Function ${funcName} not found.`;
        }
    }

    static executeFunction(funcName: string, functionArgs: string, context: any = null) {

        if (typeof (window as any)[funcName] === "function") {
            (window as any)[funcName].apply(context, [functionArgs]);

        } else {
            console.log(`Function named ${funcName} could not be found!`);
        }
    }

    static isValidIframe(html: string): boolean {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const iframe = doc.body.firstElementChild;

        if (!iframe || iframe.tagName.toLowerCase() !== "iframe") {
            return false;
        }

        const src = iframe.getAttribute("src");

        return !(!src || !/^https?:\/\/[\w.-]+(?:\.[a-z]{2,})+(?:\/.*)?$/i.test(src));
    }


}