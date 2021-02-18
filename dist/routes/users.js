"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = require("express");
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../global/config");
const tokenAuth_1 = require("../middlewares/tokenAuth");
exports.routerUsers = express_1.Router();
exports.routerUsers.post('/', tokenAuth_1.TokenAuth, (req, res) => {
    const body = req.body;
    const date = new Date();
    const user = new userSchema_1.default({
        email: body.email,
        password: bcrypt_1.default.hashSync(body.password, 10),
        name: body.name,
        last_entry: date,
        created_at: date,
        updated_at: date
    });
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Existe un problema en el registro'
                }
            });
        }
        return res.json({
            ok: true,
            data: {
                message: 'Usuario Registrado Correctamente'
            }
        });
    });
});
exports.routerUsers.post('/login', (req, res) => {
    const body = req.body;
    const date = new Date();
    userSchema_1.default.findOne({
        email: body.email
    })
        .exec((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Existe un problema en el login'
                }
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Credenciales no coinciden'
                }
            });
        }
        userSchema_1.default.findByIdAndUpdate(userDB._id, { last_entry: date })
            .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {
                        message: 'Existe un problema en el login'
                    }
                });
            }
            const token = jsonwebtoken_1.default.sign({
                _id: userDB._id,
                name: userDB.name
            }, config_1.SEED_JWT, { expiresIn: config_1.CAD_JWT });
            return res.json({
                ok: true,
                data: {
                    token: token
                }
            });
        });
    });
});
