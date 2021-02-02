import 'dotenv/config';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import passport from './services/passport';
import mongoose from 'mongoose';


const { Schema } = mongoose;

const userSchema = new Schema({
    fullname:{
        type: String,
        required: [true, 'El nombre completo es requerido'],
        minlength: [8, 'EL nombre debe de tener como minimo 8 caracteres']
        },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        minlength: [5, 'EL nombre debe de tener como minimo 5 caracteres']
        },
    email: {
        type: String,
        unique: [true, 'Este email ya existe'],
        required: [true, 'El correo es requerido']
        },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [5, 'EL nombre debe de tener como minimo 5 caracteres']
        }
});
const User = mongoose.model('User', userSchema);

function toDto(user){
    let dto = {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        id: user._id
    }
    return dto;
}

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(id) {
        const result = await User.findById(id).exec();
        return result != null ? result : undefined;
    },
    // Encuentra un usuario por su username
    async findByUsername(username) {
       let result = users.filter(user => user.username == username);
       return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    },
    // Encuentra un usuario por su email
    async findByEmail(email) {
        const result = await User.find({ email: email }).exec();
        return result != null ? result[0] : undefined;
    },

    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        const theUser = new User({
            fullname : newUser.fullname,
            username : newUser.username,
            email: newUser.email,
            password: newUser.password
        });
        const result = await theUser.save();
        let saved = await User.findById(result.id).exec();
        theUser.password = bcrypt.hashSync(passw, parseInt(process.env.BCRYPT_ROUNDS));
        await Object.assign(saved, theUser).save();
        return toDto(result);
    },
    // Actualiza un usuario identificado por su ID
    async updateById(id, modifiedUser) {
        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    async update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    async delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}

export  {
    User,
    userRepository,
    emailExists,
    usernameExists
}