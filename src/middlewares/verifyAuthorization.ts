import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
    exp: number;
    name: string;
}

interface CustomRequest extends Request {
    idUser?: string;
  }

export async function verifyAuthorization(req: CustomRequest, resp: Response, next: NextFunction) {
    const headerAuth = req.headers.authorization;
  
    if (!headerAuth) {
      return resp.status(403).json({ message: 'token missing' });
    }
  
    const [bearer, token] = headerAuth.split(' ');
  
    try {
      const { name, sub } = verify(token, process.env.SECRET as string) as IPayload;
      req.idUser = sub;
    } catch (err) {
      return resp.status(403).json({ message: 'token invalid' });
    }
    next();
  }
  