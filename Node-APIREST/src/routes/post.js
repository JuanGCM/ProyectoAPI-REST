import { Router } from 'express';

const router = Router();

router.post('/', 
    token(),
    PostController.crearNuevoPost);

export default router;