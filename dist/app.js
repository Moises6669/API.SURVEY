"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const appps = new server_1.default();
appps.app.listen(4000, () => {
    console.log('server on port');
});
//# sourceMappingURL=app.js.map