//---------------------------//
//    Enviroment Stablish    //
//---------------------------//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//---------------------------//
//      Port Connection      //
//---------------------------//
export const PORT:number = (process.env.NODE_ENV === 'dev')? 3000: Number(process.env.PORT);

//---------------------------//
//       DB Connection       //
//---------------------------//
export const MONGO_URI:string = (process.env.NODE_ENV === 'dev')? 'mongodb://localhost:27017/portfolio' : String(process.env.MONGO_URI);

//---------------------------//
//       Semilla JWT         //
//---------------------------//
export const SEED_JWT: string = (process.env.NODE_ENV === 'dev')? 'seed_de_prueba': String(process.env.SEED_JWT);

//---------------------------//
//      Caducidad JWT        //
//---------------------------//
export const CAD_JWT: number = (process.env.NODE_ENV === 'dev')? 60*60*60: Number(process.env.CAD_JWT);

//---------------------------//
//       Super Admin         //
//---------------------------//
export const SUPER_ADMIN: string = (process.env.NODE_ENV === 'dev')? 'admin@admin.com': String(process.env.SUPER_ADMIN);
export const SUPER_PASS: string = (process.env.NODE_ENV === 'dev')? 'password5': String(process.env.SUPER_PASS);