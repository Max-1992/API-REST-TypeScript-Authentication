"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTO MODULES
const express_1 = require("express");
const router = express_1.Router();
// CONTROLLER
const controller_1 = require("./controller");
// MIDDLEWARES
const verifyToken_1 = require("../../middlewares/verifyToken");
// ROUTES
router.post('/signup', controller_1.AuthController.signup);
router.post('/signin', controller_1.AuthController.signin);
router.get('/profile', verifyToken_1.Token.verifyToken, controller_1.AuthController.profile);
exports.default = router;
