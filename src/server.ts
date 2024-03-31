import cookies from "cookie-parser";
import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';

const app = express();

app.use(express.json());
app.use(cookies())

//auth routes
app.use('/auth', authRouter);

//public API routes
app.use('/entries', entriesRouter);

app.use(errorHandler);

export { app };

