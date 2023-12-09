import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
    exp: number;
    name: string;
}

export async function verifyAuthorization(req: Request, resp: Response, next: NextFunction) {
    const headerAuth = req.headers.authorization;
  
    if (!headerAuth) {
      return resp.status(403).json({ message: 'token missing' });
    }
  
    const [bearer, token] = headerAuth.split(' ');
  
    try {
      const { name, sub } = verify(token, process.env.SECRET as string) as IPayload;
      req.headers.user_id = sub;
    } catch (err) {
      return resp.status(403).json({ message: 'token invalid' });
    }
    next();
  }
  