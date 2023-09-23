const { Router } = require('express')
const {deleteGenero,createGenero, getAllGeneros} =
 require('../controllers/generoController')

const router = Router()

// crear
router.get('/', getAllGeneros);

// consultar todos
router.post('/', createGenero)
router.delete('/:id',deleteGenero)

module.exports = router;