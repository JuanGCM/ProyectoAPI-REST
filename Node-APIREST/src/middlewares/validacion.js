import {
    validationResult
} from 'express-validator';

/**
 * Función genérica para realizar la validación. Si hay algún problema 
 * con los parámetros (req.params) o con el cuerpo de una petición (req.body)
 * devolvemos un error 400 y todos los errores.
 */
export const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.status(400).json(errores.array())
    } else {
        next();
    }
}