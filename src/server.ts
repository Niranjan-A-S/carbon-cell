import cookies from "cookie-parser";
import express from 'express';
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth';
import { entriesRouter } from './routes/entries';
import { userRouter } from "./routes/user";
import { web3Service } from "./services/web3";
import { APIError } from "./lib/api-error";
import { APIResponse } from "./lib/api-response";
import { web3Router } from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cookies())

//auth router
app.use('/api/auth', authRouter);

//public APIService router
app.use('/api/entries', entriesRouter);

//user router
app.use('/api/user', userRouter);

//web3 route
app.use('/api/web3', web3Router)

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

