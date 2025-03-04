import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { transformEmptyStringsToNull } from '../helpers/string.helper';

@Injectable()
export class NormalizeDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && Object.keys(req.body).length > 0) {
        req.body = transformEmptyStringsToNull<Request>(req.body);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
