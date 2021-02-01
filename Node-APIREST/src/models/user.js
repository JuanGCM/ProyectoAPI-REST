import passport from './services/passport';
import mongoose from 'mongoose';


const userSchema = new Schema({
    username: String,
    email: String
});
const User = mongoose.model('User', userSchema);
/*
const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

 * Función que comprueba si un email ya está
 * definido como el email de un usuario en el repositorio
 */
const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

/**
 * Función que comprueba si un username ya está
 * definido como el username de un usuario en el repositorio
 */
const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    findById(id) {
        const result = await User.findById(id).exec();
        return result != null ? result : undefined;
    },
    // Encuentra un usuario por su username
    findByUsername(username) {
       let result = users.filter(user => user.username == username);
       return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    create(newUser) {
        const theUser = new User({
            username : newUser.username,
            email: newUser.email
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO
    },
    // Actualiza un usuario identificado por su ID
    updateById(id, modifiedUser) {
        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}

export  {
    User,
    userRepository,
    emailExists,
    usernameExists
}