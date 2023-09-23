const express = require('express')
const app = express()
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))

const directorRoutes = require('./routes/directorRoutes')
const generoRoutes = require('./routes/generoRoutes')
const mediaRoutes = require('./routes/mediaRoutes')
const productoraRoutes = require('./routes/productoraRoutes')
const tipoMediaRoutes = require('./routes/tipoMediaRoutes')
const tmbdRoutes = require('./controllers/tmbdController')

// middlewares
app.use('/api/director', directorRoutes);
app.use('/api/genero', generoRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/productora', productoraRoutes);
app.use('/api/tmedia', tipoMediaRoutes);
app.use('/api/tmbd', tmbdRoutes);


module.exports = app