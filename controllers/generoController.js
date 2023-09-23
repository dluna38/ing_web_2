const Genero = require('../models/genero');


async function createGenero(req,res){
    try{
        if(!req.body.nombre){
            return res.status(400).json({msg:"No contiene el nombre"});
        }

        let genero = new Genero({nombre: req.body.nombre.toUpperCase(), descripcion: req.body.descripcion || ""})

        await genero.save().then((result) => {
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

async function getAllGeneros(req,res){
    try{
        
        const generosDB = await Genero.find({})
        return res.json(generosDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function deleteGenero(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;
        await Genero.findByIdAndRemove(id).then((result) => {
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


module.exports = {deleteGenero,createGenero, getAllGeneros}