const {Schema, model} = require('mongoose')

const mediaSchema = Schema({
    serial:{
        type: String,
        required: [true, 'Serial requerido'],
        unique:true
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido'],
    },
    sinopsis: {
        type: String,
        required: [true, 'sinopsis requerido'],
    },
    urlMedia: {
        type: String,
        required: [true, 'urlMedia requerido'],
        unique:true
    },
    //binary data?
    imgPortada:{
        type: Buffer,
        default:null
    },
    imgUrlPortada:{
        type: String,
        unique:true,
        default:null
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    releaseYear: {
        type: Number,
        required: [true, 'año de estreno requerido'],
        min:0,
        max:9999
    },
    generos:{
        type: [Schema.Types.ObjectId],
        ref: 'Genero',
        required: true
    },
    director:{
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productoras:{
        type: [Schema.Types.ObjectId],
        ref: 'Productora',
        required: true
    },
    tipo:{
        type: Schema.Types.ObjectId,
        ref: 'TipoMedia',
        required: true
    }
})

module.exports = model('Media', mediaSchema)

/* 
// Wait for model's indexes to finish. The `init()`
// function is idempotent, so don't worry about triggering an index rebuild.
await Model.init();

// Throws a duplicate key error
await Model.create([{ name: 'Val' }, { name: 'Val' }]); */