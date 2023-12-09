import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
    exp: number;
    name: string;
}

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.sendStatus(401)
    }

    try {
        var { name, sub } = verify(token, process.env.KEY_SECRET as string) as IPayload;
        req.headers.user_id = sub;
    } catch (err) {
        console.log({err})
        return res.sendStatus(403)
    }
    console.log(req.headers.user_id)
    next();
}