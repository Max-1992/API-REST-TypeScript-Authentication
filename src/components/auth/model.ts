// IMPORTS MODULES
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


// INTERFACE STATEMENT
export interface User extends Document {
    username?: string,
    email: string,
    password: string,
    encryptPassword: (password:string) => Promise<string>,
    comparePassword: (password:string) => Promise<boolean>
}


// DATA MODEL
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El username es requerido'],
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    }
});


// ENCRYPTION METHOD SETTINGS
userSchema.methods.encryptPassword = async ( password: string ): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}


userSchema.methods.comparePassword = async function( password: string ): Promise<boolean> {
    return await bcrypt.compare( password, this.password );
}


// DO NOT RETURN PASSWORD
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}


// EXPORT MODEL
const User = model<User>('User', userSchema);

export default User;