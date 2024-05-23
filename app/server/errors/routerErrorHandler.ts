import { Response } from 'express';

export default function routerErrorHandler(err: Error, res: Response) {
  const responseError = JSON.parse(err.message);
  res.status(responseError.status).send(responseError.payload);
}
