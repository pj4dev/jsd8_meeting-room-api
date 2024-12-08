import { server } from './configs';
import { AppServer } from './server';

const app = new AppServer();
app.setup(server.configs);
app.start();