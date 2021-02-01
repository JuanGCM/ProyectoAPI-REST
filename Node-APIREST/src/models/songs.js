import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const songSchema = new Schema({
    titulo: String,
    artista: String,
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

    async create(newSong) {
        const song = new Song({
            titulo: newSong.titulo,
            artista: newSong.artista,
            album: newSong.album
        });

        const result = await song.save();
        return result;
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