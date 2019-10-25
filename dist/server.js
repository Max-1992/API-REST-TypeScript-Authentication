"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT MODULES
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// ROUTER
const index_routes_1 = require("./network/routes/index.routes");
class Application {
    constructor() {
        this.app = express_1.default();
        this.middlewares();
        this.routes = new index_routes_1.Router(this.app);
        this.staticFiles();
    }
    settings() {
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    staticFiles() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
        });
    }
}
exports.Application = Application;
