const { Router } = require('express');
const {createUsuario,logInUsuario,updateUsuario,deleteUsuario,getAllUsuarios} = require('../controllers/usuarioController');


const router = Router();

router.post("/",createUsuario);
router.put("/",updateUsuario);
router.delete("/:id",deleteUsuario);
router.get("/",getAllUsuarios);

module.exports = router;