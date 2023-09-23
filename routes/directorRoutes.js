const { Router } = require('express')
const {deleteDirector,createDirector, getAllDirectores, updateDirector,getDirectorById} =
 require('../controllers/directorController')

const router = Router()

// crear
router.get('/', getAllDirectores);
router.get('/:id', getDirectorById);
// consultar todos
router.post('/', createDirector)
router.put('/:id', updateDirector)
router.delete('/:id',deleteDirector)

module.exports = router;