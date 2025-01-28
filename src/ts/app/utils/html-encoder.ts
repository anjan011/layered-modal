export default class HtmlEncoder {
    charsToEncode() : string[] {
        return ['&', '<', '>', '"', "'", "`"];
    }

    encode(string : string, ignoreChars: string[] = []) : string {
        const charsToEncode = this.charsToEncode();
        const ignoreSet = new Set(ignoreChars); // Use a Set for O(1) lookups

        // Map of replacements
        const replaceMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&grave;'
        };

        // Convert string into array to modify characters efficiently
        let strArray = Array.from(string);

        // Process string in one pass
        for (let i = 0; i < strArray.length; i++) {
            let char = strArray[i];

            if (ignoreSet.has(char) || !replaceMap[char]) {
                continue; // Skip ignored characters or those not in replaceMap
            }

            strArray[i] = replaceMap[char]; // Replace directly
        }

        return strArray.join(""); // Convert back to string
    }
}