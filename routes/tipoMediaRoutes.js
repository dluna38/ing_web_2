const { Router } = require('express')
const {deleteTipoMedia,createTipoMedia, getAllTipoMedias} =
 require('../controllers/tipoController')

const router = Router()

// crear
router.get('/', getAllTipoMedias);

// consultar todos
router.post('/', createTipoMedia)
router.delete('/:id',deleteTipoMedia)

module.exports = router;