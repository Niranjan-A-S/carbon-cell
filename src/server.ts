import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';
import cookies from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookies())

//auth routes
app.use('/auth', authRouter)

app.use(errorHandler);

export { app };

