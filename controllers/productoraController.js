const Productora = require('../models/productora');


async function createProductora(req,res){
    try{
        if(!req.body.nombre){
            return res.status(400).json({msg:"No contiene el nombre"});
        }
        if(!req.body.slogan){
            return res.status(400).json({msg:"No contiene el slogan"});
        }

        let productora = new Productora({
            nombre: req.body.nombre,
            slogan: req.body.slogan,
            descripcion: req.body.descripcion || "",
        })

        await productora.save().then((result) => {
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

async function getAllProductoras(req,res){
    try{
        
        const productorasDB = await Productora.find({})
        return res.json(productorasDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function deleteProductora(req,res){
    try{
        //param id
        if(!req.params.id){
            return res.status(400).json({msg:"id no sumistrada"});
        }
        const id = req.params.id;
        await Productora.findByIdAndRemove(id).then((result) => {
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


module.exports = {deleteProductora,createProductora, getAllProductoras}