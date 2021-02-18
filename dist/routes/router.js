"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import npm resources
const express_1 = require("express");
/*IMPORT ROUTES*/
const images_1 = require("./images");
const knowledge_1 = require("./knowledge");
const projects_1 = require("./projects");
const users_1 = require("./users");
const router = express_1.Router();
router.use('/images', images_1.routerImg);
router.use('/knowledges', knowledge_1.routerKnow);
router.use('/projects', projects_1.routerPrj);
router.use('/users', users_1.routerUsers);
exports.default = router;
