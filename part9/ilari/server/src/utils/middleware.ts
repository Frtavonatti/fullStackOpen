import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log('METHOD: ', req.method);
  console.log('PATH: ', req.path);
  console.log('BODY: ', req.body);
  console.log('---');
  next();
};
