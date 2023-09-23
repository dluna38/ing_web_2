const {Schema, model} = require('mongoose')

const productoraSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    estado: {
        type: Boolean,
        required: [true, 'estado no proveido'],
        default:true
    },
    slogan:{
        type: String,
        required: [true, 'slogan no proveido'],
    },
    descripcion:{
        type: String,
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'fecha creacion no proveida'],
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        required: [true, 'fecha actualizacion no proveida'],
        default: new Date()
    }
})

module.exports = model('Productora', productoraSchema)