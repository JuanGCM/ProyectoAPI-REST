import { Router } from 'express';

import {SongController} from '../controllers/song';

const router = Router();

router.get('/', SongController.todosLosSongs)
router.get('/me', SongController.me);
router.get('/:id', SongController.songPorId);

router.post('/', SongController.nuevoSong);

router.put('/:id', SongController.editarSong);

router.delete('/:id', SongController.eliminarSong);


export default router;