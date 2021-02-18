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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const date = new Date();
const rolValidate = {
    values: ['SUPER_ADMIN', 'USER'],
    message: '{VALUE} no es un tipo válido'
};
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Se necesita el usuario"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Se necesita el nombre"]
    },
    password: {
        type: String,
        required: [true, "Se necesita el password"]
    },
    rol: {
        type: String,
        default: 'USER',
        required: [true, "Se necesita el rol"],
        enum: rolValidate
    },
    last_entry: {
        type: Date,
        required: [true, "Se necesita ingresar la ultima entrada"],
        defaul: date
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
UserSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} ya se encuentra registrado'
});
exports.default = mongoose_1.default.model('Users', UserSchema);
