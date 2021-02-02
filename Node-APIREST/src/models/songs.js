import mongoose from 'mongoose';

const { Schema } = mongoose;

const songSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es requerido'],
        minlength: [5, 'EL titulo debe de tener como minimo 5 caracteres']
        },
    artista: {
        type: String,
        required: [true, 'El artista es requerido'],
        minlength: [5, 'EL artista debe de tener como minimo 5 caracteres']
        },
    album: String
});

const Song = mongoose.model('Song', songSchema);

const songsRepository = {

    async findAll() {
        return await Song
            .find()
            .exec();
    },

    async findById(id) {
        return await Song
            .findById(id)
            .exec();
    },

    async create(titulo, artista, album) {
        const song = new Song({
            titulo: titulo,
            artista: artista,
            album: album
        });

        return await song.save();
    },
    
    async updateById(id, modifiedSong) {
        const song = await Song.findById(id);

        if (song == null) {
            return undefined;
        } else {
            return await Object.assign(song, modifiedSong).save();
        }
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    async update(modifiedSong) {
        return await this.updateById(modifiedSong.id, modifiedSong);
    },
    async delete(id) {
        await Song.findByIdAndRemove(id).exec();
    }

}

export  {
    Song,
    songsRepository
}