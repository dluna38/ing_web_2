const {Schema, model} = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    estado: {
        type: Boolean,
        required: [true, 'estado requerido'],
        default:true
    },
    correo:{
        type: String,
        required: [true, 'correo requerido'],
        unique:true
    },
    contrasena:{
      type: String,
      required: [true, 'contraseña requerida'],
    },
    rol:{
      type: String,
      required: [true, 'rol requerido'],
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

module.exports = model('Usuario', usuarioSchema)