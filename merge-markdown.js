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

let skipChars = ['`', "'", '"'];

// Define the order of .md files
const files = [
    {
        file: "markdown/intro.md",
        skipChars : skipChars,
    },
    {
        file: "markdown/setup.md",
        skipChars: skipChars,
    },
    {
        file: "markdown/usage.md",
        skipChars: [...skipChars,'<','>'],
    },
    {
        file: "markdown/modal-manager.md",
        skipChars: skipChars,
    },
    {
        file: "markdown/modal.md",
        skipChars: skipChars,
    },
    {
        file : "markdown/data-attributes.md",
        skipChars: skipChars,
    }
];

const outputFile = "README.md";

// Read and merge the files
const content = files
    .map((item) => {
        let rawContent = fs.readFileSync(path.resolve(__dirname, item.file), "utf8");
        return encoder.escapeHtml(rawContent, item.skipChars); // Sanitize before merging
    })
    .join("\n\n"); // Adds spacing between sections

// Write to README.md
fs.writeFileSync(outputFile, content, "utf8");

console.log("README.md generated successfully!");
