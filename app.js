const express = require('express')
const app = express()
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))


const {guardUsuarioOrAdmin,guardAdmin} = require('./routes/guardRoutes')
const {logInUsuario} = require('./controllers/usuarioController');
const {getAllMedias} = require("./controllers/mediaController");
const {getImage} = require("./controllers/tmbdController");

app.post("/api/usuario/login",logInUsuario);
app.get('/api/tmbd/images/:size/:uri', getImage);
app.get('/api/media',guardUsuarioOrAdmin, getAllMedias);

app.use('/api/usuario',guardAdmin, require('./routes/usuarioRoutes'));
app.get('*',guardAdmin);
app.post('*',guardAdmin);
app.put('*',guardAdmin);
app.delete('*',guardAdmin);

// middlewares
app.use('/api/director', require('./routes/directorRoutes'));
app.use('/api/genero', require('./routes/generoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/productora', require('./routes/productoraRoutes'));
app.use('/api/tmedia', require('./routes/tipoMediaRoutes'));
app.use('/api/tmbd', require('./routes/tmbdRoutes'));


module.exports = app