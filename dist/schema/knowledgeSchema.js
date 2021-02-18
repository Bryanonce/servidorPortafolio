"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const date = new Date();
const typeValidate = {
    values: ['FRONTEND', 'BACKEND'],
    message: '{VALUE} no es un tipo válido'
};
const knowledgeSchema = new mongoose_1.Schema({
    id_project: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Projects',
            default: []
        }],
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    type: {
        type: String,
        enum: typeValidate,
        required: [true, "Se necesita el stack"]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    image: {
        type: String,
        required: [true, "Senecesita la Imagen"]
    },
    created_at: {
        type: Date,
        required: [true, "Se necesita la fecha de creación"],
        default: date
    },
    updated_at: {
        type: Date,
        required: [true, "Se necesita la fecha de actualización"],
        default: date
    }
});
exports.default = mongoose_1.default.model('Knowledges', knowledgeSchema);
