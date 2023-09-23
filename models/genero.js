const {Schema, model} = require('mongoose')

const generoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    estado: {
        type: Boolean,
        required: [true, 'estado no proveido'],
        default:true
    },
    descripcion:{
        type: String,
        default:null
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

module.exports = model('Genero', generoSchema)