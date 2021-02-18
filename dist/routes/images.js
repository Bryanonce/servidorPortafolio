"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerImg = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
exports.routerImg = express_1.Router();
exports.routerImg.get('/', (req, res) => {
    return res.send("Hola Img");
});
exports.routerImg.get('/:folder/:img', (req, res) => {
    let no_image = path_1.default.join(__dirname, '../assets/icons/not-found.jpg');
    try {
        const img = req.params.img;
        const folder = req.params.folder;
        let pathImg = path_1.default.join(__dirname, `../assets/icons/${folder}/${img}`);
        return res.sendFile(pathImg);
    }
    catch (err) {
        return res.sendFile(no_image);
    }
});
