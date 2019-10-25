// IMPORT MODULES
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { response } from '../network/response/auth/response';
// import { User } from '../components/auth/model';

interface IPayload {
    _id: string,
    username: string,
    email: string
}


export class Token {

    constructor(){}

    static verifyToken( req: Request, res: Response, next: NextFunction) {
            try {
                const token = req.header('Authentication');
        
                if(!token) {
                    let err = `Acceso Denegado. No esta Autorizado para ingresar a nuestra aplicación`;
                    return response.unauthorizedAccess(req, res, err, 401)
                }
        
                const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;

                req.userId = payload._id;
        
                next();
            } catch (err) {
               return response.error(req, res, err, 500)
            }         
    }

}
