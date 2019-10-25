"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class response {
    constructor() { }
    static succes(req, res, user, token, status = 200) {
        res.status(status).header('Authentication', token).json({
            ok: true,
            user
        });
    }
    static getSucces(req, res, user, status = 200) {
        res.status(status).json({
            ok: true,
            user
        });
    }
    static notFound(req, res, err, status = 404) {
        res.status(status).json({
            ok: false,
            err
        });
    }
    static unauthorizedAccess(req, res, err, status = 401) {
        res.status(status).json({
            ok: false,
            err
        });
    }
    static error(req, res, err, status = 500) {
        res.status(status).json({
            ok: false,
            err
        });
    }
}
exports.response = response;
