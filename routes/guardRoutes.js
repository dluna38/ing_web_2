const {verifyTokenUsuario} = require('../util/jwtService');
const roles = require('../util/rol');
function guard(req, res, next,roles) {
    //console.log("hola guard")

    const userToken = verifyAndGetToken(req);
    if(userToken === null){
        res.sendStatus(403);
        return;
    }
    if(!roles.includes(userToken.rol)){
        res.sendStatus(401);
        return;
    }
    next();
}

function guardUsuarioOrAdmin(req, res, next) {
    guard(req, res, next,Object.values(roles));
}
function guardAdmin(req, res, next) {
    guard(req, res, next,[roles.ADMIN])
}
function verifyAndGetToken(req){
    try {
        let TOKEN = req.get('authorization');

        if (TOKEN?.startsWith("Bearer ")) {
            return verifyTokenUsuario(TOKEN.slice(7))
        }
    } catch (e) {
        console.log(e)
    }
    return null;
}
module.exports = {guardUsuarioOrAdmin,guardAdmin};