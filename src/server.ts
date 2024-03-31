import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';

const app = express();

app.use(express.json());

//auth routes
app.use('/auth', authRouter)

app.use(errorHandler);

export { app };

