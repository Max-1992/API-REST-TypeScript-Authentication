// IMPORTS MODULES
import { Request, Response } from 'express';


// IMPORT MODEL
import { User } from '../../../components/auth/model';


export class response {

    constructor(){}

    static succes( req: Request, res: Response, user: User | null, token: string, status: number = 200 ) {
        res.status(status).header('Authentication', token).json({
            ok: true,
            user
        })
    }


    static getSucces( req: Request, res: Response, user: User | null, status: number = 200 ) {
        res.status(status).json({
            ok: true,
            user
        })
    }


    static notFound( req: Request, res: Response, err: string, status: number = 404 ) {
         res.status(status).json({
            ok: false,
            err
        })
    }


    static unauthorizedAccess( req: Request, res: Response, err: string, status: number = 401 ) {
        res.status(status).json({
           ok: false,
           err
       })
   }


    static error( req: Request, res: Response, err: Error, status: number = 500 ) {
        res.status(status).json({
            ok: false,
            err
        })
    }

}