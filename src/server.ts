// IMPORT MODULES
import express from 'express';
import morgan from 'morgan';
import path from 'path';



// ROUTER
import { Router } from './network/routes/index.routes';


export class Application {

    app: express.Application;
    routes: Router;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes = new Router(this.app);
        this.staticFiles();
    }


    settings() {

    }


    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }


    staticFiles() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    
    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`)
        })
    }


}