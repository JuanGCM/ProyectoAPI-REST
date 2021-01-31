import {
    User,
    userRepository
} from '../models/users';

import {
    validationResult
} from 'express-validator';

const UserController = {

    todosLosUsuarios: (req, res) => {
        res.json(userRepository.findAll());
    },

    usuarioPorId: (req, res) => {

            let user = userRepository.findById(req.params.id);
            if (user != undefined) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }

    },

    nuevoUsuario: (req, res) => {
        let usuarioCreado = userRepository.create(new User(req.body.username, req.body.email));
        res.status(201).json(usuarioCreado);
    },

    editarUsuario: (req, res) => {
        let usuarioModificado = userRepository.updateById(req.params.id, new User(undefined, req.body.username));
        if (usuarioModificado == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(usuarioModificado);
    },

    eliminarUsuario: (req, res) => {
        userRepository.delete(req.params.id);
        res.sendStatus(204);
    }


};



export {
    UserController
}