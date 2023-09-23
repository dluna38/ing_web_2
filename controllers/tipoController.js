const TipoMedia = require('../models/tipo-media');


async function createTipoMedia(req,res){
    try{
        if(!req.body.nombre){
            return res.status(400).json({msg:"No contiene el nombre"});
        }

        let tipoMedia = new TipoMedia({nombre: req.body.nombre, descripcion: req.body.descripcion || ""})

        await tipoMedia.save().then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            return res.status(500).json({
                msg: 'No se pudo guardar en la base de datos: debug: ' + err
            })
        });
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function getAllTipoMedias(req,res){
    try{
        
        const tipoMediaDB = await TipoMedia.find({})
        return res.json(tipoMediaDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function deleteTipoMedia(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;
        await TipoMedia.findByIdAndRemove(id).then((result) => {
            return res.status(200);
        }).catch((err) => {
            return res.status(500).json({
                msg: 'No se pudo borrar los elementos: debug: ' + err
            })
        });

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


module.exports = {deleteTipoMedia,createTipoMedia, getAllTipoMedias}