"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const Builder = {
    user: ({ username = "my product", email = "this is a test", password = "100", role = "admin", } = {}) => ({
        username,
        email,
        password,
        role,
    }),
};
// Promise.all(mongoose.connections.map(con => con.close()))
describe("POST /api/user", () => {
    test("new user registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = Builder.user();
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/user")
            .send(user)
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, user), { _id: "abc" }));
    }));
});
//# sourceMappingURL=userSignup.test.js.map