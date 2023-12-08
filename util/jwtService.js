require('dotenv').config()
const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;
const expireTime = '24h'

function getTokenFromUsuario(usuario) {
    try {
        return generateJwtToken({
            rol: usuario.rol
        }, {
            subject: usuario.correo
        })
    }catch (e){
        return null;
    }
}

function generateJwtToken(claims,options) {
    return jwt.sign(claims,getKey(),{
        expiresIn:expireTime,
        ...options
    })
}

function getKey(){
    return Buffer.from(key, 'base64');
}

function verifyTokenUsuario(token){
    try {
        return jwt.verify(token,getKey());
    }catch (e) {
        //console.log("error verificando token");
    }
    return null;
}

module.exports = {getTokenFromUsuario,verifyTokenUsuario};