import {Song} from './songs'
import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const listadoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        minlength: [5, 'EL nombre debe de tener como minimo 5 caracteres']
        },
    descripcion: {
        type: String,
        required: [true, 'Descripcion requerido'],
        minlength: [10, 'EL descripcion debe de tener como minimo 10 caracteres']
        },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    songs: [{
        type: mongoose.ObjectId,
        ref: 'Song'
      }]
});

const Listado = mongoose.model('Listado', listadoSchema);

const listadoRepository = {

    async findAll() {
        let result = await Listado.find({}).populate('songs', ['titulo','artista']).populate('userId', 'username').exec();
        return result;
    },

    async findAllByUser(user_id) {
        let result = await Listado.find({}).where('userId').equals(user_id).populate('songs', ['titulo','artista']).populate('userId', 'username').exec();
        return result;
    },

    async findById(id) {
        const result = await Listado.findById(id).populate('songs').populate('userId', 'username').exec();
        return result != null;
    },

    async findSongsById(id){
        const result = await Listado.findById(id).populate('songs').exec();
        if(result == null){
            return undefined;
        }else{
            return result.songs;
        }
    },

    async create(nombre, descripcion, userId) {
        const listado = new Listado({
            nombre: nombre,
            descripcion: descripcion,
            userId: userId,
            songs: []
        });

        const result = await listado.save();
        return result;
    },

    async updateById(id, nombre, descripcion) {
        const listado = await Listado.findById(id);

        if (listado == null) {
            return undefined;
        } else {
            var listaModificada = Object.create(listado)
            listaModificada.nombre = nombre;
            listaModificada.descripcion = descripcion;
            return await Object.assign(listado, listaModificada).save();
        }
    },

    async delete(id) {
        await Listado.findByIdAndRemove(id).exec();
    }

}

export  {
    Listado,
    listadoRepository
}
