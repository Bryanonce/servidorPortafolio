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