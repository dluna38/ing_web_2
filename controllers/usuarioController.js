const Usuario = require('../models/usuario');
const passEncoder = require('bcryptjs');
const {getTokenFromUsuario} = require('../util/jwtService');
const roles = require('../util/rol');
async function createUsuario(req,res){
    try{
        if(!req.body.nombre){
            return res.status(400).json({msg:"No contiene el nombre"});
        }
        if(!req.body.correo){
            return res.status(400).json({msg:"No contiene el correo"});
        }
        if(await Usuario.findOne({correo:req.body.correo}).exec()){
            return res.status(400).json({msg:"ya existe el correo"});
        }

        if(!req.body.contrasena){
            return res.status(400).json({msg:"No contiene la contraseña"});
        }
        if(!req.body.rol){
            return res.status(400).json({msg:"No contiene el rol"});
        }
        if(!validateRol(req.body.rol)){
            return res.status(400).json({msg:"Rol invalido"});
        }

        let usuario = new Usuario({
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasena: passEncoder.hashSync(req.body.contrasena),
            rol : req.body.rol.toUpperCase()
        })

        await usuario.save().then(async (result) => {
            const token = await getTokenFromUsuario(result);
            if(token === null){
                return errorGenerandoToken(res);
            }
            return res.status(201).json({token:token})
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
async function logInUsuario(req,res){
    try{
        if(!req.body.correo){
            return res.status(400).json({msg:"correo no suministrado"});
        }
        if(!req.body.contrasena){
            return res.status(400).json({msg:"contrasena no suministrada"});
        }
        const {correo,contrasena} = req.body;

        const usuarioDB = await Usuario.findOne({correo:correo}).exec();
        if(!usuarioDB || !passEncoder.compareSync(contrasena,usuarioDB.contrasena)){
            res.sendStatus(400);
        }

        const token = getTokenFromUsuario(usuarioDB);
        if(token === null) {
            return errorGenerandoToken(res);
        }
        return res.status(200).json({token: token})
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


async function getUsuarioByCorreo(req,res){
    try{
        if(!req.params.correo){
            return res.status(400).json({msg:"correo no suministrado"});
        }
        const correo = req.params.correo;

        const usuarioDB = await Usuario.find({correo:correo}).exec();
        return res.status(200).json(usuarioDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function getAllUsuarios(req,res){
    try{

        const usuariosDB = await Usuario.find({})
        return res.status(200).json(usuariosDB)

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

async function updateUsuario(req,res){
    try{
        //param id
        if(!req.params.correo){
            return res.status(400).json({msg:"correo no suministrado"});
        }
        const correo = req.params.correo;

        let usuarioDB = await Usuario.findOne({correo:correo}).orFail(()=>{
            return res.status(400).json({msg:"el usuario no existe"});
        }).exec();

        let {nombre, estado,contrasena} = req.body;

        if(nombre !== undefined) usuarioDB.nombre = nombre;
        if(estado !== undefined) usuarioDB.estado = estado;
        if(contrasena !== undefined) usuarioDB.contrasena = passEncoder.hashSync(contrasena);

        usuarioDB.fechaActualizacion = new Date();
        usuarioDB.save().then((result) => {
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

async function deleteUsuario(req,res){
    try{
        if(!req.params.correo){
            return res.status(400).json({msg:"correo no suministrado"});
        }
        const correo = req.params.correo;
        const result = await Usuario.deleteOne({correo:correo});

        if(result.ok === 1){
            res.sendStatus(200);
        }else{
            return res.status(404).body({msg:"No se encontro el usuario a eliminar"});
        }

    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

function errorGenerandoToken(res) {
    return res.status(500).json({msg:"no se pudo generar el token"});
}

function validateRol(rol){
    return Object.values(roles).includes(rol.toUpperCase());
}

module.exports = {createUsuario,updateUsuario,deleteUsuario,getAllUsuarios,logInUsuario};