"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../network/response/auth/response");
class Token {
    constructor() { }
    static verifyToken(req, res, next) {
        try {
            const token = req.header('Authentication');
            if (!token) {
                let err = `Acceso Denegado. No esta Autorizado para ingresar a nuestra aplicación`;
                return response_1.response.unauthorizedAccess(req, res, err, 401);
            }
            const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
            req.userId = payload._id;
            next();
        }
        catch (err) {
            return response_1.response.error(req, res, err, 500);
        }
    }
}
exports.Token = Token;
