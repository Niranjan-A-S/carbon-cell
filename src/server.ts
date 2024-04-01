import cookies from "cookie-parser";
import express from 'express';
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';
import { userRouter } from "./routes/user";

const app = express();

app.use(express.json());
app.use(cookies())

//auth routes
app.use('/api/auth', authRouter);

//public APIService routes
app.use('/api/entries', entriesRouter);

//user routes
app.use('/api/user', userRouter);

//swagger
app.use('/',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
        swaggerOptions: {
            docExpansion: "none",
        },
        customSiteTitle: "Node JS Assessment API Docs"
    }
    ));

app.use(errorHandler);

export { app };

