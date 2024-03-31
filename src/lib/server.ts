import { PORT } from '../constants/server';
import { Express } from 'express';

export const startHTTPServer = (httpServer: Express) => {
    const port = process.env.PORT || PORT;
    httpServer.listen(port, () => {
        console.log(`⚙️  App running on port ${port}`);
    });
};
