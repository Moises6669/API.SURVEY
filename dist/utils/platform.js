"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractParameterFromURL = void 0;
// extract parameter from url by name
const extractParameterFromURL = (name, url) => {
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
exports.extractParameterFromURL = extractParameterFromURL;
//# sourceMappingURL=platform.js.map