import {
    Listado,
    listadoRepository
} from '../models/listado';

const ListadoController = {

    todosLosListados: async (req, res) => {
        const data = await listadoRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    listadoPorId: async (req, res) => {

        let lista = await listadoRepository.findById(req.params.id);
        if (lista != undefined) {
            res.json(lista);
        } else {
            res.sendStatus(404);
        }

    },

    nuevoListado: async (req, res) => {

        let listadoCreado = await listadoRepository.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            userId: req.body.userId,
            songs: req.body.songs
        })
        res.status(201).json(listadoCreado);
    },

    editarListado: async (req, res) => {

        let listadoModificado = await listadoRepository.updateById(req.params.id, {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            userId: req.body.userId,
            songs: req.body.songs
        });
        if (listadoModificado == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(listadoModificado);
    },

    eliminarListado: async (req, res) => {
        await listadoRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export {
    ListadoController
}