import { connectToDB } from './lib/db';
import { startHTTPServer } from './lib/server';
import { app } from './server';
import dotenv from 'dotenv';

dotenv.config();

(async function bootstrap() {
    await connectToDB();
    startHTTPServer(app);
})();
