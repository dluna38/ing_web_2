const { Router } = require('express')
const {deleteMedia,createMedia, getAllMedias,updateMedia} =
 require('../controllers/mediaController')

const router = Router()

// crear
router.get('/', getAllMedias);

// consultar todos
router.post('/', createMedia)
router.put('/:id',updateMedia)
router.delete('/:id',deleteMedia)

module.exports = router;