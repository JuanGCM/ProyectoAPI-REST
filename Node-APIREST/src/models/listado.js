import {Song} from './songs'
import { User, userRepository } from './users';

import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const listadoSchema = new Schema({
    nombre: String,
    descripcion: String,
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    songs: songs[Song]
});

const Listado = mongoose.model('Listado', listadoSchema);

const listadoRepository = {

    async findAll() {
        return await Listado
            .find()
            .populate('userId', 'id')            
            .exec();
    },

    async findById(id) {
        return await Listado
            .findById(id)
            .populate('userId', 'id')                        
            .exec();
    },

    async create(nuevoListado) {
        const listado = new Listado({
            nombre: nuevoListado.nombre,
            descripcion: nuevoListado.descripcion,
            userId: nuevoListado.userId,
            songs: nuevoListado.userId
        });

        const result = await listado.save();
        return result;
    },

    async updateById(id, listaModificada) {
        const listado = await Listado.findById(id);

        if (listado == null) {
            return undefined;
        } else {
            return await Object.assign(listado, listaModificada).save();
        }
    },

    async update(listaModificada) {
        return await this.updateById(listaModificada.id, listaModificada);
    },

    async delete(id) {
        await Listado.findByIdAndRemove(id).exec();
    }

}

export  {
    Listado,
    listadoRepository
}
