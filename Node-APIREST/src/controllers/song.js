import {Songs, songsRepository} from '../models/songs';

const SongController = {
    todosLosSongs : (req, res) => {
        res.json(songsRepository.findAll());
    },

    songPorId : (req, res) => {
        let song = songsRepository.findById(req.parans.id);
        if (song != undefined){
            res.json(song);
        }else{
            res.sendStatus(404);
        }
    },

    me : (req, res) => {
        res.json(req.context.me);
    },

    nuevoSong : (req, res) => {
        let songCreado = songsRepository.create(new Songs(undefined, req.body.titulo,req.body.artista,req.body.album));
        res.status(201).json(songCreado);
    },

    editarSong: (req, res) => {
        let songModificado = songsRepository.updateById(req.params.id, new Songs(undefined, req.body.titulo,req.body.artista,req.body.album));
        if (songModificado == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(usuarioModificado);
    },

    eliminarSong: (req, res) => {
        songsRepository.delete(req.params.id);
        res.sendStatus(204);
    }
};

export {
    SongController
}