import {Listado,listadoRepository} from '../models/listado';
import {body, validationResult} from 'express-validator';
import { Song,songsRepository} from '../models/songs';
import { SongController } from './song';
import jwt from 'jsonwebtoken';

const ListadoController = {

    todosLosListados: async (req, res) => {
        let lista = await listadoRepository.findAll();
        if (Array.isArray(lista) && lista.length > 0) 
            res.status(200).json(lista);
        else
            res.status(404).json({mensaje: 'No se encontre ninguna lista'});
    },

    listadoPorId: async (req, res) => {

        let lista = await listadoRepository.findById(req.params.id);        
        if (lista != undefined) {
            res.status(200).json(lista);
        } else {
            res.status(404).json({mensaje:'No se encontro el listado al que desea acceder'});
        }
    },

    todosLosListadosPorUsuario: async (req, res) => {
        let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
        const data = await listadoRepository.findAllByUser(id);
        if (Array.isArray(data) && data.length > 0)
            res.status(200).json(data);
        else
        res.status(404).json({mensaje: 'No se encontro ningun listado de este usuario'});
    },

    nuevoListado: async (req, res) => {

        try{
            let id = jwt.decode(req.headers.authorization.split(' ')[1]).sub;
            let nuevolistado = await listRepository.create(req.body.nombre, req.body.descripcion, id);
            res.status(201).json(nuevolistado);
        } catch (error) {
            res.status(400).json({mensaje: 'Error al crear el listado'});
        }
    },

    editarListado: async (req, res) => {

        try{
            let listadoModificado = await listadoRepository.updateById(
                req.params.id, 
                req.body.nombre,
                req.body.descripcion
            );
            if (listadoModificado == undefined)
                res.status(404).json({mensaje: 'Listado no encontrado'});
            else
                res.sendStatus(204);
        } catch (error) {
            res.status(400).json({mensaje: 'Error al editar el listado'});
        }            
    },

    eliminarListado: async (req, res) => {
        try{
            let lista = await listadoRepository.findById(req.params.id);
            if(lista != undefined){
                await listadoRepository.delete(req.params.id);
                res.sendStatus(204);
            }else{
                res.status(404).json({mensaje: 'Listado a eliminar no encontrado'});
            }  
        } catch (error) {
            res.status(400).json({mensaje: 'Error al eliminar el listado'});
        }               
    },

    anadirSong: async (req, res) => {

        try{
            let listado = await listadoRepository.findById(req.params.id1);
            let song = await songsRepository.findById(req.params.id2);
            if (song != undefined && listado != undefined) {            
                listado.songs.push(song.id);
                await listado.save();
                let data = await listadoRepository.findById(listado.id1);
                res.json(data);    
            } else {
                res.status(404).json({mensaje: 'Listado o cancion no encontrados'});
            }
        } catch (error) {
            res.status(400).json({mensaje: 'Error al añadir cancion'});
        }   
    },

    eliminarSong: async (req, res) => {

        try{
            let lista = await listadoRepository.findById(req.params.id1);
            if (lista != undefined) {
                lista.songs.pull(req.params.id2);
                await lista.save();
                res.sendStatus(204);
                
            } else {
                res.status(404).json({mensaje: 'Listado no encontrado'});
            }
        } catch (error) {
            res.status(400).json({mensaje: 'Error al eliminar cancion'});
        }   
    },

    listAllSongs: async (req, res) => {
        let listado = await listadoRepository.findById(req.params.id);
        if(listado != undefined){
            let songs = await listadoRepository.findSongsById(req.params.id);
            res.status(200).json(songs);
        }else{
            res.status(404).json({mensaje: 'Listado a buscar no encontrado'});
        }   
    },

    obtenerSong: async (req, res) => {
        try{
            let listado = await listRepository.findById(req.params.id1);
            if(listado != undefined){
                let data = await songsRepository.findById(req.params.id2);
                res.status(200).json(data);
            }else{
                res.status(404).json({mensaje: 'Listado no encontrado'});
            } 
        } catch (error) {
            res.status(400).json({mensaje: 'Error al pedir la cancion'});
        }          
    }

};

export {
    ListadoController
}