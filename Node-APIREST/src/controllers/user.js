import {
    User,
    userRepository
} from '../models/users';

import {
    body,
    validationResult
} from 'express-validator';

const UserController = {

    todosLosUsuarios: async (req, res) => {
        const data = await userRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    usuarioPorId: async (req, res) => {

        let user = await userRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }

    },

    nuevoUsuario: async (req, res) => {

        let usuarioCreado = await userRepository.create({
            username: req.body.username,
            email: req.body.email
        })
        res.status(201).json(usuarioCreado);
    },

    editarUsuario: async (req, res) => {
   
        let usuarioModificado = await userRepository.updateById(req.params.id, {
            username: req.body.username
        });
        if (usuarioModificado == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(usuarioModificado);
    },

    eliminarUsuario: async (req, res) => {
        await userRepository.delete(req.params.id);
        res.sendStatus(204);
    }


};



export {
    UserController
}