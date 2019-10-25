"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS MOUDLES
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
// INITIALIZATIONS
const app = new server_1.Application();
dotenv_1.default.config();
// DATABASE IS CONNECT
const database_1 = __importDefault(require("./database"));
database_1.default();
// START THE SERVER
app.start();
