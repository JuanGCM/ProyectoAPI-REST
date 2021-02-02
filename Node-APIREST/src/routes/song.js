import { Router } from 'express';
import {SongController} from '../controllers/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { token } from '../services/passport';

const router = Router();

router.get('/',token(), SongController.todosLosSongs)

router.get('/:id',token(), SongController.songPorId);

router.post('/',token(), SongController.nuevoSong);

router.put('/:id',token(), SongController.editarSong);

router.delete('/:id',token(), SongController.eliminarSong);


export default router;