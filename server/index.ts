import {Server} from './server/server';
import Router from './routes/router';

const MiServidor = new Server();
MiServidor.addPublicPath('./public');
MiServidor.connectDB();
MiServidor.addRoutes(Router);
MiServidor.connectServer();
