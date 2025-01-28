import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HtmlEncoder {
    charsToEncode() {
        return ['&', '<', '>', '"', "'", "`"];
    }

    escapeHtml(string, ignoreChars = []) {
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

let encoder = new HtmlEncoder();

let skipChars = ['`',"'",'"'];

// Define the order of .md files
const files = [
    "markdown/intro.md",
    "markdown/setup.md",
    "markdown/usage.md",
    "markdown/modal-manager.md",
    "markdown/modal.md",
];

const outputFile = "README.md";

// Read and merge the files
const content = files
    .map((file) => {
        let rawContent = fs.readFileSync(path.resolve(__dirname, file), "utf8");
        return encoder.escapeHtml(rawContent,skipChars); // Sanitize before merging
    })
    .join("\n\n"); // Adds spacing between sections

// Write to README.md
fs.writeFileSync(outputFile, content, "utf8");

console.log("README.md generated successfully!");
