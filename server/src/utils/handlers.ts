import { NextFunction, Request, Response, RequestHandler } from 'express'
export const wrapRequestHandler = (func: RequestHandler<any, any, any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
