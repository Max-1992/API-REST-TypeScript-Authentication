"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT ROUTES
const network_1 = __importDefault(require("../../components/auth/network"));
class Router {
    constructor(server) {
        server.use('/api/auth', network_1.default);
    }
}
exports.Router = Router;
