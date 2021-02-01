import { Router } from 'express';
import {SongController} from '../controllers/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'

const router = Router();

router.get('/', SongController.todosLosSongs)

router.get('/:id', SongController.songPorId);

router.post('/',
[
    body('titulo').isLength({min: 6}).withMessage('La longitud mínima del titulo son 6 caracteres'),
    body('artista').isLength({min: 8}).withMessage('La longitud mínima del artista son 8 caracteres'),
    body('album').isLength({min: 8}).withMessage('La longitud mínima del album son 8 caracteres')
],
validar, SongController.nuevoSong);

router.put('/:id', SongController.editarSong);

router.delete('/:id', SongController.eliminarSong);


export default router;