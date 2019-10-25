// IMPORTS MODULES
import db from 'mongoose';


const connect = async () => {
    try {
        db.connect( process.env.URL_DB || 'mongodb://localhost:27017/auth-typescript', { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
         });
        console.log('DataBase is connected');
    } catch (err) {
        console.error('[ERROR_DB]', err)
    }
}

export default connect