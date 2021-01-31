import {Songs} from './songs'
import { User, userRepository } from './users';

class Listado{

    constructor(nombre, descripcion, userId, songs, id=0) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.userId = userId;
        this.songs = songs[Songs];      
    }

}

let songs1 =[
    new Songs(),
    new Songs()
];

let songs2 =[
    new Songs(),
    new Songs()
];

let listados = [
    new Listado('ejemplo 1', 'Esta es una descripcion de ejemplo', 1, songs1, 1),
    new Listado('ejemplo 2', 'Esta es otra descripcion de ejemplo', 2, songs2, 2)
];


const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < listados.length && posicionEncontrado == -1; i++) {
        if (listados[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const listadoRepository = {

    findAll : () => listados.map(lista => {
        lista.author = userRepository.findById(lista.user_id).toDto()
        return lista;
    }),
    findById : (id) => {
        const index = indexOfPorId(id);
        if (index != -1) {
            const lista = listados[index];
            lista.author = userRepository.findById(lista.user_id).toDto();
        } else
            return undefined;
    },
    create : (nuevaLista) => {
        const lastId = listados.length == 0 ? 0 : listados[listados.length-1].id;
        const newId = lastId + 1;
        const result = new Listado(nuevaLista.user_id, nuevaLista.title, nuevaLista.text, newId);
        listados.push(result);
        result.author = userRepository.findById(result.user_id).toDto();
        return result;
    }

}

export  {
    Listado,
    listadoRepository
}
