import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";
import mongoose from "mongoose";
import * as modelos from './models/index';

import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);
app.use(passport.initialize());


// Configuración de las rutas.
app.use('/songs', routes.song);
app.use('/lists', routes.listado);
app.use('/auth', routes.auth);

async function cargarDatos(){
  let luismi = new modelos.users.User({fullname: "Luis Miguel López",username: "luismiLop",email: "luismi@salesianos.com",password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS))});
  const user1 = await luismi.save();

  let miguel = new modelos.users.User({fullname: "Miguel Campo",username: "miguelCapm",email: "miguel.campos@salesianos.com",password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS))});
  const user2 = await miguel.save();

  let cancion1 = new modelos.songs.Song({titulo:"Numb",artista: "Linkin Park", album: "Meteora"});
  const song1 = await cancion1.save();

  let cancion2 = new modelos.songs.Song({titulo:"We will rock you",artista: "Queen", album: "News of the wordl"});
  const song2 = await cancion2.save();

  let cancion3 = new modelos.songs.Song({titulo:"Feel Good Inc",artista: "Gorillaz", album: "Demon Days"});
  const song3 = await cancion3.save();

  let cancion4 = new modelos.songs.Song({titulo:"Clint Eastwood",artista: "Gorillaz", album: "The Gorillaz"});
  const song4 = await cancion4.save();

  let listado1 = new modelos.listados.Listado({nombre: "Cancion de Hip Hop",descripcion: "Listado de canciones de genero Hip Hop", userId: user1.id, songs: [song3.id, song4.id]});
  const list1 = await listado1.save();

  let listado2 = new modelos.listados.Listado({nombre: "Cancion de Rock",descripcion: "Listado de canciones de genero rock 80/90", userId: user2.id, songs: [song1.id, song2.id]});
  const list2 = await listado2.save();
} 

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    cargarDatos();
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
      )
    );
  }

});