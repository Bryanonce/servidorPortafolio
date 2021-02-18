"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAD_JWT = exports.SEED_JWT = exports.MONGO_URI = exports.PORT = void 0;
//---------------------------//
//      Port Connection      //
//---------------------------//
exports.PORT = Number(process.env.PORT) || 3000;
//---------------------------//
//    Enviroment Stablish    //
//---------------------------//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//---------------------------//
//       DB Connection       //
//---------------------------//
exports.MONGO_URI = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/portfolio' : String(process.env.MONGO_URI);
//---------------------------//
//       Semilla JWT         //
//---------------------------//
exports.SEED_JWT = String(process.env.SEED_JWT) || 'seed_de_prueba';
//---------------------------//
//      Caducidad JWT        //
//---------------------------//
exports.CAD_JWT = Number(process.env.CAD_JWT) || 60 * 60 * 60;
