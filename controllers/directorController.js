const Director = require('../models/director');


async function createDirector(req,res){
    try{
        if(!req.body.nombre){
            return res.status(400).json({msg:"No contiene el nombre"});
        }

        let director = new Director({nombre: req.body.nombre})

        await director.save().then((result) => {
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

async function getDirectorById(req,res){
    try{
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;

        const directorDB = await Director.find({_id:id}).exec();
        return res.status(200).json(directorDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function getAllDirectores(req,res){
    try{
        
        const directoresDB = await Director.find({})
        return res.status(200).json(directoresDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function updateDirector(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;

        let directorDB = await Director.findOne({_id:id}).orFail(()=>{
            return res.status(400).json({msg:"el director no existe"})
        }).exec();

        let {nombre, estado} = req.body;

        if(nombre !== undefined) directorDB.nombre = nombre;
        if(estado !== undefined) directorDB.estado = estado;

        directorDB.fechaActualizacion = new Date();
        directorDB.save().then((result) => {
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

async function deleteDirector(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;
        await Director.findByIdAndRemove(id).then((result) => {
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


module.exports = {deleteDirector,createDirector, getAllDirectores,updateDirector,getDirectorById}