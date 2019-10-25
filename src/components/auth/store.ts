// IMPORTS MODULES
import jwt from 'jsonwebtoken';


// IMPORT MODEL
import UserModel, { User } from './model'



export class AuthStore {

    constructor(){}

    static async add( userData: User ) {
        try {  
            // Storing User
            const newUser: User = new UserModel(userData);
            newUser.password = await newUser.encryptPassword(userData.password);
            const user: User = await newUser.save();
            
            // Creating Token
           const token: string = jwt.sign({
                user
            }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: process.env.EXPIRES });

            return { user, token };
        } catch (err) {
            console.error('[ERROR ADD]', err);
            return Promise.reject(err);
        }
    }


    static async login( userData: User ) {
        try {
            // Find User
            const user: User | null = await UserModel.findOne({ email: userData.email });
            
            // Validate if the User Exists
            if( !user  ){
               let err = {
                   message: `El usuario ingresado no existe`,
                   status: 404
               }
               return Promise.reject(err)
            }

            // Password validation
            const password: boolean = await user.comparePassword(userData.password);
            if( !password ){
                let err = {
                    message: `El password ingresado es incorrecto`,
                    status: 404
                }
                return Promise.reject(err)
            }

            // Creating Token
            const token: string = jwt.sign({
                    user
                }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: process.env.EXPIRES });

            return { user, token };
        } catch (err) {
            console.error('[ERROR LOGIN]', err);
            return Promise.reject(err);
        }


    }


    static async getUser( id: string ) { 
            try {
                // Find User
                const user: User | null = await UserModel.findById(id);
                
                // Validate if the User Exists
                if( !user ){
                    let err = {
                        message: `El usuario ingresado no fue encontrado`,
                        status: 404
                    }
                    return Promise.reject(err)
                }

                return user;
            } catch (err) {
                console.error('[ERROR GETUSER]', err);
                return Promise.reject(err);
            }
    }

}