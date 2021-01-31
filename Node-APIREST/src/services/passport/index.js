import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User, userRepository } from '../../models/users';
import bcrypt from 'bcryptjs';


/**
 * Estrategia de autenticación local (con username y password)
 */
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
},(username, password, done)=> {
    const user = userRepository.findByUsername(username);
    if (user == undefined)
        return done(null, false); // El usuario no existe
    else if (!bcrypt.compareSync(password, user.password))
        return done(null, false); // No coincide la contraseña
    else
        return done(null, user.toDto());

}));


/**
 * Estrategia de autenticación basada en Token
 */
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
    algorithms : [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts, (jwt_payload, done)=>{

    // Extraemos el id del campo sub del payload
    const user_id = jwt_payload.sub;

    // Buscamos el usuario por ID
    const user = userRepository.findById(user_id);
    if (user == undefined)
        return done(null, false); // No existe el usuario
    else
        return done(null, user);

}));

export const password = () => (req, res, next) =>
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err)
            return res.status(400).json(err)
        else if (err || !user)
            return res.status(401).end()
        
        /*
        En este ejemplo usamos a authenticate() de forma que le da acceso 
        a los objetos req, res y next mediante el cierre (ver apuntes de Javascript)
        Si la autenticación falla, user se establecerá en false. 
        Si ocurrió una excepción, se devolverá el error.
        Se pasa también un argumento opcional info, que contiene detalles adicionales proporcionados
        por la verificación de la estrategia.
        Se infopasará un argumento opcional , que contiene detalles adicionales proporcionados 
        por la devolución de llamada de verificación de la estrategia.
        La devolución de llamada puede usar los argumentos proporcionados para manejar 
        el resultado de la autenticación como quieras. 
        Ten en cuenta que cuando se utiliza una devolución de llamada personalizada, 
        es responsabilidad de la aplicación establecer una sesión 
        (llamando req.login()) y enviar una respuesta.
        Ten en cuenta además que si la autenticación tiene éxito, se
        almacena el usuario autenticado en req.user
        Más información en http://www.passportjs.org/docs/authenticate/
        */

        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next);


export const token = () => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err ||  !user) {
        return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
        if (err) return res.status(401).end()
        next()
    })
})(req, res, next);


export default passport;
