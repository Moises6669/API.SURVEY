"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let routes = (0, express_1.Router)();
routes.get('/hello'), (req, res) => {
    res.send("hello");
};
exports.default = routes;
// export class MainRoutes {
//     public route = Router();
//     constructor() {
//         this.createUse();
//     }
//     public createUse(){
//         this.route.post('/createuser',new UserController().newUser);
//     }
//     public get(){
//         this.route.get("/user"),(req:Request,res:Response) => {
//             res.send("hello")
//         }
//     }
// }
//# sourceMappingURL=main.js.map