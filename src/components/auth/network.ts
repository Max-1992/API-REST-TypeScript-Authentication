// IMPORTO MODULES
import { Router } from 'express';
const router: Router = Router();


// CONTROLLER
import { AuthController } from './controller';


// MIDDLEWARES
import { Token } from '../../middlewares/verifyToken';


// ROUTES

router.post('/signup', AuthController.signup );

router.post('/signin', AuthController.signin );

router.get('/profile', Token.verifyToken , AuthController.profile );


export default router;