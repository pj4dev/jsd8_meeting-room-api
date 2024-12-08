import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { ServerConfig } from './types';

export class AppServer {
    server: Express;
    database: typeof mongoose;

    constructor() {
        this.server = express();
        this.database = mongoose;
    }

    setup(config: ServerConfig) {
        // Setup server configs
        this.server.set('port', config.port);
        this.server.set('mongodb_url', config.mongodb_url);

        // Setup middlewares
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(morgan('dev'));

        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));

        // Setup routes
        this.server.use('/', routes);

        // Create 404 error if requested route is not defined
        this.server.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({ message: 'not found' });
        });
    }

    async start() {
        const port = this.server.get('port');

        try {
            await this.database.connect(this.server.get('mongodb_url'));
            this.server.listen(port, () => console.log(`server is running at localhost:${port}`));
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    } 
}