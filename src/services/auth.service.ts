import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';
import IAuth from '../infra/express/utils/auth.interface';
import { decrypt } from '../utils/encrypt';

class Auth implements IAuth {
    public checkAuth: (token: string, getById?: any) => Promise<string | null>

    

    constructor(auth?: (token: string , getById?: (id: string)=> Promise<any | null>) => Promise<string | null>) {
        this.checkAuth = auth ? auth : this.basicAuth;
    }
    
    public basicAuth = async (token: string, getById: (id: string)=> Promise<any | null>) => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) return null;

        const userId = decrypt(payload.userIdEnc);

        const user = await getById(userId);

        if (!user) return null;

        return userId;
    };

    public check = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!config.server.needAuth) return next();

        try {
            const token: string = req.header('Authorization') as string;
            const userId = await this.checkAuth(token);
            if (!userId) {
                res.status(401).send({ error: 'unauthorized', status: 401 });
            } else {
                req['userId'] = userId;
                next();
            }
        } catch (error) {
            res.status(401).send({ error: 'unauthorized', status: 401 });
        }
    };
}

export default Auth;
