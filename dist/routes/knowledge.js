"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerKnow = void 0;
// import npm dependencies
const express_1 = require("express");
// import Schemas or Models
const knowledgeSchema_1 = __importDefault(require("../schema/knowledgeSchema"));
// import middlewares
const tokenAuth_1 = require("../middlewares/tokenAuth");
exports.routerKnow = express_1.Router();
exports.routerKnow.get('/', (req, res) => {
    knowledgeSchema_1.default.find({})
        .exec((err, knowledgeDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgeDB
        });
    });
});
exports.routerKnow.post('/', tokenAuth_1.TokenAuth, (req, res) => {
    const date = Date();
    const body = req.body;
    const knowledge = new knowledgeSchema_1.default({
        name: body.name,
        type: body.type,
        description: body.description,
        id_project: body.id_project,
        image: body.image,
        created_at: date,
        updated_at: date
    });
    knowledge.save((err, knowledgesDB) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        });
    });
});
exports.routerKnow.put('/:id', tokenAuth_1.TokenAuth, (req, res) => {
    const date = new Date();
    const id = req.params.id;
    const body = req.body;
    knowledgeSchema_1.default.findByIdAndUpdate(id, {
        name: body.name,
        type: body.type,
        description: body.description,
        id_project: body.id_project,
        image: body.image,
        updated_at: date
    })
        .exec((err, knowledgesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        });
    });
});
exports.routerKnow.delete('/:id', tokenAuth_1.TokenAuth, (req, res) => {
    const id = req.params.id;
    knowledgeSchema_1.default.findByIdAndRemove(id)
        .exec((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Hubo un error en la eliminación'
                }
            });
        }
    });
    return res.json({
        ok: true,
        data: {
            message: 'Eliminado Correctamente'
        }
    });
});
exports.routerKnow.get('/front', (req, res) => {
    knowledgeSchema_1.default.find({
        type: "FRONTEND"
    })
        .exec((err, knowledgesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        });
    });
});
exports.routerKnow.get('/back', (req, res) => {
    knowledgeSchema_1.default.find({
        type: "BACKEND"
    })
        .exec((err, knowledgesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        });
    });
});
exports.routerKnow.get('/search/:id', (req, res) => {
    let id = req.params.id;
    knowledgeSchema_1.default
        .findById(id)
        .populate('id_project', 'title description image url')
        .exec((err, knowledgesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        });
    });
});
