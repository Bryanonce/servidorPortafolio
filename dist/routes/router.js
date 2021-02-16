"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("./images");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    return res.send("Hola Mundo");
});
router.use('/images', images_1.routerImg);
exports.default = router;
