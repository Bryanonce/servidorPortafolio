"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const config_1 = require("../global/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Server {
    constructor(app = express_1.default()) {
        this.app = app;
        // parse application/x-www-form-urlencoded
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // parse application/json
        this.app.use(body_parser_1.default.json());
    }
    addPublicPath(publicPath) {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, `.${publicPath}`)));
    }
    addRoutes(routes) {
        this.app.use(routes);
    }
    connectServer(customPort) {
        if (customPort) {
            return this.app.listen(customPort, () => {
                console.log('Servidor online en puerto ' + customPort);
            });
        }
        this.app.listen(config_1.PORT, () => {
            console.log('Servidor online en puerto ' + config_1.PORT);
        });
    }
    connectDB(addSP) {
        const { createSuperAdmin } = addSP;
        mongoose_1.default.connect(config_1.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                throw err;
            }
            console.log('Base de datos conectada');
            createSuperAdmin ? this.addSuperAdmin() : null;
        });
        mongoose_1.default.set('useFindAndModify', false);
    }
    addSuperAdmin() {
        userSchema_1.default.findOneAndRemove({
            rol: 'SUPER_ADMIN'
        })
            .exec((err) => {
            if (err) {
                throw err;
            }
            const date = new Date();
            const superAdmin = new userSchema_1.default({
                email: config_1.SUPER_ADMIN,
                password: bcrypt_1.default.hashSync(config_1.SUPER_PASS, 10),
                name: 'SUPER_ADMIN',
                rol: 'SUPER_ADMIN',
                last_entry: date,
                created_at: date,
                updated_at: date
            });
            superAdmin.save((err) => {
                if (err) {
                    throw err;
                }
                console.log('Super Admin en línea');
            });
        });
    }
}
exports.Server = Server;
