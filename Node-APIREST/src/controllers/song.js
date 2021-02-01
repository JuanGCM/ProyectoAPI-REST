import {Song, songsRepository} from '../models/songs';

const SongController = {
    todosLosSongs : (req, res) => {
        const data = await songsRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    songPorId : (req, res) => {
        let song = await songsRepository.findById(req.params.id);
        if (song != undefined) {
            res.json(song);
        } else {
            res.sendStatus(404);
        }
    },

    nuevoSong : (req, res) => {
        let songCreated = await songsRepository.create({
            titulo: req.body.titulo,
            artista: req.body.artista,
            album: req.body.album
        })
        res.status(201).json(songCreated);
    },

    editarSong: (req, res) => {
        let songModified = await songsRepository.updateById(req.params.id, {
            titulo: req.body.titulo,
            artista: req.body.artista,
            album: req.body.album
        });
        if (songModified == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(songModified);
    },

    eliminarSong: (req, res) => {
        await songsRepository.delete(req.params.id);
        res.sendStatus(204);
    }
};

export {
    SongController
}