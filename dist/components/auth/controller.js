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
Object.defineProperty(exports, "__esModule", { value: true });
// ANSWERS
const response_1 = require("../../network/response/auth/response");
// IMPORT STORE
const store_1 = require("./store");
class AuthController {
    constructor() { }
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAuth = req.body;
                const user = yield store_1.AuthStore.login(userAuth);
                return response_1.response.succes(req, res, user.user, user.token, 200);
            }
            catch (err) {
                return response_1.response.error(req, res, err.message || err, err.status || 500);
            }
        });
    }
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const newUser = yield store_1.AuthStore.add(user);
                return response_1.response.succes(req, res, newUser.user, newUser.token, 201);
            }
            catch (err) {
                return response_1.response.error(req, res, err, 500);
            }
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.userId;
                const user = yield store_1.AuthStore.getUser(id);
                return response_1.response.getSucces(req, res, user, 200);
            }
            catch (err) {
                return response_1.response.error(req, res, err.message || err, err.status || 500);
            }
        });
    }
}
exports.AuthController = AuthController;
