export default class TypeChecker {
    // Check if the value is a plain object (not an instance of a class)
    static isPlainObject(value) {
        return Object.prototype.toString.call(value) === "[object Object]" && Object.getPrototypeOf(value) === Object.prototype;
    }

    // Check if the value is an integer
    static isInteger(value) {
        return Number.isInteger(value);
    }

    // Check if the value is a float (not an integer but still a number)
    static isFloat(value) {
        return typeof value === "number" && !Number.isInteger(value);
    }

    // Check if the value is a string
    static isString(value) {
        return typeof value === "string";
    }

    // Check if the value is alphanumeric (letters and numbers only)
    static isAlphanumeric(value) {
        return typeof value === "string" && /^[a-z0-9]+$/i.test(value);
    }

    // Check if the value is an array
    static isArray(value) {
        return Array.isArray(value);
    }

    // Check if the value is a function
    static isFunction(value) {
        return typeof value === "function";
    }

    // Check if value is an instance of a given class
    static isInstanceOf(value, classRef) {
        return value instanceof classRef;
    }
}
