import { Router } from 'express';
import { ListadoController } from '../controllers/listado';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';

const router = Router();

router.get('/', ListadoController.todosLosListados)

router.get('/:id',ListadoController.listadoPorId);

router.post('/', [
        body('nombre').isLength({min: 5}).withMessage('La longitud mínima del nombre son 5 caracteres'),
        body('descripcion').isLength({min: 10}).withMessage('La longitud mínima de la descripcion son 10 caracteres')
    ], 
    validar, ListadoController.nuevoListado);

router.put('/:id', ListadoController.editarListado);

router.delete('/:id', ListadoController.eliminarListado);

export default router;