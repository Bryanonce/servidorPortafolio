//---------------------------//
//      Port Connection      //
//---------------------------//
export const PORT:number = Number(process.env.PORT) || 3000;

//---------------------------//
//    Enviroment Stablish    //
//---------------------------//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//---------------------------//
//       DB Connection       //
//---------------------------//
export const MONGO_URI:string = (process.env.NODE_ENV === 'dev')? 'mongodb://localhost:27017/portfolio' : String(process.env.MONGO_URI);

//---------------------------//
//       Semilla JWT         //
//---------------------------//
export const SEED_JWT: string = String(process.env.SEED_JWT) || 'seed_de_prueba';

//---------------------------//
//      Caducidad JWT        //
//---------------------------//
export const CAD_JWT: number = Number(process.env.CAD_JWT) || 60*60*60;

//---------------------------//
//       Super Admin         //
//---------------------------//
export const SUPER_ADMIN: string = (process.env.NODE_ENV === 'dev')? 'admin@admin.com': String(process.env.SUPER_ADMIN);
export const SUPER_PASS: string = (process.env.NODE_ENV === 'dev')? 'password5': String(process.env.SUPER_PASS);