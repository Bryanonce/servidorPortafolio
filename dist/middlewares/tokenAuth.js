"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../global/config");
const TokenAuth = (req, res, next) => {
    let token = req.header('auth-token');
    !token ? res.status(401).json({ ok: false, data: { message: 'Acceso no Autorizado' } }) : null;
    const payload = jsonwebtoken_1.default.verify(String(token), config_1.SEED_JWT);
    next();
};
exports.TokenAuth = TokenAuth;
