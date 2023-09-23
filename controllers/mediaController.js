const Media = require('../models/media');
const Director = require("../models/director");


async function createMedia(req,res){
    try{
        if(!req.body.serial){
            return res.status(400).json({msg:"No contiene el serial"});
        }
        if(!req.body.titulo){
            return res.status(400).json({msg:"No contiene el titulo"});
        }
        if(!req.body.sinopsis){
            return res.status(400).json({msg:"No contiene la sinopsis"});
        }
        if(!req.body.urlMedia){
            return res.status(400).json({msg:"No contiene la url del video"});
        }
        /*if(!req.body.imgPortada && !req.body.imgUrlPortada){
            return res.status(400).json({msg:"No contiene la portada"});
        }
        let portada = req.body.imgUrlPortada || req.body.imgPortada;
        if(!req.body.releaseYear){
            return res.status(400).json({msg:"No contiene el año de estreno"});
        }*/

        if(!req.body.generos){
            return res.status(400).json({msg:"No contiene los generos"});
        }
        if(!req.body.director){
            return res.status(400).json({msg:"No contiene el director"});
        }
        if(!req.body.productoras){
            return res.status(400).json({msg:"No contiene las productoras"});
        }
        if(!req.body.tipo){
            return res.status(400).json({msg:"No contiene el tipo de media"});
        }

        let media = new Media({
            serial:req.body.serial,
            titulo:req.body.titulo,
            sinopsis:req.body.sinopsis,
            urlMedia:req.body.urlMedia,
            releaseYear:req.body.releaseYear,
            generos:req.body.generos,
            director:req.body.director,
            productoras:req.body.productoras,
            tipo:req.body.tipo,
        })
        
        /*if(typeof(portada) === "string"){
            media.imgUrlPortada = portada;
        }else{
            media.imgPortada = portada;
        }*/

        await Media.init();

        await media.save().then((result) => {
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

async function getAllMedias(req,res){
    try{
        
        //const mediasDB = await Media.find({});
        const mediasWithExtraObjectsDB = await Media.find({}).populate('generos')
        .populate('director')
        .populate('productoras')
        .populate('tipo');

        return res.json(mediasWithExtraObjectsDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function deleteMedia(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;

        await Media.findByIdAndRemove(id).then((result) => {
            return res.sendStatus(200);
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
async function updateMedia(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;

        let mediaDB = await Media.findOne({_id:id}).exec();


        let {titulo, sinopsis,urlMedia,releaseYear,director,generos,productoras,tipo} = req.body;

        if(titulo !== undefined) mediaDB.titulo = titulo;
        if(sinopsis !== undefined) mediaDB.sinopsis = sinopsis;
        if(urlMedia !== undefined) mediaDB.urlMedia = urlMedia;
        if(releaseYear !== undefined) mediaDB.releaseYear = releaseYear;
        if(director !== undefined) mediaDB.director = director;
        if(generos !== undefined) mediaDB.generos = generos;
        if(productoras !== undefined) mediaDB.productoras = productoras;
        if(tipo !== undefined) mediaDB.tipo = tipo;

        mediaDB.fechaActualizacion = new Date();

        mediaDB.save().then((result) => {
            return res.sendStatus(200);
        }).catch((error) =>{
            return res.status(500).json({
                msg: 'Error general ' + error
            })
        })
    }catch(e){
        console.log("excepcions")
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

module.exports = {deleteMedia,createMedia, getAllMedias,updateMedia}