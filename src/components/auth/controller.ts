// IMPORTS MODULES
import { Request, Response } from 'express';


// IMPORT MODEL
import { User } from './model';


// ANSWERS
import { response } from '../../network/response/auth/response';


// IMPORT STORE
import { AuthStore } from './store';



export class AuthController {

    constructor(){}

  static async signin( req: Request, res: Response ) {
                     try {
                         const userAuth: User = req.body
                         const user: any = await AuthStore.login(userAuth);
                         return response.succes(req, res, user.user, user.token, 200); 
                     } catch (err) {
                        return response.error(req, res, err.message || err, err.status || 500);
                     }

                }

  static async signup( req: Request, res: Response ) {
                      try {          
                          const user: User = req.body;
                          const newUser = await AuthStore.add(user);
                          return response.succes(req, res, newUser.user, newUser.token, 201);
                      } catch (err) {
                          return response.error(req, res, err, 500);
                      }
                }
                
  static async profile( req: Request, res: Response ) {
                        try { 
                            const id = req.userId;
                            const user: User | null = await AuthStore.getUser(id);
                            return response.getSucces(req, res, user, 200)
                        } catch (err) {
                            return response.error(req, res, err.message || err, err.status || 500);
                        }
                }
}