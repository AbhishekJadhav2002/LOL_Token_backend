import { NextFunction, Request, Response } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const status = res?.statusCode === 200 ? 500 : res?.statusCode;
    const message = err?.message || 'Something went wrong';
    console.error(err);
    res.status(status).send(message);
};

function healthCheck(req: Request, res: Response, next: NextFunction) {
    res.status(200).send('OK');
}

function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).send('Not found');
}

export { errorHandler, healthCheck, notFound };
