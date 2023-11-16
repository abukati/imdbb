"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowercaseJsonKeys = void 0;
function lowercaseJsonKeys(json) {
    if (typeof json !== 'object' || json === null) {
        return json;
    }
    if (Array.isArray(json)) {
        return json.map((item) => lowercaseJsonKeys(item));
    }
    const result = {};
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const lowercasedKey = key.toLowerCase();
            result[lowercasedKey] = lowercaseJsonKeys(json[key]);
        }
    }
    return result;
}
exports.lowercaseJsonKeys = lowercaseJsonKeys;
//# sourceMappingURL=lowercaseJson.js.map