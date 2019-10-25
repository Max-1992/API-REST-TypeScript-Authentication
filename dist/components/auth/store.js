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
// IMPORTS MODULES
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// IMPORT MODEL
const model_1 = __importDefault(require("./model"));
class AuthStore {
    constructor() { }
    static add(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Storing User
                const newUser = new model_1.default(userData);
                newUser.password = yield newUser.encryptPassword(userData.password);
                const user = yield newUser.save();
                // Creating Token
                const token = jsonwebtoken_1.default.sign({
                    user
                }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: process.env.EXPIRES });
                return { user, token };
            }
            catch (err) {
                console.error('[ERROR ADD]', err);
                return Promise.reject(err);
            }
        });
    }
    static login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find User
                const user = yield model_1.default.findOne({ email: userData.email });
                // Validate if the User Exists
                if (!user) {
                    let err = {
                        message: `El usuario ingresado no existe`,
                        status: 404
                    };
                    return Promise.reject(err);
                }
                // Password validation
                const password = yield user.comparePassword(userData.password);
                if (!password) {
                    let err = {
                        message: `El password ingresado es incorrecto`,
                        status: 404
                    };
                    return Promise.reject(err);
                }
                // Creating Token
                const token = jsonwebtoken_1.default.sign({
                    user
                }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: process.env.EXPIRES });
                return { user, token };
            }
            catch (err) {
                console.error('[ERROR LOGIN]', err);
                return Promise.reject(err);
            }
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find User
                const user = yield model_1.default.findById(id);
                // Validate if the User Exists
                if (!user) {
                    let err = {
                        message: `El usuario ingresado no fue encontrado`,
                        status: 404
                    };
                    return Promise.reject(err);
                }
                return user;
            }
            catch (err) {
                console.error('[ERROR GETUSER]', err);
                return Promise.reject(err);
            }
        });
    }
}
exports.AuthStore = AuthStore;
