class Songs {

    constructor(id, titulo, artista, album) {
        this.id = id;
        this.titulo = titulo;
        this.artista = artista;
        this.album = album;        
    }

}

let songs = [
    new Songs(1, 'fsdfsdf', 'Luis Miguel López', 'gfgfr'),
    new Songs(2, 'sdfsdf', 'Ángel Naranjo','trtrt')
];


const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < songs.length && posicionEncontrado == -1; i++) {
        if (songs[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}


const songsRepository = {

    findAll() {
        return songs;
    },
    findById(id) {
        const posicion = indexOfPorId(id);
        return posicion = -1 ? undefined : songs[posicion];
    },
    create(newSong) {
        const lastId = songs.length == 0 ? 0 : songs[songs.length-1].id;
        const newId = lastId + 1;
        const result = new Songs(newId, newSong.titulo, newSong.artista, newSong.album);
        users.push(result);
        return result;
    },
    updateById(id, modifiedSong) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            songs[posicionEncontrado].titulo = modifiedSong.titulo;
            songs[posicionEncontrado].artista = modifiedSong.artista;
            songs[posicionEncontrado].album = modifiedSong.album;
        }
        return posicionEncontrado != -1 ? songs[posicionEncontrado] : undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedSong) {
        return this.update(modifiedSong.id, modifiedSong);
    }, 
    delete(id) {
        const posicionEncontrado = indexOfPorId(id);
        if (posicionEncontrado != -1)
            songs.splice(posicionEncontrado, 1);
    }

}


export  {
    Songs,
    songsRepository
}