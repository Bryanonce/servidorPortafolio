import {Server} from './server/server';
import Router from './routes/router';

const MiServidor = new Server();

MiServidor.app.use(Router);

MiServidor.conectar();

