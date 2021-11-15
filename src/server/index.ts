import { handleErrorMiddleware } from "./shared/middleware/handle-error.midd";
import { router } from "./routes/index";
import { Server } from './server/server';
import express from "express";
import morgan from "morgan";
import helmet from 'helmet';
import cors from "cors";

// Get instance
const serverApp = Server.getInstance

// Middlewares nivel aplication
serverApp.app.use(cors());
serverApp.app.use(helmet());
serverApp.app.use(morgan("dev"));
serverApp.app.use(express.json());
serverApp.app.use(express.urlencoded({ extended: false }));

serverApp.app.disable('x-powered-by')

// Router
serverApp.app.use("/apiv1", router);
// Middleware error
serverApp.app.use(handleErrorMiddleware);
// Iniciar Servidor

const startServer = () => serverApp.start()

export { startServer }