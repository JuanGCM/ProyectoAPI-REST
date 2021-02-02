import {Song, songsRepository} from '../models/songs';
import {body, validationResult} from 'express-validator';
import { listadoRepository } from '../models/listado';
import { ListadoController } from './listado';

const SongController = {
    todosLosSongs :async (req, res) => {
        const data = await songsRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.status(404).json({mensaje: 'No se encontro ninguna cancion'});
    },

    songPorId : async (req, res) => {
        let song = await songsRepository.findById(req.params.id);
        if (song != undefined) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ mensaje: 'No se encontro ninguna cancion con ese id' });
        }
    },

    nuevoSong :async  (req, res) => {
        try{
            let songCreated = await songsRepository.create({
                titulo: req.body.titulo,
                artista: req.body.artista,
                album: req.body.album
            })
            res.status(201).json(songCreated);
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
    },

    editarSong: async (req, res) => {
        try{
            let songModified = await songsRepository.updateById(req.params.id, {
                titulo: req.body.titulo,
                artista: req.body.artista,
                album: req.body.album
            });
            if (songModified == undefined)
                res.status(404).json({mensaje:'Cancion no encontrada'});
            else
                res.status(200).json(songModified);
                
        }catch(error) {
            res.status(400).json({Error: error.message});
        }        
    },

    eliminarSong:async  (req, res) => {
        await songsRepository.delete(req.params.id);
        res.sendStatus(204);
    }
};

export {
    SongController
}