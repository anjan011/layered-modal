/**
 * Generates HTML attribute markup from a plain object.
 */

export class HtmlAttributeGenerator {

    /**
     * Encode special characters ...
     *
     * @param value
     */

    encodeValue(value: string): string {
        return value.replace(/["&<>]/g, (char) => {
            switch (char) {
                case '"':
                    return '&quot;';
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                default:
                    return char;
            }
        });
    }

    /**
     * generate attributes string for child objects if any
     *
     * @param prefix
     * @param obj
     */

    processObject(prefix: string, obj: Record<string, any>): any[] {
        return Object.entries(obj).flatMap(([key, value]) => {
            const newKey : string = prefix ? `${prefix}-${key}` : key;
            return typeof value === 'object' && !Array.isArray(value)
                ? this.processObject(newKey, value)
                : [[newKey, value]];
        });
    }

    /**
     * Generate the markup ...
     *
     * @param attributes
     * @param separator
     */

    generateAttributes(attributes: Record<string, any>, separator : string = ' '): string {

        if(separator === '') {
            separator = ' ';
        }

        return Object.entries(attributes)
            .flatMap(([key, value]) => {
                if (typeof value === 'string' || typeof value === 'number') {
                    return [[key, value]];
                } else if (Array.isArray(value)) {
                    const filteredValues = value
                        .filter(v => typeof v === 'string' || typeof v === 'number')
                        .join(separator);
                    return filteredValues ? [[key, filteredValues]] : [];
                } else if (typeof value === 'object' && value !== null) {
                    return this.processObject(key, value);
                }
                return [];
            })
            .map(([key, value]) => `${key}="${this.encodeValue(String(value))}"`)
            .join(separator);
    }


}