"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPrj = void 0;
// import npm dependences
const express_1 = require("express");
// import Schemas or Models
const projectSchema_1 = __importDefault(require("../schema/projectSchema"));
// import middlewares
const tokenAuth_1 = require("../middlewares/tokenAuth");
exports.routerPrj = express_1.Router();
exports.routerPrj.get('/', (req, res) => {
    projectSchema_1.default.find({})
        .exec((err, projectsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: projectsDB
        });
    });
});
exports.routerPrj.post('/', tokenAuth_1.TokenAuth, (req, res) => {
    const date = Date();
    const body = req.body;
    const project = new projectSchema_1.default({
        title: body.title,
        description: body.description,
        image: body.image,
        url: body.url,
        id_knowledge: body.id_knowledge,
        created_at: date,
        updated_at: date
    });
    project.save((err, projectsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: projectsDB
        });
    });
});
exports.routerPrj.put('/:id', tokenAuth_1.TokenAuth, (req, res) => {
    const date = new Date();
    const id = req.params.id;
    const body = req.body;
    projectSchema_1.default.findByIdAndUpdate(id, {
        title: body.title,
        description: body.description,
        image: body.image,
        url: body.url,
        id_knowledge: body.id_knowledge,
        updated_at: date
    })
        .exec((err, projectsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: projectsDB
        });
    });
});
exports.routerPrj.delete('/:id', tokenAuth_1.TokenAuth, (req, res) => {
    const id = req.params.id;
    projectSchema_1.default.findByIdAndRemove(id)
        .exec((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    messaje: 'Error al eliminar el registro'
                }
            });
        }
        return res.json({
            ok: true,
            data: {
                message: 'Registro eliminado correctamente'
            }
        });
    });
});
/*Buscar todas las tecnologias utilizadas en el proyecto con el ID:*/
exports.routerPrj.get('/search/:id', (req, res) => {
    let id = req.params.id;
    projectSchema_1.default
        .findById(id)
        .populate('id_knowledge', 'name type description image')
        .exec((err, projectsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            });
        }
        return res.json({
            ok: true,
            data: projectsDB
        });
    });
});
