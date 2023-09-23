const {Schema, model} = require('mongoose')

const directorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    estado: {
        type: Boolean,
        required: [true, 'estado no proveido'],
        default:true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Director', directorSchema)