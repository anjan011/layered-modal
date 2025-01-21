export default function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;  // Return primitives and functions as is
    }

    if (Array.isArray(obj)) {
        return obj.map(deepClone);  // Clone arrays
    }

    const clonedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);  // Recursively clone properties
        }
    }

    return clonedObj;
}