const { Router } = require('express')
const {deleteProductora,createProductora, getAllProductoras} =
 require('../controllers/productoraController')

const router = Router()

// crear
router.get('/', getAllProductoras);

// consultar todos
router.post('/', createProductora)
router.delete('/:id',deleteProductora)

module.exports = router;