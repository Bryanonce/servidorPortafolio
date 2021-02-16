"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const config_1 = require("../global/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(app = express_1.default()) {
        this.app = app;
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    }
    conectar() {
        this.app.listen(config_1.PORT, () => {
            console.log('Servidor online en puerto' + config_1.PORT);
        });
    }
}
exports.Server = Server;
