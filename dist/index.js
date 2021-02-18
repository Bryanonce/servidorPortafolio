"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const router_1 = __importDefault(require("./routes/router"));
const MiServidor = new server_1.Server();
MiServidor.addPublicPath('./public');
MiServidor.connectDB();
MiServidor.addRoutes(router_1.default);
MiServidor.connectServer();
