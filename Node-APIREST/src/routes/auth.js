import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists, usernameExists } from '../models/users';
import { AuthController } from '../controllers/auth';
import { validar } from '../middlewares/validacion';
import { password } from '../services/passport';


const router = Router();

router.post('/register', [
    body('username')
        .isLength({min: 5})
        .withMessage('La longitud mínima del nombre de usuario son 5 caracteres')
        .custom(username => {
            if (usernameExists(username)) {
                throw new Error('El nombre de usuario ya existe. Escoja otro diferente')
            } else
                return true;
        }),
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener como mínimoo 8 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El campo email debe ser un email válido')
        .custom(email => {
            if(emailExists(email)) {
                throw new Error('El email ya está registrado. Proporcione un valor diferente');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
AuthController.register);


router.post('/login',
    password(),
    AuthController.login
    );


export default router;