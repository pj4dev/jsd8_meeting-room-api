import dotenv from 'dotenv';
import env from 'env-var';
import type { ServerConfig } from '../types';

dotenv.config();

export const configs: ServerConfig = {
    node_env: env.get('NODE_ENV').asString() || 'development',
    port: env.get('PORT').asInt() || 3000,
    mongodb_url: env.get('MONGODB_URL').asString() || 'mongodb://localhost:27017/jsd8'
};