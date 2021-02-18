"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPER_PASS = exports.SUPER_ADMIN = exports.CAD_JWT = exports.SEED_JWT = exports.MONGO_URI = exports.PORT = void 0;
//---------------------------//
//    Enviroment Stablish    //
//---------------------------//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//---------------------------//
//      Port Connection      //
//---------------------------//
exports.PORT = (process.env.NODE_ENV === 'dev') ? 3000 : Number(process.env.PORT);
//---------------------------//
//       DB Connection       //
//---------------------------//
exports.MONGO_URI = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/portfolio' : String(process.env.MONGO_URI);
//---------------------------//
//       Semilla JWT         //
//---------------------------//
exports.SEED_JWT = (process.env.NODE_ENV === 'dev') ? 'seed_de_prueba' : String(process.env.SEED_JWT);
//---------------------------//
//      Caducidad JWT        //
//---------------------------//
exports.CAD_JWT = (process.env.NODE_ENV === 'dev') ? 60 * 60 * 60 : Number(process.env.CAD_JWT);
//---------------------------//
//       Super Admin         //
//---------------------------//
exports.SUPER_ADMIN = (process.env.NODE_ENV === 'dev') ? 'admin@admin.com' : String(process.env.SUPER_ADMIN);
exports.SUPER_PASS = (process.env.NODE_ENV === 'dev') ? 'password5' : String(process.env.SUPER_PASS);
