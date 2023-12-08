const { Router } = require('express')
const {searchMovie,searchSerie,detailMovieById,detailSerieById} = require('../controllers/tmbdController')
const router = Router()

router.get('/movie/:nombre', searchMovie);
router.get('/serie/:nombre', searchSerie);
router.get('/movie/id/:id', detailMovieById);
router.get('/serie/id/:id', detailSerieById);

module.exports = router;