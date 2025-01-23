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


}