import { Router } from 'express';
import { ListadoController } from '../controllers/listado';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { token } from '../services/passport';

const router = Router();

router.get('/all',token(), ListadoController.todosLosListados)

router.get('/:id',token(), ListadoController.listadoPorId);

router.post('/',token(), 
validar, ListadoController.nuevoListado);

router.get('/', token(), ListadoController.todosLosListadosPorUsuario);

router.post('/:id1/songs/:id2', token(), ListadoController.anadirSong);

router.delete('/:id1/songs/:id2', ListadoController.eliminarSong);

router.put('/:id', token(),ListadoController.editarListado);

router.get('/:id1/songs/:id2', ListadoController.obtenerSong);

router.get('/:id/songs/', token(), ListadoController.listAllSongs);

router.delete('/:id', token(),ListadoController.eliminarListado);

export default router;