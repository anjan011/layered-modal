export default class HtmlEncoder {
    charsToEncode(): string[];
    encode(string: string, ignoreChars?: string[]): string;
}
