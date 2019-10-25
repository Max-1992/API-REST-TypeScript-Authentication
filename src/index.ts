// IMPORTS MOUDLES
import { Application } from './server';
import dotenv from "dotenv";



// INITIALIZATIONS
const app: Application = new Application();
dotenv.config();


// DATABASE IS CONNECT
import db from './database';
db()


// START THE SERVER
app.start();