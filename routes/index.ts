import { Router } from "express";
import { errorHandler, healthCheck, notFound } from "../controllers";

const router = Router();

function ConnectRoutes(): Router {
    router.get('/', healthCheck);

    router.use('/token', require('./transactions.routes').default);

    router.all('*', notFound);
    router.use(errorHandler);
    return router;
}

export default ConnectRoutes;

