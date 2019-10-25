// IMPORT ROUTES
import authRoutes from '../../components/auth/network';


export class Router {

    constructor( server: any ) {
        server.use( '/api/auth', authRoutes )
    }

}